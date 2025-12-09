import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Sparkles, Shield, Moon, Leaf, Star } from "lucide-react";
import type { EncyclopediaEntry } from "@shared/schema";

const categories = [
  { id: "all", name: "All Entries", icon: BookOpen },
  { id: "symbols", name: "Symbols", icon: Star },
  { id: "rituals", name: "Rituals", icon: Sparkles },
  { id: "herbs", name: "Herbs & Plants", icon: Leaf },
  { id: "spirits", name: "Spirits & Ancestors", icon: Moon },
  { id: "protection", name: "Protection", icon: Shield },
];

export default function Encyclopedia() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: entries = [], isLoading } = useQuery<EncyclopediaEntry[]>({
    queryKey: ["/api/encyclopedia"],
  });

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || entry.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/20 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-encyclopedia-title">
              Cultural Encyclopedia
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore the rich traditions, symbols, and spiritual practices of African healing.
              Learn about the ancient wisdom that has been passed down through generations.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search entries..."
                className="pl-10 bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-encyclopedia-search"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="flex flex-wrap gap-2 h-auto mb-8 bg-transparent">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                data-testid={`tab-category-${cat.id}`}
              >
                <cat.icon className="h-4 w-4 mr-2" />
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory}>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded" />
                        <div className="h-4 bg-muted rounded w-5/6" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No entries found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntries.map((entry) => (
                  <Link key={entry.id} href={`/encyclopedia/${entry.slug}`}>
                    <Card
                      className="hover-elevate cursor-pointer h-full"
                      data-testid={`card-encyclopedia-${entry.id}`}
                    >
                      {entry.imageUrl && (
                        <div className="aspect-video overflow-hidden rounded-t-md">
                          <img
                            src={entry.imageUrl}
                            alt={entry.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg">{entry.title}</CardTitle>
                          <Badge variant="secondary" className="shrink-0">
                            {entry.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {entry.content?.substring(0, 150)}...
                        </p>
                        {entry.symbolMeaning && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-xs text-muted-foreground font-medium mb-1">
                              Symbolic Meaning
                            </p>
                            <p className="text-sm line-clamp-2">{entry.symbolMeaning}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
