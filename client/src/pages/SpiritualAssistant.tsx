import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { apiRequest } from "@/lib/queryClient";
import { MessageCircle, Send, Sparkles, Loader2, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function SpiritualAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Greetings, seeker. I am here to provide spiritual guidance based on African traditional wisdom. What troubles your heart or mind today? Ask me about love, finances, protection, health, ancestors, or any spiritual matter.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("/api/ai/spiritual-chat", {
        method: "POST",
        body: JSON.stringify({
          message,
          history: messages,
        }),
      });
      return response.reply;
    },
    onSuccess: (reply) => {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    },
  });

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    chatMutation.mutate(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen pt-20" data-testid="page-spiritual-assistant">
      <div className="bg-card/50 py-8 border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-2">
              <MessageCircle className="h-3 w-3 mr-1" />
              AI Spiritual Assistant
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
              Spiritual Guidance Chat
            </h1>
            <p className="text-sm text-muted-foreground">
              Get instant answers to your spiritual questions
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="h-[60vh] flex flex-col">
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback
                        className={
                          message.role === "assistant"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }
                      >
                        {message.role === "assistant" ? (
                          <Sparkles className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                      data-testid={`message-${message.role}-${index}`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}

                {chatMutation.isPending && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about love, finances, protection, ancestors..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={chatMutation.isPending}
                  data-testid="input-chat-message"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || chatMutation.isPending}
                  size="icon"
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                For personalized healing, book a consultation with our healer
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
