document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollAnimations();
  initNavHighlight();
  initHeaderShadow();
  initSkillBars();
  initTimelineAnimation();
  initBackToTop();
});

function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const header = document.getElementById("header");

  if (!menuBtn || !mobileMenu || !header) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    header.classList.toggle("mobile-menu-open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      header.classList.remove("mobile-menu-open");
    });
  });
}

function initScrollAnimations() {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function initNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-20% 0px -60% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function initHeaderShadow() {
  const header = document.getElementById("header");
  if (!header) return;

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          header.style.boxShadow = "var(--shadow-nav)";
          // Let CSS handle the styling through the scrolled class
          header.classList.add("scrolled");
        } else {
          header.style.boxShadow = "none";
          header.style.backgroundColor = "";
          header.style.borderBottom = "";
          header.classList.remove("scrolled");
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar-inner");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

function initTimelineAnimation() {
  const timelineLine = document.querySelector(".timeline-line");
  if (!timelineLine) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(timelineLine);
}

function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
