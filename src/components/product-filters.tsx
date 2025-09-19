'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { FilterOptions, ProductCategory } from '@/types';
import { getAllCategories, getAllMaterials, getAllColors, getPriceRange } from '@/data/products';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  productCount: number;
}

export function ProductFilters({ filters, onFiltersChange, productCount }: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    materials: true,
    colors: true,
    availability: true,
  });

  const categories = getAllCategories();
  const materials = getAllMaterials();
  const colors = getAllColors();
  const priceRange = getPriceRange();

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: ProductCategory, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);

    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    const newMaterials = checked
      ? [...filters.materials, material]
      : filters.materials.filter(m => m !== material);

    onFiltersChange({
      ...filters,
      materials: newMaterials
    });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.colors, color]
      : filters.colors.filter(c => c !== color);

    onFiltersChange({
      ...filters,
      colors: newColors
    });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: {
        min: value[0],
        max: value[1]
      }
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: { min: 0, max: priceRange.max },
      materials: [],
      colors: [],
      inStock: false,
      onSale: false,
    });
  };

  return (
    <Card className="bg-background/80 backdrop-blur-sm border-sage/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-lg font-medium flex items-center">
            <Filter className="h-4 w-4 mr-2 text-sage" />
            Filters
          </CardTitle>
          <Badge variant="outline" className="text-xs font-body">
            {productCount} items
          </Badge>
        </div>
        {(filters.categories.length > 0 || filters.materials.length > 0 || filters.colors.length > 0 || filters.inStock || filters.onSale) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-terra hover:text-terra/80 hover:bg-terra/10 justify-start p-0 h-auto font-body"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-0">
        {/* Categories */}
        <Collapsible open={openSections.categories}>
          <div className="py-4">
            <CollapsibleTrigger
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full font-body font-medium text-foreground hover:text-sage transition-colors"
            >
              Categories
              {openSections.categories ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category as ProductCategory)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category as ProductCategory, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="font-body text-sm capitalize cursor-pointer flex-1"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </div>
          <Separator className="bg-sage/20" />
        </Collapsible>

        {/* Price Range */}
        <Collapsible open={openSections.price}>
          <div className="py-4">
            <CollapsibleTrigger
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full font-body font-medium text-foreground hover:text-sage transition-colors"
            >
              Price Range
              {openSections.price ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-3">
              <div className="px-2">
                <Slider
                  value={[filters.priceRange.min, filters.priceRange.max]}
                  onValueChange={handlePriceChange}
                  max={priceRange.max}
                  min={priceRange.min}
                  step={5}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm font-body text-muted-foreground">
                <span>${filters.priceRange.min}</span>
                <span>${filters.priceRange.max}</span>
              </div>
            </CollapsibleContent>
          </div>
          <Separator className="bg-sage/20" />
        </Collapsible>

        {/* Materials */}
        <Collapsible open={openSections.materials}>
          <div className="py-4">
            <CollapsibleTrigger
              onClick={() => toggleSection('materials')}
              className="flex items-center justify-between w-full font-body font-medium text-foreground hover:text-sage transition-colors"
            >
              Materials
              {openSections.materials ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-3">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={`material-${material}`}
                    checked={filters.materials.includes(material)}
                    onCheckedChange={(checked) =>
                      handleMaterialChange(material, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`material-${material}`}
                    className="font-body text-sm cursor-pointer flex-1"
                  >
                    {material}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </div>
          <Separator className="bg-sage/20" />
        </Collapsible>

        {/* Colors */}
        <Collapsible open={openSections.colors}>
          <div className="py-4">
            <CollapsibleTrigger
              onClick={() => toggleSection('colors')}
              className="flex items-center justify-between w-full font-body font-medium text-foreground hover:text-sage transition-colors"
            >
              Colors
              {openSections.colors ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-3">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.colors.includes(color)}
                    onCheckedChange={(checked) =>
                      handleColorChange(color, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`color-${color}`}
                    className="font-body text-sm cursor-pointer flex-1"
                  >
                    {color}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </div>
          <Separator className="bg-sage/20" />
        </Collapsible>

        {/* Availability */}
        <Collapsible open={openSections.availability}>
          <div className="py-4">
            <CollapsibleTrigger
              onClick={() => toggleSection('availability')}
              className="flex items-center justify-between w-full font-body font-medium text-foreground hover:text-sage transition-colors"
            >
              Availability
              {openSections.availability ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ ...filters, inStock: checked as boolean })
                  }
                />
                <Label htmlFor="in-stock" className="font-body text-sm cursor-pointer">
                  In Stock
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="on-sale"
                  checked={filters.onSale}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ ...filters, onSale: checked as boolean })
                  }
                />
                <Label htmlFor="on-sale" className="font-body text-sm cursor-pointer">
                  On Sale
                </Label>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </CardContent>
    </Card>
  );
}