const navbar = document.querySelector(".navbar");
const navLinks = Array.from(document.querySelectorAll(".nav-link")).filter(
  (a) => {
    const href = a.getAttribute("href") || "";
    return href.startsWith("#") && href.length > 1;
  },
);

const setActiveNav = (targetId) => {
  navLinks.forEach((a) => {
    const isActive = a.getAttribute("href") === `#${targetId}`;
    a.classList.toggle("active", isActive);
    if (isActive) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
    const li = a.closest(".nav-item");
    if (li) li.classList.toggle("actived", isActive);
  });
};

const navCollapse = document.getElementById("navbarNavDropdown");
const getBsCollapse = () => {
  if (!navCollapse) return null;
  const bs = window.bootstrap;
  if (!bs || !bs.Collapse) return null;
  return bs.Collapse.getOrCreateInstance(navCollapse, { toggle: false });
};

navLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href") || "";
    const target = document.querySelector(href);
    const id = (target && target.id) || href.replace("#", "");
    if (id) setActiveNav(id);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (history && history.replaceState) history.replaceState(null, "", href);
    }

    if (navCollapse && navCollapse.classList.contains("show")) {
      const c = getBsCollapse();
      if (c) c.hide();
      else navCollapse.classList.remove("show");
    }
  });
});

window.addEventListener(
  "scroll",
  () => {
    if (!navbar) return;
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 8);
  },
  { passive: true },
);

const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if (sections.length) {
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible || !visible.target || !visible.target.id) return;
      setActiveNav(visible.target.id);
    },
    {
      root: null,
      threshold: [0.15, 0.25, 0.35],
      rootMargin: "-20% 0px -70% 0px",
    },
  );

  sections.forEach((s) => io.observe(s));
}

// animation
$(document).ready(function () {
  $(".slick-slider").slick({
    slidesToShow: 3, // Nombre de slides à afficher par défaut
    slidesToScroll: 1, // Nombre de slides à faire défiler à la fois
    autoplay: true, // Activer l'autoplay
    autoplaySpeed: 2000, // Vitesse de l'autoplay
    dots: false, // Afficher les points de navigation
    infinite: true, // Boucle infinie
    pauseOnHover: true, // Pause au survol
    responsive: [
      {
        breakpoint: 1024, // Quand la largeur de l'écran est inférieure à 1024px
        settings: {
          slidesToShow: 2, // Afficher 2 slides
          slidesToScroll: 1, // Faire défiler 1 slide
        },
      },
      {
        breakpoint: 768, // Quand la largeur de l'écran est inférieure à 768px
        settings: {
          slidesToShow: 1, // Afficher 1 slide
          slidesToScroll: 1, // Faire défiler 1 slide
        },
      },
    ],
  });
  // Pause l'autoplay lorsque la souris entre dans le carrousel
  $(".slick-slider").on("mouseenter", function () {
    $(this).slick("slickPause");
  });

  // Reprendre l'autoplay lorsque la souris sort du carrousel
  $(".slick-slider").on("mouseleave", function () {
    $(this).slick("slickPlay");
  });
});
