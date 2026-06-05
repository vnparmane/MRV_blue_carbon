import { Icon } from '@/components/common/Icon';

const partners = [
  { icon: 'waves', name: 'OCEANIC_TRUST' },
  { icon: 'eco', name: 'BIO_DATA_INIT' },
  { icon: 'public', name: 'GLOBAL_MRV' },
  { icon: 'verified_user', name: 'CRYPTO_PLANET' },
];

export const PartnerLogos = () => {
  return (
    <div className="col-span-2 flex items-center justify-center bg-surface-container-low border border-dashed border-outline-variant rounded-xl p-8">
      <div className="grid grid-cols-2 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
        {partners.map((partner) => (
          <div key={partner.name} className="flex items-center space-x-2">
            <Icon name={partner.icon} size="xl" />
            <span className="font-black text-xl tracking-tighter">{partner.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};