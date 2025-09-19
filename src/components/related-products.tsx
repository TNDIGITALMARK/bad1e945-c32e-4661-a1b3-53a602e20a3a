'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { products } from '@/data/products';

interface RelatedProductsProps {
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  // Get related products - same category, excluding current product
  const relatedProducts = products
    .filter(product =>
      product.category === currentProduct.category &&
      product.id !== currentProduct.id
    )
    .slice(0, 4);

  // If not enough products in same category, fill with other products
  if (relatedProducts.length < 4) {
    const additionalProducts = products
      .filter(product =>
        product.category !== currentProduct.category &&
        product.id !== currentProduct.id
      )
      .slice(0, 4 - relatedProducts.length);

    relatedProducts.push(...additionalProducts);
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground">
          You Might Also <span className="text-sage italic">Like</span>
        </h2>
        <Button asChild variant="outline" className="border-sage text-sage hover:bg-sage/10">
          <Link href={`/catalog?category=${currentProduct.category}`}>
            View All {currentProduct.category}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="group cursor-pointer bg-background/80 backdrop-blur-sm border-sage/20 hover:border-sage/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </Link>

                {/* Overlay Badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  {product.isOnSale && (
                    <Badge className="bg-terra text-soft-white font-body text-xs">
                      Sale
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge variant="outline" className="bg-soft-white/90 border-sage text-sage font-body text-xs">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Overlay Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-soft-white/90 hover:bg-soft-white">
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>

                {/* Quick Shop Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button asChild size="sm" className="bg-sage hover:bg-sage/90 text-soft-white">
                    <Link href={`/product/${product.id}`}>
                      Quick View
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs font-body text-muted-foreground border-muted">
                    {product.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-current text-terra" />
                    <span className="text-xs font-body text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="font-heading text-base font-medium text-foreground group-hover:text-sage transition-colors duration-200 line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Materials */}
                <div className="flex flex-wrap gap-1">
                  {product.materials.slice(0, 2).map((material) => (
                    <span
                      key={material}
                      className="font-body text-xs bg-sand/30 text-warm-gray px-2 py-1 rounded-full"
                    >
                      {material}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    {product.originalPrice && (
                      <span className="font-body text-xs text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span className="font-heading text-base font-medium text-foreground">
                      ${product.price}
                    </span>
                  </div>

                  {product.inStock ? (
                    <span className="font-body text-xs text-sage">In Stock</span>
                  ) : (
                    <span className="font-body text-xs text-terra">Sold Out</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-8">
        <Button asChild variant="outline" className="border-sage text-sage hover:bg-sage/10">
          <Link href="/catalog">
            Explore All Collections
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}