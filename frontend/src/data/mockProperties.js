export const MOCK_PROPERTIES = [
  {
    id: "prop-1",
    hostId: "host-matteo-sofia",
    hostEmail: "matteo.sofia@havenstay.demo",
    title: "Villa Bellavista — Cliffside Oceanfront Haven",
    category: "amazing-views",
    propertyType: "Entire luxury villa",
    city: "Positano",
    country: "Italy",
    location: "Positano, Amalfi Coast, Italy",
    distance: "Overlooking the Tyrrhenian Sea",
    datesAvailable: "Nov 12 – 17",
    price: 485,
    rating: 4.98,
    reviewCount: 164,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Matteo & Sofia",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 7,
      responseRate: "100%",
      responseTime: "within an hour",
      bio: "Amalfi Coast natives with a lifelong passion for architecture, Italian hospitality, and organic lemon groves."
    },
    capacity: {
      guests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 3
    },
    bedroomsList: [
      { name: "Master Suite", bedType: "1 King bed", details: "Private terrace & en-suite ocean bath" },
      { name: "Bedroom 2", bedType: "1 Queen bed", details: "Direct balcony access" },
      { name: "Bedroom 3", bedType: "2 Single beds", details: "Garden view & reading nook" }
    ],
    amenities: [
      "Fast Wifi (350 Mbps)",
      "Infinity pool with cliff views",
      "Private hot tub",
      "Chef's kitchen with stone island",
      "Air conditioning & heating",
      "Free dedicated parking on premises",
      "Espresso bar with local beans",
      "Outdoor dining pergola & grill",
      "Washer & dryer in unit",
      "Dedicated workspace with monitor"
    ],
    description: "Suspended between the azure sky and Mediterranean waters, Villa Bellavista offers an unforgettable Italian coastal sanctuary. Meticulously restored with hand-painted Vietri tiles and arched windows framing postcard-perfect vistas of Positano. Savor morning espresso on the private panoramic terrace, plunge into the heated cliffside infinity pool, and unwind as twilight bathes the coast in warm terracotta hues.",
    houseRules: [
      "Check-in: 3:00 PM – 9:00 PM",
      "Checkout: 11:00 AM",
      "Self check-in with smart keypad lock",
      "No smoking indoors",
      "Quiet hours after 10:00 PM"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      communication: 4.9,
      location: 5.0,
      checkIn: 5.0,
      value: 4.9
    },
    cleaningFee: 140,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-101",
        author: "Eleanor Vance",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        date: "October 2025",
        rating: 5,
        comment: "Words cannot describe how breathtaking the views are from this terrace. Matteo arranged luggage porterage and gave us phenomenal recommendations for local trattorias away from the crowds. 10/10 dream stay!"
      },
      {
        id: "rev-102",
        author: "David Harrison",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        date: "September 2025",
        rating: 5,
        comment: "The infinity pool at sunset is mesmerizing. Spotless cleanliness, extremely comfortable beds, and genuine Italian warmth. We will return every single year."
      },
      {
        id: "rev-103",
        author: "Camille Dupont",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
        date: "August 2025",
        rating: 5,
        comment: "Flawless hospitality. The kitchen is fully equipped with high-end appliances, and waking up to the sound of waves against the rocks below was pure therapy."
      }
    ]
  },
  {
    id: "prop-2",
    hostId: "host-henrik",
    hostEmail: "henrik@havenstay.demo",
    title: "Nordic Pine Glass Chalet & Stargazing Sauna",
    category: "cabins",
    propertyType: "Entire architectural cabin",
    city: "Rovaniemi",
    country: "Finland",
    location: "Rovaniemi, Lapland, Finland",
    distance: "Surrounded by private arctic pine woods",
    datesAvailable: "Dec 3 – 8",
    price: 340,
    rating: 4.97,
    reviewCount: 98,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee1b2b9ba58f?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Henrik Lindqvist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 5,
      responseRate: "99%",
      responseTime: "within 30 minutes",
      bio: "Architect and winter explorer. Designed this modern solar-hybrid sanctuary to watch the Aurora Borealis from bed."
    },
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1.5
    },
    bedroomsList: [
      { name: "Glass Dome Suite", bedType: "1 Queen bed", details: "360-degree glass ceiling for northern lights" },
      { name: "Loft Bedroom", bedType: "1 Double bed", details: "Cozy timber-framed loft with skylight" }
    ],
    amenities: [
      "High-speed Starlink Wifi",
      "Traditional wood-fired Finnish sauna",
      "Heated stone floors throughout",
      "Indoor suspended fireplace",
      "Floor-to-ceiling thermal glass",
      "Kitchenette with Miele induction",
      "Snowshoes & winter sleds provided",
      "Free EV charging station",
      "Board games & vinyl record player"
    ],
    description: "Immerse yourself in Finnish Lapland in this award-winning timber and glass sanctuary. Engineered with heated glass panels so snow melts automatically, offering uninterrupted stargazing and Aurora Borealis views directly above your duvet. After a day in the snowy wilderness, ignite the crackling birch wood sauna and recharge in complete stillness.",
    houseRules: [
      "Check-in: 4:00 PM – 10:00 PM",
      "Checkout: 11:00 AM",
      "Keyless digital entry",
      "Sauna safety guidelines must be observed",
      "Strictly no outdoor open campfires outside the firepit"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      communication: 4.9,
      location: 4.9,
      checkIn: 5.0,
      value: 4.9
    },
    cleaningFee: 95,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-201",
        author: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
        date: "January 2026",
        rating: 5,
        comment: "We saw the Northern Lights on our second night while lying cozy in bed! Henrik’s wood sauna was the highlight of our winter trip. Unbelievable experience."
      },
      {
        id: "rev-202",
        author: "Marcus Aurelius B.",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
        date: "December 2025",
        rating: 5,
        comment: "Impeccably clean, warm and quiet. The design details are top shelf. Loved playing jazz on the turntable by the fire."
      }
    ]
  },
  {
    id: "prop-3",
    hostId: "host-made-wayan",
    hostEmail: "made.wayan@havenstay.demo",
    title: "Eco Bamboo Pavilion & Hanging Infinity Pool",
    category: "tropical",
    propertyType: "Entire bamboo villa",
    city: "Ubud",
    country: "Indonesia",
    location: "Ubud, Bali, Indonesia",
    distance: "Nested above the Ayung River valley",
    datesAvailable: "Nov 20 – 26",
    price: 295,
    rating: 4.96,
    reviewCount: 230,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Wayan & Ketut",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 8,
      responseRate: "100%",
      responseTime: "within a few minutes",
      bio: "Master bamboo craftsmen dedicated to regenerative eco-luxury architecture in Ubud."
    },
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2
    },
    bedroomsList: [
      { name: "Jungle Master Suite", bedType: "1 King four-poster bed", details: "Organic cotton linens & river breeze" },
      { name: "Canopy Bedroom", bedType: "1 Queen bed", details: "Open-air netted hammock balcony" }
    ],
    amenities: [
      "Fiber optic Wifi (200 Mbps)",
      "Tiered hanging plunge pool",
      "Complimentary organic Balinese breakfast",
      "Outdoor terrazzo soaking tub",
      "Yoga shala with mats provided",
      "Personal chef service upon request",
      "Air-conditioned master bedroom suite",
      "Natural spring water dispenser",
      "Daily eco-housekeeping"
    ],
    description: "An architectural marvel handcrafted entirely from blonde petung bamboo. Hanging dramatically over the emerald canopy of the Ayung River, this open-air sanctuary blends seamlessly into Bali’s lush rainforest. Wake up to melodic tropical birdsong, indulge in a floating breakfast in your private plunge pool, and watch fireflies light up the jungle after dusk.",
    houseRules: [
      "Check-in: 2:00 PM – 8:00 PM",
      "Checkout: 12:00 PM",
      "Staff greeting upon arrival",
      "Eco-conscious property: please conserve energy",
      "No shoes inside bamboo living areas"
    ],
    ratingsBreakdown: {
      cleanliness: 4.9,
      accuracy: 5.0,
      communication: 5.0,
      location: 4.9,
      checkIn: 5.0,
      value: 4.9
    },
    cleaningFee: 50,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-301",
        author: "Liam Gallagher",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
        date: "February 2026",
        rating: 5,
        comment: "This place felt like stepping into an enchanted wonderland. The bamboo structure is pure art. Wayan and his team treated us like family, and the breakfast was out of this world."
      }
    ]
  },
  {
    id: "prop-4",
    hostId: "host-claire",
    hostEmail: "claire@havenstay.demo",
    title: "Minimalist Loft with Seine River & Eiffel View",
    category: "iconic-cities",
    propertyType: "Entire penthouse apartment",
    city: "Paris",
    country: "France",
    location: "7th Arrondissement, Paris, France",
    distance: "300 meters from Champ de Mars",
    datesAvailable: "Oct 28 – Nov 3",
    price: 420,
    rating: 4.95,
    reviewCount: 312,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Claire Moreau",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 6,
      responseRate: "100%",
      responseTime: "within 15 minutes",
      bio: "Parisian art director. Passionate about mid-century French furniture and classic boulangeries."
    },
    capacity: {
      guests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    bedroomsList: [
      { name: "Primary Bedroom", bedType: "1 Queen bed", details: "French balcony overlooking Eiffel Tower sparkle" },
      { name: "Living Room", bedType: "1 Designer daybed", details: "Converts to luxury single bed" }
    ],
    amenities: [
      "High-speed Wifi (500 Mbps)",
      "Elevator in building",
      "Nespresso Vertuo coffee machine",
      "Washer & dryer combo",
      "Air conditioning (rare in Paris!)",
      "Marshall Bluetooth sound system",
      "Subway station 2 minutes away",
      "Curated local bistro guide"
    ],
    description: "Experience Paris through cinematic wrought-iron windows framing the Eiffel Tower. Located in an elegant 19th-century Haussmannian building on a tranquil avenue, this top-floor loft combines original herringbone oak floors, carved marble fireplace, and bespoke modern furnishings. Step outside to warm croissants and artisanal cheeses from rue Cler.",
    houseRules: [
      "Check-in: 3:00 PM – 11:00 PM",
      "Checkout: 11:00 AM",
      "Strictly no parties or loud music",
      "Historic building: respect quiet residential neighbors"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 4.9,
      communication: 5.0,
      location: 5.0,
      checkIn: 4.9,
      value: 4.8
    },
    cleaningFee: 80,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-401",
        author: "Julian Chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        date: "September 2025",
        rating: 5,
        comment: "Watching the Eiffel Tower sparkle on the hour from the dining table while sipping French wine is an unforgettable memory. Claire was super communicative and helpful."
      }
    ]
  },
  {
    id: "prop-5",
    hostId: "host-alejandro",
    hostEmail: "alejandro@havenstay.demo",
    title: "The Glass House — Red Rock Desert Solitude",
    category: "desert",
    propertyType: "Entire modern architectural home",
    city: "Sedona",
    country: "USA",
    location: "Sedona, Arizona, United States",
    distance: "Direct private access to Coconino National Forest",
    datesAvailable: "Nov 5 – 10",
    price: 520,
    rating: 4.99,
    reviewCount: 115,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Austin & Elena",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 4,
      responseRate: "100%",
      responseTime: "within an hour",
      bio: "Artists and landscape photographers who built this desert compound to celebrate Sedona's luminous energy."
    },
    capacity: {
      guests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 2.5
    },
    bedroomsList: [
      { name: "Canyon Master", bedType: "1 King bed", details: "Glass corner looking out onto Cathedral Rock" },
      { name: "Saguaro Bedroom", bedType: "1 Queen bed", details: "Patio access and celestial skylight" },
      { name: "Desert Suite", bedType: "1 Queen bed", details: "En-suite walk-in rain shower" }
    ],
    amenities: [
      "High-speed Starlink Wifi",
      "Zero-edge heated plunge pool",
      "Cedar wood barrel hot tub",
      "Outdoor gas fire table with lounge chairs",
      "Celestron computerized telescope",
      "Gourmet kitchen with Wolf range",
      "Sonos multi-room audio",
      "EV Level 2 charger",
      "Private hiking trailhead on property"
    ],
    description: "Nestled in 5 acres of private crimson canyons, The Glass House is a masterclass in desert minimalism. Massive 12-foot sliding glass walls erase the boundary between the tranquil interior and Sedona's sacred sandstone formations. Spend mornings hiking secluded trails from your back door and evenings immersed in the stargazing hot tub under designated dark skies.",
    houseRules: [
      "Check-in: 4:00 PM – 9:00 PM",
      "Checkout: 11:00 AM",
      "Strict dark sky community: extinguish external floodlights by 10 PM",
      "Stay on marked trails to protect cryptobiotic desert soil"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      communication: 5.0,
      location: 5.0,
      checkIn: 5.0,
      value: 4.9
    },
    cleaningFee: 160,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-501",
        author: "Rachel Sterling",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        date: "October 2025",
        rating: 5,
        comment: "The most serene and awe-inspiring home we have ever stayed in. Looking at Cathedral Rock turn glowing copper at sunset from the hot tub was magical."
      }
    ]
  },
  {
    id: "prop-6",
    hostId: "host-alejandro",
    hostEmail: "alejandro@havenstay.demo",
    title: "Azure Waves — Private Beach House & Deck",
    category: "beachfront",
    propertyType: "Entire beachfront cottage",
    city: "Byron Bay",
    country: "Australia",
    location: "Wategos Beach, Byron Bay, Australia",
    distance: "Direct barefoot path to the sand",
    datesAvailable: "Dec 10 – 16",
    price: 610,
    rating: 4.97,
    reviewCount: 189,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Chloe & Liam",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 9,
      responseRate: "100%",
      responseTime: "within 30 minutes",
      bio: "Surf enthusiasts and interior stylists living in Byron Bay for over two decades."
    },
    capacity: {
      guests: 6,
      bedrooms: 3,
      beds: 4,
      bathrooms: 2
    },
    bedroomsList: [
      { name: "Ocean Front Suite", bedType: "1 King bed", details: "Louvered shutters opening to sound of surf" },
      { name: "Pandan Bedroom", bedType: "1 Queen bed", details: "Linen curtains and private garden deck" },
      { name: "Bunk Haven", bedType: "2 Single bunk beds", details: "Custom oak built-ins with reading lights" }
    ],
    amenities: [
      "Ultra-fast Wifi",
      "Direct beach boardwalk access",
      "Outdoor heated surf shower",
      "Surfboards & boogie boards provided",
      "Hardwood wraparound sun deck",
      "Barbecue grill & outdoor dining table",
      "Air conditioning & ceiling fans",
      "Nespresso machine with organic pods",
      "Beach wagon, umbrellas & chairs"
    ],
    description: "Step straight off your sun-drenched timber deck and feel the powdery sands of iconic Wategos Beach between your toes. Decorated in relaxed coastal elegance with natural whitewashed oak, Belgian linens, and curated ceramics. Watch bottlenose dolphins play in the surf as you sip your morning flat white.",
    houseRules: [
      "Check-in: 3:00 PM – 8:00 PM",
      "Checkout: 10:00 AM",
      "Rinse sand off at outdoor shower before entering",
      "No parties or school leavers groups"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      communication: 4.9,
      location: 5.0,
      checkIn: 5.0,
      value: 4.8
    },
    cleaningFee: 150,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-601",
        author: "Oliver Bennett",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        date: "December 2025",
        rating: 5,
        comment: "Unmatched location. Walking barefoot to Wategos for a sunrise surf and coming back to breakfast on the deck was perfection."
      }
    ]
  },
  {
    id: "prop-7",
    hostId: "host-jean-pierre",
    hostEmail: "jeanpierre@havenstay.demo",
    title: "Chalet Mont-Blanc — Alpine Luxury & Ski-in/out",
    category: "ski-in-out",
    propertyType: "Entire alpine chalet",
    city: "Chamonix",
    country: "France",
    location: "Chamonix-Mont-Blanc, France",
    distance: "Ski direct to the Les Grands Montets lift",
    datesAvailable: "Jan 14 – 20",
    price: 780,
    rating: 4.99,
    reviewCount: 76,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee1b2b9ba58f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Jean-Pierre & Luc",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 10,
      responseRate: "100%",
      responseTime: "within an hour",
      bio: "Former ski instructor and alpine builder with deep love for Haute-Savoie heritage."
    },
    capacity: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      bathrooms: 4
    },
    bedroomsList: [
      { name: "Mont-Blanc Suite", bedType: "1 King bed", details: "Fireplace, private balcony facing the glacier" },
      { name: "Aiguille Suite", bedType: "1 King bed", details: "En-suite steam shower & dressing room" },
      { name: "Pendant Room", bedType: "1 Queen bed", details: "Alpine spruce timber finish" },
      { name: "Bunk Dormitory", bedType: "2 Twin beds", details: "Custom alpine bunks for guests or children" }
    ],
    amenities: [
      "High-speed Wifi",
      "Ski boot warmers & ski equipment room",
      "Outdoor sunken hot tub facing glacier",
      "Finnish sauna & cold plunge bucket",
      "Grand stone wood-burning fireplace",
      "Cinema room with 4K projector",
      "Wine cellar with French vintage selection",
      "Heated double garage",
      "Daily ski pass pickup coordination"
    ],
    description: "An ultra-luxurious authentic Savoyard timber chalet designed for ski enthusiasts who appreciate fine living. Glide directly off the piste onto your heated ski room terrace. Indulge in fondue by the majestic double-sided stone fireplace or soak tired muscles in the sunken cedar hot tub while admiring the dramatic peaks of the Mont-Blanc massif.",
    houseRules: [
      "Check-in: 4:00 PM – 10:00 PM",
      "Checkout: 10:00 AM",
      "No ski boots inside living areas (use boot warmers in ski room)",
      "Fireplace safety screen must remain closed when unattended"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      communication: 5.0,
      location: 5.0,
      checkIn: 5.0,
      value: 4.9
    },
    cleaningFee: 220,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-701",
        author: "Maximilian Weber",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
        date: "February 2026",
        rating: 5,
        comment: "The finest chalet in Chamonix. Truly ski-in/ski-out, heated boot warmers made our mornings effortless, and the outdoor hot tub overlooking the peaks is unforgettable."
      }
    ]
  },
  {
    id: "prop-8",
    hostId: "host-kenji-mariko",
    hostEmail: "kenji.mariko@havenstay.demo",
    title: "Kyoto Heritage Machiya & Zen Courtyard Garden",
    category: "iconic-cities",
    propertyType: "Entire historic townhouse",
    city: "Kyoto",
    country: "Japan",
    location: "Gion District, Kyoto, Japan",
    distance: "5-minute walk to Yasaka Shrine",
    datesAvailable: "Nov 15 – 21",
    price: 360,
    rating: 4.98,
    reviewCount: 204,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee1b2b9ba58f?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Kenji & Mariko",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 7,
      responseRate: "100%",
      responseTime: "within 20 minutes",
      bio: "Heritage preservationists preserving traditional timber Kyoto architecture with modern comforts."
    },
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 3,
      bathrooms: 1.5
    },
    bedroomsList: [
      { name: "Tatami Room 1", bedType: "2 Premium futons", details: "Handmade Nishijin silk bedding & cedar aroma" },
      { name: "Western Bedroom", bedType: "1 Queen bed", details: "Simmons mattress with shoji screen partition" }
    ],
    amenities: [
      "High-speed fiber Wifi",
      "Aromatic Hinoki cypress soaking tub",
      "Private tsuboniwa (inner rock garden)",
      "Floor heating throughout tatami rooms",
      "Traditional matcha tea set & ceramic bowls",
      "Modern Toto Washlet bathroom",
      "Washer & dryer with detergent",
      "Quiet residential alley in historic Gion"
    ],
    description: "Step into timeless Japan inside this 110-year-old preserved machiya. Lovingly restored by Kyoto master carpenters using traditional joinery without nails, balanced with floor heating, air conditioning, and a fragrant Hinoki cypress wood ofuro tub. Slide open the shoji screens to your private moss stone garden and enjoy a contemplative bowl of Uji matcha.",
    houseRules: [
      "Check-in: 3:00 PM – 8:00 PM",
      "Checkout: 11:00 AM",
      "No outdoor shoes allowed inside (slippers provided)",
      "Strict no smoking rule throughout wooden property"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      communication: 5.0,
      location: 5.0,
      checkIn: 5.0,
      value: 4.9
    },
    cleaningFee: 70,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-801",
        author: "Emily Watson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        date: "November 2025",
        rating: 5,
        comment: "Staying here was the highlight of our trip to Japan. The Hinoki tub smells incredible, and having your morning tea looking out into the moss garden is unforgettable."
      }
    ]
  },
  {
    id: "prop-9",
    hostId: "host-yuki",
    hostEmail: "yuki@havenstay.demo",
    title: "Oia Cliff Villa — Private Cave Pool & Sunset View",
    category: "amazing-views",
    propertyType: "Entire cave house",
    city: "Oia",
    country: "Greece",
    location: "Oia, Santorini, Greece",
    distance: "Direct unobstructed view of the caldera",
    datesAvailable: "May 10 – 16",
    price: 690,
    rating: 4.99,
    reviewCount: 280,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Eleni & Nikos",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 8,
      responseRate: "100%",
      responseTime: "within 10 minutes",
      bio: "Santorini locals passionate about Cycladic cave architecture and sunset hospitality."
    },
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2
    },
    bedroomsList: [
      { name: "Caldera Cave Master", bedType: "1 King bed", details: "Sculpted volcanic rock walls & sea breeze" },
      { name: "Arch Suite", bedType: "1 Queen bed", details: "Private en-suite whitewashed rain shower" }
    ],
    amenities: [
      "High-speed Wifi",
      "Indoor/outdoor heated cave pool",
      "Private cliffside sunbathing terrace",
      "Complimentary Greek wine upon arrival",
      "Air conditioning & heating",
      "Espresso machine with Lavazza capsules",
      "Daily luggage porterage included",
      "Curated catamaran excursion booking"
    ],
    description: "Carved into the dramatic volcanic cliffs of Oia, this authentic whitewashed cave home offers the premier vantage point for Santorini’s world-famous sunsets. Swim through an arched indoor tunnel straight into the outdoor cliff plunge pool overlooking the caldera. Private, serene, and iconic.",
    houseRules: [
      "Check-in: 3:00 PM – 9:00 PM",
      "Checkout: 11:00 AM",
      "Porter will meet you at Oia main square for luggage"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      communication: 5.0,
      location: 5.0,
      checkIn: 5.0,
      value: 4.9
    },
    cleaningFee: 110,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-901",
        author: "Sophie Tremblay",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
        date: "September 2025",
        rating: 5,
        comment: "You don't need to fight the crowds in Oia for the sunset—you have the best seat on the island right on your private terrace. Eleni is an incredible host."
      }
    ]
  },
  {
    id: "prop-10",
    hostId: "host-ibrahim",
    hostEmail: "ibrahim@havenstay.demo",
    title: "Lake Como Villa Sereno — Private Dock & Gardens",
    category: "lakefront",
    propertyType: "Entire historic lakefront estate",
    city: "Bellagio",
    country: "Italy",
    location: "Bellagio, Lake Como, Italy",
    distance: "Direct frontage on Lake Como waters",
    datesAvailable: "Jun 1 – 7",
    price: 920,
    rating: 4.98,
    reviewCount: 88,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Countess Gianna",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 11,
      responseRate: "100%",
      responseTime: "within an hour",
      bio: "Family estate keeper sharing private lakeside heritage with global travelers."
    },
    capacity: {
      guests: 8,
      bedrooms: 4,
      beds: 5,
      bathrooms: 4
    },
    bedroomsList: [
      { name: "Lakeside Royal Suite", bedType: "1 King bed", details: "Antique armoire, marble en-suite & balcony" },
      { name: "Cypress Bedroom", bedType: "1 Queen bed", details: "Views of Bellagio peninsula" },
      { name: "Olive Suite", bedType: "1 Queen bed", details: "Terracotta terrace access" },
      { name: "Garden Twin Room", bedType: "2 Single beds", details: "Overlooking centenary magnolia trees" }
    ],
    amenities: [
      "Fast Wifi across estate",
      "Private boat dock & motorboat rental access",
      "Heated lakeside swimming pool",
      "Centuries-old botanical gardens",
      "Wine cellar with vintage Barolos",
      "Dedicated concierge & private chef options",
      "Air conditioning in all rooms",
      "Kayaks & paddleboards provided"
    ],
    description: "An aristocratic neoclassical villa situated on the shimmering waters of Lake Como. Stroll through cypress-lined terraces, sip prosecco on your private stone boat jetty, and dive into the heated pool flanked by blooming wisteria. The quintessential Italian romance.",
    houseRules: [
      "Check-in: 3:00 PM – 8:00 PM",
      "Checkout: 10:00 AM",
      "Respect historic artwork and antique furnishings",
      "Quiet hours after 11:00 PM"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      communication: 5.0,
      location: 5.0,
      checkIn: 5.0,
      value: 4.8
    },
    cleaningFee: 250,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-1001",
        author: "Charlotte Windsor",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        date: "July 2025",
        rating: 5,
        comment: "This villa is pure magic. Having our private boat pick us up from the dock for lunch in Bellagio was the most special day of our year."
      }
    ]
  },
  {
    id: "prop-11",
    hostId: "host-amara",
    hostEmail: "amara@havenstay.demo",
    title: "Cotswolds Honey-Stone Cottage & Wildflower Garden",
    category: "countryside",
    propertyType: "Entire historic cottage",
    city: "Castle Combe",
    country: "United Kingdom",
    location: "Cotswolds, Wiltshire, United Kingdom",
    distance: "Beside the babbling Bybrook stream",
    datesAvailable: "Oct 19 – 24",
    price: 260,
    rating: 4.96,
    reviewCount: 147,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee1b2b9ba58f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Arthur & Felicity",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 6,
      responseRate: "100%",
      responseTime: "within an hour",
      bio: "Antique collectors and countryside gardeners who restored this 17th-century weaver's cottage."
    },
    capacity: {
      guests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1.5
    },
    bedroomsList: [
      { name: "Gable Bedroom", bedType: "1 King brass bed", details: "Exposed oak beams & garden view" },
      { name: "Orchard Room", bedType: "1 Double bed", details: "Cozy wool throws & reading chair" }
    ],
    amenities: [
      "High-speed Wifi",
      "Original inglenook fireplace with seasoned logs",
      "Traditional AGA cast iron cooker",
      "Clawfoot copper soaking bath",
      "Private enclosed walled English garden",
      "Wellington boots in all sizes provided",
      "Village pub 3 minutes walk",
      "Artisan breakfast hamper on arrival"
    ],
    description: "Step into an English fairy tale in this 17th-century honey-coloured limestone cottage. Snuggle by the crackling inglenook hearth, brew tea with homemade scones, and wander down cobblestone pathways to the 12th-century village pub. Complete with climbing roses and a walled secret garden.",
    houseRules: [
      "Check-in: 3:00 PM – 9:00 PM",
      "Checkout: 11:00 AM",
      "Mind the low historic doorway lintels",
      "Dog friendly (well-behaved pets welcome!)"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      communication: 5.0,
      location: 5.0,
      checkIn: 5.0,
      value: 4.9
    },
    cleaningFee: 65,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-1101",
        author: "Hannah Abbott",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        date: "September 2025",
        rating: 5,
        comment: "Cozy doesn't begin to describe it. The copper bath, the roaring fire, and Felicity's freshly baked bread made this our best English holiday ever."
      }
    ]
  },
  {
    id: "prop-12",
    hostId: "host-amara",
    hostEmail: "amara@havenstay.demo",
    title: "Canopy Nest — Mirrored Treehouse in Redwood Forest",
    category: "treehouses",
    propertyType: "Entire treehouse sanctuary",
    city: "Big Sur",
    country: "USA",
    location: "Big Sur, California, United States",
    distance: "Suspended 40 feet in ancient coastal redwoods",
    datesAvailable: "Nov 1 – 6",
    price: 410,
    rating: 4.98,
    reviewCount: 173,
    isGuestFavorite: true,
    isSuperhost: true,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee1b2b9ba58f?auto=format&fit=crop&w=800&q=80"
    ],
    host: {
      name: "Brooke & Forest",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isSuperhost: true,
      yearsHosting: 5,
      responseRate: "100%",
      responseTime: "within an hour",
      bio: "Ecologists and wooden treehouse builders living off-grid on the Big Sur coastline."
    },
    capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    bedroomsList: [
      { name: "Canopy Loft", bedType: "1 King bed", details: "Skylight into redwood crowns & ocean breeze" }
    ],
    amenities: [
      "Solar-powered Starlink Wifi",
      "Suspended rope bridge entry",
      "Outdoor clawfoot soaking tub on canopy deck",
      "Indoor wood stove",
      "Wrap-around redwood balcony",
      "Chemex pour-over coffee bar",
      "Binoculars for whale & condor watching",
      "Private forest trail to hidden beach"
    ],
    description: "Suspended forty feet amidst old-growth coastal redwoods, Canopy Nest is a high-design architectural treehouse. Access via a gentle cedar suspension bridge, soak in the steaming outdoor tub while watching the Pacific fog roll through towering branches, and fall asleep to the distant murmur of ocean waves.",
    houseRules: [
      "Check-in: 3:00 PM – 7:00 PM",
      "Checkout: 11:00 AM",
      "Adults only (not suitable for young children due to suspension heights)",
      "Strictly no smoking or open flames on timber decks"
    ],
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      communication: 5.0,
      location: 5.0,
      checkIn: 4.9,
      value: 4.9
    },
    cleaningFee: 90,
    serviceFeePercent: 0.12,
    reviews: [
      {
        id: "rev-1201",
        author: "Zoe Kravitz-M.",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
        date: "October 2025",
        rating: 5,
        comment: "Taking an outdoor bath under thousand-year-old redwoods was a spiritual experience. Unbelievably romantic and peaceful."
      }
    ]
  }
];
