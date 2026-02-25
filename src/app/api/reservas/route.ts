import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export const dynamic = "force-dynamic";

function isISODateOnly(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("📥 Data cruda:", data);

    // --- Fecha: si ya viene "yyyy-MM-dd" del frontend, úsala tal cual ---
    let dateISO = "";
    if (isISODateOnly(data.date)) {
      dateISO = data.date;
    } else if (data.date) {
      const d = new Date(data.date);
      if (Number.isNaN(d.getTime())) throw new Error(`Fecha inválida: "${data.date}"`);
      dateISO = d.toISOString().split("T")[0];
    } else {
      throw new Error("Falta fecha en reserva");
    }

    const heure = typeof data.time === "string" ? data.time : "";
    const personnes = Number(data.people ?? 2) || 2;

    // --- Compatibilidad: acepta nom/telephone (viejo) o name/phone (nuevo) ---
    const nom = (data.nom || data.name || "Cliente") as string;
    const email = (data.email || "") as string;
    const telephone = (data.telephone || data.phone || "") as string;

    if (!heure) return NextResponse.json({ error: "Falta hora" }, { status: 400 });
    if (!Number.isFinite(personnes) || personnes < 1) {
      return NextResponse.json({ error: "Personas inválidas" }, { status: 400 });
    }
    if (!nom || String(nom).trim().length < 2) {
      return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
    }
    if (!telephone || String(telephone).trim().length < 6) {
      return NextResponse.json({ error: "Teléfono inválido" }, { status: 400 });
    }

    console.log("✅ Parsed:", { dateISO, heure, personnes, nom, telephone });

    // Buscar mesa libre
    const mesasLibres = await sql`
      SELECT m.* FROM mesas m
      LEFT JOIN reservas r ON m.id = r.mesa_id 
        AND r.date_resa = ${dateISO}::date 
        AND r.heure = ${heure}::time
      WHERE m.capacite >= ${personnes} AND r.id IS NULL
      ORDER BY m.capacite ASC, m.numero ASC
      LIMIT 1
    `;

    if (!mesasLibres?.length) {
      return NextResponse.json(
        { error: `😔 No mesas libres ${dateISO} ${heure} x${personnes}` },
        { status: 400 }
      );
    }

    const mesa = mesasLibres[0];

    // Insert reserva
    await sql`
      INSERT INTO reservas (nom, email, telephone, date_resa, heure, personnes, mesa_id)
      VALUES (${nom}, ${email}, ${telephone}, ${dateISO}::date, ${heure}::time, ${personnes}, ${mesa.id})
    `;

    // Email (modo resend.dev: solo a tu correo)
    await resend.emails.send({
      from: "resend@resend.dev",
      to: ["mikeu1807@gmail.com"],
      subject: `🌮 NUEVA RESERVA #${mesa.numero}`,
      html: `
        <h1 style="color: #e74c3c;">✅ ¡Confirmada!</h1>
        <p>
          <strong>Table:</strong> #${mesa.numero} (${mesa.capacite} lugares)<br>
          <strong>Fecha:</strong> ${dateISO} ${heure}<br>
          <strong>${personnes} personas</strong> - ${nom}<br>
          <strong>Tel:</strong> ${telephone}
        </p>
        <hr>
        <small>07 58 89 06 68</small>
      `,
    });

    return NextResponse.json({
      success: true,
      mesa: mesa.numero,
      message: `🎉 ¡Table ${mesa.numero} reservada!`,
    });
  } catch (error: any) {
    console.error("💥 Error:", error?.message || error);
    return NextResponse.json({ error: error?.message || "Error servidor" }, { status: 500 });
  }
}
