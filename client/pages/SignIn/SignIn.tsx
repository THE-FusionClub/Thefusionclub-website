import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar/Navbar";
import "./SignIn.css";

export default function SignIn() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="signin-page">
      <Navbar />

      {/* Background orbital illustrations */}
      <div className="signin-bg-right" aria-hidden>
        <svg viewBox="0 0 791 485" fill="none" className="orbit-large">
          <path
            d="M395.5 0.776C504.595 0.776 603.325 27.841 674.756 71.558C746.199 115.282 790.224 175.583 790.224 242.052C790.224 308.52 746.199 368.821 674.756 412.546C603.325 456.263 504.595 483.327 395.5 483.327C286.405 483.327 187.675 456.263 116.244 412.546C44.801 368.821 0.776 308.52 0.776 242.052C0.776 175.583 44.801 115.282 116.244 71.558C187.675 27.841 286.405 0.776 395.5 0.776Z"
            stroke="url(#orbitGrad1)"
            strokeWidth="1.55"
          />
          <defs>
            <linearGradient id="orbitGrad1" x1="250" y1="652" x2="373" y2="109" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="0.508" stopColor="#30FFFF" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <svg viewBox="0 0 469 294" fill="none" className="orbit-medium">
          <path
            d="M234.042 1.035C298.507 1.035 356.82 17.416 398.984 43.846C441.163 70.284 467.048 106.678 467.048 146.705C467.048 186.732 441.163 223.126 398.984 249.564C356.82 275.994 298.507 292.375 234.042 292.375C169.577 292.375 111.263 275.994 69.099 249.564C26.92 223.126 1.035 186.732 1.035 146.705C1.035 106.678 26.92 70.284 69.099 43.846C111.263 17.416 169.577 1.035 234.042 1.035Z"
            stroke="url(#orbitGrad2)"
            strokeWidth="2.07"
            fill="url(#orbitFill2)"
          />
          <defs>
            <radialGradient id="orbitFill2" cx="0" cy="0" r="1"
              gradientTransform="matrix(175.893 -196.551 313.562 350.388 7.5 281.8)" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="0.462" stopColor="#3A45AA" />
              <stop offset="1" stopColor="#3A45AA" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="orbitGrad2" x1="115" y1="288" x2="252" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="0.443" stopColor="#30FFFF" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <svg viewBox="0 0 331 202" fill="none" className="orbit-small">
          <path
            d="M165.028 0.646C210.5 0.646 251.636 11.928 281.383 30.134C311.141 48.346 329.409 73.42 329.409 101C329.409 128.58 311.14 153.653 281.383 171.865C251.636 190.071 210.5 201.352 165.028 201.353C119.556 201.353 78.42 190.071 48.673 171.865C18.915 153.653 0.646 128.58 0.646 101C0.646 73.42 18.915 48.346 48.673 30.134C78.42 11.928 119.556 0.646 165.028 0.646Z"
            stroke="url(#orbitGrad3)"
            strokeWidth="1.29"
          />
          <defs>
            <linearGradient id="orbitGrad3" x1="81" y1="198" x2="162" y2="1" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="0.508" stopColor="#30FFFF" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glowing blob */}
        <div className="signin-blob-purple" />
        <div className="signin-blob-blue" />
      </div>

      {/* Person illustration */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/40038aa9b50f306668121b00865a534f5a8f7aa4?width=1038"
        alt="Designer working"
        className="signin-person"
      />

      <main className="signin-main">
        {/* Welcome banner */}
        <div className="signin-welcome">
          <h1>Welcome Back</h1>
        </div>

        {/* Contact card */}
        <div className="signin-card">
          <div className="signin-card-left">
            <p className="signin-card-text">
              Ready to revolutionize your UI? Our team of Swift UI designers is
              here to collaborate, innovate, and create something extraordinary.
              Contact us today to unlock the full potential of your interface
            </p>
            <div className="signin-contact-info">
              <div className="signin-contact-item">
                <div className="signin-contact-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="20" fill="white" fillOpacity="0.3" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.1409 12.4021C10.3402 10.9296 11.6396 10 12.99 10H15.5585C16.8498 10 17.9962 10.8263 18.4045 12.0513L19.454 15.1996C19.905 16.5528 19.1086 18.0036 17.7248 18.3496C17.3865 18.4342 17.2697 18.8555 17.5164 19.1022L20.8978 22.4836C21.1445 22.7303 21.5658 22.6135 21.6504 22.2752C21.9964 20.8914 23.4472 20.095 24.8004 20.546L27.9487 21.5955C29.1737 22.0038 30 23.1502 30 24.4415V27.01C30 28.3604 29.0704 29.6598 27.5979 29.8591C26.9114 29.9521 26.211 30 25.5 30C16.9396 30 10 23.0604 10 14.5C10 13.789 10.0479 13.0886 10.1409 12.4021Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span>0322-1234567</span>
              </div>
              <div className="signin-contact-item">
                <div className="signin-contact-icon">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/696801c9760ad1d38daac6148ae453ef8484b595?width=40"
                    alt="Email"
                    width={20}
                    height={16}
                  />
                </div>
                <span>abc123@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="signin-card-right">
            <h2 className="signin-form-title">Book a meeting</h2>
            <p className="text-sm text-slate-200 mb-4">
              Prefer to keep in touch? Use the form below and we will contact you with the next steps.
            </p>
            <form className="signin-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="signin-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="signin-input"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="signin-input"
              />
              <textarea
                name="message"
                placeholder="Your message"
                value={form.message}
                onChange={handleChange}
                className="signin-textarea"
                rows={6}
              />
              <button type="submit" className="signin-submit">
                Send message
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Simple footer row */}
      <div className="signin-footer">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/de52b4b21c6273d2d5c5e63060618755a20db2c1?width=122"
          alt="TFC"
          width={61}
          height={30}
        />
        <p>Empowering the next generation of software creators through hackathons, fellowships, and community.</p>
        <div className="signin-footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/events">Events</Link>
        </div>
        <span className="signin-footer-copy">© {new Date().getFullYear()} The Fusion Club. All rights reserved.</span>
      </div>
    </div>
  );
}
