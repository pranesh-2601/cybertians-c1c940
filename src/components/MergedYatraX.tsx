import { useMemo, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  BadgeIndianRupee,
  BedDouble,
  Check,
  Compass,
  Gauge,
  HeartHandshake,
  MapPinned,
  Menu,
  ShieldCheck,
  Sparkles,
  Store,
  Users2,
  Wallet,
  X,
} from 'lucide-react'
import { destinations, impactMetrics, itineraryPool, touristRequests, transactions, vendorOffers } from '@/data/demoData'
import '../merge-ui.css'

const navItems = [
  ['Trip Planner', '#trip-planner'],
  ['Capacity Map', '#capacity-map'],
  ['Reverse Bids', '#reverse-bids'],
  ['Wallet & Safety', '#wallet-safety'],
  ['Vendor Dashboard', '#vendor-dashboard'],
  ['Impact', '#impact'],
] as const

const interests = ['Nature', 'Adventure', 'Heritage', 'Food', 'Wellness', 'Photography']

async function logDemoEvent(type: string, payload: Record<string, unknown>) {
  try {
    await fetch('/api/demo-events', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type, payload }),
    })
  } catch {
    // Demo event persistence is optional; UI should still work offline.
  }
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[.24em] text-[color:var(--color-emerald-glow)]">{eyebrow}</p>
      <h2 className="font-display mt-2 text-3xl text-white sm:text-4xl">{title}</h2>
      <p className="mt-3 leading-7 text-slate-400">{text}</p>
    </div>
  )
}

export function MergedYatraX() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [origin, setOrigin] = useState('Coimbatore')
  const [destination, setDestination] = useState('Ooty')
  const [days, setDays] = useState(3)
  const [travellers, setTravellers] = useState(2)
  const [budget, setBudget] = useState('15000')
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Nature', 'Photography'])
  const [planned, setPlanned] = useState(false)
  const [capacityFilter, setCapacityFilter] = useState<'All' | 'Low' | 'Moderate' | 'High'>('All')
  const [acceptedOffer, setAcceptedOffer] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : window.localStorage.getItem('yatrax:accepted-offer'),
  )
  const [bidPosted, setBidPosted] = useState(false)
  const [vendorRegistered, setVendorRegistered] = useState(false)

  const selectedDestination = destinations.find((item) => item.name === destination) ?? destinations[0]

  const itinerary = useMemo(() => {
    return Array.from({ length: Math.max(1, Math.min(days, 7)) }, (_, index) => {
      const preferred = itineraryPool.filter((item) =>
        item.interests.some((interest) => selectedInterests.includes(interest)),
      )
      const pool = preferred.length ? preferred : itineraryPool
      return pool[index % pool.length]
    })
  }, [days, selectedInterests])

  const filteredDestinations = destinations.filter((item) => {
    if (capacityFilter === 'All') return true
    if (capacityFilter === 'Low') return item.load < 45
    if (capacityFilter === 'Moderate') return item.load >= 45 && item.load < 75
    return item.load >= 75
  })

  function toggleInterest(value: string) {
    setSelectedInterests((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    )
  }

  function planTrip(event: FormEvent) {
    event.preventDefault()
    setPlanned(true)
    void logDemoEvent('trip_planned', { origin, destination, days, travellers, budget, interests: selectedInterests })
  }

  function acceptOffer(id: string) {
    if (acceptedOffer) return
    setAcceptedOffer(id)
    window.localStorage.setItem('yatrax:accepted-offer', id)
    void logDemoEvent('offer_accepted', { offerId: id })
  }

  function postBid() {
    if (bidPosted) return
    setBidPosted(true)
    void logDemoEvent('bid_posted', { destination, budget, travellers })
  }

  function registerVendor() {
    if (vendorRegistered) return
    setVendorRegistered(true)
    void logDemoEvent('vendor_registered', { source: 'merged-ui-demo' })
  }

  return (
    <div className="merge-ui overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8" aria-label="Primary">
          <a href="#top" className="focus-ring flex items-center gap-2 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[color:var(--color-emerald-glow)] to-[color:var(--color-cyan-glow)]">
              <Compass className="h-5 w-5 text-navy-950" strokeWidth={2.6} />
            </span>
            <span className="font-display text-xl">YatraX</span>
          </a>
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={href} className="focus-ring text-xs font-semibold text-slate-300 transition hover:text-white" href={href}>
                {label}
              </a>
            ))}
          </div>
          <a href="#trip-planner" className="focus-ring glow-emerald hidden rounded-full bg-gradient-to-r from-[color:var(--color-emerald-glow)] to-[color:var(--color-cyan-glow)] px-5 py-2.5 text-sm font-bold text-navy-950 lg:inline-flex">
            Plan My Trip
          </a>
          <button className="focus-ring rounded-lg p-2 text-white lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-white/10 bg-navy-950/95 px-5 py-4 lg:hidden">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-2 py-3 text-sm text-slate-200 hover:bg-white/5">
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section
          id="top"
          className="relative overflow-hidden pb-24 pt-36 sm:pt-44"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 75% 55% at 45% 0%, rgba(34,217,138,.19), transparent), radial-gradient(ellipse 50% 45% at 90% 15%, rgba(52,211,240,.15), transparent), url(https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/65 via-navy-950/88 to-navy-950" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-[color:var(--color-emerald-glow)]/30 bg-[color:var(--color-emerald-glow)]/10 px-4 py-1.5 text-xs font-bold text-[color:var(--color-emerald-glow)]">
                  Smart India Hackathon 2026 Prototype
                </div>
                <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[.98] text-white sm:text-6xl lg:text-7xl">
                  Travel <span className="text-gradient-emerald">Beyond the Crowd</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  Match travellers with unused rooms, guides, cabs and activity slots, then redirect demand toward quieter destinations with better value.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#trip-planner" className="focus-ring glow-emerald inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--color-emerald-glow)] to-[color:var(--color-cyan-glow)] px-6 py-3.5 text-sm font-bold text-navy-950">
                    Plan a Smarter Trip <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#capacity-map" className="focus-ring glass rounded-full px-6 py-3.5 text-sm font-bold text-white">Explore Capacity</a>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ['1,284+', 'Idle rooms'],
                    ['312+', 'Local vendors'],
                    ['₹9.4L', 'Tourist savings'],
                    ['27%', 'Crowd redirected'],
                  ].map(([value, label]) => (
                    <div key={label} className="glass rounded-2xl p-4 text-center">
                      <strong className="font-display block text-2xl text-white">{value}</strong>
                      <span className="text-xs text-slate-400">{label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">Statistics shown are simulated demo data.</p>
              </div>

              <div className="animate-float glass-strong glow-cyan rounded-3xl p-5 lg:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Overcrowded</span>
                  <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-xs text-rose-300">Load 91/100</span>
                </div>
                <h3 className="font-display mt-2 text-2xl text-white">Ooty</h3>
                <p className="text-sm text-slate-400">Nilgiris · high visitor density</p>
                <div className="my-5 flex items-center gap-3 text-xs font-semibold text-[color:var(--color-emerald-glow)]">
                  <div className="h-px flex-1 bg-white/10" /> Smart Redirect <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="rounded-2xl border border-[color:var(--color-emerald-glow)]/25 bg-[color:var(--color-emerald-glow)]/5 p-4">
                  <div className="flex items-center justify-between text-xs text-[color:var(--color-emerald-glow)]">
                    <span className="font-bold uppercase tracking-wider">Quieter Alternative</span><span>Load 29/100</span>
                  </div>
                  <h4 className="font-display mt-2 text-xl text-white">Kotagiri</h4>
                  <div className="mt-3 flex justify-between text-xs text-slate-300"><span>29 km away</span><span className="font-bold text-[color:var(--color-gold-glow)]">Save ~22%</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="trip-planner" className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionTitle eyebrow="Module 1" title="Smart Trip Planner" text="Generate a practical low-crowd itinerary from the prototype dataset while preserving YatraX's existing event logging backend." />
            <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
              <form onSubmit={planTrip} className="glass rounded-3xl p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-slate-300">Starting location<input value={origin} onChange={(e) => setOrigin(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900/70 px-3.5 py-3 text-white outline-none" required /></label>
                  <label className="text-sm text-slate-300">Destination<select value={destination} onChange={(e) => setDestination(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900/70 px-3.5 py-3 text-white outline-none">{destinations.map((d) => <option key={d.name}>{d.name}</option>)}</select></label>
                  <label className="text-sm text-slate-300">Days<input type="number" min={1} max={7} value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900/70 px-3.5 py-3 text-white outline-none" /></label>
                  <label className="text-sm text-slate-300">Travellers<input type="number" min={1} max={20} value={travellers} onChange={(e) => setTravellers(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900/70 px-3.5 py-3 text-white outline-none" /></label>
                  <label className="text-sm text-slate-300 sm:col-span-2">Budget (₹)<input type="number" min={2000} value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-navy-900/70 px-3.5 py-3 text-white outline-none" /></label>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {interests.map((item) => {
                    const active = selectedInterests.includes(item)
                    return <button key={item} type="button" onClick={() => toggleInterest(item)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${active ? 'border-[color:var(--color-emerald-glow)]/50 bg-[color:var(--color-emerald-glow)]/15 text-[color:var(--color-emerald-glow)]' : 'border-white/10 text-slate-400'}`}>{item}</button>
                  })}
                </div>
                <button className="glow-emerald mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--color-emerald-glow)] to-[color:var(--color-cyan-glow)] px-6 py-3.5 text-sm font-bold text-navy-950"><Sparkles className="h-4 w-4" /> Generate Itinerary</button>
              </form>

              <div className="glass rounded-3xl p-6 sm:p-8">
                {!planned ? <div className="grid min-h-72 place-items-center text-center text-slate-500"><div><MapPinned className="mx-auto mb-3 h-8 w-8" /><p>Fill the planner and generate your route.</p></div></div> : <div>
                  <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[['Destination', destination], ['Crowd', `${selectedDestination.load}/100`], ['Rooms', String(selectedDestination.rooms)], ['Discount', `${selectedDestination.discount}%`]].map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 p-3 text-center"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-bold text-white">{value}</p></div>)}
                  </div>
                  <div className="space-y-3">
                    {itinerary.map((day, index) => <div key={`${day.location}-${index}`} className="rounded-2xl border border-white/10 bg-navy-900/45 p-4"><div className="flex justify-between gap-3"><div><p className="text-xs font-bold text-[color:var(--color-cyan-glow)]">Day {index + 1}</p><h4 className="font-semibold text-white">{day.location}</h4></div><span className="h-fit rounded-full border border-[color:var(--color-emerald-glow)]/25 bg-[color:var(--color-emerald-glow)]/10 px-2.5 py-1 text-xs text-[color:var(--color-emerald-glow)]">{day.crowd} crowd</span></div><p className="mt-2 text-sm text-slate-300">{day.activity}</p><p className="mt-1 text-xs leading-5 text-slate-500">{day.reason}</p></div>)}
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </section>

        <section id="capacity-map" className="bg-white/[.018] py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionTitle eyebrow="Module 2" title="Idle Capacity Map" text="See where rooms, guides and cab seats are underused, and compare load before deciding where to travel." />
            <div className="mb-6 flex flex-wrap gap-2">{(['All','Low','Moderate','High'] as const).map((filter) => <button key={filter} onClick={() => setCapacityFilter(filter)} className={`rounded-full border px-4 py-2 text-xs font-bold ${capacityFilter === filter ? 'border-[color:var(--color-cyan-glow)]/45 bg-[color:var(--color-cyan-glow)]/10 text-[color:var(--color-cyan-glow)]' : 'border-white/10 text-slate-400'}`}>{filter}</button>)}</div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {filteredDestinations.map((item) => <article key={item.name} className="glass rounded-3xl p-5 transition hover:-translate-y-1"><div className="flex items-start justify-between"><div><h3 className="font-display text-xl text-white">{item.name}</h3><p className="mt-1 text-xs text-slate-500">{item.subtitle}</p></div><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.load >= 75 ? 'bg-rose-500/15 text-rose-300' : item.load >= 45 ? 'bg-amber-400/10 text-amber-200' : 'bg-[color:var(--color-emerald-glow)]/10 text-[color:var(--color-emerald-glow)]'}`}>{item.load}/100</span></div><div className="mt-5 grid grid-cols-3 gap-2 text-center"><div className="rounded-xl bg-white/[.035] p-3"><BedDouble className="mx-auto h-4 w-4 text-[color:var(--color-cyan-glow)]" /><strong className="mt-1 block text-sm">{item.rooms}</strong><span className="text-[10px] text-slate-500">rooms</span></div><div className="rounded-xl bg-white/[.035] p-3"><Users2 className="mx-auto h-4 w-4 text-[color:var(--color-emerald-glow)]" /><strong className="mt-1 block text-sm">{item.guides}</strong><span className="text-[10px] text-slate-500">guides</span></div><div className="rounded-xl bg-white/[.035] p-3"><Gauge className="mx-auto h-4 w-4 text-[color:var(--color-gold-glow)]" /><strong className="mt-1 block text-sm">{item.cabSeats}</strong><span className="text-[10px] text-slate-500">seats</span></div></div><div className="mt-4 border-t border-white/10 pt-4 text-xs text-slate-400">Redirect: <span className="font-bold text-white">{item.alternative}</span> · save ~{item.savings}%</div></article>)}
            </div>
          </div>
        </section>

        <section id="reverse-bids" className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionTitle eyebrow="Module 3" title="Reverse Bidding Marketplace" text="Travellers publish demand once and idle-capacity vendors compete with transparent offers." />
            <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
              <div className="glass rounded-3xl p-6"><BadgeIndianRupee className="h-6 w-6 text-[color:var(--color-gold-glow)]" /><h3 className="font-display mt-3 text-2xl">Your travel request</h3><p className="mt-2 text-sm text-slate-400">{travellers} travellers · {destination} · budget ₹{Number(budget || 0).toLocaleString('en-IN')}</p><button onClick={postBid} disabled={bidPosted} className="mt-6 w-full rounded-full bg-[color:var(--color-emerald-glow)] px-5 py-3 text-sm font-bold text-navy-950 disabled:opacity-60">{bidPosted ? 'Request posted' : 'Post reverse bid'}</button></div>
              <div className="grid gap-4 md:grid-cols-3">{vendorOffers.map((offer) => <article key={offer.id} className="glass rounded-3xl p-5"><div className="flex justify-between gap-2"><h3 className="font-bold text-white">{offer.vendor}</h3><span className="text-xs text-[color:var(--color-gold-glow)]">★ {offer.rating}</span></div><p className="font-display mt-5 text-3xl text-white">₹{offer.price.toLocaleString('en-IN')}</p><p className="text-xs text-[color:var(--color-emerald-glow)]">{offer.discount}% below listed price</p><div className="mt-4 flex flex-wrap gap-1.5">{offer.facilities.map((item) => <span key={item} className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-slate-400">{item}</span>)}</div><button onClick={() => acceptOffer(offer.id)} disabled={Boolean(acceptedOffer)} className={`mt-5 w-full rounded-full px-4 py-2.5 text-xs font-bold ${acceptedOffer === offer.id ? 'bg-[color:var(--color-emerald-glow)]/15 text-[color:var(--color-emerald-glow)]' : 'border border-white/10 text-white disabled:opacity-40'}`}>{acceptedOffer === offer.id ? <span className="flex items-center justify-center gap-1"><Check className="h-3.5 w-3.5" /> Accepted</span> : 'Accept offer'}</button></article>)}</div>
            </div>
          </div>
        </section>

        <section id="wallet-safety" className="bg-white/[.018] py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Module 4" title="Wallet & Safety" text="A prototype wallet for smart-redirect rewards plus visible safety actions for traveller confidence." /><div className="grid gap-6 lg:grid-cols-2"><div className="glass rounded-3xl p-6 sm:p-8"><Wallet className="h-6 w-6 text-[color:var(--color-emerald-glow)]" /><div className="mt-4 flex items-end justify-between"><div><p className="text-xs text-slate-500">Demo balance</p><p className="font-display text-4xl text-white">₹2,460</p></div><span className="rounded-full bg-[color:var(--color-gold-glow)]/10 px-3 py-1.5 text-xs text-[color:var(--color-gold-glow)]">320 reward coins</span></div><div className="mt-6 space-y-3">{transactions.map((item) => <div key={`${item.label}-${item.date}`} className="flex items-center justify-between rounded-xl border border-white/10 p-3"><div><p className="text-sm text-slate-200">{item.label}</p><p className="text-xs text-slate-500">{item.date}</p></div><span className={`text-sm font-bold ${item.type === 'credit' ? 'text-[color:var(--color-emerald-glow)]' : 'text-slate-300'}`}>{item.amount}</span></div>)}</div></div><div className="grid gap-4 sm:grid-cols-2"><div className="glass rounded-3xl p-6"><ShieldCheck className="h-7 w-7 text-[color:var(--color-cyan-glow)]" /><h3 className="font-display mt-4 text-xl">Verified vendor layer</h3><p className="mt-2 text-sm leading-6 text-slate-400">Demo trust badges, ratings and offer details stay visible before acceptance.</p></div><div className="glass rounded-3xl p-6"><HeartHandshake className="h-7 w-7 text-rose-300" /><h3 className="font-display mt-4 text-xl">SOS demo</h3><p className="mt-2 text-sm leading-6 text-slate-400">Safety interaction can record an SOS prototype event without claiming real emergency dispatch.</p><button onClick={() => void logDemoEvent('sos_demo', { destination })} className="mt-5 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-300">Trigger SOS demo</button></div></div></div></div>
        </section>

        <section id="vendor-dashboard" className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Module 5" title="Vendor Dashboard" text="Show idle inventory, tourist demand and quick onboarding in the same polished marketplace experience." /><div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]"><div className="glass rounded-3xl p-6 sm:p-8"><div className="flex items-center gap-3"><Store className="text-[color:var(--color-emerald-glow)]" /><h3 className="font-display text-2xl">Live tourist requests</h3></div><div className="mt-6 space-y-3">{touristRequests.map((request) => <div key={request.id} className="grid gap-2 rounded-2xl border border-white/10 p-4 sm:grid-cols-[.8fr_1fr_1fr_auto] sm:items-center"><div><p className="text-xs text-slate-500">{request.id}</p><p className="font-semibold text-white">{request.destination}</p></div><p className="text-sm text-slate-300">{request.service}</p><p className="text-sm text-[color:var(--color-gold-glow)]">{request.budget}</p><span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-400">{request.status}</span></div>)}</div></div><div className="glass rounded-3xl p-6 sm:p-8"><h3 className="font-display text-2xl">Join YatraX supply</h3><p className="mt-2 text-sm leading-6 text-slate-400">Register a demo vendor profile and expose idle rooms, guides or seats to traveller requests.</p><div className="mt-6 grid grid-cols-2 gap-3">{[['Rooms','64'],['Guides','18'],['Cab seats','67'],['Avg. saving','21%']].map(([label,value]) => <div key={label} className="rounded-xl border border-white/10 p-4 text-center"><strong className="font-display text-2xl text-white">{value}</strong><p className="text-xs text-slate-500">{label}</p></div>)}</div><button onClick={registerVendor} disabled={vendorRegistered} className="mt-6 w-full rounded-full bg-gradient-to-r from-[color:var(--color-emerald-glow)] to-[color:var(--color-cyan-glow)] px-5 py-3 text-sm font-bold text-navy-950 disabled:opacity-60">{vendorRegistered ? 'Vendor registered' : 'Register demo vendor'}</button></div></div></div></section>

        <section id="impact" className="bg-white/[.018] py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Module 6" title="Impact Dashboard" text="Measure how unused tourism capacity can translate into savings, distributed demand and stronger local participation." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{impactMetrics.map((metric) => <div key={metric.label} className="glass rounded-3xl p-5"><div className="flex items-end justify-between gap-3"><div><p className="text-xs text-slate-500">{metric.label}</p><p className="font-display mt-1 text-3xl text-white">{metric.value}</p></div><span className="text-xs text-[color:var(--color-emerald-glow)]">{metric.progress}%</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-[color:var(--color-emerald-glow)] to-[color:var(--color-cyan-glow)]" style={{ width: `${metric.progress}%` }} /></div></div>)}</div><p className="mt-5 text-xs text-slate-500">Impact figures are simulated prototype data, not live production metrics.</p></div></section>
      </main>

      <footer className="border-t border-white/10 py-10"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div className="flex items-center gap-2 text-slate-300"><Compass className="h-4 w-4 text-[color:var(--color-emerald-glow)]" /><span className="font-display text-lg">YatraX</span></div><p>Idle Capacity Exchange · SIH 2026 prototype</p></div></footer>
    </div>
  )
}
