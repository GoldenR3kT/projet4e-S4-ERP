// Fonction pour basculer entre l'affichage de la navigation et l'agrandissement du contenu principal
function toggleNavigation() {
    const navigationDiv = document.getElementById('navigation-div');
    const mainContent = document.getElementById('main');

    // Vérifier si la navigation est actuellement affichée
    const navigationVisible = navigationDiv?.style.display === 'block';

    // Afficher ou masquer la navigation en fonction de son état actuel
    if (navigationVisible) {
        navigationDiv.style.display = 'none';
        if(mainContent) {
            mainContent.style.width = '100%';
        }
    } else {
        if(navigationDiv && mainContent) {
            navigationDiv.style.display = 'block';
            mainContent.style.width = '80%';
        }
    }
}

// Ajout d'un gestionnaire d'événements au clic sur le bouton de menu
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu');
    if (menuButton) {
        menuButton.addEventListener('click', toggleNavigation);
    }
});
