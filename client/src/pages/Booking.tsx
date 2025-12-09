import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";
import {
  Sparkles,
  Phone,
  MessageCircle,
  Calendar as CalendarIcon,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import type { Service, ConsultationPricing } from "@shared/schema";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  whatsapp: z.string().optional(),
  serviceId: z.string().optional(),
  consultationType: z.string().min(1, "Please select a consultation type"),
  scheduledDate: z.date({ required_error: "Please select a date" }),
  specialNotes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const consultationTypes = [
  {
    slug: "normal",
    name: "Normal Consultation",
    price: "R350",
    description: "Standard spiritual consultation and guidance",
  },
  {
    slug: "deep",
    name: "Deep Consultation",
    price: "R500",
    description: "In-depth analysis with ancestral communication",
  },
  {
    slug: "emergency",
    name: "Emergency Consultation",
    price: "R800",
    description: "Urgent spiritual intervention (24/7 available)",
  },
  {
    slug: "home-visit",
    name: "Home Visit",
    price: "R1,500",
    description: "Personal visit for home cleansing and rituals",
  },
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      serviceId: "",
      consultationType: "",
      specialNotes: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      return apiRequest("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          serviceId: data.serviceId ? parseInt(data.serviceId) : null,
          scheduledDate: data.scheduledDate.toISOString(),
        }),
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Booking Submitted!",
        description: "We'll contact you shortly to confirm your appointment.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  const selectedType = consultationTypes.find(
    (t) => t.slug === form.watch("consultationType")
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" data-testid="booking-success">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your consultation request has been submitted successfully. We'll
              contact you via WhatsApp or phone within 24 hours to confirm your
              appointment.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://wa.me/27631192337"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </Button>
              </a>
              <a href="tel:+27631192337">
                <Button variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call Us
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" data-testid="page-booking">
      <div className="bg-card/50 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <CalendarIcon className="h-3 w-3 mr-1" />
              Book Your Session
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Schedule a Consultation
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take the first step towards spiritual healing. Fill in your
              details and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    s === step
                      ? "bg-primary text-primary-foreground"
                      : s < step
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <CheckCircle className="h-4 w-4" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      s < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <Card data-testid="booking-step-1">
                <CardHeader>
                  <CardTitle>Select Consultation Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="consultationType"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {consultationTypes.map((type) => (
                            <div
                              key={type.slug}
                              onClick={() => field.onChange(type.slug)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                field.value === type.slug
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              data-testid={`consultation-type-${type.slug}`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{type.name}</h4>
                                <Badge variant="secondary">{type.price}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {type.description}
                              </p>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specific Service (Optional)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-service">
                              <SelectValue placeholder="Select a service or leave blank for general consultation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services?.map((service) => (
                              <SelectItem
                                key={service.id}
                                value={service.id.toString()}
                              >
                                {service.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!form.watch("consultationType")}
                      className="gap-2"
                      data-testid="button-next-step-1"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card data-testid="booking-step-2">
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+27..."
                              {...field}
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number (if different)</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Leave blank if same as phone"
                            {...field}
                            data-testid="input-whatsapp"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={
                        !form.watch("name") ||
                        !form.watch("email") ||
                        !form.watch("phone")
                      }
                      className="gap-2"
                      data-testid="button-next-step-2"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card data-testid="booking-step-3">
                <CardHeader>
                  <CardTitle>Select Date & Finalize</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="scheduledDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Date</FormLabel>
                        <div className="flex justify-center">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() ||
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            className="rounded-md border"
                            data-testid="calendar-date"
                          />
                        </div>
                        {field.value && (
                          <p className="text-center text-sm text-muted-foreground">
                            Selected: {format(field.value, "PPPP")}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Special Notes or Problems to Address
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your situation or what you need help with..."
                            className="min-h-[100px]"
                            {...field}
                            data-testid="textarea-notes"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedType && (
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Booking Summary</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span>{selectedType.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Price:</span>
                            <span className="text-primary font-semibold">
                              {selectedType.price}
                            </span>
                          </div>
                          {form.watch("scheduledDate") && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Date:</span>
                              <span>
                                {format(form.watch("scheduledDate"), "PPP")}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        !form.watch("scheduledDate") ||
                        bookingMutation.isPending
                      }
                      className="gap-2"
                      data-testid="button-submit-booking"
                    >
                      {bookingMutation.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Confirm Booking
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
