(() => {
  "use strict";

  const config = window.AEGISCRETE_SITE || {};
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const previewBanner = document.querySelector("[data-preview-banner]");
  const previewClose = document.querySelector("[data-preview-close]");
  const contactLink = document.querySelector("[data-contact-link]");
  const contactPending = document.querySelector("[data-contact-pending]");
  const toolLink = document.querySelector("[data-tool-link]");
  const toolPrivate = document.querySelector("[data-tool-private]");

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  if (config.preview && previewBanner) {
    previewBanner.hidden = false;
  }

  previewClose?.addEventListener("click", () => {
    previewBanner.hidden = true;
    sessionStorage.setItem("aegiscrete-preview-dismissed", "1");
  });

  if (sessionStorage.getItem("aegiscrete-preview-dismissed") === "1" && previewBanner) {
    previewBanner.hidden = true;
  }

  if (typeof config.contactEmail === "string" && config.contactEmail.includes("@")) {
    const subject = encodeURIComponent("AegisCrete infrastructure project inquiry");
    contactLink.href = `mailto:${config.contactEmail}?subject=${subject}`;
    contactLink.hidden = false;
    contactPending.hidden = true;
  }

  if (toolLink && config.publishToolLink === true && typeof config.toolUrl === "string" && config.toolUrl.startsWith("https://")) {
    toolLink.href = config.toolUrl;
    toolLink.hidden = false;
    if (toolPrivate) toolPrivate.hidden = true;
  }

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closeNav = () => {
    nav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    nav?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  const revealNodes = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px" });
    revealNodes.forEach((node) => revealObserver.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  }

  const sectionLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')]
    .filter((link) => link.getAttribute("href").length > 1 && !link.classList.contains("button"));
  const observedSections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && observedSections.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { threshold: 0.2, rootMargin: "-30% 0px -60%" });
    observedSections.forEach((section) => activeObserver.observe(section));
  }
})();
