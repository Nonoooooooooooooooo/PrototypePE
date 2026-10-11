
document.addEventListener("DOMContentLoaded", () => {
  // Mise à jour de l'année dans le footer commun.
  const annee = document.getElementById("annee");

  if (annee) {
    annee.textContent = new Date().getFullYear();
  }

  // Navigation vers les détails des formules.
  const liensDetails = document.querySelectorAll(
    '.offers-page a[href^="#details-"]'
  );

  liensDetails.forEach((lien) => {
    lien.addEventListener("click", () => {
      const cibleId = lien.getAttribute("href");
      const cible = document.querySelector(cibleId);

      if (!cible) {
        return;
      }

      // Le navigateur gère le défilement via l'ancre.
      // Le focus est déplacé vers la section pour l'accessibilité.
      window.setTimeout(() => {
        cible.focus({ preventScroll: true });
      }, 0);
    });
  });
});
