import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Register Project', href: '/register' },
  { label: 'MRV Dashboard', href: '/dashboard' },
  { label: 'Carbon Registry', href: '/registry' },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-[0_4px_20px_rgba(19,236,236,0.1)]">
      <div className="flex justify-between items-center h-20 px-8 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-primary">
          MRV Blue Carbon
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-headline text-sm tracking-wide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'font-medium transition-all duration-300',
                location.pathname === item.href
                  ? 'text-primary font-bold border-b-2 border-primary pb-1'
                  : 'text-slate-400 hover:text-primary'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Wallet Connect Button */}
        <Button variant="primary" size="md" className="flex items-center gap-2">
          <Icon name="account_balance_wallet" size="sm" />
          Connect Wallet
        </Button>
      </div>
    </nav>
  );
};