import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';

export const FeaturedProjectCard = () => {
  return (
    <Card className="overflow-hidden group">
      <div className="h-64 relative">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAumshQ9pWh3wKFUANdvHMghZRhdPnIrkkl3BgKS_9A8UFalyoF1AW3P_ZDCrCNLIVLajWXBxqqdABCBjAkyNtd5uyppNiGx-_oqEhGxA2x7vdau9Gc9lfYYNWTVo_G7G8T6api7tmlj845Htp38ZpMV7zNMi85Q2tkxUwzVSWOCyozyDrDXbY3XvOTcZG2b-9uMQITYhqaP__wnYJGR79iMWpnG9PKfHeUc8J8OhT_dioOLwDkrmOstLUbGV5mcCVap1NWnCj6vjOq"
          alt="overhead view of turquoise ocean waves crashing against a dense green mangrove forest edge with white sand"
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent" />
        <div className="absolute bottom-6 left-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="verified">Verified</Badge>
            <span className="text-on-surface/60 text-xs font-mono">ID: CM-SEA-042</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Sumatra Mangrove Restoration II</h2>
        </div>
      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Total Credits</div>
          <div className="text-2xl font-bold data-mono">
            84,200 <span className="text-xs font-normal text-slate-400">tCO2e</span>
          </div>
        </div>
        <div>
          <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Developer</div>
          <div className="text-lg font-semibold">EcoMarine Trust</div>
          <div className="text-xs text-primary underline cursor-pointer">View Credentials</div>
        </div>
        <div>
          <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">TX Hash</div>
          <div className="text-xs font-mono text-slate-400 break-all bg-surface-container-low p-2 rounded">
            0x7d1a...f2e9
          </div>
        </div>
      </div>
    </Card>
  );
};