import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { useAuth } from "./hooks/useAuth";
import Navbar from './components/Navbar';
import BottomNavigation from './components/BottomNavigation';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import ProductFeed from "./pages/ProductFeed";
import Auctions from "./pages/Auctions";
import Profile from "./pages/Profile";
import MarketsOverview from "./pages/MarketsOverview";
import MarketGroupDetail from "./pages/MarketGroupDetail";
import MarketDetails from "./pages/MarketDetails";
import RealEstate from "./pages/RealEstate";
import ProfessionalServices from "./pages/ProfessionalServices";
import VendorProfile from "./pages/VendorProfile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/app" component={Homepage} />
      <Route path="/products" component={ProductFeed} />
      <Route path="/auctions" component={Auctions} />  
      <Route path="/profile" component={Profile} />
      <Route path="/markets" component={MarketsOverview} />
      <Route path="/markets/:groupId" component={MarketGroupDetail} />
      <Route path="/markets/:groupId/:marketId" component={MarketDetails} />
      <Route path="/realestate" component={RealEstate} />
      <Route path="/professional-services" component={ProfessionalServices} />
      <Route path="/services" component={ProfessionalServices} />
      <Route path="/shop/:vendorId" component={VendorProfile} />
      <Route component={() => <div className="p-8 text-center"><h1 className="text-2xl font-bold">Page Not Found</h1><p>The page you're looking for doesn't exist.</p></div>} />
    </Switch>
  );
}

// Define Auction interface locally
interface Auction {
  id: number;
  product: {
    title: string;
    description: string;
    image: string;
  };
  vendor: string;
  verified: boolean;
  startingPrice: number;
  currentBid: number;
  endTime: string;
  status?: string;
  highestBidder?: string;
}

function App() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [location] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  // Simulate current user session
  const userSession = {
    username: "gamer_pro_bda", // This matches one of the highest bidders
    role: "user" // Change to "admin" to test admin features
  };

  const incrementVendorSales = (vendorId: string) => {
    console.log(`Incrementing sales for vendor: ${vendorId}`);
    // In a real app, this would make an API call to update vendor stats
  };

  // Define routes that don't need navigation
  const publicRoutes = ['/', '/login', '/signup', '/apply-verification'];
  const isPublicRoute = publicRoutes.includes(location);

  // Show loading state
  if (isLoading) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading ProList...</p>
            </div>
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 pb-16">
          <div className="flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
          </div>
          <BottomNavigation />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;