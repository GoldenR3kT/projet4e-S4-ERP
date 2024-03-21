// Fonction pour basculer entre l'affichage de la navigation et l'agrandissement du contenu principal
function toggleNavigation() {
    var navigationDiv = document.getElementById('navigation-div');
    var mainContent = document.getElementById('main');
    // Vérifier si la navigation est actuellement affichée
    var navigationVisible = navigationDiv.style.display === 'block';
    // Afficher ou masquer la navigation en fonction de son état actuel
    if (navigationVisible) {
        navigationDiv.style.display = 'none';
        mainContent.style.width = '100%';
    }
    else {
        navigationDiv.style.display = 'block';
        mainContent.style.width = '80%';
    }
}
// Ajout d'un gestionnaire d'événements au clic sur le bouton de menu
document.addEventListener('DOMContentLoaded', function () {
    var menuButton = document.getElementById('menu');
    if (menuButton) {
        menuButton.addEventListener('click', toggleNavigation);
    }
});
