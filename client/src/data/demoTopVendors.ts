export interface DemoVendor {
  id: number;
  username: string;
  fullName: string;
  location: string;
  verificationStatus?: string;
  productCount: number;
  rating: number;
  profilePictureUrl?: string;
}

const demoTopVendors: DemoVendor[] = [
  {
    id: 1,
    username: "greenshop",
    fullName: "Green Shop",
    location: "Bamenda",
    verificationStatus: "verified",
    productCount: 120,
    rating: 4.8
  },
  {
    id: 2,
    username: "techmart",
    fullName: "Tech Mart",
    location: "Bamenda",
    verificationStatus: "verified",
    productCount: 95,
    rating: 4.7
  },
  {
    id: 3,
    username: "fashionhub",
    fullName: "Fashion Hub",
    location: "Bamenda",
    verificationStatus: "verified",
    productCount: 80,
    rating: 4.6
  },
  {
    id: 4,
    username: "homeplus",
    fullName: "Home Plus",
    location: "Bamenda",
    verificationStatus: "verified",
    productCount: 70,
    rating: 4.5
  },
  {
    id: 5,
    username: "cityservices",
    fullName: "City Services",
    location: "Bamenda",
    verificationStatus: "verified",
    productCount: 65,
    rating: 4.4
  }
];

export default demoTopVendors;
