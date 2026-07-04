export default function LeadershipSection() {
  return (
    <section className="c-section">
      <div className="c-sectionInner">
        <div className="c-leadersGrid">
          <div className="c-leaderCard">
            <div className="c-leaderVisual">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="Founder" loading="lazy" />
              <div className="c-leaderVisualOverlay" />
            </div>
            <div className="c-leaderInfo">
              <div className="c-leaderRole">Founder</div>
              <div className="c-leaderName">Alex Rivera</div>
              <div className="c-leaderQuote">
                "Our vision has always been to create a community where innovation meets collaboration. Every builder deserves a space to grow, ship, and lead."
              </div>
              <div className="c-leaderSignature">~ Alex Rivera</div>
            </div>
          </div>

          <div className="c-leaderCard c-leaderCardAlt">
            <div className="c-leaderVisual">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" alt="Co-Founder" loading="lazy" />
              <div className="c-leaderVisualOverlay" />
            </div>
            <div className="c-leaderInfo">
              <div className="c-leaderRole">Co-Founder</div>
              <div className="c-leaderName">Maya Chen</div>
              <div className="c-leaderQuote">
                "We build with care—through mentorship, review culture, and learning that compounds. Great teams form when communication is thoughtful."
              </div>
              <div className="c-leaderSignature">~ Maya Chen</div>
            </div>
          </div>

          <div className="c-leaderCard">
            <div className="c-leaderVisual">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80" alt="CTO" loading="lazy" />
              <div className="c-leaderVisualOverlay" />
            </div>
            <div className="c-leaderInfo">
              <div className="c-leaderRole">CTO</div>
              <div className="c-leaderName">Rajan Patel</div>
              <div className="c-leaderQuote">
                "Technology is the enabler, but community is the catalyst. We're building the infrastructure for the next generation of builders."
              </div>
              <div className="c-leaderSignature">~ Rajan Patel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}