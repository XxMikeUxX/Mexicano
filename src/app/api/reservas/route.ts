import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('📥 Data cruda:', data);
    
    // 🔥 FIX DATE: robusto contra invalid/empty
    let dateISO = '';
    if (data.date) {
      const dateFull = new Date(data.date);
      if (!isNaN(dateFull.getTime())) {  // Válido?
        dateISO = dateFull.toISOString().split('T')[0];  // "2026-02-14"
      } else {
        throw new Error(`Fecha inválida: "${data.date}"`);
      }
    } else {
      throw new Error('Falta fecha en reserva');
    }
    
    const heure = data.time || '';
    const personnes = parseInt(data.people) || 2;
    const nom = data.nom || 'Cliente';
    const email = data.email || '';
    const telephone = data.telephone || '';

    if (!heure) throw new Error('Falta hora');
    console.log('✅ Parsed:', { dateISO, heure, personnes });

    // Tu query mesas
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
      return NextResponse.json({ error: `😔 No mesas libres ${dateISO} ${heure} x${personnes}` }, { status: 400 });
    }

    const mesa = mesasLibres[0];
    
    // Insert
    await sql`
      INSERT INTO reservas (nom, email, telephone, date_resa, heure, personnes, mesa_id)
      VALUES (${nom}, ${email}, ${telephone}, ${dateISO}::date, ${heure}::time, ${personnes}, ${mesa.id})
    `;

    // Email
    await resend.emails.send({
      from: 'no-reply@mexicano-lyon.com',
      to: ['mikeu1807@gmail.com'],  // Siempre a ti
      ...(email && { to: [... , email] }),
      subject: `🌮 Mexican'o - Reserva #${mesa.numero}`,
      html: `<h1>✅ Confirmada!</h1><p>Table ${mesa.numero} (${mesa.capacite}pl)<br>${dateISO} ${heure}<br>${personnes}pax - ${nom}</p>`
    });

    return NextResponse.json({ 
      success: true, 
      mesa: mesa.numero,
      message: `🎉 ¡Table ${mesa.numero} reservada!`
    });
    
  } catch (error: any) {
    console.error('💥 Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
