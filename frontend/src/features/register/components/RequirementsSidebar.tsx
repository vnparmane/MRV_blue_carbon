import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';
import { cn } from '@/lib/utils';

const requirements = [
  {
    text: 'Verified land tenure documents or sovereign concession rights (PDF/JSON).',
    completed: true,
  },
  {
    text: 'Minimum project duration of 25 years with permanent sequestration commitment.',
    completed: true,
  },
  {
    text: 'Initial soil carbon analysis from at least 3 distinct sample clusters.',
    completed: false,
  },
];

export const RequirementsSidebar = () => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-transparent p-1 rounded-xl">
      <Card className="bg-surface-container-high p-8 border-primary/20">
        <h3 className="text-xl font-bold text-primary mb-4">Registration Requirements</h3>
        <ul className="space-y-4">
          {requirements.map((req, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Icon
                name={req.completed ? 'check_circle' : 'radio_button_unchecked'}
                size="sm"
                className={cn('mt-0.5', req.completed ? 'text-primary' : 'text-slate-600')}
              />
              <p className="text-sm text-slate-300">{req.text}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};