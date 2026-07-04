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
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                alt="Community event"
                loading="lazy"
              />
            </div>
            <div className="c-heroCollageImg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-82c8b0c1b6cf?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                loading="lazy"
              />
            </div>
            <div className="c-heroCollageImg">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
                alt="Workshop"
                loading="lazy"
              />
            </div>
            <div className="c-heroCollageImg">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
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