import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Shield, Home, User, Briefcase, Heart, ArrowLeft, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

const protectionAreas = [
  { id: "home", label: "Home & Family", icon: Home, description: "Protection for your living space and loved ones" },
  { id: "personal", label: "Personal Protection", icon: User, description: "Shield yourself from negative energies" },
  { id: "business", label: "Business & Career", icon: Briefcase, description: "Protect your work and financial success" },
  { id: "relationship", label: "Relationships", icon: Heart, description: "Guard your connections with others" },
];

interface ScanResult {
  overallScore: number;
  vulnerabilities: { area: string; severity: string; description: string }[];
  currentProtections: string[];
  recommendedProtections: string[];
  urgentActions: string[];
}

export default function ProtectionScanner() {
  const [selectedArea, setSelectedArea] = useState("personal");
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);

  const scanMutation = useMutation({
    mutationFn: async (data: { area: string; situation: string }) => {
      const response = await apiRequest("POST", "/api/ai/protection-scanner", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const handleScan = () => {
    scanMutation.mutate({
      area: selectedArea,
      situation,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-500/20 text-green-500";
      case "medium":
        return "bg-yellow-500/20 text-yellow-500";
      case "high":
        return "bg-orange-500/20 text-orange-500";
      case "critical":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-green-500/20 to-background py-16">
        <div className="container mx-auto px-4">
          <Link href="/ai-tools">
            <Button variant="ghost" className="mb-4" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to AI Tools
            </Button>
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-protection-title">
              Protection Scanner
            </h1>
            <p className="text-xl text-muted-foreground">
              Analyze your spiritual defenses and discover vulnerabilities.
              Our AI will assess your protection level and recommend strengthening measures.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {!result ? (
          <Card>
            <CardHeader>
              <CardTitle>Protection Analysis</CardTitle>
              <CardDescription>
                Select an area of your life to scan for spiritual vulnerabilities
                and receive personalized protection recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Select area to scan:
                </Label>
                <RadioGroup
                  value={selectedArea}
                  onValueChange={setSelectedArea}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {protectionAreas.map((area) => (
                    <div key={area.id}>
                      <RadioGroupItem
                        value={area.id}
                        id={area.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={area.id}
                        className="flex items-center gap-4 p-4 border rounded-md cursor-pointer hover-elevate peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                        data-testid={`radio-area-${area.id}`}
                      >
                        <area.icon className="h-8 w-8 text-primary shrink-0" />
                        <div>
                          <div className="font-semibold">{area.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {area.description}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="situation" className="text-base font-semibold">
                  Describe your current situation (optional)
                </Label>
                <Textarea
                  id="situation"
                  placeholder="Tell us about any specific concerns, recent events, or feelings you have..."
                  className="mt-2"
                  rows={4}
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  data-testid="input-situation"
                />
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleScan}
                disabled={scanMutation.isPending}
                data-testid="button-scan"
              >
                {scanMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Start Protection Scan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Protection Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-5xl font-bold ${getScoreColor(result.overallScore)}`}>
                    {result.overallScore}%
                  </div>
                  <div className="flex-1">
                    <Progress value={result.overallScore} className="h-4" />
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Your spiritual protection level is{" "}
                  {result.overallScore >= 80
                    ? "strong"
                    : result.overallScore >= 60
                    ? "moderate"
                    : result.overallScore >= 40
                    ? "weak"
                    : "critical"}
                  . See below for detailed analysis and recommendations.
                </p>
              </CardContent>
            </Card>

            {result.vulnerabilities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Vulnerabilities Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.vulnerabilities.map((vuln, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{vuln.area}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(vuln.severity)}`}>
                            {vuln.severity}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{vuln.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {result.currentProtections.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Current Protections Active
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.currentProtections.map((protection, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-green-500 shrink-0 mt-1" />
                        <span>{protection}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Recommended Protections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendedProtections.map((protection, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>{protection}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {result.urgentActions.length > 0 && (
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Urgent Actions Needed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.urgentActions.map((action, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-1" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setResult(null)}
                data-testid="button-new-scan"
              >
                New Scan
              </Button>
              <Link href="/booking" className="flex-1">
                <Button className="w-full" data-testid="button-book-consultation">
                  Book Protection Session
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
