/**
 * Seeded accounts for demo purposes.
 * Each hotel manager is linked to specific properties via hostId/hostEmail.
 * Guests see only their own bookings and wishlist.
 */

export const SEED_ACCOUNTS = [
  // ── Hotel Managers / Owners ──────────────────────────────────────────
  {
    id: 'host-matteo-sofia',
    name: 'Matteo & Sofia Ricci',
    email: 'matteo.sofia@havenstay.demo',
    password: 'host1234',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    phone: '+39 089 875 120',
    location: 'Positano, Italy',
    bio: 'Superhosts with a passion for Mediterranean architecture, Italian hospitality, and organic lemon groves.',
    joinedDate: 'June 2019'
  },
  {
    id: 'host-henrik',
    name: 'Henrik Lindqvist',
    email: 'henrik@havenstay.demo',
    password: 'host1234',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    phone: '+358 40 123 4567',
    location: 'Rovaniemi, Finland',
    bio: 'Architect and winter explorer. Designed a solar-hybrid glass sanctuary to watch Aurora Borealis from bed.',
    joinedDate: 'March 2020'
  },
  {
    id: 'host-made-wayan',
    name: 'Made & Wayan Surya',
    email: 'made.wayan@havenstay.demo',
    password: 'host1234',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&q=80',
    phone: '+62 361 975 000',
    location: 'Ubud, Bali, Indonesia',
    bio: 'Balinese architects who grew up designing eco-friendly bamboo structures in harmony with the jungle.',
    joinedDate: 'January 2018'
  },
  {
    id: 'host-claire',
    name: 'Claire Moreau',
    email: 'claire@havenstay.demo',
    password: 'host1234',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    phone: '+33 1 4555 1234',
    location: 'Paris, France',
    bio: 'Parisian art director. Passionate about mid-century French furniture and classic boulangeries.',
    joinedDate: 'May 2019'
  },
  {
    id: 'host-alejandro',
    name: 'Alejandro & Valentina Reyes',
    email: 'alejandro@havenstay.demo',
    password: 'host1234',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    phone: '+54 11 4555 7788',
    location: 'Patagonia, Argentina',
    bio: 'Mountain guides and eco-architects who built minimalist retreats beside the Andes peaks and the Byron Bay shore.',
    joinedDate: 'July 2020'
  },
  {
    id: 'host-jean-pierre',
    name: 'Jean-Pierre & Luc Fontaine',
    email: 'jeanpierre@havenstay.demo',
    password: 'host1234',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=200&q=80',
    phone: '+33 4 5055 6677',
    location: 'Chamonix, France',
    bio: 'Alpine guides and chalet owners with 10+ years experience hosting discerning ski enthusiasts in the French Alps.',
    joinedDate: 'November 2014'
  },
  {
    id: 'host-kenji-mariko',
    name: 'Kenji & Mariko Yamamoto',
    email: 'kenji.mariko@havenstay.demo',
    password: 'host1234',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    phone: '+81 75 555 0101',
    location: 'Kyoto, Japan',
    bio: "Kyoto heritage lovers who restored a traditional machiya townhouse to share Japan's timeless culture.",
    joinedDate: 'April 2017'
  },
  {
    id: 'host-yuki',
    name: 'Yuki Tanaka',
    email: 'yuki@havenstay.demo',
    password: 'host1234',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    phone: '+81 3 5555 2002',
    location: 'Tokyo, Japan',
    bio: 'Tokyo architect specializing in micro-luxury homes. Owner of the iconic capsule penthouse with Fuji views.',
    joinedDate: 'February 2022'
  },
  {
    id: 'host-ibrahim',
    name: 'Ibrahim Al-Rashid',
    email: 'ibrahim@havenstay.demo',
    password: 'host1234',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
    phone: '+971 4 555 3399',
    location: 'Dubai, UAE',
    bio: 'Dubai developer and hospitality entrepreneur. Owns a sky-high desert oasis penthouse above the city skyline.',
    joinedDate: 'December 2020'
  },
  {
    id: 'host-amara',
    name: 'Amara Diallo',
    email: 'amara@havenstay.demo',
    password: 'host1234',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=200&q=80',
    phone: '+27 21 555 8844',
    location: 'Cape Town, South Africa',
    bio: 'Cape Town superhost and interior designer. Crafted clifftop and treehouse sanctuaries with breathtaking views.',
    joinedDate: 'September 2021'
  },
  // ── Demo Guests ─────────────────────────────────────────────────────
  {
    id: 'user-demo-guest',
    name: 'Alex Morgan',
    email: 'alex.morgan@havenstay.demo',
    password: 'guest1234',
    role: 'guest',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '+1 (555) 382-9102',
    location: 'San Francisco, CA',
    bio: 'Architecture lover and product designer exploring breathtaking vacation homes worldwide.',
    joinedDate: 'March 2022'
  },
  {
    id: 'user-demo-guest-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@havenstay.demo',
    password: 'guest1234',
    role: 'guest',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    bio: 'Travel blogger and food enthusiast. Documenting luxury stays across Southeast Asia and Europe.',
    joinedDate: 'January 2023'
  }
];

// Lookup helper by email (case-insensitive)
export const findAccountByEmail = (email) =>
  SEED_ACCOUNTS.find((a) => a.email.toLowerCase() === email.toLowerCase());
