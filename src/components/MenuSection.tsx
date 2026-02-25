"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function MenuSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative py-24 md:py-32 bg-[#1F1E1D]"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="images/PLATO MIXTO.jpeg"
          alt="Mexican food background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1E1D] via-transparent to-[#1F1E1D]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-serif text-[#F7F3ED] mb-6 tracking-wide transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          LES MENUS
        </h2>

        <p
          className={`text-[#F7F3ED]/80 text-lg mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Du mardi au dimanche, pour le déjeuner et le dîner, réservez une table chez Mexican&apos;o !
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="https://www.canva.com/design/DAGSUznTAPs/dtR8Rq19cjzPkYbDcLv3ZA/view?utm_content=DAGSUznTAPs&utm_campaign=designshare&utm_medium=link&utm_source=editor#3"
            className="btn-mexican px-8 py-4 bg-[#C45C3A] text-[#F7F3ED] uppercase tracking-wider rounded-full hover:bg-[#A34A2F] transition-all duration-300 text-sm font-medium"
          >
            Découvrir les menus
          </a>
          <a
            href="/reservas"
            className="btn-mexican px-8 py-4 border-2 border-[#D4A056] text-[#D4A056] uppercase tracking-wider rounded-full hover:bg-[#D4A056] hover:text-[#1F1E1D] transition-all duration-300 text-sm font-medium"
          >
            Réserver
          </a>
        </div>

        {/* Menu highlights */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#C45C3A]/20">
              <svg
                className="w-8 h-8 text-[#D4A056]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
            </div>
            <h3 className="text-[#D4A056] font-serif text-xl mb-2">MENÚ ETUDIANT</h3>
            <p className="text-[#F7F3ED]/60 text-sm">À partir de 6€</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#C45C3A]/20">
              <svg
                className="w-8 h-8 text-[#D4A056]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 className="text-[#D4A056] font-serif text-xl mb-2">ASSIETES</h3>
            <p className="text-[#F7F3ED]/60 text-sm">À partir de 12€</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#C45C3A]/20">
              <svg
                className="w-8 h-8 text-[#D4A056]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-[#D4A056] font-serif text-xl mb-2">PLATO POUR 2 PERSONNES</h3>
            <p className="text-[#F7F3ED]/60 text-sm">À partir de 60€</p>
          </div>
        </div>
      </div>
    </section>
  );
}
