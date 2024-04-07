function ajouterIncident(incident: any) {
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
    listeIncident?.appendChild(nouvelIncident);

    // Ajouter l'écouteur d'événement au nouveau bouton ajouté
    boutonRegler.addEventListener("click", function() {
        // Récupérer l'ID de l'incident à partir de l'objet incident
        const incidentId = incident.id;
        if (incidentId !== undefined) { // Vérifier si l'ID de l'incident est défini
            // Rediriger vers la page d'ajustement de l'incident en incluant l'ID de l'incident dans l'URL
            window.location.href = `/incidents/adjust/${incidentId}`;
        } else {
            console.error("ID de l'incident non défini");
        }
    });
}


function ajouterIncidentDroite(nomEmploye: string, heure: string, libelle: string) {
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
    listeIncidentDroite?.appendChild(nouvelIncidentDroite);
}

function redirectionAnnounce(): void {
    const w = window.top;
    if (w) {
        w.location.href = "/incidents/announce";
    }
}

interface Incident {
    nom: string;
    heure: string;
    niveau: string;
    regle: boolean;
}


document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('/voirDerniersIncidentsNonRegles');
        const incidents: Incident[] = await response.json(); // Utilisation de l'interface Incident

        // Parcourir les incidents récupérés
        incidents.forEach(incident => {
            ajouterIncident(incident); // Passer l'objet incident directement à la fonction
        });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des incidents non réglés :", error);
    }
});


document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('/voirTousIncidents');
        const incidents: Incident[] = await response.json(); // Utilisation de l'interface Incident

        const incidentsRegles = incidents.filter(incident => incident.regle === true);

        // Parcourir les incidents récupérés
        incidentsRegles.forEach(incident => {
            const nomEmploye: string = incident.nom;
            const heure: string = incident.heure;
            const libelle: string = incident.niveau;

            // Appeler la fonction pour ajouter l'incident réglé à droite
            ajouterIncidentDroite(nomEmploye, heure, libelle);
        });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des incidents réglés :", error);
    }
});


