'use client';

import Lenis from 'lenis';
import { useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      anchors: true,
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let frame = 0;
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(frame);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
