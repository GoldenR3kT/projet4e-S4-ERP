async function voirinfos() {
    try {
        // Utilisez l'ID de l'employé pour construire l'URL de la requête fetch
        const idEmploye = 2;
        const response = await fetch(`/VoirInfosEmploye/${idEmploye}`);
       
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des informations de l\'employé');
        }
 
        const infosEmploye = await response.json();
 
        // Récupération des éléments HTML où afficher les informations
        const prenomElement = document.getElementById('prenom');
        const nomElement = document.getElementById('nom');
        const rangElement = document.getElementById('rang');
        const emailElement = document.getElementById('email');
        const telephoneElement = document.getElementById('telephone');
        const adresseElement = document.getElementById('adresse');
 
        // Mise à jour des champs avec les informations obtenues
        if (prenomElement && nomElement && rangElement && emailElement && telephoneElement && adresseElement) {
            prenomElement.textContent = infosEmploye.personne.prenom;
            nomElement.textContent = infosEmploye.personne.nom;
            rangElement.textContent = infosEmploye.rang;
            emailElement.textContent = infosEmploye.personne.partenaire.contact.courriel;
            telephoneElement.textContent = infosEmploye.personne.partenaire.contact.tel;
            adresseElement.textContent = `${infosEmploye.personne.partenaire.contact.adresse}, ${infosEmploye.personne.partenaire.contact.codePostal}`;
        } else {
            console.error('Certains éléments HTML sont introuvables.');
        }
    } catch (error: any) { // Indiquer à TypeScript que 'error' peut être de type 'any'
        console.error(error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Récupérez l'ID de l'employé à partir de l'URL ou d'une autre source
    const idEmploye = 1; // par exemple, récupérer l'ID à partir de l'URL, ou à partir d'un paramètre de fonction, etc.
    voirinfos();
});