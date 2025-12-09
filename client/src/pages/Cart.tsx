import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" data-testid="cart-empty">
        <Card className="max-w-md mx-4 text-center">
          <CardContent className="p-8">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Explore our collection of sacred items and spiritual remedies.
            </p>
            <Link href="/shop">
              <Button className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Browse Shop
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" data-testid="page-cart">
      <div className="bg-card/50 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <ShoppingCart className="h-3 w-3 mr-1" />
              Shopping Cart
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Your Cart
            </h1>
            <p className="text-muted-foreground">
              Review your items before checkout
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 rounded-lg bg-muted overflow-hidden shrink-0">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <p className="text-primary font-semibold">
                        R{parseFloat(item.price).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          data-testid={`button-decrease-${item.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          data-testid={`button-increase-${item.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              className="w-full"
              onClick={clearCart}
              data-testid="button-clear-cart"
            >
              Clear Cart
            </Button>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">
                      R{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full gap-2" data-testid="button-checkout">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
