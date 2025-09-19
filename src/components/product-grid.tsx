'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {products.map((product) => (
          <Card key={product.id} className="group cursor-pointer bg-background/80 backdrop-blur-sm border-sage/20 hover:border-sage/40 transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                {/* Product Image */}
                <div className="relative sm:w-80 aspect-square overflow-hidden sm:rounded-l-lg rounded-t-lg sm:rounded-tr-none">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />

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
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0 bg-soft-white/90 hover:bg-soft-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0 bg-soft-white/90 hover:bg-soft-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-body text-muted-foreground border-muted">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current text-terra" />
                      <span className="text-xs font-body text-muted-foreground">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="font-heading text-2xl font-medium text-foreground group-hover:text-sage transition-colors duration-200">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="font-body text-muted-foreground line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Materials */}
                  <div className="flex flex-wrap gap-1">
                    {product.materials.map((material) => (
                      <span
                        key={material}
                        className="font-body text-xs bg-sand/30 text-warm-gray px-2 py-1 rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-sage/20">
                    <div className="flex items-center space-x-2">
                      {product.originalPrice && (
                        <span className="font-body text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="font-heading text-2xl font-medium text-foreground">
                        ${product.price}
                      </span>
                      {product.inStock ? (
                        <span className="font-body text-xs text-sage ml-2">In Stock</span>
                      ) : (
                        <span className="font-body text-xs text-terra ml-2">Sold Out</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm" className="border-sage text-sage hover:bg-sage/10">
                        <Link href={`/product/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button size="sm" className="bg-sage hover:bg-sage/90 text-soft-white">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group cursor-pointer bg-background/80 backdrop-blur-sm border-sage/20 hover:border-sage/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-0">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

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
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                <Button size="sm" variant="secondary" className="w-10 h-10 p-0 bg-soft-white/90 hover:bg-soft-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="w-10 h-10 p-0 bg-soft-white/90 hover:bg-soft-white">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Shop Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button asChild className="bg-sage hover:bg-sage/90 text-soft-white">
                  <Link href={`/product/${product.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs font-body text-muted-foreground border-muted">
                  {product.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-current text-terra" />
                  <span className="text-xs font-body text-muted-foreground">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
              </div>

              <Link href={`/product/${product.id}`} className="block">
                <h3 className="font-heading text-lg font-medium text-foreground group-hover:text-sage transition-colors duration-200">
                  {product.name}
                </h3>
              </Link>

              <p className="font-body text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {product.description}
              </p>

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
                {product.materials.length > 2 && (
                  <span className="font-body text-xs text-muted-foreground">
                    +{product.materials.length - 2} more
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  {product.originalPrice && (
                    <span className="font-body text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="font-heading text-lg font-medium text-foreground">
                    ${product.price}
                  </span>
                </div>

                {product.inStock ? (
                  <span className="font-body text-xs text-sage">In Stock</span>
                ) : (
                  <span className="font-body text-xs text-terra">Sold Out</span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                size="sm"
                className="w-full bg-sage hover:bg-sage/90 text-soft-white mt-3"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}