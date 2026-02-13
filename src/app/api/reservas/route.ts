import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Mapea campos del frontend → backend
    const dateStr = data.date;  // "13 février 2026" (PPP)
    const heure = data.time;    // "20:00"
    const personnes = data.people;
    const nom = data.nom;
    const email = data.email;
    const telephone = data.telephone;

    // Encuentra mesa libre por capacidad (ej: para 2+ pers)
    const mesasLibres = await sql`
      SELECT m.* FROM mesas m
      LEFT JOIN reservas r ON m.id = r.mesa_id 
        AND r.date_resa = ${dateStr}::date 
        AND r.heure = ${heure}::time
      WHERE m.capacite >= ${personnes} AND r.id IS NULL
      ORDER BY m.capacite ASC, m.numero ASC
      LIMIT 1
    `;
    
    if (mesasLibres.length === 0) {
      return NextResponse.json({ error: 'Aucune table disponible' }, { status: 400 });
    }

    const mesa = mesasLibres[0];
    
    // Guarda reserva
    await sql`
      INSERT INTO reservas (nom, email, telephone, date_resa, heure, personnes, mesa_id)
      VALUES (${nom}, ${email}, ${telephone}, ${dateStr}::date, ${heure}::time, ${personnes}, ${mesa.id})
    `;

    // Email confirm
    await resend.emails.send({
      from: 'no-reply@mexicano-lyon.com',
      to: [email, 'mikeu1807@gmail.com'],
      subject: `Réservation Confirmée - Mexican'o Lyon ${dateStr}`,
      html: `
        <h1>✅ Réservation Confirmée!</h1>
        <p><strong>Client:</strong> ${nom}<br>
           <strong>Date:</strong> ${dateStr} à ${heure}<br>
           <strong>Table:</strong> ${mesa.numero} (${mesa.capacite} places)<br>
           <strong>Personnes:</strong> ${personnes}</p>
        <p>📞 Confirmez: 07 58 89 06 68</p>
      `,
    });

    return NextResponse.json({ success: true, mesa: mesa.numero });
  } catch (error) {
    console.error('Error reserva:', error);
    return NextResponse.json({ error: 'Erreur réservation' }, { status: 500 });
  }
}
