// Interface de modification des informations de l'employé(e).
interface ModificationInfosEmploye {
    idEmploye: number;
    colonne: string;
    nouvelleValeur: string;
}

// Fonction de modification des informations de l'employé(e).
async function modifierInfosEmploye(modification: ModificationInfosEmploye): Promise<void> {
    try {
        const response = await fetch('/modifierInfosEmployeProfil', {
            method: 'PUT', // Utilisation de la méthode PUT pour la modification.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modification)
        });

        // Vérification de la réponse HTTP.
        if (!response.ok) {
            throw new Error('Erreur lors de la modification des informations de l\'employé');
        }

        // Récupération du résultat de la modification.
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Erreur lors de la modification des informations de l\'employé:', error);
        throw error;
    }
}

// Déclenchement de l'évènement.
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('conteneur-modifications');

    if(form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Empêche le rechargement de la page.
    
            // Récupération de la nouvelle valeur depuis le champ du formulaire.
            const nouvelleValeurInput = document.getElementById('email') as HTMLInputElement;
            const nouvelleValeur = nouvelleValeurInput.value;
    
            // Modification des informations de l'employé(e).
            const modification: ModificationInfosEmploye = {
                idEmploye: 2,
                colonne: 'personne.partenaire.contact.courriel',
                nouvelleValeur: nouvelleValeur
            };
    
            // Appel de la fonction pour effectuer la modification.
            await modifierInfosEmploye(modification);
        });
    }
    else {
        console.error('Le formulaire de modification est introuvable.');
    }
});
