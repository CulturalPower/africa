import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, Sparkles, Star, Shield, Heart, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 african-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-energy-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-energy-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <Clock className="h-3 w-3 mr-1" />
            24/7 Support
          </Badge>
          <Badge variant="outline" className="border-primary/30 text-primary">
            <Star className="h-3 w-3 mr-1" />
            500+ Clients Helped
          </Badge>
          <Badge variant="outline" className="border-primary/30 text-primary">
            <Shield className="h-3 w-3 mr-1" />
            Authentic Traditional Healing
          </Badge>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
          <span className="text-gold-gradient">Unlock Your</span>
          <br />
          <span className="text-foreground">Spiritual Power</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Connect with ancestral wisdom through authentic African traditional healing.
          Love restoration, financial blessings, protection, and spiritual guidance
          from an experienced healer.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/booking" data-testid="hero-book-consultation">
            <Button size="lg" className="gap-2 text-lg px-8">
              <Sparkles className="h-5 w-5" />
              Book Consultation - From R350
            </Button>
          </Link>
          <Link href="/services" data-testid="hero-view-services">
            <Button variant="outline" size="lg" className="gap-2 text-lg px-8">
              View 200+ Services
            </Button>
          </Link>
          <Link href="/emergency" data-testid="hero-emergency">
            <Button
              variant="destructive"
              size="lg"
              className="gap-2 animate-pulse-emergency"
            >
              <Phone className="h-5 w-5" />
              Emergency - R800
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
          <div className="text-center">
            <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Love Healing</p>
            <p className="text-xs text-muted-foreground">Restore relationships</p>
          </div>
          <div className="text-center">
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Financial Luck</p>
            <p className="text-xs text-muted-foreground">Attract prosperity</p>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Protection</p>
            <p className="text-xs text-muted-foreground">Shield from evil</p>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Ancestral Connection</p>
            <p className="text-xs text-muted-foreground">Spirit guidance</p>
          </div>
        </div>

        <div className="animate-float">
          <ChevronDown className="h-8 w-8 mx-auto text-primary/50" />
        </div>
      </div>
    </section>
  );
}
