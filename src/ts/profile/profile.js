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
let emploiDuTemps = [];
// Fonction pour récupérer l'emploi du temps d'un employé
function getEmployeeSchedule(employeeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/voirEdt/${employeeId}`);
            const scheduleData = yield response.json();
            // Transform the received scheduleData into the format expected by the application
            emploiDuTemps = scheduleData.map((item) => {
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
        }
        catch (error) {
            console.error('Error fetching employee schedule:', error);
            return [];
        }
    });
}
function voirinfos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Utilisez l'ID de l'employé pour construire l'URL de la requête fetch
            const idEmploye = 2;
            yield getEmployeeSchedule(idEmploye);
            const response = yield fetch(`/VoirInfosEmploye/${idEmploye}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des informations de l\'employé');
            }
            const infosEmploye = yield response.json();
            // Récupération des éléments HTML où afficher les informations
            const prenomElement = document.getElementById('prenom');
            const nomElement = document.getElementById('nom');
            const rangElement = document.getElementById('rang');
            const emailElement = document.getElementById('email');
            const telephoneElement = document.getElementById('telephone');
            const adresseElement = document.getElementById('adresse');
            const edtElement = document.getElementById('edt');
            // Mise à jour des champs avec les informations obtenues
            if (prenomElement && nomElement && rangElement && emailElement && telephoneElement && adresseElement) {
                prenomElement.textContent = infosEmploye.personne.prenom;
                nomElement.textContent = infosEmploye.personne.nom;
                rangElement.textContent = infosEmploye.rang;
                emailElement.textContent = infosEmploye.personne.partenaire.contact.courriel;
                telephoneElement.textContent = infosEmploye.personne.partenaire.contact.tel;
                adresseElement.textContent = `${infosEmploye.personne.partenaire.contact.adresse}, ${infosEmploye.personne.partenaire.contact.codePostal}`;
                // Afficher l'emploi du temps depuis la liste
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
                }
                else {
                    console.error('Élément HTML pour l\'emploi du temps introuvable.');
                }
            }
            else {
                console.error('Certains éléments HTML sont introuvables.');
            }
        }
        catch (error) { // Indiquer à TypeScript que 'error' peut être de type 'any'
            console.error(error.message);
        }
    });
}
document.addEventListener("DOMContentLoaded", voirinfos);
/*
// Déclarez emploiDuTemps comme un tableau vide pour stocker les données de l'emploi du temps
let emploiDuTemps: PeriodeEDT[] = [];

// La fonction pour obtenir l'emploi du temps de l'employé
async function getEmployeeSchedule(employeId: number): Promise<void> {
    try {
        const response = await fetch(`/voirEdt/${employeId}`);
        
        if (!response.ok) {
            throw new Error('Impossible de récupérer l\'emploi du temps de l\'employé');
        }
        
        const scheduleData = await response.json() as PeriodeEDT[];

        // Assignez les données récupérées à la variable emploiDuTemps
        emploiDuTemps = scheduleData;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'emploi du temps de l\'employé:', error);
        throw error;
    }
}

// La fonction pour afficher les informations de l'employé
async function voirinfos() {
    try {
        const idEmploye = 2;
        await getEmployeeSchedule(idEmploye);

        // Fetch les informations de l'employé
        const response = await fetch(`/VoirInfosEmploye/${idEmploye}`);
       
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des informations de l\'employé');
        }
 
        const infosEmploye = await response.json();

        // Sélectionnez l'élément HTML où afficher l'emploi du temps
        const edtElement = document.getElementById('edt');
 
        // Mise à jour des champs avec les informations obtenues
        if (edtElement) {
            // Réinitialisez le contenu HTML de l'élément EDT
            edtElement.innerHTML = '';

            // Parcourez les périodes de l'emploi du temps et affichez-les
            emploiDuTemps.forEach(periode => {
                edtElement.innerHTML += `
                    <div>
                        <p>Intitulé: ${periode.intitule}</p>
                        <p>Jour: ${periode.jour}</p>
                        <p>Heure de début: ${periode.heureDebut}</p>
                        <p>Heure de fin: ${periode.heureFin}</p>
                    </div>
                `;
            });
        } else {
            console.error('Élément HTML pour l\'emploi du temps introuvable.');
        }
    } catch (error: any) {
        console.error(error.message);
    }
}

// Attachez l'événement DOMContentLoaded à la fonction voirinfos
document.addEventListener("DOMContentLoaded", voirinfos);
*/ 
