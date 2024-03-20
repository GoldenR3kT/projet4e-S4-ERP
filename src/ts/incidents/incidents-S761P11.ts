function ajouterIncident(): void {
    // Sélectionner l'ul
    const listeIncident = document.getElementById("liste-Incident");

    // Créer un nouvel élément li
    const nouvelIncident = document.createElement("li");

    // Ajouter les éléments p avec le même contenu
    const nomEmploye = document.createElement("p");
    nomEmploye.textContent = "nom employé,";
    nouvelIncident.appendChild(nomEmploye);

    const heure = document.createElement("p");
    heure.textContent = "heure,";
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

// Appeler la fonction pour ajouter un incident
ajouterIncident();
