import { ArrowRight, MapPinned, TrendingDown, Users2, Wallet } from 'lucide-react'
import { useCountUp } from '@/lib/hooks'
import { Reveal } from './Reveal'

const STATS = [
  { icon: MapPinned, label: 'Idle rooms available', value: 1284, suffix: '+' },
  { icon: Users2, label: 'Local vendors connected', value: 312, suffix: '+' },
  { icon: Wallet, label: 'Tourist savings generated', value: 940000, prefix: '₹', suffix: '' },
  { icon: TrendingDown, label: 'Crowd redirected', value: 27, suffix: '%' },
]

function StatCard({ icon: Icon, label, value, prefix = '', suffix = '' }: (typeof STATS)[number]) {
  const count = useCountUp(value, 1800)
  return (
    <div className="glass rounded-2xl p-4 text-center sm:p-5">
      <Icon className="mx-auto mb-2 h-5 w-5 text-[color:var(--color-cyan-glow)]" />
      <div className="font-display text-2xl text-white sm:text-3xl">
        {prefix}
        {count.toLocaleString('en-IN')}
        {suffix}
      </div>
      <div className="mt-1 text-xs text-slate-400">{label}</div>
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-24 pt-32 sm:pt-40"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,217,138,0.18), transparent), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(52,211,240,0.14), transparent), url(https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/85 to-navy-950" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-emerald-glow)]/30 bg-[color:var(--color-emerald-glow)]/10 px-4 py-1.5 text-xs font-semibold text-[color:var(--color-emerald-glow)]">
              Smart India Hackathon 2026 Prototype
            </p>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Travel <span className="text-gradient-emerald">Beyond the Crowd</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              YatraX connects your trip with idle rooms, guides, cabs and activity slots that
              hotels, homestays and local operators already have available — then redirects you
              toward quieter, equally rewarding destinations with real discounts and cashback.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#trip-planner"
                className="focus-ring glow-emerald group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--color-emerald-glow)] to-[color:var(--color-cyan-glow)] px-6 py-3.5 text-sm font-semibold text-navy-950 transition-transform hover:scale-105"
              >
                Plan a Smarter Trip
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#capacity-map"
                className="focus-ring glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore Live Capacity
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              All statistics above are Simulated Demo Data for prototype purposes.
            </p>
          </Reveal>

          <Reveal delayMs={150} className="relative hidden lg:block">
            <div className="animate-float glass-strong glow-cyan mx-auto max-w-sm rounded-3xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-rose-300">
                  Overcrowded
                </span>
                <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-medium text-rose-300">
                  Load 88/100
                </span>
              </div>
              <div className="font-display text-xl text-white">Ooty</div>
              <p className="mt-1 text-xs text-slate-400">Nilgiris, Tamil Nadu · High crowd density</p>

              <div className="my-4 flex items-center gap-2 text-[color:var(--color-emerald-glow)]">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-semibold">Smart Redirect</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="rounded-2xl border border-[color:var(--color-emerald-glow)]/25 bg-[color:var(--color-emerald-glow)]/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-emerald-glow)]">
                    Quieter Alternative
                  </span>
                  <span className="rounded-full bg-[color:var(--color-emerald-glow)]/15 px-2.5 py-1 text-xs font-medium text-[color:var(--color-emerald-glow)]">
                    Load 29/100
                  </span>
                </div>
                <div className="font-display text-lg text-white">Kotagiri</div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                  <span>~30% lower crowd</span>
                  <span className="font-semibold text-[color:var(--color-gold-glow)]">Save ~₹1,150</span>
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-slate-500">Simulated Demo Data</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
