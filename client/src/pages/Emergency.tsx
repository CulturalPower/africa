import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  AlertTriangle,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Zap,
  Heart,
} from "lucide-react";

export default function Emergency() {
  const emergencySituations = [
    "Sudden spiritual attacks or possession",
    "Unexplained illness that doctors can't diagnose",
    "Immediate threat from black magic or curses",
    "Urgent protection needed before an important event",
    "Severe nightmares and spiritual disturbances",
    "Relationship in immediate crisis",
    "Business facing sudden unexplained failure",
    "Protection from enemies plotting against you",
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="page-emergency">
      <div className="bg-destructive/10 py-16 border-b border-destructive/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="destructive" className="mb-4 animate-pulse-emergency">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Emergency Spiritual Help
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              24/7 Emergency Intervention
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              When you face urgent spiritual emergencies that cannot wait, we're
              here for you. Immediate intervention available around the clock.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-destructive/20 bg-destructive/5 mb-8">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold mb-2">
              Need Immediate Help?
            </h2>
            <p className="text-muted-foreground mb-6">
              Don't wait when facing spiritual emergencies. Contact us now for
              immediate intervention.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+27631192337">
                <Button
                  size="lg"
                  variant="destructive"
                  className="gap-2 w-full sm:w-auto"
                  data-testid="button-emergency-call"
                >
                  <Phone className="h-5 w-5" />
                  Call Now: +27 63 119 2337
                </Button>
              </a>
              <a
                href="https://wa.me/27631192337?text=URGENT:%20I%20need%20emergency%20spiritual%20help"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="gap-2 bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                  data-testid="button-emergency-whatsapp"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Now
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Emergency consultation fee: <strong>R800</strong>
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Available 24/7</h3>
              <p className="text-sm text-muted-foreground">
                Day or night, weekday or weekend - we respond to emergencies
                immediately.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Rapid Response</h3>
              <p className="text-sm text-muted-foreground">
                Begin spiritual intervention within minutes of your call.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Powerful Protection</h3>
              <p className="text-sm text-muted-foreground">
                Strong ancestral intervention for immediate relief and
                protection.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive" />
              When to Seek Emergency Help
            </h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {emergencySituations.map((situation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {situation}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Not an Emergency?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If your situation is not urgent, consider booking a regular
              consultation to save on the emergency fee and receive thorough
              attention.
            </p>
            <Link href="/booking">
              <Button variant="outline">Book Regular Consultation - R350</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
