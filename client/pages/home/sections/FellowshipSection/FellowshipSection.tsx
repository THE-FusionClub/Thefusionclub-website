import { useScrollReveal } from "@/utils/useScrollReveal";
import "./FellowshipSection.css";

const TRACKS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 16L22 12L18 8M6 8L2 12L6 16M14.5 4L9.5 20"
          stroke="#8E51FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Software Engineering",
    description:
      "For aspiring Software Engineers to collaborate on real-world projects from our partners.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9.67102 4.13591C9.7852 2.93475 10.794 2.01733 12.0005 2.01733C13.2071 2.01733 14.2158 2.93475 14.33 4.13591C14.3972 4.89585 14.8307 5.57531 15.4915 5.95658C16.1523 6.33786 16.9575 6.37306 17.649 6.05091C18.7453 5.5532 20.0403 5.96854 20.6425 7.01101C21.2448 8.05348 20.9578 9.38282 19.979 10.0839C19.3547 10.522 18.9831 11.2368 18.9831 11.9994C18.9831 12.7621 19.3547 13.4769 19.979 13.9149C20.9578 14.616 21.2448 15.9453 20.6425 16.9878C20.0403 18.0303 18.7453 18.4456 17.649 17.9479C16.9575 17.6258 16.1523 17.661 15.4915 18.0422C14.8307 18.4235 14.3972 19.103 14.33 19.8629C14.2158 21.0641 13.2071 21.9815 12.0005 21.9815C10.794 21.9815 9.7852 21.0641 9.67102 19.8629C9.60394 19.1027 9.17034 18.4229 8.50926 18.0416C7.84817 17.6603 7.04267 17.6253 6.35102 17.9479C5.25477 18.4456 3.95978 18.0303 3.35751 16.9878C2.75524 15.9453 3.04227 14.616 4.02102 13.9149C4.64532 13.4769 5.01698 12.7621 5.01698 11.9994C5.01698 11.2368 4.64532 10.522 4.02102 10.0839C3.0437 9.3825 2.75742 8.05436 3.35901 7.01262C3.96059 5.97088 5.25403 5.555 6.35002 6.05091C7.04158 6.37306 7.84676 6.33786 8.50756 5.95658C9.16836 5.57531 9.60181 4.89585 9.66902 4.13591"
          stroke="#8E51FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12C9 13.6557 10.3443 15 12 15C13.6557 15 15 13.6557 15 12C15 10.3443 13.6557 9 12 9C10.3443 9 9 10.3443 9 12V12"
          stroke="#8E51FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Production Engineering",
    description:
      "For aspiring SREs who want to learn the skills required to keep systems running at scale.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 7.9999C20.9993 7.2861 20.6182 6.6268 20 6.2699L13 2.2699C12.3812 1.91264 11.6188 1.91264 11 2.2699L4 6.2699C3.38183 6.6268 3.00073 7.2861 3 7.9999V15.9999C3.00073 16.7137 3.38183 17.373 4 17.7299L11 21.7299C11.6188 22.0872 12.3812 22.0872 13 21.7299L20 17.7299C20.6182 17.373 20.9993 16.7137 21 15.9999V7.9999"
          stroke="#8E51FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.30005 7L12 12L20.7 7M12 22V12"
          stroke="#8E51FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Web3 Engineering",
    description:
      "For hackers who want to dive deep into blockchain and decentralized technology.",
  },
];

export default function FellowshipSection() {
  const { ref: sectionRef, isInView } = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="fellowship-section" id="fellowship">
      <div className="fellowship-container">
        <div className="fellowship-content">
          <div className={`fellowship-badge reveal ${isInView ? "is-visible" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4 1V3M8 1V3"
                stroke="#A684FF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 2H9.5C10.0519 2 10.5 2.44808 10.5 3V10C10.5 10.5519 10.0519 11 9.5 11H2.5C1.94808 11 1.5 10.5519 1.5 10V3C1.5 2.44808 1.94808 2 2.5 2V2"
                stroke="#A684FF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.5 5H10.5"
                stroke="#A684FF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>12-WEEK REMOTE INTERNSHIP</span>
          </div>

          <h2 className={`fellowship-heading reveal reveal-delay-1 ${isInView ? "is-visible" : ""}`}>
            <span className="fellowship-heading-white">JOIN OUR</span>
            <span className="fellowship-heading-purple">FELLOWSHIP</span>
          </h2>

          <p className={`fellowship-tagline reveal reveal-delay-2 ${isInView ? "is-visible" : ""}`}>Learn by doing, on a team.</p>

          <p className={`fellowship-description reveal reveal-delay-3 ${isInView ? "is-visible" : ""}`}>
            Select a program track that fits your career goals & interests. Each
            track is a fully remote, 12-week internship alternative where
            participants earn a stipend and learn to collaborate on real open
            source projects with peers and engineers from top companies.
          </p>

          <div className={`fellowship-features reveal reveal-delay-4 ${isInView ? "is-visible" : ""}`}>
            <div className="fellowship-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21.54 15.0001H17C15.8962 15.0001 15 15.8963 15 17.0001V21.5401M7.00005 3.34009V5.00009C7.00005 6.65583 8.3443 8.00009 10 8.00009C11.1046 8.00009 12 8.89552 12 10.0001C12 11.1001 12.9 12.0001 14 12.0001C15.1039 12.0001 16 11.1039 16 10.0001C16 8.90009 16.9 8.00009 18 8.00009H21.17M11 21.9501V18.0001C11 16.8963 10.1039 16.0001 9.00005 16.0001C7.89622 16.0001 7.00005 15.1039 7.00005 14.0001V13.0001C7.00005 11.8963 6.10388 11.0001 5.00005 11.0001H2.05005"
                  stroke="#8E51FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12C2 17.5192 6.48085 22 12 22C17.5192 22 22 17.5192 22 12C22 6.48085 17.5192 2 12 2C6.48085 2 2 6.48085 2 12V12"
                  stroke="#8E51FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <h4>100% REMOTE</h4>
                <p>Work from anywhere in the world.</p>
              </div>
            </div>

            <div className="fellowship-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 20.9999V18.9999C16 16.7923 14.2077 14.9999 12 14.9999H6C3.79234 14.9999 2 16.7923 2 18.9999V20.9999M16 3.12793C17.7642 3.58529 18.9962 5.1774 18.9962 6.99993C18.9962 8.82246 17.7642 10.4146 16 10.8719M22 20.9999V18.9999C21.9986 17.177 20.765 15.5856 19 15.1299"
                  stroke="#8E51FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 7C5 8.42906 5.7624 9.74957 7 10.4641C8.2376 11.1786 9.7624 11.1786 11 10.4641C12.2376 9.74957 13 8.42906 13 7C13 4.79234 11.2077 3 9 3C6.79234 3 5 4.79234 5 7H5"
                  stroke="#8E51FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <h4>COLLABORATE</h4>
                <p>Work with peers & industry engineers.</p>
              </div>
            </div>

            <div className="fellowship-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 6.99995V21M20 11V19C20 20.1038 19.1038 21 18 21H6C4.89617 21 4 20.1038 4 19V11M7.5 6.99995C6.12021 6.99995 5 5.87974 5 4.49995C5 3.12016 6.12021 1.99995 7.5 1.99995C9.47423 1.96556 11.2597 3.94944 12 6.99995C12.7403 3.94944 14.5258 1.96556 16.5 1.99995C17.8798 1.99995 19 3.12016 19 4.49995C19 5.87974 17.8798 6.99995 16.5 6.99995"
                  stroke="#8E51FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 7H20C20.5519 7 21 7.44808 21 8V10C21 10.5519 20.5519 11 20 11H4C3.44808 11 3 10.5519 3 10V8C3 7.44808 3.44808 7 4 7V7"
                  stroke="#8E51FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
            <div key={idx} className={`fellowship-track ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: isInView ? `${0.3 + idx * 0.12}s` : "0s" }}>
              <div className="fellowship-track-icon">{track.icon}</div>
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
