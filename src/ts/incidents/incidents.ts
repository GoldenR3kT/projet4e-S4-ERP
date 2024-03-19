function ajouterListeHorizontale() {
    console.log('Ajout de la liste horizontale');
    var divContainer = document.getElementById('left-div');
    console.log('divContainer:', divContainer);
    var ul = document.createElement('ul');
    ul.classList.add('horizontal-list'); // Add this line to add the class

    var items = ['Accueil', 'Actualités', 'Contact', 'À propos'];
    items.forEach(function(itemText) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#';
        a.textContent = itemText;
        li.appendChild(a);
        ul.appendChild(li);
    });

    divContainer.appendChild(ul);
}


document.addEventListener('DOMContentLoaded', function() {
    ajouterListeHorizontale();
});
