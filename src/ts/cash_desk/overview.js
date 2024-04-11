"use strict";
// On récupère les éléments du DOM
const printButton = document.getElementById('print-ticket-button');
const noprint = document.getElementById('no-print-ticket-button');
// On ajoute un gestionnaire d'événements au clic sur le bouton d'impression pour imprimer le ticket et retourner à la caisse
printButton.addEventListener('click', () => {
    window.print();
    window.location.href = '/cash_desk';
});
// On ajoute un gestionnaire d'événements au clic sur le bouton de non impression pour ne pas imprimer et retourner à la caisse
noprint.addEventListener('click', () => {
    window.location.href = '/cash_desk';
});
