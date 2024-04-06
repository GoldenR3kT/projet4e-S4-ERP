document.addEventListener("DOMContentLoaded", function () {
    var listEmployees = document.querySelector('.list-employees');
    var infoEmployee = document.querySelector('.info-employee');
    var selectedPermissions = [];
    // Données des employés (simulées)
    var employeesData = [
        { id: 1, nom: "Nom1", prenom: "Prenom1", tel: "123456789", email: "email1@example.com", adresse: "Adresse1", poste: "Poste1", rang: "Rang1", permissions: [] },
        { id: 2, nom: "Nom2", prenom: "Prenom2", tel: "987654321", email: "email2@example.com", adresse: "Adresse2", poste: "Poste2", rang: "Rang2", permissions: [] },
        { id: 3, nom: "Nom3", prenom: "Prenom3", tel: "456123789", email: "email3@example.com", adresse: "Adresse3", poste: "Poste3", rang: "Rang3", permissions: [] },
        { id: 4, nom: "Nom4", prenom: "Prenom4", tel: "789456123", email: "email4@example.com", adresse: "Adresse4", poste: "Poste4", rang: "Rang4", permissions: [] },
        { id: 5, nom: "Nom5", prenom: "Prenom5", tel: "321654987", email: "email5@example.com", adresse: "Adresse5", poste: "Poste5", rang: "Rang5", permissions: [] },
        { id: 6, nom: "Nom6", prenom: "Prenom6", tel: "654987321", email: "email6@example.com", adresse: "Adresse6", poste: "Poste6", rang: "Rang6", permissions: [] },
        { id: 7, nom: "Nom7", prenom: "Prenom7", tel: "987123654", email: "email7@example.com", adresse: "Adresse7", poste: "Poste7", rang: "Rang7", permissions: [] },
        { id: 8, nom: "Nom8", prenom: "Prenom8", tel: "654321987", email: "email8@example.com", adresse: "Adresse8", poste: "Poste8", rang: "Rang8", permissions: [] },
        { id: 9, nom: "Nom9", prenom: "Prenom9", tel: "321987654", email: "email9@example.com", adresse: "Adresse9", poste: "Poste9", rang: "Rang9", permissions: [] },
        { id: 10, nom: "Nom10", prenom: "Prenom10", tel: "987321654", email: "email10@example.com", adresse: "Adresse10", poste: "Poste10", rang: "Rang10", permissions: [] }
    ];
    refreshEmployeeList();
    // Fonction pour supprimer et réafficher la liste des employés
    function refreshEmployeeList() {
        var listEmployees = document.getElementById('list-employees');
        if (!listEmployees)
            return;
        // Efface tout le contenu de list-employees
        listEmployees.innerHTML = '';
        // Réaffiche toute la liste
        employeesData.forEach(function (employee) {
            var employeeElement = createEmployeeElement(employee); // Utilisation de createEmployeeElement
            listEmployees.appendChild(employeeElement);
        });
    }
    // Fonction pour créer un élément d'employé
    function createEmployeeElement(employee) {
        var employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee');
        // Informations de l'employé (à gauche)
        var infoDiv = document.createElement('div');
        infoDiv.classList.add('employee-info');
        employeeDiv.appendChild(infoDiv);
        var img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000000\' stroke-width=\'1.25\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3\'/%3E%3Ccircle cx=\'12\' cy=\'10\' r=\'3\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3C/svg%3E');
        img.setAttribute('alt', 'Employee Image');
        infoDiv.appendChild(img);
        var span = document.createElement('span');
        span.textContent = employee.nom + " " + employee.prenom + " " + employee.email + " " + employee.poste;
        infoDiv.appendChild(span);
        // Boutons (à droite)
        var buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('employee-buttons');
        employeeDiv.appendChild(buttonsDiv);
        var voirButton = document.createElement('button');
        voirButton.textContent = "Voir l'EDT";
        voirButton.classList.add('employee-button');
        voirButton.addEventListener('click', function () {
            handleVoirEDTClick(employee);
        });
        buttonsDiv.appendChild(voirButton);
        var modifierButton = document.createElement('button');
        modifierButton.textContent = "Modifier l'employé";
        modifierButton.addEventListener('click', function () {
            showEmployeeInfo(employee);
        });
        modifierButton.classList.add('employee-button');
        buttonsDiv.appendChild(modifierButton);
        var supprimerButton = document.createElement('button');
        supprimerButton.textContent = "Supprimer l'employé";
        supprimerButton.addEventListener('click', function () {
            removeEmployee(employeeDiv, employee);
        });
        supprimerButton.classList.add('employee-button');
        buttonsDiv.appendChild(supprimerButton);
        return employeeDiv;
    }
    // Fonction pour afficher les informations de l'employé sélectionné
    function showEmployeeInfo(employee) {
        var employeeInfoHTML = "\n            <h2>Modification Informations de l'employ\u00E9 : <span id=\"employee_id\">".concat(employee.id, "</span>\n                <button id=\"edt-permissions-button\">Modifier l'EDT / Permissions</button>\n            </h2>\n            <form action=\"#\" method=\"POST\">\n                <fieldset>\n                    <legend>INFORMATIONS</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"nom\">Nom :</label>\n                            <input type=\"text\" id=\"nom\" name=\"nom\" value=\"").concat(employee.nom, "\" required>\n                        </div>\n                        <div class=\"input-container\">\n                            <label for=\"prenom\">Pr\u00E9nom :</label>\n                            <input type=\"text\" id=\"prenom\" name=\"prenom\" value=\"").concat(employee.prenom, "\" required>\n                        </div>\n                    </div>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"tel\">Num\u00E9ro de t\u00E9l\u00E9phone :</label>\n                            <input type=\"tel\" id=\"tel\" name=\"tel\" value=\"").concat(employee.tel, "\" required>\n                        </div>\n                        <div class=\"input-container\">\n                            <label for=\"email\">Adresse email :</label>\n                            <input type=\"email\" id=\"email\" name=\"email\" value=\"").concat(employee.email, "\" required>\n                        </div>\n                    </div>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"adresse\">Adresse :</label>\n                            <textarea id=\"adresse\" name=\"adresse\" rows=\"4\" required>").concat(employee.adresse, "</textarea>\n                        </div>\n                    </div>\n                    <br><br>\n                </fieldset>\n                <fieldset>\n                    <legend>POSTE</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"poste\">Poste :</label>\n                            <input type=\"text\" id=\"poste\" name=\"poste\" value=\"").concat(employee.poste, "\" required><br><br>\n                        </div>\n                        <div class=\"input-container\">\n                            <label for=\"rang\">Rang :</label>\n                            <input type=\"text\" id=\"rang\" name=\"rang\" value=\"").concat(employee.rang, "\" required><br><br>\n                        </div>\n                    </div>\n                </fieldset>\n                <input id=\"modif-submit-button\" type=\"submit\" value=\"Confirmer les modifications\">\n            </form>\n        ");
        if (infoEmployee) {
            infoEmployee.innerHTML = employeeInfoHTML;
        }
        var edtPermissionsButton = document.getElementById('edt-permissions-button');
        if (edtPermissionsButton) {
            edtPermissionsButton.addEventListener('click', function () {
                showEDTPermissionsForm(employee);
            });
        }
        var modifSubmitButton = document.querySelector('form');
        if (modifSubmitButton) {
            modifSubmitButton.addEventListener("submit", function (event) {
                handleModifyEmployeeFormSubmit(event);
            });
        }
    }
    // Fonction pour supprimer un employé de la liste et du tableau
    function removeEmployee(employeeElement, employee) {
        // Retirer l'élément de la liste des employés
        var index = employeesData.findIndex(function (emp) { return emp.id === employee.id; });
        if (index !== -1) {
            employeesData.splice(index, 1);
            listEmployees === null || listEmployees === void 0 ? void 0 : listEmployees.removeChild(employeeElement);
        }
    }
    // Fonction pour afficher le formulaire de modification des permissions et de l'EDT
    function showEDTPermissionsForm(employee) {
        var edtPermissionsFormHTML = "\n            <h2>Modification des permissions ou de l'EDT de l'employ\u00E9 : <span id=\"employee_id\">".concat(employee.id, "</span>\n                <button id=\"modif-info-button\">Modifier les informations</button>\n            </h2>\n                <form>\n                    <fieldset>\n                        <legend>PERMISSIONS</legend>\n                        <div class=\"line-input\">\n                            <div class=\"input-container\">\n                                <label for=\"selected-perms\">Permissions s\u00E9lectionn\u00E9es :</label>\n                                <ul id=\"selected-perms\"></ul>\n                            </div>\n                        </div>\n                        <div class=\"line-input\">\n                            <div class=\"input-container\">\n                                <div class=\"perm-selector-container\">\n                                    <label for=\"perm\">Permissions :</label>\n                                    <select id=\"perm\" name=\"perm\">\n                                        <option value=\"perm1\">Perm 1</option>\n                                        <option value=\"perm2\">Perm 2</option>\n                                        <option value=\"perm3\">Perm 3</option>\n                                    </select>\n                                    <button type=\"button\" id=\"add-perm-button\">Ajouter</button>\n                                    <button type=\"button\" id=\"remove-perm-button\">Supprimer</button>\n                                </div>\n                            </div>\n                        </div>\n                    </fieldset>\n                    <fieldset>\n                        <legend>EDT</legend>\n                        <div class=\"line-input\">\n                            <div class=\"input-container\">\n                                    <label for=\"activity\">Label de l'activit\u00E9 :</label>\n                                    <input type=\"text\" id=\"activity\" name=\"activity\" required placeholder=\"Activit\u00E9\">\n                            </div>\n                        </div>\n                        <div class=\"line-input\">\n                            <div class=\"input-container\">\n                                <label for=\"startdate\">Date de d\u00E9but :</label>\n                                <input type=\"text\" id=\"startdate\" name=\"startdate\" required placeholder=\"JJ/MM/AAAA\">\n                            </div>\n                            <div class=\"input-container\">\n                                <label for=\"starthour\">Heure de d\u00E9but :</label>\n                                <input type=\"text\" id=\"starthour\" name=\"starthour\" required placeholder=\"hh:mm\">\n                            </div>\n                        </div>\n                        <div class=\"line-input\">\n                            <div class=\"input-container\">\n                                <label for=\"enddate\">Date de fin :</label>\n                                <input type=\"text\" id=\"enddate\" name=\"enddate\" required placeholder=\"JJ/MM/AAAA\">\n                            </div>\n                            <div class=\"input-container\">\n                                <label for=\"endhour\">Heure de fin :</label>\n                                <input type=\"text\" id=\"endhour\" name=\"endhour\" required placeholder=\"hh:mm\">\n                            </div>\n                        </div>\n                        <div class=\"line-input\">\n                            <div class=\"input-container\">\n                                <button type=\"button\" id=\"add-activity-button\">Ajouter</button>\n                            </div>\n                            <div class=\"input-container\">\n                                <button type=\"button\" id=\"remove-activity-button\">Supprimer</button>\n                                </div>\n                            </div>\n                        </div>\n                    </fieldset>\n                </form>\n            ");
        if (infoEmployee) {
            infoEmployee.innerHTML = edtPermissionsFormHTML;
        }
        var selectedPermissionsList = document.getElementById("selected-perms");
        if (selectedPermissionsList) {
            updateSelectedPermissionsList(selectedPermissionsList, employee.permissions);
        }
        // Ajouter les gestionnaires d'événements pour les boutons dans le formulaire
        var modifInfoButton = document.getElementById('modif-info-button');
        var addPermButton = document.getElementById('add-perm-button');
        var removePermButton = document.getElementById('remove-perm-button');
        var addActivityButton = document.getElementById('add-activity-button');
        var removeActivityButton = document.getElementById('remove-activity-button');
        if (addPermButton && removePermButton && addActivityButton && removeActivityButton) {
            addPermButton.addEventListener('click', function () { handleAddPermissionClick(employee.permissions); });
            removePermButton.addEventListener('click', function () { handleRemovePermissionClick(employee.permissions); });
        }
        if (modifInfoButton) {
            modifInfoButton.addEventListener('click', function () {
                showEmployeeInfo(employee);
            });
        }
    }
    /*
        // Fonction pour mettre à jour la liste des permissions sélectionnées
        function updateSelectedPermissionsList(selectedPermissionsList: HTMLElement) {
            // Effacer la liste actuelle
            selectedPermissionsList.innerHTML = "";
    
            // Parcourir le tableau des permissions sélectionnées et les ajouter à la liste
            selectedPermissions.forEach((permission) => {
                const listItem = document.createElement("li");
                listItem.textContent = permission;
                selectedPermissionsList.appendChild(listItem);
            });
        }*/
    // Fonction pour mettre à jour la liste des permissions sélectionnées
    function updateSelectedPermissionsList(selectedPermissionsList, permissions) {
        // Effacer la liste actuelle
        selectedPermissionsList.innerHTML = "";
        // Parcourir le tableau des permissions sélectionnées et les ajouter à la liste
        permissions.forEach(function (permission) {
            var listItem = document.createElement("li");
            listItem.textContent = permission;
            selectedPermissionsList.appendChild(listItem);
        });
    }
    /*
        // Fonction pour gérer le clic sur le bouton "Ajouter" dans le formulaire de permissions
        function handleAddPermissionClick() {
            const permissionSelect = document.getElementById("perm") as HTMLSelectElement;
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
            const permissionSelect = document.getElementById("perm") as HTMLSelectElement;
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
        }*/
    function handleAddPermissionClick(permissions) {
        var permissionSelect = document.getElementById("perm");
        var selectedPermissionsList = document.getElementById("selected-perms");
        // Récupérer la permission sélectionnée
        var selectedPermission = permissionSelect.options[permissionSelect.selectedIndex].value;
        // Vérifier si la permission n'a pas déjà été sélectionnée
        if (!selectedPermissions.includes(selectedPermission)) {
            // Ajouter la permission à la liste des permissions sélectionnées
            permissions.push(selectedPermission);
            // Mettre à jour l'affichage de la liste des permissions sélectionnées
            if (selectedPermissionsList) {
                updateSelectedPermissionsList(selectedPermissionsList, permissions);
            }
        }
    }
    // Fonction pour gérer le clic sur le bouton "Supprimer" dans le formulaire de permissions
    function handleRemovePermissionClick(permissions) {
        var permissionSelect = document.getElementById("perm");
        var selectedPermissionsList = document.getElementById("selected-perms");
        // Récupérer la permission sélectionnée
        var selectedPermission = permissionSelect.options[permissionSelect.selectedIndex].value;
        var index = permissions.indexOf(selectedPermission);
        // Vérifier si la permission n'a pas déjà été sélectionnée pour cet employé
        if (index !== -1) {
            // Ajouter la permission à la liste des permissions de l'employé
            permissions.splice(index, 1);
            // Mettre à jour l'affichage de la liste des permissions sélectionnées
            if (selectedPermissionsList) {
                updateSelectedPermissionsList(selectedPermissionsList, permissions);
            }
        }
    }
    // Fonction pour gérer le clic sur le bouton "Voir EDT"
    function handleVoirEDTClick(employee) {
        // Mettre à jour le contenu de l'élément info-employee avec les informations de l'employé
        if (infoEmployee) {
            infoEmployee.innerHTML = "\n                <div class=\"employee-info\">\n                    <img src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='1.25' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E\" alt=\"Employee Image\">\n                    <h2>".concat(employee.nom, " ").concat(employee.prenom, "</h2>\n                    <div class=\"white-square\">\n                        <div id=\"edt-text\">EDT</div>\n                    </div>\n                    <p>Semaine du :</p>\n                    <input type=\"text\" id=\"week-input\" placeholder=\"jj/mm/aaaa\">\n                </div>\n            ");
            var weekInput_1 = document.getElementById('week-input');
            weekInput_1 === null || weekInput_1 === void 0 ? void 0 : weekInput_1.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    var edtText = document.getElementById('edt-text');
                    if (edtText) {
                        edtText.textContent = 'EDT ' + weekInput_1.value;
                    }
                }
            });
        }
    }
    // Fonction pour gérer la soumission du formulaire de modification d'employé
    function handleModifyEmployeeFormSubmit(event) {
        var _a;
        event.preventDefault();
        var form = event.target;
        var employeeId = parseInt(((_a = document.getElementById("employee_id")) === null || _a === void 0 ? void 0 : _a.textContent) || "");
        var nom = form.elements.namedItem("nom");
        var prenom = form.elements.namedItem("prenom");
        var tel = form.elements.namedItem("tel");
        var email = form.elements.namedItem("email");
        var adresse = form.elements.namedItem("adresse");
        var poste = form.elements.namedItem("poste");
        var rang = form.elements.namedItem("rang");
        // Mettez à jour les informations de l'employé dans la liste
        var updatedEmployee = employeesData.find(function (employee) { return employee.id === employeeId; });
        if (updatedEmployee) {
            updatedEmployee.nom = nom.value;
            updatedEmployee.prenom = prenom.value;
            updatedEmployee.tel = tel.value;
            updatedEmployee.email = email.value;
            updatedEmployee.adresse = adresse.value;
            updatedEmployee.poste = poste.value;
            updatedEmployee.rang = rang.value;
            // Mettez à jour l'affichage de l'employé dans la liste
            var employeeElement = document.querySelector(".employee[data-id=\"".concat(employeeId, "\"]"));
            if (employeeElement) {
                var infoDiv = employeeElement.querySelector('.employee-info');
                if (infoDiv) {
                    infoDiv.textContent = "".concat(updatedEmployee.nom, " ").concat(updatedEmployee.prenom, " ").concat(updatedEmployee.email, " ").concat(updatedEmployee.poste);
                }
            }
        }
        // Effacez le contenu de la section info-employee
        if (infoEmployee) {
            infoEmployee.innerHTML = '';
        }
        // Rafraîchir la liste des employés
        refreshEmployeeList();
    }
    var addEmployeeButton = document.getElementById("add-employee-button");
    var infoEmployeeSection = document.querySelector(".info-employee");
    if (addEmployeeButton) {
        addEmployeeButton.addEventListener("click", handleAddEmployeeClick);
    }
    // Spécification du type de 'event' comme MouseEvent
    function handleAddEmployeeClick(event) {
        event.preventDefault();
        // Construction du formulaire à afficher dans la section info-employee
        var formHTML = "\n            <form action=\"#\" method=\"POST\">\n                <h2>Ajouter un employ\u00E9 : \n                    <input type=\"submit\" value=\"Confirmer l'ajout\">\n                </h2>\n                <fieldset>\n                    <legend>INFORMATIONS</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"nom\">Nom :</label>\n                            <input type=\"text\" id=\"nom\" name=\"nom\" required>\n                        </div>\n                    \n                        <div class=\"input-container\">\n                            <label for=\"prenom\">Pr\u00E9nom :</label>\n                            <input type=\"text\" id=\"prenom\" name=\"prenom\" required>\n                        </div>\n                    </div>\n                    \n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"tel\">Num\u00E9ro de t\u00E9l\u00E9phone :</label>\n                            <input type=\"tel\" id=\"tel\" name=\"tel\" required>\n                        </div>\n                    \n                        <div class=\"input-container\">\n                            <label for=\"email\">Adresse email :</label>\n                            <input type=\"email\" id=\"email\" name=\"email\" required>\n                        </div>\n                    </div>\n                    \n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"adresse\">Adresse :</label>\n                            <textarea id=\"adresse\" name=\"adresse\" rows=\"4\" required></textarea>\n                        </div>\n                    </div>\n                </fieldset>\n                <fieldset>\n                    <legend>POSTE</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"poste\">Poste :</label>\n                            <input type=\"text\" id=\"poste\" name=\"poste\" required>\n                        </div>\n                    \n                        <div class=\"input-container\">\n                            <label for=\"rang\">Rang :</label>\n                            <input type=\"text\" id=\"rang\" name=\"rang\" required>\n                        </div>\n                    </div>\n                </fieldset>\n                <fieldset>\n                    <legend>PERMISSIONS</legend>\n                                        \n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"selected-perms\">Permissions s\u00E9lectionn\u00E9es :</label>\n                            <ul id=\"selected-perms\"></ul>\n                        </div>\n                    </div>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <div class=\"perms-selector-container\">\n                                <label for=\"perm\">Permission :</label>\n                                <select id=\"perm\" name=\"perm\">\n                                    <option value=\"perm1\">Perm 1</option>\n                                    <option value=\"perm2\">Perm 2</option>\n                                    <option value=\"perm3\">Perm 3</option>\n                                </select>\n                                <button type=\"button\" id=\"add-role-button\">Ajouter</button>\n                                <button type=\"button\" id=\"remove-role-button\">Supprimer</button>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <br><br>\n                </fieldset>\n            </form>\n        ";
        // Affichage du formulaire dans la section info-employee
        if (infoEmployeeSection) {
            infoEmployeeSection.innerHTML = formHTML;
        }
        var permissionsList = [];
        var addRoleButton = document.getElementById("add-role-button");
        var removeRoleButton = document.getElementById("remove-role-button");
        if (addRoleButton && removeRoleButton) {
            addRoleButton.addEventListener("click", function () { return handleAddPermissionClick(permissionsList); });
            removeRoleButton.addEventListener("click", function () { return handleRemovePermissionClick(permissionsList); });
        }
        // Récupération du bouton de soumission et attachement du gestionnaire d'événements
        var submitButton = document.querySelector('form');
        if (submitButton) {
            submitButton.addEventListener("submit", function (event) {
                handleAddEmployeeFormSubmit(event);
            });
        }
        // Les fonctions handleAddRoleClick et handleRemoveRoleClick restent inchangées
        if (addEmployeeButton) {
            addEmployeeButton.addEventListener("click", handleAddEmployeeClick);
        }
    }
    function handleAddEmployeeFormSubmit(event) {
        event.preventDefault();
        var form = event.target;
        // Récupérez les valeurs du formulaire
        var nom = form.elements.namedItem("nom").value;
        var prenom = form.elements.namedItem("prenom").value;
        var tel = form.elements.namedItem("tel").value;
        var email = form.elements.namedItem("email").value;
        var adresse = form.elements.namedItem("adresse").value;
        var poste = form.elements.namedItem("poste").value;
        var rang = form.elements.namedItem("rang").value;
        // Créez un nouvel objet employé avec les valeurs du formulaire
        var newEmployee = {
            id: employeesData.length + 1, // Générez un nouvel identifiant unique
            nom: nom,
            prenom: prenom,
            tel: tel,
            email: email,
            adresse: adresse,
            poste: poste,
            rang: rang,
            permissions: []
        };
        // Ajoutez le nouvel employé à la liste des employés
        employeesData.push(newEmployee);
        // Rafraîchissez la liste des employés
        refreshEmployeeList();
        // Effacez le contenu de la section info-employee
        if (infoEmployee) {
            infoEmployee.innerHTML = '';
        }
    }
    // Récupérer les éléments de recherche par nom et par ID
    var searchByNameInput = document.getElementById('search-by-name');
    var searchByIdInput = document.getElementById('search-by-id');
    // Ajouter des écouteurs d'événements pour les champs de recherche
    searchByNameInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            var searchText = searchByNameInput.value.trim().toLowerCase();
            if (searchText === '') {
                displayEmployees(employeesData);
            }
            else {
                filterEmployeesByName(searchText);
            }
        }
    });
    searchByIdInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            var searchId = parseInt(searchByIdInput.value.trim());
            if (!isNaN(searchId)) {
                filterEmployeesById(searchId);
            }
            else {
                displayEmployees(employeesData);
            }
        }
    });
    // Fonction pour filtrer les employés par nom
    function filterEmployeesByName(name) {
        var filteredEmployees = employeesData.filter(function (employee) {
            var fullName = "".concat(employee.nom, " ").concat(employee.prenom).toLowerCase();
            return fullName.includes(name);
        });
        displayEmployees(filteredEmployees);
    }
    // Fonction pour filtrer les employés par ID
    function filterEmployeesById(id) {
        var filteredEmployees = employeesData.filter(function (employee) { return employee.id === id; });
        displayEmployees(filteredEmployees);
    }
    // Fonction pour afficher les employés
    function displayEmployees(employees) {
        var listEmployees = document.getElementById('list-employees');
        if (!listEmployees)
            return;
        // Effacer tout le contenu de list-employees
        listEmployees.innerHTML = '';
        // Réafficher les employés filtrés
        employees.forEach(function (employee) {
            var employeeElement = createEmployeeElement(employee);
            listEmployees.appendChild(employeeElement);
        });
    }
});
