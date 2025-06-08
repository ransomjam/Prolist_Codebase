import { Shield, CheckCircle, Users, Globe, Heart, Star } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About ProList</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Cameroon's leading digital marketplace connecting communities through trust and innovation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Mission Statement */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
            ProList is Cameroon's leading digital marketplace designed to connect local businesses, entrepreneurs, and customers through a safe, simple, and secure platform. We verify every seller, hold payments securely in escrow until buyers confirm receipt, and enable direct in-app communication — ensuring trust and transparency across all transactions.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed text-justify">
            Our platform offers a comprehensive ecosystem of features tailored for Cameroon's diverse economy.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Shield className="text-blue-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Marketplace Listings</h3>
            </div>
            <p className="text-gray-700 text-justify">
              Browse and post a wide range of products with detailed, verified listings to maximize your visibility.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Globe className="text-green-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Local Markets</h3>
            </div>
            <p className="text-gray-700 text-justify">
              Explore authentic local markets in Bamenda with their unique sections and shop lines, bringing the real community feel online.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="text-purple-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Real Estate</h3>
            </div>
            <p className="text-gray-700 text-justify">
              Discover property listings with options for featured promotions and lead generation, connecting buyers and sellers effectively.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <Users className="text-orange-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Professional Services</h3>
            </div>
            <p className="text-gray-700 text-justify">
              Access trusted experts offering graphic design, web development, resume writing, data analysis, and more — all deliverable and payable online.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <Star className="text-red-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Auctions</h3>
            </div>
            <p className="text-gray-700 text-justify">
              Participate in live bidding for the best deals with transparent countdowns and secure escrow payments.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                <Heart className="text-pink-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Community Focus</h3>
            </div>
            <p className="text-gray-700 text-justify">
              Building a thriving community where businesses gain visibility, buyers find trusted options, and everyone grows together.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-700 text-justify">
                Every seller is verified and all transactions are secured through our escrow system.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-700">
                Supporting local businesses and fostering connections within Cameroon's communities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-700">
                Continuously improving our platform with cutting-edge features and user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-4">
            ProList is more than a marketplace — it's a thriving community where businesses gain visibility, buyers find trusted options, and everyone grows together through verified connections and innovative features.
          </p>
          <p className="text-lg font-semibold text-blue-600 mb-2">
            Join ProList today — where Cameroon buys, sells, connects, and thrives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <p className="text-gray-600">
              <strong>Support:</strong> info.prolist@gmail.com
            </p>
            <p className="text-gray-600">
              <strong>Contact:</strong> +237 671 308 991
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}