import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('📥 Data:', data);
    
    // 🔥 FIX DATE: convierte "Saturday, February 14, 2026" → "2026-02-14"
    const dateFull = new Date(data.date);
    const dateISO = dateFull.toISOString().split('T')[0];  // "2026-02-14"
    const heure = data.time;  // "19:00"
    const personnes = data.people;
    const nom = data.nom || 'Cliente';
    const email = data.email || '';
    const telephone = data.telephone || '';

    console.log('📅 Date parseada:', dateISO);

    // Tu query PERFECTA (ahora con dateISO)
    const mesasLibres = await sql`
      SELECT m.* FROM mesas m
      LEFT JOIN reservas r ON m.id = r.mesa_id 
        AND r.date_resa = ${dateISO}::date 
        AND r.heure = ${heure}::time
      WHERE m.capacite >= ${personnes} AND r.id IS NULL
      ORDER BY m.capacite ASC, m.numero ASC
      LIMIT 1
    `;
    
    if (mesasLibres.length === 0) {
      return NextResponse.json({ error: '😔 Aucune table disponible' }, { status: 400 });
    }

    const mesa = mesasLibres[0];
    
    // Guarda
    await sql`
      INSERT INTO reservas (nom, email, telephone, date_resa, heure, personnes, mesa_id)
      VALUES (${nom}, ${email}, ${telephone}, ${dateISO}::date, ${heure}::time, ${personnes}, ${mesa.id})
    `;

    // Email bonito (tuyo)
    await resend.emails.send({
      from: 'no-reply@mexicano-lyon.com',
      to: [email || 'mikeu1807@gmail.com', 'mikeu1807@gmail.com'],
      subject: `✅ Mexican'o Lyon - Table ${mesa.numero} ${dateISO}`,
      html: `<h1>🌮 ¡Réservation Confirmée!</h1><p><strong>Table:</strong> #${mesa.numero} (${mesa.capacite}pl)<br>${dateISO} ${heure} x${personnes}<br>${nom} ${telephone}</p>`
    });

    return NextResponse.json({ 
      success: true, 
      mesa: mesa.numero,
      message: `🎉 ¡Table ${mesa.numero} confirmée!`
    });
    
  } catch (error: any) {
    console.error('💥 Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
