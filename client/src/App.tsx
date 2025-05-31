import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Markets from "./pages/Markets";
import Listings from "./pages/Listings";
import RealEstate from "./pages/RealEstate";
import Auctions from "./pages/Auctions";
import Profile from "./pages/Profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Homepage} />
      <Route path="/markets" component={Markets} />
      <Route path="/listings" component={Listings} />
      <Route path="/realestate" component={RealEstate} />
      <Route path="/auctions" component={Auctions} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex min-h-screen bg-grayLight">
          <Sidebar />
          <div className="flex-1 flex flex-col lg:ml-0">
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
