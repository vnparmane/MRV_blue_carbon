import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { KPIGrid } from '@/features/dashboard/components/KPIGrid';
import { DashboardGrid } from '@/features/dashboard/components/DashboardGrid';
import { Footer } from '@/components/layout/Footer';

const DashboardPage = () => {
  return (
    <>
      <main className="pt-28 pb-12 px-8 max-w-[1440px] mx-auto space-y-8">
        <DashboardHeader />
        <KPIGrid />
        <DashboardGrid />
      </main>
      <Footer />
    </>
  );
};
export default DashboardPage;