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

export const stats = {
  businesses: "150+",
  markets: "12",
  properties: "89",
  auctions: "24"
};
