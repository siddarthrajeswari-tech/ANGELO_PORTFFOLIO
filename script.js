const projects = [
  {
    title: "Portfolio Website",
    type: "Personal Branding",
    description: "A responsive developer portfolio designed for recruiters, with strong SEO, smooth section transitions, and modern visual hierarchy.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/siddarthrajeswari-tech/PORTFOLIO",
    live: "https://myportfoliostd.netlify.app"
  }
];

const skills = [
  { name: "HTML5", level: 95 },
  { name: "CSS3", level: 92 },
  { name: "JavaScript", level: 88 },
  { name: "Java", level: 80 },
  { name: "Git & GitHub", level: 86 },
  { name: "Responsive Design", level: 90 }
];

const aboutTech = ["HTML5", "CSS3", "JavaScript", "Java", "Git", "GitHub", "VS Code", "REST APIs"];

function createProjectCard(project) {
  const techMarkup = project.tech.map((item) => `<span>${item}</span>`).join("");
  const hasLiveDemo = typeof project.live === "string" && project.live.trim() !== "";

  return `
    <article class="project-card reveal">
      <div class="project-thumb" aria-hidden="true">
        <span>${project.type}</span>
      </div>
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">${techMarkup}</div>
        <div class="project-links">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
          ${hasLiveDemo ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ""}
        </div>
      </div>
    </article>
  `;
}

function createSkillCard(skill) {
  return `
    <article class="skill-card reveal">
      <div class="skill-row">
        <strong>${skill.name}</strong>
        <span>${skill.level}%</span>
      </div>
      <div class="meter" aria-label="${skill.name} proficiency">
        <span style="width: ${skill.level}%;"></span>
      </div>
    </article>
  `;
}

function renderContent() {
  const projectsGrid = document.getElementById("projects-grid");
  const skillsGrid = document.getElementById("skills-grid");
  const techWrap = document.getElementById("about-tech");

  if (projectsGrid) {
    projectsGrid.innerHTML = projects.map(createProjectCard).join("");
  }

  if (skillsGrid) {
    skillsGrid.innerHTML = skills.map(createSkillCard).join("");
  }

  if (techWrap) {
    techWrap.innerHTML = aboutTech.map((item) => `<span class="tag">${item}</span>`).join("");
  }
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          if (entry.target.classList.contains("skill-card")) {
            const meter = entry.target.querySelector(".meter");
            meter && meter.classList.add("animate");
          }
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupActiveNav() {
  const links = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  const setActive = (id) => {
    links.forEach((link) => {
      const isMatch = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isMatch);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  if (!form || !feedback) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      feedback.textContent = "Please fill in all required fields correctly.";
      return;
    }

    feedback.textContent = "Thanks for reaching out. I will get back to you soon.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderContent();
  setupMobileMenu();
  setupRevealAnimations();
  setupActiveNav();
  setupContactForm();
});
