'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  Leaf
} from 'lucide-react';

interface HeaderProps {
  cartItemCount?: number;
}

export function Header({ cartItemCount = 0 }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    { name: 'Earrings', href: '/catalog?category=earrings' },
    { name: 'Necklaces', href: '/catalog?category=necklaces' },
    { name: 'Bracelets', href: '/catalog?category=bracelets' },
    { name: 'Rings', href: '/catalog?category=rings' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-sage" />
            <div className="flex flex-col">
              <span className="font-heading text-xl font-medium text-foreground">
                Earrings & Things
              </span>
              <span className="font-accent text-sm text-muted-foreground -mt-1">
                by Laura
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-body">
                    Collections
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <div className="row-span-3">
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-sage/20 to-sage/40 p-6 no-underline outline-none focus:shadow-md"
                          href="/catalog"
                        >
                          <Leaf className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium font-heading">
                            All Collections
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground font-body">
                            Explore our complete range of handcrafted nature-inspired jewelry
                          </p>
                        </Link>
                      </div>
                      <div className="grid gap-1">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none font-body">
                              {category.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" className="font-body text-sm font-medium transition-colors hover:text-foreground/80">
                    Our Story
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" className="font-body text-sm font-medium transition-colors hover:text-foreground/80">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="h-4 w-4" />
            </Button>

            {/* Account */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <User className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingBag className="h-4 w-4" />
              {cartItemCount > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-terra text-white"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <Link href="/" className="flex items-center space-x-2 pb-4 border-b">
                    <Leaf className="h-6 w-6 text-sage" />
                    <div className="flex flex-col">
                      <span className="font-heading text-lg font-medium">
                        Earrings & Things
                      </span>
                      <span className="font-accent text-sm text-muted-foreground -mt-1">
                        by Laura
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/catalog"
                      className="font-body text-sm font-medium py-2 hover:text-sage transition-colors"
                    >
                      All Collections
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="font-body text-sm py-2 pl-4 hover:text-sage transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <Link href="/about" className="block font-body text-sm font-medium py-2 hover:text-sage transition-colors">
                      Our Story
                    </Link>
                    <Link href="/contact" className="block font-body text-sm font-medium py-2 hover:text-sage transition-colors">
                      Contact
                    </Link>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <Button variant="ghost" className="justify-start font-body text-sm w-full">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="ghost" className="justify-start font-body text-sm w-full">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                    <Button variant="ghost" className="justify-start font-body text-sm w-full">
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        {isSearchOpen && (
          <div className="border-t py-3 sm:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jewelry..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}