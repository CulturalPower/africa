import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, Loader2 } from "lucide-react";
import type { BlogPost as BlogPostType } from "@shared/schema";
import { format } from "date-fns";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading } = useQuery<BlogPostType>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  const { data: relatedPosts = [] } = useQuery<BlogPostType[]>({
    queryKey: ["/api/blog/related", post?.category],
    enabled: !!post?.category,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Link href="/blog">
          <Button>View All Articles</Button>
        </Link>
      </div>
    );
  }

  const tags = (post.tags as string[]) || [];

  return (
    <div className="min-h-screen bg-background">
      {post.imageUrl && (
        <div className="relative h-64 md:h-96">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-4" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            {post.category && (
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-blog-title">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              {post.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
                </div>
              )}
              {post.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Cultural Powers</span>
              </div>
            </div>
          </div>

          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-8 border-l-4 border-primary pl-4">
              {post.excerpt}
            </p>
          )}

          <article className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
          </article>

          {tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Need Spiritual Guidance?</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with a traditional healer for personalized consultation and spiritual help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/booking">
                    <Button data-testid="button-book-consultation">Book a Consultation</Button>
                  </Link>
                  <Link href="/ai-tools">
                    <Button variant="outline" data-testid="button-ai-tools">Try AI Tools</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {relatedPosts.filter(p => p.id !== post.id).length > 0 && (
          <div className="max-w-5xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 3)
                .map((related) => (
                  <Link key={related.id} href={`/blog/${related.slug}`}>
                    <Card className="hover-elevate cursor-pointer h-full">
                      {related.imageUrl && (
                        <div className="aspect-video overflow-hidden rounded-t-md">
                          <img
                            src={related.imageUrl}
                            alt={related.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        {related.category && (
                          <Badge variant="secondary" className="mb-2">
                            {related.category}
                          </Badge>
                        )}
                        <h3 className="font-semibold line-clamp-2 mb-2">{related.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
