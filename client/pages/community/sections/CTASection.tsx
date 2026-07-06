import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="c-ctaSection">
      <div className="c-ctaDots" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="c-ctaDot"
            style={{
              left: `${10 + (i * 8) % 80}%`,
              top: `${15 + (i * 13) % 70}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + (i % 4) * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="c-ctaInner">
        <div className="c-ctaKicker">Join Community</div>
        <h2 className="c-ctaTitle">
          Ready to Build<br />
          <span className="c-ctaTitleAccent">Something Bigger?</span>
        </h2>
        <p className="c-ctaDesc">
          Join the TFC Community Today. Take part in a premium learning experience—workshops, stories, and collaborations built with intention.
        </p>
        <div className="c-ctaActions">
          <Link to="/join-event" className="c-primaryBtn">
            <span>Join Now</span>
            <span className="c-btnArrow">→</span>
          </Link>
          <Link to="/signup" className="c-secondaryBtn">
            <span>Register Now</span>
            <span className="c-btnArrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}