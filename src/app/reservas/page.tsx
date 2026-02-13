  "use client";

  import Header from "@/components/Header";
  import Footer from "@/components/Footer" 
  import { Hero } from "../Hero/Hero";
  import { App } from "../Calendar/App";

  export default function PageReservas() {  
    return (
      <main className="min-h-screen">
        <Header />
        <Hero />
        <App />
        {/* MAPA UBICACIÓN */}
    <section className="w-full py-20 bg-gradient-to-b from-orange-50 to-red-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Notre Localitation 📍
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            56 Av. Paul Santy, 69008 Lyon.  
          </p>
        </div>
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.228192614614!2d4.850999315546!3d45.7679999791403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea6615d8c1b5%3A0x9e2b5f5f5f5f5f5f!2s56%20Av.%20Paul%20Santy%2C%2069008%20Lyon!5e0!3m2!1ses!2ses!4v1738830000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mexican'o Lyon - Ubicación"
          />
        </div>
      </div>
    </section>
        <Footer />
      </main>
    );
  }
            