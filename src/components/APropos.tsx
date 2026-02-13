"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function APropos() {
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
      id="APropos"
      className="relative bg-[#1F1E1D] overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="aztec-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M0 0L10 10L20 0L20 20L10 10L0 20Z" fill="currentColor" className="text-[#D4A056]" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#aztec-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Equipe Image */}
          <div
            className={`relative h-[400px] md:h-[600px] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <Image
              src="images/equipo.jpeg"
              alt="Equipe Mexican'o"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1F1E1D] hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E1D] via-transparent to-transparent md:hidden" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-3xl md:text-4xl font-serif text-[#F7F3ED] mb-2">Tortilla Challenge</h3>
            </div>
          </div>

          {/* Resto Info */}
          <div
            className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h4 className="text-2xl md:text-3xl font-serif text-[#D4A056] mb-6">
              Á propos
            </h4>

            <p className="text-[#F7F3ED]/80 text-base md:text-lg leading-relaxed mb-6">
              Situé au 56 avenue Paul Santy, notre restaurant est facilement accessible en voiture, en bus ou en tramway et propose également la vente à emporter et la livraison via des plateformes partenaires. Ouvert depuis 2020, Mexican’o s’est imposé comme une adresse de référence pour découvrir ou redécouvrir la cuisine mexicaine dans sa version halal, généreuse et conviviale.
            </p>

            <p className="text-[#F7F3ED]/60 text-base leading-relaxed mb-8">
              Nous serions ravis de vous accueillir prochainement et de vous faire partager l’esprit de Mexican’o : une cuisine de partage, authentique et gourmande, au service de vos moments de convivialité.
            </p>

            <blockquote className="border-l-2 border-[#C45C3A] pl-6 italic text-[#D4A056]">
              &ldquo;Venez comme vous êtes&rdquo;
              <span className="block mt-2 text-[#F7F3ED]/60 not-italic text-sm">— Julia  </span>
            </blockquote>
          </div>
        </div>

        {/* Restaurant interior image */}
        <div
          className={`relative h-[300px] md:h-[400px] transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Image
            src="images/salle.jpg"
            alt="Intérieur du restaurant Mexican'o"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1F1E1D]/40" />
        </div>
      </div>
    </section>
  );
}
