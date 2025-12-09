import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Sparkles,
  Heart,
  Shield,
  Star,
  Clock,
  Award,
  Users,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "Every client receives genuine care and understanding. Your problems become our mission to solve.",
    },
    {
      icon: Shield,
      title: "Authenticity",
      description:
        "We practice only authentic African traditional healing methods passed down through generations.",
    },
    {
      icon: Star,
      title: "Excellence",
      description:
        "We strive for the highest standards in spiritual work, ensuring effective and lasting results.",
    },
    {
      icon: Clock,
      title: "Availability",
      description:
        "Spiritual emergencies don't wait. We're available 24/7 to help you when you need it most.",
    },
  ];

  const qualifications = [
    "15+ years of traditional healing practice",
    "Trained by renowned ancestral healers",
    "Specialized in love, financial, and protection rituals",
    "Deep connection with ancestral spirits",
    "Extensive knowledge of African herbs and remedies",
    "Member of traditional healers association",
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="page-about">
      <div className="bg-card/50 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              About Cultural Powers
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Your Journey to Healing Starts Here
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connecting you with ancestral wisdom and authentic African
              traditional healing for life transformation.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">
                A Legacy of Healing
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cultural Powers was founded on the principle that everyone
                  deserves access to authentic African traditional healing.
                  Our practice draws from centuries of ancestral wisdom,
                  connecting the spiritual and physical realms to bring about
                  real transformation in people's lives.
                </p>
                <p>
                  With over 15 years of dedicated practice, we have helped
                  hundreds of clients overcome challenges in love, finances,
                  protection, and spiritual well-being. Our methods are rooted
                  in genuine African traditional practices, not modern
                  adaptations.
                </p>
                <p>
                  We believe that every person's situation is unique, which is
                  why we take time to understand your specific circumstances
                  before recommending any treatment. Our goal is not just to
                  solve immediate problems, but to bring lasting positive
                  change to your life.
                </p>
              </div>
            </div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Sparkles className="h-24 w-24 text-primary/50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do in our healing practice.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">
                Qualifications & Experience
              </h2>
              <ul className="space-y-3">
                {qualifications.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gold-gradient">500+</p>
                  <p className="text-sm text-muted-foreground">Clients Helped</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gold-gradient">15+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gold-gradient">200+</p>
                  <p className="text-sm text-muted-foreground">Services Offered</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gold-gradient">24/7</p>
                  <p className="text-sm text-muted-foreground">Support Available</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-muted-foreground mb-8">
            Take the first step towards transformation. Book a consultation or
            contact us for immediate assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" data-testid="about-book-consultation">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Book Consultation
              </Button>
            </Link>
            <a
              href="https://wa.me/27631192337"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="gap-2">
                <MessageCircle className="h-5 w-5 text-green-500" />
                WhatsApp Us
              </Button>
            </a>
            <a href="tel:+27631192337">
              <Button variant="outline" size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
