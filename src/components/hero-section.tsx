'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-sage/20 via-sand/30 to-terra/20" />
        <div
          className="absolute inset-0 opacity-60 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/generated/hero-background.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-soft-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-body text-warm-gray border border-sage/20">
            <Sparkles className="h-4 w-4 text-sage" />
            <span>Handcrafted with Love</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[0.9]">
              Crafted by Nature,
              <br />
              <span className="text-sage italic">Adorned by You</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our bohemian treasure trove of handcrafted jewelry, where each piece tells a story of
              nature&apos;s beauty and artisanal excellence. From delicate botanical earrings to statement necklaces,
              find the perfect piece to express your unique style.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-sage hover:bg-sage/90 text-soft-white font-body px-8 py-6 text-base">
              <Link href="/catalog">
                Shop Collections
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-sage text-sage hover:bg-sage/10 font-body px-8 py-6 text-base">
              <Link href="/about">
                Our Story
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-sage/20">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-medium text-foreground">Handcrafted Excellence</h3>
              <p className="font-body text-sm text-muted-foreground">Every piece is lovingly made by hand with attention to detail</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-terra/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-terra" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-medium text-foreground">Nature Inspired</h3>
              <p className="font-body text-sm text-muted-foreground">Designs drawn from the organic beauty of the natural world</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-sand/40 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-medium text-foreground">Quality Materials</h3>
              <p className="font-body text-sm text-muted-foreground">Sterling silver, gold fill, and carefully selected gemstones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <svg className="w-24 h-24 text-sage" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L13.09 7.26L18.82 7.27L14.72 10.98L16.18 16.02L12 12.75L7.82 16.02L9.28 10.98L5.18 7.27L10.91 7.26L12 2Z" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-16 opacity-15">
        <svg className="w-32 h-32 text-terra" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1.5V3.5L19.2 7.5L15 11.5V13.5L21 9ZM3 9L9 13.5V11.5L4.8 7.5L9 3.5V1.5L3 7V9Z" />
        </svg>
      </div>
    </section>
  );
}