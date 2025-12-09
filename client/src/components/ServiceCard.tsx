import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const formatPrice = (min: string | null, max: string | null) => {
    if (!min) return "Contact for pricing";
    if (!max || min === max) return `R${parseFloat(min).toLocaleString()}`;
    return `R${parseFloat(min).toLocaleString()} - R${parseFloat(max).toLocaleString()}`;
  };

  return (
    <Card
      className="group hover-elevate overflow-visible transition-transform duration-300 hover:-translate-y-1"
      data-testid={`service-card-${service.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          {service.isFeatured && (
            <Badge variant="secondary" className="text-xs">
              Featured
            </Badge>
          )}
        </div>

        <h3 className="font-serif text-lg font-semibold mb-2 line-clamp-2">
          {service.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {service.shortDescription}
        </p>

        <div className="text-primary font-semibold">
          {formatPrice(service.priceMin, service.priceMax)}
        </div>

        {service.resultsTimeline && (
          <p className="text-xs text-muted-foreground mt-1">
            Results: {service.resultsTimeline}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 gap-2">
        <Link href={`/services/${service.slug}`} className="flex-1">
          <Button variant="outline" className="w-full" data-testid={`button-learn-more-${service.id}`}>
            Learn More
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
        <Link href={`/booking?service=${service.id}`}>
          <Button size="icon" data-testid={`button-book-${service.id}`}>
            <Sparkles className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
