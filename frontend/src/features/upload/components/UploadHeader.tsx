import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/common/Badge';

interface UploadHeaderProps {
  projectId: string | null;
}

export const UploadHeader = ({ projectId }: UploadHeaderProps) => {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="verified">Current Mission</Badge>
          {projectId && (
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              Project #{projectId}
            </span>
          )}
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-on-surface tracking-tighter">
          MRV Data Upload
        </h1>
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Icon name="location_on" size="sm" />
            <span>{projectId ? `Project #${projectId}` : 'No project selected'}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <div className="flex items-center gap-2 text-slate-400">
            <Icon name="forest" size="sm" />
            <span>Mangrove Restoration</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-surface-container p-4 rounded-xl border border-outline-variant/30">
        <div className="w-3 h-3 rounded-full bg-tertiary-container animate-pulse" />
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mb-1">
            Current Status
          </p>
          <p className="text-sm font-semibold text-tertiary-container">Awaiting Monitoring Data</p>
        </div>
      </div>
    </section>
  );
};