// card.js
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('greeting-card');
    
    card.addEventListener('click', () => {
        card.classList.toggle('is-open');
    });
});
