import React, { useEffect, useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const profile = {
  name: "Dibyajyoti Mohanty",
  role: "Java Full Stack Developer",
  tagline:
    "B.Tech Computer Science graduate building Core Java, Spring Boot, ReactJS, Oracle SQL, AWS, and DevSecOps-ready project workflows.",
  location: "Cuttack, Odisha",
  email: "dibyajyotimty508@gmail.com",
  phone: "+91 63700 24589",
  linkedin: "https://www.linkedin.com/in/dibyajyoti-mohanty-1640b7256/",
  github: "https://github.com/Dibyajyoti03",
  resume: "assets/Dibyajyoti_Resume_Updated.docx",
};

const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Training", href: "#training" },
  { label: "Contact", href: "#contact" },
];

const proofPoints = [
  { value: "CGPA 6.7", label: "B.Tech Computer Science" },
  { value: "Skillifyz", label: "Core Java internship" },
  { value: "Spring + AWS", label: "Backend direction" },
];

const skillGroups = [
  {
    title: "Languages",
    icon: "bi-braces",
    items: ["Java", "Python", "JavaScript (ES6+)", "C"],
  },
  {
    title: "Backend",
    icon: "bi-hdd-network",
    items: ["Java", "Spring Framework", "Spring Boot", "Microservices"],
  },
  {
    title: "Frontend",
    icon: "bi-window-sidebar",
    items: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "ReactJS"],
  },
  {
    title: "Database",
    icon: "bi-database",
    items: ["Oracle SQL", "PL/SQL"],
  },
  {
    title: "Cloud",
    icon: "bi-cloud",
    items: ["AWS EC2", "AWS S3", "AWS IAM"],
  },
  {
    title: "DevSecOps",
    icon: "bi-shield-check",
    items: ["Docker", "Maven", "SonarQube", "Jira", "ELK Stack", "Jenkins", "Chef", "Heroku", "JUnit", "SLF4J", "CloudWatch", "Mockito", "GitHub", "JMeter", "Gradle", "Datadog", "Codex"],
  },
  {
    title: "AI & Soft Skills",
    icon: "bi-lightning-charge",
    items: ["ChatGPT", "Google Gemini", "Claude", "Good Communication", "Quick Learner", "Attention to Detail", "Time Management", "Team Collaboration", "Problem Solving"],
  },
];

const projects = [
  {
    name: "E-Commerce Website",
    type: "Full-stack e-commerce",
    url: "https://github.com/Dibyajyoti03/ecommerce-website",
    stack: ["ReactJS", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
    details: [
      "Built a full-stack E-Commerce platform with product listing, search/filter, shopping cart, and user authentication.",
      "Implemented responsive UI using ReactJS component architecture and React Router for navigation.",
    ],
  },
  {
    name: "Simple Banking Application",
    type: "Core Java console app",
    url: "https://github.com/Dibyajyoti03/banking-app",
    stack: ["Core Java", "File I/O"],
    details: [
      "Designed and implemented a console-based banking app covering account creation, deposit, withdrawal, and balance enquiry.",
      "Applied Java fundamentals and modular code structure for account management.",
    ],
  },
  {
    name: "Face Recognition Attendance System",
    type: "Computer vision project",
    url: "https://github.com/Dibyajyoti03/face-recognition-attendance",
    stack: ["Python", "OpenCV", "Machine Learning", "Face Recognition Library"],
    details: [
      "Developed an automated attendance system using real-time face detection and recognition with OpenCV.",
      "Trained a face recognition model to identify students and log attendance with timestamps to CSV/database storage.",
    ],
  },
  {
    name: "Cyberbullying Detection in Hinglish",
    type: "ML and NLP project",
    url: "https://github.com/Dibyajyoti03/cyberbullying-detection",
    stack: ["Python", "NLP", "Machine Learning", "Scikit-learn"],
    details: [
      "Built an ML model to classify Hinglish Hindi and English social media text as bullying or non-bullying.",
      "Performed preprocessing, TF-IDF feature extraction, and trained classifiers achieving strong accuracy.",
    ],
  },
  {
    name: "AniMetro.in",
    type: "Responsive static site",
    url: "https://github.com/Dibyajyoti03/animetro",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    details: [
      "Designed and deployed a static anime listing website with responsive layout and smooth UI interactions.",
      "Built modern sections for content presentation, spacing, typography, and mobile behavior.",
    ],
  },
];

const timeline = [
  {
    date: "Jan 2026 - Feb 2026",
    title: "Core Java Internship - Skillifyz Technologies",
    detail: "Weekly Java tasks across Core Java, File I/O, and menu-driven applications.",
  },
  {
    date: "2024",
    title: "Web Development Internship - InternPe",
    detail: "Hands-on HTML, CSS, JavaScript, and ReactJS experience through responsive web pages.",
  },
  {
    date: "2021 - 2025",
    title: "Bachelor of Technology - Computer Science",
    detail: "SUIIT, Sambalpur University - CGPA 6.7 / 10.",
  },
  {
    date: "Mar 2021",
    title: "12th Science",
    detail: "D.A.V Public School, Kukatpally, Hyderabad - 70.01%.",
  },
  {
    date: "Mar 2019",
    title: "10th",
    detail: "D.A.V Public School, CDA Sector-6, Cuttack - 77.8%.",
  },
];

function Loader({ isLoading }) {
  return (
    <div className={`site-loader ${isLoading ? "" : "loader-hidden"}`} aria-hidden={!isLoading}>
      <div className="loader-card">
        <div className="loader-orbit">
          <span>Java</span>
          <span>React</span>
          <span>AWS</span>
          <strong>DM</strong>
        </div>
        <p>Preparing portfolio</p>
        <div className="loader-bar">
          <span></span>
        </div>
      </div>
    </div>
  );
}

function ThemeSwitch({ theme, onThemeChange }) {
  return (
    <div className="theme-switch" role="group" aria-label="Theme selection">
      <button
        className={theme === "light" ? "active" : ""}
        type="button"
        onClick={() => onThemeChange("light")}
        aria-pressed={theme === "light"}
      >
        <i className="bi bi-sun-fill"></i>
        <span>Light</span>
      </button>
      <button
        className={theme === "dark" ? "active" : ""}
        type="button"
        onClick={() => onThemeChange("dark")}
        aria-pressed={theme === "dark"}
      >
        <i className="bi bi-moon-stars-fill"></i>
        <span>Dark</span>
      </button>
    </div>
  );
}

function Header({ theme, onThemeChange }) {
  const [activeSection, setActiveSection] = useState("profile");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href));
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);

      let current = sections[0];
      sections.forEach((section) => {
        if (section && section.getBoundingClientRect().top <= 150) {
          current = section;
        }
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top site-nav ${isScrolled ? "site-nav-scrolled" : ""}`}>
      <div className="container">
        <a className="navbar-brand brand-mark" href="#home" aria-label="Dibyajyoti Mohanty home">
          DM
        </a>
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="portfolioNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.href}>
                <a
                  className={`nav-link ${activeSection === item.href.slice(1) ? "active" : ""}`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <a className="btn btn-sm nav-cta" href={profile.resume} download onClick={() => setIsMenuOpen(false)}>
              <i className="bi bi-download"></i>
              Resume
            </a>
          </div>
        </div>
        <div className="nav-utility">
          <ThemeSwitch theme={theme} onThemeChange={onThemeChange} />
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="portfolioNavbar"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const nameWords = profile.name.split(" ");

  return (
    <header className="hero-section" id="home">
      <div className="motion-sweep" aria-hidden="true"></div>
      <div className="hero-backdrop" aria-hidden="true"></div>
      <div className="hero-code" aria-hidden="true">
        <span>JavaService.build()</span>
        <span>SpringBoot.run()</span>
        <span>React.render()</span>
        <span>AWS.deploy()</span>
      </div>
      <div className="container">
        <div className="row g-4 align-items-stretch hero-row">
          <div className="col-lg-9">
            <div className="hero-card card-surface section-reveal">
              <p className="eyebrow">Java Fullstack Developer</p>
              <h1>
                {nameWords.map((word) => (
                  <span className="hero-name-word" key={word}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className="hero-role">{profile.role}</p>
              <p className="hero-copy">{profile.tagline}</p>
              <div className="hero-actions">
                <a className="btn btn-accent" href="#projects">
                  <i className="bi bi-grid-1x2"></i>
                  See Projects
                </a>
                <a className="btn btn-ghost" href={profile.resume} download>
                  <i className="bi bi-file-earmark-person"></i>
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="proof-strip section-reveal" aria-label="Profile highlights">
          {proofPoints.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function Profile() {
  return (
    <section className="section-padding profile-section" id="profile">
      <div className="container">
        <div className="section-head section-reveal">
          <p className="eyebrow">Profile Summary</p>
        </div>
        <div className="row g-4">
          <div className="col-lg-7">
            <article className="story-card card-surface section-reveal">
              <h3>Java full stack candidate with proof across backend, frontend, cloud, and AI-assisted delivery.</h3>
              <p>
                I bring a recruiter-friendly mix of Core Java, Spring Boot, ReactJS, Oracle SQL, AWS fundamentals, and
                DevSecOps tooling. My Skillifyz internship has strengthened my Core Java, File I/O, and menu-driven
                Java application practice.
              </p>
              <p>
                My portfolio shows practical work across e-commerce flows, banking logic, face-recognition attendance,
                and NLP classification. I am looking for a remote Java Full Stack role where I can learn fast, ship
                clean features, and grow into a dependable engineering teammate.
              </p>
            </article>
          </div>
          <div className="col-lg-5">
            <div className="profile-card-grid">
              <article className="metric-card section-reveal">
                <span>Based in</span>
                <strong>{profile.location}</strong>
              </article>
              <article className="metric-card section-reveal">
                <span>Target role</span>
                <strong>Remote, Onsite, or Hybrid Java Full Stack</strong>
              </article>
              <article className="metric-card section-reveal">
                <span>Best fit</span>
                <strong>Java, Spring + React teams</strong>
              </article>
              <article className="metric-card section-reveal">
                <span>Open for</span>
                <strong className="role-list">
                  Software Development
                  <br />
                  Frontend Developer
                  <br />
                  Java Developer
                  <br />
                  ReactJS Developer
                </strong>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section-padding skill-section" id="skills">
      <div className="container">
        <div className="section-head section-reveal">
          <p className="eyebrow">Technical Skills</p>
        </div>
        <div className="skill-grid">
          {skillGroups.map((skill) => (
            <article className="skill-panel card-surface section-reveal" key={skill.title}>
              <i className={`bi ${skill.icon}`}></i>
              <h3>{skill.title}</h3>
              <div className="chip-wrap">
                {skill.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section-padding project-section" id="projects">
      <div className="container">
        <div className="section-head section-reveal">
          <p className="eyebrow">Projects</p>
        </div>
        <div className="project-deck">
          {projects.map((project, index) => (
            <article className="project-card card-surface section-reveal" key={project.name}>
              <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="project-main">
                <p className="eyebrow">{project.type}</p>
                <h3>{project.name}</h3>
                <div className="chip-wrap">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <ul>
                {project.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                <i className="bi bi-github"></i>
                View GitHub
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Training() {
  return (
    <section className="section-padding flow-section" id="training">
      <div className="container">
        <div className="section-head section-reveal">
          <p className="eyebrow">Internships & Education</p>
        </div>
        <div className="timeline-card card-surface section-reveal">
          <div className="timeline-list">
            {timeline.map((item) => (
              <article className="timeline-item" key={`${item.date}-${item.title}`}>
                <span>{item.date}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section-padding contact-section" id="contact">
      <div className="container">
        <div className="contact-card card-surface section-reveal">
          <p className="eyebrow">Contact</p>
          <h2>Open to remote, hybrid, and onsite Java Full Stack Developer opportunities.</h2>
          <p className="cert-line">
            Certification: Web Development Certification - InternPe, 2024.
          </p>
          <p>
            Based in {profile.location}, available for remote, hybrid, and onsite Java Full Stack Developer roles and
            web projects where I can contribute quickly through real delivery.
          </p>
          <div className="contact-actions">
            <a className="btn btn-accent" href={`mailto:${profile.email}`}>
              <i className="bi bi-envelope"></i>
              {profile.email}
            </a>
            <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              <i className="bi bi-linkedin"></i>
              LinkedIn
            </a>
            <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
              <i className="bi bi-github"></i>
              GitHub
            </a>
            <a className="btn btn-ghost" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              <i className="bi bi-telephone"></i>
              {profile.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = document.querySelectorAll(".section-reveal");

    if (prefersReducedMotion || !gsap) {
      revealElements.forEach((element) => element.classList.add("in-view"));
      return;
    }

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    document.querySelectorAll(".hero-section .section-reveal").forEach((element) => {
      element.classList.add("in-view");
    });

    gsap.set(".motion-sweep", { xPercent: -110, opacity: 1 });
    gsap.set(".scroll-progress", { scaleX: 0, transformOrigin: "0% 50%" });
    gsap.set(".site-nav", { y: -42, opacity: 0 });
    gsap.set(".hero-card .eyebrow", { y: 28, opacity: 0 });
    gsap.set(".hero-name-word", {
      yPercent: 112,
      opacity: 0,
      rotateX: -72,
      transformOrigin: "50% 100%",
    });
    gsap.set(".hero-role, .hero-copy", { y: 42, opacity: 0, filter: "blur(10px)" });
    gsap.set(".hero-actions .btn", { y: 30, opacity: 0, scale: 0.94 });
    gsap.set(".proof-strip div", { y: 36, opacity: 0, scale: 0.94 });
    gsap.set(".hero-code span", { x: 42, opacity: 0, rotate: -2 });

    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    intro
      .to(".motion-sweep", { xPercent: 110, duration: 1.05, ease: "expo.inOut" })
      .to(".motion-sweep", { opacity: 0, duration: 0.2 })
      .to(".site-nav", { y: 0, opacity: 1, duration: 0.75 }, "-=0.95")
      .to(".hero-card .eyebrow", { y: 0, opacity: 1, duration: 0.72 }, "-=0.52")
      .to(
        ".hero-name-word",
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.05, stagger: 0.14 },
        "-=0.55"
      )
      .to(
        ".hero-role, .hero-copy",
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.82, stagger: 0.12 },
        "-=0.62"
      )
      .to(
        ".hero-actions .btn",
        { y: 0, opacity: 1, scale: 1, duration: 0.62, stagger: 0.11 },
        "-=0.48"
      )
      .to(
        ".hero-code span",
        { x: 0, opacity: 1, rotate: 0, duration: 0.7, stagger: 0.08 },
        "-=0.56"
      )
      .to(
        ".proof-strip div",
        { y: 0, opacity: 1, scale: 1, duration: 0.72, stagger: 0.12 },
        "-=0.36"
      );

    const backdropTween = gsap.to(".hero-backdrop", {
      yPercent: 8,
      xPercent: -2,
      duration: 7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const proofTween = gsap.to(".proof-strip div", {
      y: -6,
      duration: 1.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.16,
      delay: 1.6,
    });

    const progressTween = gsap.to(".scroll-progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });

    const heroDepthTween = gsap.to(".hero-card", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const codeDepthTween = gsap.to(".hero-code", {
      yPercent: -16,
      rotate: 1.5,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const hoverTargets = document.querySelectorAll(
      ".story-card, .skill-panel, .project-card, .metric-card, .contact-card"
    );
    const hoverCleanups = Array.from(hoverTargets).map((element) => {
      const lift = () => gsap.to(element, { y: -8, scale: 1.01, duration: 0.28, ease: "power2.out" });
      const settle = () => gsap.to(element, { y: 0, scale: 1, duration: 0.34, ease: "power2.out" });
      element.addEventListener("mouseenter", lift);
      element.addEventListener("mouseleave", settle);
      element.addEventListener("focusin", lift);
      element.addEventListener("focusout", settle);
      return () => {
        element.removeEventListener("mouseenter", lift);
        element.removeEventListener("mouseleave", settle);
        element.removeEventListener("focusin", lift);
        element.removeEventListener("focusout", settle);
      };
    });

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target;
          element.classList.add("in-view");
          gsap.fromTo(
            element,
            { y: 46, opacity: 0, scale: 0.97, filter: "blur(8px)" },
            { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.82, ease: "power3.out" }
          );

          const children = element.querySelectorAll(".chip-wrap span, li, .timeline-item");
          if (children.length) {
            gsap.fromTo(
              children,
              { y: 12, opacity: 0, scale: 0.98 },
              { y: 0, opacity: 1, scale: 1, duration: 0.48, stagger: 0.04, delay: 0.08, ease: "power2.out" }
            );
          }

          observer.unobserve(element);
        });
      },
      { threshold: 0.13 }
    );

    revealElements.forEach((element) => {
      if (!element.closest(".hero-section")) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      intro.kill();
      backdropTween.kill();
      proofTween.kill();
      progressTween.kill();
      heroDepthTween.kill();
      codeDepthTween.kill();
      hoverCleanups.forEach((cleanup) => cleanup());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="scroll-progress" aria-hidden="true"></div>
      <Header theme={theme} onThemeChange={setTheme} />
      <main>
        <Hero />
        <Profile />
        <Skills />
        <Projects />
        <Training />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
          <span>Copyright {year} {profile.name}</span>
          <span>Java Full Stack Developer | Spring Boot | ReactJS | AWS</span>
        </div>
      </footer>
      <Analytics />
    </>
  );
}

export default App;
