"use client";

import { useEffect, useRef, useState } from "react";

export default function Welcome() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#F7F3ED] grain-overlay"
    >
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg
          width="120"
          height="60"
          viewBox="0 0 120 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 0L120 60H0L60 0Z"
            fill="#F7F3ED"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Logo/Icon */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <svg
            className="w-24 h-24 mx-auto text-[#C45C3A]"
            viewBox="0 0 100 100"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 5C35 5 20 20 20 35C20 45 25 52 30 58C35 64 40 70 40 80C40 82 42 85 45 85H55C58 85 60 82 60 80C60 70 65 64 70 58C75 52 80 45 80 35C80 20 65 5 50 5ZM45 75H55V80H45V75ZM50 10C62 10 75 22 75 35C75 43 71 49 66 55C61 61 55 67 55 78H45C45 67 39 61 34 55C29 49 25 43 25 35C25 22 38 10 50 10Z" />
            <path d="M50 20C42 20 35 27 35 35C35 40 37 44 40 48L45 43C43 40 42 38 42 35C42 31 46 27 50 27C54 27 58 31 58 35C58 38 57 40 55 43L60 48C63 44 65 40 65 35C65 27 58 20 50 20Z" />
          </svg>
        </div>

        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-serif text-[#1F1E1D] mb-8 tracking-wide transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          UN PEU DE NOUS
        </h2>

        <p
          className={`text-[#1F1E1D]/80 text-lg md:text-xl leading-relaxed mb-8 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Mexican'o <strong className="text-[#C45C3A]">un restaurant MEXICAINE</strong>, à la fois{" "}
          <strong className="text-[#1F1E1D]">installé au cœur du 8ᵉ arrondissement de Lyon</strong>, à quelques pas de la Maison de la Danse. 
          Notre établissement propose une cuisine mexicaine authentique, familiale et conviviale, élaborée à partir de produits frais et 
          rigoureusement sélectionnés.
        </p>

        <p
          className={`text-[#1F1E1D]/70 text-base md:text-lg leading-relaxed transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Dans un cadre coloré, chaleureux et inspiré des traditions mexicaines, nous accueillons nos clients pour un véritable voyage 
          culinaire : tacos, burritos, enchiladas, quesadillas, guacamole maison et généreux plateaux à partager sont au cœur de notre carte. 
          Les portions sont copieuses, les saveurs équilibrées <strong className="text-[#C45C3A]">– relevées sans être excessivement épicées 
            –</strong> afin de convenir aussi bien aux amateurs de sensations fortes qu'aux palais plus délicats.
        </p>
      </div>
    </section>
  );
}
