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
function initFournisseurs() {
    return __awaiter(this, void 0, void 0, function* () {
        // Effacer la liste des fournisseurs avant de les charger à nouveau
        const listeFournisseurs = document.getElementById("liste-fournisseurs");
        if (listeFournisseurs) {
            listeFournisseurs.innerHTML = "";
        }
        // Récupérer les données des fournisseurs depuis l'API
        const response = yield fetch(`/voirFournisseurs`);
        const fournisseurs = yield response.json();
        console.log(fournisseurs);
        // Parcourir les données des fournisseurs et les ajouter à la liste
        fournisseurs.forEach((fournisseur) => {
            ajouterFournisseur(fournisseur.nom, fournisseur.adresse, fournisseur.email);
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    initFournisseurs().then(r => console.log("Fournisseurs chargés"));
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
