
const incidentId = window.location.pathname.split('/').pop();

document.addEventListener("DOMContentLoaded", async function() {
    // Récupérer l'ID de l'incident à partir du chemin de l'URL
    if (incidentId) {
        try {
            const response = await fetch(`/voirDetailsIncident/${incidentId}`);
            const incidentDetails = await response.json();
            // Vérifier que les éléments HTML existent avant d'attribuer les valeurs
            const incidentIDElement = document.getElementById("incidentID");
            const employeeInfoElement = document.getElementById("employee-info");
            const dateInfoElement = document.getElementById("date-info");
            const hourInfoElement = document.getElementById("hour-info");
            const titleInfoElement = document.getElementById("title-info");
            const levelInfoElement = document.getElementById("level-info");
            const descriptionElement = document.getElementById("description");

            const titleInfoElementRight = document.getElementById("title-info-right");
            const levelInfoElementRight = document.getElementById("level-info-right");
            const descriptionElementRight = document.getElementById("description-right");

            if (incidentIDElement && employeeInfoElement && dateInfoElement && hourInfoElement && titleInfoElement && levelInfoElement && descriptionElement && titleInfoElementRight && levelInfoElementRight && descriptionElementRight) {
                incidentIDElement.textContent = incidentDetails.id;
                employeeInfoElement.textContent = incidentDetails.employe_id;
                dateInfoElement.textContent = incidentDetails.date;
                hourInfoElement.textContent = incidentDetails.heure;
                titleInfoElement.textContent = incidentDetails.nom;
                levelInfoElement.textContent = incidentDetails.niveau;
                descriptionElement.textContent = incidentDetails.desc;

                titleInfoElementRight.textContent = incidentDetails.nom;
                levelInfoElementRight.textContent = incidentDetails.niveau;
                descriptionElementRight.textContent = incidentDetails.desc;
            } else {
                console.error("Certains éléments HTML spécifiés n'ont pas été trouvés dans le document.");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des détails de l'incident :", error);
        }
    } else {
        console.error("ID de l'incident non trouvé dans l'URL");
    }
});

const adjustButton = document.getElementById("adjust-button");
if (adjustButton) {
    adjustButton.addEventListener("click", async function() {

        const solutionInput = document.getElementById("solution") as HTMLInputElement;
        const solution = solutionInput ? solutionInput.value : '';

        const requestBody = {
            idIncident: incidentId,
            description: solution,
            idEmploye: 1,
            date: getCurrentDate2(),
            heure: getCurrentTime2()
        };

        try {
            const response = await fetch('/gererIncident', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                redirectionIncidents();
            } else {
                console.error("Une erreur s'est produite lors de la gestion de l'incident :", response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la gestion de l'incident :", error);
        }
    });
}

function getCurrentDate2() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

function getCurrentTime2() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
}

function redirectionAnnounce2(): void {
    const w = window.top;
    if (w) {
        w.location.href = "/incidents/announce";
    }
}
