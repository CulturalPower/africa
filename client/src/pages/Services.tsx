import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Sparkles } from "lucide-react";
import type { Service, ServiceCategory } from "@shared/schema";

export default function Services() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string>("all");

  const { data: categories } = useQuery<ServiceCategory[]>({
    queryKey: ["/api/service-categories"],
  });

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services", { categoryId: categoryId !== "all" ? categoryId : undefined }],
  });

  const filteredServices = services?.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase()) ||
    service.shortDescription?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20" data-testid="page-services">
      <div className="bg-card/50 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              200+ Healing Services
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Our Services
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive traditional African healing services for all aspects
              of life. From love restoration to financial blessings, protection
              to ancestral connection.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                data-testid="input-search-services"
              />
            </div>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-category">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-5 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredServices?.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No services found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategoryId("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredServices?.length} services
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices?.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
