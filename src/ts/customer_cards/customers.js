"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const listCustomers = document.querySelector('.list-customers');
    const infoCustomer = document.querySelector('.info-customer');
    // Données des clients (simulées)
    const customersData = [
        { id: 1, nom: "Nom1", prenom: "Prenom1", tel: "123456789", email: "email1@example.com", adresse: "Adresse1", cce: "", cm: "cm1" },
        { id: 2, nom: "Nom2", prenom: "Prenom2", tel: "987654321", email: "email2@example.com", adresse: "Adresse2", cce: "cce2", cm: "" },
        { id: 3, nom: "Nom3", prenom: "Prenom3", tel: "456123789", email: "email3@example.com", adresse: "Adresse3", cce: "cce3", cm: "cm3" },
        { id: 4, nom: "Nom4", prenom: "Prenom4", tel: "789456123", email: "email4@example.com", adresse: "Adresse4", cce: "cce4", cm: "cm4" },
        { id: 5, nom: "Nom5", prenom: "Prenom5", tel: "321654987", email: "email5@example.com", adresse: "Adresse5", cce: "cce5", cm: "cm5" },
        { id: 6, nom: "Nom6", prenom: "Prenom6", tel: "654987321", email: "email6@example.com", adresse: "Adresse6", cce: "cce6", cm: "cm6" },
        { id: 7, nom: "Nom7", prenom: "Prenom7", tel: "987123654", email: "email7@example.com", adresse: "Adresse7", cce: "cce7", cm: "cm7" },
        { id: 8, nom: "Nom8", prenom: "Prenom8", tel: "654321987", email: "email8@example.com", adresse: "Adresse8", cce: "cce8", cm: "cm8" },
        { id: 9, nom: "Nom9", prenom: "Prenom9", tel: "321987654", email: "email9@example.com", adresse: "Adresse9", cce: "cce9", cm: "cm9" },
        { id: 10, nom: "Nom10", prenom: "Prenom10", tel: "987321654", email: "email10@example.com", adresse: "Adresse10", cce: "cce10", cm: "cm10" }
    ];
    //refreshCustomerList();
    // Fonction pour supprimer et réafficher la liste des employés
    function refreshCustomerList() {
        const listCustomers = document.getElementById('list-customers');
        if (!listCustomers)
            return;
        // Efface tout le contenu de list-customers
        listCustomers.innerHTML = '';
        // Réaffiche toute la liste
        customersData.forEach(customer => {
            const customerElement = createCustomerElement(customer);
            listCustomers.appendChild(customerElement);
        });
    }
    // Fonction pour créer un élément d'employé
    function createCustomerElement(customer) {
        const customerDiv = document.createElement('div');
        customerDiv.classList.add('customer');
        // Informations de l'employé (à gauche)
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('customer-info');
        customerDiv.appendChild(infoDiv);
        const img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000000\' stroke-width=\'1.25\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3\'/%3E%3Ccircle cx=\'12\' cy=\'10\' r=\'3\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3C/svg%3E');
        img.setAttribute('alt', 'Customer Image');
        infoDiv.appendChild(img);
        const span = document.createElement('span');
        span.textContent = customer.nom + " " + customer.prenom + " " + customer.email;
        infoDiv.appendChild(span);
        // Boutons (à droite)
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('customer-buttons');
        customerDiv.appendChild(buttonsDiv);
        const modifierButton = document.createElement('button');
        modifierButton.textContent = "Modifier le client";
        modifierButton.addEventListener('click', () => {
            showCustomerInfo(customer);
        });
        modifierButton.classList.add('customer-button');
        buttonsDiv.appendChild(modifierButton);
        const supprimerButton = document.createElement('button');
        supprimerButton.textContent = "Supprimer le client";
        supprimerButton.addEventListener('click', () => {
            removeCustomer(customerDiv, customer);
        });
        supprimerButton.classList.add('customer-button');
        buttonsDiv.appendChild(supprimerButton);
        return customerDiv;
    }
    // Fonction pour afficher les informations de l'employé sélectionné
    function showCustomerInfo(customer) {
        const customerInfoHTML = `
            <h2>Modification Informations du client : <span id="customer_id">${customer.id}</span>
            </h2>
            <form action="#" method="POST">
                <fieldset>
                    <legend>INFORMATIONS</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="nom">Nom :</label>
                            <input type="text" id="nom" name="nom" value="${customer.nom}" required>
                        </div>
                        <div class="input-container">
                            <label for="prenom">Prénom :</label>
                            <input type="text" id="prenom" name="prenom" value="${customer.prenom}" required>
                        </div>
                    </div>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="tel">Numéro de téléphone :</label>
                            <input type="tel" id="tel" name="tel" value="${customer.tel}" required>
                        </div>
                        <div class="input-container">
                            <label for="email">Adresse email :</label>
                            <input type="email" id="email" name="email" value="${customer.email}" required>
                        </div>
                    </div>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="adresse">Adresse :</label>
                            <textarea id="adresse" name="adresse" rows="4" required>${customer.adresse}</textarea>
                        </div>
                    </div>
                    <br><br>
                </fieldset>
                <fieldset>
                    <legend>CARTES</legend>
                    <div class="line-input">
                        ${renderCardInput(customer, 'cce')}
                        ${renderCardInput(customer, 'cm')}
                    </div>
                </fieldset>
                <input id="modif-submit-button" type="submit" value="Confirmer les modifications">
            </form>
        `;
        if (infoCustomer) {
            infoCustomer.innerHTML = customerInfoHTML;
        }
        const modifSubmitButton = document.querySelector('form');
        if (modifSubmitButton) {
            modifSubmitButton.addEventListener("submit", (event) => {
                handleModifyCustomerFormSubmit(event);
            });
        }
        // Ajouter un écouteur d'événements pour les boutons d'ajout de carte
        const addCceButton = document.getElementById('add-cce-button');
        const addCmButton = document.getElementById('add-cm-button');
        if (addCceButton) {
            addCceButton.addEventListener('click', () => {
                // Générer une valeur aléatoire pour cce
                const randomValue = Math.random().toString(36).substring(7);
                customer.cce = randomValue;
                // Mettre à jour l'affichage des informations client
                showCustomerInfo(customer);
            });
        }
        if (addCmButton) {
            addCmButton.addEventListener('click', () => {
                // Générer une valeur aléatoire pour cm
                const randomValue = Math.random().toString(36).substring(7);
                customer.cm = randomValue;
                // Mettre à jour l'affichage des informations client
                showCustomerInfo(customer);
            });
        }
    }
    /// Fonction pour afficher le champ de saisie de la carte ou le bouton d'ajout
    function renderCardInput(customer, cardType) {
        // Si le client a déjà une carte de ce type, afficher la valeur dans un champ de texte
        if (customer[cardType]) {
            return `
                <div class="input-container">
                    <label for="${cardType}">Carte ${cardType.toUpperCase()} :</label>
                    <input type="text" id="${cardType}" name="${cardType}" value="${customer[cardType]}" required><br><br>
                </div>
            `;
        }
        else {
            // Sinon, afficher uniquement le bouton pour ajouter la carte
            return `
                <div class="input-container">
                    <button id="add-${cardType}-button">Ajouter la carte ${cardType.toUpperCase()}</button>
                </div>
            `;
        }
    }
    // Fonction pour supprimer un employé de la liste et du tableau
    function removeCustomer(customerElement, customer) {
        // Retirer l'élément de la liste des employés
        const index = customersData.findIndex(emp => emp.id === customer.id);
        if (index !== -1) {
            customersData.splice(index, 1);
            listCustomers === null || listCustomers === void 0 ? void 0 : listCustomers.removeChild(customerElement);
        }
    }
    // Fonction pour gérer la soumission du formulaire de modification d'employé
    function handleModifyCustomerFormSubmit(event) {
        var _a;
        event.preventDefault();
        const form = event.target;
        const customerId = parseInt(((_a = document.getElementById("customer_id")) === null || _a === void 0 ? void 0 : _a.textContent) || "");
        const nom = form.elements.namedItem("nom");
        const prenom = form.elements.namedItem("prenom");
        const tel = form.elements.namedItem("tel");
        const email = form.elements.namedItem("email");
        const adresse = form.elements.namedItem("adresse");
        const cce = form.elements.namedItem("cce");
        const cm = form.elements.namedItem("cm");
        // Mettez à jour les informations de l'employé dans la liste
        const updatedCustomer = customersData.find(customer => customer.id === customerId);
        if (updatedCustomer) {
            updatedCustomer.nom = nom.value;
            updatedCustomer.prenom = prenom.value;
            updatedCustomer.tel = tel.value;
            updatedCustomer.email = email.value;
            updatedCustomer.adresse = adresse.value;
            updatedCustomer.cce = cce.value;
            updatedCustomer.cm = cm.value;
            // Mettez à jour l'affichage de l'employé dans la liste
            const customerElement = document.querySelector(`.customer[data-id="${customerId}"]`);
            if (customerElement) {
                const infoDiv = customerElement.querySelector('.customer-info');
                if (infoDiv) {
                    infoDiv.textContent = `${updatedCustomer.nom} ${updatedCustomer.prenom} ${updatedCustomer.email} ${updatedCustomer.cce}`;
                }
            }
        }
        // Effacez le contenu de la section info-customer
        if (infoCustomer) {
            infoCustomer.innerHTML = '';
        }
        // Rafraîchir la liste des employés
        refreshCustomerList();
    }
    const addCustomerButton = document.getElementById("add-customer-button");
    const infoCustomerSection = document.querySelector(".info-customer");
    if (addCustomerButton) {
        addCustomerButton.addEventListener("click", handleAddCustomerClick);
    }
    // Spécification du type de 'event' comme MouseEvent
    function handleAddCustomerClick(event, customer) {
        event.preventDefault();
        let newCustomer;
        if (!customer) {
            newCustomer = {
                id: customersData.length + 1,
                nom: "",
                prenom: "",
                tel: "",
                email: "",
                adresse: "",
                cce: "",
                cm: ""
            };
        }
        else {
            newCustomer = customer;
        }
        // Construction du formulaire à afficher dans la section info-customer
        const formHTML = `
            <form action="#" method="POST">
                <h2>Ajouter un client : 
                    <input id="add-client" type="submit" value="Confirmer l'ajout">
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
                    <legend>CARTES</legend>
                    <div class="line-input">
                        ${renderCardInput(newCustomer, 'cce')}
                        ${renderCardInput(newCustomer, 'cm')}
                    </div>
                    
                    <br><br>
                </fieldset>
            </form>
        `;
        // Affichage du formulaire dans la section info-customer
        if (infoCustomerSection) {
            infoCustomerSection.innerHTML = formHTML;
        }
        // Récupération du bouton de soumission et attachement du gestionnaire d'événements
        const addSubmitButton = document.querySelector('form');
        if (addSubmitButton) {
            addSubmitButton.addEventListener("submit", (event) => {
                handleAddCustomerFormSubmit(event, newCustomer);
            });
        }
        // Récupération des boutons d'ajout de carte et ajout des écouteurs d'événements
        const addCceButton = document.getElementById('add-cce-button');
        const addCmButton = document.getElementById('add-cm-button');
        if (addCceButton) {
            addCceButton.addEventListener('click', () => {
                newCustomer.cce = Math.random().toString(36).substring(7);
                handleAddCustomerClick(event, newCustomer);
            });
        }
        if (addCmButton) {
            addCmButton.addEventListener('click', () => {
                newCustomer.cm = Math.random().toString(36).substring(7);
                handleAddCustomerClick(event, newCustomer);
            });
        }
    }
    function handleAddCustomerFormSubmit(event, customer) {
        event.preventDefault();
        const form = event.target;
        // Récupérez les valeurs du formulaire
        const nom = form.elements.namedItem("nom").value;
        const prenom = form.elements.namedItem("prenom").value;
        const tel = form.elements.namedItem("tel").value;
        const email = form.elements.namedItem("email").value;
        const adresse = form.elements.namedItem("adresse").value;
        // Assigner les valeurs au client
        customer.nom = nom;
        customer.prenom = prenom;
        customer.tel = tel;
        customer.email = email;
        customer.adresse = adresse;
        // Ajoutez le nouvel employé à la liste des employés
        customersData.push(customer);
        // Rafraîchissez la liste des employés
        refreshCustomerList();
        // Effacez le contenu de la section info-customer
        if (infoCustomer) {
            infoCustomer.innerHTML = '';
        }
    }
    // Récupérer les éléments de recherche par nom et par ID
    const searchByNameInput = document.getElementById('search-by-name');
    const searchByIdInput = document.getElementById('search-by-id');
    // Ajouter des écouteurs d'événements pour les champs de recherche
    searchByNameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchText = searchByNameInput.value.trim().toLowerCase();
            if (searchText === '') {
                displayCustomers(customersData);
            }
            else {
                filterCustomersByName(searchText);
            }
        }
    });
    searchByIdInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchId = parseInt(searchByIdInput.value.trim());
            if (!isNaN(searchId)) {
                filterCustomersById(searchId);
            }
            else {
                displayCustomers(customersData);
            }
        }
    });
    // Fonction pour filtrer les employés par nom
    function filterCustomersByName(name) {
        const filteredCustomers = customersData.filter(customer => {
            const fullName = `${customer.nom} ${customer.prenom}`.toLowerCase();
            return fullName.includes(name);
        });
        displayCustomers(filteredCustomers);
    }
    // Fonction pour filtrer les employés par ID
    function filterCustomersById(id) {
        const filteredCustomers = customersData.filter(customer => customer.id === id);
        displayCustomers(filteredCustomers);
    }
    // Fonction pour afficher les employés
    function displayCustomers(customers) {
        const listCustomers = document.getElementById('list-customers');
        if (!listCustomers)
            return;
        // Effacer tout le contenu de list-customers
        listCustomers.innerHTML = '';
        // Réafficher les employés filtrés
        customers.forEach(customer => {
            const customerElement = createCustomerElement(customer);
            listCustomers.appendChild(customerElement);
        });
    }
    // Fonction pour vider le contenu de la section info-customer
    function clearInfoCustomer() {
        const infoCustomer = document.querySelector('.info-customer');
        if (infoCustomer) {
            infoCustomer.innerHTML = '';
        }
    }
    const cardsData = [
        { id: 1, type: "cce", ptsMembre: 1, credit: 11, dernierCredit: "01/04/2024", montantDernierCredit: 10, idClient: "" },
        { id: 2, type: "cm", ptsMembre: 2, credit: 22, dernierCredit: "02/04/2024", montantDernierCredit: 20, idClient: "" },
        { id: 3, type: "cce", ptsMembre: 3, credit: 33, dernierCredit: "03/04/2024", montantDernierCredit: 30, idClient: "" },
        { id: 4, type: "cm", ptsMembre: 4, credit: 44, dernierCredit: "04/04/2024", montantDernierCredit: 40, idClient: "" },
        { id: 5, type: "cce", ptsMembre: 5, credit: 55, dernierCredit: "05/04/2024", montantDernierCredit: 50, idClient: "" },
        { id: 6, type: "cm", ptsMembre: 6, credit: 66, dernierCredit: "06/04/2024", montantDernierCredit: 60, idClient: "" },
        { id: 7, type: "cce", ptsMembre: 7, credit: 77, dernierCredit: "07/04/2024", montantDernierCredit: 70, idClient: "" },
        { id: 8, type: "cm", ptsMembre: 8, credit: 88, dernierCredit: "08/04/2024", montantDernierCredit: 80, idClient: "" },
        { id: 9, type: "cce", ptsMembre: 9, credit: 99, dernierCredit: "09/04/2024", montantDernierCredit: 90, idClient: "" },
        { id: 10, type: "cm", ptsMembre: 10, credit: 110, dernierCredit: "10/04/2024", montantDernierCredit: 100, idClient: "" },
    ];
    // Fonction pour supprimer et réafficher la liste des employés
    function refreshCardList() {
        const listCards = document.getElementById('list-customers');
        if (!listCards)
            return;
        // Efface tout le contenu de list-customers
        listCards.innerHTML = '';
        // Réaffiche toute la liste
        cardsData.forEach(card => {
            const cardElement = createCardElement(card);
            listCards.appendChild(cardElement);
        });
    }
    // Fonction pour créer un élément d'employé
    function createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('customer');
        // Informations de l'employé (à gauche)
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('customer-info');
        cardDiv.appendChild(infoDiv);
        const img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000000\' stroke-width=\'1.25\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3\'/%3E%3Ccircle cx=\'12\' cy=\'10\' r=\'3\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3C/svg%3E');
        img.setAttribute('alt', 'Card Image');
        infoDiv.appendChild(img);
        const span = document.createElement('span');
        span.textContent = card.id + " " + card.idClient + " " + card.ptsMembre + card.credit;
        infoDiv.appendChild(span);
        // Boutons (à droite)
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('customer-buttons');
        cardDiv.appendChild(buttonsDiv);
        const modifierButton = document.createElement('button');
        modifierButton.textContent = "Modifier la carte";
        modifierButton.addEventListener('click', () => {
            showCardInfo(card);
        });
        modifierButton.classList.add('customer-button');
        buttonsDiv.appendChild(modifierButton);
        const supprimerButton = document.createElement('button');
        supprimerButton.textContent = "Supprimer la carte";
        supprimerButton.addEventListener('click', () => {
            removeCard(cardDiv, card);
        });
        supprimerButton.classList.add('customer-button');
        buttonsDiv.appendChild(supprimerButton);
        return cardDiv;
    }
    // Fonction pour afficher les informations de la carte sélectionnée
    function showCardInfo(card) {
        let cardInfoHTML = `
            <h2>Modification Informations de la Carte : <span id="card_id">${card.id}</span></h2>
            <form action="#" method="POST">
                <fieldset>
                    <legend>INFORMATIONS</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="type">Type de carte :</label>
                            <input type="text" id="type" name="type" value="${card.type}" readonly>
                        </div>
                    </div>
        `;
        if (card.type === 'cce') {
            cardInfoHTML += `
                    <div class="line-input">
                        <div class="input-container">
                            <label for="credit">Crédit :</label>
                            <input type="text" id="credit" name="credit" value="${card.credit}" required>
                        </div>
                        <div class="input-container">
                            <label for="montantDernierCredit">Montant du dernier crédit :</label>
                            <input type="text" id="montantDernierCredit" name="montantDernierCredit" value="${card.montantDernierCredit}" required>
                        </div>
                    </div>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="dernierCredit">Dernier crédit :</label>
                            <input type="text" id="dernierCredit" name="dernierCredit" value="${card.dernierCredit}" required>
                        </div>
                    </div>
            `;
        }
        else if (card.type === 'cm') {
            cardInfoHTML += `
                    <div class="line-input">
                        <div class="input-container">
                            <label for="ptsMembre">Points Membre :</label>
                            <input type="text" id="ptsMembre" name="ptsMembre" value="${card.ptsMembre}" required>
                        </div>
                    </div>
            `;
        }
        cardInfoHTML += `
                </fieldset>
                <fieldset>
                    <legend>CLIENT</legend>
                    <div class="line-input">
                        <div class="input-container">
                            <label for="idClient">Id du Client :</label>
                            <input type="text" id="idClient" name="idClient" value="${card.idClient}">
                        </div>
                    </div>
                </fieldset>
                <input id="modif-submit-button" type="submit" value="Confirmer les modifications">
            </form>
        `;
        if (infoCustomer) {
            infoCustomer.innerHTML = cardInfoHTML;
        }
        const modifSubmitButton = document.querySelector('form');
        if (modifSubmitButton) {
            modifSubmitButton.addEventListener("submit", (event) => {
                handleModifyCardFormSubmit(event);
            });
        }
    }
    // Fonction pour supprimer une carte de la liste et du tableau
    function removeCard(cardElement, card) {
        // Retirer l'élément de la liste des cartes
        const index = cardsData.findIndex(emp => emp.id === card.id);
        if (index !== -1) {
            cardsData.splice(index, 1);
            listCustomers === null || listCustomers === void 0 ? void 0 : listCustomers.removeChild(cardElement);
        }
    }
    // Fonction pour gérer la soumission du formulaire de modification d'employé
    function handleModifyCardFormSubmit(event) {
        var _a;
        event.preventDefault();
        const form = event.target;
        const cardId = parseInt(((_a = document.getElementById("card_id")) === null || _a === void 0 ? void 0 : _a.textContent) || "");
        const type = form.elements.namedItem("type");
        let updatedCard;
        // Mettre à jour les informations de la carte dans la liste
        if (type.value === 'cce') {
            const credit = form.elements.namedItem("credit");
            const montantDernierCredit = form.elements.namedItem("montantDernierCredit");
            const dernierCredit = form.elements.namedItem("dernierCredit");
            updatedCard = cardsData.find(card => card.id === cardId);
            if (updatedCard) {
                updatedCard.credit = parseFloat(credit.value);
                updatedCard.montantDernierCredit = parseFloat(montantDernierCredit.value);
                updatedCard.dernierCredit = dernierCredit.value;
            }
        }
        else if (type.value === 'cm') {
            const ptsMembre = form.elements.namedItem("ptsMembre");
            updatedCard = cardsData.find(card => card.id === cardId);
            if (updatedCard) {
                updatedCard.ptsMembre = parseFloat(ptsMembre.value);
            }
        }
        const idClient = form.elements.namedItem("idClient");
        updatedCard = cardsData.find(card => card.id === cardId);
        if (updatedCard && idClient.value) {
            updatedCard.idClient = idClient.value;
        }
        // Effacez le contenu de la section info-customer
        if (infoCustomer) {
            infoCustomer.innerHTML = '';
        }
        // Rafraîchir la liste des cartes
        refreshCardList();
    }
    // Récupérer le bouton d'ajout de carte
    const addCardButton = document.getElementById("add-card-button");
    // Ajouter un écouteur d'événements au bouton d'ajout de carte
    if (addCardButton) {
        addCardButton.addEventListener("click", handleAddCardClick);
    }
    // Définir la fonction pour gérer le clic sur le bouton d'ajout de carte
    function handleAddCardClick(event, card) {
        event.preventDefault();
        // Générer une nouvelle carte avec des valeurs par défaut ou vides
        let newCard;
        if (!card) {
            newCard = {
                id: 0,
                type: "",
                ptsMembre: 0,
                credit: 0,
                dernierCredit: "",
                montantDernierCredit: 0,
                idClient: ""
            };
        }
        else {
            newCard = card;
        }
        // Afficher un formulaire dans la section info-customer pour créer une nouvelle carte
        const formHTML = `
            <h2>Créer une carte</h2>
            <form id="add-card-form" action="#" method="POST">
                <div class="line-input">
                    ${newCard.id !== 0 ? `<input type="text" id="card-id" name="card-id" value="${newCard.id}" disabled>` : `<button id="generate-id-button">Scanner une carte</button>`}
                </div>
                <div class="line-input">
                    <button id="create-member-card-button" ${newCard.id == 0 ? 'disabled' : ''}>Créer une carte membre</button>
                    <button id="create-energy-credit-card-button" ${newCard.id == 0 ? 'disabled' : ''}>Créer une carte crédit énergie</button>
                </div>
            </form>
        `;
        // Afficher le formulaire dans la section info-customer
        if (infoCustomer) {
            infoCustomer.innerHTML = formHTML;
        }
        // Ajouter des écouteurs d'événements pour les boutons du formulaire
        const generateIdButton = document.getElementById('generate-id-button');
        const createMemberCardButton = document.getElementById('create-member-card-button');
        const createEnergyCreditCardButton = document.getElementById('create-energy-credit-card-button');
        if (generateIdButton) {
            generateIdButton.addEventListener('click', () => {
                // Générer un identifiant aléatoire pour la nouvelle carte
                const randomId = Math.floor(Math.random() * 1000000);
                newCard.id = randomId;
                newCard.type = "";
                // Afficher le formulaire pour le type de carte
                handleAddCardClick(event, newCard);
            });
        }
        if (createMemberCardButton) {
            createMemberCardButton.addEventListener('click', () => {
                newCard.type = "cm";
                const cardId = document.getElementById('card-id');
                newCard.id = parseFloat(cardId.value);
                cardsData.push(newCard);
                refreshCardList();
            });
        }
        if (createEnergyCreditCardButton) {
            createEnergyCreditCardButton.addEventListener('click', () => {
                newCard.type = "cce";
                const cardId = document.getElementById('card-id');
                newCard.id = parseFloat(cardId.value);
                cardsData.push(newCard);
                refreshCardList();
            });
        }
    }
    // Sélectionnez les boutons par leur ID
    const customerButton = document.getElementById("customer-button");
    const cardButton = document.getElementById("card-button");
    // Ajoutez des écouteurs d'événements pour chaque bouton
    if (customerButton) {
        customerButton.addEventListener("click", () => {
            clearInfoCustomer();
            refreshCustomerList();
        });
    }
    if (cardButton) {
        cardButton.addEventListener("click", () => {
            clearInfoCustomer();
            refreshCardList();
        });
    }
    refreshCustomerList();
});
