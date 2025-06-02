export const markets = [
  {
    id: 1,
    name: 'Main Market Bamenda',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    shops: [
      { id: 1, name: 'Fashion House', category: 'Clothes', verified: true, trustCount: 85 },
      { id: 2, name: 'ElectroHub', category: 'Electronics', verified: false, trustCount: 45 },
      { id: 3, name: 'Mobile Palace', category: 'Phones', verified: true, trustCount: 120 },
      { id: 4, name: 'Beauty Corner', category: 'Cosmetics', verified: true, trustCount: 67 },
    ],
    importers: [
      { id: 1, name: 'Bamenda Imports Ltd.', category: 'Electronics', verified: true, trustCount: 78 },
      { id: 2, name: 'Global Trade Co.', category: 'Fashion', verified: true, trustCount: 92 },
    ],
    vendors: [
      { id: 1, name: 'Paul Shoe Vendor', category: 'Shoes', verified: true, trustCount: 90 },
      { id: 2, name: 'Mary\'s Food Stall', category: 'Food', verified: false, trustCount: 56 },
      { id: 3, name: 'Tech Repair Guy', category: 'Services', verified: true, trustCount: 73 },
    ],
  },
  {
    id: 2,
    name: 'Nkwen Market',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    shops: [
      { id: 3, name: 'Phone World', category: 'Phones', verified: true, trustCount: 67 },
      { id: 4, name: 'Fresh Produce Store', category: 'Food', verified: false, trustCount: 34 },
    ],
    importers: [
      { id: 3, name: 'Nkwen Imports', category: 'Food', verified: true, trustCount: 45 },
    ],
    vendors: [
      { id: 4, name: 'Local Craft Vendor', category: 'Crafts', verified: false, trustCount: 29 },
    ],
  },
  {
    id: 3,
    name: 'Ntarikon Market',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    shops: [
      { id: 5, name: 'Tech Central', category: 'Electronics', verified: true, trustCount: 110 },
      { id: 6, name: 'Computer Zone', category: 'Computers', verified: true, trustCount: 89 },
    ],
    importers: [
      { id: 4, name: 'Digital Imports', category: 'Electronics', verified: true, trustCount: 156 },
    ],
    vendors: [
      { id: 5, name: 'Accessory Corner', category: 'Accessories', verified: false, trustCount: 42 },
    ],
  }
];

export const listings = [
  {
    id: 1,
    title: "Samsung Galaxy S23 Ultra",
    category: "Phones",
    price: "700,000 FCFA",
    location: "Nkwen, Bamenda",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 120,
  },
  {
    id: 2,
    title: "Nike Airforce 1",
    category: "Shoes",
    price: "45,000 FCFA",
    location: "Main Market Bamenda",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: false,
    trustCount: 55,
  },
  {
    id: 3,
    title: "Duplex for Sale",
    category: "Real Estate",
    price: "60,000,000 FCFA",
    location: "Commercial Avenue",
    image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 95,
  },
  {
    id: 4,
    title: "iPhone 14 Pro Max",
    category: "Phones",
    price: "850,000 FCFA",
    location: "Up Station, Bamenda",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 200,
  },
  {
    id: 5,
    title: "MacBook Pro M2",
    category: "Electronics",
    price: "1,200,000 FCFA",
    location: "Ntarikon, Bamenda",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 85,
  },
  {
    id: 6,
    title: "Traditional Kaba",
    category: "Clothes",
    price: "25,000 FCFA",
    location: "Nkwen Market",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: false,
    trustCount: 40,
  },
  {
    id: 7,
    title: "Toyota Camry 2020",
    category: "Assets",
    price: "18,000,000 FCFA",
    location: "Commercial Avenue",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 150,
  },
  {
    id: 8,
    title: "Web Design Services",
    category: "Services",
    price: "50,000 FCFA",
    location: "Bamenda",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 75,
  }
];

export const realEstate = [
  {
    id: 1,
    title: "Duplex for Sale – Commercial Avenue",
    price: "60,000,000 FCFA",
    location: "Commercial Avenue, Bamenda",
    image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 85,
  },
  {
    id: 2,
    title: "2-Bedroom Apartment – Ntarikon",
    price: "150,000 FCFA/month",
    location: "Ntarikon, Bamenda",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: false,
    trustCount: 45,
  },
  {
    id: 3,
    title: "3-Bedroom House – Up Station",
    price: "45,000,000 FCFA",
    location: "Up Station, Bamenda",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 120,
  },
  {
    id: 4,
    title: "Studio Apartment – Nkwen",
    price: "80,000 FCFA/month",
    location: "Nkwen, Bamenda",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 67,
  },
  {
    id: 5,
    title: "Commercial Building – Main Market",
    price: "120,000,000 FCFA",
    location: "Main Market Area, Bamenda",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 95,
  },
  {
    id: 6,
    title: "Land for Sale – Bambili",
    price: "8,000,000 FCFA",
    location: "Bambili, Bamenda",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: false,
    trustCount: 34,
  }
];

export const auctions = [
  {
    id: 1,
    product: {
      title: "HP Laptop – Core i7, 16GB RAM",
      description: "Brand new, sealed box with 2-year warranty",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    },
    vendor: "tech_store_bda",
    verified: true,
    startingPrice: 200000,
    currentBid: 250000,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    product: {
      title: "Men's Designer Shoes",
      description: "Premium leather, Italian design, size 42-44",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    },
    vendor: "fashion_nkwen",
    verified: false,
    startingPrice: 35000,
    currentBid: 45000,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    product: {
      title: "Samsung Galaxy S23 Ultra",
      description: "256GB storage, dual SIM, original accessories included",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    },
    vendor: "mobile_world_bda",
    verified: true,
    startingPrice: 600000,
    currentBid: 650000,
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    product: {
      title: "Traditional Kaba Dress",
      description: "Handmade, authentic Cameroonian design, premium fabric",
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    },
    vendor: "cultural_attire_bda",
    verified: true,
    startingPrice: 25000,
    currentBid: 30000,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    product: {
      title: "Gaming Chair - RGB Lighting",
      description: "Ergonomic design, LED lighting, adjustable height and tilt",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    },
    vendor: "gaming_setup_bda",
    verified: true,
    startingPrice: 100000,
    currentBid: 120000,
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
  }
];

export const currentUser = {
  id: 1,
  name: "Jam Ransom",
  username: "jamprolist",
  location: "Centre des Handicapes, Bamenda",
  accountType: "vendor", // or "premium", "user", "investor"
  listingsPosted: 3,
  realEstatePosted: 1,
  auctionsPosted: 0,
  trustCount: 210,
  followers: 47,
};

export const investments = [
  {
    id: 1,
    name: "Green Solar Bamenda",
    industry: "Renewable Energy",
    fundingNeed: "5M FCFA",
    verified: true,
    status: "Open for Partnerships",
    owner: "Fonguh Mark",
  },
  {
    id: 2,
    name: "Quick Mart",
    industry: "Retail",
    fundingNeed: "3M FCFA",
    verified: false,
    status: "Seeking Co-Investor",
    owner: "Tabi Brenda",
  },
];

export const stocks = [
  {
    id: 1,
    company: "GLOW Water Ltd.",
    shares: "200 Available",
    pricePerShare: "25,000 FCFA",
    verified: true,
    location: "Upstation Bamenda",
  },
];

export const verifiedBusinesses = [
  {
    id: 1,
    name: "EmmaTech Gadgets",
    type: "Electronics",
    location: "Main Market",
    trustCount: 300,
    verified: true,
    owner: "Emmanuel Ngwa",
  },
  {
    id: 2,
    name: "Njang Credit Union",
    type: "Financial Services",
    location: "Ntarikon",
    trustCount: 185,
    verified: true,
    owner: "Mbuh Anita",
  },
];

export const notifications = [
  {
    id: 1,
    type: "bid_confirmed",
    title: "Bid Confirmed",
    message: "Your bid of 250,000 FCFA on HP Laptop has been confirmed",
    time: "2 min ago",
    read: false,
    icon: "🔥"
  },
  {
    id: 2,
    type: "listing_reply",
    title: "New Reply",
    message: "Someone replied to your Samsung Galaxy listing",
    time: "15 min ago",
    read: false,
    icon: "💬"
  },
  {
    id: 3,
    type: "account_verified",
    title: "Account Verified",
    message: "Your business EmmaTech Gadgets has been verified",
    time: "1 hour ago",
    read: true,
    icon: "✅"
  },
  {
    id: 4,
    type: "auction_ending",
    title: "Auction Ending Soon",
    message: "Men's Designer Shoes auction ends in 30 minutes",
    time: "2 hours ago",
    read: false,
    icon: "⏰"
  },
  {
    id: 5,
    type: "new_follower",
    title: "New Follower",
    message: "Mbuh Anita started following you",
    time: "3 hours ago",
    read: true,
    icon: "👥"
  },
  {
    id: 6,
    type: "payment_received",
    title: "Payment Received",
    message: "You received 45,000 FCFA for Nike Airforce 1",
    time: "1 day ago",
    read: true,
    icon: "💰"
  },
  {
    id: 7,
    type: "listing_featured",
    title: "Listing Featured",
    message: "Your Traditional Kaba listing is now featured",
    time: "2 days ago",
    read: true,
    icon: "⭐"
  }
];

export const stats = {
  businesses: "150+",
  markets: "12",
  properties: "89",
  auctions: "24"
};
