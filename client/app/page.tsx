import { LandingNavbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Workflow } from '@/components/landing/workflow';
import { ProductPreview } from '@/components/landing/product-preview';
import { Stats } from '@/components/landing/stats';
import { FAQ } from '@/components/landing/faq';
import { CTA } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <>
      <LandingNavbar />

      <Hero />

      <Features />

      <Workflow />

      <ProductPreview />

      <Stats />

      <FAQ />

      <CTA />

      <Footer />
    </>
  );
}