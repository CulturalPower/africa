import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Star, Moon, Sun, ArrowLeft, Loader2, Copy, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const messageTypes = [
  { id: "guidance", label: "General Guidance", description: "Seek wisdom for your life path" },
  { id: "warning", label: "Warning or Alert", description: "Receive protective warnings" },
  { id: "blessing", label: "Blessing", description: "Receive ancestral blessings" },
  { id: "healing", label: "Healing Message", description: "Words of comfort and healing" },
  { id: "prophecy", label: "Prophecy", description: "Glimpses of what lies ahead" },
];

interface AncestralMessage {
  message: string;
  ancestorName: string;
  symbolism: string;
  ritualSuggestion: string;
  affirmation: string;
}

export default function AncestralGenerator() {
  const [messageType, setMessageType] = useState("guidance");
  const [context, setContext] = useState("");
  const [result, setResult] = useState<AncestralMessage | null>(null);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (data: { type: string; context: string }) => {
      const response = await apiRequest("POST", "/api/ai/ancestral-message", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const handleGenerate = () => {
    generateMutation.mutate({
      type: messageType,
      context,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The message has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/20 to-background py-16">
        <div className="container mx-auto px-4">
          <Link href="/ai-tools">
            <Button variant="ghost" className="mb-4" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to AI Tools
            </Button>
          </Link>
          <div className="text-center max-w-3xl mx-auto">
            <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-ancestral-title">
              Ancestral Message Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with the wisdom of your ancestors. Receive messages channeled 
              through AI that reflect traditional African spiritual guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {!result ? (
          <Card>
            <CardHeader>
              <CardTitle>Receive Your Message</CardTitle>
              <CardDescription>
                Select the type of message you seek and provide context about your situation.
                The ancestors will speak through the wisdom of generations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Type of message:
                </Label>
                <Select value={messageType} onValueChange={setMessageType}>
                  <SelectTrigger data-testid="select-message-type">
                    <SelectValue placeholder="Select message type" />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="context" className="text-base font-semibold">
                  Share your situation (optional)
                </Label>
                <Textarea
                  id="context"
                  placeholder="Tell the ancestors about your current life situation, challenges, or questions..."
                  className="mt-2"
                  rows={4}
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  data-testid="input-context"
                />
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleGenerate}
                disabled={generateMutation.isPending}
                data-testid="button-generate"
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Channeling...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Receive Message
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border-primary">
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-primary" />
                  <Moon className="h-6 w-6 text-primary" />
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Message from {result.ancestorName}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <blockquote className="text-lg italic border-l-4 border-primary pl-4 py-2 my-4 text-left">
                  "{result.message}"
                </blockquote>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result.message)}
                  className="mt-2"
                  data-testid="button-copy-message"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Message
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Moon className="h-5 w-5 text-primary" />
                    Symbolism
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{result.symbolism}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Suggested Ritual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{result.ritualSuggestion}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sun className="h-5 w-5 text-primary" />
                  Daily Affirmation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-center">{result.affirmation}</p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setResult(null);
                  generateMutation.mutate({ type: messageType, context });
                }}
                disabled={generateMutation.isPending}
                data-testid="button-regenerate"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Get Another Message
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setResult(null)}
                data-testid="button-new-request"
              >
                New Request
              </Button>
              <Link href="/booking" className="flex-1">
                <Button className="w-full" data-testid="button-book-consultation">
                  Book Ancestral Reading
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
