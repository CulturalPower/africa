import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, MessageCircle, X, Sparkles, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/ai-tools", label: "AI Spiritual Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/encyclopedia", label: "Encyclopedia" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="font-serif text-xl font-bold text-gold-gradient">
              Cultural Powers
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm ${
                    location === link.href ? "text-primary" : "text-foreground/80"
                  }`}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/27631192337"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
              data-testid="link-whatsapp"
            >
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5 text-green-500" />
              </Button>
            </a>

            <a href="tel:+27631192337" className="hidden sm:flex" data-testid="link-phone">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
            </a>

            <Link href="/cart" data-testid="link-cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/booking" className="hidden sm:flex" data-testid="link-book-consultation">
              <Button size="sm">Book Consultation</Button>
            </Link>

            <Link href="/emergency" data-testid="link-emergency">
              <Button
                size="sm"
                variant="destructive"
                className="animate-pulse-emergency"
              >
                Emergency Help
              </Button>
            </Link>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-lg ${
                          location === link.href ? "text-primary" : ""
                        }`}
                        data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                  <div className="border-t border-border pt-4 mt-4">
                    <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full mb-2">Book Consultation</Button>
                    </Link>
                    <div className="flex gap-2">
                      <a
                        href="https://wa.me/27631192337"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
                          WhatsApp
                        </Button>
                      </a>
                      <a href="tel:+27631192337" className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
