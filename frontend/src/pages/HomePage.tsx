import { HeroSection } from '@/features/home/components/HeroSection';
import MethodologyGrid from '@/features/home/components/MethodologyGrid';
import { TeamSection } from '@/features/home/components/TeamSection';
import { CTASection } from '@/features/home/components/CTASection';
import { Footer } from '@/components/layout/Footer';

const HomePage = () => {
  return (
    <>
      <main className="pt-32 pb-20">
        <HeroSection />
        <MethodologyGrid />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};
export default HomePage;