import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, AlertTriangle } from "lucide-react";

interface EmergencyButtonProps {
  variant?: "fixed" | "inline";
}

export function EmergencyButton({ variant = "fixed" }: EmergencyButtonProps) {
  if (variant === "inline") {
    return (
      <Link href="/emergency" data-testid="emergency-button-inline">
        <Button
          variant="destructive"
          size="lg"
          className="gap-2 animate-pulse-emergency"
        >
          <AlertTriangle className="h-5 w-5" />
          Emergency Spiritual Help - R800
          <Phone className="h-5 w-5" />
        </Button>
      </Link>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="emergency-button-fixed">
      <Link href="/emergency">
        <Button
          variant="destructive"
          size="lg"
          className="gap-2 animate-pulse-emergency shadow-lg rounded-full"
        >
          <AlertTriangle className="h-5 w-5" />
          <span className="hidden sm:inline">Emergency Help</span>
          <Phone className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
