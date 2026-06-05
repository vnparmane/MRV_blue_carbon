export const CommunityCard = () => {
  return (
    <div className="md:col-span-2 relative rounded-xl overflow-hidden h-full min-h-[300px]">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOZ7z9yKRewoXl-AK1Fo9KBye7UdCKpNkh6gLeAHuOzAtodBCUNSjNnac4NUwu2ajaliU4VjfsPn2Hbl26SoVhxXTethwsHAbsCAG94gC4ktuwV3NPAdSY54cvP1QKYdmD60Des5QCc4-jhzvWuwDFw1FDk_dlcut8MeCFid88HopgFv-QmzEIAAoi6rYT3LOFpecKyMY-lw7UVHUVoTX5scWCH638pkIWJ1V3xE6fOvuK80I-Rrmb4CH1ro09h6vV8RuGHr6ZFpnd"
        alt="Artistic shot of local coastal community members planting mangrove saplings in a sun-drenched tropical estuary at dawn"
        className="absolute inset-0 w-full h-full object-cover brightness-75 grayscale hover:grayscale-0 transition-all duration-1000"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent p-8 flex flex-col justify-center max-w-lg">
        <h3 className="text-2xl font-bold text-on-surface mb-4">Equitable Community Stewardship</h3>
        <p className="text-on-surface-variant leading-relaxed mb-4">
          Our MRV system isn't just about data; it's about people. We automate direct payments to
          coastal communities based on verified ecological performance, ensuring 85% of capital
          reaches the frontline stewards.
        </p>
      </div>
    </div>
  );
};