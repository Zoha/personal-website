document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollAnimations();
  initNavHighlight();
  initHeaderShadow();
  initSkillBars();
  initTimelineAnimation();
  initContactForm();
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

function initContactForm() {
  const form = document.getElementById("contact-form") as HTMLFormElement;
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `<svg class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg><span>Sending...</span>`;
    submitBtn.setAttribute("disabled", "true");

    setTimeout(() => {
      submitBtn.innerHTML = `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span>Message Sent!</span>`;
      submitBtn.classList.remove("bg-primary", "hover:bg-primary-dark");
      submitBtn.classList.add("bg-accent");

      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.removeAttribute("disabled");
        submitBtn.classList.remove("bg-accent");
        submitBtn.classList.add("bg-primary", "hover:bg-primary-dark");
        form.reset();
      }, 2000);
    }, 1500);
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
