
const partners = [
  { name: "KAILSHIANS", logo: "/assets/partners-logo/kailshians.png" },
  { name: "DBUU", logo: "/assets/partners-logo/dbuu.png" },
  { name: "KAILSHIANS", logo: "/assets/partners-logo/kailshians.png" },
  { name: "DBUU", logo: "/assets/partners-logo/dbuu.png" },
  { name: "KAILSHIANS", logo: "/assets/partners-logo/kailshians.png" },
  { name: "DBUU", logo: "/assets/partners-logo/dbuu.png" },
  { name: "KAILSHIANS", logo: "/assets/partners-logo/kailshians.png" },
  { name: "DBUU", logo: "/assets/partners-logo/dbuu.png" },
  { name: "KAILSHIANS", logo: "/assets/partners-logo/kailshians.png" },
  { name: "DBUU", logo: "/assets/partners-logo/dbuu.png" },
];

export default function PartnersSection() {
  return (
    <section className="c-section">
      <div className="c-sectionInner">
        <div className="c-partners" aria-label="Partner logos">
          <div className="c-partnersTrack">
            {[...partners, ...partners].map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="c-partnerLogo">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="c-partnerLogoImg"
                  loading="lazy"
                />
                <span className="c-partnerLogoName">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}