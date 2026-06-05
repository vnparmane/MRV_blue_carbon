import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';

export const SpectralComparison = () => {
  return (
    <div className="col-span-12 lg:col-span-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold tracking-tight">Spectral Comparison</h3>
          <div className="flex gap-2">
            <span className="text-[10px] font-mono text-slate-500">2023 VS 2024</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* 2023 Image */}
          <div className="relative group cursor-crosshair">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtZq8Ue7HEdkTnyvv43Buk3qC6boWqOY-A4y3sIsApKSHgoM4KCKrURlNCU1eukhJGWNtB4QaX7k119KZiI7dQ_f4PymUD37SFcZ355nF0JOaq5cn-BjWoHs80B9A5mViA8DJ_oYTJMkIGOmL7jbX-h_gjcZIIOJ3HUp_AN7O9jtgXQ-qs53CFlZW-rK-7C4yySszukXEOShjIpfyZacxYkbKwrkznSIojQZIcLLJlfsowIIBdEA9AtuRGagaanVMOA0M1PjqGBqbc"
              alt="infra-red satellite imaging of coastal mangroves with heavy red spectral signatures indicating healthy vegetation"
              className="w-full h-40 object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-primary/10 opacity-40 rounded-lg" />
            <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/80 px-2 py-1 rounded">
              AUG 2023
            </span>
          </div>

          {/* 2024 Image */}
          <div className="relative group cursor-crosshair">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWAUjEfYzR95AJYm7jKK7n2cAjp_HlGfo8dFCs_bxJMd7N8nnIlHZFnebJVrPCCZwxVsFgkP6Mcy-yNeLtaKznnethHk0raOHiDzZYpdtmYnvhznHyn59TH8IZVHXEhBkSb1rLIoyDO9tlFGVSUAMeu3ZdpF_T-PiYo6O0MLEASQN8oLI0ReSgRTUFLA3ink4vIz-cKUSlNwtNB93MJl9m-TuQ6alzMsdZPTbl8-0HO3u47IuHIRn0j-UG40AAADaqJkgAQOZRI4Hc"
              alt="high resolution multi-spectral satellite imagery of lush mangrove canals with bright cyan data overlays indicating high carbon density"
              className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 border-2 border-primary/40 rounded-lg" />
            <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-primary text-on-primary px-2 py-1 rounded uppercase">
              Active Analysis
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-400">NDVI Growth Index</span>
            <span className="text-primary font-mono">+12.4%</span>
          </div>
          <ProgressBar value={72} max={100} showLabel={false} />
        </div>
      </Card>
    </div>
  );
};