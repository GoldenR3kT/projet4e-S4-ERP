function ajouterFournisseur(): void {
    // Sélectionner l'ul
    const listeFournisseurs = document.getElementById("liste-fournisseurs");

    // Créer un nouvel élément li
    const fournisseur = document.createElement("li");

    // Ajouter les éléments p avec le même contenu
    const name = document.createElement("p");
    name.textContent = "Nom du fournisseur"; // Remplacez cela par la vraie valeur du nom du fournisseur
    fournisseur.appendChild(name);

    const address = document.createElement("p");
    address.textContent = "Adresse du fournisseur"; // Remplacez cela par la vraie valeur de l'adresse du fournisseur
    fournisseur.appendChild(address);

    const mail = document.createElement("p");
    mail.textContent = "Email du fournisseur"; // Remplacez cela par la vraie valeur de l'email du fournisseur
    fournisseur.appendChild(mail);

    // Créer le bouton avec la même classe et texte
    const btnModify = document.createElement("button");
    btnModify.className = "modify-button";
    btnModify.innerHTML = "Modifier";
    btnModify.onclick = () => modifierProfil(name.textContent || "", address.textContent || "", mail.textContent || "");
    fournisseur.appendChild(btnModify);

    // Créer le bouton avec la même classe et texte
    const btnDelete = document.createElement("button");
    btnDelete.className = "modify-button";
    btnDelete.innerHTML = "Supprimer";
    fournisseur.appendChild(btnDelete);

    // Ajouter le nouvel élément li à l'ul
    listeFournisseurs?.appendChild(fournisseur);
}

function modifierProfil(nom: string, adresse: string, email: string): void {
    const nomInput = document.getElementById("nom") as HTMLInputElement;
    const adresseInput = document.getElementById("adresse") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const profilBtn = document.getElementById("btn_profile") as HTMLButtonElement;

    // Remplir les inputs avec les données du fournisseur sélectionné
    nomInput.value = nom;
    adresseInput.value = adresse;
    emailInput.value = email;

    // Modifier le texte du bouton profil
    profilBtn.textContent = "Modifier profil";
}

document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < 50; i++) {
        ajouterFournisseur();
    }

    const btnAjouter = document.getElementById("btn_ajouter") as HTMLButtonElement;
    const nomInput = document.getElementById("nom") as HTMLInputElement;
    const adresseInput = document.getElementById("adresse") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const profilBtn = document.getElementById("btn_profile") as HTMLButtonElement;

    btnAjouter.addEventListener("click", () => {
        // Effacer le contenu des inputs
        nomInput.value = "";
        adresseInput.value = "";
        emailInput.value = "";

        // Remettre le texte original du bouton profil
        profilBtn.textContent = "Ajouter un fournisseur";
    });
});

