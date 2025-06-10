export const markets = [
  {
    id: 1,
    name: 'Main Market Bamenda (Central Market)',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    description: 'The largest and busiest market in Bamenda, serving the entire North West Region',
    location: 'Bamenda Central, A-Line to D-Line',
    shops: [
      { id: 1, name: 'Mama Grace Fashion House', category: 'Traditional Wear', verified: true, trustCount: 156, owner: 'Grace Mbong Tabi' },
      { id: 2, name: 'Bro Francis Electronics', category: 'Electronics', verified: true, trustCount: 203, owner: 'Francis Nkeng Azah' },
      { id: 3, name: 'TechHub Mobile Palace', category: 'Phones & Accessories', verified: true, trustCount: 289, owner: 'Emmanuel Che Fru' },
      { id: 4, name: 'Sister Joyce Beauty Corner', category: 'Cosmetics & Hair', verified: true, trustCount: 134, owner: 'Joyce Njei Titanji' },
      { id: 5, name: 'Alhaji Musa Provisions', category: 'General Goods', verified: true, trustCount: 178, owner: 'Musa Abdullahi' },
    ],
    importers: [
      { id: 1, name: 'Bamenda Global Imports', category: 'Electronics & Phones', verified: true, trustCount: 234, contact: '+237 677 123 456' },
      { id: 2, name: 'West Africa Fashion Imports', category: 'Textiles & Fashion', verified: true, trustCount: 189, contact: '+237 678 234 567' },
    ],
    vendors: [
      { id: 1, name: 'Pa John Shoe Repair', category: 'Shoe Services', verified: true, trustCount: 145, specialty: 'All types of shoe repair' },
      { id: 2, name: 'Mama Comfort Food', category: 'Prepared Food', verified: false, trustCount: 89, specialty: 'Ekwang, Ndole, Koki' },
      { id: 3, name: 'Tech Doctor Repair', category: 'Phone Repair', verified: true, trustCount: 167, specialty: 'All phone brands' },
    ],
  },
  {
    id: 2,
    name: 'Nkwen Market (University Market)',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    description: 'Popular market serving University of Bamenda students and Nkwen community',
    location: 'Nkwen, Near University of Bamenda',
    shops: [
      { id: 6, name: 'Student Mobile World', category: 'Affordable Phones', verified: true, trustCount: 123, owner: 'Bro Paul Tamfu' },
      { id: 7, name: 'Campus Fresh Foods', category: 'Groceries & Provisions', verified: false, trustCount: 67, owner: 'Aunty Mary Ayuk' },
      { id: 8, name: 'Book Corner Nkwen', category: 'Educational Materials', verified: true, trustCount: 98, owner: 'Teacher Ngozi' },
    ],
    importers: [
      { id: 3, name: 'Nkwen International Trade', category: 'Student Supplies', verified: true, trustCount: 78, contact: '+237 679 345 678' },
    ],
    vendors: [
      { id: 4, name: 'Traditional Craft Mama', category: 'Local Crafts', verified: false, trustCount: 45, specialty: 'Bamenda pottery' },
      { id: 5, name: 'Student Tailor', category: 'Clothing Services', verified: true, trustCount: 89, specialty: 'Uniforms & casual wear' },
    ],
  },
  {
    id: 3,
    name: 'Ntarikon Commercial Market',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    description: 'Modern commercial hub with focus on technology and business services',
    location: 'Ntarikon Quarter, Bamenda',
    shops: [
      { id: 9, name: 'Digital Solutions Center', category: 'Computer Services', verified: true, trustCount: 234, owner: 'Engineer Kinge' },
      { id: 10, name: 'Ntarikon Tech Plaza', category: 'Laptops & Computers', verified: true, trustCount: 189, owner: 'Bro Collins Tech' },
      { id: 11, name: 'Business Print Hub', category: 'Printing Services', verified: true, trustCount: 156, owner: 'Sister Helen' },
    ],
    importers: [
      { id: 4, name: 'Advanced Tech Imports', category: 'Latest Technology', verified: true, trustCount: 278, contact: '+237 680 456 789' },
    ],
    vendors: [
      { id: 6, name: 'Phone Accessories Pro', category: 'Mobile Accessories', verified: true, trustCount: 123, specialty: 'Cases, chargers, earphones' },
      { id: 7, name: 'Office Supplies Vendor', category: 'Stationery', verified: false, trustCount: 67, specialty: 'Business materials' },
    ],
  },
  {
    id: 4,
    name: 'Food Market Bamenda',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    description: 'Dedicated food market with fresh produce, meat, and traditional ingredients',
    location: 'Behind Main Market, Food Section',
    shops: [
      { id: 12, name: 'Fresh Fish Corner', category: 'Fresh & Smoked Fish', verified: true, trustCount: 167, owner: 'Mama Fish' },
      { id: 13, name: 'Spice & Seasoning Hub', category: 'Spices & Seasonings', verified: true, trustCount: 134, owner: 'Spice Mama' },
      { id: 14, name: 'Vegetable Garden', category: 'Fresh Vegetables', verified: false, trustCount: 89, owner: 'Farmer John' },
    ],
    vendors: [
      { id: 8, name: 'Palm Oil Specialist', category: 'Palm Oil & Kernels', verified: true, trustCount: 145, specialty: 'Pure red oil' },
      { id: 9, name: 'Meat Seller Pro', category: 'Fresh Meat', verified: true, trustCount: 178, specialty: 'Beef, pork, chicken' },
    ],
  }
];

export const listings = [
  {
    id: 1,
    title: "Samsung Galaxy S24 Ultra - Brand New",
    category: "Phones",
    price: "780,000 XAF",
    location: "Nkwen, Bamenda",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 156,
    seller: "Bro Francis Mobile Shop"
  },
  {
    id: 2,
    title: "Original Nike Air Force 1 - White",
    category: "Shoes",
    price: "65,000 XAF",
    location: "Main Market Bamenda, B-Line",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: false,
    trustCount: 78,
    seller: "Paul's Shoe Corner"
  },
  {
    id: 3,
    title: "Modern Duplex for Sale - Commercial Avenue",
    category: "Real Estate",
    price: "85,000,000 XAF",
    location: "Commercial Avenue, Bamenda",
    image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 142,
    seller: "Ngwa Emmanuel Properties"
  },
  {
    id: 4,
    title: "iPhone 15 Pro Max - 256GB",
    category: "Phones",
    price: "1,100,000 XAF",
    location: "Up Station, Bamenda",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 234,
    seller: "TechHub Bamenda"
  },
  {
    id: 5,
    title: "MacBook Pro M3 - For Graphics & Video",
    category: "Electronics",
    price: "1,450,000 XAF",
    location: "Ntarikon, Bamenda",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 123,
    seller: "Digital Solutions Cameroon"
  },
  {
    id: 6,
    title: "Authentic Ndop Kaba - Traditional Design",
    category: "Clothes",
    price: "45,000 XAF",
    location: "Nkwen Market, Cultural Section",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 89,
    seller: "Mama Grace Traditional Wear"
  },
  {
    id: 7,
    title: "Toyota Corolla 2019 - Locally Used",
    category: "Vehicles",
    price: "8,500,000 XAF",
    location: "Motor Park, Bamenda",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 167,
    seller: "Alhaji Motors Bamenda"
  },
  {
    id: 8,
    title: "Professional Website Design Services",
    category: "Services",
    price: "150,000 XAF",
    location: "Bamenda, North West Region",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 112,
    seller: "BamTech Solutions"
  },
  {
    id: 9,
    title: "Fresh Palm Oil - 20 Litres",
    category: "Food & Agriculture",
    price: "25,000 XAF",
    location: "Food Market, Bamenda",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: false,
    trustCount: 45,
    seller: "Mama Esther Palm Oil"
  },
  {
    id: 10,
    title: "Canon EOS R6 Camera - Photography Business",
    category: "Electronics",
    price: "950,000 XAF",
    location: "Commercial Avenue, Bamenda",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 78,
    seller: "PhotoPro Cameroon"
  }
];

export const realEstate = [
  {
    id: 1,
    title: "Modern Duplex for Sale – Commercial Avenue",
    price: "85,000,000 XAF",
    location: "Commercial Avenue, Bamenda, North West Region",
    image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 142,
    owner: "Ngwa Emmanuel Tabi",
    bedrooms: 4,
    bathrooms: 3,
    features: ["Parking", "Generator", "Water Tank", "Security Gate"]
  },
  {
    id: 2,
    title: "2-Bedroom Furnished Apartment – Ntarikon",
    price: "180,000 XAF/month",
    location: "Ntarikon Quarter, Bamenda, North West Region",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 78,
    owner: "Mama Charity Fonguh",
    bedrooms: 2,
    bathrooms: 1,
    features: ["Furnished", "WiFi Ready", "24/7 Water", "Close to Market"]
  },
  {
    id: 3,
    title: "Family House with Compound – Up Station",
    price: "65,000,000 XAF",
    location: "Up Station Hill, Bamenda, North West Region",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 156,
    owner: "Chief Mbah Peter Ndikum",
    bedrooms: 5,
    bathrooms: 4,
    features: ["Large Compound", "Fruit Trees", "Boys Quarters", "Mountain View"]
  },
  {
    id: 4,
    title: "Self-Contained Studio – Nkwen University Area",
    price: "120,000 XAF/month",
    location: "Nkwen, Near University of Bamenda",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 94,
    owner: "Aunty Gladys Tanyi",
    bedrooms: 1,
    bathrooms: 1,
    features: ["Student Friendly", "Kitchen", "Study Area", "Near Campus"]
  },
  {
    id: 5,
    title: "Commercial Plaza – Food Market Junction",
    price: "150,000,000 XAF",
    location: "Food Market Area, Bamenda Central",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 203,
    owner: "Alhaji Musa Abdullahi",
    features: ["8 Shop Spaces", "Central Location", "High Traffic", "Parking Space"]
  },
  {
    id: 6,
    title: "Prime Land for Development – Mile 4 Nkwen",
    price: "12,500,000 XAF",
    location: "Mile 4, Nkwen, Bamenda",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: false,
    trustCount: 67,
    owner: "Pa John Che Nformi",
    size: "1000 sqm",
    features: ["Title Deed Ready", "Road Access", "Electricity Available", "Residential Zone"]
  },
  {
    id: 7,
    title: "3-Bedroom Bungalow – Cow Street",
    price: "45,000,000 XAF",
    location: "Cow Street, Bamenda Station",
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 89,
    owner: "Madam Rose Njei",
    bedrooms: 3,
    bathrooms: 2,
    features: ["Tiled Floors", "Modern Kitchen", "Gated", "Close to Town"]
  },
  {
    id: 8,
    title: "Executive Mansion – Government Residential Area",
    price: "250,000,000 XAF",
    location: "GRA, Bamenda, North West Region",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 245,
    owner: "Hon. Dr. Ngozi Amadu",
    bedrooms: 6,
    bathrooms: 5,
    features: ["Swimming Pool", "Generator House", "Staff Quarters", "High Security"]
  },
  {
    id: 9,
    title: "Shop Space for Rent – Main Market",
    price: "80,000 XAF/month",
    location: "Main Market Bamenda, A-Line",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: false,
    trustCount: 56,
    owner: "Mama Comfort Ayuk",
    features: ["Ground Floor", "High Customer Traffic", "Storage Space", "Market Center"]
  },
  {
    id: 10,
    title: "Student Hostel – University of Bamenda",
    price: "60,000 XAF/month per bed",
    location: "Behind UBa Campus, Bambili",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    verified: true,
    trustCount: 134,
    owner: "Mr. Franklin Ako",
    features: ["4 Beds per Room", "Common Kitchen", "Study Hall", "24/7 Security"]
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
    status: 'Active',
    highestBidder: 'tech_buyer_bda',
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
    status: 'Active',
    highestBidder: 'fashion_lover_bda',
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
    status: 'Active',
    highestBidder: 'mobile_enthusiast_bda',
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
    status: 'Active',
    highestBidder: 'culture_lover_bda',
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
    status: 'Active',
    highestBidder: 'gamer_pro_bda',
  }
];

export const currentUser = {
  id: 1,
  name: "Ngwa Emmanuel Tabi",
  username: "ngwatechbda",
  location: "Mile 4 Nkwen, Bamenda, North West Region",
  accountType: "vendor", // or "premium", "user", "investor"
  listingsPosted: 8,
  realEstatePosted: 2,
  auctionsPosted: 1,
  trustCount: 324,
  followers: 89,
  following: 156,
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
  bio: "Verified tech entrepreneur and property dealer in Bamenda. Bridging digital solutions with local commerce. 🇨🇲",
  posts: 45,
  email: "ngwa.tech@prolist.cm",
  phone: "+237 674 532 891",
  joinDate: "January 2023",
  rating: 4.9,
  profileViews: 2,100,
  languages: ["English", "French", "Pidgin"],
  specialties: ["Electronics", "Real Estate", "Tech Services"]
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
