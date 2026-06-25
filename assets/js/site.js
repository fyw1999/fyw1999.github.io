const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];

function closeNavigation() {
  if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  if (nav) nav.classList.remove("open");
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    if (nav) nav.classList.toggle("open", !isOpen);
  });
}

navLinks.forEach((link) => link.addEventListener("click", closeNavigation));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.hash === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-20% 0px -65% 0px",
    threshold: [0, 0.2, 0.5],
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
