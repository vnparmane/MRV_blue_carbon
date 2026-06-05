import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';

export const MapSection = () => {
  return (
    <div className="col-span-12 lg:col-span-8">
      <Card className="overflow-hidden min-h-[500px] relative p-0">
        {/* Map Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <div className="glass-panel p-2 rounded-lg border border-primary/20">
            <div className="flex flex-col gap-1">
              <button className="p-2 bg-primary text-on-primary rounded hover:opacity-80 transition-opacity">
                <Icon name="layers" size="md" />
              </button>
              <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                <Icon name="distance" size="md" />
              </button>
              <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                <Icon name="area_chart" size="md" />
              </button>
            </div>
          </div>
        </div>

        {/* Active View Indicator */}
        <div className="absolute top-4 right-4 z-10 glass-panel px-4 py-2 rounded-lg border border-primary/20">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
            Active View
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-tighter">
              Biomass Heatmap Layer
            </span>
          </div>
        </div>

        {/* Map Image */}
        <div className="w-full h-full bg-[#081111] flex items-center justify-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKzSOZf9TP_U-l9K9I3kwyFMzoIDkqo_NZfhXSOLdXRZg3SHWLSepFFH2zqpkDNupDyAcf42e3al2Js85x2cmAbGuZy7DwZTI6R-PT1aT9UTxqj_IoEKEv503xDgf6o4x5KfclalqiJPOdBh_fb66Qd-5Al-wOiW_0KdrSDaeZA29LPE-OeROBqufrFdKMPtAainGTmluC7tM1TEIK6ADPMX8agd5AO_uBdjBQbwRf9TI8HSTbeejbg-_OpYyHB4r_EO8LgM5_SiDu"
            alt="top-down satellite view of a mangrove forest with overlaid neon cyan and green topographic heatmap lines showing biomass density"
            className="w-full h-full object-cover opacity-60 mix-blend-screen"
            loading="lazy"
          />
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 z-10 w-48 glass-panel p-4 rounded-lg border border-outline-variant/30">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-3">
            Biomass Density Legend
          </span>
          <div className="space-y-2">
            <LegendItem label="High (400+)" color="bg-primary" />
            <LegendItem label="Med (250)" color="bg-primary/40" />
            <LegendItem label="Low (100)" color="bg-primary/10" />
          </div>
        </div>
      </Card>
    </div>
  );
};

const LegendItem = ({ label, color }: { label: string; color: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-[10px] uppercase">{label}</span>
    <div className={`w-12 h-1 ${color}`} />
  </div>
);