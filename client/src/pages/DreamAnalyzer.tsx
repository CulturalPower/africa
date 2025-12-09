import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Moon, Sparkles, ArrowRight, Loader2 } from "lucide-react";

export default function DreamAnalyzer() {
  const [dream, setDream] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (dreamText: string) => {
      const response = await apiRequest("/api/ai/dream-analysis", {
        method: "POST",
        body: JSON.stringify({ dream: dreamText }),
      });
      return response.analysis;
    },
    onSuccess: (data) => {
      setAnalysis(data);
    },
  });

  const handleAnalyze = () => {
    if (dream.trim()) {
      analyzeMutation.mutate(dream);
    }
  };

  return (
    <div className="min-h-screen pt-20" data-testid="page-dream-analyzer">
      <div className="bg-card/50 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <Moon className="h-3 w-3 mr-1" />
              AI Dream Interpreter
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Decode Your Dreams
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dreams are messages from your ancestors and the spiritual realm.
              Describe your dream and receive an interpretation based on African
              traditional wisdom.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-purple-400" />
              Describe Your Dream
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe your dream in as much detail as possible. Include symbols, people, places, colors, and how you felt during the dream..."
              className="min-h-[200px]"
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              data-testid="textarea-dream"
            />
            <Button
              onClick={handleAnalyze}
              disabled={!dream.trim() || analyzeMutation.isPending}
              className="w-full gap-2"
              data-testid="button-analyze-dream"
            >
              {analyzeMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Interpreting...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Interpret My Dream
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {analysis && (
          <Card className="mb-8" data-testid="dream-analysis-result">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Dream Interpretation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground whitespace-pre-wrap">{analysis}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Want a deeper analysis with ancestral consultation?
                </p>
                <Link href="/booking?service=dream-interpretation">
                  <Button className="gap-2">
                    Book Full Dream Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">About Dream Interpretation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              In African traditional culture, dreams are considered sacred
              communications from ancestors and the spiritual realm. They can
              warn of danger, reveal hidden truths, or guide important decisions.
              Our AI interpreter draws from centuries of traditional dream
              symbolism to decode your dreams.
            </p>
            <p className="text-sm text-muted-foreground">
              For complex or recurring dreams, we recommend booking a full
              consultation with our healer for personalized guidance and
              ancestral connection.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
