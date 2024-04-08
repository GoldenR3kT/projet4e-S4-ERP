document.addEventListener("DOMContentLoaded", function() {
    const announceButton = document.getElementById("announce-button");

    if (announceButton !== null) {
        announceButton.addEventListener("click", async function() {
            try {
                const nameInput = document.getElementById("name") as HTMLInputElement;
                const levelSelect = document.getElementById("level") as HTMLSelectElement;
                const descriptionInput = document.getElementById("description") as HTMLInputElement;

                if (nameInput && levelSelect && descriptionInput) {
                    const name = nameInput.value;
                    const level = levelSelect.value;
                    const description = descriptionInput.value;
                    console.log(name, level, description);
                    const response = await fetch('/declarerIncident', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nom: name,
                            description: description,
                            niveau: level,
                            idEmploye: 1,
                            date: getCurrentDate(),
                            heure: getCurrentTime()
                        })
                    });
                    const responseData = await response.json();
                    console.log(responseData.message);
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la déclaration de l'incident :", error);
            }
        });
    } else {
        console.error("Element with ID 'announce-button' not found.");
    }
});

function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

function getCurrentTime() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
}

function redirectionIncidents(): void {
    const w = window.top;
    if (w) {
        w.location.href = "/incidents";
    }
}