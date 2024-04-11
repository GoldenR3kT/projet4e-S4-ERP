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
function modifierInfosEmploye(modification) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/modifierInfosEmployeProfil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(modification)
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la modification des informations de l\'employé');
            }
            const result = yield response.json();
            console.log(result.message); // Affiche le message de succès de la modification
        }
        catch (error) {
            console.error('Erreur lors de la modification des informations de l\'employé:', error);
            throw error; // Propagez l'erreur pour qu'elle puisse être gérée en amont si nécessaire
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('conteneur-modifications');
    if (form) {
        form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault(); // Empêche le rechargement de la page
            const nouvelleValeurInput = document.getElementById('email');
            const nouvelleValeur = nouvelleValeurInput.value;
            // Modifiez les informations de l'employé
            const modification = {
                idEmploye: 2, // ID de l'employé à modifier (utilisez l'ID approprié)
                colonne: 'personne.partenaire.contact.courriel', // Colonne à modifier
                nouvelleValeur: nouvelleValeur // Nouvelle valeur de l'adresse email
            };
            // Appelez la fonction pour effectuer la modification
            yield modifierInfosEmploye(modification);
        }));
    }
    else {
        console.error('Le formulaire de modification est introuvable.');
    }
});
