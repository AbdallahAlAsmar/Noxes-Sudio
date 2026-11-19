import { ArrowDownRight, ArrowUpRight, Check } from 'lucide-react';
import { ScrollParallax } from './ScrollMotion';

const PROMISES = ['Built for creators', 'You review every change', 'Checkpoint before apply'];

export default function Hero() {
  return (
    <section id="home" className="noxes-hero relative min-h-[760px] overflow-hidden bg-[#E2DCCE] text-[#111315] md:min-h-[820px]">
      <div aria-hidden="true" className="noxes-hero-grid absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid min-h-[760px] max-w-[92rem] items-center px-6 py-28 md:min-h-[820px] md:px-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(520px,1.12fr)]">
        <ScrollParallax y={[0, -28]} className="relative z-10 max-w-[42rem] lg:pr-8">
          <p className="noxes-dark-eyebrow">NOXES / Studio for digital worlds</p>
          <h1 className="brand-display mt-7 text-[clamp(4.25rem,8.2vw,9rem)] font-black leading-[0.82] tracking-[-0.04em] text-[#111315]">
            Worlds
            <br />in motion.
          </h1>

          <p className="mt-8 max-w-[38rem] text-base leading-[1.7] text-[#383A39] md:text-lg">
            Tools for people who shape systems, servers, and stories — with enough control to keep every decision human.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="noxes-dark-button-primary">
              Explore NOXES <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="#demo" className="noxes-dark-button-secondary">
              See the process <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          <ul className="mt-10 grid gap-3 border-t border-[#B6B0A4] pt-5 sm:grid-cols-3" aria-label="NOXES principles">
            {PROMISES.map((promise) => (
              <li key={promise} className="flex items-center gap-2 text-xs font-medium text-[#68665F]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-[#E83708] text-[#E83708]">
                  <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.5} />
                </span>
                {promise}
              </li>
            ))}
          </ul>
        </ScrollParallax>

        <ScrollParallax y={[44, -72]} rotate={[0.15, -0.15]} className="relative mt-12 min-h-[420px] lg:mt-0 lg:min-h-[650px]">
          <div className="noxes-hero-object absolute inset-0 overflow-hidden rounded-sm border border-[#B6B0A4] bg-[#111315] shadow-[0_32px_100px_rgba(17,19,21,0.24)]">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#111315]/88 px-5 py-3 backdrop-blur-md">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#B6B0A4]">NOXES / World engine</span>
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#E83708]"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E83708]" /> Live object</span>
            </div>

            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/brand/01_Website_Hero.png"
                alt="NOXES world in motion campaign artwork"
                className="h-full w-full object-cover object-[62%_50%] opacity-[0.82]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,19,21,0.08),rgba(17,19,21,0.72)_78%,rgba(17,19,21,0.96))]" />
            </div>

            <div className="absolute bottom-5 left-5 right-5 z-10 grid grid-cols-3 border-t border-white/10 pt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-[#B6B0A4] md:text-[9px]">
              <span>01 / Shape</span>
              <span className="text-center text-[#F4F1E9]">World in motion</span>
              <span className="text-right text-[#E83708]">Scroll linked</span>
            </div>
          </div>

          <div className="noxes-hero-float absolute -bottom-4 -left-3 z-20 hidden items-center gap-3 border border-[#B6B0A4] bg-[#F4F1E9] p-3.5 shadow-[0_20px_50px_rgba(17,19,21,0.18)] md:flex">
            <span className="h-9 w-9 rounded-sm bg-[#E83708]" aria-hidden="true" />
            <span>
              <span className="block text-xs font-semibold text-[#111315]">Built to move with you</span>
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.12em] text-[#68665F]">Studio object / 01</span>
            </span>
          </div>
        </ScrollParallax>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B6B0A4]" aria-hidden="true" />
    </section>
  );
}
