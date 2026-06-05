import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';

const SatelliteCard = () => {
  return (
    <Card className="md:col-span-2 p-8 group">
      <div className="flex justify-between items-start mb-12">
        <Icon name="satellite_alt" size="xl" className="text-primary" />
        <span className="text-on-surface-variant font-mono text-xs">MODULE_SAT_EYE</span>
      </div>
      <h3 className="text-2xl font-bold text-on-surface mb-4">
        Multi-Spectral Satellite Monitoring
      </h3>
      <p className="text-on-surface-variant mb-6 leading-relaxed">
        We utilize high-resolution Sentinel and Landsat imagery to monitor mangrove canopy density,
        seagrass extent, and salt marsh health. Our proprietary algorithms detect biomass variations
        with sub-meter precision, providing a real-time audit trail of sequestration progress.
      </p>
      <div className="grid grid-cols-3 gap-4 border-t border-outline-variant pt-6">
        <div>
          <p className="text-primary font-bold text-lg">0.5m</p>
          <p className="text-xs uppercase text-slate-500">Resolution</p>
        </div>
        <div>
          <p className="text-primary font-bold text-lg">Daily</p>
          <p className="text-xs uppercase text-slate-500">Frequency</p>
        </div>
        <div>
          <p className="text-primary font-bold text-lg">AI-Driven</p>
          <p className="text-xs uppercase text-slate-500">Analysis</p>
        </div>
      </div>
    </Card>
  );
};
export default SatelliteCard;