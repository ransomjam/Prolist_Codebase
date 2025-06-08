import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auctions as initialAuctions } from "./data/demoData";
import { useAuth } from "./hooks/useAuth";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import BottomNavigation from './components/BottomNavigation';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Homepage from './pages/Homepage';
import Markets from "./pages/Markets";
import MarketDetails from "./pages/MarketDetails";
import Listings from "./pages/Listings";
import RealEstate from "./pages/RealEstate";
import Auctions from "./pages/Auctions";
import Profile from "./pages/Profile";
import NewListing from "./pages/NewListing";

import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";
import VendorRegistration from "./pages/VendorRegistration";

import AdminPanel from "./pages/AdminPanel";
import AdminVerifyPanel from "./pages/AdminVerifyPanel";
import ProductListingForm from "./pages/ProductListingForm";
import ProductFeed from "./pages/ProductFeed";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed";
import BuyerOrders from "./pages/BuyerOrders";
import VendorOrders from "./pages/VendorOrders";
import AdminEscrowPanel from "./pages/AdminEscrowPanel";
import Marketplace from "./pages/Marketplace";
import AuctionDetail from "./pages/AuctionDetail";
import AuctionPostProcess from "./components/AuctionPostProcess";
import ProfessionalServices from "./pages/ProfessionalServices";
import ServiceCategoryProfessionals from "./pages/ServiceCategoryProfessionals";
import ServiceListings from "./pages/ServiceListings";
import ServiceCheckout from "./pages/ServiceCheckout";
import ServiceOrderConfirmed from "./pages/ServiceOrderConfirmed";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import MarketsOverview from "./pages/MarketsOverview";
import MarketGroupDetail from "./pages/MarketGroupDetail";
import AccountVerification from "./pages/AccountVerification";
import VerificationDashboard from "./pages/VerificationDashboard";

import ShopProfile from "./pages/ShopProfile";
import MarketLine from "./pages/MarketLine";
import About from "./pages/About";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/apply-verification" component={Signup} />
      <Route path="/app" component={Homepage} />
      <Route path="/markets" component={MarketsOverview} />
      <Route path="/markets/:groupId" component={MarketGroupDetail} />
      <Route path="/markets/:groupId/:marketId" component={MarketDetails} />
      <Route path="/markets/:marketId/lines/:lineId" component={MarketLine} />
      <Route path="/shop-profile/:shopId" component={ShopProfile} />
      <Route path="/listings" component={ProductFeed} />
      <Route path="/real-estate" component={RealEstate} />
      <Route path="/realestate" component={RealEstate} />
      <Route path="/auctions" component={Auctions} />
      <Route path="/profile" component={Profile} />
      <Route path="/new-listing" component={NewListing} />

      <Route path="/settings" component={Settings} />
      <Route path="/help" component={HelpSupport} />
      <Route path="/about" component={About} />
      <Route path="/vendor/register" component={VendorRegistration} />

      <Route path="/admin" component={AdminPanel} />
      <Route path="/admin-verify" component={AdminVerifyPanel} />
      <Route path="/add-listing" component={ProductListingForm} />
      <Route path="/product-listing" component={ProductListingForm} />
      <Route path="/products" component={ProductFeed} />
      <Route path="/productfeed" component={ProductFeed} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/checkout/:id" component={Checkout} />
      <Route path="/order-confirmed/:id" component={OrderConfirmed} />
      <Route path="/buyer-orders" component={BuyerOrders} />
      <Route path="/vendor-orders" component={VendorOrders} />
      <Route path="/admin-escrow" component={AdminEscrowPanel} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/auction/:id" component={AuctionDetail} />
      <Route path="/professional-services" component={ProfessionalServices} />
      <Route path="/services" component={ProfessionalServices} />
      <Route path="/services/:categoryId" component={ServiceCategoryProfessionals} />
      <Route path="/service-listings" component={ServiceListings} />
      <Route path="/service-checkout/:professionalId" component={ServiceCheckout} />
      <Route path="/service-order-confirmed/:orderId" component={ServiceOrderConfirmed} />
      <Route path="/professional-profile/:username" component={ProfessionalProfile} />
      <Route path="/professional/:id" component={ProfessionalProfile} />
      <Route path="/account-verification" component={AccountVerification} />
      <Route path="/verification-dashboard" component={VerificationDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [auctions, setAuctions] = useState(initialAuctions);
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
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
        <div className="min-h-screen bg-grayLight pb-16">
          <div className="flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
          </div>
          <BottomNavigation />
          {isAuthenticated && (
            <AuctionPostProcess
              auctions={auctions}
              setAuctions={setAuctions}
              userSession={userSession}
              incrementVendorSales={incrementVendorSales}
            />
          )}
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
