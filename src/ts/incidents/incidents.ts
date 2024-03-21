function ajouterIncident(): void {
    // Sélectionner l'ul
    const listeIncident = document.getElementById("liste-Incident");

    // Créer un nouvel élément li
    const nouvelIncident = document.createElement("li");

    // Ajouter les éléments p avec le même contenu
    const nomEmploye = document.createElement("p");
    nomEmploye.textContent = "nom employé";
    nouvelIncident.appendChild(nomEmploye);

    const heure = document.createElement("p");
    heure.textContent = "heure";
    nouvelIncident.appendChild(heure);

    const libelle = document.createElement("p");
    libelle.textContent = "libellé";
    nouvelIncident.appendChild(libelle);

    // Créer le bouton avec la même classe et texte
    const boutonRegler = document.createElement("button");
    boutonRegler.className = "adjust-button";
    boutonRegler.innerHTML = "Régler<br>l'incident";
    nouvelIncident.appendChild(boutonRegler);

    // Ajouter le nouvel élément li à l'ul
    listeIncident.appendChild(nouvelIncident);
}

function ajouterIncidentDroite(): void {
    // Sélectionner l'ul
    const listeIncidentDroite = document.getElementById("liste-Incident-right");

    // Créer un nouvel élément li
    const nouvelIncidentDroite = document.createElement("li");

    // Ajouter les éléments p avec le même contenu
    const nomEmploye = document.createElement("p");
    nomEmploye.textContent = "nom employé";
    nouvelIncidentDroite.appendChild(nomEmploye);

    const heure = document.createElement("p");
    heure.textContent = "heure";
    nouvelIncidentDroite.appendChild(heure);

    const libelle = document.createElement("p");
    libelle.textContent = "libellé";
    nouvelIncidentDroite.appendChild(libelle);

    // Ajouter le nouvel élément li à l'ul
    listeIncidentDroite.appendChild(nouvelIncidentDroite);
}


document.addEventListener("DOMContentLoaded", function() {
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
