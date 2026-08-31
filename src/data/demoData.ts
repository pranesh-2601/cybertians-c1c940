export type Destination = {
  name: string
  subtitle: string
  load: number
  rooms: number
  guides: number
  cabSeats: number
  discount: number
  weather: string
  alternative: string
  distance: number
  savings: number
  capacity: string
  accent: string
}

export const destinations: Destination[] = [
  { name: 'Ooty', subtitle: 'Nilgiri classics & tea trails', load: 91, rooms: 18, guides: 6, cabSeats: 24, discount: 8, weather: 'Cool mist', alternative: 'Kotagiri', distance: 29, savings: 22, capacity: '42 rooms · 11 guides', accent: 'from-cyan-400/30 to-blue-500/5' },
  { name: 'Kodaikanal', subtitle: 'Lakes, forests & viewpoints', load: 86, rooms: 23, guides: 8, cabSeats: 19, discount: 10, weather: 'Light clouds', alternative: 'Valparai', distance: 160, savings: 27, capacity: '36 rooms · 28 cab seats', accent: 'from-violet-400/25 to-cyan-400/5' },
  { name: 'Madurai', subtitle: 'Temple city & food heritage', load: 73, rooms: 48, guides: 14, cabSeats: 52, discount: 14, weather: 'Warm', alternative: 'Karaikudi', distance: 89, savings: 18, capacity: '61 rooms · 17 guides', accent: 'from-amber-400/25 to-orange-500/5' },
  { name: 'Rameswaram', subtitle: 'Sacred coast & island drives', load: 82, rooms: 31, guides: 9, cabSeats: 41, discount: 12, weather: 'Breezy', alternative: 'Dhanushkodi', distance: 20, savings: 16, capacity: '20 rooms · 33 cab seats', accent: 'from-sky-400/30 to-cyan-500/5' },
  { name: 'Kanyakumari', subtitle: 'Ocean horizon & coastal culture', load: 68, rooms: 57, guides: 15, cabSeats: 49, discount: 15, weather: 'Clear', alternative: 'Poovar', distance: 70, savings: 19, capacity: '44 rooms · 9 guides', accent: 'from-rose-400/20 to-amber-400/10' },
  { name: 'Yercaud', subtitle: 'Quiet hills & coffee estates', load: 43, rooms: 64, guides: 18, cabSeats: 67, discount: 21, weather: 'Pleasant', alternative: 'Kolli Hills', distance: 85, savings: 25, capacity: '64 rooms · 18 guides', accent: 'from-emerald-400/30 to-lime-400/5' },
  { name: 'Kotagiri', subtitle: 'Slow travel in the Nilgiris', load: 29, rooms: 72, guides: 21, cabSeats: 58, discount: 24, weather: 'Cool', alternative: 'Coonoor outskirts', distance: 20, savings: 23, capacity: '72 rooms · 21 guides', accent: 'from-teal-300/30 to-emerald-500/5' },
  { name: 'Valparai', subtitle: 'Rainforest roads & wildlife', load: 34, rooms: 51, guides: 16, cabSeats: 44, discount: 26, weather: 'Drizzle', alternative: 'Topslip', distance: 67, savings: 29, capacity: '51 rooms · 16 guides', accent: 'from-green-400/30 to-cyan-500/5' },
]

export const itineraryPool = [
  { location: 'Kotagiri', activity: 'Tea estate walking trail', cost: 1800, crowd: 'Low', interests: ['Nature', 'Photography'], reason: 'Quieter Nilgiri trails match scenic, low-crowd travel.' },
  { location: 'Yercaud', activity: 'Coffee estate and orchard visit', cost: 2100, crowd: 'Low', interests: ['Nature', 'Food'], reason: 'Strong local capacity and an immersive food-and-farm experience.' },
  { location: 'Madurai', activity: 'Heritage lanes and temple architecture', cost: 2400, crowd: 'Moderate', interests: ['Heritage', 'Photography'], reason: 'A timed morning route reduces crowd exposure while preserving heritage value.' },
  { location: 'Valparai', activity: 'Rainforest viewpoint circuit', cost: 2600, crowd: 'Low', interests: ['Adventure', 'Nature'], reason: 'Available guides and low load make outdoor exploration easier.' },
  { location: 'Rameswaram', activity: 'Pamban coast sunrise route', cost: 2300, crowd: 'Moderate', interests: ['Wellness', 'Photography'], reason: 'Early-hour scheduling balances coastal scenery and crowd avoidance.' },
  { location: 'Kanyakumari', activity: 'Coastal food and craft walk', cost: 1900, crowd: 'Moderate', interests: ['Food', 'Heritage'], reason: 'Local guides bundle independent vendors into one affordable route.' },
  { location: 'Kolli Hills', activity: 'Waterfall and hairpin-bend drive', cost: 2800, crowd: 'Low', interests: ['Adventure', 'Nature'], reason: 'A rural redirect offers more available cab seats and lower visitor density.' },
]

export const vendorOffers = [
  { id: 'offer-nilgiri', vendor: 'Nilgiri Nest Collective', rating: 4.8, price: 12400, discount: 24, facilities: ['Breakfast', 'Hill pickup', 'Wi-Fi'], distance: '1.8 km', expiryMinutes: 18 },
  { id: 'offer-trail', vendor: 'Trailfolk Homestays', rating: 4.7, price: 13150, discount: 19, facilities: ['Guide add-on', 'Bonfire', 'Parking'], distance: '3.2 km', expiryMinutes: 24 },
  { id: 'offer-green', vendor: 'Green Route Stays', rating: 4.9, price: 13800, discount: 17, facilities: ['Meals', 'Cab credit', 'Flexible check-in'], distance: '0.9 km', expiryMinutes: 31 },
]

export const transactions = [
  { label: 'Smart Redirect Cashback', date: '29 Aug 2026', amount: '+₹620', type: 'credit' },
  { label: 'Kotagiri guide booking', date: '27 Aug 2026', amount: '-₹400', type: 'debit' },
  { label: 'Low-crowd travel reward', date: '27 Aug 2026', amount: '+80 coins', type: 'credit' },
  { label: 'Local cab seat match', date: '23 Aug 2026', amount: '-₹280', type: 'debit' },
]

export const touristRequests = [
  { id: 'REQ-2048', destination: 'Kotagiri', service: '2 rooms + breakfast', budget: '₹14,000', status: 'Open' },
  { id: 'REQ-2044', destination: 'Yercaud', service: 'Local guide', budget: '₹3,200', status: 'Offer sent' },
  { id: 'REQ-2039', destination: 'Valparai', service: 'Cab — 4 seats', budget: '₹5,500', status: 'Accepted' },
]

export const impactMetrics = [
  { label: 'Idle rooms utilized', value: '8,420', progress: 82 },
  { label: 'Local vendors benefited', value: '1,286', progress: 74 },
  { label: 'Tourist savings generated', value: '₹1.84 Cr', progress: 88 },
  { label: 'Crowd reduction', value: '23%', progress: 67 },
  { label: 'Revenue recovered', value: '₹3.12 Cr', progress: 79 },
  { label: 'Travel-distance reduction', value: '14%', progress: 52 },
  { label: 'Rural destinations promoted', value: '46', progress: 71 },
]
