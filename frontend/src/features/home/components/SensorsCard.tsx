import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';

export const SensorsCard = () => {
  return (
    <Card className="p-8 flex flex-col justify-between bg-surface-container-high">
      <div>
        <div className="mb-8">
          <Icon name="sensors" size="xl" className="text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-on-surface mb-4">Field Sensor Integration</h3>
        <p className="text-on-surface-variant leading-relaxed">
          Sub-surface IoT sensors measure soil organic carbon (SOC), salinity, and pH levels
          directly at the source, corroborating satellite data with ground-truth reality.
        </p>
      </div>
      <div className="mt-8 space-y-2">
        <ProgressBar value={98.4} max={100} showLabel={false} />
        <p className="text-xs text-slate-500 font-mono">SENSOR_CALIBRATION: 98.4%</p>
      </div>
    </Card>
  );
};