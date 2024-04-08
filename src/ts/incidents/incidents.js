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
function ajouterIncident(incident) {
    // Sélectionner l'ul
    const listeIncident = document.getElementById("liste-Incident");
    // Créer un nouvel élément li
    const nouvelIncident = document.createElement("li");
    // Ajouter les éléments p avec les informations de l'incident
    const nomEmployeElement = document.createElement("p");
    nomEmployeElement.textContent = incident.nom;
    nouvelIncident.appendChild(nomEmployeElement);
    const heureElement = document.createElement("p");
    heureElement.textContent = incident.heure;
    nouvelIncident.appendChild(heureElement);
    const libelleElement = document.createElement("p");
    libelleElement.textContent = incident.niveau;
    nouvelIncident.appendChild(libelleElement);
    // Créer le bouton avec la même classe et texte
    const boutonRegler = document.createElement("button");
    boutonRegler.className = "adjust-button";
    boutonRegler.innerHTML = "Régler<br>l'incident";
    nouvelIncident.appendChild(boutonRegler);
    // Ajouter le nouvel élément li à l'ul
    listeIncident === null || listeIncident === void 0 ? void 0 : listeIncident.appendChild(nouvelIncident);
    // Ajouter l'écouteur d'événement au nouveau bouton ajouté
    boutonRegler.addEventListener("click", function () {
        // Récupérer l'ID de l'incident à partir de l'objet incident
        const incidentId = incident.id;
        if (incidentId !== undefined) { // Vérifier si l'ID de l'incident est défini
            // Rediriger vers la page d'ajustement de l'incident en incluant l'ID de l'incident dans l'URL
            window.location.href = `/incidents/adjust/${incidentId}`;
        }
        else {
            console.error("ID de l'incident non défini");
        }
    });
}
function ajouterIncidentDroite(nomEmploye, heure, libelle) {
    // Sélectionner l'ul à droite
    const listeIncidentDroite = document.getElementById("liste-Incident-right");
    // Créer un nouvel élément li
    const nouvelIncidentDroite = document.createElement("li");
    // Ajouter les éléments p avec les informations de l'incident
    const nomEmployeElement = document.createElement("p");
    nomEmployeElement.textContent = nomEmploye;
    nouvelIncidentDroite.appendChild(nomEmployeElement);
    const heureElement = document.createElement("p");
    heureElement.textContent = heure;
    nouvelIncidentDroite.appendChild(heureElement);
    const libelleElement = document.createElement("p");
    libelleElement.textContent = libelle;
    nouvelIncidentDroite.appendChild(libelleElement);
    // Ajouter le nouvel élément li à l'ul à droite
    listeIncidentDroite === null || listeIncidentDroite === void 0 ? void 0 : listeIncidentDroite.appendChild(nouvelIncidentDroite);
}
function redirectionAnnounce() {
    const w = window.top;
    if (w) {
        w.location.href = "/incidents/announce";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/voirDerniersIncidentsNonRegles');
            const incidents = yield response.json(); // Utilisation de l'interface Incident
            // Parcourir les incidents récupérés
            incidents.forEach(incident => {
                ajouterIncident(incident); // Passer l'objet incident directement à la fonction
            });
        }
        catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des incidents non réglés :", error);
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('/voirDerniersIncidentsRegles');
            const incidents = yield response.json();
            // Parcourir les incidents récupérés
            incidents.forEach(incident => {
                const nomEmploye = incident.nom;
                const heure = incident.heure;
                const libelle = incident.niveau;
                // Appeler la fonction pour ajouter l'incident réglé à droite
                ajouterIncidentDroite(nomEmploye, heure, libelle);
            });
        }
        catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des incidents réglés :", error);
        }
    });
});
