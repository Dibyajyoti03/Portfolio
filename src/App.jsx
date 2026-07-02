import React, { useEffect, useMemo, useState, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";
import ProjectSandboxModal from "./ProjectSandbox.jsx";

gsap.registerPlugin(ScrollTrigger);

const profile = {
  name: "Dibyajyoti Mohanty",
  role: "Java Full Stack Developer",
  tagline:
    "I'm a B.Tech Computer Science graduate who loves coding in Java, building APIs with Spring Boot, and crafting responsive user interfaces with React. I focus on clean logic, database queries, and getting things working smoothly.",
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



const skillGroupsGrouped = [
  {
    title: "DEVELOP",
    role: "backend",
    icon: "bi-hdd-network",
    description: "Architecting secure, modular backends and microservices using enterprise Core Java, Spring Boot, and Hibernate ecosystems.",
    items: ["Java", "Spring Boot", "Microservices", "Hibernate", "Spring Framework", "Python", "C"]
  },
  {
    title: "DATABASES",
    role: "backend",
    icon: "bi-database",
    description: "Designing relational structures, query optimizations, indexes, and writing transactional PL/SQL blocks.",
    items: ["Oracle SQL", "PL/SQL"]
  },
  {
    title: "DESIGN",
    role: "frontend",
    icon: "bi-window-sidebar",
    description: "Crafting beautiful, interactive, and responsive web pages and component architectures using modern React.",
    items: ["ReactJS", "HTML5", "CSS3", "JavaScript (ES6+)", "Bootstrap", "GSAP Animations", "Responsive UI"]
  },
  {
    title: "DELIVER",
    role: "devops",
    icon: "bi-shield-check",
    description: "Automating builds, containerizing packages, scanning quality gates, and setting up secure cloud deployments.",
    items: [
      "AWS", "Docker", "Jenkins", "SonarQube", "Maven", "Jira", "ELK Stack", 
      "JUnit", "Mockito", "Chef", "GitHub", "SonarLint", "Gradle", "Heroku", 
      "CloudWatch", "Datadog"
    ]
  }
];

const projects = [
  {
    name: "E-Commerce Website",
    type: "Full-stack storefront",
    url: "https://github.com/Dibyajyoti03/ecommerce-website",
    stack: ["ReactJS", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
    details: [
      "Built a fully functioning storefront featuring live product search, interactive categories, and cart management.",
      "Used React Router to handle page navigation seamlessly and Bootstrap for clean, responsive grid layouts.",
    ],
  },
  {
    name: "Finance Dashboard UI",
    type: "React and TypeScript dashboard",
    url: "https://github.com/Dibyajyoti03/Finance-Dashboard-UI",
    stack: ["ReactJS", "TypeScript", "HTML5", "CSS3"],
    details: [
      "Created a clean visual dashboard to help track monthly budgets, transactions, and category expenses.",
      "Ensured complete type safety using TypeScript and used custom React hooks to manage dynamic state updates.",
    ],
  },

  {
    name: "Connect Games",
    type: "JavaScript browser games",
    url: "https://github.com/Dibyajyoti03/Connect-Games",
    stack: ["HTML5", "CSS3", "JavaScript"],
    details: [
      "Developed a collection of classic board games running directly in the browser using HTML5 Canvas and vanilla JS.",
      "Wrote clean object-oriented game loops, state handlers, and win-condition checks for smooth local play.",
    ],
  },
  {
    name: "Simple Banking Application",
    type: "Core Java console app",
    url: "https://github.com/Dibyajyoti03/banking-app",
    stack: ["Core Java", "File I/O"],
    details: [
      "Created a command-line banking tool that handles account creation, deposits, withdrawals, and balance queries.",
      "Used Java File I/O to persist account records and focused on clean OOP structure and error handling.",
    ],
  },
  {
    name: "Face Recognition Attendance System",
    type: "Computer vision project",
    url: "https://github.com/Dibyajyoti03/face-recognition-attendance",
    stack: ["Python", "OpenCV", "Machine Learning", "Face Recognition Library"],
    details: [
      "Designed an automated attendance tracker using OpenCV to detect and recognize faces from a live camera feed.",
      "Programmed the script to identify students against a local dataset and automatically save timestamped logs to a CSV.",
    ],
  },
  {
    name: "Cyberbullying Detection in Hinglish",
    type: "ML and NLP project",
    url: "https://github.com/Dibyajyoti03/cyberbullying-detection",
    stack: ["Python", "NLP", "Machine Learning", "Scikit-learn"],
    details: [
      "Built a machine learning model to categorize Hindi-English code-mixed comments as bullying or non-bullying.",
      "Preprocessed social media texts, extracted TF-IDF features, and compared different Scikit-learn classifiers.",
    ],
  },
  {
    name: "AniMetro.in",
    type: "Responsive catalog site",
    url: "https://github.com/Dibyajyoti03/animetro",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    details: [
      "Created a neat catalog site for anime listings with smooth image overlays and responsive column scaling.",
      "Wrote custom CSS transitions and responsive flex containers to make navigation feel clean on mobile screens.",
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
    detail: "SUIIT, Sambalpur University.",
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

function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const percentRef = useRef(null);
  const barRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const techWords = [
      "Starting local development server...",
      "Loading project assets...",
      "Initializing Spring Boot controllers...",
      "Bundling React components...",
      "Connecting database pools...",
      "Setting up environment variables...",
      "Ready at localhost:5173!"
    ];

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 1. Initial logo & card entry
    tl.fromTo(logoRef.current, 
      { scale: 0.8, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.7)" }
    );

    // 2. Count 0 to 100 and update progress bar
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.floor(counter.val);
        if (percentRef.current) {
          percentRef.current.innerText = rounded.toString().padStart(3, "0") + "%";
        }
        if (barRef.current) {
          barRef.current.style.width = `${rounded}%`;
        }
        
        // Change text based on progress
        const wordIndex = Math.min(
          Math.floor((rounded / 100) * techWords.length),
          techWords.length - 1
        );
        if (textRef.current && textRef.current.innerText !== techWords[wordIndex]) {
          gsap.fromTo(textRef.current, 
            { opacity: 0.3, y: 5 },
            { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
          );
          textRef.current.innerText = techWords[wordIndex];
        }
      }
    }, "-=0.3");

    // 3. Scale down and fade out the card content
    tl.to(".loader-content-wrap", {
      opacity: 0,
      scale: 0.9,
      y: -20,
      duration: 0.4,
      ease: "power2.in"
    });

    // 4. Slide out loader screen
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.75,
      ease: "power4.inOut"
    }, "-=0.1");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="site-loader" aria-label="Loading portfolio">
      <div className="loader-content-wrap">
        <div ref={logoRef} className="loader-logo-container">
          <div className="loader-hexagon">
            <span>DM</span>
          </div>
        </div>
        
        <div className="loader-status">
          <span ref={textRef} className="loader-status-text">Initializing System...</span>
          <span ref={percentRef} className="loader-percentage">000%</span>
        </div>

        <div className="loader-track">
          <div ref={barRef} className="loader-fill"></div>
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

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
      if (!document.body.classList.contains("custom-cursor-active")) {
        document.body.classList.add("custom-cursor-active");
      }
    };
    const onMouseLeave = () => {
      setHidden(true);
      document.body.classList.remove("custom-cursor-active");
    };
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    let animFrame;
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16,
        };
      });
      animFrame = requestAnimationFrame(updateTrail);
    };
    animFrame = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animFrame);
  }, [position]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".role-chip") ||
        target.closest(".btn") ||
        target.closest(".project-link") ||
        target.closest(".navbar-brand")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };
    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        className={`custom-cursor-dot ${hovered ? "cursor-hovered" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`custom-cursor-trail ${hovered ? "cursor-hovered" : ""} ${clicked ? "clicked" : ""}`}
        style={{ left: `${trail.x}px`, top: `${trail.y}px` }}
      />
    </>
  );
}

function SocialIcons() {
  return (
    <div className="floating-socials" aria-label="Social media profiles">
      <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <i className="bi bi-linkedin"></i>
      </a>
      <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
        <i className="bi bi-github"></i>
      </a>
      <a href={`mailto:${profile.email}`} aria-label="Email">
        <i className="bi bi-envelope-fill"></i>
      </a>
    </div>
  );
}

function RolesSlider() {
  const roles = [
    "Java Developer",
    "React Developer",
    "Java Full Stack Developer",
    "DevSecOps Builder"
  ];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      const timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 350); // Match CSS transition duration
      return () => clearTimeout(timer);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span className={`role-slide-fade ${fade ? "fade-in" : "fade-out"}`}>
      {roles[index]}
    </span>
  );
}

function TiltCard({ children, className, ...props }) {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 12;
    const angleY = (x - xc) / 12;
    
    gsap.to(card, {
      y: -8,
      scale: 1.015,
      rotateX: angleX,
      rotateY: angleY,
      transformPerspective: 1000,
      ease: "power3.out",
      duration: 0.4,
      overwrite: "auto"
    });
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 1000,
      ease: "power3.out",
      duration: 0.6,
      overwrite: "auto"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

function MockTerminal() {
  const [logs, setLogs] = useState([]);
  const logSequence = useMemo(() => [
    { text: "$ mvn clean package", type: "cmd", delay: 300 },
    { text: "[INFO] Scanning for projects...", type: "info", delay: 400 },
    { text: "[INFO] Building Dibyajyoti Mohanty Portfolio 1.0.0", type: "info", delay: 300 },
    { text: "[INFO] --- compiler:compile ---", type: "info", delay: 400 },
    { text: "[INFO] Compiling Core Java backend modules...", type: "success", delay: 300 },
    { text: "[INFO] Compiling Spring Boot controllers...", type: "success", delay: 400 },
    { text: "$ docker build -t dibya-fullstack:latest .", type: "cmd", delay: 700 },
    { text: "Sending build context to Docker daemon  2.4MB", type: "info", delay: 300 },
    { text: "Step 1/5 : FROM eclipse-temurin:17-jdk-alpine", type: "info", delay: 200 },
    { text: "Step 2/5 : COPY target/portfolio.jar app.jar", type: "info", delay: 200 },
    { text: "Successfully built and tagged dibya-fullstack:latest", type: "success", delay: 400 },
    { text: "$ npm run dev", type: "cmd", delay: 800 },
    { text: "  VITE v6.0.7  ready in 254 ms", type: "success", delay: 200 },
    { text: "  ➜  Local:   http://localhost:5173/", type: "success", delay: 100 },
    { text: "[SUCCESS] Application deployed & ready!", type: "highlight", delay: 600 }
  ], []);

  useEffect(() => {
    let active = true;
    let index = 0;
    
    const runNextLog = () => {
      if (!active || index >= logSequence.length) return;
      
      const item = logSequence[index];
      setLogs((prev) => [...prev, item]);
      index++;
      
      const terminalEl = document.getElementById("terminal-body");
      if (terminalEl) {
        terminalEl.scrollTop = terminalEl.scrollHeight;
      }
      
      setTimeout(runNextLog, item.delay);
    };

    const initialTimeout = setTimeout(runNextLog, 1800); // Start after intro animation

    return () => {
      active = false;
      clearTimeout(initialTimeout);
    };
  }, [logSequence]);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="terminal-title">dibya-devops-logs.sh</div>
      </div>
      <div className="terminal-body" id="terminal-body">
        {logs.map((log, i) => (
          <div key={i} className={`terminal-line line-${log.type}`}>
            {log.text}
          </div>
        ))}
        <span className="terminal-cursor"></span>
      </div>
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
                  className={`nav-link hover-link ${activeSection === item.href.slice(1) ? "active" : ""}`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="hover-in">
                    <span>{item.label}</span>
                    <span className="hover-text-hidden">{item.label}</span>
                  </span>
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

function AnimeCharacter() {
  return (
    <div className="anime-character-wrapper">
      <svg viewBox="0 0 500 500" className="anime-coder-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accentColor)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--paper)" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accentColor)" />
            <stop offset="100%" stopColor="var(--accentPink)" />
          </linearGradient>
          
          <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1726" />
            <stop offset="100%" stopColor="#0b080c" />
          </linearGradient>
          
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur1" />
            <feGaussianBlur stdDeviation="5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <linearGradient id="screenLight" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--accentColor)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accentColor)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx="250" cy="250" r="220" fill="url(#bgGlow)" />
        
        <g opacity="0.15">
          <circle cx="250" cy="250" r="170" fill="none" stroke="var(--accentColor)" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="250" cy="250" r="120" fill="none" stroke="var(--accentPink)" strokeWidth="1.5" />
          <line x1="250" y1="50" x2="250" y2="450" stroke="var(--accentColor)" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="50" y1="250" x2="450" y2="250" stroke="var(--accentColor)" strokeWidth="0.5" strokeDasharray="3 3" />
        </g>

        <g className="floating-nodes">
          <text x="80" y="120" fill="var(--accentColor)" opacity="0.4" fontSize="12" fontFamily="monospace" className="float-fast">&lt;Java&gt;</text>
          <text x="380" y="140" fill="var(--accentPink)" opacity="0.5" fontSize="12" fontFamily="monospace" className="float-slow">&#123;React&#125;</text>
          <text x="90" y="380" fill="var(--accentPink)" opacity="0.3" fontSize="14" fontFamily="monospace" className="float-medium">API</text>
          <text x="390" y="360" fill="var(--accentColor)" opacity="0.4" fontSize="14" fontFamily="monospace" className="float-fast">AWS</text>
        </g>

        <g className="character-body" transform="translate(0, 0)">
          <path d="M160 380 L140 280 Q140 160 250 160 Q360 160 360 280 L340 380 Z" fill="#15101a" stroke="#251b2e" strokeWidth="3" />
          <path d="M180 240 L160 180 Q250 140 340 180 L320 240 Z" fill="#0c090f" stroke="var(--accentColor)" strokeWidth="1.5" filter="url(#neonGlow)" opacity="0.8" />
          <rect x="200" y="110" width="100" height="50" rx="25" fill="#1a1321" stroke="var(--accentPink)" strokeWidth="1" />

          <path d="M150 480 Q150 340 250 340 Q350 340 350 480 Z" fill="url(#hoodieGrad)" stroke="#221a2b" strokeWidth="2" />
          
          <path d="M240 380 L240 440" stroke="var(--accentColor)" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlow)" />
          <path d="M260 380 L260 430" stroke="var(--accentPink)" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlow)" />
          
          <circle cx="250" cy="400" r="15" fill="#120c17" stroke="var(--accentColor)" strokeWidth="1" />
          <text x="250" y="404" fill="var(--textColor)" fontSize="10" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">DM</text>

          <path d="M230 310 L230 350 L270 350 L270 310 Z" fill="#ecc6b1" />
          <path d="M230 330 L250 350 L270 330 L270 350 L230 350 Z" fill="#d4ad96" />

          <path d="M210 260 Q210 320 250 320 Q290 320 290 260 L290 240 L210 240 Z" fill="#ffdfca" />
          <circle cx="206" cy="265" r="8" fill="#ffdfca" />
          <circle cx="294" cy="265" r="8" fill="#ffdfca" />
          
          <g className="cyber-visor" filter="url(#neonGlow)">
            <path d="M202 250 L298 250" stroke="#100a14" strokeWidth="10" strokeLinecap="round" />
            <path d="M210 240 L290 240 L285 270 L215 270 Z" fill="rgba(194, 164, 255, 0.95)" stroke="var(--accentColor)" strokeWidth="2" />
            <path d="M218 250 L282 250" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="206" cy="250" r="6" fill="var(--accentPink)" />
            <circle cx="294" cy="250" r="6" fill="var(--accentPink)" />
          </g>

          <g fill="url(#hairGrad)">
            <path d="M200 240 L180 220 L205 215 L190 190 L220 195 L210 170 L235 180 L250 150 L265 180 L290 170 L280 195 L310 190 L295 215 L320 220 L300 240 Z" />
            <path d="M205 235 L215 248 L225 232 L238 255 L250 230 L262 255 L275 232 L285 248 L295 235 L290 210 L210 210 Z" />
          </g>
          
          <g className="headphones">
            <path d="M195 240 Q195 180 250 180 Q305 180 305 240" fill="none" stroke="#251b2e" strokeWidth="6" />
            <rect x="194" y="235" width="12" height="30" rx="6" fill="#150f1c" stroke="var(--accentColor)" strokeWidth="2" filter="url(#neonGlow)" />
            <rect x="294" y="235" width="12" height="30" rx="6" fill="#150f1c" stroke="var(--accentColor)" strokeWidth="2" filter="url(#neonGlow)" />
            <circle cx="200" cy="250" r="4" fill="var(--accentPink)" />
            <circle cx="300" cy="250" r="4" fill="var(--accentPink)" />
          </g>
        </g>

        <g className="laptop-desk" transform="translate(0, 0)">
          <line x1="100" y1="460" x2="400" y2="460" stroke="#251b2e" strokeWidth="8" strokeLinecap="round" />
          <polygon points="160,460 340,460 360,480 140,480" fill="#150f1c" stroke="#2c203b" strokeWidth="2" />
          <polygon points="180,455 320,455 330,410 170,410" fill="rgba(194, 164, 255, 0.15)" stroke="var(--accentColor)" strokeWidth="1.5" />
          <polygon points="170,410 330,410 290,320 210,320" fill="url(#screenLight)" opacity="0.4" style={{ mixBlendMode: 'screen' }} />
          
          <g fill="var(--accentPink)" opacity="0.8">
            <circle cx="190" cy="466" r="2" />
            <circle cx="210" cy="466" r="2" />
            <circle cx="230" cy="466" r="2" />
            <circle cx="250" cy="466" r="2" />
            <circle cx="270" cy="466" r="2" />
            <circle cx="290" cy="466" r="2" />
            <circle cx="310" cy="466" r="2" />
            <circle cx="200" cy="473" r="2" />
            <circle cx="220" cy="473" r="2" />
            <circle cx="240" cy="473" r="2" />
            <circle cx="260" cy="473" r="2" />
            <circle cx="280" cy="473" r="2" />
            <circle cx="300" cy="473" r="2" />
          </g>

          <g className="typing-hands">
            <path d="M165 478 Q180 460 205 464" stroke="#ffdfca" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M335 478 Q320 460 295 464" stroke="#ffdfca" strokeWidth="7" strokeLinecap="round" fill="none" />
          </g>
        </g>

        <g className="tech-badges">
          <g transform="translate(70, 220)" className="badge-float-1">
            <circle cx="0" cy="0" r="24" fill="rgba(21, 15, 28, 0.85)" stroke="var(--accentColor)" strokeWidth="1.5" filter="url(#neonGlow)" />
            <path d="M-6 4 Q-6 -6 4 -6 L6 -6 A4 4 0 0 1 10 -2 L10 -1 A4 4 0 0 1 6 3 Z" fill="none" stroke="var(--accentColor)" strokeWidth="1.8" />
            <path d="M6 -4 A2 2 0 0 1 8 -2 L8 -1 A2 2 0 0 1 6 1" fill="none" stroke="var(--accentColor)" strokeWidth="1.5" />
            <path d="M-2 -10 Q2 -14 0 -18 M1 -10 Q5 -14 3 -18" fill="none" stroke="var(--accentPink)" strokeWidth="1.2" strokeLinecap="round" />
          </g>
          
          <g transform="translate(420, 240)" className="badge-float-2">
            <circle cx="0" cy="0" r="24" fill="rgba(21, 15, 28, 0.85)" stroke="var(--accentPink)" strokeWidth="1.5" filter="url(#neonGlow)" />
            <ellipse rx="12" ry="4" fill="none" stroke="var(--accentPink)" strokeWidth="1.5" transform="rotate(0)" />
            <ellipse rx="12" ry="4" fill="none" stroke="var(--accentPink)" strokeWidth="1.5" transform="rotate(60)" />
            <ellipse rx="12" ry="4" fill="none" stroke="var(--accentPink)" strokeWidth="1.5" transform="rotate(120)" />
            <circle cx="0" cy="0" r="2.5" fill="var(--textColor)" />
          </g>

          <g transform="translate(130, 80)" className="badge-float-3">
            <circle cx="0" cy="0" r="20" fill="rgba(21, 15, 28, 0.85)" stroke="var(--accentPink)" strokeWidth="1" />
            <path d="M-6 4 A4 4 0 0 1 -6 -4 A6 6 0 0 1 4 -6 A5 5 0 0 1 8 0 A4 4 0 0 1 6 4 Z" fill="none" stroke="var(--accentPink)" strokeWidth="1.5" />
          </g>

          <g transform="translate(360, 90)" className="badge-float-4">
            <circle cx="0" cy="0" r="20" fill="rgba(21, 15, 28, 0.85)" stroke="var(--accentColor)" strokeWidth="1" />
            <text x="0" y="5" fill="var(--accentColor)" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">&#123; &#125;</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero-section" id="home">
      <div className="motion-sweep" aria-hidden="true"></div>
      <div className="hero-code" aria-hidden="true">
        <MockTerminal />
      </div>
      <div className="container">
        <div className="row g-4 align-items-center hero-row">
          <div className="col-lg-6 col-md-12">
            <div className="hero-card section-reveal">
              <p className="eyebrow">Creative Portfolio</p>
              <h1>
                <span className="hero-name-word">DIBYAJYOTI</span>
                <br />
                <span className="hero-name-word"><span>MOHANTY</span></span>
              </h1>
              <div className="hero-role">
                <span>A Dedicated</span>
                <RolesSlider />
              </div>
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
          <div className="col-lg-6 col-md-12 hero-visual-container section-reveal">
            <AnimeCharacter />
          </div>
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
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900 }}>Who I Am</h2>
        </div>
        <div className="row g-4">
          <div className="col-lg-7">
            <article className="story-card card-surface section-reveal">
              <h3>I'm a software developer based in Odisha, India, who enjoys building logic-driven backends and linking them to interactive React frontends.</h3>
              <p>
                I recently finished my B.Tech in Computer Science. During my studies and internships, I focused heavily on Core Java, Spring Boot, relational databases (Oracle SQL), and learning how to build and deploy applications with Docker and AWS. Rather than just checking off tech stack boxes, I enjoy figuring out how things work under the hood and writing clear, readable code.
              </p>
              <p>
                This portfolio features some of the things I've built, ranging from e-commerce sites and financial dashboards to automation utilities and game suites. I'm always eager to learn, build, and collaborate on interesting projects.
              </p>
            </article>
          </div>
          <div className="col-lg-5">
            <div className="profile-card-grid">
              <TiltCard className="metric-card section-reveal">
                <span>Based in</span>
                <strong>{profile.location}</strong>
              </TiltCard>
              <TiltCard className="metric-card section-reveal">
                <span>Services</span>
                <strong>Java Full Stack, API Dev, DevOps Setup</strong>
              </TiltCard>
              <TiltCard className="metric-card section-reveal">
                <span>Best fit</span>
                <strong>Java, Spring + React teams</strong>
              </TiltCard>
              <TiltCard className="metric-card section-reveal">
                <span>Availability</span>
                <strong className="role-list">
                  Remote Contract
                  <br />
                  Freelance Web Projects
                  <br />
                  Technical Consulting
                </strong>
              </TiltCard>
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
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900 }}>What I Do</h2>
        </div>
        <div className="skill-grid">
          {skillGroupsGrouped.map((skill) => {
            return (
              <TiltCard
                className="skill-panel card-surface section-reveal"
                key={skill.title}
              >
                <i className={`bi ${skill.icon}`}></i>
                <h3>{skill.title}</h3>
                <p className="skill-description" style={{ fontSize: "0.88rem", color: "var(--textMuted)", margin: "0 0 16px", lineHeight: "1.5" }}>
                  {skill.description}
                </p>
                <h5 style={{ fontWeight: 800, fontSize: "0.74rem", textTransform: "uppercase", color: "var(--accentPink)", margin: "0 0 8px", letterSpacing: "0.05em" }}>
                  Skillset & Tools
                </h5>
                <div className="chip-wrap">
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects({ onOpenSandbox }) {
  return (
    <section className="section-padding project-section" id="projects">
      <div className="container">
        <div className="section-head section-reveal">
          <p className="eyebrow">Projects</p>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900 }}>Featured Work</h2>
        </div>
        <div className="project-deck">
          {projects.map((project, index) => {
            return (
              <TiltCard
                className="project-card card-surface section-reveal"
                key={project.name}
              >
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
                <div className="project-card-footer">
                  <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                    <i className="bi bi-github"></i>
                    View GitHub
                  </a>
                  <button className="project-link sandbox-trigger-btn" onClick={() => onOpenSandbox(project)}>
                    <i className="bi bi-play-fill"></i>
                    Run Sandbox
                  </button>
                </div>
              </TiltCard>
            );
          })}
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
          <p className="eyebrow">Timeline</p>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900 }}>Internships & Education</h2>
        </div>
        <div className="timeline-card card-surface section-reveal">
          <div className="timeline-list">
            <div className="timeline-progress-line" aria-hidden="true"></div>
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
          <h2>Let's build something together!</h2>
          <p className="cert-line">
            Certification: Web Development Certification - InternPe, 2024.
          </p>
          <p>
            I'm currently based in {profile.location} and looking for remote development opportunities, full-time roles, or interesting collaborative projects. Feel free to shoot me an email or connect on LinkedIn if you want to chat!
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
  const [activeSandbox, setActiveSandbox] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      const storedTheme = window.localStorage.getItem("portfolio-theme");
      if (storedTheme) {
        return storedTheme;
      }
    } catch (e) {
      console.warn("localStorage is not accessible:", e);
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch (e) {
      console.warn("localStorage is not accessible:", e);
    }
  }, [theme]);



  useEffect(() => {
    if (isLoading) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = document.querySelectorAll(".section-reveal");

    if (prefersReducedMotion || !gsap) {
      revealElements.forEach((element) => element.classList.add("in-view"));
      return;
    }

    let intro;
    let progressTween;
    let heroDepthTween;
    let timelineProgressTween;
    let bulletTriggers = [];
    let hoverCleanups = [];
    let observer;

    try {
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
      gsap.set(".hero-visual-container", { scale: 0.85, opacity: 0, filter: "blur(10px)" });

      intro = gsap.timeline({ defaults: { ease: "power4.out" } });
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
          ".hero-visual-container",
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "back.out(1.4)" },
          "-=0.75"
        );

      progressTween = gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      heroDepthTween = gsap.to(".hero-card", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      timelineProgressTween = gsap.to(".timeline-progress-line", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-list",
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        }
      });

      const timelineBullets = document.querySelectorAll(".timeline-item");
      bulletTriggers = Array.from(timelineBullets).map((item) => {
        return ScrollTrigger.create({
          trigger: item,
          start: "top 75%",
          end: "top 25%",
          onEnter: () => item.classList.add("active-bullet"),
          onLeaveBack: () => item.classList.remove("active-bullet"),
        });
      });

      const hoverTargets = document.querySelectorAll(
        ".story-card, .contact-card"
      );
      hoverCleanups = Array.from(hoverTargets).map((element) => {
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

      observer = new IntersectionObserver(
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

    } catch (e) {
      console.error("GSAP Initialization failed, falling back to instant display:", e);
      revealElements.forEach((element) => element.classList.add("in-view"));
      try {
        gsap.set(".site-nav, .hero-card .eyebrow, .hero-name-word, .hero-role, .hero-copy, .hero-actions .btn, .hero-visual-container", {
          y: 0,
          yPercent: 0,
          opacity: 1,
          scale: 1,
          filter: "none",
          rotateX: 0
        });
      } catch (err) {
        console.warn("GSAP fallback properties reset failed:", err);
      }
    }

    return () => {
      if (observer) observer.disconnect();
      if (intro) intro.kill();
      if (progressTween) progressTween.kill();
      if (heroDepthTween) heroDepthTween.kill();
      if (timelineProgressTween) timelineProgressTween.kill();
      bulletTriggers.forEach((trigger) => trigger.kill());
      hoverCleanups.forEach((cleanup) => cleanup());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className="scroll-progress" aria-hidden="true"></div>
      <Cursor />
      <div className="landing-circle1" aria-hidden="true"></div>
      <div className="landing-circle2" aria-hidden="true"></div>
      <SocialIcons />
      <Header
        theme={theme}
        onThemeChange={setTheme}
      />
      <main>
        <Hero />
        <Profile />
        <Skills />
        <Projects onOpenSandbox={setActiveSandbox} />
        <Training />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container">
          <span>Copyright {year} {profile.name}</span>
          <span style={{ fontSize: "0.8rem", color: "var(--accentColor)" }}>
            Java Full Stack Developer | Spring Boot | ReactJS | AWS
          </span>
        </div>
      </footer>
      <ProjectSandboxModal activeSandbox={activeSandbox} onClose={() => setActiveSandbox(null)} />
      <Analytics />
    </>
  );
}

export default App;
