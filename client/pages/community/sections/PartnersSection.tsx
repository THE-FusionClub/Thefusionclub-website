const partners = ["Google", "Microsoft", "AWS", "Figma", "Notion", "Vercel", "GitHub", "Linear", "Supabase", "Railway"];

export default function PartnersSection() {
  return (
    <section className="c-section">
      <div className="c-sectionInner">
        <div className="c-partners" aria-label="Partner logos">
          <div className="c-partnersTrack">
            {[...partners, ...partners].map((name, i) => (
              <div key={`${name}-${i}`} className="c-partnerLogo">{name}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}