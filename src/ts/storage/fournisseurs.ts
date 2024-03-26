function ajouterFournisseur(): void {

    // Sélectionner l'ul
    const listeIncident = document.getElementById("list-fournisseurs");

    // Créer un nouvel élément li
    const Fournisseur = document.createElement("li");

    // Ajouter les éléments p avec le même contenu
    const name = document.createElement("p");
    name.textContent = "name";
    Fournisseur.appendChild(name);

    const adress = document.createElement("p");
    adress.textContent = "adress";
    Fournisseur.appendChild(adress);

    const mail = document.createElement("p");
    mail.textContent = "mail";
    Fournisseur.appendChild(mail);

    // Créer le bouton avec la même classe et texte
    const btnModify = document.createElement("button");
    btnModify.className = "modify-button";
    btnModify.innerHTML = "Régler<br>l'incident";
    Fournisseur.appendChild(btnModify);

    // Créer le bouton avec la même classe et texte
    const btnDelete = document.createElement("button");
    btnDelete.className = "modify-button";
    btnDelete.innerHTML = "Régler<br>l'incident";
    Fournisseur.appendChild(btnDelete);


    // Ajouter le nouvel élément li à l'ul
    listeIncident?.appendChild(Fournisseur);

}

document.addEventListener("DOMContentLoaded", function () {
    ajouterFournisseur()
});

