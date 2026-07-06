export default function LeadershipSection() {
  return (
    <section className="c-section">
      <div className="c-sectionInner">
        <div className="c-leadersGrid">
          <div className="c-leaderCard">
            <div className="c-leaderVisual">
              <img src="/assets/team-mates/prakash.jpeg" alt="Founder" loading="lazy" />
              <div className="c-leaderVisualOverlay" />
            </div>
            <div className="c-leaderInfo">
              <div className="c-leaderRole">Founder</div>
              <div className="c-leaderName">Prakash</div>
              <div className="c-leaderQuote">
                "Our vision has always been to create a community where innovation meets collaboration. Every builder deserves a space to grow, ship, and lead."
              </div>
              <div className="c-leaderSignature">~ Prakash</div>
            </div>
          </div>

          <div className="c-leaderCard c-leaderCardAlt">
            <div className="c-leaderVisual">
              <img src="/assets/team-mates/parul.png" alt="Co-Founder" loading="lazy" />
              <div className="c-leaderVisualOverlay" />
            </div>
            <div className="c-leaderInfo">
              <div className="c-leaderRole">Co-Founder</div>
              <div className="c-leaderName">Parul</div>
              <div className="c-leaderQuote">
                "We build with care—through mentorship, review culture, and learning that compounds. Great teams form when communication is thoughtful."
              </div>
              <div className="c-leaderSignature">~ Parul</div>
            </div>
          </div>

          <div className="c-leaderCard">
            <div className="c-leaderVisual">
              <img src="/assets/team-mates/suraj.png" alt="CTO" loading="lazy" />
              <div className="c-leaderVisualOverlay" />
            </div>
            <div className="c-leaderInfo">
              <div className="c-leaderRole">CTO</div>
              <div className="c-leaderName">Suraj</div>
              <div className="c-leaderQuote">
                "Technology is the enabler, but community is the catalyst. We're building the infrastructure for the next generation of builders."
              </div>
              <div className="c-leaderSignature">~ Suraj</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}