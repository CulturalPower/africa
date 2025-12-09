import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmergencyButton } from "@/components/EmergencyButton";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Shop from "@/pages/Shop";
import About from "@/pages/About";
import Booking from "@/pages/Booking";
import AITools from "@/pages/AITools";
import DreamAnalyzer from "@/pages/DreamAnalyzer";
import SpiritualAssistant from "@/pages/SpiritualAssistant";
import Cart from "@/pages/Cart";
import Blog from "@/pages/Blog";
import SuccessStories from "@/pages/SuccessStories";
import Emergency from "@/pages/Emergency";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/shop" component={Shop} />
      <Route path="/about" component={About} />
      <Route path="/booking" component={Booking} />
      <Route path="/ai-tools" component={AITools} />
      <Route path="/ai-tools/dreams" component={DreamAnalyzer} />
      <Route path="/ai-tools/assistant" component={SpiritualAssistant} />
      <Route path="/cart" component={Cart} />
      <Route path="/blog" component={Blog} />
      <Route path="/success-stories" component={SuccessStories} />
      <Route path="/emergency" component={Emergency} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <EmergencyButton />
          </div>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
