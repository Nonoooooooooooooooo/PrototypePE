/* ==================================================
   REVAL'0'RESTO — PAGE OFFRES
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Année automatique dans le footer
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Navigation vers les descriptifs complets
  const detailLinks = document.querySelectorAll(
    '.plan-card a[href^="#details-"]'
  );

  detailLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);

      if (!target) return;

      // Permet de repérer la section ciblée à l'aide d'un lecteur d'écran.
      target.setAttribute("tabindex", "-1");

      window.setTimeout(() => {
        target.focus({ preventScroll: true });
      }, 350);
    });
  });
});
