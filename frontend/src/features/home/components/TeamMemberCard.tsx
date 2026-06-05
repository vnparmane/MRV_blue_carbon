import { Card } from '@/components/common/Card';

interface TeamMemberCardProps {
  name: string;
  role: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

export const TeamMemberCard = ({ name, role, subtitle, imageSrc, imageAlt }: TeamMemberCardProps) => {
  return (
    <div className="group">
      <Card className="aspect-square mb-4 overflow-hidden p-0 border-outline-variant group-hover:border-primary transition-colors">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
          loading="lazy"
        />
      </Card>
      <p className="text-xs text-primary font-mono uppercase tracking-widest mb-1">{role}</p>
      <h4 className="text-lg font-bold text-on-surface">{name}</h4>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  );
};