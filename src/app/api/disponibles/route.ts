import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const heure = searchParams.get('heure');
    const personnes = parseInt(searchParams.get('personnes') || '1');

    if (!date || !heure || !personnes) {
      return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 });
    }

    // Verifica solo viernes/sábado
    const jourSem = new Date(date).getDay();
    if (jourSem !== 5 && jourSem !== 6) {  // 5=Ven, 6=Sam
      return NextResponse.json({ error: 'Réservations: Vendredis/Samedis seulement' }, { status: 400 });
    }

    // Solo 19h/21h
    if (heure !== '19:00' && heure !== '21:00') {
      return NextResponse.json({ error: 'Services: 19h ou 21h seulement' }, { status: 400 });
    }

    // Mesas libres
    const libres = await sql`
      SELECT m.* FROM mesas m
      LEFT JOIN reservas r ON m.id = r.mesa_id 
        AND r.date_resa = ${date}::date 
        AND r.heure = ${heure}::time
      WHERE r.id IS NULL AND m.capacite >= ${personnes}
      ORDER BY m.numero
    `;

    return NextResponse.json({ mesas: libres });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
