import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';

export const CTASection = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-8">
      <div className="bg-surface-container rounded-2xl p-12 text-center border border-primary/20 relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-10 h-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="border-r border-primary" />
            ))}
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-6">Explore our Technical Whitepaper</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
          Dive into the specific calculus of our blue carbon quantification models and the
          governance protocols that secure our decentralized registry.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" className="gap-2">
            <Icon name="description" size="sm" />
            DOWNLOAD METHODOLOGY
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Icon name="api" size="sm" />
            DEVELOPER DOCS
          </Button>
        </div>
      </div>
    </section>
  );
};