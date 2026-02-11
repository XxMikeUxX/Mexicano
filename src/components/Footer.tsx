"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#1F1E1D] text-[#F7F3ED] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif text-[#D4A056] mb-6 tracking-wider">
              CONTACT
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+33665367737"
                className="block text-[#F7F3ED]/80 hover:text-[#D4A056] transition-colors"
              >
                06 65 36 77 37
              </a>
              <a
                href="mailto:mexicanolyon8@gmail.com"
                className="block text-[#F7F3ED]/80 hover:text-[#D4A056] transition-colors underline"
              >
                mexicanolyon8@gmail.com
              </a>
            </div>

            <div className="mt-8">
              <p className="text-[#F7F3ED]/60 text-sm mb-2">Suivez Mexican&apos;o sur Instagram :</p>
              <a
                href="https://www.instagram.com/mexicano_lyon_8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F7F3ED] hover:text-[#D4A056] transition-colors underline"
              >
                @mexicano_lyon_8
              </a>
            </div>
          </div>

          {/* Logo and Hours */}
          <div className="text-center">
            <Link href="#accueil" className="inline-block mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-wider">
                MEXICAN
                <span className="text-[#D4A056]">&apos;</span>
                <span className="text-[#C45C3A]">O</span>
              </h2>
              <p className="text-[#F7F3ED]/40 text-xs tracking-[0.3em] mt-2">
                CUISINE MEXICAINE GASTRONOMIQUE
              </p>
            </Link>

            <div className="text-[#F7F3ED]/60 text-sm">
              <p className="mb-2">
                Ouvert le matin <strong className="text-[#F7F3ED]"> du mercredi au samedi </strong> de{" "}
                <strong className="text-[#F7F3ED]">12hs jusqu&apos;a 14hs30</strong>
              </p>
              <p>
                Et le soir <strong className="text-[#F7F3ED]">du mardi au dimanche </strong> de{" "}
                <strong className="text-[#F7F3ED]">19hs jusqu&apos;a 22hs30</strong>
              </p>
              <p>
                Sauf Vendredi et Samedi de <strong className="text-[#F7F3ED]">19hs jusqu&apos;a 23:30 </strong>
              </p>
            </div>
          </div>

          {/* Address and CTA */}
          <div className="md:text-right">
            <h3 className="text-lg font-serif text-[#D4A056] mb-6 tracking-wider md:text-right">
              ADRESSE
            </h3>
            <address className="not-italic text-[#F7F3ED]/80 mb-8">
              <p>65 Av. Paul Santy</p>
              <p>69008 Lyon</p>
            </address>

            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="#contact"
                className="inline-block btn-mexican px-6 py-3 bg-[#C45C3A] text-[#F7F3ED] text-sm uppercase tracking-wider rounded-full hover:bg-[#A34A2F] transition-colors text-center"
              >
                Réserver
              </a>
              <a
                href="https://g.page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-[#D4A056]/50 text-[#D4A056] text-sm uppercase tracking-wider rounded-full hover:bg-[#D4A056]/10 transition-colors text-center"
              >
                Laisser un avis
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#F7F3ED]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#F7F3ED]/40 text-xs">
            © 2026 Mexican&apos;o. Tous droits réservés.
          </p>
          <p className="text-[#F7F3ED]/40 text-xs">
            Réalisation{" "}
            <a
              href="#"
              className="text-[#D4A056]/60 hover:text-[#D4A056] transition-colors"
            >
              @maicolchavez
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
