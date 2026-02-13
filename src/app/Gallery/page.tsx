import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import MenuSection from "@/components/MenuSection";
import Marquee from "@/components/Marquee";
import Gallery from "@/components/Gallery";
import Apropos from "@/components/APropos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Gallery />
      <Footer />
    </main>
  );
}
