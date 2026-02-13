import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.MEXICANO_DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Verifica mesa aún libre (doble check)
    const mesaLibre = await sql`
      SELECT m.* FROM mesas m
      LEFT JOIN reservas r ON m.id = r.mesa_id 
        AND r.date_resa = ${data.date_resa}::date 
        AND r.heure = ${data.heure}::time
      WHERE m.id = ${data.mesa_id} AND r.id IS NULL
    `;
    if (mesaLibre.length === 0) {
      return NextResponse.json({ error: 'Table plus disponible' }, { status: 400 });
    }

    // Guarda reserva
    await sql`
      INSERT INTO reservas (nom, email, telephone, date_resa, heure, personnes, mesa_id)
      VALUES (${data.nom}, ${data.email}, ${data.telephone}, ${data.date_resa}::date, ${data.heure}::time, ${data.personnes}, ${data.mesa_id})
    `;

    // Email confirm (a ti y cliente)
    await resend.emails.send({
      from: 'no-reply@mexicano-lyon.com',
      to: [data.email, 'tu-email@lyon.fr'],  // ¡Cambia por tu email!
      subject: `Réservation Confirmée - Mexican'o Lyon ${data.date_resa}`,
      html: `
        <h1>✅ Réservation Confirmée!</h1>
        <p><strong>Client:</strong> ${data.nom}<br>
           <strong>Date:</strong> ${data.date_resa} à ${data.heure}<br>
           <strong>Table:</strong> ${mesaLibre[0].numero} (${mesaLibre[0].capacite} places)<br>
           <strong>Personnes:</strong> ${data.personnes}</p>
        <p>📞 Confirmez par téléphone: 04 XX XX XX XX</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur réservation' }, { status: 500 });
  }
}
