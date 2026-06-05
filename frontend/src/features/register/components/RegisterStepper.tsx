import { cn } from '@/lib/utils';

const steps = [
  { number: 1, label: 'Project Overview' },
  { number: 2, label: 'Baseline Data' },
  { number: 3, label: 'Document Upload' },
];

interface RegisterStepperProps {
  currentStep: number;
}

export const RegisterStepper = ({ currentStep }: RegisterStepperProps) => {
  return (
    <div className="flex items-center space-x-4 mb-16 overflow-x-auto pb-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center space-x-3">
          <div
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all',
              step.number === currentStep
                ? 'bg-primary text-on-primary'
                : step.number < currentStep
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'border border-primary/30 text-slate-300 opacity-50'
            )}
          >
            {step.number}
          </div>
          <span
            className={cn(
              'font-medium whitespace-nowrap',
              step.number === currentStep
                ? 'text-primary font-bold'
                : step.number < currentStep
                ? 'text-primary'
                : 'text-slate-400'
            )}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && <div className="h-[1px] w-12 bg-primary/20" />}
        </div>
      ))}
    </div>
  );
};