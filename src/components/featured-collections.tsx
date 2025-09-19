'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts } from '@/data/products';

export function FeaturedCollections() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-soft-white/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
            Featured <span className="text-sage italic">Collections</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Discover our most beloved pieces, each carefully crafted to bring nature&apos;s beauty to your jewelry collection.
            These handpicked treasures represent the essence of our bohemian aesthetic.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group cursor-pointer bg-background/80 backdrop-blur-sm border-sage/20 hover:border-sage/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                <div className="p-6 space-y-3">
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
                    <h3 className="font-heading text-xl font-medium text-foreground group-hover:text-sage transition-colors duration-200">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="border-sage text-sage hover:bg-sage/10 font-body px-8">
            <Link href="/catalog">
              View All Collections
            </Link>
          </Button>
        </div>

        {/* Collection Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { name: 'Earrings', href: '/catalog?category=earrings', count: '12+', image: 'https://images.unsplash.com/photo-1635767798374-3347517763bb?w=400&h=300&fit=crop' },
            { name: 'Necklaces', href: '/catalog?category=necklaces', count: '8+', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop' },
            { name: 'Bracelets', href: '/catalog?category=bracelets', count: '6+', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop' },
            { name: 'Rings', href: '/catalog?category=rings', count: '10+', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=300&fit=crop' }
          ].map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-sage/20 to-terra/20 hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-2">
                <h3 className="font-heading text-lg md:text-xl font-medium text-soft-white">
                  {category.name}
                </h3>
                <p className="font-body text-sm text-soft-white/80">
                  {category.count} pieces
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}