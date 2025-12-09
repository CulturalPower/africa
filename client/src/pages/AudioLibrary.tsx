import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Volume2, Clock, Music, Heart, Shield, Moon, Sun } from "lucide-react";
import type { AudioTrack } from "@shared/schema";

const categories = [
  { id: "all", name: "All", icon: Music },
  { id: "prayers", name: "Prayers", icon: Heart },
  { id: "protection", name: "Protection", icon: Shield },
  { id: "meditation", name: "Meditation", icon: Moon },
  { id: "healing", name: "Healing", icon: Sun },
];

function formatDuration(seconds: number | null): string {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudioLibrary() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);

  const { data: tracks = [], isLoading } = useQuery<AudioTrack[]>({
    queryKey: ["/api/audio"],
  });

  const filteredTracks = tracks.filter(
    (track) => activeCategory === "all" || track.category === activeCategory
  );

  const handlePlayPause = (trackId: number) => {
    if (playingTrackId === trackId) {
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(trackId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/20 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Volume2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-audio-title">
              Sacred Audio Library
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Listen to traditional prayers, protective chants, healing mantras, 
              and spiritual meditations. These sacred sounds carry the power of our ancestors.
            </p>
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
                data-testid={`tab-audio-${cat.id}`}
              >
                <cat.icon className="h-4 w-4 mr-2" />
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory}>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-muted rounded" />
                        <div className="flex-1 space-y-2">
                          <div className="h-5 bg-muted rounded w-1/3" />
                          <div className="h-4 bg-muted rounded w-1/2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredTracks.length === 0 ? (
              <div className="text-center py-16">
                <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tracks found</h3>
                <p className="text-muted-foreground">
                  Tracks will be available soon for this category.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTracks.map((track) => (
                  <Card
                    key={track.id}
                    className={`transition-all ${
                      playingTrackId === track.id ? "ring-2 ring-primary" : ""
                    }`}
                    data-testid={`card-audio-${track.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          {track.imageUrl ? (
                            <img
                              src={track.imageUrl}
                              alt={track.title}
                              className="h-16 w-16 rounded object-cover"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded bg-primary/20 flex items-center justify-center">
                              <Music className="h-8 w-8 text-primary" />
                            </div>
                          )}
                          {playingTrackId === track.id && (
                            <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center">
                              <div className="flex gap-0.5">
                                {[...Array(4)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-1 bg-primary animate-pulse"
                                    style={{
                                      height: `${12 + Math.random() * 12}px`,
                                      animationDelay: `${i * 0.1}s`,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold truncate">{track.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {track.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {track.isPremium && (
                                <Badge variant="secondary">Premium</Badge>
                              )}
                              <Badge variant="outline">{track.category}</Badge>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {formatDuration(track.duration)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {track.playCount?.toLocaleString() || 0} plays
                            </div>
                          </div>
                        </div>

                        <Button
                          size="icon"
                          variant={playingTrackId === track.id ? "default" : "outline"}
                          onClick={() => handlePlayPause(track.id)}
                          data-testid={`button-play-${track.id}`}
                        >
                          {playingTrackId === track.id ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
