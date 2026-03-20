const projects = [
  {
    title: "Password Strength Checker",
    type: "Cybersecurity Utility",
    description: "A security-focused tool that evaluates password quality using length, character diversity, and common pattern checks. It helps users create stronger credentials and understand password hardening best practices.",
    tech: ["Python", "Linux", "Cybersecurity"]
  },
  {
    title: "Portfolio Website",
    type: "Personal Branding",
    description: "A responsive personal portfolio that showcases my cybersecurity role, technical skills, and practical projects with a clean user experience for recruiters.",
    tech: ["HTML5", "CSS3", "JavaScript"]
  }
];

const skills = [
  { name: "Python", level: 90 },
  { name: "Linux", level: 88 },
  { name: "Cybersecurity Fundamentals", level: 86 },
  { name: "Threat Analysis", level: 82 },
  { name: "Incident Response Basics", level: 80 },
  { name: "Java", level: 84 },
  { name: "HTML5", level: 90 },
  { name: "CSS3", level: 88 },
  { name: "JavaScript", level: 86 }
];

const aboutTech = ["Python", "Linux", "Java", "HTML5", "CSS3", "JavaScript", "Cybersecurity", "Password Security", "GitHub", "VS Code"];

function createProjectCard(project) {
  const techMarkup = project.tech.map((item) => `<span>${item}</span>`).join("");

  return `
    <article class="project-card reveal">
      <div class="project-thumb" aria-hidden="true">
        <span>${project.type}</span>
      </div>
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">${techMarkup}</div>
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
  const projectCount = document.getElementById("project-count");

  if (projectsGrid) {
    projectsGrid.innerHTML = projects.map(createProjectCard).join("");
  }

  if (skillsGrid) {
    skillsGrid.innerHTML = skills.map(createSkillCard).join("");
  }

  if (techWrap) {
    techWrap.innerHTML = aboutTech.map((item) => `<span class="tag">${item}</span>`).join("");
  }

  if (projectCount) {
    projectCount.textContent = String(projects.length);
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
