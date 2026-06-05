import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { useProjects } from '../hooks/useProjects';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const cols = ['Project Name', 'Developer', 'Ecosystem', 'Location', 'Credits (tCO2e)', 'Status', 'TX Hash'];

export const RegistryTable = () => {
  const { data, isLoading, error } = useProjects(1);

  if (isLoading) return (
    <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
  );
  if (error) return (
    <div className="text-error p-6">Failed to load projects. Check backend connection.</div>
  );

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-outline-variant/20">
              {cols.map((col) => (
                <th key={col} className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.projects.length === 0 && (
              <tr><td colSpan={7} className="text-center py-12 text-slate-500">No projects registered yet.</td></tr>
            )}
            {data?.projects.map((p) => (
              <tr key={p.id} className="border-b border-outline-variant/10 hover:bg-surface-container-high/50 transition-colors">
                <td className="px-6 py-4 font-semibold">{p.name}</td>
                <td className="px-6 py-4 text-slate-400">{p.developer || p.developerEntity}</td>
                <td className="px-6 py-4 text-slate-400">{p.ecosystemType}</td>
                <td className="px-6 py-4 text-slate-400">{p.location}</td>
                <td className="px-6 py-4 font-mono text-primary">
                  {(p.totalCredits ?? 0).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={(p.status as any) || 'pending'}>{p.status || 'pending'}</Badge>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-500">
                  {p.tx_hash ? (
                    <a href={`https://polygonscan.com/tx/${p.tx_hash}`} target="_blank" rel="noreferrer"
                       className="hover:text-primary underline">
                      {p.tx_hash.slice(0, 10)}...
                    </a>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};