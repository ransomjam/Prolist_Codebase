import { Shield, Heart, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 px-4 lg:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-neonBlue rounded-lg flex items-center justify-center shadow-neonBlue">
                <Shield className="text-white" size={16} />
              </div>
              <span className="font-bold text-xl">ProList</span>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Connecting local businesses and communities in Bamenda, Cameroon. Discover, support, and grow together.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="text-red-400" size={16} />
              <span className="text-emerald font-semibold">ProList Cares</span>
              <span className="text-blue-200">- Supporting local communities</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="/markets" className="hover:text-neonGreen transition-colors">Markets</a></li>
              <li><a href="/listings" className="hover:text-neonGreen transition-colors">Businesses</a></li>
              <li><a href="/realestate" className="hover:text-neonGreen transition-colors">Real Estate</a></li>
              <li><a href="/auctions" className="hover:text-neonGreen transition-colors">Auctions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="flex items-center gap-2">
                <MapPin className="text-neonGreen" size={16} />
                <span>Bamenda, Cameroon</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="text-neonGreen" size={16} />
                <span>+237 XXX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="text-neonGreen" size={16} />
                <span>hello@prolist.cm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-blue-200">
          <p>&copy; 2024 ProList. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-neonGreen transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neonGreen transition-colors">Terms of Service</a>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-neonBlue transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-neonBlue transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-neonBlue transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
