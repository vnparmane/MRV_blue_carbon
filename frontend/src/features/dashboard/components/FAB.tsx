import { Icon } from '@/components/common/Icon';

export const FAB = () => {
  return (
    <button className="fixed bottom-8 right-8 bg-primary text-on-primary p-4 rounded-xl shadow-[0_0_20px_rgba(19,236,236,0.4)] hover:scale-105 transition-transform z-40 active:scale-95">
      <Icon name="add_chart" size="md" filled />
    </button>
  );
};