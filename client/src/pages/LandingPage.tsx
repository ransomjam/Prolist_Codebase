import { Shield, Star, Gavel, Users, Store, MapPin } from "lucide-react";
import heroImage from "@assets/upstation-hill.jpg";

export default function LandingPage() {
  return (
    <div className="bg-white text-blue-600 scroll-smooth">
      {/* Hero Section */}
      <div className="h-[50vh] sm:h-[90vh] md:h-[95vh] relative flex flex-col justify-center items-center text-white text-center overflow-hidden">
        <img 
          src={heroImage} 
          alt="Bamenda cityscape" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 md:scale-110 lg:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        
        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold drop-shadow-2xl mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto">
            Welcome to <span className="text-green-400">ProList</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
            Connecting Cameroon's Business Communities with Trust, Opportunity, and Growth
          </p>

          <div className="mb-6 sm:mb-8 lg:mb-10">
            <a 
              href="/about"
              className="text-green-400 hover:text-green-300 font-medium text-sm sm:text-base underline transition-colors duration-300 drop-shadow-md"
            >
              Learn More About ProList
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/login"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-50 active:scale-95"
            >
              Login
            </a>
            <a 
              href="/signup" 
              className="bg-green-400/90 backdrop-blur-md text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-green-400 active:scale-95"
            >
              Join ProList
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 lg:mb-16 text-blue-600 max-w-4xl mx-auto">
            Why Choose ProList?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-4 lg:mb-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-blue-600">Verified Businesses</h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">Real people, real shops, real trust. Every business is verified for your safety.</p>
            </div>
            
            <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-4 lg:mb-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Star className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-blue-600">Trust System</h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">Shoppers trust vendors with high ratings and verified reviews.</p>
            </div>
            
            <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-4 lg:mb-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gavel className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-blue-600">Live Auctions</h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">Bid on unique items and get the best deals in real-time auctions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 lg:py-20 bg-blue-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 lg:mb-16">
            Growing Community
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">500+</div>
              <div className="text-sm sm:text-base lg:text-lg text-blue-200">Active Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">2K+</div>
              <div className="text-sm sm:text-base lg:text-lg text-blue-200">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">50+</div>
              <div className="text-sm sm:text-base lg:text-lg text-blue-200">Live Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">1K+</div>
              <div className="text-sm sm:text-base lg:text-lg text-blue-200">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 lg:mb-16 text-blue-600">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            <a href="/products" className="group bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <Store className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-blue-600 group-hover:text-green-500 transition-colors">Retail</h3>
            </a>
            
            <a href="/products" className="group bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-blue-600 group-hover:text-orange-500 transition-colors">Services</h3>
            </a>
            
            <a href="/auctions" className="group bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <Gavel className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-blue-600 group-hover:text-purple-500 transition-colors">Auctions</h3>
            </a>
            
            <a href="/products" className="group bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-blue-600 group-hover:text-cyan-500 transition-colors">Local</h3>
            </a>
            
            <a href="/products" className="group bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <Star className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-blue-600 group-hover:text-yellow-500 transition-colors">Featured</h3>
            </a>
            
            <a href="/products" className="group bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-blue-600 group-hover:text-teal-500 transition-colors">Verified</h3>
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
            Ready to Start Your Business Journey?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 lg:mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of successful vendors on ProList and reach customers across Bamenda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/signup"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-50"
            >
              Become a Vendor
            </a>
            <a 
              href="/products"
              className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}