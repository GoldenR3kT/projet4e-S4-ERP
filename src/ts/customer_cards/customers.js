document.addEventListener("DOMContentLoaded", function () {
    var listCustomers = document.querySelector('.list-customers');
    var infoCustomer = document.querySelector('.info-customer');
    // Données des clients (simulées)
    var customersData = [
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
        var listCustomers = document.getElementById('list-customers');
        if (!listCustomers)
            return;
        // Efface tout le contenu de list-customers
        listCustomers.innerHTML = '';
        // Réaffiche toute la liste
        customersData.forEach(function (customer) {
            var customerElement = createCustomerElement(customer);
            listCustomers.appendChild(customerElement);
        });
    }
    // Fonction pour créer un élément d'employé
    function createCustomerElement(customer) {
        var customerDiv = document.createElement('div');
        customerDiv.classList.add('customer');
        // Informations de l'employé (à gauche)
        var infoDiv = document.createElement('div');
        infoDiv.classList.add('customer-info');
        customerDiv.appendChild(infoDiv);
        var img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000000\' stroke-width=\'1.25\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3\'/%3E%3Ccircle cx=\'12\' cy=\'10\' r=\'3\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3C/svg%3E');
        img.setAttribute('alt', 'Customer Image');
        infoDiv.appendChild(img);
        var span = document.createElement('span');
        span.textContent = customer.nom + " " + customer.prenom + " " + customer.email;
        infoDiv.appendChild(span);
        // Boutons (à droite)
        var buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('customer-buttons');
        customerDiv.appendChild(buttonsDiv);
        var modifierButton = document.createElement('button');
        modifierButton.textContent = "Modifier le client";
        modifierButton.addEventListener('click', function () {
            showCustomerInfo(customer);
        });
        modifierButton.classList.add('customer-button');
        buttonsDiv.appendChild(modifierButton);
        var supprimerButton = document.createElement('button');
        supprimerButton.textContent = "Supprimer le client";
        supprimerButton.addEventListener('click', function () {
            removeCustomer(customerDiv, customer);
        });
        supprimerButton.classList.add('customer-button');
        buttonsDiv.appendChild(supprimerButton);
        return customerDiv;
    }
    // Fonction pour afficher les informations de l'employé sélectionné
    function showCustomerInfo(customer) {
        var customerInfoHTML = "\n            <h2>Modification Informations du client : <span id=\"customer_id\">".concat(customer.id, "</span>\n            </h2>\n            <form action=\"#\" method=\"POST\">\n                <fieldset>\n                    <legend>INFORMATIONS</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"nom\">Nom :</label>\n                            <input type=\"text\" id=\"nom\" name=\"nom\" value=\"").concat(customer.nom, "\" required>\n                        </div>\n                        <div class=\"input-container\">\n                            <label for=\"prenom\">Pr\u00E9nom :</label>\n                            <input type=\"text\" id=\"prenom\" name=\"prenom\" value=\"").concat(customer.prenom, "\" required>\n                        </div>\n                    </div>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"tel\">Num\u00E9ro de t\u00E9l\u00E9phone :</label>\n                            <input type=\"tel\" id=\"tel\" name=\"tel\" value=\"").concat(customer.tel, "\" required>\n                        </div>\n                        <div class=\"input-container\">\n                            <label for=\"email\">Adresse email :</label>\n                            <input type=\"email\" id=\"email\" name=\"email\" value=\"").concat(customer.email, "\" required>\n                        </div>\n                    </div>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"adresse\">Adresse :</label>\n                            <textarea id=\"adresse\" name=\"adresse\" rows=\"4\" required>").concat(customer.adresse, "</textarea>\n                        </div>\n                    </div>\n                    <br><br>\n                </fieldset>\n                <fieldset>\n                    <legend>CARTES</legend>\n                    <div class=\"line-input\">\n                        ").concat(renderCardInput(customer, 'cce'), "\n                        ").concat(renderCardInput(customer, 'cm'), "\n                    </div>\n                </fieldset>\n                <input id=\"modif-submit-button\" type=\"submit\" value=\"Confirmer les modifications\">\n            </form>\n        ");
        if (infoCustomer) {
            infoCustomer.innerHTML = customerInfoHTML;
        }
        var modifSubmitButton = document.querySelector('form');
        if (modifSubmitButton) {
            modifSubmitButton.addEventListener("submit", function (event) {
                handleModifyCustomerFormSubmit(event);
            });
        }
        // Ajouter un écouteur d'événements pour les boutons d'ajout de carte
        var addCceButton = document.getElementById('add-cce-button');
        var addCmButton = document.getElementById('add-cm-button');
        if (addCceButton) {
            addCceButton.addEventListener('click', function () {
                // Générer une valeur aléatoire pour cce
                var randomValue = Math.random().toString(36).substring(7);
                customer.cce = randomValue;
                // Mettre à jour l'affichage des informations client
                showCustomerInfo(customer);
            });
        }
        if (addCmButton) {
            addCmButton.addEventListener('click', function () {
                // Générer une valeur aléatoire pour cm
                var randomValue = Math.random().toString(36).substring(7);
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
            return "\n                <div class=\"input-container\">\n                    <label for=\"".concat(cardType, "\">Carte ").concat(cardType.toUpperCase(), " :</label>\n                    <input type=\"text\" id=\"").concat(cardType, "\" name=\"").concat(cardType, "\" value=\"").concat(customer[cardType], "\" required><br><br>\n                </div>\n            ");
        }
        else {
            // Sinon, afficher uniquement le bouton pour ajouter la carte
            return "\n                <div class=\"input-container\">\n                    <button id=\"add-".concat(cardType, "-button\">Ajouter la carte ").concat(cardType.toUpperCase(), "</button>\n                </div>\n            ");
        }
    }
    // Fonction pour supprimer un employé de la liste et du tableau
    function removeCustomer(customerElement, customer) {
        // Retirer l'élément de la liste des employés
        var index = customersData.findIndex(function (emp) { return emp.id === customer.id; });
        if (index !== -1) {
            customersData.splice(index, 1);
            listCustomers === null || listCustomers === void 0 ? void 0 : listCustomers.removeChild(customerElement);
        }
    }
    // Fonction pour gérer la soumission du formulaire de modification d'employé
    function handleModifyCustomerFormSubmit(event) {
        var _a;
        event.preventDefault();
        var form = event.target;
        var customerId = parseInt(((_a = document.getElementById("customer_id")) === null || _a === void 0 ? void 0 : _a.textContent) || "");
        var nom = form.elements.namedItem("nom");
        var prenom = form.elements.namedItem("prenom");
        var tel = form.elements.namedItem("tel");
        var email = form.elements.namedItem("email");
        var adresse = form.elements.namedItem("adresse");
        var cce = form.elements.namedItem("cce");
        var cm = form.elements.namedItem("cm");
        // Mettez à jour les informations de l'employé dans la liste
        var updatedCustomer = customersData.find(function (customer) { return customer.id === customerId; });
        if (updatedCustomer) {
            updatedCustomer.nom = nom.value;
            updatedCustomer.prenom = prenom.value;
            updatedCustomer.tel = tel.value;
            updatedCustomer.email = email.value;
            updatedCustomer.adresse = adresse.value;
            updatedCustomer.cce = cce.value;
            updatedCustomer.cm = cm.value;
            // Mettez à jour l'affichage de l'employé dans la liste
            var customerElement = document.querySelector(".customer[data-id=\"".concat(customerId, "\"]"));
            if (customerElement) {
                var infoDiv = customerElement.querySelector('.customer-info');
                if (infoDiv) {
                    infoDiv.textContent = "".concat(updatedCustomer.nom, " ").concat(updatedCustomer.prenom, " ").concat(updatedCustomer.email, " ").concat(updatedCustomer.cce);
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
    var addCustomerButton = document.getElementById("add-customer-button");
    var infoCustomerSection = document.querySelector(".info-customer");
    if (addCustomerButton) {
        addCustomerButton.addEventListener("click", handleAddCustomerClick);
    }
    // Spécification du type de 'event' comme MouseEvent
    function handleAddCustomerClick(event, customer) {
        event.preventDefault();
        var newCustomer;
        if (!customer) {
            newCustomer = {
                id: customersData.length + 1, // Générez un nouvel identifiant unique
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
        var formHTML = "\n            <form action=\"#\" method=\"POST\">\n                <h2>Ajouter un client : \n                    <input id=\"add-client\" type=\"submit\" value=\"Confirmer l'ajout\">\n                </h2>\n                <fieldset>\n                    <legend>INFORMATIONS</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"nom\">Nom :</label>\n                            <input type=\"text\" id=\"nom\" name=\"nom\" required>\n                        </div>\n                    \n                        <div class=\"input-container\">\n                            <label for=\"prenom\">Pr\u00E9nom :</label>\n                            <input type=\"text\" id=\"prenom\" name=\"prenom\" required>\n                        </div>\n                    </div>\n                    \n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"tel\">Num\u00E9ro de t\u00E9l\u00E9phone :</label>\n                            <input type=\"tel\" id=\"tel\" name=\"tel\" required>\n                        </div>\n                    \n                        <div class=\"input-container\">\n                            <label for=\"email\">Adresse email :</label>\n                            <input type=\"email\" id=\"email\" name=\"email\" required>\n                        </div>\n                    </div>\n                    \n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"adresse\">Adresse :</label>\n                            <textarea id=\"adresse\" name=\"adresse\" rows=\"4\" required></textarea>\n                        </div>\n                    </div>\n                </fieldset>\n                <fieldset>\n                    <legend>CARTES</legend>\n                    <div class=\"line-input\">\n                        ".concat(renderCardInput(newCustomer, 'cce'), "\n                        ").concat(renderCardInput(newCustomer, 'cm'), "\n                    </div>\n                    \n                    <br><br>\n                </fieldset>\n            </form>\n        ");
        // Affichage du formulaire dans la section info-customer
        if (infoCustomerSection) {
            infoCustomerSection.innerHTML = formHTML;
        }
        // Récupération du bouton de soumission et attachement du gestionnaire d'événements
        var addSubmitButton = document.querySelector('form');
        if (addSubmitButton) {
            addSubmitButton.addEventListener("submit", function (event) {
                handleAddCustomerFormSubmit(event, newCustomer);
            });
        }
        // Récupération des boutons d'ajout de carte et ajout des écouteurs d'événements
        var addCceButton = document.getElementById('add-cce-button');
        var addCmButton = document.getElementById('add-cm-button');
        if (addCceButton) {
            addCceButton.addEventListener('click', function () {
                newCustomer.cce = Math.random().toString(36).substring(7);
                handleAddCustomerClick(event, newCustomer);
            });
        }
        if (addCmButton) {
            addCmButton.addEventListener('click', function () {
                newCustomer.cm = Math.random().toString(36).substring(7);
                handleAddCustomerClick(event, newCustomer);
            });
        }
    }
    function handleAddCustomerFormSubmit(event, customer) {
        event.preventDefault();
        var form = event.target;
        // Récupérez les valeurs du formulaire
        var nom = form.elements.namedItem("nom").value;
        var prenom = form.elements.namedItem("prenom").value;
        var tel = form.elements.namedItem("tel").value;
        var email = form.elements.namedItem("email").value;
        var adresse = form.elements.namedItem("adresse").value;
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
    var searchByNameInput = document.getElementById('search-by-name');
    var searchByIdInput = document.getElementById('search-by-id');
    // Ajouter des écouteurs d'événements pour les champs de recherche
    searchByNameInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            var searchText = searchByNameInput.value.trim().toLowerCase();
            if (searchText === '') {
                displayCustomers(customersData);
            }
            else {
                filterCustomersByName(searchText);
            }
        }
    });
    searchByIdInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            var searchId = parseInt(searchByIdInput.value.trim());
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
        var filteredCustomers = customersData.filter(function (customer) {
            var fullName = "".concat(customer.nom, " ").concat(customer.prenom).toLowerCase();
            return fullName.includes(name);
        });
        displayCustomers(filteredCustomers);
    }
    // Fonction pour filtrer les employés par ID
    function filterCustomersById(id) {
        var filteredCustomers = customersData.filter(function (customer) { return customer.id === id; });
        displayCustomers(filteredCustomers);
    }
    // Fonction pour afficher les employés
    function displayCustomers(customers) {
        var listCustomers = document.getElementById('list-customers');
        if (!listCustomers)
            return;
        // Effacer tout le contenu de list-customers
        listCustomers.innerHTML = '';
        // Réafficher les employés filtrés
        customers.forEach(function (customer) {
            var customerElement = createCustomerElement(customer);
            listCustomers.appendChild(customerElement);
        });
    }
    // Fonction pour vider le contenu de la section info-customer
    function clearInfoCustomer() {
        var infoCustomer = document.querySelector('.info-customer');
        if (infoCustomer) {
            infoCustomer.innerHTML = '';
        }
    }
    var cardsData = [
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
        var listCards = document.getElementById('list-customers');
        if (!listCards)
            return;
        // Efface tout le contenu de list-customers
        listCards.innerHTML = '';
        // Réaffiche toute la liste
        cardsData.forEach(function (card) {
            var cardElement = createCardElement(card);
            listCards.appendChild(cardElement);
        });
    }
    // Fonction pour créer un élément d'employé
    function createCardElement(card) {
        var cardDiv = document.createElement('div');
        cardDiv.classList.add('customer');
        // Informations de l'employé (à gauche)
        var infoDiv = document.createElement('div');
        infoDiv.classList.add('customer-info');
        cardDiv.appendChild(infoDiv);
        var img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000000\' stroke-width=\'1.25\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3\'/%3E%3Ccircle cx=\'12\' cy=\'10\' r=\'3\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3C/svg%3E');
        img.setAttribute('alt', 'Card Image');
        infoDiv.appendChild(img);
        var span = document.createElement('span');
        span.textContent = card.id + " " + card.idClient + " " + card.ptsMembre + card.credit;
        infoDiv.appendChild(span);
        // Boutons (à droite)
        var buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('customer-buttons');
        cardDiv.appendChild(buttonsDiv);
        var modifierButton = document.createElement('button');
        modifierButton.textContent = "Modifier la carte";
        modifierButton.addEventListener('click', function () {
            showCardInfo(card);
        });
        modifierButton.classList.add('customer-button');
        buttonsDiv.appendChild(modifierButton);
        var supprimerButton = document.createElement('button');
        supprimerButton.textContent = "Supprimer la carte";
        supprimerButton.addEventListener('click', function () {
            removeCard(cardDiv, card);
        });
        supprimerButton.classList.add('customer-button');
        buttonsDiv.appendChild(supprimerButton);
        return cardDiv;
    }
    // Fonction pour afficher les informations de la carte sélectionnée
    function showCardInfo(card) {
        var cardInfoHTML = "\n            <h2>Modification Informations de la Carte : <span id=\"card_id\">".concat(card.id, "</span></h2>\n            <form action=\"#\" method=\"POST\">\n                <fieldset>\n                    <legend>INFORMATIONS</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"type\">Type de carte :</label>\n                            <input type=\"text\" id=\"type\" name=\"type\" value=\"").concat(card.type, "\" readonly>\n                        </div>\n                    </div>\n        ");
        if (card.type === 'cce') {
            cardInfoHTML += "\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"credit\">Cr\u00E9dit :</label>\n                            <input type=\"text\" id=\"credit\" name=\"credit\" value=\"".concat(card.credit, "\" required>\n                        </div>\n                        <div class=\"input-container\">\n                            <label for=\"montantDernierCredit\">Montant du dernier cr\u00E9dit :</label>\n                            <input type=\"text\" id=\"montantDernierCredit\" name=\"montantDernierCredit\" value=\"").concat(card.montantDernierCredit, "\" required>\n                        </div>\n                    </div>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"dernierCredit\">Dernier cr\u00E9dit :</label>\n                            <input type=\"text\" id=\"dernierCredit\" name=\"dernierCredit\" value=\"").concat(card.dernierCredit, "\" required>\n                        </div>\n                    </div>\n            ");
        }
        else if (card.type === 'cm') {
            cardInfoHTML += "\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"ptsMembre\">Points Membre :</label>\n                            <input type=\"text\" id=\"ptsMembre\" name=\"ptsMembre\" value=\"".concat(card.ptsMembre, "\" required>\n                        </div>\n                    </div>\n            ");
        }
        cardInfoHTML += "\n                </fieldset>\n                <fieldset>\n                    <legend>CLIENT</legend>\n                    <div class=\"line-input\">\n                        <div class=\"input-container\">\n                            <label for=\"idClient\">Id du Client :</label>\n                            <input type=\"text\" id=\"idClient\" name=\"idClient\" value=\"".concat(card.idClient, "\">\n                        </div>\n                    </div>\n                </fieldset>\n                <input id=\"modif-submit-button\" type=\"submit\" value=\"Confirmer les modifications\">\n            </form>\n        ");
        if (infoCustomer) {
            infoCustomer.innerHTML = cardInfoHTML;
        }
        var modifSubmitButton = document.querySelector('form');
        if (modifSubmitButton) {
            modifSubmitButton.addEventListener("submit", function (event) {
                handleModifyCardFormSubmit(event);
            });
        }
    }
    // Fonction pour supprimer une carte de la liste et du tableau
    function removeCard(cardElement, card) {
        // Retirer l'élément de la liste des cartes
        var index = cardsData.findIndex(function (emp) { return emp.id === card.id; });
        if (index !== -1) {
            cardsData.splice(index, 1);
            listCustomers === null || listCustomers === void 0 ? void 0 : listCustomers.removeChild(cardElement);
        }
    }
    // Fonction pour gérer la soumission du formulaire de modification d'employé
    function handleModifyCardFormSubmit(event) {
        var _a;
        event.preventDefault();
        var form = event.target;
        var cardId = parseInt(((_a = document.getElementById("card_id")) === null || _a === void 0 ? void 0 : _a.textContent) || "");
        var type = form.elements.namedItem("type");
        var updatedCard;
        // Mettre à jour les informations de la carte dans la liste
        if (type.value === 'cce') {
            var credit = form.elements.namedItem("credit");
            var montantDernierCredit = form.elements.namedItem("montantDernierCredit");
            var dernierCredit = form.elements.namedItem("dernierCredit");
            updatedCard = cardsData.find(function (card) { return card.id === cardId; });
            if (updatedCard) {
                updatedCard.credit = parseFloat(credit.value);
                updatedCard.montantDernierCredit = parseFloat(montantDernierCredit.value);
                updatedCard.dernierCredit = dernierCredit.value;
            }
        }
        else if (type.value === 'cm') {
            var ptsMembre = form.elements.namedItem("ptsMembre");
            updatedCard = cardsData.find(function (card) { return card.id === cardId; });
            if (updatedCard) {
                updatedCard.ptsMembre = parseFloat(ptsMembre.value);
            }
        }
        var idClient = form.elements.namedItem("idClient");
        updatedCard = cardsData.find(function (card) { return card.id === cardId; });
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
    var addCardButton = document.getElementById("add-card-button");
    // Ajouter un écouteur d'événements au bouton d'ajout de carte
    if (addCardButton) {
        addCardButton.addEventListener("click", handleAddCardClick);
    }
    // Définir la fonction pour gérer le clic sur le bouton d'ajout de carte
    function handleAddCardClick(event, card) {
        event.preventDefault();
        // Générer une nouvelle carte avec des valeurs par défaut ou vides
        var newCard;
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
        var formHTML = "\n            <h2>Cr\u00E9er une carte</h2>\n            <form id=\"add-card-form\" action=\"#\" method=\"POST\">\n                <div class=\"line-input\">\n                    ".concat(newCard.id !== 0 ? "<input type=\"text\" id=\"card-id\" name=\"card-id\" value=\"".concat(newCard.id, "\" disabled>") : "<button id=\"generate-id-button\">Scanner une carte</button>", "\n                </div>\n                <div class=\"line-input\">\n                    <button id=\"create-member-card-button\" ").concat(newCard.id == 0 ? 'disabled' : '', ">Cr\u00E9er une carte membre</button>\n                    <button id=\"create-energy-credit-card-button\" ").concat(newCard.id == 0 ? 'disabled' : '', ">Cr\u00E9er une carte cr\u00E9dit \u00E9nergie</button>\n                </div>\n            </form>\n        ");
        // Afficher le formulaire dans la section info-customer
        if (infoCustomer) {
            infoCustomer.innerHTML = formHTML;
        }
        // Ajouter des écouteurs d'événements pour les boutons du formulaire
        var generateIdButton = document.getElementById('generate-id-button');
        var createMemberCardButton = document.getElementById('create-member-card-button');
        var createEnergyCreditCardButton = document.getElementById('create-energy-credit-card-button');
        if (generateIdButton) {
            generateIdButton.addEventListener('click', function () {
                // Générer un identifiant aléatoire pour la nouvelle carte
                var randomId = Math.floor(Math.random() * 1000000);
                newCard.id = randomId;
                newCard.type = "";
                // Afficher le formulaire pour le type de carte
                handleAddCardClick(event, newCard);
            });
        }
        if (createMemberCardButton) {
            createMemberCardButton.addEventListener('click', function () {
                newCard.type = "cm";
                var cardId = document.getElementById('card-id');
                newCard.id = parseFloat(cardId.value);
                cardsData.push(newCard);
                refreshCardList();
            });
        }
        if (createEnergyCreditCardButton) {
            createEnergyCreditCardButton.addEventListener('click', function () {
                newCard.type = "cce";
                var cardId = document.getElementById('card-id');
                newCard.id = parseFloat(cardId.value);
                cardsData.push(newCard);
                refreshCardList();
            });
        }
    }
    // Sélectionnez les boutons par leur ID
    var customerButton = document.getElementById("customer-button");
    var cardButton = document.getElementById("card-button");
    // Ajoutez des écouteurs d'événements pour chaque bouton
    if (customerButton) {
        customerButton.addEventListener("click", function () {
            clearInfoCustomer();
            refreshCustomerList();
        });
    }
    if (cardButton) {
        cardButton.addEventListener("click", function () {
            clearInfoCustomer();
            refreshCardList();
        });
    }
    refreshCustomerList();
});
