import { Shield, Star, Gavel } from "lucide-react";
import heroImage from "@assets/upstation-hill.jpg";
import { useAuth } from "../hooks/useAuth";
import { useScrollAnimations } from "../hooks/useScrollAnimations";

export default function LandingPage() {
  const { setElementRef, getAnimationClass, getAnimationStyle } = useScrollAnimations();

  return (
    <div className="bg-white text-primary scroll-smooth">
      {/* Hero Section */}
      <div className="h-[50vh] sm:h-[90vh] md:h-[95vh] relative flex flex-col justify-center items-center text-white text-center overflow-hidden">
        <img 
          src={heroImage} 
          alt="Bamenda cityscape" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 md:scale-110 lg:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
        
        {/* Animated hero content positioned within the image */}
        <div 
          ref={(el) => setElementRef('hero-content', el)}
          data-animation-id="hero-content"
          className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transform gpu-accelerated will-change-transform ${getAnimationClass('hero-content', 0, 'always-visible')}`}
          style={getAnimationStyle(0)}
        >
          <h1 
            ref={(el) => setElementRef('hero-title', el)}
            data-animation-id="hero-title"
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold drop-shadow-2xl mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto gpu-accelerated will-change-transform ${getAnimationClass('hero-title', 1, 'always-visible')}`}
            style={getAnimationStyle(1)}
          >
            Welcome to <span className="text-neonGreen">ProList</span>
          </h1>
          <p 
            ref={(el) => setElementRef('hero-subtitle', el)}
            data-animation-id="hero-subtitle"
            className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6 lg:mb-8 drop-shadow-lg max-w-3xl mx-auto leading-relaxed gpu-accelerated will-change-transform ${getAnimationClass('hero-subtitle', 2, 'always-visible')}`}
            style={getAnimationStyle(2)}
          >
            Connecting Cameroon's Business Communities with Trust, Opportunity, and Growth
          </p>

          <div 
            ref={(el) => setElementRef('about-link', el)}
            data-animation-id="about-link"
            className={`mb-6 sm:mb-8 lg:mb-10 gpu-accelerated will-change-transform ${getAnimationClass('about-link', 3.5, 'always-visible')}`}
            style={getAnimationStyle(3.5)}
          >
            <a 
              href="/about"
              className="text-neonGreen hover:text-green-300 font-medium text-sm sm:text-base underline transition-colors duration-300 drop-shadow-md"
            >
              Learn more about ProList
            </a>
          </div>
          <div 
            ref={(el) => setElementRef('hero-actions', el)}
            data-animation-id="hero-actions"
            className={`flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center max-w-lg mx-auto gpu-accelerated will-change-transform ${getAnimationClass('hero-actions', 4, 'always-visible')}`}
            style={getAnimationStyle(4)}
          >
            <a
              href="/signup"
              className="bg-gradient-to-r from-emerald to-green-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl border-2 border-emerald/50 text-sm sm:text-base lg:text-lg"
            >
              Join ProList
            </a>
            <a 
              href="/login" 
              className="bg-white/15 backdrop-blur-md text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-semibold hover:bg-white/25 transition-all duration-300 border-2 border-white/30 text-sm sm:text-base lg:text-lg"
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 
            ref={(el) => setElementRef('features-title', el)}
            data-animation-id="features-title"
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 lg:mb-16 text-primary max-w-4xl mx-auto gpu-accelerated will-change-transform ${getAnimationClass('features-title', 5, 'always-visible')}`}
            style={getAnimationStyle(5)}
          >
            Why Choose ProList?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            <div 
              ref={(el) => setElementRef('feature-1', el)}
              data-animation-id="feature-1"
              className={`bg-white p-6 lg:p-8 rounded-2xl shadow-lg border-2 border-emerald/20 hover:border-emerald/40 transition-all duration-300 transform hover:scale-105 hover:-rotate-1 gpu-accelerated will-change-transform ${getAnimationClass('feature-1', 6, 'always-visible')}`}
              style={getAnimationStyle(6)}
            >
              <div className="flex justify-center mb-4 lg:mb-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow">
                  <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-primary">Verified Businesses</h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">Real people, real shops, real trust. Every business is verified for your safety.</p>
            </div>
            <div 
              ref={(el) => setElementRef('feature-2', el)}
              data-animation-id="feature-2"
              className={`bg-white p-6 lg:p-8 rounded-2xl shadow-lg border-2 border-neonBlue/20 hover:border-neonBlue/40 transition-all duration-300 transform hover:scale-105 hover:rotate-1 gpu-accelerated will-change-transform ${getAnimationClass('feature-2', 7, 'always-visible')}`}
              style={getAnimationStyle(7)}
            >
              <div className="flex justify-center mb-4 lg:mb-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                  <Star className="w-8 h-8 lg:w-10 lg:h-10 text-white animate-spin-slow" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-primary">Trust System</h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">Shoppers trust vendors with high ratings and verified reviews.</p>
            </div>
            <div 
              ref={(el) => setElementRef('feature-3', el)}
              data-animation-id="feature-3"
              className={`bg-white p-6 lg:p-8 rounded-2xl shadow-lg border-2 border-neonGreen/20 hover:border-neonGreen/40 transition-all duration-300 transform hover:scale-105 hover:-rotate-1 gpu-accelerated will-change-transform ${getAnimationClass('feature-3', 8, 'always-visible')}`}
              style={getAnimationStyle(8)}
            >
              <div className="flex justify-center mb-4 lg:mb-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg animate-wiggle">
                  <Gavel className="w-8 h-8 lg:w-10 lg:h-10 text-white animate-bounce" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-primary">Live Auctions</h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">Get the best deals and discounts through our live auction system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-neonBlue text-white text-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            ref={(el) => setElementRef('cta-title', el)}
            data-animation-id="cta-title"
            className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 lg:mb-8 max-w-4xl mx-auto gpu-accelerated will-change-transform ${getAnimationClass('cta-title', 9, 'always-visible')}`}
            style={getAnimationStyle(9)}
          >
            Ready to Join Bamenda's Digital Revolution?
          </h2>
          <p 
            ref={(el) => setElementRef('cta-subtitle', el)}
            data-animation-id="cta-subtitle"
            className={`text-base sm:text-lg lg:text-xl xl:text-2xl mb-8 lg:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed gpu-accelerated will-change-transform ${getAnimationClass('cta-subtitle', 10, 'always-visible')}`}
            style={getAnimationStyle(10)}
          >
            Connect with thousands of local businesses and customers today
          </p>
          <div 
            ref={(el) => setElementRef('cta-actions', el)}
            data-animation-id="cta-actions"
            className={`flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center max-w-lg mx-auto gpu-accelerated will-change-transform ${getAnimationClass('cta-actions', 11, 'always-visible')}`}
            style={getAnimationStyle(11)}
          >
            <a 
              href="/signup" 
              className="bg-white text-primary px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base lg:text-lg"
            >
              List Your Business
            </a>
            <a 
              href="/signup" 
              className="bg-transparent border-2 border-white text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 text-sm sm:text-base lg:text-lg"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={(el) => setElementRef('footer-content', el)}
            data-animation-id="footer-content"
            className={`gpu-accelerated will-change-transform ${getAnimationClass('footer-content', 12)}`}
            style={getAnimationStyle(12)}
          >
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 lg:mb-4">ProList © 2025</p>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg">Powered by Bamenda Entrepreneurs</p>
          </div>
        </div>
      </footer>
    </div>
  );
}