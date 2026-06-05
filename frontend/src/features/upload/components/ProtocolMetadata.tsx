import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';

export const ProtocolMetadata = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon name="terminal" size="md" className="text-slate-400" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Protocol Metadata
        </span>
      </div>
      <div className="space-y-2 font-mono text-[10px] text-slate-500">
        <div className="flex justify-between">
          <span>ORACLE_ID</span>
          <span className="text-slate-300">MBC-NODE-042</span>
        </div>
        <div className="flex justify-between">
          <span>HASH_ALGO</span>
          <span className="text-slate-300">SHA-256 (AES-GCM)</span>
        </div>
        <div className="flex justify-between">
          <span>SYNC_STATUS</span>
          <span className="text-primary">ACTIVE</span>
        </div>
      </div>
    </Card>
  );
};