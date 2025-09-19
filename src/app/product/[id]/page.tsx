'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { ProductImageGallery } from '@/components/product-image-gallery';
import { ProductReviews } from '@/components/product-reviews';
import { RelatedProducts } from '@/components/related-products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { getProductById, getReviewsForProduct } from '@/data/products';
import { Product } from '@/types';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      setProduct(foundProduct || null);
      if (foundProduct && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemCount={0} />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-2xl font-medium text-foreground mb-4">Product not found</h1>
          <Button asChild className="bg-sage hover:bg-sage/90 text-soft-white">
            <Link href="/catalog">
              Back to Catalog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const reviews = getReviewsForProduct(product.id);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stockQuantity, prev + change)));
  };

  const handleAddToCart = () => {
    // Cart functionality would be implemented here
    console.log('Adding to cart:', { product, selectedColor, quantity });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={0} />

      {/* Breadcrumb */}
      <div className="border-b border-sage/20 bg-soft-white/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm font-body">
            <Link href="/" className="text-muted-foreground hover:text-sage">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/catalog" className="text-muted-foreground hover:text-sage">
              Collections
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={`/catalog?category=${product.category}`} className="text-muted-foreground hover:text-sage capitalize">
              {product.category}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          asChild
          className="mb-6 text-sage hover:text-sage/80 hover:bg-sage/10"
        >
          <Link href="/catalog">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Collections
          </Link>
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs font-body text-muted-foreground border-muted mb-2">
                {product.category}
              </Badge>
              <h1 className="font-heading text-3xl md:text-4xl font-light text-foreground">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current text-terra'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-body text-muted-foreground ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                {product.featured && (
                  <Badge className="bg-sage/20 text-sage font-body text-xs">
                    Featured
                  </Badge>
                )}
                {product.isOnSale && (
                  <Badge className="bg-terra text-soft-white font-body text-xs">
                    Sale
                  </Badge>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                {product.originalPrice && (
                  <span className="font-body text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="font-heading text-3xl font-medium text-foreground">
                  ${product.price}
                </span>
                {product.isOnSale && (
                  <Badge className="bg-terra/10 text-terra border-terra/20">
                    Save ${product.originalPrice! - product.price}
                  </Badge>
                )}
              </div>
              <p className="font-body text-sm text-muted-foreground">
                {product.inStock
                  ? `In stock (${product.stockQuantity} available)`
                  : 'Out of stock'}
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="font-body text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Materials */}
            <div>
              <h3 className="font-heading text-lg font-medium text-foreground mb-2">
                Materials
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material) => (
                  <span
                    key={material}
                    className="font-body text-sm bg-sand/30 text-warm-gray px-3 py-1 rounded-full"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {product.colors.length > 1 && (
              <div>
                <h3 className="font-heading text-lg font-medium text-foreground mb-3">
                  Color: <span className="font-normal text-sage">{selectedColor}</span>
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md border font-body text-sm transition-colors ${
                        selectedColor === color
                          ? 'border-sage bg-sage/10 text-sage'
                          : 'border-muted-foreground/20 hover:border-sage/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-heading text-lg font-medium text-foreground mb-2">
                    Quantity
                  </h3>
                  <div className="flex items-center border border-sage/20 rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="px-3 rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-body text-sm border-x border-sage/20">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stockQuantity}
                      className="px-3 rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-sage hover:bg-sage/90 text-soft-white font-body py-6 text-base"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Sold Out'}
                </Button>
                <Button variant="outline" size="lg" className="border-sage text-sage hover:bg-sage/10">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="border-sage text-sage hover:bg-sage/10">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-sage/20">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-sage" />
                <div>
                  <p className="font-body text-sm font-medium text-foreground">
                    Free Shipping
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    On orders $75+
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-sage" />
                <div>
                  <p className="font-body text-sm font-medium text-foreground">
                    Lifetime Warranty
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    Craftsmanship guarantee
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-sage" />
                <div>
                  <p className="font-body text-sm font-medium text-foreground">
                    30-Day Returns
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    Easy returns & exchanges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-sage/20 mb-8">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`font-body text-sm font-medium py-4 border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-sage text-sage'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                  {tab === 'reviews' && ` (${product.reviewCount})`}
                </button>
              ))}
            </nav>
          </div>

          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p className="font-body text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-heading text-lg font-medium text-foreground mb-3">
                      Design Story
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      Each piece in our collection is inspired by the organic beauty of nature.
                      This {product.name.toLowerCase()} captures the essence of natural forms through
                      careful craftsmanship and attention to detail, creating a unique piece that
                      tells its own story.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-medium text-foreground mb-3">
                      Care Instructions
                    </h3>
                    <ul className="font-body text-sm text-muted-foreground space-y-1">
                      <li>• Store in provided jewelry pouch</li>
                      <li>• Clean gently with soft cloth</li>
                      <li>• Avoid exposure to chemicals</li>
                      <li>• Remove before swimming or showering</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="font-heading text-lg font-medium text-foreground mb-4">
                  Product Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-sage/10">
                      <span className="font-body text-sm font-medium text-foreground">
                        {key}
                      </span>
                      <span className="font-body text-sm text-muted-foreground">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ProductReviews reviews={reviews} productRating={product.rating} />
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
}