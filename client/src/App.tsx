import { useState } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auctions as initialAuctions } from "./data/demoData";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Verification from './pages/Verification';
import Homepage from './pages/Homepage';
import Markets from "./pages/Markets";
import MarketDetails from "./pages/MarketDetails";
import Listings from "./pages/Listings";
import RealEstate from "./pages/RealEstate";
import Auctions from "./pages/Auctions";
import Profile from "./pages/Profile";
import NewListing from "./pages/NewListing";
import Investments from "./pages/Investments";
import Stocks from "./pages/Stocks";
import VerifiedDirectory from "./pages/VerifiedDirectory";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";
import VendorRegistration from "./pages/VendorRegistration";
import VendorRegister from "./pages/VendorRegister";
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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/apply-verification" component={Verification} />
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
      <Route path="/investments" component={Investments} />
      <Route path="/stocks" component={Stocks} />
      <Route path="/verified" component={VerifiedDirectory} />
      <Route path="/settings" component={Settings} />
      <Route path="/help" component={HelpSupport} />
      <Route path="/vendor/register" component={VendorRegistration} />
      <Route path="/vendor-register" component={VendorRegister} />
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
  
  // Simulate current user session
  const userSession = {
    username: "gamer_pro_bda", // This matches one of the highest bidders
    role: "user" // Change to "admin" to test admin features
  };

  const incrementVendorSales = (vendorId: string) => {
    console.log(`Incrementing sales for vendor: ${vendorId}`);
    // In a real app, this would make an API call to update vendor stats
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-grayLight">
          <div className="flex flex-col">
            <Navbar />
            <main className="flex-1 p-4 lg:p-6">
              <Router />
            </main>
            <Footer />
          </div>
          <AuctionPostProcess
            auctions={auctions}
            setAuctions={setAuctions}
            userSession={userSession}
            incrementVendorSales={incrementVendorSales}
          />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
