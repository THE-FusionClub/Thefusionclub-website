import { useScrollReveal } from "@/utils/useScrollReveal";
import "./EcosystemSection.css";

export default function EcosystemSection() {
  const { ref: sectionRef, isInView } = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="ecosystem-section">
      <div className="ecosystem-inner">
        <div className="ecosystem-cards-top">
          <div className="ecosystem-card-left hover-glow">
            <div className="ecosystem-card-icon">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <g clipPath="url(#clip0)">
                  <path
                    d="M9.64282 31.045V64.4216C9.64282 65.4883 10.2117 66.4745 11.1353 67.0085L11.1372 67.0098L14.2442 68.8038V33.7017L9.64282 31.045Z"
                    fill="#C4C4C4"
                  />
                  <path
                    d="M18.8455 70.998V63.8992V37.2316V36.3583L14.2441 33.7017V68.8038L17.3512 70.5973L17.3542 70.599C17.8158 70.8648 18.3307 70.998 18.8455 70.998Z"
                    fill="#C4C4C4"
                  />
                  <path
                    d="M9.64288 27.0601L9.64282 31.045L14.2442 33.7016L18.8456 36.3583L18.8457 32.3733L9.64288 27.0601Z"
                    fill="#6A3FA5"
                  />
                  <path
                    d="M9.64283 24.7023L9.64282 27.06L18.8457 32.3732V30.0155L9.64283 24.7023Z"
                    fill="#6A3FA5"
                  />
                  <path
                    d="M18.8456 30.0156C18.8456 28.9478 19.4153 27.9612 20.34 27.4273L22.6376 26.1007L13.4348 20.7875L11.1372 22.114C10.2125 22.6479 9.64282 23.6346 9.64282 24.7023L18.8456 30.0156Z"
                    fill="#8E5DB9"
                  />
                  <path
                    d="M14.9973 19.8855L13.4351 20.7875L22.6379 26.1007L24.2001 25.1988L14.9973 19.8855Z"
                    fill="#6A3FA5"
                  />
                  <path
                    d="M54.7381 5.84225L48.5238 2.25454C47.5991 1.72066 46.4598 1.72066 45.5351 2.25454L14.9973 19.8855L24.2001 25.1988L55.8318 6.93618C55.5738 6.48931 55.2001 6.10921 54.7381 5.84225Z"
                    fill="#8E5DB9"
                  />
                </g>
              </svg>
            </div>
            <div className="ecosystem-card-content">
              <h3 className="ecosystem-card-title">Community partners</h3>
              <p className="ecosystem-card-desc">
                Get everything you need to support and run amazing hackathons
                and developer events.
              </p>
            </div>
            {/* <button className="ecosystem-card-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.33325 8.00004H12.6666M8.00004 12.6667L12.6667 8.00004L8.00004 3.33337"
                  stroke="#9A1FFF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button> */}
          </div>

          <div className="ecosystem-card-right hover-glow reveal-delay-1">
            <div className="ecosystem-card-icon">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c94975a1b6b6a7e755e3cbf0e313c10b6fdda617?width=144"
                alt="TFC"
              />
            </div>
            <div className="ecosystem-card-content">
              <h3 className="ecosystem-card-title">Collab with TFC</h3>
              <p className="ecosystem-card-desc">
                Collaborate & Sponsor With UsReach Best developers building the
                future.
              </p>
            </div>
            {/* <button className="ecosystem-card-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.33337 8.00004H12.6667M8.00004 12.6667L12.6667 8.00004L8.00004 3.33337"
                  stroke="#9040FF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button> */}
          </div>
        </div>

        <div className="ecosystem-content">
          <div className="ecosystem-text">
            <div className={`ecosystem-label reveal ${isInView ? "is-visible" : ""}`}>BUILT FOR COMMUNITY PARTNERS.</div>
            <h2 className={`ecosystem-heading reveal reveal-delay-1 ${isInView ? "is-visible" : ""}`}>CONNECTING THE TECH ECOSYSTEM</h2>
            <div className={`ecosystem-border-text reveal reveal-delay-2 ${isInView ? "is-visible" : ""}`}>
              <p>
                Discover meaningful ways to collaborate with developer
                communities and support real-world hackathons & events.
              </p>
            </div>
            <p className={`ecosystem-description reveal reveal-delay-3 ${isInView ? "is-visible" : ""}`}>
              TFC is where you build. We've created a home for software
              creators at every stage. Build something at a hackathon. Write
              about what you learned. That knowledge becomes permanent,
              searchable, and useful to the next person. Partners like DBUU
              support our community. TFC is where your brand becomes part of
              the builder journey.
            </p>

            <div className={`ecosystem-socials reveal reveal-delay-4 ${isInView ? "is-visible" : ""}`}>
              <p className="ecosystem-socials-label">Connect with us:</p>
              <div className={`ecosystem-socials-grid stagger-children ${isInView ? "is-visible" : ""}`}>
                <a href="https://www.linkedin.com/company/the-fusion-club-page/" className="ecosystem-social">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M19 3C20.1038 3 21 3.89617 21 5V19C21 20.1038 20.1038 21 19 21H5C3.89617 21 3 20.1038 3 19V5C3 3.89617 3.89617 3 5 3H19ZM18.5 18.5V13.2C18.5 11.4008 17.0392 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C15.0832 12.17 15.71 12.7968 15.71 13.57V18.5H18.5ZM6.88 8.56C7.80784 8.56 8.56 7.80784 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C5.94664 5.19 5.19 5.94664 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/the_fusionclub" className="ecosystem-social">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4033 19.4033 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.59889 4.59889 2 7.8 2ZM7.6 4C5.61177 4 4 5.61177 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C18.3882 20 20 18.3882 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.9399 5.5 18.5 6.06011 18.5 6.75C18.5 7.43989 17.9399 8 17.25 8C16.5601 8 16 7.43989 16 6.75C16 6.06011 16.5601 5.5 17.25 5.5ZM12 7C14.7596 7 17 9.24043 17 12C17 14.7596 14.7596 17 12 17C9.24043 17 7 14.7596 7 12C7 9.24043 9.24043 7 12 7ZM12 9C10.3443 9 9 10.3443 9 12C9 13.6557 10.3443 15 12 15C13.6557 15 15 13.6557 15 12C15 10.3443 13.6557 9 12 9Z" />
                  </svg>
                </a>
                <a href="https://x.com/TheFusionClubb" className="ecosystem-social">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24" fill="white">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>

                </a>
                <a href="https://www.youtube.com/@thefusionclubofficial" className="ecosystem-social">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
  <path d="M23.498 6.186a2.966 2.966 0 0 0-2.092-2.094C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.406.592A2.966 2.966 0 0 0 .502 6.186 30.89 30.89 0 0 0 0 12a30.89 30.89 0 0 0 .502 5.814 2.966 2.966 0 0 0 2.092 2.094C4.495 20.5 12 20.5 12 20.5s7.505 0 9.406-.592a2.966 2.966 0 0 0 2.092-2.094A30.89 30.89 0 0 0 24 12a30.89 30.89 0 0 0-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z"/>
</svg>
                </a>
              </div>
            </div>
          </div>

          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/583c4c3a338f800ee5d6e495104101afc493744b?width=1216"
            alt="Tech Ecosystem"
            className={`ecosystem-image reveal reveal-delay-2 ${isInView ? "is-visible" : ""}`}
          />
        </div>
      </div>
    </section>
  );
}
