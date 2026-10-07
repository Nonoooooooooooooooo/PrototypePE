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
