document.addEventListener("DOMContentLoaded", () => {
    const listEmployees = document.querySelector('.list-employees');
    const infoEmployee = document.querySelector('.info-employee');

    // Interface pour définir la structure des employés
    interface Employee {
        id: number;
        nom: string;
        prenom: string;
        tel: string;
        email: string;
        adresse: string;
        poste: string;
        rang: string;
        permissions: string[];
        emploiDuTemps: PeriodeEDT[];
    }


    // Interface représentant une période de l'emploi du temps
    interface PeriodeEDT {
        employe_id: number;
        periode_id: number;
        intitule: string;
        jour: string;
        heureDebut: string;
        heureFin: string;
    }

    const selectedPermissions: string[] = [];

    let employeesData: Employee[] = [];

    async function getEmployeesFromServer() {
        try {
            const response = await fetch('/voirTousEmployes');
            const employeesFromServer = await response.json();
    
            // Clear the existing employeesData array before populating it with new data
            employeesData.length = 0;
    
            // Populate employeesData array with fetched data
            for (const employee of employeesFromServer) {
                try {
                    const fullEmployeeInfoResponse = await fetch(`/voirInfosEmploye/${employee.id}`);
                    const employeeDetails = await fullEmployeeInfoResponse.json();
    
                    const tel = employeeDetails?.personne?.partenaire?.contact?.tel ?? '';
                    const email = employeeDetails?.personne?.partenaire?.contact?.courriel ?? '';
                    const adresse = employeeDetails?.personne?.partenaire?.contact?.adresse ?? '';
                    const codePostal = employeeDetails?.personne?.partenaire?.contact?.codePostal ?? '';
                    const pays = employeeDetails?.personne?.partenaire?.contact?.pays ?? '';
    
                    // Call getEmployeeSchedule to fetch schedule data
                    const emploiDuTemps = await getEmployeeSchedule(employee.id);
    
                    employeesData.push({
                        id: employee.id,
                        nom: employee.personne?.nom ?? '',
                        prenom: employee.personne?.prenom ?? '',
                        tel: tel,
                        email: email,
                        adresse: `${adresse}, ${codePostal}, ${pays}`,
                        poste: employee.poste ?? '',
                        rang: employee.rang ?? '',
                        permissions: [],
                        emploiDuTemps: emploiDuTemps // Assigning the fetched schedule data
                    });

                } catch (error) {

                    console.error(`Error fetching details for employee with ID ${employee.id}:`, error);
                }
            }
    
            // Refresh the employee list
            refreshEmployeeList();
        } catch (error) {
            console.error('Error fetching employees data:', error);
        }
    }

    // Fonction pour récupérer l'emploi du temps d'un employé
    async function getEmployeeSchedule(employeeId: number): Promise<PeriodeEDT[]> {
        try {
            const response = await fetch(`/voirEdt/${employeeId}`);
            const scheduleData = await response.json();

            // Transform the received scheduleData into the format expected by the application
            const emploiDuTemps: PeriodeEDT[] = scheduleData.map((item: any) => {
                return {
                    employe_id: item.employe_id,
                    periode_id: item.periode_id,
                    intitule: item.intitule,
                    jour: new Date(item.periode.dateDebut).toLocaleDateString(),
                    heureDebut: new Date(item.periode.dateDebut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    heureFin: new Date(item.periode.dateFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
            });

            return emploiDuTemps;
        } catch (error) {
            console.error('Error fetching employee schedule:', error);
            return [];
        }
    }


    getEmployeesFromServer();
    refreshEmployeeList();

    // Fonction pour supprimer et réafficher la liste des employés
    function refreshEmployeeList() {
        const listEmployees = document.getElementById('list-employees');
        if (!listEmployees) return;
    
        // Efface tout le contenu de list-employees
        listEmployees.innerHTML = '';
    
        // Réaffiche toute la liste
        employeesData.forEach(employee => {
            const employeeElement = createEmployeeElement(employee); // Utilisation de createEmployeeElement
            listEmployees.appendChild(employeeElement);
        });
    }
    
    // Fonction pour créer un élément d'employé
    function createEmployeeElement(employee: Employee): HTMLDivElement {
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
        voirButton.addEventListener('click', () => {
            handleVoirEDTClick(employee);
        });
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
            removeEmployee(employeeDiv, employee);
        });
        supprimerButton.classList.add('employee-button');
        buttonsDiv.appendChild(supprimerButton);
    
        return employeeDiv;
    }
    

    // Fonction pour afficher les informations de l'employé sélectionné
    function showEmployeeInfo(employee: Employee) {
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
                            <input type="tel" id="tel" name="tel" value="${employee.tel}">
                        </div>
                        <div class="input-container">
                            <label for="email">Adresse email :</label>
                            <input type="email" id="email" name="email" value="${employee.email}">
                        </div>
                    </div>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="adresse">Adresse :</label>
                            <textarea id="adresse" name="adresse" rows="4">${employee.adresse}</textarea>
                        </div>
                    </div>
                    <br><br>
                </fieldset>
                <fieldset>
                    <legend>POSTE</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="poste">Poste :</label>
                            <input type="text" id="poste" name="poste" value="${employee.poste}"><br><br>
                        </div>
                        <div class="input-container">
                            <label for="rang">Rang :</label>
                            <input type="text" id="rang" name="rang" value="${employee.rang}"><br><br>
                        </div>
                    </div>
                </fieldset>
                <input id="modif-submit-button" type="submit" value="Confirmer les modifications">
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
        const modifSubmitButton = document.querySelector('form');
        if (modifSubmitButton) {
            modifSubmitButton.addEventListener("submit", (event) => {
                handleModifyEmployeeFormSubmit(event);
            });
        }
        
    }

    // Fonction pour supprimer un employé de la liste et du tableau
    async function removeEmployee(employeeElement: HTMLDivElement, employee: Employee): Promise<void> {
        try {
            const response = await fetch(`/supprimerEmploye/${employee.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Retirer l'élément de la liste des employés
                const index = employeesData.findIndex(emp => emp.id === employee.id);
                if (index !== -1) {
                    employeesData.splice(index, 1);
                    listEmployees?.removeChild(employeeElement);
                    
                }
                console.log('Employee deleted successfully');
            } else {
                console.error('Failed to delete employee:', response.status);
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    }


    // Fonction pour afficher le formulaire de modification des permissions et de l'EDT
    function showEDTPermissionsForm(employee: Employee) {
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
                            <div class="input-container">
                                <label for="date">Date :</label>
                                <input type="text" id="date" name="date" required placeholder="JJ/MM/AAAA">
                            </div>
                        </div>
                        <div class="line-input">
                            <div class="input-container">
                                <label for="starthour">Heure de début :</label>
                                <input type="text" id="starthour" name="starthour" required placeholder="hh:mm">
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
            updateSelectedPermissionsList(selectedPermissionsList, employee.permissions);
        }

        // Ajouter les gestionnaires d'événements pour les boutons dans le formulaire
        const modifInfoButton = document.getElementById('modif-info-button');
        const addPermButton = document.getElementById('add-perm-button');
        const removePermButton = document.getElementById('remove-perm-button');
        const removeActivityButton = document.getElementById('remove-activity-button');

        if (addPermButton && removePermButton && removeActivityButton) {
            addPermButton.addEventListener('click', () => {handleAddPermissionClick(employee.permissions)});
            removePermButton.addEventListener('click',() => { handleRemovePermissionClick(employee.permissions)});
        }
        if(modifInfoButton){
            modifInfoButton.addEventListener('click', () => {
                showEmployeeInfo(employee);
            });
        }

        const addActivityButton = document.getElementById('add-activity-button');
        if (addActivityButton) {
            addActivityButton.addEventListener('click', async () => {
                const activityInput = document.getElementById('activity') as HTMLInputElement;
                const dateInput = document.getElementById('date') as HTMLInputElement;
                const startHourInput = document.getElementById('starthour') as HTMLInputElement;
                const endHourInput = document.getElementById('endhour') as HTMLInputElement;
    
                if (activityInput && dateInput && startHourInput && endHourInput) {
                    const activity = activityInput.value;
                    const date = dateInput.value;
                    const startHour = startHourInput.value;
                    const endHour = endHourInput.value;
    
                    // Créer un nouvel objet PeriodeEDT avec les nouvelles valeurs
                    const newPeriode: PeriodeEDT = {
                        periode_id: -1, // ID temporaire, sera remplacé par le serveur
                        employe_id: employee.id,
                        intitule: activity,
                        jour: date,
                        heureDebut: startHour,
                        heureFin: endHour
                    };
    
                    // Appeler la fonction pour modifier la période de l'EDT
                    await handleModifyPeriodButtonClick(employee.id, -1, newPeriode);
                }
            });
        }
        
    }

    async function modifyEmployeeScheduleOnServer(employeeId: number, idPeriode: number, nouvellesValeurs: any): Promise<boolean> {
        try {
            const response = await fetch('/modifierEdt', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idPeriode: idPeriode,
                    nouvellesValeurs: nouvellesValeurs
                })
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.message);
                return true;
            } else {
                console.error('Failed to modify employee schedule:', response.status);
                return false;
            }
        } catch (error) {
            console.error('Error modifying employee schedule:', error);
            return false;
        }
    }

    async function handleModifyPeriodButtonClick(employeeId: number, idPeriode: number, nouvellesValeurs: any) {
        const success: boolean = await modifyEmployeeScheduleOnServer(employeeId, idPeriode, nouvellesValeurs);
        if (success) {
            // Ajouter la nouvelle période à l'emploi du temps local de l'employé
            const employee = employeesData.find(emp => emp.id === employeeId);
            if (employee) {
                const newPeriode: PeriodeEDT = {
                    periode_id: idPeriode, // L'ID de la période modifiée
                    employe_id: employeeId,
                    intitule: nouvellesValeurs.intitule,
                    jour: nouvellesValeurs.jour,
                    heureDebut: nouvellesValeurs.heureDebut,
                    heureFin: nouvellesValeurs.heureFin
                };
                employee.emploiDuTemps.push(newPeriode);
            }
    
            // Rafraîchir la liste des employés
            refreshEmployeeList();
        } else {
            // Gérer l'échec de la modification des périodes de l'EDT
        }
    }
    

    // Fonction pour mettre à jour la liste des permissions sélectionnées
    function updateSelectedPermissionsList(selectedPermissionsList: HTMLElement, permissions: string[]) {
        // Effacer la liste actuelle
        selectedPermissionsList.innerHTML = "";

        // Parcourir le tableau des permissions sélectionnées et les ajouter à la liste
        permissions.forEach((permission) => {
            const listItem = document.createElement("li");
            listItem.textContent = permission;
            selectedPermissionsList.appendChild(listItem);
        });
    }

    function handleAddPermissionClick(permissions: string[]) {
        const permissionSelect = document.getElementById("perm") as HTMLSelectElement;
        const selectedPermissionsList = document.getElementById("selected-perms");

        // Récupérer la permission sélectionnée
        const selectedPermission = permissionSelect.options[permissionSelect.selectedIndex].value;

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
    function handleRemovePermissionClick(permissions: string[]) {
        const permissionSelect = document.getElementById("perm") as HTMLSelectElement;
        const selectedPermissionsList = document.getElementById("selected-perms");

        // Récupérer la permission sélectionnée
        const selectedPermission = permissionSelect.options[permissionSelect.selectedIndex].value;
        
        const index = permissions.indexOf(selectedPermission, );

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
    function handleVoirEDTClick(employee: Employee) {
        // Mettre à jour le contenu de l'élément info-employee avec les informations de l'employé
        if (infoEmployee) {
            infoEmployee.innerHTML = `
                <div class="employee-info">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='1.25' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E" alt="Employee Image">
                    <h2>${employee.nom} ${employee.prenom}</h2>
                    <div class="white-square">
                        <!-- EDT periods will be displayed here -->
                    </div>
                    <p>Semaine du :</p>
                    <input type="text" id="week-input" placeholder="jj/mm/aaaa">
                </div>
            `;
            
            const whiteSquare = document.querySelector('.white-square') as HTMLInputElement;
            const weekInput = document.getElementById('week-input') as HTMLInputElement;
            
            /*
            if (weekInput) {

                weekInput.addEventListener('keypress', async (event) => {
                    if (event.key === 'Enter') {
                        const edtText = document.getElementById('edt-text');
                        if (edtText) {
                            edtText.textContent = 'EDT ' + weekInput.value;
                        }
                        const employeeWithSchedule = { ...employee, emploiDuTemps: await getEmployeeSchedule(employee.id) };
                    }
                });
            }
            */
            if (whiteSquare) {
                //ajouterPeriodesPourEmployes();
                displayScheduleDetails(employee, whiteSquare);
            }

        }
    }
    
    async function displayScheduleDetails(employee: Employee, container: HTMLElement) {
        // Clear any existing content
        container.innerHTML = '';
    
        // Loop through each period in employee's schedule and display details
        for (const periode of employee.emploiDuTemps) {
            const periodeDetails = document.createElement('div');
            periodeDetails.classList.add('periode-details');
            periodeDetails.innerHTML = `
                <p>Intitulé: ${periode.intitule}</p>
                <p>Date: ${periode.jour}</p>
                <p>Début: ${periode.heureDebut}</p>
                <p>Fin: ${periode.heureFin}</p>
            `;
            container.appendChild(periodeDetails);
        }
    }
    
    

    

    // Fonction pour gérer la soumission du formulaire de modification d'employé
    async function handleModifyEmployeeFormSubmit(event: Event) {
        event.preventDefault();
    
        const form = event.target as HTMLFormElement;
    
        const employeeId = parseInt(document.getElementById("employee_id")?.textContent || "");
        const nom = (form.elements.namedItem("nom") as HTMLInputElement).value;
        const prenom = (form.elements.namedItem("prenom") as HTMLInputElement).value;
        const tel = (form.elements.namedItem("tel") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const adresse = (form.elements.namedItem("adresse") as HTMLTextAreaElement).value;
        const poste = (form.elements.namedItem("poste") as HTMLInputElement).value;
        const rang = (form.elements.namedItem("rang") as HTMLInputElement).value;
    
        // Diviser l'adresse en utilisant les virgules comme séparateurs
        const adresseParts = adresse.split(',');

        // Extraire le code postal et le pays des parties de l'adresse
        const codePostal = adresseParts[1]?.trim() ?? '';
        const pays = adresseParts[2]?.trim() ?? '';

        const nouvellesInfos = {
            personne: {
                nom: nom,
                prenom: prenom,
                partenaire: {
                    contact: {
                        tel: tel,
                        courriel: email,
                        adresse: adresseParts[0]?.trim() ?? '', // La première partie est l'adresse principale
                        codePostal: codePostal,
                        pays: pays
                    }
                }
            },
            poste: poste,
            rang: rang
        };

    
        // Appel de la fonction pour modifier l'employé sur le serveur
        const success: boolean = await modifyEmployeeOnServer(employeeId, nouvellesInfos);
    
        const updatedEmployee = employeesData.find(employee => employee.id === employeeId);
        if (updatedEmployee) {
            // Mettre à jour les propriétés nom, poste et rang
            updatedEmployee.nom = nom;
            updatedEmployee.prenom = prenom;
            updatedEmployee.tel = tel;
            updatedEmployee.email = email;
            updatedEmployee.adresse = adresse;
            updatedEmployee.poste = poste;
            updatedEmployee.rang = rang;
        }
        refreshEmployeeList();


        //POUR L'INSTANT CA MARCHE PAS DU COUP J'AI SORTIS LES MODIFS VISUELLES DE LA CONDITION
        if (success) {
        
            // Mettre à jour les données locales de l'employé modifié
            /*
            const updatedEmployee = employeesData.find(employee => employee.id === employeeId);
            if (updatedEmployee) {
                // Mettre à jour les propriétés nom, poste et rang
                updatedEmployee.nom = nom;
                updatedEmployee.prenom = prenom;
                updatedEmployee.tel = tel;
                updatedEmployee.email = email;
                updatedEmployee.adresse = adresse;
                updatedEmployee.poste = poste;
                updatedEmployee.rang = rang;
            }*/
    
            // Rafraîchir la liste des employés
            refreshEmployeeList();
        } else {
            // Gérer l'échec de la modification de l'employé
        }
    }

    async function modifyEmployeeOnServer(employeeId: number, nouvellesInfos: any): Promise<boolean> {
        try {
            // Parcourir chaque clé (information) dans nouvellesInfos
            for (const infoKey in nouvellesInfos) {
                if (Object.prototype.hasOwnProperty.call(nouvellesInfos, infoKey)) {
                    const infoValue = nouvellesInfos[infoKey];
                    // Effectuer une requête PUT distincte pour mettre à jour chaque information
                    const response = await fetch(`/modifierInfosEmploye/${employeeId}/${infoKey}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ value: infoValue })
                    });
    
                    if (!response.ok) {
                        console.error(`Failed to modify ${infoKey} for employee with ID ${employeeId}:`, response.status);
                        return false; // Si une seule modification échoue, arrêter et renvoyer false
                    }
                }
            }
            console.log('Employee information modified successfully');
            return true; // Si toutes les modifications sont réussies, renvoyer true
        } catch (error) {
            console.error('Error modifying employee information:', error);
            return false;
        }
    }
    
    

    const addEmployeeButton = document.getElementById("add-employee-button");
    const infoEmployeeSection = document.querySelector(".info-employee") as HTMLElement;

    if(addEmployeeButton) {
        addEmployeeButton.addEventListener("click", handleAddEmployeeClick);
    }
    // Spécification du type de 'event' comme MouseEvent
    function handleAddEmployeeClick(event: MouseEvent) {
        event.preventDefault();

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
                            <input type="tel" id="tel" name="tel">
                        </div>
                    
                        <div class="input-container">
                            <label for="email">Adresse email :</label>
                            <input type="email" id="email" name="email">
                        </div>
                    </div>
                    
                    <div class="line-input">
                        <div class="input-container">
                            <label for="adresse">Adresse :</label>
                            <textarea id="adresse" name="adresse" rows="4"></textarea>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>POSTE</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="poste">Poste :</label>
                            <input type="text" id="poste" name="poste">
                        </div>
                    
                        <div class="input-container">
                            <label for="rang">Rang :</label>
                            <input type="text" id="rang" name="rang">
                        </div>
                    </div>
                </fieldset>
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
                            <div class="perms-selector-container">
                                <label for="perm">Permission :</label>
                                <select id="perm" name="perm">
                                    <option value="perm1">Perm 1</option>
                                    <option value="perm2">Perm 2</option>
                                    <option value="perm3">Perm 3</option>
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
        }

        const permissionsList: string[] = [];

        const addRoleButton = document.getElementById("add-role-button");
        const removeRoleButton = document.getElementById("remove-role-button");
        if (addRoleButton && removeRoleButton) {
            addRoleButton.addEventListener("click", () => handleAddPermissionClick(permissionsList));
            removeRoleButton.addEventListener("click", () => handleRemovePermissionClick(permissionsList));
        }
    
        // Récupération du bouton de soumission et attachement du gestionnaire d'événements
        const submitButton = document.querySelector('form');
        if (submitButton) {
            submitButton.addEventListener("submit", (event) => {
                handleAddEmployeeFormSubmit(event);
            });
        }

        // Les fonctions handleAddRoleClick et handleRemoveRoleClick restent inchangées
        if (addEmployeeButton) {
            addEmployeeButton.addEventListener("click", handleAddEmployeeClick);
        }
        
    }

    function handleAddEmployeeFormSubmit(event: Event) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        // Récupérez les valeurs du formulaire
        const nom = (form.elements.namedItem("nom") as HTMLInputElement).value;
        const prenom = (form.elements.namedItem("prenom") as HTMLInputElement).value;
        const tel = (form.elements.namedItem("tel") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const adresse = (form.elements.namedItem("adresse") as HTMLTextAreaElement).value;
        const poste = (form.elements.namedItem("poste") as HTMLInputElement).value;
        const rang = (form.elements.namedItem("rang") as HTMLInputElement).value;

        // Créez un nouvel objet employé avec les valeurs du formulaire
        const newEmployee: Employee = {
            id: employeesData.length + 1, // Générez un nouvel identifiant unique
            nom: nom,
            prenom: prenom,
            tel: tel,
            email: email,
            adresse: adresse,
            poste: poste,
            rang: rang,
            permissions: [],
            emploiDuTemps: []
        };


        addEmployeeInServer(newEmployee)
        // Ajoutez le nouvel employé à la liste des employés
        employeesData.push(newEmployee);

        // Rafraîchissez la liste des employés
        refreshEmployeeList();

        // Effacez le contenu de la section info-employee
        if (infoEmployee) {
            infoEmployee.innerHTML = '';
        }
    }

    // Fonction pour envoyer les données du client au serveur
    async function addEmployeeInServer(employee: Employee) {
        let parties = employee.adresse.split(', ');
        try {
            const response = await fetch('/creerEmploye', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({alias: "", mdp:"", dep:"Planergy", poste: employee.poste, rang: employee.rang, nom: employee.nom, prenom: employee.prenom, id_partenaire: employee.id, courriel:employee.email, tel:employee.tel,adresse: parties[0], codePostal: parties[1], pays: parties[2]})
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création du client : ' + response.statusText);
            }

            const responseData = await response.json();
            console.log(responseData.message); // Affiche le message de la réponse
        } catch (error) {
            console.error('Une erreur est survenue : ', error);
        }
    }




    
    // Récupérer les éléments de recherche par nom et par ID
    const searchByNameInput = document.getElementById('search-by-name') as HTMLInputElement;
    const searchByIdInput = document.getElementById('search-by-id') as HTMLInputElement;

    // Ajouter des écouteurs d'événements pour les champs de recherche
    searchByNameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchText = searchByNameInput.value.trim().toLowerCase();
            if (searchText === '') {
                displayEmployees(employeesData);
            } else {
                filterEmployeesByName(searchText);
            }
        }
    });

    searchByIdInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchId = parseInt(searchByIdInput.value.trim());
            if (!isNaN(searchId)) {
                filterEmployeesById(searchId);
            } else {
                displayEmployees(employeesData);
            }
        }
    });

    // Fonction pour filtrer les employés par nom
    function filterEmployeesByName(name: string) {
        const filteredEmployees = employeesData.filter(employee => {
            const fullName = `${employee.nom} ${employee.prenom}`.toLowerCase();
            return fullName.includes(name);
        });
        displayEmployees(filteredEmployees);
    }

    // Fonction pour filtrer les employés par ID
    function filterEmployeesById(id: number) {
        const filteredEmployees = employeesData.filter(employee => employee.id === id);
        displayEmployees(filteredEmployees);
    }

    // Fonction pour afficher les employés
    function displayEmployees(employees: Employee[]) {
        const listEmployees = document.getElementById('list-employees');
        if (!listEmployees) return;

        // Effacer tout le contenu de list-employees
        listEmployees.innerHTML = '';

        // Réafficher les employés filtrés
        employees.forEach(employee => {
            const employeeElement = createEmployeeElement(employee);
            listEmployees.appendChild(employeeElement);
        });
    }

    

    
});
