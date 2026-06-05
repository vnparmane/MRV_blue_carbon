import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';

export const BlockchainCard = () => {
  return (
    <Card className="bg-primary p-8 flex flex-col justify-between group cursor-default">
      <div>
        <div className="mb-8">
          <Icon name="hub" size="xl" className="text-on-primary" />
        </div>
        <h3 className="text-2xl font-bold text-on-primary mb-4">
          Immutable Proof of Sequestration
        </h3>
        <p className="text-on-primary/80 leading-relaxed">
          Every data point from our MRV pipeline is hashed and anchored to a sovereign blockchain
          layer. This eliminates "double counting" and ensures that carbon credits represent real,
          additional, and permanent removals.
        </p>
      </div>
      <div className="mt-8">
        <span className="inline-flex items-center text-on-primary font-bold text-sm group-hover:translate-x-2 transition-transform">
          VIEW LEDGER ARCHITECTURE <Icon name="arrow_forward" size="sm" className="ml-2" />
        </span>
      </div>
    </Card>
  );
};