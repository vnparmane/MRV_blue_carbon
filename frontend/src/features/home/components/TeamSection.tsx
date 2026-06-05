import { TeamMemberCard } from './TeamMemberCard';
import { PartnerLogos } from './PartnerLogos';

export const TeamSection = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-8 mb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-on-surface mb-2">Strategic Governance</h2>
          <div className="w-24 h-1 bg-primary" />
        </div>
        <p className="text-on-surface-variant max-w-md text-sm italic">
          "Transparency is the only bridge between biological reality and institutional trust."
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <TeamMemberCard
          name="Goat Vedant Parmane"
          role="Chief Scientist & Founder "
          subtitle="A-I Researcher @Matoshree A-304 | Ex-DeepMind"
          imageSrc="/win8.jpg"
          imageAlt="Professional portrait of a scientist in a modern lab setting with subtle blue lighting accents"
        />
        <TeamMemberCard
          name="Yuvraj badhi"
          role="Systems Architect"
          subtitle="Blockchain Protocol Lead"
          imageSrc="/ss124.png"
          imageAlt="Confident female executive portrait with futuristic architectural background, soft natural light"
        />
        <PartnerLogos />
      </div>
    </section>
  );
};