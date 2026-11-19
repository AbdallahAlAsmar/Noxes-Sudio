import AboutNoxes from '@/components/landing/AboutNoxesMotion';
import BrandTicker from '@/components/landing/BrandTicker';
import Features from '@/components/landing/Features';
import GetStarted from '@/components/landing/GetStarted';
import Hero from '@/components/landing/Hero';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingNav from '@/components/landing/LandingNav';
import Projects from '@/components/landing/ProjectsMotion';
import ScrollReveal from '@/components/landing/ScrollReveal';
import { ScrollParallax } from '@/components/landing/ScrollMotion';
import ScrollStudio from '@/components/landing/ScrollStudio';
import LandingMotion from '@/components/motion/LandingMotion';

export default function LandingPage() {
  return (
    <LandingMotion>
      <div className="relative isolate min-h-screen bg-[#111315] text-[#F4F1E9]">
        <LandingNav />
        <main className="relative z-10">
          <Hero />
          <BrandTicker />
          <Projects />

          <ScrollStudio />

          <Features />
          <AboutNoxes />
          <GetStarted />
        </main>
        <LandingFooter />
      </div>
    </LandingMotion>
  );
}
