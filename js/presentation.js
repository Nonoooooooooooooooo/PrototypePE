
/* =========================================
   PRÉSENTATION — GESTION DES VIDÉOS
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {
  const videos = document.querySelectorAll('.comic-card video');

  videos.forEach(function (video) {
    video.addEventListener('play', function () {
      videos.forEach(function (otherVideo) {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });
});
