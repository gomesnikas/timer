let timerInterval;
let clockInterval;

// Fonction pour démarrer le minuteur
function startTimer(duration) {
  let timerElement = document.getElementById('timer');
  let start = Date.now();
  let diff, hours, minutes, seconds;

  clearInterval(timerInterval); // Nettoyer tout intervalle existant

  function updateTimer() {
    // Calculer la différence entre maintenant et le temps de départ
    diff = duration - Math.floor((Date.now() - start) / 1000);

    // Convertir la différence en heures, minutes et secondes
    hours = String(Math.floor(Math.abs(diff) / 3600)).padStart(2, '0');
    minutes = String(Math.floor((Math.abs(diff) % 3600) / 60)).padStart(2, '0');
    seconds = String(Math.floor(Math.abs(diff) % 60)).padStart(2, '0');

    // Ajouter un signe négatif si le temps est écoulé
    let sign = diff < 0 ? '-' : '';
    timerElement.textContent = `${sign}${hours}:${minutes}:${seconds}`;

    // Changer la couleur du texte si le temps est écoulé
    if (diff < 0) {
      timerElement.classList.add('negative');
    } else {
      timerElement.classList.remove('negative');
    }
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000); // Mettre à jour toutes les secondes
}

// Fonction pour afficher l'heure actuelle
function updateClock() {
  let clockElement = document.getElementById('clock');
  let now = new Date();
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');
  clockElement.textContent = `${hours}:${minutes}`;
}

// Fonction pour entrer en mode plein écran
function enterFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, et Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
    elem.msRequestFullscreen();
  }
  document.body.classList.add('fullscreen');
}

// Fonction pour sortir du mode plein écran
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari, et Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
  document.body.classList.remove('fullscreen');
}

// Ajouter un écouteur d'événement pour le bouton plein écran
document.getElementById('fullscreen-btn').addEventListener('click', enterFullscreen);

// Ajouter un écouteur d'événement pour démarrer le minuteur
document.getElementById('start-btn').addEventListener('click', () => {
  const minutes = parseInt(document.getElementById('time-input').value, 10);
  const duration = minutes * 60; // Convertir les minutes en secondes
  startTimer(duration);
});

// Mettre à jour l'horloge toutes les secondes
updateClock();
clockInterval = setInterval(updateClock, 1000);

// Écouter les changements de plein écran
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    document.body.classList.remove('fullscreen');
  }
});
document.addEventListener('webkitfullscreenchange', () => {
  if (!document.webkitFullscreenElement) {
    document.body.classList.remove('fullscreen');
  }
});
document.addEventListener('mozfullscreenchange', () => {
  if (!document.mozFullScreenElement) {
    document.body.classList.remove('fullscreen');
  }
});
document.addEventListener('MSFullscreenChange', () => {
  if (!document.msFullscreenElement) {
    document.body.classList.remove('fullscreen');
  }
});