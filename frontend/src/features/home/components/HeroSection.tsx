import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';

export const HeroSection = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-8 mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text */}
        <div className="space-y-6">
          <span className="text-primary font-label text-xs uppercase tracking-[0.3em] font-medium">
            Sovereign Ecosystem
          </span>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-on-surface leading-[0.9]">
            Quantifying <br />
            Planetary <span className="text-primary">Integrity</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed font-light">
            MRV Blue Carbon provides high-fidelity Monitoring, Reporting, and Verification (MRV)
            for Blue Carbon ecosystems. We bridge the gap between biological potential and
            financial markets through immutable data architecture.
          </p>
        </div>

        {/* Right Column - Image with Overlay */}
        <div className="relative h-[500px] rounded-xl overflow-hidden group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCecNZNFL-qTWDEOcwKAaqtNOjQFXPmVehd3eYR5WpYM_tBDdNqNKrHN_67-7UxcWXhGhP04s83xzOK147mTRM5JGs301gVCR7RBjd5Yu0yEeUX4F-sfLpoK80i0HL0HeYjev03QM6NRX9EMzHniwIWnmWOQB_qE2J7v2ITF2lvJBcp0YE7qmFIEqzoduQ1JZTLtJSZQ_DmsPMr0GDjQciTZfbqtyLRRsQEWiwOnniGd_CPXeLh6o4cLhQNADjWlPL5jovzpUkUaIoF"
            alt="Abstract satellite visualization of deep ocean currents and coral reef structures with glowing cyan data overlays"
            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 border-l-2 border-primary pl-4">
            <p className="text-primary font-mono text-xs mb-1">DATASTREAM 01</p>
            <p className="text-on-surface font-bold">Oceanic Sequestration Metrics</p>
          </div>
        </div>
      </div>
    </section>
  );
};