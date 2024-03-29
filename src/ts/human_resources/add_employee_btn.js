"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const addEmployeeButton = document.getElementById("add-employee-button");
    const infoEmployeeSection = document.querySelector(".info-employee");
    let selectedRoles = []; // Variable pour stocker les rôles sélectionnés
    // Fonction pour gérer le clic sur le bouton "Ajouter un employé"
    function handleAddEmployeeClick(event) {
        event.preventDefault(); // Pour éviter le comportement par défaut du bouton (rechargement de la page)
        // Construction du formulaire à afficher dans la section info-employee
        const formHTML = `
            <form action="#" method="POST">
                <h2>Ajouter un employé : 
                    <input type="submit" value="Confirmer l'ajout">
                </h2>
                <fieldset>
                    <legend>INFORMATIONS</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="nom">Nom :</label>
                            <input type="text" id="nom" name="nom" required>
                        </div>
                    
                        <div class="input-container">
                            <label for="prenom">Prénom :</label>
                            <input type="text" id="prenom" name="prenom" required>
                        </div>
                    </div>
                    
                    <div class="line-input">
                        <div class="input-container">
                            <label for="tel">Numéro de téléphone :</label>
                            <input type="tel" id="tel" name="tel" required>
                        </div>
                    
                        <div class="input-container">
                            <label for="email">Adresse email :</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                    </div>
                    
                    <div class="line-input">
                        <div class="input-container">
                            <label for="adresse">Adresse :</label>
                            <textarea id="adresse" name="adresse" rows="4" required></textarea>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>POSTE</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="poste">Poste :</label>
                            <input type="text" id="poste" name="poste" required>
                        </div>
                    
                        <div class="input-container">
                            <label for="rang">Rang :</label>
                            <input type="text" id="rang" name="rang" required>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>ROLES</legend>
                                        
                    <div class="line-input">
                        <div class="input-container">
                            <label for="selected-roles">Rôles sélectionnés :</label>
                            <ul id="selected-roles"></ul>
                        </div>
                    </div>
                    <div class="line-input">
                        <div class="input-container">
                            <div class="role-selector-container">
                                <label for="role">Rôle :</label>
                                <select id="role" name="role">
                                    <option value="role1">Rôle 1</option>
                                    <option value="role2">Rôle 2</option>
                                    <option value="role3">Rôle 3</option>
                                </select>
                                <button type="button" id="add-role-button">Ajouter</button>
                                <button type="button" id="remove-role-button">Supprimer</button>
                            </div>
                        </div>
                    </div>
                    
                    <br><br>
                </fieldset>
            </form>
        `;
        // Affichage du formulaire dans la section info-employee
        if (infoEmployeeSection) {
            infoEmployeeSection.innerHTML = formHTML;
            // Ajouter des gestionnaires d'événements pour les boutons "Ajouter" et "Supprimer" les rôles
            const addRoleButton = document.getElementById("add-role-button");
            const removeRoleButton = document.getElementById("remove-role-button");
            // @ts-ignore
            addRoleButton.addEventListener("click", handleAddRoleClick);
            // @ts-ignore
            removeRoleButton.addEventListener("click", handleRemoveRoleClick);
        }
    }
    // Fonction pour gérer le clic sur le bouton "Ajouter"
    function handleAddRoleClick() {
        const roleSelect = document.getElementById("role"); // Spécifiez le type HTMLSelectElement
        const selectedRolesList = document.getElementById("selected-roles");
        const selectedRole = roleSelect.options[roleSelect.selectedIndex].value;
        const option = roleSelect.querySelector(`option[value="${selectedRole}"]`);
        // Vérifier si l'option n'a pas déjà été sélectionnée
        if (!selectedRoles.includes(selectedRole) && option) {
            selectedRoles.push(selectedRole); // Ajouter le rôle à la liste des rôles sélectionnés
            updateSelectedRolesList(selectedRolesList); // Mettre à jour l'affichage de la liste des rôles sélectionnés
        }
    }
    // Fonction pour gérer le clic sur le bouton "Supprimer"
    function handleRemoveRoleClick() {
        const roleSelect = document.getElementById("role"); // Spécifiez le type HTMLSelectElement
        const selectedRolesList = document.getElementById("selected-roles");
        const selectedRole = roleSelect.options[roleSelect.selectedIndex].value;
        const option = roleSelect.querySelector(`option[value="${selectedRole}"]`);
        // Recherche de l'index du rôle sélectionné dans le tableau selectedRoles
        const index = selectedRoles.indexOf(selectedRole);
        // Vérifier si le rôle est présent dans le tableau et le retirer s'il est trouvé
        if (index !== -1 && option) {
            selectedRoles.splice(index, 1); // Retirer le rôle du tableau des rôles sélectionnés
            updateSelectedRolesList(selectedRolesList); // Mettre à jour l'affichage de la liste des rôles sélectionnés
        }
    }
    // Fonction pour mettre à jour l'affichage de la liste des rôles sélectionnés
    function updateSelectedRolesList(selectedRolesList) {
        // @ts-ignore
        selectedRolesList.innerHTML = ""; // Effacer le contenu actuel de la liste
        selectedRoles.forEach((role) => {
            const li = document.createElement("li");
            li.textContent = role;
            li.setAttribute("data-value", role);
            // @ts-ignore
            selectedRolesList.appendChild(li); // Ajouter chaque rôle à la liste
        });
    }
    // Ajout de l'écouteur d'événement sur le clic du bouton "Ajouter un employé"
    addEmployeeButton === null || addEmployeeButton === void 0 ? void 0 : addEmployeeButton.addEventListener("click", handleAddEmployeeClick);
});
