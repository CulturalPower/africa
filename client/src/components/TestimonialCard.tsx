import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card
      className="hover-elevate overflow-visible"
      data-testid={`testimonial-card-${testimonial.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < (testimonial.rating || 5)
                  ? "text-primary fill-primary"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>

        <Quote className="h-8 w-8 text-primary/20 mb-2" />

        <p className="text-foreground mb-4 leading-relaxed">
          {testimonial.content}
        </p>

        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src={testimonial.clientImage || undefined} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {testimonial.clientName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{testimonial.clientName}</p>
            {testimonial.clientLocation && (
              <p className="text-xs text-muted-foreground">
                {testimonial.clientLocation}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
