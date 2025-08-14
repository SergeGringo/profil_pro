// Sélectionne tous les éléments de la classe 'nav-link'
const navLinks = document.querySelectorAll(".nav-link");

// Ajoute un écouteur d'événements de clic à chaque lien
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Retire la classe 'active' de tous les liens
    navLinks.forEach((link) => link.classList.remove("active"));
    // Ajoute la classe 'active' au lien cliqué
    this.classList.add("active");
  });
});

// Sélectionne tous les éléments de la classe 'nav-item'
const navItems = document.querySelectorAll(".nav-item");

// Ajoute un écouteur d'événements de clic à chaque lien
navItems.forEach((items) => {
  items.addEventListener("click", function () {
    // Retire la classe 'actived' de tous les liens
    navItems.forEach((items) => items.classList.remove("actived"));
    // Ajoute la classe 'actived' à l'élément nav-item parent
    this.classList.add("actived");
  });
});

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
