const prefix = 'yatrax:'

export function readDemoState<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const value = window.localStorage.getItem(`${prefix}${key}`)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

export function writeDemoState<T>(key: string, value: T) {
  if (typeof window !== 'undefined') window.localStorage.setItem(`${prefix}${key}`, JSON.stringify(value))
}

export function resetDemoState() {
  if (typeof window === 'undefined') return
  Object.keys(window.localStorage).filter((key) => key.startsWith(prefix)).forEach((key) => window.localStorage.removeItem(key))
}

export async function logDemoEvent(type: string, payload: Record<string, unknown>) {
  try {
    await fetch('/api/demo-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, payload }),
    })
  } catch {
    // Local prototype remains usable when the optional persistence endpoint is unavailable.
  }
}
