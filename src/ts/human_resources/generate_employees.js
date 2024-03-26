document.addEventListener("DOMContentLoaded", function () {
    var listEmployees = document.querySelector('.list-employees');
    var infoEmployee = document.querySelector('.info-employee');
    // Données des employés (simulées)
    var employeesData = [
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
        var employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee');
        var img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000000\' stroke-width=\'1.25\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3\'/%3E%3Ccircle cx=\'12\' cy=\'10\' r=\'3\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3C/svg%3E');
        img.setAttribute('alt', 'Employee Image');
        employeeDiv.appendChild(img);
        var span = document.createElement('span');
        span.textContent = employee.nom + " " + employee.prenom + " " + employee.email + " " + employee.poste;
        employeeDiv.appendChild(span);
        var buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('employee-buttons');
        var voirButton = document.createElement('button');
        voirButton.textContent = "Voir l'EDT";
        buttonsDiv.appendChild(voirButton);
        var modifierButton = document.createElement('button');
        modifierButton.textContent = "Modifier l'employé";
        modifierButton.addEventListener('click', function () {
            showEmployeeInfo(employee);
        });
        var supprimerButton = document.createElement('button');
        supprimerButton.textContent = "Supprimer l'employé";
        buttonsDiv.appendChild(supprimerButton);
        employeeDiv.appendChild(buttonsDiv);
        buttonsDiv.appendChild(modifierButton);
        employeeDiv.appendChild(buttonsDiv);
        return employeeDiv;
    }
    // Fonction pour afficher les informations de l'employé sélectionné
    function showEmployeeInfo(employee) {
        var employeeInfoHTML = "\n            <h2>Modification Informations de l'employ\u00E9 : <span id=\"employee_id\">".concat(employee.id, "</span>\n                <button id=\"edt-permissions-button\">Modifier l'EDT / Permissions</button>\n            </h2>\n            <form action=\"#\" method=\"POST\">\n                <fieldset>\n                    <legend>INFORMATIONS</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"nom\">Nom :</label>\n                            <input type=\"text\" id=\"nom\" name=\"nom\" value=\"").concat(employee.nom, "\" required>\n                        </div>\n                        <div class=\"input-container\">\n                            <label for=\"prenom\">Pr\u00E9nom :</label>\n                            <input type=\"text\" id=\"prenom\" name=\"prenom\" value=\"").concat(employee.prenom, "\" required>\n                        </div>\n                    </div>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"tel\">Num\u00E9ro de t\u00E9l\u00E9phone :</label>\n                            <input type=\"tel\" id=\"tel\" name=\"tel\" value=\"").concat(employee.tel, "\" required>\n                        </div>\n                        <div class=\"input-container\">\n                            <label for=\"email\">Adresse email :</label>\n                            <input type=\"email\" id=\"email\" name=\"email\" value=\"").concat(employee.email, "\" required>\n                        </div>\n                    </div>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"adresse\">Adresse :</label>\n                            <textarea id=\"adresse\" name=\"adresse\" rows=\"4\" required>").concat(employee.adresse, "</textarea>\n                        </div>\n                    </div>\n                    <br><br>\n                </fieldset>\n                <fieldset>\n                    <legend>POSTE</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"poste\">Poste :</label>\n                            <input type=\"text\" id=\"poste\" name=\"poste\" value=\"").concat(employee.poste, "\" required><br><br>\n                        </div>\n                        <div class=\"input-container\">\n                            <label for=\"rang\">Rang :</label>\n                            <input type=\"text\" id=\"rang\" name=\"rang\" value=\"").concat(employee.rang, "\" required><br><br>\n                        </div>\n                    </div>\n                </fieldset>\n                <input type=\"submit\" value=\"Confirmer les modifications\">\n            </form>\n        ");
        infoEmployee.innerHTML = employeeInfoHTML;
    }
    // Peupler la liste des employés
    employeesData.forEach(function (employee) {
        var employeeElement = createEmployeeElement(employee);
        listEmployees === null || listEmployees === void 0 ? void 0 : listEmployees.appendChild(employeeElement);
    });
});
