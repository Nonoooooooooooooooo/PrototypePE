
document.addEventListener("DOMContentLoaded", () => {
    // Met à jour automatiquement l'année du copyright.
    const yearElement = document.getElementById("copyright-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Améliore la navigation clavier vers les détails des offres.
    const detailLinks = document.querySelectorAll(
        '.plan-card a[href^="#details-"]'
    );

    detailLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            target.setAttribute("tabindex", "-1");

            window.setTimeout(() => {
                target.focus({ preventScroll: true });
            }, 350);
        });
    });
});
