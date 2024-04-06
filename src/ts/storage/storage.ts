function ajouterStock(): void {
    // Sélectionner l'ul
    const listeStocks = document.getElementById("liste-stocks");

    // Créer un nouvel élément li
    const stock = document.createElement("li");

    // Ajouter les éléments p avec le même contenu
    const name = document.createElement("p");
    name.textContent = "Produit"; // Remplacez cela par la vraie valeur du nom du fournisseur
    stock.appendChild(name);

    const prixHT = document.createElement("p");
    prixHT.textContent = "Prix HT"; // Remplacez cela par la vraie valeur de l'adresse du fournisseur
    stock.appendChild(prixHT);

    const prixTTC = document.createElement("p");
    prixTTC.textContent = "Prix TTC"; // Remplacez cela par la vraie valeur de l'email du fournisseur
    stock.appendChild(prixTTC);

    const quantite = document.createElement("p");
    quantite.textContent = "Quantité"; // Remplacez cela par la vraie valeur de l'email du fournisseur
    stock.appendChild(quantite);

    // Créer le bouton avec la même classe et texte
    const btnReappro = document.createElement("button");
    btnReappro.className = "reappro-button";
    btnReappro.innerHTML = "Réappro";
    stock.appendChild(btnReappro);

    // Ajouter le nouvel élément li à l'ul
    listeStocks?.appendChild(stock);
}

function ajouterReappro(): void {
    // Sélectionner l'ul
    const listeReappro = document.getElementById("liste-reappro");

    // Créer un nouvel élément li
    const reappro = document.createElement("li");

    // Ajouter les éléments p avec le même contenu
    const id = document.createElement("p");
    id.textContent = "id"; // Remplacez cela par la vraie valeur du nom du fournisseur
    reappro.appendChild(id);

    const date = document.createElement("p");
    date.textContent = "Date de commande"; // Remplacez cela par la vraie valeur de l'adresse du fournisseur
    reappro.appendChild(date);

    const produit = document.createElement("p");
    produit.textContent = "Produit || Energie"; // Remplacez cela par la vraie valeur de l'email du fournisseur
    reappro.appendChild(produit);

    const quantite = document.createElement("p");
    quantite.textContent = "Quantite"; // Remplacez cela par la vraie valeur de l'email du fournisseur
    reappro.appendChild(quantite);

    const prix = document.createElement("p");
    prix.textContent = "Prix"; // Remplacez cela par la vraie valeur de l'adresse du fournisseur
    reappro.appendChild(prix);

    const btnAnnuler = document.createElement("button");
    btnAnnuler.className = "annuler-button";
    btnAnnuler.innerHTML = "Annuler";
    reappro.appendChild(btnAnnuler);

    const btnEnregistrer = document.createElement("button");
    btnEnregistrer.className = "enregistrer-button";
    btnEnregistrer.innerHTML = "Enregistrer la reception";
    reappro.appendChild(btnEnregistrer);

    // Ajouter le nouvel élément li à l'ul
    listeReappro?.appendChild(reappro);
}

document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < 50; i++) {
        ajouterStock();
    }

    for (let i = 0; i < 50; i++) {
        ajouterReappro();
    }
});