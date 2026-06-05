import { Icon } from '@/components/common/Icon';

export const Footer = () => {
  return (
    <footer className="bg-background w-full py-12 border-t border-primary/5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-12 max-w-[1440px] mx-auto">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="text-primary font-black italic text-xl tracking-tight">
            MRV Blue Carbon
          </div>
          <p className="font-headline text-xs uppercase tracking-widest text-slate-500 leading-relaxed">
            © 2024 MRV Blue Carbon. Sovereign MRV Ecosystem. Immutable Data for Planetary Health.
          </p>
        </div>

        {/* Protocol Column */}
        <div className="flex flex-col space-y-3">
          <p className="text-primary font-bold text-xs mb-2">Protocol</p>
          <FooterLink to="/docs">Documentation</FooterLink>
          <FooterLink to="/methodology">Methodology</FooterLink>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col space-y-3">
          <p className="text-primary font-bold text-xs mb-2">Resources</p>
          <FooterLink to="/governance">Governance</FooterLink>
          <FooterLink to="/whitepaper">Whitepaper</FooterLink>
        </div>

        {/* Developers Column */}
        <div className="flex flex-col space-y-3">
          <p className="text-primary font-bold text-xs mb-2">Developers</p>
          <FooterLink to="/api">API Access</FooterLink>
          <div className="flex space-x-4 mt-2">
            <Icon name="terminal" className="text-slate-500 cursor-pointer hover:text-primary" />
            <Icon name="share" className="text-slate-500 cursor-pointer hover:text-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper for footer links
const FooterLink = ({ children }: { to: string; children: React.ReactNode }) => (
  <span
    className="font-headline text-xs uppercase tracking-widest text-slate-500 cursor-not-allowed"
    title="Coming soon"
  >
    {children}
  </span>
);