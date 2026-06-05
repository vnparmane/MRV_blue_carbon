import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

const logs = [
  {
    id: 1,
    fileName: 'SOIL_SAMPLE_X92.csv',
    uploadedBy: 'Field Unit 04',
    timeAgo: '2h ago',
    status: 'valid',
    icon: 'description',
  },
  {
    id: 2,
    fileName: 'CANOPY_IMG_BATCH_8.tar',
    uploadedBy: 'Drone Delta',
    timeAgo: '5h ago',
    status: 'valid',
    icon: 'photo_camera',
  },
  {
    id: 3,
    fileName: 'BIO_METRIC_REPORT_FINAL.pdf',
    uploadedBy: 'Lead Scientist',
    timeAgo: '12h ago',
    status: 'processing',
    icon: 'biotech',
  },
];

export const FieldLogs = () => {
  return (
    <div className="col-span-12 lg:col-span-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold tracking-tight">Recent Field Logs</h3>
          <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            <Icon name="upload_file" size="sm" />
            UPLOAD DATA
          </button>
        </div>
        <div className="space-y-4">
          {logs.map((log) => (
            <LogItem key={log.id} {...log} />
          ))}
        </div>
      </Card>
    </div>
  );
};

interface LogItemProps {
  fileName: string;
  uploadedBy: string;
  timeAgo: string;
  status: 'valid' | 'processing' | 'error';
  icon: string;
}

const LogItem = ({ fileName, uploadedBy, timeAgo, status, icon }: LogItemProps) => {
  const statusConfig = {
    valid: { variant: 'verified' as const, text: 'HASH VALID' },
    processing: { variant: 'pending' as const, text: 'PROCESSING' },
    error: { variant: 'default' as const, text: 'ERROR' },
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-primary/20 transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
          <Icon name={icon} size="md" />
        </div>
        <div>
          <h4 className="text-sm font-semibold">{fileName}</h4>
          <p className="text-[10px] text-slate-500 font-mono uppercase">
            Uploaded by: {uploadedBy} • {timeAgo}
          </p>
        </div>
      </div>
      <Badge variant={statusConfig[status].variant}>{statusConfig[status].text}</Badge>
    </div>
  );
};