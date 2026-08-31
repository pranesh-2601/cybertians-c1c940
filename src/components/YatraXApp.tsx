import { useEffect, useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeIndianRupee,
  BedDouble,
  Building2,
  Bus,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  CircleDollarSign,
  CloudSun,
  Coins,
  Compass,
  CreditCard,
  Gauge,
  Github,
  HeartPulse,
  IndianRupee,
  Map,
  MapPin,
  Menu,
  Navigation,
  Phone,
  RefreshCcw,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Timer,
  TrendingUp,
  Users,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'
import { destinations, impactMetrics, itineraryPool, touristRequests, transactions, vendorOffers } from '@/data/demoData'
import type { WeatherResult } from '@/services/weather'
import { fetchWeather } from '@/services/weather'
import { logDemoEvent, readDemoState, resetDemoState, writeDemoState } from '@/utils/storage'

const navItems = [
  ['Trip Planner', 'planner'],
  ['Capacity Map', 'capacity'],
  ['Reverse Bids', 'bids'],
  ['Wallet & Safety', 'wallet'],
  ['Vendor Dashboard', 'vendors'],
  ['Impact', 'impact'],
] as const

const interests = ['Nature', 'Adventure', 'Heritage', 'Food', 'Wellness', 'Photography']
const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) frame = requestAnimationFrame(tick)
    else setValue(target)
    return () => cancelAnimationFrame(frame)
  }, [duration, target])
  return value
}

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="YatraX home">
      <span className="logo-mark"><Route size={21} /></span>
      <span>Yatra<span>X</span></span>
    </a>
  )
}

function DemoBadge({ children = 'Simulated Demo Data' }: { children?: ReactNode }) {
  return <span className="demo-badge"><span />{children}</span>
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error && <small role="alert">{error}</small>}
    </label>
  )
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 4500)
    return () => window.clearTimeout(timer)
  }, [onClose])
  return <div className="toast" role="status"><Check size={18} />{message}<button onClick={onClose} aria-label="Dismiss message"><X size={16} /></button></div>
}

function NavigationBar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Logo />
        <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <a className="button button-primary nav-cta" href="#planner">Plan My Trip <ArrowRight size={16} /></a>
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  const rooms = useCountUp(2847)
  const vendors = useCountUp(1268)
  const savings = useCountUp(28)
  const redirected = useCountUp(18420)
  return (
    <section className="hero" id="top">
      <div className="hero-scenery" aria-hidden="true"><div className="sun" /><div className="mountain mountain-back" /><div className="mountain mountain-front" /><div className="road" /></div>
      <div className="hero-grid container">
        <div className="hero-copy reveal">
          <DemoBadge />
          <p className="eyebrow">India’s tourism capacity exchange</p>
          <h1>Travel Beyond<br /><em>the Crowd</em></h1>
          <p className="hero-lead">YatraX converts unused rooms, seats and local time slots into affordable journeys—redirecting travellers toward remarkable places with room to welcome them.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#planner">Plan a Smarter Trip <Sparkles size={17} /></a>
            <a className="button button-secondary" href="#capacity">Explore Demo Capacity <Map size={17} /></a>
          </div>
          <p className="prototype-note"><ShieldCheck size={15} /> Rule-Based Recommendation · AI Integration Planned</p>
        </div>
        <div className="recommendation-card glass reveal delay-2">
          <div className="recommendation-top"><span>Smart Redirect</span><Navigation size={18} /></div>
          <div className="route-point crowded"><i /><div><small>High crowd · 91%</small><strong>Ooty</strong></div><span>Popular</span></div>
          <div className="route-line"><span>29 km</span></div>
          <div className="route-point quiet"><i /><div><small>Low crowd · 29%</small><strong>Kotagiri</strong></div><span>Save 22%</span></div>
          <div className="recommendation-footer"><div><BedDouble size={16} />72 rooms</div><div><Users size={16} />21 guides</div><div><Coins size={16} />₹620 back</div></div>
        </div>
      </div>
      <div className="hero-stats container">
        <div><strong>{rooms.toLocaleString('en-IN')}</strong><span>Idle rooms available</span></div>
        <div><strong>{vendors.toLocaleString('en-IN')}+</strong><span>Local vendors connected</span></div>
        <div><strong>{savings}%</strong><span>Average tourist savings</span></div>
        <div><strong>{redirected.toLocaleString('en-IN')}</strong><span>Visitors redirected</span></div>
      </div>
    </section>
  )
}

type PlannerForm = { start: string; destination: string; days: number; travellers: number; budget: number; interests: string[] }

function TripPlanner() {
  const [form, setForm] = useState<PlannerForm>({ start: '', destination: 'Ooty', days: 3, travellers: 2, budget: 12000, interests: ['Nature'] })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'empty' | 'loading' | 'success'>('empty')
  const itinerary = useMemo(() => {
    const ranked = [...itineraryPool].sort((a, b) => b.interests.filter((item) => form.interests.includes(item)).length - a.interests.filter((item) => form.interests.includes(item)).length)
    return ranked.slice(0, form.days)
  }, [form.days, form.interests])

  const toggleInterest = (interest: string) => setForm((current) => ({ ...current, interests: current.interests.includes(interest) ? current.interests.filter((item) => item !== interest) : [...current.interests, interest] }))
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (form.start.trim().length < 2) nextErrors.start = 'Enter a valid starting location.'
    if (form.days < 1 || form.days > 7) nextErrors.days = 'Choose between 1 and 7 days.'
    if (form.travellers < 1 || form.travellers > 12) nextErrors.travellers = 'Choose 1 to 12 travellers.'
    if (form.budget < 3000) nextErrors.budget = 'Minimum prototype budget is ₹3,000.'
    if (!form.interests.length) nextErrors.interests = 'Select at least one travel interest.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setStatus('loading')
    window.setTimeout(() => {
      setStatus('success')
      writeDemoState('lastTrip', form)
      void logDemoEvent('trip_planned', { destination: form.destination, days: form.days, travellers: form.travellers, budget: form.budget })
    }, 850)
  }

  return (
    <section className="section" id="planner">
      <div className="container">
        <SectionHeading eyebrow="01 · Smart Trip Planner" title="A better route starts with capacity." copy="Tell us what matters. YatraX balances your budget and interests against prototype crowd levels and unused local capacity." />
        <div className="planner-layout">
          <form className="glass panel planner-form reveal" onSubmit={submit} noValidate>
            <div className="panel-title"><div><Compass /><span><strong>Trip inputs</strong><small>All fields stay private in this demo</small></span></div><DemoBadge /></div>
            <div className="form-grid">
              <Field label="Starting location" error={errors.start}><input value={form.start} onChange={(event) => setForm({ ...form, start: event.target.value })} placeholder="e.g. Chennai" /></Field>
              <Field label="Preferred destination"><select value={form.destination} onChange={(event) => setForm({ ...form, destination: event.target.value })}>{destinations.map((item) => <option key={item.name}>{item.name}</option>)}</select></Field>
              <Field label="Number of days" error={errors.days}><input type="number" min="1" max="7" value={form.days} onChange={(event) => setForm({ ...form, days: Number(event.target.value) })} /></Field>
              <Field label="Travellers" error={errors.travellers}><input type="number" min="1" max="12" value={form.travellers} onChange={(event) => setForm({ ...form, travellers: Number(event.target.value) })} /></Field>
              <Field label="Total budget" error={errors.budget}><div className="input-icon"><IndianRupee size={16} /><input type="number" min="3000" value={form.budget} onChange={(event) => setForm({ ...form, budget: Number(event.target.value) })} /></div></Field>
            </div>
            <fieldset className="interest-fieldset"><legend>Travel interests</legend><div className="interest-grid">{interests.map((interest) => <button type="button" key={interest} className={form.interests.includes(interest) ? 'interest active' : 'interest'} onClick={() => toggleInterest(interest)}>{interest === 'Photography' && <Camera size={15} />}{interest}</button>)}</div>{errors.interests && <small role="alert">{errors.interests}</small>}</fieldset>
            <button className="button button-primary full" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Matching capacity…' : 'Build My Rule-Based Itinerary'}<Sparkles size={17} /></button>
          </form>
          <div className="itinerary-wrap reveal delay-1" aria-live="polite">
            {status === 'empty' && <div className="glass empty-state"><div className="empty-orbit"><MapPin /></div><h3>Your balanced itinerary appears here</h3><p>Complete the planner to compare budget, interests, local vendors and prototype crowd levels.</p><span>Rule-Based Recommendation</span></div>}
            {status === 'loading' && <div className="glass loading-card">{[1, 2, 3].map((item) => <div className="skeleton-row" key={item}><i /><div><b /><span /></div></div>)}</div>}
            {status === 'success' && <div className="itinerary-results"><div className="result-summary glass"><div><DemoBadge>Rule-Based Recommendation</DemoBadge><h3>{form.days}-day lower-crowd route</h3><p>{currency.format(itinerary.reduce((sum, item) => sum + item.cost * form.travellers, 0))} estimated · {form.interests.join(' + ')}</p></div><span className="budget-match">{Math.min(98, Math.round((form.budget / Math.max(1, itinerary.reduce((sum, item) => sum + item.cost * form.travellers, 0))) * 92))}% budget match</span></div>{itinerary.map((item, index) => <article className="day-card glass" key={item.location}><div className="day-number">{String(index + 1).padStart(2, '0')}</div><div className="day-main"><div><small>Day {index + 1} · {item.crowd} crowd</small><h3>{item.location}</h3><p>{item.activity}</p></div><strong>{currency.format(item.cost * form.travellers)}</strong><p className="reason"><Sparkles size={14} />{item.reason}</p><div className="match-row"><span>{item.interests.filter((interest) => form.interests.includes(interest)).length || 1} interest matches</span><span>{destinations.find((destination) => destination.name === item.location)?.guides ?? 12} local vendors</span><span>{item.crowd} load</span></div></div></article>)}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}

function WeatherPanel() {
  const [city, setCity] = useState('Ooty')
  const [weather, setWeather] = useState<WeatherResult | null>(null)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const load = async (selected: string) => {
    setStatus('loading')
    try {
      setWeather(await fetchWeather(selected))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }
  useEffect(() => { void load(city) }, [city])
  return (
    <div className="weather glass">
      <div className="weather-heading"><div><CloudSun /><span><strong>Current API weather</strong><small>Weather data by Open-Meteo</small></span></div><select value={city} onChange={(event) => setCity(event.target.value)} aria-label="Choose destination for weather">{destinations.map((item) => <option key={item.name}>{item.name}</option>)}</select></div>
      {status === 'loading' && <div className="weather-loading"><i /><i /><i /></div>}
      {status === 'error' && <div className="weather-error"><AlertTriangle />Weather could not be loaded. Check your connection and retry.<button onClick={() => void load(city)}>Retry</button></div>}
      {status === 'success' && weather && <div className="weather-content"><div className="weather-temp"><span>{weather.icon}</span><div><strong>{Math.round(weather.temperature)}°C</strong><small>{weather.label} · Feels {Math.round(weather.apparentTemperature)}°</small></div></div><div className="weather-metrics"><span>Humidity <strong>{weather.humidity}%</strong></span><span>Wind <strong>{Math.round(weather.windSpeed)} km/h</strong></span></div><p><Compass size={16} />{weather.advisory}</p></div>}
    </div>
  )
}

function CrowdPill({ load }: { load: number }) {
  const status = load >= 76 ? 'High' : load >= 46 ? 'Moderate' : 'Low'
  return <span className={`crowd-pill ${status.toLowerCase()}`}>{status} · {load}</span>
}

function CapacityMap({ notify }: { notify: (message: string) => void }) {
  const [redirects, setRedirects] = useState<Record<string, boolean>>(() => readDemoState('redirects', {}))
  const accept = (name: string, alternative: string) => {
    if (Object.values(redirects).some(Boolean)) return
    const next = { ...redirects, [name]: true }
    setRedirects(next)
    writeDemoState('redirects', next)
    void logDemoEvent('redirect_accepted', { from: name, to: alternative })
    notify(`Redirect accepted to ${alternative}. ₹620 prototype cashback credited once.`)
  }
  return (
    <section className="section capacity-section" id="capacity">
      <div className="container">
        <SectionHeading eyebrow="02 · Destination Load Map" title="See where tourism has room to breathe." copy="Compare prototype load scores with available rooms, guides and cab seats across Tamil Nadu." />
        <div className="capacity-toolbar"><p><AlertTriangle size={16} />Load scores and availability shown in this prototype are simulated.</p><DemoBadge>Prototype Load Score</DemoBadge></div>
        <WeatherPanel />
        <div className="destination-grid">{destinations.map((destination, index) => { const cashbackUsed = Object.values(redirects).some(Boolean); const acceptedHere = Boolean(redirects[destination.name]); return <article className={`destination-card glass reveal bg-gradient-to-br ${destination.accent}`} style={{ animationDelay: `${index * 70}ms` }} key={destination.name}><div className="destination-head"><div><small>{destination.subtitle}</small><h3>{destination.name}</h3></div><CrowdPill load={destination.load} /></div><div className="load-meter"><span style={{ width: `${destination.load}%` }} /></div><div className="capacity-metrics"><span><BedDouble />{destination.rooms}<small>rooms</small></span><span><Users />{destination.guides}<small>guides</small></span><span><Bus />{destination.cabSeats}<small>cab seats</small></span><span><BadgeIndianRupee />{destination.discount}%<small>discount</small></span></div><div className="weather-strip"><CloudSun size={16} />{destination.weather}<span>Nearby: {destination.alternative}</span></div>{destination.load >= 80 && <div className="redirect-box"><div className="redirect-label"><Zap size={15} />Smart Redirect</div><div className="redirect-route"><strong>{destination.alternative}</strong><span>{destination.distance} km · save {destination.savings}%</span></div><div className="redirect-facts"><span>{destination.load - 48}% lower crowd</span><span>{destination.capacity}</span></div><button className={cashbackUsed ? 'button accepted' : 'button button-primary'} disabled={cashbackUsed} onClick={() => accept(destination.name, destination.alternative)}>{acceptedHere ? <><Check size={16} />Redirect accepted</> : cashbackUsed ? <><ShieldCheck size={16} />Cashback already used</> : <>Accept & Rebook<ArrowRight size={16} /></>}</button></div>}</article> })}</div>
      </div>
    </section>
  )
}

type BidForm = { destination: string; checkIn: string; checkOut: string; travellers: number; service: string; budget: number; requirements: string }

function ReverseBids({ notify }: { notify: (message: string) => void }) {
  const [form, setForm] = useState<BidForm>({ destination: 'Kotagiri', checkIn: '', checkOut: '', travellers: 2, service: 'Hotel / homestay', budget: 15000, requirements: '' })
  const [posted, setPosted] = useState(() => readDemoState('bidPosted', false))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [accepted, setAccepted] = useState<string | null>(() => readDemoState('acceptedOffer', null))
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    if (!posted || accepted) return
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [accepted, posted])
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!form.checkIn || !form.checkOut || new Date(form.checkOut) <= new Date(form.checkIn)) return setError('Choose valid check-in and check-out dates.')
    if (form.travellers < 1 || form.travellers > 12) return setError('Travellers must be between 1 and 12.')
    if (form.budget < 2000) return setError('Maximum budget must be at least ₹2,000.')
    setError('')
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setPosted(true)
      writeDemoState('bidPosted', true)
      void logDemoEvent('bid_posted', { destination: form.destination, service: form.service, travellers: form.travellers, budget: form.budget })
    }, 750)
  }
  const accept = (id: string, vendor: string) => {
    if (accepted) return
    setAccepted(id)
    writeDemoState('acceptedOffer', id)
    void logDemoEvent('offer_accepted', { offerId: id, vendor })
    notify(`${vendor} accepted. Booking confirmation YX-260831 created.`)
  }
  const offerTimer = (minutes: number) => {
    const remaining = Math.max(minutes * 60 - elapsed, 0)
    return `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`
  }
  return (
    <section className="section" id="bids">
      <div className="container">
        <SectionHeading eyebrow="03 · Reverse-Bid Marketplace" title="You set the need. Vendors sharpen the offer." copy="Tourists post their travel needs, and verified vendors compete by submitting their best offers." />
        <div className="privacy-banner"><ShieldCheck /><div><strong>Privacy by design</strong><span>Personal tourist details stay hidden from vendors until an offer is accepted.</span></div></div>
        <div className="bid-layout">
          <form className="glass panel bid-form" onSubmit={submit} noValidate>
            <div className="panel-title"><div><Send /><span><strong>Post a requirement</strong><small>One request, several competitive offers</small></span></div><DemoBadge /></div>
            <div className="form-grid"><Field label="Destination"><select value={form.destination} onChange={(event) => setForm({ ...form, destination: event.target.value })}>{destinations.map((item) => <option key={item.name}>{item.name}</option>)}</select></Field><Field label="Required service"><select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}><option>Hotel / homestay</option><option>Local guide</option><option>Cab / transport</option><option>Activity</option></select></Field><Field label="Check-in"><input type="date" value={form.checkIn} onChange={(event) => setForm({ ...form, checkIn: event.target.value })} /></Field><Field label="Check-out"><input type="date" value={form.checkOut} onChange={(event) => setForm({ ...form, checkOut: event.target.value })} /></Field><Field label="Travellers"><input type="number" min="1" max="12" value={form.travellers} onChange={(event) => setForm({ ...form, travellers: Number(event.target.value) })} /></Field><Field label="Maximum budget"><div className="input-icon"><IndianRupee size={16} /><input type="number" min="2000" value={form.budget} onChange={(event) => setForm({ ...form, budget: Number(event.target.value) })} /></div></Field></div>
            <Field label="Special requirements"><textarea rows={3} maxLength={240} value={form.requirements} onChange={(event) => setForm({ ...form, requirements: event.target.value })} placeholder="Accessible room, vegetarian meals, child seat…" /></Field>
            {error && <p className="form-error" role="alert"><AlertTriangle size={15} />{error}</p>}
            <button className="button button-primary full" type="submit" disabled={loading || posted}>{loading ? 'Inviting verified vendors…' : posted ? 'Requirement posted' : 'Post Requirement'}<Send size={16} /></button>
          </form>
          <div className="offers-column" aria-live="polite">{!posted ? <div className="glass empty-state compact"><div className="empty-orbit"><Store /></div><h3>Offers arrive here</h3><p>Post a validated requirement to generate three simulated offers from verified vendors.</p></div> : <>{accepted && <div className="confirmation"><Check /><div><strong>Booking confirmed</strong><span>Reference YX-260831 · Vendor sees contact details only after this acceptance.</span></div></div>}{vendorOffers.map((offer) => { const isAccepted = accepted === offer.id; const disabled = Boolean(accepted && !isAccepted); const expired = elapsed >= offer.expiryMinutes * 60; return <article className={`offer-card glass ${isAccepted ? 'selected' : ''} ${disabled ? 'disabled' : ''}`} key={offer.id}><div className="offer-head"><div><div className="verified"><ShieldCheck size={15} />Verified vendor</div><h3>{offer.vendor}</h3><span className="rating"><Star size={14} fill="currentColor" />{offer.rating}</span></div><div className="offer-price"><small>Offered price</small><strong>{currency.format(offer.price)}</strong><span>{offer.discount}% below normal</span></div></div><div className="facilities">{offer.facilities.map((facility) => <span key={facility}>{facility}</span>)}</div><div className="offer-footer"><div><MapPin size={15} />{offer.distance} away</div><div><Timer size={15} />Expires in {offerTimer(offer.expiryMinutes)}</div><button className={isAccepted ? 'button accepted' : 'button button-secondary'} disabled={disabled || isAccepted || expired} onClick={() => accept(offer.id, offer.vendor)}>{isAccepted ? <><Check size={15} />Accepted</> : expired ? 'Expired' : 'Accept offer'}</button></div></article>})}</>}</div>
        </div>
      </div>
    </section>
  )
}

function WalletSafety({ notify }: { notify: (message: string) => void }) {
  const [sos, setSos] = useState(false)
  const share = async () => {
    const details = 'YatraX demo trip: Kotagiri, 2 travellers, booking YX-260831.'
    if (navigator.share) await navigator.share({ title: 'My YatraX trip', text: details }).catch(() => undefined)
    else await navigator.clipboard?.writeText(details)
    notify('Demo trip details prepared for sharing.')
  }
  const triggerSos = () => {
    setSos(true)
    void logDemoEvent('sos_demo', { screen: 'wallet_safety' })
  }
  return (
    <section className="section wallet-section" id="wallet">
      <div className="container">
        <SectionHeading eyebrow="04 · Wallet & Safety" title="Rewards with safeguards. Support with honesty." copy="Track earned value, protect one-time cashback and keep essential local safety information close." />
        <div className="wallet-grid">
          <div className="glass wallet-card coin-card"><div className="wallet-icon"><Coins /></div><small>Tourism Coin balance</small><strong>1,480</strong><span>Use on participating demo vendors</span></div>
          <div className="glass wallet-card cashback-card"><div className="wallet-icon"><WalletCards /></div><small>Cashback balance</small><strong>₹1,240</strong><span><ShieldCheck size={14} />One-time credit safeguards active</span></div>
          <div className="glass transactions"><div className="panel-title"><div><CreditCard /><span><strong>Recent transactions</strong><small>Reward history</small></span></div><DemoBadge /></div>{transactions.map((item) => <div className="transaction" key={`${item.label}-${item.date}`}><div className={item.type}><TrendingUp /></div><span><strong>{item.label}</strong><small>{item.date}</small></span><b className={item.type}>{item.amount}</b></div>)}</div>
          <div className="glass safety-card"><div className="panel-title"><div><HeartPulse /><span><strong>Traveller safety centre</strong><small>Demo context for Kotagiri</small></span></div><span className="safety-status">Prepared</span></div><div className="safety-list"><a href="tel:112"><Phone /><span><strong>Emergency contacts</strong><small>India emergency number: 112</small></span><ChevronRight /></a><button onClick={() => notify('Police station route opened in demo mode.')}><ShieldCheck /><span><strong>Nearby police station</strong><small>Kotagiri Police Station · 2.4 km</small></span><ChevronRight /></button><button onClick={() => notify('Hospital route opened in demo mode.')}><HeartPulse /><span><strong>Nearby hospital</strong><small>Government Hospital · 1.7 km</small></span><ChevronRight /></button></div><div className="safety-actions"><button className="button button-secondary" onClick={() => void share()}><Send size={16} />Share trip details</button><button className="button sos-button" onClick={triggerSos}><AlertTriangle size={16} />SOS demo</button></div>{sos && <div className="sos-message" role="alert"><AlertTriangle /><p><strong>Demo SOS activated.</strong> Real emergency communication requires location permission and backend integration.</p><button onClick={() => setSos(false)} aria-label="Close SOS demo message"><X /></button></div>}</div>
        </div>
      </div>
    </section>
  )
}

function VendorDashboard({ notify }: { notify: (message: string) => void }) {
  const [registered, setRegistered] = useState(() => readDemoState('vendorRegistered', false))
  const [offerSent, setOfferSent] = useState(false)
  const [category, setCategory] = useState('Hotel / homestay')
  const register = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (String(formData.get('business')).trim().length < 2 || Number(formData.get('normalPrice')) <= Number(formData.get('discountPrice'))) {
      notify('Enter a business name and a discounted price below normal price.')
      return
    }
    setRegistered(true)
    writeDemoState('vendorRegistered', true)
    void logDemoEvent('vendor_registered', { category, capacity: Number(formData.get('capacity')) })
    notify('Business registered in the simulated vendor workspace.')
  }
  const sendOffer = () => {
    if (offerSent) return
    setOfferSent(true)
    void logDemoEvent('vendor_offer_submitted', { requestId: touristRequests[0].id })
    notify('Offer submitted to request REQ-2048.')
  }
  const summary: Array<[string, string, LucideIcon]> = [
    ['Current idle capacity', '24 rooms', BedDouble],
    ['Active offers', '8', Timer],
    ['Successful bookings', '36', Check],
    ['Revenue recovered', '₹2.84L', CircleDollarSign],
    ['Average utilization', '78%', Gauge],
  ]
  return (
    <section className="section" id="vendors">
      <div className="container">
        <SectionHeading eyebrow="05 · Vendor Dashboard" title="Make every empty room, seat and slot earn." copy="A dedicated workspace for hotels, homestays, guides, transport providers and activity operators." />
        <div className="vendor-summary">{summary.map(([label, value, Icon]) => <div className="glass" key={label}><Icon /><span><small>{label}</small><strong>{value}</strong></span></div>)}</div>
        <div className="vendor-layout">
          <form className="glass panel" onSubmit={register}><div className="panel-title"><div><Building2 /><span><strong>Business capacity listing</strong><small>{registered ? 'Registration saved in this browser' : 'Register a demo business'}</small></span></div><DemoBadge /></div><div className="form-grid"><Field label="Business name"><input name="business" required placeholder="e.g. Blue Mountain Stay" /></Field><Field label="Business category"><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Hotel / homestay</option><option>Local guide</option><option>Cab / transport</option><option>Activity operator</option></select></Field><Field label={category.includes('Hotel') ? 'Available rooms' : category.includes('Cab') ? 'Available seats' : 'Available time slots'}><input name="capacity" type="number" min="1" required defaultValue="6" /></Field><Field label="Offer expiry"><input name="expiry" type="datetime-local" required /></Field><Field label="Normal price"><input name="normalPrice" type="number" min="1" required defaultValue="4200" /></Field><Field label="Discounted price"><input name="discountPrice" type="number" min="1" required defaultValue="3200" /></Field></div><button className="button button-primary full" type="submit">{registered ? 'Update Capacity Listing' : 'Register Business'}<Store size={16} /></button></form>
          <div className="glass request-board"><div className="panel-title"><div><Users /><span><strong>Tourist bid requests</strong><small>Contact details hidden before acceptance</small></span></div><span className="live-dot">3 open</span></div>{touristRequests.map((request) => <article className="request-row" key={request.id}><div><small>{request.id} · {request.status}</small><strong>{request.destination}</strong><span>{request.service} · Budget {request.budget}</span></div><button className="button button-secondary" disabled={request.id !== 'REQ-2048' || offerSent} onClick={sendOffer}>{request.id === 'REQ-2048' ? offerSent ? 'Offer sent' : 'Submit offer' : request.status}</button></article>)}</div>
        </div>
        <div className="glass booking-table"><div className="panel-title"><div><CalendarDays /><span><strong>Offer and booking tracker</strong><small>Accepted and rejected offers · Simulated Demo Data</small></span></div><DemoBadge /></div><div className="table-scroll"><table><thead><tr><th>Reference</th><th>Service</th><th>Customer view</th><th>Status</th><th>Recovered revenue</th></tr></thead><tbody><tr><td>YX-2039</td><td>Valparai cab · 4 seats</td><td>Identity shared</td><td><span className="status success">Accepted</span></td><td>₹4,850</td></tr><tr><td>YX-2034</td><td>Yercaud guide · 1 day</td><td>Private</td><td><span className="status rejected">Rejected</span></td><td>—</td></tr><tr><td>YX-2027</td><td>Kotagiri room · 2 nights</td><td>Identity shared</td><td><span className="status success">Completed</span></td><td>₹6,400</td></tr></tbody></table></div></div>
      </div>
    </section>
  )
}

function ImpactDashboard() {
  const flow: Array<[string, string, LucideIcon]> = [
    ['01', 'Detect overcrowding', Activity],
    ['02', 'Discover unused capacity', BedDouble],
    ['03', 'Match better alternatives', Compass],
    ['04', 'Add discount & cashback', Coins],
    ['05', 'Improve local income', TrendingUp],
  ]
  return (
    <section className="section impact-section" id="impact">
      <div className="container">
        <SectionHeading eyebrow="06 · Impact Dashboard" title="A healthier tourism economy, measured clearly." copy="SIH judge-friendly prototype indicators connect decongestion with traveller value and local business recovery." />
        <div className="impact-label"><DemoBadge /><span>All impact figures below are simulated for prototype demonstration.</span></div>
        <div className="impact-grid"><div className="impact-metrics">{impactMetrics.map((metric, index) => <div className="impact-row glass" key={metric.label} style={{ animationDelay: `${index * 80}ms` }}><div><span>{metric.label}</span><strong>{metric.value}</strong></div><div className="progress"><i style={{ width: `${metric.progress}%` }} /></div></div>)}</div><div className="glass impact-chart"><div className="panel-title"><div><TrendingUp /><span><strong>Capacity-to-impact trend</strong><small>Illustrative monthly model</small></span></div><span className="trend">+31%</span></div><svg viewBox="0 0 520 260" role="img" aria-label="Illustrative upward impact trend chart"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#35e5b1" stopOpacity=".42" /><stop offset="1" stopColor="#35e5b1" stopOpacity="0" /></linearGradient></defs><g className="chart-grid"><line x1="30" y1="35" x2="500" y2="35" /><line x1="30" y1="95" x2="500" y2="95" /><line x1="30" y1="155" x2="500" y2="155" /><line x1="30" y1="215" x2="500" y2="215" /></g><path className="chart-area" d="M30 205 C90 195 100 170 155 176 S245 128 290 138 S368 80 410 92 S470 48 500 42 L500 230 L30 230Z" /><path className="chart-line" d="M30 205 C90 195 100 170 155 176 S245 128 290 138 S368 80 410 92 S470 48 500 42" /><g className="chart-points"><circle cx="30" cy="205" r="5" /><circle cx="155" cy="176" r="5" /><circle cx="290" cy="138" r="5" /><circle cx="410" cy="92" r="5" /><circle cx="500" cy="42" r="5" /></g></svg><div className="chart-legend"><span><i />Idle capacity utilized</span><span><i />Local revenue recovered</span></div></div></div>
        <div className="impact-flow"><h3>How YatraX Creates Impact</h3><div>{flow.map(([number, label, Icon], index) => <article key={label}><span>{number}</span><div><Icon /><strong>{label}</strong></div>{index < flow.length - 1 && <ArrowRight />}</article>)}</div></div>
      </div>
    </section>
  )
}

function Footer({ onReset }: { onReset: () => void }) {
  return (
    <footer><div className="container footer-grid"><div className="footer-brand"><Logo /><p>Turning idle tourism capacity into smarter, fairer and less-crowded journeys.</p><DemoBadge /></div><div><strong>Explore</strong>{navItems.slice(0, 3).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div><div><strong>Prototype</strong><a href="#wallet">Wallet & Safety</a><a href="#vendors">Vendor Dashboard</a><button onClick={onReset}><RefreshCcw size={14} />Reset demo data</button></div><div><strong>Project</strong><span>Built for Smart India Hackathon 2026</span><span>Team: [Your Team Name]</span><a href="#top"><Github size={14} />GitHub placeholder</a><a href="#top"><Zap size={14} />Live-demo placeholder</a></div></div><div className="container footer-bottom"><p>Hackathon prototype. Predefined information is simulated and not real-time. Only weather is current API data from Open-Meteo.</p><span>© 2026 YatraX</span></div></footer>
  )
}

export function YatraXApp() {
  const [toast, setToast] = useState('')
  const reset = () => {
    resetDemoState()
    setToast('Demo data reset. Reloading the prototype…')
    window.setTimeout(() => window.location.reload(), 650)
  }
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  return <div className="app-shell"><NavigationBar /><main><Hero /><TripPlanner /><CapacityMap notify={setToast} /><ReverseBids notify={setToast} /><WalletSafety notify={setToast} /><VendorDashboard notify={setToast} /><ImpactDashboard /></main><Footer onReset={reset} />{toast && <Toast message={toast} onClose={() => setToast('')} />}</div>
}
