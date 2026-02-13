"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="accueil"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('images/portada.jpeg')`,
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1E1D]/70 via-[#1F1E1D]/40 to-[#1F1E1D]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className={`text-[#D4A056] text-sm md:text-base uppercase tracking-[0.3em] mb-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Venez découvrir une cuisine mexicaine raffinée et authentique
        </p>

        <h2
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-[#F7F3ED] mb-8 font-serif tracking-wide text-shadow transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          MEXICAN
          <span className="text-[#D4A056]">&apos;</span>
          <span className="text-[#C45C3A]">O</span>
        </h2>

        <p
          className={`text-[#F7F3ED]/90 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Un voyage culinaire au cœur du Mexique, dans un cadre unique et chaleureux à Lyon
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="https://www.canva.com/design/DAGSUznTAPs/dtR8Rq19cjzPkYbDcLv3ZA/view?utm_content=DAGSUznTAPs&utm_campaign=designshare&utm_medium=link&utm_source=editor#3"
            className="btn-mexican px-8 py-4 bg-[#C45C3A] text-[#F7F3ED] uppercase tracking-wider rounded-full hover:bg-[#A34A2F] transition-all duration-300 text-sm font-medium"
          >
            Découvrir le menu
          </a>
          <a
            href="/reservas"
            className="btn-mexican px-8 py-4 border-2 border-[#F7F3ED]/50 text-[#F7F3ED] uppercase tracking-wider rounded-full hover:bg-[#F7F3ED]/10 hover:border-[#F7F3ED] transition-all duration-300 text-sm font-medium"
          >
            Réserver une table
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D4A056"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-24 left-6 md:left-12 w-16 h-16 border-l-2 border-t-2 border-[#D4A056]/30" />
      <div className="absolute bottom-24 right-6 md:right-12 w-16 h-16 border-r-2 border-b-2 border-[#D4A056]/30" />
    </section>
  );
}
