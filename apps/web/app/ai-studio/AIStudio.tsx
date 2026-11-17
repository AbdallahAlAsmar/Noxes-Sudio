'use client';

import Link from 'next/link';
import { ArrowRight, Check, Compass, Sparkles } from 'lucide-react';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingNav from '@/components/landing/LandingNav';

const promptCapabilities = [
  'Shape a rough thought into a structured prompt',
  'Keep a searchable history when you sign in',
  'Generate and download supporting project files',
];

export default function AIStudio() {
  return (
    <div className="min-h-screen bg-[#111315] text-[#F4F1E9]">
      <LandingNav />

      <main className="pt-[4.5rem]">
        <section className="brand-grid relative overflow-hidden border-b border-[#414548]">
          <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
            <div className="brand-enter">
              <p className="brand-eyebrow">NOXES Toolkit</p>
              <h1 className="brand-display mt-6 text-6xl font-black leading-[0.92] text-[#F4F1E9] md:text-8xl">
                AI Studio
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#B6B0A4] md:text-lg">
                A home for the tools that turn rough thinking into work you can use. Choose a tool below to get started.
              </p>
            </div>
            <div className="brand-enter brand-enter-delay-1 mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/prompt" className="brand-button-primary">
                Open Prompt Studio <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#68665F]">
                1 tool available · More on the way
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="available-tools" className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <div className="brand-enter">
            <p className="brand-eyebrow">Available now</p>
            <h2 id="available-tools" className="brand-display mt-4 text-4xl font-bold text-[#F4F1E9] md:text-5xl">
              Pick your tool
            </h2>
          </div>

          <Link
            href="/prompt"
            className="brand-enter brand-enter-delay-1 group mt-10 block border border-[#414548] bg-[#181A1D] transition-[border-color,background-color] duration-200 hover:border-[#68665F] hover:bg-[#202326]"
          >
            <div className="flex flex-col gap-8 p-6 md:flex-row md:items-start md:justify-between md:p-9">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center border border-[#E83708]/40 bg-[#E83708]/10 text-[#E83708]">
                    <Sparkles aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="border border-[#E83708]/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#E83708]">
                    Available
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[#F4F1E9] md:text-3xl">Prompt Studio</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#B6B0A4] md:text-base">
                  Turn a rough idea into a clear, structured prompt you can use, revise, and keep. Lyra does the shaping; you stay in control of the result.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {promptCapabilities.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#B6B0A4]">
                      <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#E83708]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-[#F4F1E9]">
                Open tool <ArrowRight aria-hidden="true" className="h-4 w-4 text-[#E83708]" />
              </span>
            </div>
          </Link>
        </section>

        <section aria-labelledby="future-tools" className="border-t border-[#414548] bg-[#151719]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
            <div className="brand-enter">
              <p className="brand-eyebrow">Reserved for what&apos;s next</p>
              <h2 id="future-tools" className="brand-display mt-4 text-4xl font-bold text-[#F4F1E9] md:text-5xl">
                More tools, in time
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#B6B0A4] md:text-base">
                New AI tools will be listed here as they&apos;re ready. Nothing else is available yet.
              </p>
            </div>
            <div className="brand-enter brand-enter-delay-1 mt-9 border border-dashed border-[#414548] px-6 py-10 md:px-9">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center border border-[#414548] text-[#68665F]">
                  <Compass aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#B6B0A4]">Space reserved for future tools</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#68665F]">Not available yet</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
