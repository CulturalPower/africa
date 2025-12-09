import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Truck, Shield, Minus, Plus, Loader2, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const [, params] = useRoute("/shop/:slug");
  const slug = params?.slug;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", slug],
    enabled: !!slug,
  });

  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products/related", product?.categoryId],
    enabled: !!product?.categoryId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop">
          <Button>View All Products</Button>
        </Link>
      </div>
    );
  }

  const images = [product.imageUrl, ...((product.images as string[]) || [])].filter(Boolean);
  const inStock = (product.stock || 0) > 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity,
      imageUrl: product.imageUrl || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/20 to-background py-8">
        <div className="container mx-auto px-4">
          <Link href="/shop">
            <Button variant="ghost" className="mb-4" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 h-20 w-20 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-3xl font-bold" data-testid="text-product-name">
                  {product.name}
                </h1>
                {product.isFeatured && (
                  <Badge variant="secondary" className="shrink-0">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  R{Number(product.price).toLocaleString()}
                </span>
                {product.comparePrice && Number(product.comparePrice) > Number(product.price) && (
                  <span className="text-lg text-muted-foreground line-through">
                    R{Number(product.comparePrice).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p>{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant={inStock ? "default" : "destructive"}>
                {inStock ? `In Stock (${product.stock})` : "Out of Stock"}
              </Badge>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Quantity</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      data-testid="button-decrease-qty"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                      disabled={quantity >= (product.stock || 10)}
                      data-testid="button-increase-qty"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  disabled={!inStock}
                  onClick={handleAddToCart}
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - R{(Number(product.price) * quantity).toLocaleString()}
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-4 border rounded-md">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Delivery</p>
                  <p className="text-xs text-muted-foreground">Nationwide shipping</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 border rounded-md">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Guaranteed</p>
                  <p className="text-xs text-muted-foreground">Authentic products</p>
                </div>
              </div>
            </div>

            {product.deliveryInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Delivery Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{product.deliveryInfo}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map((related) => (
                <Link key={related.id} href={`/shop/${related.slug}`}>
                  <Card className="hover-elevate cursor-pointer h-full">
                    <div className="aspect-square overflow-hidden rounded-t-md">
                      {related.imageUrl ? (
                        <img
                          src={related.imageUrl}
                          alt={related.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="font-medium line-clamp-1">{related.name}</p>
                      <p className="text-primary font-bold">
                        R{Number(related.price).toLocaleString()}
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
