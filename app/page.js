import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";
import Courses from "@/app/components/Courses";
import Stats from "@/app/components/Stats";
import Footer from "@/app/components/Footer";
import InstructorsSection from "@/app/components/instructors";


export default function Home() {
  return (
      <main className="font-tajawal">
          <Navbar />
          <Hero />
          <Features />
          <Courses />
          {/*<Stats />*/}
          <InstructorsSection />
          <Footer />
      </main>
  );
}
