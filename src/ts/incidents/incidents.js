function ajouterIncident() {
    // Sélectionner l'ul
    var listeIncident = document.getElementById("liste-Incident");
    // Créer un nouvel élément li
    var nouvelIncident = document.createElement("li");
    // Ajouter les éléments p avec le même contenu
    var nomEmploye = document.createElement("p");
    nomEmploye.textContent = "nom employé,";
    nouvelIncident.appendChild(nomEmploye);
    var heure = document.createElement("p");
    heure.textContent = "heure,";
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
});
