"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function ajouterStock(nameBDD, prixHTBDD, prixTTCBDD, quantiteBDD, idArticle) {
    // Sélectionner l'ul
    const listeStocks = document.getElementById("liste-stocks");
    // Créer un nouvel élément li
    const stock = document.createElement("li");
    // Ajouter les éléments p avec les valeurs récupérées
    const name = document.createElement("p");
    name.textContent = nameBDD;
    stock.appendChild(name);
    const prixHT = document.createElement("p");
    prixHT.textContent = prixHTBDD.toString(); // Remplacez cela par la vraie valeur de l'adresse du fournisseur
    stock.appendChild(prixHT);
    const prixTTC = document.createElement("p");
    prixTTC.textContent = prixTTCBDD; // Remplacez cela par la vraie valeur de l'email du fournisseur
    stock.appendChild(prixTTC);
    const quantite = document.createElement("p");
    quantite.textContent = quantiteBDD.toString(); // Remplacez cela par la vraie valeur de l'email du fournisseur
    stock.appendChild(quantite);
    // Créer le bouton avec la même classe et texte
    const btnReappro = document.createElement("button");
    btnReappro.className = "reappro-button";
    btnReappro.innerHTML = "Réappro";
    btnReappro.addEventListener('click', function () {
        requeteReappro(idArticle, quantiteBDD, prixHTBDD);
        btnReappro.classList.add('bouton-reappro-inactif');
        stock.classList.add('ligne-reappro-active');
    });
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
    return __awaiter(this, void 0, void 0, function* () {
        viderListes();
        const response = yield fetch(`/voirEnergies`);
        const energies = yield response.json();
        console.log(energies);
        const response2 = yield fetch(`/voirReapproEnergie`);
        const reappros = yield response2.json();
        const categorieTitle = document.getElementById('categorie_title');
        if (categorieTitle) {
            categorieTitle.textContent = 'Energie';
            energies.forEach((energy, index) => {
                const { id, nom, prixHT, prixTTC, quantite } = energy.article;
                ajouterStock(nom, prixHT, prixTTC.toString(), quantite, id);
            });
            reappros.forEach((reappro, index) => {
                const { id_transaction, transaction: { date, mouvements } } = reappro;
                // Conversion de la date en objet Date
                const formattedDate = new Date(date);
                // Formatage de la date en "DD/MM/YY"
                const formattedDateString = formattedDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
                const produits = mouvements.map(mouvement => {
                    return {
                        id: mouvement.article_id,
                        nom: `Produit ${mouvement.article_id}`,
                        quantite: mouvement.quantite,
                        prix: 0 // Mettez ici le prix correspondant si vous avez l'information
                    };
                });
                produits.forEach(produit => {
                    ajouterReappro(id_transaction.toString(), formattedDateString, produit.nom, produit.quantite.toString(), produit.prix.toString());
                });
            });
        }
    });
}
// Fonction pour initialiser les données pour l'onglet Boutique
function initBoutique() {
    return __awaiter(this, void 0, void 0, function* () {
        viderListes();
        const response = yield fetch(`/voirProduits/Boutique`);
        const boutique = yield response.json();
        console.log(boutique);
        const response2 = yield fetch(`/voirReapproProduit/Boutique`);
        const reappros = yield response2.json();
        const categorieTitle = document.getElementById('categorie_title');
        if (categorieTitle) {
            categorieTitle.textContent = 'Boutique';
            boutique.forEach((produit, index) => {
                const { id, nom, prixHT, prixTTC, quantite } = produit.article;
                ajouterStock(nom, prixHT, prixTTC.toString(), quantite, id);
            });
            reappros.forEach((reappro, index) => {
                const { id_transaction, transaction: { date, mouvements } } = reappro;
                // Conversion de la date en objet Date
                const formattedDate = new Date(date);
                // Formatage de la date en "DD/MM/YY"
                const formattedDateString = formattedDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
                const produits = mouvements.map(mouvement => {
                    return {
                        id: mouvement.article_id,
                        nom: `Produit ${mouvement.article_id}`,
                        quantite: mouvement.quantite,
                        prix: 0 // Mettez ici le prix correspondant si vous avez l'information
                    };
                });
                produits.forEach(produit => {
                    ajouterReappro(id_transaction.toString(), formattedDateString, produit.nom, produit.quantite.toString(), produit.prix.toString());
                });
            });
        }
    });
}
// Fonction pour initialiser les données pour l'onglet Atelier
function initAtelier() {
    return __awaiter(this, void 0, void 0, function* () {
        viderListes();
        const response = yield fetch(`/voirProduits/Atelier`);
        const boutique = yield response.json();
        const response2 = yield fetch(`/voirReapproProduit/Atelier`);
        const reappros = yield response2.json();
        const categorieTitle = document.getElementById('categorie_title');
        if (categorieTitle) {
            categorieTitle.textContent = 'Atelier';
            boutique.forEach((produit, index) => {
                const { id, nom, prixHT, prixTTC, quantite } = produit.article;
                ajouterStock(nom, prixHT, prixTTC.toString(), quantite, id);
            });
            reappros.forEach((reappro, index) => {
                const { id_transaction, transaction: { date, mouvements } } = reappro;
                // Conversion de la date en objet Date
                const formattedDate = new Date(date);
                // Formatage de la date en "DD/MM/YY"
                const formattedDateString = formattedDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
                const produits = mouvements.map(mouvement => {
                    return {
                        id: mouvement.article_id,
                        nom: `Produit ${mouvement.article_id}`,
                        quantite: mouvement.quantite,
                        prix: 0 // Mettez ici le prix correspondant si vous avez l'information
                    };
                });
                produits.forEach(produit => {
                    ajouterReappro(id_transaction.toString(), formattedDateString, produit.nom, produit.quantite.toString(), produit.prix.toString());
                });
            });
        }
    });
}
// Fonction pour initialiser les données pour l'onglet Restaurant
function initRestaurant() {
    return __awaiter(this, void 0, void 0, function* () {
        viderListes();
        const response = yield fetch(`/voirProduits/Restaurant`);
        const restaurant = yield response.json();
        const categorieTitle = document.getElementById('categorie_title');
        if (categorieTitle) {
            restaurant.forEach((ingredient, index) => {
                const { id, nom, prixHT, prixTTC, quantite } = ingredient.article;
                ajouterStock(nom, prixHT, prixTTC.toString(), quantite, id);
            });
            categorieTitle.textContent = 'Restaurant';
            modifierInterfaceRestaurant();
        }
    });
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
            initEnergie();
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
function requeteReappro(idArticle, quantite, prixHT) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/lancerReappro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idArticle: idArticle, quantite: 1000, date: Date.now(), totalHT: quantite * prixHT, TVA: 0.2 })
            });
            if (response.ok) {
                const responseData = yield response.json();
                console.log(responseData.message);
            }
            else {
                console.error('Erreur lors de la requête : ', response.status);
            }
        }
        catch (error) {
            console.error('Une erreur est survenue : ', error);
        }
    });
}
// Écouter l'événement hashchange pour mettre à jour la vue lorsque le lien change
window.addEventListener("hashchange", updateView);
// Appeler la fonction updateView une fois au chargement de la page pour initialiser la vue
document.addEventListener("DOMContentLoaded", updateView);
document.addEventListener("DOMContentLoaded", function () {
});
