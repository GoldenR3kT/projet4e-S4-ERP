// Récupération des éléments du DOM
let input = document.getElementById('calculator-screen-input') as HTMLInputElement;
let buttons = document.getElementsByClassName('button-calculator');

// Boucle sur tous les boutons
for(let i = 0; i < buttons.length; i++) {
    let button = buttons[i] as HTMLButtonElement;

    // Ajout d'un écouteur d'événements à chaque bouton
    button.addEventListener('click', function() {
        // Si le bouton est le bouton 'C', on réinitialise l'input
        if(button.id === 'button-clear') {
            input.value = '';
        }
        // Si le bouton est le bouton 'OK', on évalue l'expression dans l'input
        else if(button.id === 'button-ok') {
            try {
                input.value = eval(input.value);
            } catch(e) {
                input.value = 'Erreur';
            }
        }
        // Pour tous les autres boutons, on ajoute la valeur du bouton à l'input
        else {
            input.value += button.textContent;
            console.log(input.value)
        }
    });
}
