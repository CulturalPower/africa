import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, Star, Calendar, Loader2 } from "lucide-react";
import type { Service, Testimonial } from "@shared/schema";

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug;

  const { data: service, isLoading } = useQuery<Service>({
    queryKey: ["/api/services", slug],
    enabled: !!slug,
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", { serviceId: service?.id }],
    enabled: !!service?.id,
  });

  const { data: relatedServices = [] } = useQuery<Service[]>({
    queryKey: ["/api/services/related", service?.id],
    enabled: !!service?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
        <Link href="/services">
          <Button>View All Services</Button>
        </Link>
      </div>
    );
  }

  const symptoms = (service.symptoms as string[]) || [];
  const benefits = (service.benefits as string[]) || [];
  const processSteps = (service.processSteps as string[]) || [];
  const faqs = (service.faqs as { question: string; answer: string }[]) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/20 to-background py-8">
        <div className="container mx-auto px-4">
          <Link href="/services">
            <Button variant="ghost" className="mb-4" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {service.imageUrl && (
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-service-title">
                  {service.title}
                </h1>
                {service.isFeatured && (
                  <Badge variant="secondary" className="shrink-0">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground">{service.shortDescription}</p>
            </div>

            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: service.fullDescription || "" }} />
            </div>

            {symptoms.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    Signs You May Need This Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-1" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-1" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {processSteps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>The Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {processSteps.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                          {index + 1}
                        </div>
                        <p className="pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            {faqs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {testimonials.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
                <div className="space-y-4">
                  {testimonials.slice(0, 3).map((testimonial) => (
                    <Card key={testimonial.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            {testimonial.clientName?.charAt(0) || "A"}
                          </div>
                          <div>
                            <p className="font-semibold">{testimonial.clientName}</p>
                            {testimonial.clientLocation && (
                              <p className="text-sm text-muted-foreground">
                                {testimonial.clientLocation}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book This Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(service.priceMin || service.priceMax) && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="text-3xl font-bold text-primary">
                        R{Number(service.priceMin || service.priceMax).toLocaleString()}
                      </p>
                      {service.priceMax && service.priceMin !== service.priceMax && (
                        <p className="text-sm text-muted-foreground">
                          up to R{Number(service.priceMax).toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}

                  {service.resultsTimeline && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Results in: {service.resultsTimeline}</span>
                    </div>
                  )}

                  <Link href={`/booking?service=${service.id}`}>
                    <Button size="lg" className="w-full" data-testid="button-book-service">
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Consultation
                    </Button>
                  </Link>

                  <Link href="/emergency">
                    <Button variant="outline" size="lg" className="w-full" data-testid="button-emergency">
                      Need Urgent Help?
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {relatedServices.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Related Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {relatedServices.slice(0, 5).map((related) => (
                        <Link key={related.id} href={`/services/${related.slug}`}>
                          <div className="p-3 border rounded-md hover-elevate cursor-pointer">
                            <p className="font-medium">{related.title}</p>
                            {related.priceMin && (
                              <p className="text-sm text-primary">
                                From R{Number(related.priceMin).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
