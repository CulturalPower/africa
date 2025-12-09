import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Brain, Moon, Shield, Sparkles, MessageCircle, Star } from "lucide-react";

export default function AITools() {
  const tools = [
    {
      icon: MessageCircle,
      title: "AI Spiritual Assistant",
      description:
        "Get instant spiritual guidance powered by ancestral wisdom. Ask any question about love, finances, protection, or life challenges.",
      href: "/ai-tools/assistant",
      color: "text-primary",
      badge: "Most Popular",
    },
    {
      icon: Moon,
      title: "Dream Interpreter",
      description:
        "Decode the hidden messages from your dreams. Our AI analyzes dream symbols and ancestral communications to reveal their meaning.",
      href: "/ai-tools/dreams",
      color: "text-purple-400",
      badge: "Free",
    },
    {
      icon: Shield,
      title: "Bad Luck Detector",
      description:
        "Identify negative energies and bad luck patterns affecting your life. Get personalized analysis and recommended remedies.",
      href: "/ai-tools/bad-luck",
      color: "text-red-400",
      badge: "Popular",
    },
    {
      icon: Sparkles,
      title: "Protection Scanner",
      description:
        "Assess your current spiritual protection level. Discover vulnerabilities and get recommendations for strengthening your defenses.",
      href: "/ai-tools/protection",
      color: "text-green-400",
      badge: "New",
    },
    {
      icon: Star,
      title: "Ancestral Message Generator",
      description:
        "Receive personalized messages and guidance from your ancestors. Connect with your spiritual heritage and receive their wisdom.",
      href: "/ai-tools/ancestors",
      color: "text-yellow-400",
      badge: "Premium",
    },
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="page-ai-tools">
      <div className="bg-card/50 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered Spiritual Tools
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Free Spiritual Analysis
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use our AI-powered tools to gain insight into your spiritual
              condition. Get personalized guidance based on centuries of
              ancestral wisdom, completely free.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full hover-elevate cursor-pointer transition-transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <tool.icon className={`h-12 w-12 ${tool.color}`} />
                    <Badge variant="secondary">{tool.badge}</Badge>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
