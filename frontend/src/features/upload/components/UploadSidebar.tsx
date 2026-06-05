import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/common/Button';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: 'cloud_upload', label: 'Data Upload', to: '/upload', active: true },
  { icon: 'verified', label: 'Verification', to: '/verification' },
  { icon: 'toll', label: 'Tokenization', to: '/tokenization' },
  { icon: 'history', label: 'Audit Trail', to: '/audit' },
  { icon: 'help_outline', label: 'Support', to: '/support' },
];

export const UploadSidebar = () => {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-background border-r border-primary/10 flex flex-col py-4 hidden md:flex">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
            <Icon name="eco" size="md" className="text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest leading-none">
              Project Blue-Carbon-01
            </h3>
            <p className="text-[10px] text-slate-500 font-medium mt-1">Mangrove Restoration</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg mx-2 my-1 transition-colors',
                isActive || item.active
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
              )
            }
          >
            <Icon name={item.icon} size="md" />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 mt-auto">
        <Button variant="primary" size="md" className="w-full">
          New Record
        </Button>
      </div>
    </aside>
  );
};