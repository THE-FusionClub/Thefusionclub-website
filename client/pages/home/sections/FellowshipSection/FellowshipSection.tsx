import { useScrollReveal } from "@/utils/useScrollReveal";
import "./FellowshipSection.css";

import Lottie from "lottie-web";

function LottieIcon({
  src,
  label,
  isPlaying,
  size = 40,
}: {
  src: string;
  label: string;
  isPlaying: boolean;
  size?: number;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    let anim: { destroy: () => void } | null = null;
    let mounted = true;

    if (!isPlaying) return;

    fetch(src)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted || !ref.current) return;
        anim = Lottie.loadAnimation({
          container: ref.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: data as unknown as object,
        });
      });

    return () => {
      mounted = false;
      if (anim) anim.destroy();
    };
  }, [src, isPlaying]);

  return (
    <div
      ref={ref}
      aria-label={label}
      className="fellowship-lottie"
      role="img"
      style={{ width: size, height: size, flexShrink: 0 }}
    />
  );
}

const TRACKS = [
  {
    lottie: { src: "/assets/lottie-icons/developer.json", label: "Developer" },
    title: "Tech Volunteer",
    description:
      "For aspiring Tech Volunteer to collaborate on real-world projects from our partners.",
  },
  {
    lottie: { src: "/assets/lottie-icons/announcement.json", label: "Announcement" },
    title: "Social Media Volunteer",
    description:
      "For aspiring SREs who want to learn the skills required to keep systems running at scale.",
  },
  {
    lottie: { src: "/assets/lottie-icons/attract-customer.json", label: "Attract Customer" },
    title: "Management Volunteer",
    description:
      "For hackers who want to dive deep into blockchain and decentralized technology.",
  },
];

export default function FellowshipSection() {
  const { ref: sectionRef, isInView } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="fellowship-section"
      id="fellowship"
    >
      <div className="fellowship-container">
        <div className="fellowship-content">
          <h2
            className={`fellowship-heading reveal reveal-delay-1 ${isInView ? "is-visible" : ""}`}
          >
            <span className="fellowship-heading-white">JOIN OUR</span>
            <span className="fellowship-heading-purple">FELLOWSHIP</span>
          </h2>

          <p
            className={`fellowship-tagline reveal reveal-delay-2 ${isInView ? "is-visible" : ""}`}
          >
            Learn by doing, on a team.
          </p>

          <p
            className={`fellowship-description reveal reveal-delay-3 ${isInView ? "is-visible" : ""}`}
          >
            Select a program track that fits your career goals & interests. Each
            track is a fully remote or on-site, where participants learn to collaborate on real open
            source projects with peers and engineers.
          </p>

          <div
            className={`fellowship-features reveal reveal-delay-4 ${isInView ? "is-visible" : ""}`}
          >
            <div className="fellowship-feature">
              <LottieIcon
                src="/assets/lottie-icons/globe.json"
                label="Developer"
                isPlaying={isInView}
                size={24}
              />
              <div>
                <h4>100% REMOTE</h4>
                <p>Work from anywhere in the world.</p>
              </div>
            </div>

            <div className="fellowship-feature">
              <LottieIcon
                src="/assets/lottie-icons/management.json"
                label="Management"
                isPlaying={isInView}
                size={24}
              />
              <div>
                <h4>COLLABORATE</h4>
                <p>Work with peers & industry engineers.</p>
              </div>
            </div>

            <div className="fellowship-feature">
              <LottieIcon
                src="/assets/lottie-icons/collab.json"
                label="Announcement"
                isPlaying={isInView}
                size={24}
              />
              <div>
                <h4>EARN & LEARN</h4>
                <p>Receive a stipend while you build real skills.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`fellowship-tracks reveal reveal-delay-2 ${isInView ? "is-visible" : ""}`}>
          <div className="fellowship-tracks-header">
            <span className="fellowship-dot"></span>
            <span>FIND OUT MORE</span>
          </div>

          {TRACKS.map((track, idx) => (
            <div
              key={idx}
              className={`fellowship-track ${isInView ? "is-visible" : ""}`}
              style={{ transitionDelay: isInView ? `${0.3 + idx * 0.12}s` : "0s" }}
            >
            {/* as i remove the transparent card where the icons is above it in future needed use that */}
              {/* <div className="fellowship-track-icon"> */}
                <LottieIcon
                  src={track.lottie.src}
                  label={track.lottie.label}
                  isPlaying={isInView}
                />
              {/* </div> */}
              <div className="fellowship-track-content">
                <h4>{track.title}</h4>
                <p>{track.description}</p>
              </div>
              <div className="fellowship-track-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.33337 7.99992H12.6667M8.00004 3.33325L12.6667 7.99992L8.00004 12.6666"
                    stroke="#A684FF"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}