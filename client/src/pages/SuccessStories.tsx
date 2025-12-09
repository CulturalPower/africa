import { useQuery } from "@tanstack/react-query";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Heart } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function SuccessStories() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <div className="min-h-screen pt-20" data-testid="page-success-stories">
      <div className="bg-card/50 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              Testimonials
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Success Stories
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from people whose lives have been transformed through
              our traditional healing services. Read about their journeys from
              struggle to success.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : testimonials?.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No stories yet</h3>
            <p className="text-muted-foreground">
              Check back soon for inspiring testimonials.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials?.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
