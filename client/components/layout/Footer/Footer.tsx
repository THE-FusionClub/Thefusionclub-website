import { Link } from "react-router-dom";
import "./Footer.css";

const FOOTER_LINKS = {
  Programs: ["Hackathons", "Fellowship", "Workshops", "Demo Day"],
  Explore: ["Home", "About", "Events", "Join"],
  Company: ["About", "Team", "Sign In", "Sign Up"],
};

const SOCIAL_ICONS = [
  {
    name: "Twitter",
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M16.845 4.5C16.2675 4.7625 15.645 4.935 15 5.0175C15.66 4.62 16.17 3.99 16.41 3.2325C15.7875 3.6075 15.0975 3.87 14.37 4.02C13.7775 3.375 12.945 3 12 3C10.2375 3 8.79753 4.44 8.79753 6.2175C8.79753 6.4725 8.82753 6.72 8.88003 6.9525C6.21003 6.8175 3.83253 5.535 2.25003 3.5925C1.97253 4.065 1.81503 4.62 1.81503 5.205C1.81503 6.3225 2.37753 7.3125 3.24753 7.875C2.71503 7.875 2.22003 7.725 1.78503 7.5V7.5225C1.78503 9.0825 2.89503 10.3875 4.36503 10.68C3.89316 10.8097 3.39756 10.8277 2.91753 10.7325C3.33521 12.0434 4.54189 12.9424 5.91753 12.9675C4.78028 13.8679 3.37054 14.3545 1.92003 14.3475C1.66503 14.3475 1.41003 14.3325 1.15503 14.3025C2.58003 15.2175 4.27503 15.75 6.09003 15.75C12 15.75 15.2475 10.845 15.2475 6.5925C15.2475 6.45 15.2475 6.315 15.24 6.1725C15.87 5.7225 16.41 5.1525 16.845 4.5Z"
          fill="#90A1B9"
        />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 1.5C4.86064 1.5 1.5 4.86064 1.5 9C1.5 12.315 3.6525 15.1275 6.63 16.125C7.005 16.185 7.125 15.9525 7.125 15.75V14.4825C5.0475 14.9325 4.605 13.4775 4.605 13.4775C4.26 12.6075 3.7725 12.375 3.7725 12.375C3.09 11.91 3.825 11.925 3.825 11.925C4.575 11.9775 4.9725 12.6975 4.9725 12.6975C5.625 13.8375 6.7275 13.5 7.155 13.32C7.2225 12.8325 7.4175 12.5025 7.6275 12.315C5.9625 12.1275 4.215 11.4825 4.215 8.625C4.215 7.7925 4.5 7.125 4.9875 6.5925C4.9125 6.405 4.65 5.625 5.0625 4.6125C5.0625 4.6125 5.6925 4.41 7.125 5.3775C7.7175 5.2125 8.3625 5.13 9 5.13C9.6375 5.13 10.2825 5.2125 10.875 5.3775C12.3075 4.41 12.9375 4.6125 12.9375 4.6125C13.35 5.625 13.0875 6.405 13.0125 6.5925C13.5 7.125 13.785 7.7925 13.785 8.625C13.785 11.49 12.03 12.12 10.3575 12.3075C10.6275 12.54 10.875 12.9975 10.875 13.695V15.75C10.875 15.9525 10.995 16.1925 11.3775 16.125C14.355 15.12 16.5 12.315 16.5 9C16.5 4.86064 13.1394 1.5 9 1.5Z"
          fill="#90A1B9"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M14.25 2.25C15.0779 2.25 15.75 2.92213 15.75 3.75V14.25C15.75 15.0779 15.0779 15.75 14.25 15.75H3.75C2.92213 15.75 2.25 15.0779 2.25 14.25V3.75C2.25 2.92213 2.92213 2.25 3.75 2.25H14.25ZM13.875 13.875V9.9C13.875 8.54966 12.7803 7.455 11.43 7.455C10.7925 7.455 10.05 7.845 9.69 8.43V7.5975H7.5975V13.875H9.69V10.1775C9.69 9.6 10.155 9.1275 10.7325 9.1275C11.3124 9.1275 11.7825 9.5976 11.7825 10.1775V13.875H13.875ZM5.16 6.42C5.85588 6.42 6.42 5.85588 6.42 5.16C6.42 4.4625 5.8575 3.8925 5.16 3.8925C4.46045 3.8925 3.8925 4.46045 3.8925 5.16C3.8925 5.8575 4.4625 6.42 5.16 6.42ZM6.2025 13.875V7.5975H4.125V13.875H6.2025Z"
          fill="#90A1B9"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/104ef12df03611ad61a00811fd4cf926fbae26bd?width=122"
            alt="TFC"
            width={61}
            height={30}
          />
          <p className="footer-tagline">
            Empowering the next generation of software creators through
            hackathons, fellowships, and community.
          </p>
          <div className="footer-socials">
            {SOCIAL_ICONS.map((icon) => (
              <a
                key={icon.name}
                href={icon.href}
                className="footer-social-link"
                aria-label={icon.name}
              >
                {icon.svg}
              </a>
            ))}
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
          <div key={category} className="footer-column">
            <h4 className="footer-column-title">{category}</h4>
            <ul className="footer-column-links">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    to={
                      link === "Home"
                        ? "/"
                        : link === "About"
                        ? "/about"
                        : link === "Events"
                        ? "/events"
                        : link === "Join"
                        ? "/join-event"
                        : link === "Sign In"
                        ? "/signin"
                        : link === "Sign Up"
                        ? "/signup"
                        : "/"
                    }
                    className="footer-link"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} The Fusion Club (TFC). All rights reserved.</p>
      </div>
    </footer>
  );
}
