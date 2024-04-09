let currentIdFournisseur: number;
function ajouterFournisseur(nom: string, adresse: string, email: string, idFournisseur: number): void {
    // Sélectionner l'ul
    const listeFournisseurs = document.getElementById("liste-fournisseurs");

    // Créer un nouvel élément li
    const fournisseur = document.createElement("li");

    fournisseur.dataset.idFournisseur = idFournisseur.toString();

    // Ajouter les éléments p avec les valeurs récupérées
    const name = document.createElement("p");
    name.textContent = nom;
    fournisseur.appendChild(name);

    const address = document.createElement("p");
    address.textContent = adresse;
    fournisseur.appendChild(address);

    const mail = document.createElement("p");
    mail.textContent = email;
    fournisseur.appendChild(mail);

    // Créer le bouton "Modifier" avec la même classe et texte
    const btnModify = document.createElement("button");
    btnModify.className = "modify-button";
    btnModify.innerHTML = "Modifier";
    btnModify.onclick = () => updateProfilView(nom, adresse, email, idFournisseur);
    fournisseur.appendChild(btnModify);

    // Créer le bouton "Supprimer" avec la même classe et texte
    const btnDelete = document.createElement("button");
    btnDelete.className = "delete-button"; // Ajoutez une classe spécifique pour le bouton Supprimer
    btnDelete.innerHTML = "Supprimer";
    btnDelete.onclick = () => supprimerFournisseur(fournisseur); // Ajoutez un gestionnaire d'événements pour la suppression
    fournisseur.appendChild(btnDelete);

    // Ajouter le nouvel élément li à l'ul
    listeFournisseurs?.appendChild(fournisseur);
}


function supprimerFournisseur(fournisseurElement: HTMLElement): void {
    // Afficher une popup de confirmation
    const isConfirmed = confirm("Voulez-vous vraiment supprimer ce fournisseur ?");

    if (isConfirmed) {
        // Extraire l'identifiant du fournisseur à partir de l'élément HTML
        const idFournisseur = fournisseurElement.dataset.idFournisseur;

        // Envoyer la requête DELETE au serveur pour supprimer le fournisseur
        fetch(`/supprimerFournisseur/${idFournisseur}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Si la requête est réussie, supprimer l'élément HTML correspondant
                    fournisseurElement.remove();
                } else {
                    // Sinon, afficher un message d'erreur
                    throw new Error('Erreur lors de la suppression du fournisseur');
                }
            })
            .catch(error => {
                console.error(error);
                alert('Une erreur est survenue lors de la suppression du fournisseur.');
            });
    }
}


function updateProfilView(nom: string, adresse: string, email: string, idFournisseur: number): void {
    const nomInput = document.getElementById("nom") as HTMLInputElement;
    const adresseInput = document.getElementById("adresse") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const profilBtn = document.getElementById("btn_profile") as HTMLButtonElement;

    // Remplir les inputs avec les données du fournisseur sélectionné
    nomInput.value = nom;
    adresseInput.value = adresse;
    emailInput.value = email;

    // Stocker l'idFournisseur actuel dans la variable globale
    currentIdFournisseur = idFournisseur;

    // Modifier le texte du bouton profil
    profilBtn.textContent = "Modifier profil";
}

function modifyProfil(nom: string, adresse: string, email: string): void {
    const nomInput = document.getElementById("nom") as HTMLInputElement;
    const adresseInput = document.getElementById("adresse") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const profilBtn = document.getElementById("btn_profile") as HTMLButtonElement;

    // Récupérer les valeurs des inputs
    const newNom = nomInput.value;
    const newAdresse = adresseInput.value;
    const newEmail = emailInput.value;

    // Vérifier si les valeurs des inputs sont valides
    if (newNom && newAdresse && newEmail) {
        // Envoyer les données du formulaire au serveur pour modifier le fournisseur
        fetch(`/modifierFournisseur/${currentIdFournisseur}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newNom, newAdresse, newEmail })
        })
            .then(response => {
                if (response.ok) {
                    // Si la requête est réussie, réinitialiser les valeurs des inputs
                    nomInput.value = "";
                    adresseInput.value = "";
                    emailInput.value = "";

                    // Charger à nouveau la liste des fournisseurs
                    initFournisseurs();

                    profilBtn.textContent = "Ajouter fournisseur";
                    profilBtn.className = "add-profil";
                } else {
                    // Sinon, afficher un message d'erreur
                    throw new Error('Erreur lors de la modification du fournisseur');
                }
            })
            .catch(error => {
                console.error(error);
                alert('Une erreur est survenue lors de la modification du fournisseur.');
            });
    } else {
        alert('Veuillez remplir tous les champs du formulaire.');
    }
}

async function initFournisseurs() {
    // Effacer la liste des fournisseurs avant de les charger à nouveau
    const listeFournisseurs = document.getElementById("liste-fournisseurs");
    if (listeFournisseurs) {
        listeFournisseurs.innerHTML = "";
    }

    // Récupérer les données des fournisseurs depuis l'API
    const response = await fetch(`/voirFournisseurs`);
    const fournisseurs = await response.json();
    console.log(fournisseurs);

    // Parcourir les données des fournisseurs et les ajouter à la liste
    fournisseurs.forEach((fournisseur: { nom: string, adresse: string, email: string, id: number }) => {
        ajouterFournisseur(fournisseur.nom, fournisseur.adresse, fournisseur.email, fournisseur.id);
    });
}


document.addEventListener("DOMContentLoaded", function () {
    initFournisseurs()

    const btnAjouter = document.getElementById("btn_ajouter") as HTMLButtonElement;
    const nomInput = document.getElementById("nom") as HTMLInputElement;
    const adresseInput = document.getElementById("adresse") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const profilBtn = document.getElementById("btn_profile") as HTMLButtonElement;

    btnAjouter.addEventListener("click", async () => {
        nomInput.value = "";
        adresseInput.value = "";
        emailInput.value = "";

        profilBtn.textContent = "Ajouter un fournisseur";

    });

    profilBtn.addEventListener("click", async () => {
        if (profilBtn.textContent === "Ajouter un fournisseur") {
            // Récupérer les valeurs des inputs
            const nom = nomInput.value;
            const adresse = adresseInput.value;
            const email = emailInput.value;

            // Envoyer les données du nouveau fournisseur au serveur
            const response = await fetch(`/ajouterFournisseur`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nom, adresse, email })
            });

            if (response.ok) {
                // Si la requête est réussie, ajouter le nouveau fournisseur à la liste
                ajouterFournisseur(nom, adresse, email, 0);
                nomInput.value = "";
                adresseInput.value = "";
                emailInput.value = "";
            } else {
                // Sinon, afficher un message d'erreur
                alert('Une erreur est survenue lors de l\'ajout du fournisseur.');
            }
        } else {
            modifyProfil(nomInput.value, adresseInput.value, emailInput.value, );
        }
    }
    );
});

