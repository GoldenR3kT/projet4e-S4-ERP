document.addEventListener("DOMContentLoaded", function() {
    const listEmployees = document.querySelector('.list-employees');

    // Données des employés (simulées)
    const employeesData = [
        { name: "Nom de l'Employé 1", id: 1 },
        { name: "Nom de l'Employé 2", id: 2 },
        { name: "Nom de l'Employé 3", id: 3 },
        { name: "Nom de l'Employé 4", id: 4 },
        { name: "Nom de l'Employé 5", id: 5 },
        { name: "Nom de l'Employé 6", id: 6 },
        { name: "Nom de l'Employé 7", id: 7 },
        { name: "Nom de l'Employé 8", id: 8 },
        { name: "Nom de l'Employé 9", id: 9 },
        { name: "Nom de l'Employé 10", id: 10 }
    ];

    // Fonction pour créer un élément d'employé
    function createEmployeeElement(employee) {
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee');

        const img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000000\' stroke-width=\'1.25\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3\'/%3E%3Ccircle cx=\'12\' cy=\'10\' r=\'3\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3C/svg%3E');
        img.setAttribute('alt', 'Employee Image');
        employeeDiv.appendChild(img);

        const span = document.createElement('span');
        span.textContent = employee.name;
        employeeDiv.appendChild(span);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('employee-buttons');

        const voirButton = document.createElement('button');
        voirButton.textContent = "Voir l'EDT";
        buttonsDiv.appendChild(voirButton);

        const modifierButton = document.createElement('button');
        modifierButton.textContent = "Modifier l'employé";
        buttonsDiv.appendChild(modifierButton);

        const supprimerButton = document.createElement('button');
        supprimerButton.textContent = "Supprimer l'employé";
        buttonsDiv.appendChild(supprimerButton);

        employeeDiv.appendChild(buttonsDiv);

        return employeeDiv;
    }

    // Peupler la liste des employés
    employeesData.forEach(function(employee) {
        const employeeElement = createEmployeeElement(employee);
        listEmployees.appendChild(employeeElement);
    });
});
