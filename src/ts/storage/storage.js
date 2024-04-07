"use strict";
function ajouterStock(nameBDD, prixHTBDD, prixTTCBDD, quantiteBDD) {
    // Sélectionner l'ul
    const listeStocks = document.getElementById("liste-stocks");
    // Créer un nouvel élément li
    const stock = document.createElement("li");
    // Ajouter les éléments p avec les valeurs récupérées
    const name = document.createElement("p");
    name.textContent = nameBDD;
    stock.appendChild(name);
    const prixHT = document.createElement("p");
    prixHT.textContent = prixHTBDD; // Remplacez cela par la vraie valeur de l'adresse du fournisseur
    stock.appendChild(prixHT);
    const prixTTC = document.createElement("p");
    prixTTC.textContent = prixTTCBDD; // Remplacez cela par la vraie valeur de l'email du fournisseur
    stock.appendChild(prixTTC);
    const quantite = document.createElement("p");
    quantite.textContent = quantiteBDD; // Remplacez cela par la vraie valeur de l'email du fournisseur
    stock.appendChild(quantite);
    // Créer le bouton avec la même classe et texte
    const btnReappro = document.createElement("button");
    btnReappro.className = "reappro-button";
    btnReappro.innerHTML = "Réappro";
    stock.appendChild(btnReappro);
    // Ajouter le nouvel élément li à l'ul
    listeStocks === null || listeStocks === void 0 ? void 0 : listeStocks.appendChild(stock);
}
function ajouterReappro(id, dateCommande, produit, quantite, prix) {
    // Sélectionner l'ul
    const listeReappro = document.getElementById("liste-reappro");
    // Créer un nouvel élément li
    const reappro = document.createElement("li");
    // Ajouter les éléments p avec les valeurs récupérées
    const idReappro = document.createElement("p");
    idReappro.textContent = id;
    reappro.appendChild(idReappro);
    const date = document.createElement("p");
    date.textContent = dateCommande; // Remplacez cela par la vraie valeur de l'adresse du fournisseur
    reappro.appendChild(date);
    const produitReappro = document.createElement("p");
    produitReappro.textContent = produit; // Remplacez cela par la vraie valeur de l'email du fournisseur
    reappro.appendChild(produitReappro);
    const quantiteReappro = document.createElement("p");
    quantiteReappro.textContent = quantite; // Remplacez cela par la vraie valeur de l'email du fournisseur
    reappro.appendChild(quantiteReappro);
    const prixReappro = document.createElement("p");
    prixReappro.textContent = prix; // Remplacez cela par la vraie valeur de l'email du fournisseur
    reappro.appendChild(prixReappro);
    const btnAnnuler = document.createElement("button");
    btnAnnuler.className = "annuler-button";
    btnAnnuler.innerHTML = "Annuler";
    reappro.appendChild(btnAnnuler);
    const btnEnregistrer = document.createElement("button");
    btnEnregistrer.className = "enregistrer-button";
    btnEnregistrer.innerHTML = "Enregistrer la reception";
    reappro.appendChild(btnEnregistrer);
    // Ajouter le nouvel élément li à l'ul
    listeReappro === null || listeReappro === void 0 ? void 0 : listeReappro.appendChild(reappro);
}
function ajouterMenu(plat, prix, ingredients) {
    const listeReappro = document.getElementById("liste-reappro");
    const reappro = document.createElement("li");
    const platReappro = document.createElement("p");
    platReappro.textContent = plat;
    reappro.appendChild(platReappro);
    const prixReappro = document.createElement("p");
    prixReappro.textContent = prix;
    reappro.appendChild(prixReappro);
    const ingredientsReappro = document.createElement("p");
    ingredientsReappro.textContent = ingredients;
    reappro.appendChild(ingredientsReappro);
    const btnModifier = document.createElement("button");
    btnModifier.className = "modifier-button";
    btnModifier.innerHTML = "Modifier";
    btnModifier.onclick = () => modifierElementMenu(reappro);
    reappro.appendChild(btnModifier);
    if (listeReappro) {
        listeReappro.appendChild(reappro);
    }
}
function viderListes() {
    const listeStocks = document.getElementById("liste-stocks");
    const listeReappro = document.getElementById("liste-reappro");
    if (listeStocks) { // Vérifie si l'élément existe
        listeStocks.innerHTML = ''; // Vide le contenu de la liste des stocks
    }
    if (listeReappro) { // Vérifie si l'élément existe
        listeReappro.innerHTML = ''; // Vide le contenu de la liste des réapprovisionnements
    }
}
function modifierInterfaceRestaurant() {
    const searchBar = document.querySelector('.search-bar');
    const categorieTitle = document.getElementById('categorie_title');
    if (searchBar && categorieTitle) { // Vérifie si les éléments existent
        searchBar.classList.add('hidden'); // Cache la barre de recherche
        categorieTitle.textContent = 'Restaurant'; // Change le texte en "Menu"
    }
}
function afficherBarreRecherche() {
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) { // Vérifie si l'élément existe
        searchBar.classList.remove('hidden'); // Supprime la classe "hidden" pour afficher la barre de recherche
    }
}
// Fonction pour initialiser les données pour l'onglet Énergie
function initEnergie() {
    viderListes();
    const categorieTitle = document.getElementById('categorie_title');
    if (categorieTitle) {
        categorieTitle.textContent = 'Energie';
        for (let i = 0; i < 50; i++) {
            ajouterStock("nomEnergie" + i, "prixHT " + i, "prixTTC" + i, "quantite" + i);
        }
        for (let i = 0; i < 50; i++) {
            ajouterReappro("idEnergie" + i, "date" + i, "produit" + i, "quantite" + i, "prix" + i);
        }
    }
}
// Fonction pour initialiser les données pour l'onglet Boutique
function initBoutique() {
    viderListes();
    const categorieTitle = document.getElementById('categorie_title');
    if (categorieTitle) {
        categorieTitle.textContent = 'Boutique';
        for (let i = 0; i < 50; i++) {
            ajouterStock("nomProduit" + i, "prixHT " + i, "prixTTC" + i, "quantite" + i);
        }
        for (let i = 0; i < 50; i++) {
            ajouterReappro("idProduit" + i, "date" + i, "produit" + i, "quantite" + i, "prix" + i);
        }
    }
}
// Fonction pour initialiser les données pour l'onglet Atelier
function initAtelier() {
    viderListes();
    const categorieTitle = document.getElementById('categorie_title');
    if (categorieTitle) {
        categorieTitle.textContent = 'Atelier';
        for (let i = 0; i < 50; i++) {
            ajouterStock("nomOutil" + i, "prixHT " + i, "prixTTC" + i, "quantite" + i);
        }
        for (let i = 0; i < 50; i++) {
            ajouterReappro("idOutil" + i, "date" + i, "produit" + i, "quantite" + i, "prix" + i);
        }
    }
}
// Fonction pour initialiser les données pour l'onglet Restaurant
function initRestaurant() {
    viderListes();
    const categorieTitle = document.getElementById('categorie_title');
    if (categorieTitle) {
        for (let i = 0; i < 50; i++) {
            ajouterStock("nomAliment" + i, "prixHT " + i, "prixTTC" + i, "quantite" + i);
        }
        for (let i = 0; i < 50; i++) {
            ajouterMenu("plat" + i, "prix" + i, "ingredients" + i);
        }
        categorieTitle.textContent = 'Restaurant';
        modifierInterfaceRestaurant();
    }
}
// Fonction pour mettre à jour la vue en fonction de l'ancrage dans l'URL
function updateView() {
    // Récupérer la valeur après le "#"
    var hashValue = window.location.hash.substring(1);
    // Utiliser la valeur récupérée pour initialiser la vue correspondante
    switch (hashValue) {
        case 'energie':
            initEnergie();
            break;
        case 'boutique':
            initBoutique();
            break;
        case 'atelier':
            initAtelier();
            break;
        case 'restaurant':
            initRestaurant();
            break;
        default:
            // Si aucun cas ne correspond, ne rien faire ou effectuer une action par défaut
            break;
    }
}
function modifierElementMenu(li) {
    const elements = li.querySelectorAll('p');
    const placeholders = ['plat', 'prix', 'ingrédient']; // Texte de fond pour chaque input
    elements.forEach(function (element, index) {
        const valeurActuelle = element.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholders[index]; // Définir le texte de fond
        input.value = valeurActuelle;
        input.className = 'input-modifier';
        element.replaceWith(input);
    });
    const boutonValider = document.createElement('button');
    boutonValider.textContent = 'Valider';
    boutonValider.className = 'modifier-button';
    boutonValider.addEventListener('click', function () {
        const inputs = li.querySelectorAll('.input-modifier');
        elements.forEach(function (element, index) {
            const input = inputs[index];
            const nouvelleValeur = input.value;
            element.textContent = nouvelleValeur;
            input.replaceWith(element);
        });
        boutonValider.remove();
        // Accès aux boutons "Modifier" et "Supprimer"
        const boutonModifier = li.querySelector('.modifier-button');
        const boutonSupprimer = li.querySelector('.supprimer-button');
        boutonModifier.style.display = 'inline';
        boutonSupprimer.style.display = 'inline';
    });
    li.appendChild(boutonValider);
    // Accès aux boutons "Modifier" et "Supprimer"
    const boutonModifier = li.querySelector('.modifier-button');
    const boutonSupprimer = li.querySelector('.supprimer-button');
    boutonModifier.style.display = 'none';
    boutonSupprimer.style.display = 'none';
    // Bouton supprimer
    const boutonSupprimerLigne = document.createElement('button');
    boutonSupprimerLigne.textContent = 'Supprimer';
    boutonSupprimerLigne.className = 'supprimer-button'; // Ajout de la classe
    boutonSupprimerLigne.addEventListener('click', function () {
        supprimerElementMenu(li);
    });
    li.appendChild(boutonSupprimerLigne);
}
function supprimerElementMenu(li) {
    li.remove(); // Supprime l'élément de la liste
}
// Écouter l'événement hashchange pour mettre à jour la vue lorsque le lien change
window.addEventListener("hashchange", updateView);
// Appeler la fonction updateView une fois au chargement de la page pour initialiser la vue
document.addEventListener("DOMContentLoaded", updateView);
document.addEventListener("DOMContentLoaded", function () {
});
