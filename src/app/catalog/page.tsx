'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/header';
import { ProductGrid } from '@/components/product-grid';
import { ProductFilters } from '@/components/product-filters';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, Grid3X3, LayoutList, X } from 'lucide-react';
import { products } from '@/data/products';
import { Product, FilterOptions, SortBy } from '@/types';

export default function CatalogPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: { min: 0, max: 200 },
    materials: [],
    colors: [],
    inStock: false,
    onSale: false,
  });

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
  ];

  // Apply filters and sorting
  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(product =>
        activeFilters.categories.includes(product.category)
      );
    }

    // Apply material filter
    if (activeFilters.materials.length > 0) {
      filtered = filtered.filter(product =>
        product.materials.some(material =>
          activeFilters.materials.includes(material)
        )
      );
    }

    // Apply color filter
    if (activeFilters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color =>
          activeFilters.colors.includes(color)
        )
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= activeFilters.priceRange.min &&
      product.price <= activeFilters.priceRange.max
    );

    // Apply in stock filter
    if (activeFilters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Apply on sale filter
    if (activeFilters.onSale) {
      filtered = filtered.filter(product => product.isOnSale);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviewCount - a.reviewCount;
        case 'newest':
        default:
          return 0;
      }
    });

    return sorted;
  }, [activeFilters, sortBy]);

  // Update filtered products when sort/filter changes
  useEffect(() => {
    setFilteredProducts(sortedAndFilteredProducts);
  }, [sortedAndFilteredProducts]);

  // Handle filter changes
  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      priceRange: { min: 0, max: 200 },
      materials: [],
      colors: [],
      inStock: false,
      onSale: false,
    });
  };

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeFilters.categories.length > 0) count++;
    if (activeFilters.materials.length > 0) count++;
    if (activeFilters.colors.length > 0) count++;
    if (activeFilters.inStock) count++;
    if (activeFilters.onSale) count++;
    if (activeFilters.priceRange.min > 0 || activeFilters.priceRange.max < 200) count++;
    return count;
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={0} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sage/10 to-terra/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground">
              Our <span className="text-sage italic">Collections</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Explore our complete range of handcrafted jewelry, each piece telling its own story of nature&apos;s beauty and artisanal excellence.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <ProductFilters
                filters={activeFilters}
                onFiltersChange={handleFilterChange}
                productCount={filteredProducts.length}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-4 bg-soft-white/30 rounded-lg border border-sage/20">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="lg:hidden border-sage text-sage hover:bg-sage/10"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-terra text-white">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <span className="font-body text-sm text-muted-foreground">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                  </span>
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-terra hover:text-terra/80 hover:bg-terra/10"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear all
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-sage/20 rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3 rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="px-3 rounded-l-none"
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
                  <SelectTrigger className="w-44 border-sage/20 focus:ring-sage">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filter Tags */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="bg-sage/10 text-sage border-sage/20 font-body"
                  >
                    {category}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setActiveFilters(prev => ({
                          ...prev,
                          categories: prev.categories.filter(c => c !== category)
                        }))
                      }
                    />
                  </Badge>
                ))}
                {activeFilters.materials.map((material) => (
                  <Badge
                    key={material}
                    variant="secondary"
                    className="bg-terra/10 text-terra border-terra/20 font-body"
                  >
                    {material}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setActiveFilters(prev => ({
                          ...prev,
                          materials: prev.materials.filter(m => m !== material)
                        }))
                      }
                    />
                  </Badge>
                ))}
                {activeFilters.colors.map((color) => (
                  <Badge
                    key={color}
                    variant="secondary"
                    className="bg-sand/40 text-warm-gray border-warm-gray/20 font-body"
                  >
                    {color}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setActiveFilters(prev => ({
                          ...prev,
                          colors: prev.colors.filter(c => c !== color)
                        }))
                      }
                    />
                  </Badge>
                ))}
                {activeFilters.inStock && (
                  <Badge
                    variant="secondary"
                    className="bg-sage/10 text-sage border-sage/20 font-body"
                  >
                    In Stock
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setActiveFilters(prev => ({ ...prev, inStock: false }))
                      }
                    />
                  </Badge>
                )}
                {activeFilters.onSale && (
                  <Badge
                    variant="secondary"
                    className="bg-terra/10 text-terra border-terra/20 font-body"
                  >
                    On Sale
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setActiveFilters(prev => ({ ...prev, onSale: false }))
                      }
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} viewMode={viewMode} />

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="h-12 w-12 text-sage" />
                </div>
                <h3 className="font-heading text-xl font-medium text-foreground mb-2">
                  No products found
                </h3>
                <p className="font-body text-muted-foreground mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button onClick={clearAllFilters} className="bg-sage hover:bg-sage/90 text-soft-white">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}