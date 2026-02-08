"use client";

interface MarqueeProps {
  text: string;
  direction?: "left" | "right";
}

export default function Marquee({ text, direction = "left" }: MarqueeProps) {
  const items = Array(10).fill(text);

  return (
    <div className="bg-[#F7F3ED] py-6 overflow-hidden border-y border-[#1F1E1D]/10">
      <div
        className={`flex whitespace-nowrap ${
          direction === "left" ? "animate-marquee" : "animate-marquee"
        }`}
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {items.map((item, index) => (
          <div key={`marquee-item-${item}-${index}-${Math.random()}`} className="flex items-center">
            <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1F1E1D] tracking-wider mx-8">
              {item}
            </span>
            <svg
              className="w-6 h-6 text-[#C45C3A] mx-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
        ))}
        {items.map((item, index) => (
          <div key={`marquee-item-dup-${item}-${index}-${Math.random()}`} className="flex items-center">
            <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1F1E1D] tracking-wider mx-8">
              {item}
            </span>
            <svg
              className="w-6 h-6 text-[#C45C3A] mx-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
