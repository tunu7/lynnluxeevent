import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import FeaturedEvents from "@/components/FeaturedEvents";
import Approach from "@/components/Approach";
import InstagramGallery from "@/components/InstagramGallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <Intro />

      <Services />

      <FeaturedEvents />

      <Approach />

      <InstagramGallery />

      <CTA />

      <Footer />
    </main>
  );
}