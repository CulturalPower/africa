import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  const hasDiscount =
    product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price);
  const discountPercent = hasDiscount
    ? Math.round(
        ((parseFloat(product.comparePrice!) - parseFloat(product.price)) /
          parseFloat(product.comparePrice!)) *
          100
      )
    : 0;

  return (
    <Card
      className="group hover-elevate overflow-visible transition-transform duration-300 hover:-translate-y-1"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-square bg-muted rounded-t-lg overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}

        {hasDiscount && (
          <Badge className="absolute top-2 right-2 bg-destructive">
            -{discountPercent}%
          </Badge>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="secondary">Out of Stock</Badge>
          </div>
        )}

        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Link href={`/shop/${product.slug}`}>
            <Button size="sm" variant="secondary" data-testid={`button-view-${product.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </Link>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>

        <div className="flex items-center gap-2">
          <span className="text-primary font-semibold">
            R{parseFloat(product.price).toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-muted-foreground text-sm line-through">
              R{parseFloat(product.comparePrice!).toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
