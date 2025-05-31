import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/apply-verification" component={Verification} />
      <Route path="/app" component={Homepage} />
      <Route path="/markets" component={Markets} />
      <Route path="/markets/:id" component={MarketDetails} />
      <Route path="/listings" component={Listings} />
      <Route path="/realestate" component={RealEstate} />
      <Route path="/auctions" component={Auctions} />
      <Route path="/profile" component={Profile} />
      <Route path="/new-listing" component={NewListing} />
      <Route path="/investments" component={Investments} />
      <Route path="/stocks" component={Stocks} />
      <Route path="/verified" component={VerifiedDirectory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
