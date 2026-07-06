import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <header className="c-hero">
      <div className="c-heroInner">
        <div className="c-heroLeft">
          <h1 className="c-heroTitle">
            More Than Events.<br />
            <span className="c-heroTitleAccent">We Build Experiences.</span>
          </h1>
          <p className="c-heroDesc">
            Every workshop, every meetup, every event, and every collaboration strengthens the TFC Community.
            Explore our journey, our people, and the memories we've created together.
          </p>
          <div className="c-heroActions">
            <Link to="/join-event" className="c-primaryBtn">
              <span>Join Community</span>
              <span className="c-btnArrow">→</span>
            </Link>
            <a href="#gallery" className="c-secondaryBtn">
              <span>Explore Gallery</span>
              <span className="c-btnArrow">→</span>
            </a>
          </div>
        </div>

        <div className="c-heroRight">
          <div className="c-heroCollage">
            <div className="c-heroCollageImg">
              <img
                src="/assets/community/trip-1.jpeg"
                alt="Community event"
                loading="lazy"
              />
            </div>
            <div className="c-heroCollageImg">
              <img
                src="/assets/community/idea-1.jpg"
                alt="Team collaboration"
                loading="lazy"
              />
            </div>
            <div className="c-heroCollageImg">
              <img
                src="/assets/colored-logo.png"
                alt="Workshop"
                loading="lazy"
              />
            </div>
            <div className="c-heroCollageImg">
              <img
                src="/assets/community/L-1.png"
                alt="Networking"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}