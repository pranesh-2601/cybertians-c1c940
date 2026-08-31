import { useEffect, useState } from 'react'
import { Compass, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#trip-planner', label: 'Trip Planner' },
  { href: '#capacity-map', label: 'Capacity Map' },
  { href: '#reverse-bids', label: 'Reverse Bids' },
  { href: '#wallet-safety', label: 'Wallet & Safety' },
  { href: '#vendor-dashboard', label: 'Vendor Dashboard' },
  { href: '#impact', label: 'Impact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8" aria-label="Primary">
        <a href="#top" className="focus-ring flex items-center gap-2 text-lg font-bold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--color-emerald-glow)] to-[color:var(--color-cyan-glow)]">
            <Compass className="h-5 w-5 text-navy-950" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl">YatraX</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="focus-ring rounded-md text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#trip-planner"
            className="focus-ring glow-emerald inline-flex items-center rounded-full bg-gradient-to-r from-[color:var(--color-emerald-glow)] to-[color:var(--color-cyan-glow)] px-5 py-2.5 text-sm font-semibold text-navy-950 transition-transform hover:scale-105"
          >
            Plan My Trip
          </a>
        </div>

        <button
          type="button"
          className="focus-ring rounded-md p-2 text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong border-t border-white/10 px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring block rounded-md px-2 py-3 text-base font-medium text-slate-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#trip-planner"
                onClick={() => setOpen(false)}
                className="focus-ring glow-emerald flex items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--color-emerald-glow)] to-[color:var(--color-cyan-glow)] px-5 py-3 text-sm font-semibold text-navy-950"
              >
                Plan My Trip
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
