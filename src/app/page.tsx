import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { FeaturedCollections } from '@/components/featured-collections';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header cartItemCount={0} />
      <main>
        <HeroSection />
        <FeaturedCollections />
      </main>
    </div>
  );
}