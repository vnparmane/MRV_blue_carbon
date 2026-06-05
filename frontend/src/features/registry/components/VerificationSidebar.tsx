import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

export const VerificationSidebar = () => {
  return (
    <>
      <Card className="bg-primary/5 border-primary/20 p-6 flex-1 flex flex-col justify-center">
        <Icon name="security" size="xl" className="text-primary mb-4" filled />
        <h3 className="text-xl font-bold mb-2">Immutable Verification</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Every transaction shown is verified through a decentralized consensus of ecological nodes.
          Data is stored on the Cyan Mainnet.
        </p>
        <a href="#" className="mt-4 text-primary text-sm font-bold flex items-center gap-2">
          Read Methodology <Icon name="arrow_forward" size="sm" />
        </a>
      </Card>

      <Card variant="high" className="p-6">
        <h4 className="text-xs uppercase tracking-widest text-slate-500 mb-4">Registry Map View</h4>
        <div className="h-32 rounded-xl bg-surface-container-low overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZZyPGN34_i4Knk1O2CubQKuyKAlMMdAL4L3n7TvhQflhUI_Apu5Xdm00wYoXjqLEQEcWNl0u0PadDKcaku3vwcgkwksewB-quL-SnW4yaB6KoE6wwVKkEYINUD75YePWO0vTSItbIL__4aYP1ujf3Xh-b0BhdQIOMwS-AoVST7vyPcCJgEA2YJ7KZPrh4Kp9fVEOCYTBXxMjxaK22tBQNQyfIp0QIjmK7dAhyvXXt6UwcQZspnR8HbahPUXeQiVeJYdtbVmYJBcNf"
            alt="stylized dark technical map of the world with cyan digital glow nodes over coastal areas"
            className="w-full h-full object-cover grayscale opacity-50"
          />
        </div>
        <Button variant="outline" size="sm" className="w-full mt-4">
          OPEN INTERACTIVE MAP
        </Button>
      </Card>
    </>
  );
};