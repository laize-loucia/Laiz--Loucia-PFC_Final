// script.js
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides-container');

function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        currentSlide = index;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
    }
}

// Écouteurs d'événements pour les flèches du clavier
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
    } else if (event.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
    }
});

// Écouteurs d'événements pour les boutons (A ajouter)



