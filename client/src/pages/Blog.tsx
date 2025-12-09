import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  return (
    <div className="min-h-screen pt-20" data-testid="page-blog">
      <div className="bg-card/50 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <BookOpen className="h-3 w-3 mr-1" />
              Spiritual Insights
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Blog & Articles
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore articles on African traditional healing, spiritual wisdom,
              ancestral connection, and life guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="aspect-video" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts?.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No articles yet</h3>
            <p className="text-muted-foreground">
              Check back soon for spiritual insights and wisdom.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card
                  className="h-full hover-elevate cursor-pointer transition-transform hover:-translate-y-1"
                  data-testid={`blog-card-${post.id}`}
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {post.category && (
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime || 5} min read
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {post.publishedAt
                          ? format(new Date(post.publishedAt), "MMM d, yyyy")
                          : "Draft"}
                      </span>
                      <span className="text-primary text-sm flex items-center gap-1">
                        Read more
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
