function ajouterIncident() {
    // Sélectionner l'ul
    var listeIncident = document.getElementById("liste-Incident");
    // Créer un nouvel élément li
    var nouvelIncident = document.createElement("li");
    // Ajouter les éléments p avec le même contenu
    var nomEmploye = document.createElement("p");
    nomEmploye.textContent = "nom employé";
    nouvelIncident.appendChild(nomEmploye);
    var heure = document.createElement("p");
    heure.textContent = "heure";
    nouvelIncident.appendChild(heure);
    var libelle = document.createElement("p");
    libelle.textContent = "libellé";
    nouvelIncident.appendChild(libelle);
    // Créer le bouton avec la même classe et texte
    var boutonRegler = document.createElement("button");
    boutonRegler.className = "adjust-button";
    boutonRegler.innerHTML = "Régler<br>l'incident";
    nouvelIncident.appendChild(boutonRegler);
    // Ajouter le nouvel élément li à l'ul
    listeIncident.appendChild(nouvelIncident);
    // Ajouter l'écouteur d'événement au nouveau bouton ajouté
    boutonRegler.addEventListener("click", function () {
        window.top.location.href = "/incidents/adjust";
    });
}
function ajouterIncidentDroite() {
    // Sélectionner l'ul
    var listeIncidentDroite = document.getElementById("liste-Incident-right");
    // Créer un nouvel élément li
    var nouvelIncidentDroite = document.createElement("li");
    // Ajouter les éléments p avec le même contenu
    var nomEmploye = document.createElement("p");
    nomEmploye.textContent = "nom employé";
    nouvelIncidentDroite.appendChild(nomEmploye);
    var heure = document.createElement("p");
    heure.textContent = "heure";
    nouvelIncidentDroite.appendChild(heure);
    var libelle = document.createElement("p");
    libelle.textContent = "libellé";
    nouvelIncidentDroite.appendChild(libelle);
    // Ajouter le nouvel élément li à l'ul
    listeIncidentDroite.appendChild(nouvelIncidentDroite);
}
function redirectionAnnounce() {
    window.top.location.href = "/incidents/announce";
}
document.addEventListener("DOMContentLoaded", function () {
    ajouterIncident();
    ajouterIncident();
    ajouterIncident();
    ajouterIncident();
    ajouterIncident();
    ajouterIncident();
    ajouterIncident();
    ajouterIncident();
    ajouterIncident();
    ajouterIncident();
    ajouterIncidentDroite();
    ajouterIncidentDroite();
    ajouterIncidentDroite();
    ajouterIncidentDroite();
    ajouterIncidentDroite();
    ajouterIncidentDroite();
    ajouterIncidentDroite();
    ajouterIncidentDroite();
    ajouterIncidentDroite();
    ajouterIncidentDroite();
});
