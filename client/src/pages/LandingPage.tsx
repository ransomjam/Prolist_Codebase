import { Shield, Star, Gavel } from "lucide-react";
import heroImage from "@assets/upstation-hill.jpg";
import { useAuth } from "../hooks/useAuth";

export default function LandingPage() {
  const { login, isAuthenticated } = useAuth();

  const handleTestLogin = () => {
    // Simulate login for testing logout functionality
    login({
      id: 1,
      username: "testuser",
      name: "Test User"
    });
    window.location.href = "/app";
  };

  return (
    <div className="bg-white text-primary">
      {/* Hero Section */}
      <div className="h-[70vh] sm:h-[80vh] relative flex flex-col justify-center items-center text-white text-center">
        <img 
          src={heroImage} 
          alt="Bamenda cityscape" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-4">
            Welcome to <span className="text-neonGreen">ProList</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 drop-shadow-md">
            Cameroon's #1 Digital Marketplace for Trust & Growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/listings" 
              className="bg-gradient-to-r from-emerald to-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg border-2 border-emerald/50"
            >
              Browse Listings
            </a>
            <a
              href="/signup"
              className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border-2 border-white/30"
            >
              Join ProList
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-primary">Why Choose ProList?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-emerald/20 hover:border-emerald/40 transition-all">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-emerald" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">Verified Businesses</h3>
            <p className="text-gray-600">Real people, real shops, real trust. Every business is verified for your safety.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-neonBlue/20 hover:border-neonBlue/40 transition-all">
            <div className="flex justify-center mb-4">
              <Star className="w-12 h-12 text-neonBlue" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">Trust System</h3>
            <p className="text-gray-600">Shoppers trust vendors with high ratings and verified reviews.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-neonGreen/20 hover:border-neonGreen/40 transition-all">
            <div className="flex justify-center mb-4">
              <Gavel className="w-12 h-12 text-neonGreen" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">Live Auctions</h3>
            <p className="text-gray-600">Get the best deals and discounts through our live auction system.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-primary to-neonBlue text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Join Bamenda's Digital Revolution?</h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            Connect with thousands of local businesses and customers today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/new-listing" 
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              List Your Business
            </a>
            <a 
              href="/markets" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-lg font-semibold mb-2">ProList © 2025</p>
          <p className="text-gray-300">Powered by Bamenda Entrepreneurs</p>
        </div>
      </footer>
    </div>
  );
}