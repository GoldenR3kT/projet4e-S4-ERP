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
function voirinfos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Utilisez l'ID de l'employé pour construire l'URL de la requête fetch
            const idEmploye = 2;
            const response = yield fetch(`/VoirInfosEmploye/${idEmploye}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des informations de l\'employé');
            }
            const infosEmploye = yield response.json();
            // Récupération des éléments HTML où afficher les informations
            const prenomElement = document.getElementById('prenom');
            const nomElement = document.getElementById('nom');
            const rangElement = document.getElementById('rang');
            const emailElement = document.getElementById('email');
            const telephoneElement = document.getElementById('telephone');
            const adresseElement = document.getElementById('adresse');
            // Mise à jour des champs avec les informations obtenues
            if (prenomElement && nomElement && rangElement && emailElement && telephoneElement && adresseElement) {
                prenomElement.textContent = infosEmploye.personne.prenom;
                nomElement.textContent = infosEmploye.personne.nom;
                rangElement.textContent = infosEmploye.rang;
                emailElement.textContent = infosEmploye.personne.partenaire.contact.courriel;
                telephoneElement.textContent = infosEmploye.personne.partenaire.contact.tel;
                adresseElement.textContent = `${infosEmploye.personne.partenaire.contact.adresse}, ${infosEmploye.personne.partenaire.contact.codePostal}`;
            }
            else {
                console.error('Certains éléments HTML sont introuvables.');
            }
        }
        catch (error) { // Indiquer à TypeScript que 'error' peut être de type 'any'
            console.error(error.message);
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    // Récupérez l'ID de l'employé à partir de l'URL ou d'une autre source
    const idEmploye = 1; // par exemple, récupérer l'ID à partir de l'URL, ou à partir d'un paramètre de fonction, etc.
    voirinfos();
});
