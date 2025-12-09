import { useQuery } from "@tanstack/react-query";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import {
  Sparkles,
  Brain,
  Moon,
  Shield,
  MessageCircle,
  ArrowRight,
  Phone,
  Clock,
  Star,
  Users,
} from "lucide-react";
import type { Service, Product, Testimonial } from "@shared/schema";

export default function Home() {
  const { data: services, isLoading: loadingServices } = useQuery<Service[]>({
    queryKey: ["/api/services", { featured: true, limit: 6 }],
  });

  const { data: products, isLoading: loadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true, limit: 4 }],
  });

  const { data: testimonials, isLoading: loadingTestimonials } = useQuery<
    Testimonial[]
  >({
    queryKey: ["/api/testimonials", { featured: true, limit: 4 }],
  });

  const aiTools = [
    {
      icon: Brain,
      title: "AI Spiritual Assistant",
      description: "Get instant spiritual guidance powered by ancestral wisdom",
      href: "/ai-tools/assistant",
      color: "text-primary",
    },
    {
      icon: Moon,
      title: "Dream Interpreter",
      description: "Decode the messages from your dreams and ancestors",
      href: "/ai-tools/dreams",
      color: "text-purple-400",
    },
    {
      icon: Shield,
      title: "Bad Luck Detector",
      description: "Identify negative energies affecting your life",
      href: "/ai-tools/bad-luck",
      color: "text-red-400",
    },
    {
      icon: Sparkles,
      title: "Protection Scanner",
      description: "Assess your spiritual protection level",
      href: "/ai-tools/protection",
      color: "text-green-400",
    },
  ];

  const stats = [
    { value: "500+", label: "Clients Helped", icon: Users },
    { value: "200+", label: "Services Offered", icon: Star },
    { value: "24/7", label: "Support Available", icon: Clock },
    { value: "15+", label: "Years Experience", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen" data-testid="page-home">
      <Hero />

      <section className="py-16 bg-card/50" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-gold-gradient">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Our Healing Services
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Traditional African Healing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Authentic spiritual services rooted in ancestral wisdom. Each
              treatment is personalized to address your unique needs and
              circumstances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {loadingServices
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))
              : services?.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
          </div>

          <div className="text-center">
            <Link href="/services" data-testid="link-view-all-services">
              <Button variant="outline" size="lg" className="gap-2">
                View All 200+ Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50" data-testid="section-ai-tools">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered Tools
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Free Spiritual Analysis
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use our AI-powered tools to gain insight into your spiritual
              condition. Get personalized guidance based on ancestral wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="h-full hover-elevate cursor-pointer transition-transform hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <tool.icon className={`h-12 w-12 mx-auto mb-4 ${tool.color}`} />
                    <h3 className="font-semibold mb-2">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="section-products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Spiritual Shop
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Sacred Items & Remedies
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Authentic spiritual products to support your healing journey.
              Herbs, amulets, oils, and sacred items prepared with care.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {loadingProducts
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i}>
                    <div className="aspect-square">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <CardContent className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-5 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              : products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <div className="text-center">
            <Link href="/shop" data-testid="link-view-all-products">
              <Button variant="outline" size="lg" className="gap-2">
                Visit Shop
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              Success Stories
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from people whose lives have been transformed through
              our traditional healing services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {loadingTestimonials
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              : testimonials?.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
          </div>

          <div className="text-center">
            <Link href="/success-stories" data-testid="link-view-all-stories">
              <Button variant="outline" size="lg" className="gap-2">
                Read All Success Stories
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step towards spiritual healing and life
            transformation. Book your consultation today or contact us for
            immediate assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" data-testid="cta-book-consultation">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Book Consultation - From R350
              </Button>
            </Link>
            <a
              href="https://wa.me/27631192337"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-whatsapp"
            >
              <Button variant="outline" size="lg" className="gap-2">
                <MessageCircle className="h-5 w-5 text-green-500" />
                WhatsApp Us
              </Button>
            </a>
            <a href="tel:+27631192337" data-testid="cta-call">
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
