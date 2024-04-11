// Interface de la période de l'EDT.
interface PeriodeEDT {
    employe_id: number;
    periode_id: number;
    intitule: string;
    jour: string;
    heureDebut: string;
    heureFin: string;
}

let emploiDuTemps: PeriodeEDT[] = [];

// Fonction pour récupérer l'emploi du temps de l'employé(e).
async function getEmployeeSchedule(employeeId: number): Promise<PeriodeEDT[]> {
    try {
        const response = await fetch(`/voirEdt/${employeeId}`);
        const scheduleData = await response.json();

        emploiDuTemps = scheduleData.map((item: any) => {
            return {
                employe_id: item.employe_id,
                periode_id: item.periode_id,
                intitule: item.intitule,
                jour: new Date(item.periode.dateDebut).toLocaleDateString(),
                heureDebut: new Date(item.periode.dateDebut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                heureFin: new Date(item.periode.dateFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
        });

        return emploiDuTemps;

    } catch (error) {
        console.error('Error fetching employee schedule:', error);
        return [];
    }
}


// Fonction d'affichage des informations du profil de l'employé(e).
async function voirinfos() {
    try {

        // Utilisation l'ID de l'employé(e) pour construire l'URL de la requête fetch.
        const idEmploye = 2;
        await getEmployeeSchedule(idEmploye);
        const response = await fetch(`/VoirInfosEmploye/${idEmploye}`);
       
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des informations de l\'employé');
        }
 
        const infosEmploye = await response.json();
 
        // Récupération des éléments HTML cibles pour l'affichage des informations.
        const prenomElement = document.getElementById('prenom');
        const nomElement = document.getElementById('nom');
        const rangElement = document.getElementById('rang');
        const emailElement = document.getElementById('email');
        const telephoneElement = document.getElementById('telephone');
        const adresseElement = document.getElementById('adresse');
        const edtElement = document.getElementById('edt');
 
        // Mise à jour des champs avec les informations obtenues.
        if (prenomElement && nomElement && rangElement && emailElement && telephoneElement && adresseElement) {
            prenomElement.textContent = infosEmploye.personne.prenom;
            nomElement.textContent = infosEmploye.personne.nom;
            rangElement.textContent = infosEmploye.rang;
            emailElement.textContent = infosEmploye.personne.partenaire.contact.courriel;
            telephoneElement.textContent = infosEmploye.personne.partenaire.contact.tel;
            adresseElement.textContent = `${infosEmploye.personne.partenaire.contact.adresse}, ${infosEmploye.personne.partenaire.contact.codePostal}`;
        
            // Afficher l'emploi du temps depuis la liste.
            if (edtElement) {
                emploiDuTemps.forEach(periode => {
                    edtElement.innerHTML += `   
                        <div class="edt-item">
                            <p>Intitulé: ${periode.intitule}</p>
                            <p>Jour: ${periode.jour}</p>
                            <p>Heure de début: ${periode.heureDebut}</p>
                            <p>Heure de fin: ${periode.heureFin}</p>
                        </div>`;
                });
            } else {
                console.error('Élément HTML pour l\'emploi du temps introuvable.');
            }
        } else {
            console.error('Certains éléments HTML sont introuvables.');
        }
    } catch (error: any) {
        console.error(error.message);
    }
}

document.addEventListener("DOMContentLoaded", voirinfos);