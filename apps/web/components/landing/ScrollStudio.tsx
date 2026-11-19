'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, GitBranch, Search } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { index: '01', title: 'Read', body: 'NOXES scans the resource and maps the files involved.' },
  { index: '02', title: 'Propose', body: 'A precise change is prepared for review.' },
  { index: '03', title: 'Checkpoint', body: 'A Git checkpoint records a safe point.' },
  { index: '04', title: 'Apply', body: 'The change is written only after approval.' },
] as const;

export default function ScrollStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    const section = sectionRef.current;
    if (!section || media.matches) {
      setStep(STEPS.length - 1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=180%',
      scrub: 0.35,
      onUpdate: (self) => {
        setStep(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length)));
      },
    });

    const board = section.querySelector<HTMLElement>('.noxes-process-board');
    if (board) {
      gsap.to(board, {
        yPercent: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }

    ScrollTrigger.refresh();
    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="noxes-process relative border-t border-[#414548] bg-[#111315] text-[#F4F1E9]">
      <div className="noxes-process-grid mx-auto grid max-w-[92rem] lg:grid-cols-[22rem_1fr]">
        <aside className="noxes-process-copy border-b border-[#414548] px-6 py-16 lg:sticky lg:top-[4.5rem] lg:h-[calc(100vh-4.5rem)] lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#68665F]">The authoring process</p>
          <h2 className="brand-display mt-5 text-5xl font-black uppercase leading-[0.92] md:text-6xl">You stay<br />at the<br /><span className="text-[#E83708]">controls.</span></h2>

          <div className="mt-12 space-y-1" aria-label="Process progress">
            {STEPS.map((item, index) => (
              <button
                key={item.index}
                type="button"
                onClick={() => {
                  if (!sectionRef.current) return;
                  const distance = Math.max(1, sectionRef.current.offsetHeight - window.innerHeight);
                  window.scrollTo({ top: window.scrollY + sectionRef.current.getBoundingClientRect().top + distance * (index / STEPS.length), behavior: reduceMotion ? 'auto' : 'smooth' });
                }}
                className={`grid w-full grid-cols-[2.5rem_1fr] items-center gap-2 border-l px-3 py-3 text-left transition-colors ${index === step ? 'border-[#E83708] bg-[#202326]' : 'border-[#414548] text-[#68665F]'}`}
                aria-current={index === step ? 'step' : undefined}
              >
                <span className="font-mono text-[10px]">{item.index}</span>
                <span className={`text-sm font-semibold ${index === step ? 'text-[#F4F1E9]' : ''}`}>{item.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="noxes-process-board min-h-[760px] px-6 py-16 lg:min-h-[calc(100vh-4.5rem)] lg:px-12 lg:py-12">
          <div className="lg:sticky lg:top-[calc(4.5rem+3rem)]">
            <div className="overflow-hidden rounded-sm border border-[#414548] bg-[#181A1D] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
              <header className="flex h-14 items-center justify-between border-b border-[#414548] px-4 md:px-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#E83708] text-[#111315] font-black">N</span>
                  <span className="text-sm font-semibold">NOXES for FiveM</span>
                </div>
                <span className="rounded-sm border border-[#414548] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#B6B0A4]">Change review</span>
              </header>

              <div className="grid min-h-[520px] md:grid-cols-[12rem_1fr]">
                <nav className="hidden border-r border-[#414548] p-4 md:block" aria-label="Workspace navigation">
                  <p className="noxes-sr-only">Workspace</p>
                  <button type="button" className="flex w-full items-center gap-2 rounded-sm bg-[#202326] px-3 py-2 text-left text-xs text-[#F4F1E9]"><Search className="h-4 w-4 text-[#E83708]" />Resources</button>
                  <button type="button" className="mt-1 flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#68665F]"><GitBranch className="h-4 w-4" />Checkpoints</button>
                  <div className="mt-6 border-t border-[#414548] pt-4 font-mono text-[9px] leading-6 text-[#68665F]">
                    <p>resources/</p><p className="pl-3 text-[#B6B0A4]">shop/</p><p className="pl-6">fxmanifest.lua</p><p className="pl-6 text-[#F4F1E9]">config.lua</p>
                  </div>
                </nav>

                <div className="min-w-0 p-4 md:p-6">
                  <div className="flex items-end justify-between gap-4 border-b border-[#414548] pb-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#68665F]">resources/shop/config.lua</p>
                      <h3 className="mt-2 text-lg font-semibold">Review proposed change</h3>
                    </div>
                    <span className="font-mono text-[9px] text-[#E83708]">{step >= 1 ? '+2 / -1' : 'reading'}</span>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-sm border border-[#414548] bg-[#111315] font-mono text-[11px] leading-7">
                    <div className="flex border-b border-[#414548] px-3 text-[#68665F]"><span className="w-10 shrink-0">18</span><span>local weekendBonus = false</span></div>
                    <div className={`flex px-3 ${step >= 1 ? 'bg-[#202326] text-[#68665F] line-through' : 'text-[#68665F]'}`}><span className="w-10 shrink-0">19</span><span>- local discount = 0</span></div>
                    <div className={`flex px-3 transition-opacity ${step >= 1 ? 'bg-[#E83708]/10 text-[#E83708]' : 'opacity-30 text-[#68665F]'}`}><span className="w-10 shrink-0">19</span><span>+ local discount = weekendEnabled and 0.2 or 0</span></div>
                    <div className={`flex px-3 transition-opacity ${step >= 1 ? 'bg-[#E83708]/10 text-[#E83708]' : 'opacity-30 text-[#68665F]'}`}><span className="w-10 shrink-0">20</span><span>+ -- staged for review</span></div>
                  </div>

                  <div className="mt-5 grid gap-px overflow-hidden border border-[#414548] bg-[#414548] sm:grid-cols-3">
                    {STEPS.map((item, index) => (
                      <div key={item.index} className={`min-h-24 p-3 ${index === step ? 'bg-[#202326]' : 'bg-[#181A1D]'}`}>
                        <div className="flex items-center justify-between"><span className="font-mono text-[9px] text-[#68665F]">{item.index}</span>{index < step ? <Check className="h-3.5 w-3.5 text-[#E83708]" /> : null}</div>
                        <p className={`mt-6 text-xs font-semibold ${index === step ? 'text-[#E83708]' : 'text-[#F4F1E9]'}`}>{item.title}</p>
                      </div>
                    ))}
                  </div>

                  <footer className="mt-5 flex items-center justify-between border-t border-[#414548] pt-4">
                    <div>
                      <p className="text-xs font-semibold">Nothing changes until approval.</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#68665F]">{step >= 2 ? 'Checkpoint recorded' : 'Awaiting checkpoint'}</p>
                    </div>
                    <button type="button" className="rounded-sm bg-[#E83708] px-4 py-2.5 text-xs font-bold text-[#111315] disabled:cursor-not-allowed disabled:opacity-50" disabled={step < 3}>{step >= 3 ? 'Applied' : 'Approve change'}</button>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
