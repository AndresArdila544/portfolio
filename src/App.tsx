import { useState, useEffect, useRef } from "react";
import "./App.css";
import projectReport from "./assets/paper.pdf";
import hciDesignDeck from "./assets/HCI-le-gym-ui-design-deck.pdf";
import leGymReport from "./assets/LeGymReport.pdf";
import mlReport from "./assets/MLReport.pdf";
import resume from "./assets/AndresArdilaCV2025.pdf";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  useEffect(() => {
    // Store section references
    const sectionIds = ["about", "experience", "projects", "skills", "education", "certifications", "contact"];
    sectionIds.forEach((id) => {
      sectionsRef.current[id] = document.getElementById(id);
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for better detection
      
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 300);

      // Find active section
      for (const [id, element] of Object.entries(sectionsRef.current)) {
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="container">

      {/* NAV */}
      <nav className="nav">
        <div className="logo">AA</div>
        <div className="nav-content">
          <div className="links">
            <a href="#about" className={activeSection === "about" ? "active" : ""}>About</a>
            <a href="#experience" className={activeSection === "experience" ? "active" : ""}>Experience</a>
            <a href="#projects" className={activeSection === "projects" ? "active" : ""}>Projects</a>
            <a href="#skills" className={activeSection === "skills" ? "active" : ""}>Skills</a>
            <a href="#contact" className={activeSection === "contact" ? "active" : ""}>Contact</a>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>
          Hi, I'm <span>Andres Ardila</span>
        </h1>
        <p>
          Software Engineer specializing in backend systems, cloud infrastructure, and full-stack development, with experience building scalable systems at Lyft and DXC Technology. 
          Currently pursuing MEng at Concordia University.
        </p>

        <div className="buttons">
          <a className="btn-outline" href={resume} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
          <a className="btn-outline" href="https://github.com/AndresArdila544" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <h2>About Me</h2>
        <p>
          I'm a Software Engineer based in Montreal, QC, currently pursuing my Master's in Software Engineering 
          at Concordia University with a perfect 4.0 GPA. With experience at companies like Lyft and DXC Technology, 
          I specialize in backend systems, cloud infrastructure, and full-stack development.
        </p>
        <p>
          My work focuses on building scalable, maintainable systems using modern technologies. I'm passionate about 
          clean code, software quality, and leveraging cloud platforms to solve complex problems. I'm fluent in 
          Spanish (native), English (advanced), and learning French.
        </p>
        <p>
          Recognized for exceptional academic performance, including top 5 admission scholarship and one of the best 
          nationwide scores in Colombia's Saber Pro exam.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="experience">
        <h2>Experience</h2>
        <div className="grid">
          <div className="card">
            <div className="card-header">
              <h3>Software Engineer Intern - Backend</h3>
              <span className="company">Lyft</span>
              <span className="date">May 2025 - Aug 2025</span>
            </div>
            <p>
              Contributed to the Storage team by developing an automated workflow for access control 
              management of AWS storage resources, leveraging Terraform and Go. Improved developer 
              productivity and reduced operational burden.
            </p>
            <div className="tech-tags">
              <span>Go</span>
              <span>Terraform</span>
              <span>AWS</span>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Analyst II Software Engineering</h3>
              <span className="company">DXC Technology</span>
              <span className="date">Sep 2022 - Dec 2023</span>
            </div>
            <p>
              Full-time third-level support engineer for banking digital channels, managing full-stack 
              development and software maintenance. Delivered high-quality solutions using modern web technologies.
            </p>
            <div className="tech-tags">
              <span>Angular</span>
              <span>TypeScript</span>
              <span>Java</span>
              <span>SQL</span>
              <span>SASS</span>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Software Engineering Intern</h3>
              <span className="company">DXC Technology</span>
              <span className="date">Jan - Aug 2022</span>
            </div>
            <p>
              Assisted in the development and successful delivery of a new web application for a banking client. 
              Provided frontend and backend support using Angular, TypeScript, Java, and SQL/NoSQL databases.
            </p>
            <div className="tech-tags">
              <span>Angular</span>
              <span>TypeScript</span>
              <span>Java</span>
              <span>SQL</span>
              <span>NoSQL</span>
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDATION */}
      <section className="recommendation">
        <div className="recommendation-card">
          <div className="quote-icon">"</div>
          <p className="recommendation-text">
            Andres consistently met expectations across key areas and performed on par with Lyft's expectations 
            for a Software Engineer at his level. His commitment to technical excellence is reflected in his 
            consistently high-quality deliverables, making him a strong and reliable asset for any project. 
            His maturity in handling complex workflows and his ability to deliver reliable, cross-cutting solutions 
            make him a strong candidate for any full-time Software Engineer role.
          </p>
          <div className="recommendation-author">
            <p className="author-name">Ibukun Itimi</p>
            <p className="author-title">Engineering Manager, Foundational Infrastructure, Lyft</p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects">
        <h2>Selected Projects</h2>

        <div className="grid">
          <div className="card">
            <h3>Le Gym App</h3>
            <p>
              Mobile application designed for Concordia University's Le Gym, enhancing student access to fitness resources. 
              Features intuitive booking, real-time occupancy updates, fitness tracking, and integrated gym services. 
              Built with React Native and Firebase for seamless user experience.
            </p>
            <div className="tech-tags">
              <span>React Native</span>
              <span>Firebase</span>
              <span>Mobile</span>
            </div>
            <div className="card-links">
              <a href="https://github.com/AndresArdila544/LeGym" target="_blank" rel="noopener noreferrer">View Repository →</a>
              <a href={hciDesignDeck} target="_blank" rel="noopener noreferrer">UI Design Deck PDF →</a>
              <a href={leGymReport} target="_blank" rel="noopener noreferrer">Project Report PDF →</a>
            </div>
          </div>

          <div className="card">
            <h3>Park-in-space</h3>
            <p>
              Web and mobile app for locating parking near destinations with real-time availability and pricing. 
              Built with React, Kotlin, and microservices architecture using Ruby, Go, JavaScript, Java, and Python. 
              Deployed on AWS, Azure, and Google Kubernetes Engine.
            </p>
            <div className="tech-tags">
              <span>React</span>
              <span>Go</span>
              <span>Kotlin</span>
              <span>Microservices</span>
              <span>AWS</span>
              <span>Kubernetes</span>
            </div>
            <a href="https://github.com/Park-In-Space" target="_blank" rel="noopener noreferrer">View Repository →</a>
          </div>

          <div className="card">
            <h3>Information System for Public Lighting</h3>
            <p>
              Web application for geolocated control of public lighting inventory in San José del Guaviare. 
              Developed frontend using React and Google Maps API, backend on SpringBoot. Deployed using Firebase and Heroku.
            </p>
            <div className="tech-tags">
              <span>React</span>
              <span>SpringBoot</span>
              <span>Google Maps API</span>
              <span>Firebase</span>
            </div>
          </div>

          <div className="card">
            <h3>Easy PC</h3>
            <p>
              Web app helping inexperienced users build custom PCs. Developed as a team using Vue.js and Bootstrap 
              for frontend, MySQL and Java SpringBoot for backend. Implemented OAuth authentication and deployed on Heroku and Firebase.
            </p>
            <div className="tech-tags">
              <span>Vue.js</span>
              <span>SpringBoot</span>
              <span>MySQL</span>
              <span>OAuth</span>
            </div>
            <a href="https://github.com/Easy-PC-Project" target="_blank" rel="noopener noreferrer">View Repository →</a>
          </div>

          <div className="card">
            <h3>TubeLytics</h3>
            <p>
              Play Framework web application that analyzes live feed from the YouTube API. Features include keyword-based 
              video search, channel profile pages with detailed information, word-level statistics for video descriptions, 
              and sentiment analysis (happy, sad, neutral) for video streams. Displays the latest matching videos and 
              provides comprehensive analytics on YouTube content.
            </p>
            <div className="tech-tags">
              <span>Play Framework</span>
              <span>YouTube API</span>
              <span>Sentiment Analysis</span>
              <span>Data Analytics</span>
            </div>
            <a href="https://github.com/soen6441-project/webapp_project" target="_blank" rel="noopener noreferrer">View Repository →</a>
          </div>

          <div className="card">
            <h3>LLM Refactoring Evaluation</h3>
            <p>
              Research project evaluating Large Language Models (CodeLlama-7B, StarCoder2-7B, WizardCoder-7B) for automated 
              code refactoring. Comprehensive evaluation using 420 Python programs from Aizu Online Judge, testing zero-shot, 
              one-shot, and few-shot prompting strategies. Measures functional correctness (Pass@k) and code quality metrics 
              including LOC, Cyclomatic Complexity, Halstead Metrics, and Maintainability Index.
            </p>
            <div className="tech-tags">
              <span>Python</span>
              <span>LLMs</span>
              <span>CodeLlama</span>
              <span>Research</span>
              <span>Code Metrics</span>
            </div>
            <div className="card-links">
              <a href="https://github.com/AndresArdila544/LLMRefactoring" target="_blank" rel="noopener noreferrer">View Repository →</a>
              <a href={projectReport} target="_blank" rel="noopener noreferrer">View Paper →</a>
            </div>
          </div>

          <div className="card">
            <h3>Museum Image Classification</h3>
            <p>
              COMP6721 course project classifying museum images into indoor and outdoor categories using machine learning and deep learning. 
              Implemented Decision Trees, Random Forest, and Gradient Boosting on extracted features (color histograms, edge detection), 
              achieving 91.5% accuracy. Developed CNN architectures achieving 97% accuracy with a no-pooling variant. Includes semi-supervised 
              learning approach using pseudo-labeling on 10,000 images from Places MIT dataset.
            </p>
            <div className="tech-tags">
              <span>Python</span>
              <span>Machine Learning</span>
              <span>CNN</span>
              <span>Decision Trees</span>
              <span>Computer Vision</span>
            </div>
            <div className="card-links">
              <a href="https://github.com/AndresArdila544/COMP6721-Course-Project" target="_blank" rel="noopener noreferrer">View Repository →</a>
              <a href={mlReport} target="_blank" rel="noopener noreferrer">View Report PDF →</a>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills">
        <h2>Skills & Technologies</h2>
        <div className="skills-grid">
          <div className="skill-item">
            <h3>Programming Languages</h3>
            <p>Java, Go, C/C++, Python, JavaScript, TypeScript</p>
          </div>
          <div className="skill-item">
            <h3>Frontend</h3>
            <p>React, Angular, Vue.js, HTML/CSS, SASS</p>
          </div>
          <div className="skill-item">
            <h3>Backend & Frameworks</h3>
            <p>Go, SpringBoot, Node.js, REST, GraphQL</p>
          </div>
          <div className="skill-item">
            <h3>Databases</h3>
            <p>SQL, NoSQL, MySQL, MongoDB</p>
          </div>
          <div className="skill-item">
            <h3>Cloud & DevOps</h3>
            <p>AWS, Terraform, Jenkins, Git, CI/CD, Kubernetes</p>
          </div>
          <div className="skill-item">
            <h3>Tools & Practices</h3>
            <p>JIRA, SCRUM, Agile</p>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="education">
        <h2>Education</h2>
        <div className="grid">
          <div className="card">
            <h3>MEng Software Engineering</h3>
            <p className="institution">Concordia University</p>
            <p className="date-range">January 2024 - December 2025</p>
            <p className="gpa">GPA: 4.0</p>
          </div>
          <div className="card">
            <h3>BS Computer and Systems Engineering</h3>
            <p className="institution">Universidad Nacional de Colombia</p>
            <p className="date-range">July 2017 - July 2022</p>
            <p className="gpa">GPA: 4.4/5.0</p>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="certifications">
        <h2>Certifications</h2>
        <div className="grid">
          <div className="card">
            <h3>AWS Certified Solutions Architect - Associate</h3>
            <p className="institution">Amazon Web Services</p>
            <p className="date-range">June 2023 - June 2026</p>
            <p>Expertise in cloud architecture, building resilient, secure, and scalable cloud systems.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <h2>Get in Touch</h2>
        <p>Want to collaborate or talk engineering? Let's connect.</p>
        <div className="contact-info">
          <p><strong>Email:</strong> <a href="mailto:andres.ardila.agudelo@gmail.com">andres.ardila.agudelo@gmail.com</a></p>
          <p><strong>Phone:</strong> +1 (514) 386-5037</p>
          <p><strong>Location:</strong> Montreal, QC, Canada</p>
        </div>
        <a className="btn" href="mailto:andres.ardila.agudelo@gmail.com">
          Contact Me
        </a>
        <div className="social-links">
          <a href="https://github.com/AndresArdila544" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/andres-ardila-7b5350130" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </section>

      <footer>
        <p>© 2025 Andres Ardila</p>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

    </div>
  );
};

export default App;
