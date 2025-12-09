import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, Zap, ArrowLeft, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

const symptoms = [
  { id: "financial", label: "Unexpected financial losses" },
  { id: "relationships", label: "Relationship problems" },
  { id: "health", label: "Unexplained health issues" },
  { id: "sleep", label: "Nightmares or sleep problems" },
  { id: "accidents", label: "Frequent accidents or mishaps" },
  { id: "blocked", label: "Feeling blocked in life" },
  { id: "energy", label: "Constant fatigue or low energy" },
  { id: "conflict", label: "Unusual conflicts with others" },
  { id: "technology", label: "Electronics breaking frequently" },
  { id: "animals", label: "Strange animal encounters" },
];

interface AnalysisResult {
  riskLevel: "low" | "medium" | "high" | "critical";
  score: number;
  findings: string[];
  recommendations: string[];
  protectiveActions: string[];
}

export default function BadLuckDetector() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (data: { symptoms: string[]; details: string }) => {
      const response = await apiRequest("POST", "/api/ai/bad-luck-detector", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length === 0) return;
    analyzeMutation.mutate({
      symptoms: selectedSymptoms,
      details: additionalDetails,
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-orange-500";
      case "critical":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getRiskProgress = (level: string) => {
    switch (level) {
      case "low":
        return 25;
      case "medium":
        return 50;
      case "high":
        return 75;
      case "critical":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-destructive/20 to-background py-16">
        <div className="container mx-auto px-4">
          <Link href="/ai-tools">
            <Button variant="ghost" className="mb-4" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to AI Tools
            </Button>
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-badluck-title">
              Bad Luck Detector
            </h1>
            <p className="text-xl text-muted-foreground">
              Analyze patterns in your life to detect negative spiritual influences.
              Our AI examines your symptoms and provides spiritual guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {!result ? (
          <Card>
            <CardHeader>
              <CardTitle>Symptom Analysis</CardTitle>
              <CardDescription>
                Select the symptoms you have been experiencing. The more information you provide,
                the more accurate the analysis will be.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Select symptoms you are experiencing:
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {symptoms.map((symptom) => (
                    <div
                      key={symptom.id}
                      className="flex items-center space-x-3 p-3 rounded-md border hover-elevate cursor-pointer"
                      onClick={() => toggleSymptom(symptom.id)}
                      data-testid={`checkbox-symptom-${symptom.id}`}
                    >
                      <Checkbox
                        id={symptom.id}
                        checked={selectedSymptoms.includes(symptom.id)}
                        onCheckedChange={() => toggleSymptom(symptom.id)}
                      />
                      <Label htmlFor={symptom.id} className="cursor-pointer flex-1">
                        {symptom.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="details" className="text-base font-semibold">
                  Additional details (optional)
                </Label>
                <Textarea
                  id="details"
                  placeholder="Describe any specific incidents or patterns you have noticed..."
                  className="mt-2"
                  rows={4}
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  data-testid="input-details"
                />
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                disabled={selectedSymptoms.length === 0 || analyzeMutation.isPending}
                data-testid="button-analyze"
              >
                {analyzeMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Analyze My Situation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className={`h-6 w-6 ${getRiskColor(result.riskLevel)}`} />
                  Risk Level: <span className={getRiskColor(result.riskLevel)}>{result.riskLevel.toUpperCase()}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={getRiskProgress(result.riskLevel)} className="h-3 mb-4" />
                <p className="text-muted-foreground">
                  Based on your symptoms, we have assessed your spiritual risk level.
                  A score of {result.score}/100 indicates the severity of potential negative influences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.findings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-1" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Protective Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.protectiveActions.map((action, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-green-500 shrink-0 mt-1" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setResult(null)}
                data-testid="button-new-analysis"
              >
                New Analysis
              </Button>
              <Link href="/booking" className="flex-1">
                <Button className="w-full" data-testid="button-book-consultation">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
