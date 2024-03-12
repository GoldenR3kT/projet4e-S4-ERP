// Récupération des éléments du DOM
var input = document.getElementById('calculator-screen-input');
var buttons = document.getElementsByClassName('button-calculator');
var _loop_1 = function (i) {
    var button = buttons[i];
    // Ajout d'un écouteur d'événements à chaque bouton
    button.addEventListener('click', function () {
        // Si le bouton est le bouton 'C', on réinitialise l'input
        if (button.id === 'button-clear') {
            input.value = '';
        }
        // Si le bouton est le bouton 'OK', on évalue l'expression dans l'input
        else if (button.id === 'button-ok') {
            try {
                input.value = eval(input.value);
            }
            catch (e) {
                input.value = 'Erreur';
            }
        }
        // Pour tous les autres boutons, on ajoute la valeur du bouton à l'input
        else {
            input.value += button.textContent;
            console.log(input.value);
        }
    });
};
// Boucle sur tous les boutons
for (var i = 0; i < buttons.length; i++) {
    _loop_1(i);
}
