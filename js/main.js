// Marque la poubelle de la page en cours dans le menu
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.bin').forEach(function (bin) {
  if (bin.getAttribute('href') === page) {
    bin.setAttribute('aria-current', 'page');
  }
});

// Année automatique dans le footer
const annee = document.getElementById('annee');
if (annee) {
  annee.textContent = new Date().getFullYear();
}

// Apparition douce des blocs au défilement (désactivée si l'utilisateur préfère moins d'animations)
const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduit) {
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
}
