import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const serviceLinks = [
  { href: "/services/love-healing", label: "Love Healing" },
  { href: "/services/financial-luck", label: "Financial Luck" },
  { href: "/services/protection-rituals", label: "Protection Rituals" },
  { href: "/services/ancestral-connection", label: "Ancestral Connection" },
  { href: "/services/cleansing", label: "Spiritual Cleansing" },
  { href: "/services/family-harmony", label: "Family Harmony" },
];

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/encyclopedia", label: "Cultural Encyclopedia" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "You'll receive spiritual guidance and updates.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-card african-pattern border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="font-serif text-xl font-bold text-gold-gradient">
                Cultural Powers
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Authentic African traditional healing services. Connecting you with
              ancestral wisdom for spiritual healing, love restoration, and life
              transformation.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/culturalpowers"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-facebook"
              >
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                </Button>
              </a>
              <a
                href="https://instagram.com/culturalpowers"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-instagram"
              >
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              <a
                href="https://youtube.com/@culturalpowers"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-youtube"
              >
                <Button variant="ghost" size="icon">
                  <Youtube className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    data-testid={`footer-service-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+27631192337" className="hover:text-primary">
                  +27 63 119 2337
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-500" />
                <a
                  href="https://wa.me/27631192337"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  WhatsApp (24/7)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:help@culturalpowers.co.za" className="hover:text-primary">
                  help@culturalpowers.co.za
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>South Africa</span>
              </div>
            </div>

            <h4 className="font-semibold mb-2 text-sm">Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" size="sm" data-testid="button-subscribe">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Cultural Powers. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
