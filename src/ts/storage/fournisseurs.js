"use strict";
function ajouterFournisseur(nom, adresse, email) {
    // Sélectionner l'ul
    const listeFournisseurs = document.getElementById("liste-fournisseurs");
    // Créer un nouvel élément li
    const fournisseur = document.createElement("li");
    // Ajouter les éléments p avec les valeurs récupérées
    const name = document.createElement("p");
    name.textContent = nom;
    fournisseur.appendChild(name);
    const address = document.createElement("p");
    address.textContent = adresse;
    fournisseur.appendChild(address);
    const mail = document.createElement("p");
    mail.textContent = email;
    fournisseur.appendChild(mail);
    // Créer le bouton "Modifier" avec la même classe et texte
    const btnModify = document.createElement("button");
    btnModify.className = "modify-button";
    btnModify.innerHTML = "Modifier";
    btnModify.onclick = () => modifierProfil(nom, adresse, email);
    fournisseur.appendChild(btnModify);
    // Créer le bouton "Supprimer" avec la même classe et texte
    const btnDelete = document.createElement("button");
    btnDelete.className = "delete-button"; // Ajoutez une classe spécifique pour le bouton Supprimer
    btnDelete.innerHTML = "Supprimer";
    btnDelete.onclick = () => supprimerFournisseur(fournisseur); // Ajoutez un gestionnaire d'événements pour la suppression
    fournisseur.appendChild(btnDelete);
    // Ajouter le nouvel élément li à l'ul
    listeFournisseurs === null || listeFournisseurs === void 0 ? void 0 : listeFournisseurs.appendChild(fournisseur);
}
function supprimerFournisseur(fournisseurElement) {
    // Afficher une popup de confirmation
    const isConfirmed = confirm("Voulez-vous vraiment supprimer ce fournisseur ?");
    if (isConfirmed) {
        // Supprimer l'élément li parent
        fournisseurElement.remove();
    }
}
function modifierProfil(nom, adresse, email) {
    const nomInput = document.getElementById("nom");
    const adresseInput = document.getElementById("adresse");
    const emailInput = document.getElementById("email");
    const profilBtn = document.getElementById("btn_profile");
    // Remplir les inputs avec les données du fournisseur sélectionné
    nomInput.value = nom;
    adresseInput.value = adresse;
    emailInput.value = email;
    // Modifier le texte du bouton profil
    profilBtn.textContent = "Modifier profil";
}
document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < 20; i++) {
        ajouterFournisseur("Fournisseur" + i, "Adresse " + i, "email" + i + "@gmail.com");
    }
    const btnAjouter = document.getElementById("btn_ajouter");
    const nomInput = document.getElementById("nom");
    const adresseInput = document.getElementById("adresse");
    const emailInput = document.getElementById("email");
    const profilBtn = document.getElementById("btn_profile");
    profilBtn.addEventListener("click", () => {
        // Récupérer les valeurs des champs du formulaire
        const nom = nomInput.value;
        const adresse = adresseInput.value;
        const email = emailInput.value;
        // Appeler la fonction ajouterFournisseur avec les valeurs récupérées
        ajouterFournisseur(nom, adresse, email);
        // Effacer le contenu des champs du formulaire après l'ajout
        nomInput.value = "";
        adresseInput.value = "";
        emailInput.value = "";
    });
});
