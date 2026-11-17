import { Check, GitBranch, ScanSearch } from 'lucide-react';
import { ScrollParallax } from './ScrollMotion';

const PROMISES = ['Built for creators. Not consumers.', 'No approval, no file change.', 'Git checkpoint before apply.'];
const PIPELINE = ['Request', 'Review', 'Checkpoint', 'Apply'];

const DIFF_LINES = [
  { kind: 'context', number: '18', text: 'local weekendBonus = false' },
  { kind: 'remove', number: '19', text: 'local discount = 0' },
  { kind: 'add', number: '19', text: 'local discount = weekendBonus and 0.2 or 0' },
  { kind: 'add', number: '20', text: '-- staged for your review' },
] as const;

export default function Hero() {
  return (
    <section id="home" className="brand-hero relative min-h-[760px] overflow-hidden pt-24 md:min-h-[820px]">
      <div aria-hidden="true" className="brand-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-12 h-[34rem] w-[34rem] rounded-full bg-[#E83708]/5 blur-[120px]" />

      <div className="relative mx-auto grid min-h-[700px] max-w-7xl items-center gap-16 px-6 py-16 md:px-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:py-20">
        <ScrollParallax y={[0, -42]} className="relative z-10 max-w-2xl">
          <p className="brand-eyebrow brand-enter">NOXES Studio · FiveM & Beyond</p>
          <h1 className="brand-display brand-enter brand-enter-delay-1 mt-6 text-[clamp(3.2rem,7.5vw,6.2rem)] font-black leading-[0.92] text-[#F4F1E9]">
            WORLDS IN MOTION.
            <br />
            <span className="text-[#E83708]">CLARITY IS AUTHORED.</span>
          </h1>
          <p className="brand-enter brand-enter-delay-2 mt-7 max-w-xl text-base leading-relaxed text-[#B6B0A4] md:text-lg">
            NOXES makes tools for people who shape digital worlds. Built for creators. Not consumers. First up: NOXES for FiveM — a calmer, reviewable way to build and run servers.
          </p>

          <div className="brand-enter brand-enter-delay-3 mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="brand-button-primary">
              Explore NOXES <span aria-hidden="true">→</span>
            </a>
            <a href="#demo" className="brand-button-secondary">
              See how it works <span aria-hidden="true">↘</span>
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-xs md:text-sm text-[#B6B0A4]" aria-label="NOXES principles">
            {PROMISES.map((promise) => (
              <li key={promise} className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#E83708]/15 text-[#E83708]">
                  <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
                </span>
                {promise}
              </li>
            ))}
          </ul>
        </ScrollParallax>

        <ScrollParallax y={[36, -56]} rotate={[0.4, -0.4]} className="brand-stage mx-auto w-full max-w-2xl lg:ml-auto">
          <div className="brand-stage-orbit" aria-hidden="true" />

          <div
            role="img"
            aria-label="Illustration of the NOXES for FiveM workspace showing a proposed Lua change staged for review"
            className="brand-product-window relative z-[1] overflow-hidden rounded-sm border border-[#414548] bg-[#181A1D]"
          >
            <div className="brand-window-bar flex items-center justify-between gap-4 border-b border-[#414548] bg-[#111315] px-5 py-3.5 md:px-6">
              <div className="flex items-center gap-3">
                <img src="/brand/13_Desktop_App_Icon.png" alt="" aria-hidden="true" className="h-6 w-6" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#68665F]">NOXES for FiveM</p>
                  <p className="text-xs font-semibold text-[#F4F1E9]">Authoring Pipeline</p>
                </div>
              </div>
              <span className="rounded-sm border border-[#E83708]/40 bg-[#E83708]/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#E83708]">
                Staged · Review first
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-[#414548] bg-[#202326]/70 px-5 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#68665F] md:px-6">
              <span>Workspace / Resources / shop</span>
              <span className="hidden text-[#B6B0A4] sm:inline">Review mode</span>
            </div>

            <div className="grid min-h-[360px] sm:grid-cols-[150px_1fr]">
              <aside className="hidden border-r border-[#414548] bg-[#141618] p-4 sm:block">
                <p className="mb-3 px-2 font-mono text-[9px] uppercase tracking-[0.15em] text-[#68665F]">Workspace</p>
                <div className="flex items-center gap-2 rounded-sm border border-[#E83708]/30 bg-[#E83708]/10 px-2.5 py-2 text-xs font-medium text-[#F4F1E9]">
                  <ScanSearch aria-hidden="true" className="h-3.5 w-3.5 text-[#E83708]" />
                  Resources
                </div>
                <div className="mt-1 flex items-center gap-2 px-2.5 py-2 text-xs text-[#B6B0A4]">
                  <GitBranch aria-hidden="true" className="h-3.5 w-3.5 text-[#68665F]" />
                  Checkpoints
                </div>
                <div className="mt-5 border-t border-[#414548] pt-4 font-mono text-[10px] leading-relaxed text-[#68665F]">
                  <p className="px-2">▾ resources</p>
                  <p className="px-2">　shop</p>
                  <p className="px-2">　　fxmanifest.lua</p>
                  <p className="px-2 text-[#B6B0A4]">　　config.lua</p>
                </div>
              </aside>

              <div className="min-w-0 bg-[#181A1D] p-4 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#68665F]">Pipeline</p>
                    <h2 className="mt-0.5 text-sm font-semibold text-[#F4F1E9]">Review proposed changes</h2>
                  </div>
                  <span className="rounded-sm border border-[#414548] bg-[#202326] px-2 py-0.5 font-mono text-[9px] text-[#B6B0A4]">1 file changed</span>
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {PIPELINE.map((step, index) => (
                    <span
                      key={step}
                      className={`flex shrink-0 items-center gap-2 rounded-sm border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] ${
                        index === 1
                          ? 'border-[#E83708]/40 bg-[#E83708]/10 text-[#E83708]'
                          : 'border-[#414548] text-[#68665F]'
                      }`}
                    >
                      <span>0{index + 1}</span>
                      {step}
                    </span>
                  ))}
                </div>

                <div className="mt-4 overflow-hidden rounded-sm border border-[#414548] bg-[#111315]">
                  <div className="flex items-center justify-between border-b border-[#414548] bg-[#16181A] px-4 py-2">
                    <span className="font-mono text-[10px] text-[#B6B0A4]">resources / shop / config.lua</span>
                    <span className="font-mono text-[9px] text-[#E83708]">+2 &nbsp; <span className="text-[#68665F]">−1</span></span>
                  </div>
                  <div className="font-mono text-[11px] leading-[2]">
                    {DIFF_LINES.map((line, index) => (
                      <div
                        key={`${line.number}-${index}`}
                        className={`flex items-center gap-3 px-4 ${
                          line.kind === 'add'
                            ? 'bg-[#E83708]/10 text-[#E83708]'
                            : line.kind === 'remove'
                              ? 'text-[#68665F] line-through'
                              : 'text-[#68665F]'
                        }`}
                      >
                        <span className="w-5 shrink-0 text-right text-[#414548]">{line.number}</span>
                        <span className="w-3 shrink-0">{line.kind === 'add' ? '+' : line.kind === 'remove' ? '−' : ' '}</span>
                        <span className="truncate">{line.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 rounded-sm border border-[#414548] bg-[#202326] p-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#F4F1E9]">Nothing changes until you approve.</p>
                    <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.09em] text-[#68665F]">
                      <GitBranch aria-hidden="true" className="h-3 w-3 text-[#E83708]" /> Auto Git checkpoint on apply
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center justify-center rounded-sm bg-[#E83708] px-4 py-2 text-xs font-bold text-[#111315]">
                    Approve change
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[#414548] bg-[#111315] px-5 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#68665F] md:px-6">
              <span>Human in control</span>
              <span className="hidden sm:inline">Checkpoint before apply</span>
              <span>Authoring preview</span>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-sm border border-[#414548] bg-[#202326] p-3.5 shadow-2xl backdrop-blur md:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#E83708]/15 text-[#E83708]">
              <GitBranch aria-hidden="true" className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-xs font-semibold text-[#F4F1E9]">Reviewable by design</span>
              <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-wider text-[#68665F]">Your files · Your call</span>
            </span>
          </div>
        </ScrollParallax>
      </div>

      <div className="brand-section-rule absolute bottom-0 left-0 right-0" aria-hidden="true" />
    </section>
  );
}
