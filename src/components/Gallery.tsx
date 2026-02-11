"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const galleryImages = [
  {
    src: "images/boo.jpg",
    alt: "Decoration Día de los muertos",
  },
  {
    src: "images/exported.jpg",
    alt: "Produits exporté",
  },
  {
    src: "images/deco.jpg",
    alt: "Decoration",
  },
  {
    src: "images/guacamole.jpg",
    alt: "Guacamole artisanal",
  },
  {
    src: "images/pico de gallo.jpeg",
    alt: "Pico de Gallo",
  },
  {
    src: "images/jumex.jpg",
    alt: "Cocktail Mexicain",
  },
];

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="galerie"
      className="py-16 md:py-24 bg-[#F7F3ED]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden group hover-scale transition-all duration-700 rounded-lg ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${index === 2 ? "md:row-span-2" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E1D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-[#F7F3ED] translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-sm font-light">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
