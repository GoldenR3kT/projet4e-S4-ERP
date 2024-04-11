"use strict";
// Récupération des éléments du DOM
let input = document.getElementById('calculator-screen-input');
let buttons = document.getElementsByClassName('button-calculator');
// Ajout d'un gestionnaire d'événements au clic sur les boutons de la calculatrice
for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener('click', function (event) {
        //  bouton 'C', on réinitialise l'input
        if (button.id === 'button-clear') {
            input.value = '';
            event.stopPropagation();
        }
        //  bouton 'OK', on évalue l'expression dans l'input
        else if (button.id === 'button-ok') {
            try {
                const result = eval(input.value);
                console.log('Result:', result);
                input.value = result;
            }
            catch (error) {
                console.error('Evaluation Error:', error);
                input.value = 'Erreur';
            }
        }
        //  autres boutons, on ajoute la valeur du bouton à l'input
        else {
            input.value += button.textContent;
            console.log(input.value);
        }
    });
}
