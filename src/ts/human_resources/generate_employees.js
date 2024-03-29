"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const listEmployees = document.querySelector('.list-employees');
    const infoEmployee = document.querySelector('.info-employee');
    const selectedPermissions = [];
    // Données des employés (simulées)
    const employeesData = [
        { name: "Nom de l'Employé 1", id: 1, nom: "Nom1", prenom: "Prenom1", tel: "123456789", email: "email1@example.com", adresse: "Adresse1", poste: "Poste1", rang: "Rang1" },
        { name: "Nom de l'Employé 2", id: 2, nom: "Nom2", prenom: "Prenom2", tel: "987654321", email: "email2@example.com", adresse: "Adresse2", poste: "Poste2", rang: "Rang2" },
        { name: "Nom de l'Employé 3", id: 3, nom: "Nom3", prenom: "Prenom3", tel: "456123789", email: "email3@example.com", adresse: "Adresse3", poste: "Poste3", rang: "Rang3" },
        { name: "Nom de l'Employé 4", id: 4, nom: "Nom4", prenom: "Prenom4", tel: "789456123", email: "email4@example.com", adresse: "Adresse4", poste: "Poste4", rang: "Rang4" },
        { name: "Nom de l'Employé 5", id: 5, nom: "Nom5", prenom: "Prenom5", tel: "321654987", email: "email5@example.com", adresse: "Adresse5", poste: "Poste5", rang: "Rang5" },
        { name: "Nom de l'Employé 6", id: 6, nom: "Nom6", prenom: "Prenom6", tel: "654987321", email: "email6@example.com", adresse: "Adresse6", poste: "Poste6", rang: "Rang6" },
        { name: "Nom de l'Employé 7", id: 7, nom: "Nom7", prenom: "Prenom7", tel: "987123654", email: "email7@example.com", adresse: "Adresse7", poste: "Poste7", rang: "Rang7" },
        { name: "Nom de l'Employé 8", id: 8, nom: "Nom8", prenom: "Prenom8", tel: "654321987", email: "email8@example.com", adresse: "Adresse8", poste: "Poste8", rang: "Rang8" },
        { name: "Nom de l'Employé 9", id: 9, nom: "Nom9", prenom: "Prenom9", tel: "321987654", email: "email9@example.com", adresse: "Adresse9", poste: "Poste9", rang: "Rang9" },
        { name: "Nom de l'Employé 10", id: 10, nom: "Nom10", prenom: "Prenom10", tel: "987321654", email: "email10@example.com", adresse: "Adresse10", poste: "Poste10", rang: "Rang10" }
    ];
    // Fonction pour créer un élément d'employé
    function createEmployeeElement(employee) {
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee');
        // Informations de l'employé (à gauche)
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('employee-info');
        employeeDiv.appendChild(infoDiv);
        const img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000000\' stroke-width=\'1.25\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3\'/%3E%3Ccircle cx=\'12\' cy=\'10\' r=\'3\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3C/svg%3E');
        img.setAttribute('alt', 'Employee Image');
        infoDiv.appendChild(img);
        const span = document.createElement('span');
        span.textContent = employee.nom + " " + employee.prenom + " " + employee.email + " " + employee.poste;
        infoDiv.appendChild(span);
        // Boutons (à droite)
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('employee-buttons');
        employeeDiv.appendChild(buttonsDiv);
        const voirButton = document.createElement('button');
        voirButton.textContent = "Voir l'EDT";
        voirButton.classList.add('employee-button');
        buttonsDiv.appendChild(voirButton);
        const modifierButton = document.createElement('button');
        modifierButton.textContent = "Modifier l'employé";
        modifierButton.addEventListener('click', () => {
            showEmployeeInfo(employee);
        });
        modifierButton.classList.add('employee-button');
        buttonsDiv.appendChild(modifierButton);
        const supprimerButton = document.createElement('button');
        supprimerButton.textContent = "Supprimer l'employé";
        supprimerButton.addEventListener('click', () => {
            removeEmployee(employeeDiv);
        });
        supprimerButton.classList.add('employee-button');
        buttonsDiv.appendChild(supprimerButton);
        return employeeDiv;
    }
    // Fonction pour afficher les informations de l'employé sélectionné
    function showEmployeeInfo(employee) {
        const employeeInfoHTML = `
            <h2>Modification Informations de l'employé : <span id="employee_id">${employee.id}</span>
                <button id="edt-permissions-button">Modifier l'EDT / Permissions</button>
            </h2>
            <form action="#" method="POST">
                <fieldset>
                    <legend>INFORMATIONS</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="nom">Nom :</label>
                            <input type="text" id="nom" name="nom" value="${employee.nom}" required>
                        </div>
                        <div class="input-container">
                            <label for="prenom">Prénom :</label>
                            <input type="text" id="prenom" name="prenom" value="${employee.prenom}" required>
                        </div>
                    </div>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="tel">Numéro de téléphone :</label>
                            <input type="tel" id="tel" name="tel" value="${employee.tel}" required>
                        </div>
                        <div class="input-container">
                            <label for="email">Adresse email :</label>
                            <input type="email" id="email" name="email" value="${employee.email}" required>
                        </div>
                    </div>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="adresse">Adresse :</label>
                            <textarea id="adresse" name="adresse" rows="4" required>${employee.adresse}</textarea>
                        </div>
                    </div>
                    <br><br>
                </fieldset>
                <fieldset>
                    <legend>POSTE</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="poste">Poste :</label>
                            <input type="text" id="poste" name="poste" value="${employee.poste}" required><br><br>
                        </div>
                        <div class="input-container">
                            <label for="rang">Rang :</label>
                            <input type="text" id="rang" name="rang" value="${employee.rang}" required><br><br>
                        </div>
                    </div>
                </fieldset>
                <input type="submit" value="Confirmer les modifications">
            </form>
        `;
        if (infoEmployee) {
            infoEmployee.innerHTML = employeeInfoHTML;
        }
        const edtPermissionsButton = document.getElementById('edt-permissions-button');
        if (edtPermissionsButton) {
            edtPermissionsButton.addEventListener('click', () => {
                showEDTPermissionsForm(employee);
            });
        }
    }
    // Fonction pour supprimer un employé de la liste
    function removeEmployee(employeeElement) {
        // Retirer l'élément de la liste des employés
        if (listEmployees) {
            listEmployees.removeChild(employeeElement);
        }
    }
    // Peupler la liste des employés
    employeesData.forEach((employee) => {
        const employeeElement = createEmployeeElement(employee);
        listEmployees === null || listEmployees === void 0 ? void 0 : listEmployees.appendChild(employeeElement);
    });
    // Fonction pour afficher le formulaire de modification des permissions et de l'EDT
    function showEDTPermissionsForm(employee) {
        const edtPermissionsFormHTML = `
            <h2>Modification des permissions ou de l'EDT de l'employé : <span id="employee_id">${employee.id}</span>
                <button id="modif-info-button">Modifier les informations</button>
            </h2>
                <form>
                    <fieldset>
                        <legend>PERMISSIONS</legend>
                        <div class="line-input">
                            <div class="input-container">
                                <label for="selected-perms">Permissions sélectionnées :</label>
                                <ul id="selected-perms"></ul>
                            </div>
                        </div>
                        <div class="line-input">
                            <div class="input-container">
                                <div class="perm-selector-container">
                                    <label for="perm">Permissions :</label>
                                    <select id="perm" name="perm">
                                        <option value="perm1">Perm 1</option>
                                        <option value="perm2">Perm 2</option>
                                        <option value="perm3">Perm 3</option>
                                    </select>
                                    <button type="button" id="add-perm-button">Ajouter</button>
                                    <button type="button" id="remove-perm-button">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>EDT</legend>
                        <div class="line-input">
                            <div class="input-container">
                                    <label for="activity">Label de l'activité :</label>
                                    <input type="text" id="activity" name="activity" required placeholder="Activité">
                            </div>
                        </div>
                        <div class="line-input">
                            <div class="input-container">
                                <label for="startdate">Date de début :</label>
                                <input type="text" id="startdate" name="startdate" required placeholder="JJ/MM/AAAA">
                            </div>
                            <div class="input-container">
                                <label for="starthour">Heure de début :</label>
                                <input type="text" id="starthour" name="starthour" required placeholder="hh:mm">
                            </div>
                        </div>
                        <div class="line-input">
                            <div class="input-container">
                                <label for="enddate">Date de fin :</label>
                                <input type="text" id="enddate" name="enddate" required placeholder="JJ/MM/AAAA">
                            </div>
                            <div class="input-container">
                                <label for="endhour">Heure de fin :</label>
                                <input type="text" id="endhour" name="endhour" required placeholder="hh:mm">
                            </div>
                        </div>
                        <div class="line-input">
                            <div class="input-container">
                                <button type="button" id="add-activity-button">Ajouter</button>
                            </div>
                            <div class="input-container">
                                <button type="button" id="remove-activity-button">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            `;
        if (infoEmployee) {
            infoEmployee.innerHTML = edtPermissionsFormHTML;
        }
        const selectedPermissionsList = document.getElementById("selected-perms");
        if (selectedPermissionsList) {
            updateSelectedPermissionsList(selectedPermissionsList);
        }
        // Ajouter les gestionnaires d'événements pour les boutons dans le formulaire
        const modifInfoButton = document.getElementById('modif-info-button');
        const addPermButton = document.getElementById('add-perm-button');
        const removePermButton = document.getElementById('remove-perm-button');
        const addActivityButton = document.getElementById('add-activity-button');
        const removeActivityButton = document.getElementById('remove-activity-button');
        if (addPermButton && removePermButton && addActivityButton && removeActivityButton) {
            addPermButton.addEventListener('click', handleAddPermissionClick);
            removePermButton.addEventListener('click', handleRemovePermissionClick);
        }
        if (modifInfoButton) {
            modifInfoButton.addEventListener('click', () => {
                showEmployeeInfo(employee);
            });
        }
    }
    // Fonction pour mettre à jour la liste des permissions sélectionnées
    function updateSelectedPermissionsList(selectedPermissionsList) {
        // Effacer la liste actuelle
        selectedPermissionsList.innerHTML = "";
        // Parcourir le tableau des permissions sélectionnées et les ajouter à la liste
        selectedPermissions.forEach((permission) => {
            const listItem = document.createElement("li");
            listItem.textContent = permission;
            selectedPermissionsList.appendChild(listItem);
        });
    }
    // Fonction pour gérer le clic sur le bouton "Ajouter" dans le formulaire de permissions
    function handleAddPermissionClick() {
        const permissionSelect = document.getElementById("perm");
        const selectedPermissionsList = document.getElementById("selected-perms");
        // Récupérer la permission sélectionnée
        const selectedPermission = permissionSelect.options[permissionSelect.selectedIndex].value;
        // Vérifier si la permission n'a pas déjà été sélectionnée
        if (!selectedPermissions.includes(selectedPermission)) {
            // Ajouter la permission à la liste des permissions sélectionnées
            selectedPermissions.push(selectedPermission);
            // Mettre à jour l'affichage de la liste des permissions sélectionnées
            if (selectedPermissionsList) {
                updateSelectedPermissionsList(selectedPermissionsList);
            }
        }
    }
    // Fonction pour gérer le clic sur le bouton "Supprimer" dans le formulaire de permissions
    function handleRemovePermissionClick() {
        const permissionSelect = document.getElementById("perm");
        const selectedPermissionsList = document.getElementById("selected-perms");
        // Récupérer la permission sélectionnée
        const selectedPermission = permissionSelect.options[permissionSelect.selectedIndex].value;
        // Trouver l'index de la permission sélectionnée dans le tableau des permissions sélectionnées
        const index = selectedPermissions.indexOf(selectedPermission);
        // Vérifier si la permission est présente dans le tableau et la supprimer si elle est trouvée
        if (index !== -1) {
            selectedPermissions.splice(index, 1);
            // Mettre à jour l'affichage de la liste des permissions sélectionnées
            if (selectedPermissionsList) {
                updateSelectedPermissionsList(selectedPermissionsList);
            }
        }
    }
});
