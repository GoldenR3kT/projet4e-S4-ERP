document.addEventListener("DOMContentLoaded", function () {
    var addEmployeeButton = document.getElementById("add-employee-button");
    var infoEmployeeSection = document.querySelector(".info-employee");
    var selectedRoles = []; // Variable pour stocker les rôles sélectionnés
    // Fonction pour gérer le clic sur le bouton "Ajouter un employé"
    function handleAddEmployeeClick(event) {
        event.preventDefault(); // Pour éviter le comportement par défaut du bouton (rechargement de la page)
        // Construction du formulaire à afficher dans la section info-employee
        var formHTML = "\n            <form action=\"#\" method=\"POST\">\n                <h2>Ajouter un employ\u00E9 : \n                    <input type=\"submit\" value=\"Confirmer l'ajout\">\n                </h2>\n                <fieldset>\n                    <legend>INFORMATIONS</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"nom\">Nom :</label>\n                            <input type=\"text\" id=\"nom\" name=\"nom\" required>\n                        </div>\n                    \n                        <div class=\"input-container\">\n                            <label for=\"prenom\">Pr\u00E9nom :</label>\n                            <input type=\"text\" id=\"prenom\" name=\"prenom\" required>\n                        </div>\n                    </div>\n                    \n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"tel\">Num\u00E9ro de t\u00E9l\u00E9phone :</label>\n                            <input type=\"tel\" id=\"tel\" name=\"tel\" required>\n                        </div>\n                    \n                        <div class=\"input-container\">\n                            <label for=\"email\">Adresse email :</label>\n                            <input type=\"email\" id=\"email\" name=\"email\" required>\n                        </div>\n                    </div>\n                    \n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"adresse\">Adresse :</label>\n                            <textarea id=\"adresse\" name=\"adresse\" rows=\"4\" required></textarea>\n                        </div>\n                    </div>\n                </fieldset>\n                <fieldset>\n                    <legend>POSTE</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"poste\">Poste :</label>\n                            <input type=\"text\" id=\"poste\" name=\"poste\" required>\n                        </div>\n                    \n                        <div class=\"input-container\">\n                            <label for=\"rang\">Rang :</label>\n                            <input type=\"text\" id=\"rang\" name=\"rang\" required>\n                        </div>\n                    </div>\n                </fieldset>\n                <fieldset>\n                    <legend>ROLES</legend>\n                                        \n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"selected-roles\">R\u00F4les s\u00E9lectionn\u00E9s :</label>\n                            <ul id=\"selected-roles\"></ul>\n                        </div>\n                    </div>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <div class=\"role-selector-container\">\n                                <label for=\"role\">R\u00F4le :</label>\n                                <select id=\"role\" name=\"role\">\n                                    <option value=\"role1\">R\u00F4le 1</option>\n                                    <option value=\"role2\">R\u00F4le 2</option>\n                                    <option value=\"role3\">R\u00F4le 3</option>\n                                </select>\n                                <button type=\"button\" id=\"add-role-button\">Ajouter</button>\n                                <button type=\"button\" id=\"remove-role-button\">Supprimer</button>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <br><br>\n                </fieldset>\n            </form>\n        ";
        // Affichage du formulaire dans la section info-employee
        if (infoEmployeeSection) {
            infoEmployeeSection.innerHTML = formHTML;
            // Ajouter des gestionnaires d'événements pour les boutons "Ajouter" et "Supprimer" les rôles
            var addRoleButton = document.getElementById("add-role-button");
            var removeRoleButton = document.getElementById("remove-role-button");
            addRoleButton.addEventListener("click", handleAddRoleClick);
            removeRoleButton.addEventListener("click", handleRemoveRoleClick);
        }
    }
    // Fonction pour gérer le clic sur le bouton "Ajouter"
    function handleAddRoleClick() {
        var roleSelect = document.getElementById("role"); // Spécifiez le type HTMLSelectElement
        var selectedRolesList = document.getElementById("selected-roles");
        var selectedRole = roleSelect.options[roleSelect.selectedIndex].value;
        var option = roleSelect.querySelector("option[value=\"".concat(selectedRole, "\"]"));
        // Vérifier si l'option n'a pas déjà été sélectionnée
        if (!selectedRoles.includes(selectedRole) && option) {
            selectedRoles.push(selectedRole); // Ajouter le rôle à la liste des rôles sélectionnés
            updateSelectedRolesList(selectedRolesList); // Mettre à jour l'affichage de la liste des rôles sélectionnés
        }
    }
    // Fonction pour gérer le clic sur le bouton "Supprimer"
    function handleRemoveRoleClick() {
        var roleSelect = document.getElementById("role"); // Spécifiez le type HTMLSelectElement
        var selectedRolesList = document.getElementById("selected-roles");
        var selectedRole = roleSelect.options[roleSelect.selectedIndex].value;
        var option = roleSelect.querySelector("option[value=\"".concat(selectedRole, "\"]"));
        // Recherche de l'index du rôle sélectionné dans le tableau selectedRoles
        var index = selectedRoles.indexOf(selectedRole);
        // Vérifier si le rôle est présent dans le tableau et le retirer s'il est trouvé
        if (index !== -1 && option) {
            selectedRoles.splice(index, 1); // Retirer le rôle du tableau des rôles sélectionnés
            updateSelectedRolesList(selectedRolesList); // Mettre à jour l'affichage de la liste des rôles sélectionnés
        }
    }
    // Fonction pour mettre à jour l'affichage de la liste des rôles sélectionnés
    function updateSelectedRolesList(selectedRolesList) {
        selectedRolesList.innerHTML = ""; // Effacer le contenu actuel de la liste
        selectedRoles.forEach(function (role) {
            var li = document.createElement("li");
            li.textContent = role;
            li.setAttribute("data-value", role);
            selectedRolesList.appendChild(li); // Ajouter chaque rôle à la liste
        });
    }
    // Ajout de l'écouteur d'événement sur le clic du bouton "Ajouter un employé"
    addEmployeeButton === null || addEmployeeButton === void 0 ? void 0 : addEmployeeButton.addEventListener("click", handleAddEmployeeClick);
});
