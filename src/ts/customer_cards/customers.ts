// Interface pour définir la structure des clients
interface Customer {
    id: number;
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    adresse: string;
    cce: number; //Carte Crédit Energie
    cm: number;  //Carte Membre
}

// Interface pour définir la structure des cartes
interface Card {
    id: number;

    type: string; // 'cce' ou 'cm'

    ptsMembre: number;

    credit: number;
    dernierCredit: string;
    montantDernierCredit: number;

    idClient: number; // Identifiant du client
}

// Liste contenant tous les clients
let customersData: Customer[] = [];
let cardsData: Card[] = [];

document.addEventListener("DOMContentLoaded", () => {
    const listCustomers = document.querySelector('.list-customers');
    const infoCustomer = document.querySelector('.info-customer');

    getCustomersFromServer();
    refreshCustomerList();



    //////////////////////////// CLIENTS ////////////////////////////



    /*************** REQUETES SERVEURS ***************/


    //Récupérer les clients
    async function getCustomersFromServer() {
        try {
            const response = await fetch('/voirClients');
            const clientsFromServer = await response.json();

            // Vide la liste avant de la repeupler
            customersData.length = 0;

            // Repeuple customersData avec les résultats
            for (const client of clientsFromServer) {
                try {
                    const contact = client?.personne?.partenaire?.contact;
                    const tel = contact?.tel ?? '';
                    const email = contact?.courriel ?? '';
                    const adresse = contact?.adresse ?? '';
                    const codePostal = contact?.codePostal ?? '';
                    const pays = contact?.pays ?? '';
                    const cce = 0; 
                    const cm = 0;

                    customersData.push({
                        id: client.id,
                        nom: client.personne?.nom ?? '',
                        prenom: client.personne?.prenom ?? '',
                        tel: tel,
                        email: email,
                        adresse: `${adresse}, ${codePostal}, ${pays}`,
                        cce: cce,
                        cm: cm
                    });
                } catch (error) {
                    console.error(`Error fetching details for client with ID ${client.id}:`, error);
                }
            }

            // Rafraîchir la liste des clients
            refreshCustomerList();
        } catch (error) {
            console.error('Error fetching clients data:', error);
        }
    }

    //Créer un client
    async function addCustomerInServer(customer: Customer) {
        let parties = customer.adresse.split(', ');
        try {
            const response = await fetch('/creerClient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: customer.id, nom: customer.nom, prenom: customer.prenom, id_partenaire: customer.id, courriel:customer.email, tel:customer.tel,adresse: parties[0], codePostal: parties[1], pays: parties[2]})
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
    
    //Supprimer un client
    async function removeCustomer(employeeElement: HTMLDivElement, customer: Customer): Promise<void> {
        try {
            const response = await fetch(`/supprimerClient/${customer.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Retirer l'élément de la liste des clients
                const index = customersData.findIndex(cust => cust.id === customer.id);
                if (index !== -1) {
                    customersData.splice(index, 1);
                    listCustomers?.removeChild(employeeElement);
                    
                }
                console.log('Customer deleted successfully');
            } else {
                console.error('Failed to delete customer:', response.status);
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    }


    /*************** AFFICHAGES SUR LA PARTIE "list-customers" ***************/


    // Fonction pour supprimer et réafficher la liste des clients
    function refreshCustomerList() {
        const listCustomers = document.getElementById('list-customers');
        if (!listCustomers) return;
    
        // Efface tout le contenu de list-customers
        listCustomers.innerHTML = '';
    
        // Réaffiche toute la liste
        customersData.forEach(customer => {
            const customerElement = createCustomerElement(customer);
            listCustomers.appendChild(customerElement);
        });
    }
    
    // Fonction pour afficher les clients
    function displayCustomers(customers: Customer[]) {
        const listCustomers = document.getElementById('list-customers');
        if (!listCustomers) return;

        // Effacer tout le contenu de list-customers
        listCustomers.innerHTML = '';

        // Réafficher les clients filtrés
        customers.forEach(customer => {
            const customerElement = createCustomerElement(customer);
            listCustomers.appendChild(customerElement);
        });
    }

    // Fonction pour créer un élément d'un client
    function createCustomerElement(customer: Customer): HTMLDivElement {
        const customerDiv = document.createElement('div');
        customerDiv.classList.add('customer');
    
        // Informations du client (à gauche)
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

    // Fonction pour vider le contenu de la section info-customer
    function clearInfoCustomer() {
        const infoCustomer = document.querySelector('.info-customer');
        if (infoCustomer) {
            infoCustomer.innerHTML = '';
        }
    }


    /*************** AFFICHAGES SUR LA PARTIE "info-customers" ***************/


    // Fonction pour afficher les informations du client sélectionné
    function showCustomerInfo(customer: Customer) {
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
                const availableCceId = getAvailableCardId('cce');
                if (availableCceId !== undefined) {
                    customer.cce = availableCceId;
                
                    // Trouver la carte correspondant à l'ID disponible
                    const cceCard = cardsData.find(card => card.id === availableCceId);
                    if (cceCard) {
                        cceCard.idClient = customer.id;
                    } else {
                        console.error("La carte de crédit énergie correspondante n'a pas été trouvée.");
                    }
                
                    // Mettre à jour l'affichage des informations client
                    showCustomerInfo(customer);
                } else {
                    // Aucune carte de crédit énergie disponible
                    console.error('Aucune carte de crédit énergie disponible.');
                }
                
                // Mettre à jour l'affichage des informations client
                showCustomerInfo(customer);
            });
        }
    
        if (addCmButton) {
            addCmButton.addEventListener('click', () => {
                // Générer une valeur aléatoire pour cm
                const availableCmId = getAvailableCardId('cm');
                if (availableCmId !== undefined) {
                    customer.cm = availableCmId;

                    // Trouver la carte correspondant à l'ID disponible
                    const cmCard = cardsData.find(card => card.id === availableCmId);
                    if (cmCard) {
                        cmCard.idClient = customer.id;
                    } else {
                        console.error("La carte CM correspondante n'a pas été trouvée.");
                    }

                    // Mettre à jour l'affichage des informations client
                    showCustomerInfo(customer);
                } else {
                    // Aucune carte CM disponible
                    console.error('Aucune carte CM disponible.');
                }

                // Mettre à jour l'affichage des informations client
                showCustomerInfo(customer);
            });
        }

        
    }

    /// Fonction pour afficher le champ de saisie de la carte ou le bouton d'ajout
    function renderCardInput(customer: Customer, cardType: 'cce' | 'cm'): string {
        // Si le client a déjà une carte de ce type, afficher la valeur dans un champ de texte
        if (customer[cardType]) {
            return `
                <div class="input-container">
                    <label for="${cardType}">Carte ${cardType.toUpperCase()} :</label>
                    <input type="text" id="${cardType}" name="${cardType}" value="${customer[cardType]}" required><br><br>
                </div>
            `;
        } else {
            // Sinon, afficher uniquement le bouton pour ajouter la carte
            return `
                <div class="input-container">
                    <button id="add-${cardType}-button">Ajouter la carte ${cardType.toUpperCase()}</button>
                </div>
            `;
        }
    }
    
    // Fonction pour récupérer le premier ID de carte disponible pour un type spécifique ('cce' ou 'cm')
    function getAvailableCardId(cardType: string): number | undefined {
        // Rechercher la première carte disponible qui n'est pas déjà attribuée à un client
        for (const card of cardsData) {
            if (card.type === cardType && !card.idClient) {
                // Vérifier si la carte n'est pas déjà attribuée à un client dans customersData
                const isCardAssigned = customersData.some(customer => {
                    return customer.cce === card.id || customer.cm === card.id;
                });
                if (!isCardAssigned) {
                    return card.id;
                }
            }
        }
        
        return undefined;
    }

    // Fonction pour gérer la soumission du formulaire de modification d'un client
    function handleModifyCustomerFormSubmit(event: Event) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        const customerId = parseInt(document.getElementById("customer_id")?.textContent || "");
        const nom = form.elements.namedItem("nom") as HTMLInputElement;
        const prenom = form.elements.namedItem("prenom") as HTMLInputElement;
        const tel = form.elements.namedItem("tel") as HTMLInputElement;
        const email = form.elements.namedItem("email") as HTMLInputElement;
        const adresse = form.elements.namedItem("adresse") as HTMLTextAreaElement;
        const cce = form.elements.namedItem("cce") as HTMLInputElement;
        const cm = form.elements.namedItem("cm") as HTMLInputElement;

        // Mettez à jour les informations du client dans la liste
        const updatedCustomer = customersData.find(customer => customer.id === customerId);
        if (updatedCustomer) {
            updatedCustomer.nom = nom.value;
            updatedCustomer.prenom = prenom.value;
            updatedCustomer.tel = tel.value;
            updatedCustomer.email = email.value;
            updatedCustomer.adresse = adresse.value;
            updatedCustomer.cce = parseInt(cce.value);
            updatedCustomer.cm = parseInt(cm.value);

            // Mettez à jour l'affichage du client dans la liste
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

        // Rafraîchir la liste des clients
        refreshCustomerList();
    }


    /*************** AJOUT D'UN NOUVEAU CLIENT ***************/


    const addCustomerButton = document.getElementById("add-customer-button");

    if(addCustomerButton) {
        addCustomerButton.addEventListener("click", handleAddCustomerClick);
    }

    // Spécification du type de 'event' comme MouseEvent
    function handleAddCustomerClick(event: MouseEvent, customer?: Customer) {
        event.preventDefault();

        let newCustomer: Customer;

        if (!customer) {
            newCustomer = {
                id: customersData.length + 1, // Générez un nouvel identifiant unique
                nom: "",
                prenom: "",
                tel: "",
                email: "",
                adresse: "",
                cce: 0,
                cm: 0
            };
        } else {
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
        if (infoCustomer) {
            infoCustomer.innerHTML = formHTML;
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
                // Générer une valeur aléatoire pour cce
                const availableCceId = getAvailableCardId('cce');
                if (availableCceId !== undefined) {
                    newCustomer.cce = availableCceId;
                } else {
                    // Aucune carte de crédit énergie disponible
                    console.error('Aucune carte de crédit énergie disponible.');
                }
                handleAddCustomerClick(event, newCustomer);
            });
        }
        if (addCmButton) {
            addCmButton.addEventListener('click', () => {
                const availableCMId = getAvailableCardId('cm');
                if (availableCMId !== undefined) {
                    newCustomer.cm = availableCMId;
                } else {
                    // Aucune carte de crédit énergie disponible
                    console.error('Aucune carte de crédit énergie disponible.');
                }
                handleAddCustomerClick(event, newCustomer);
            });
        }
    }

    // Modifier la fonction handleAddCustomerFormSubmit
    async function handleAddCustomerFormSubmit(event: Event, customer: Customer) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        // Récupérer les valeurs du formulaire
        const nom = (form.elements.namedItem("nom") as HTMLInputElement).value;
        const prenom = (form.elements.namedItem("prenom") as HTMLInputElement).value;
        const tel = (form.elements.namedItem("tel") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const adresse = (form.elements.namedItem("adresse") as HTMLTextAreaElement).value;

        // Assigner les valeurs au client
        customer.nom = nom;
        customer.prenom = prenom;
        customer.tel = tel;
        customer.email = email;
        customer.adresse = adresse;

        try {
            // Appeler la fonction pour envoyer les données du client au serveur
            await addCustomerInServer(customer);

            // Ajouter le nouveau client à la liste des clients seulement après l'ajout réussi dans la base de données
            customersData.push(customer);

            // Rafraîchir la liste des clients
            refreshCustomerList();

            // Effacer le contenu de la section info-customer
            if (infoCustomer) {
                infoCustomer.innerHTML = '';
            }
        } catch (error) {
            console.error('Une erreur est survenue : ', error);
        }
    }
    
    
    /*************** FILTRE ET RECHERCHE DANS LA LISTE ***************/

    
    // Récupérer les éléments de recherche par nom et par ID
    const searchByNameInput = document.getElementById('search-by-name') as HTMLInputElement;
    const searchByIdInput = document.getElementById('search-by-id') as HTMLInputElement;

    // Ajouter des écouteurs d'événements pour les champs de recherche
    searchByNameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchText = searchByNameInput.value.trim().toLowerCase();
            if (searchText === '') {
                displayCustomers(customersData);
            } else {
                filterCustomersByName(searchText);
            }
        }
    });

    searchByIdInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchId = parseInt(searchByIdInput.value.trim());
            if (!isNaN(searchId)) {
                filterCustomersById(searchId);
            } else {
                displayCustomers(customersData);
            }
        }
    });

    // Fonction pour filtrer les clients par nom
    function filterCustomersByName(name: string) {
        const filteredCustomers = customersData.filter(customer => {
            const fullName = `${customer.nom} ${customer.prenom}`.toLowerCase();
            return fullName.includes(name);
        });
        displayCustomers(filteredCustomers);
    }
    // Fonction pour filtrer les clients par ID
    function filterCustomersById(id: number) {
        const filteredCustomers = customersData.filter(customer => customer.id === id);
        displayCustomers(filteredCustomers);
    }



    //////////////////////////// CARTES ////////////////////////////



    cardsData = [
        { id: 1, type: "cce", ptsMembre: 1, credit: 11, dernierCredit: "01/04/2024", montantDernierCredit: 10, idClient: 0},
        { id: 2, type: "cm", ptsMembre: 2, credit: 22, dernierCredit: "02/04/2024", montantDernierCredit: 20, idClient: 0},
        { id: 3, type: "cce", ptsMembre: 3, credit: 33, dernierCredit: "03/04/2024", montantDernierCredit: 30, idClient: 0},
        { id: 4, type: "cm", ptsMembre: 4, credit: 44, dernierCredit: "04/04/2024", montantDernierCredit: 40, idClient: 0},
        { id: 5, type: "cce", ptsMembre: 5, credit: 55, dernierCredit: "05/04/2024", montantDernierCredit: 50, idClient: 0},
        { id: 6, type: "cm", ptsMembre: 6, credit: 66, dernierCredit: "06/04/2024", montantDernierCredit: 60, idClient: 0},
        { id: 7, type: "cce", ptsMembre: 7, credit: 77, dernierCredit: "07/04/2024", montantDernierCredit: 70, idClient: 0},
    ];


    /*************** AFFICHAGES SUR LA PARTIE "list-customers" ***************/


    // Fonction pour supprimer et réafficher la liste des cartes
    function refreshCardList() {
        const listCards = document.getElementById('list-customers');
        if (!listCards) return;

        // Efface tout le contenu de list-customers
        listCards.innerHTML = '';

        // Réaffiche toute la liste
        cardsData.forEach(card => {
            const cardElement = createCardElement(card);
            listCards.appendChild(cardElement);
        });
    }

    // Fonction pour créer un élément d'une carte
    function createCardElement(card: Card): HTMLDivElement {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('customer');

        // Informations du client (à gauche)
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('customer-info');
        cardDiv.appendChild(infoDiv);

        const img = document.createElement('img');
        img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23000000\' stroke-width=\'1.25\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3\'/%3E%3Ccircle cx=\'12\' cy=\'10\' r=\'3\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'10\'/%3E%3C/svg%3E');
        img.setAttribute('alt', 'Card Image');
        infoDiv.appendChild(img);

        const span = document.createElement('span');
        span.textContent = card.id + " " + card.type + " " + card.idClient + " " + card.ptsMembre + card.credit;
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


    /*************** AFFICHAGES SUR LA PARTIE "info-customers" ***************/


    // Fonction pour afficher les informations de la carte sélectionnée
    function showCardInfo(card: Card) {
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
        } else if (card.type === 'cm') {
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
    function removeCard(cardElement: HTMLDivElement, card: Card) {
        // Retirer l'élément de la liste des cartes
        const index = cardsData.findIndex(emp => emp.id === card.id);
        if (index !== -1) {
            cardsData.splice(index, 1);
            listCustomers?.removeChild(cardElement);

            // Effectuer la requête DELETE
            /*
            fetch(`/supprimerCarte/${card.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Une erreur est survenue lors de la suppression de la carte');
                }
                // Supprimer l'élément du tableau
                cardsData.splice(index, 1);
                // Supprimer l'élément de l'interface utilisateur
                listCustomers?.removeChild(cardElement);
                return response.json();
            })
            .then(data => {
                console.log(data); // Afficher la réponse de l'API (optionnel)
            })
            .catch(error => {
                console.error(error); // Gérer les erreurs de la requête (optionnel)
            });*/
        }
            
    }

    // Fonction pour gérer la soumission du formulaire de modification d'une carte
    function handleModifyCardFormSubmit(event: Event) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
    
        const cardId = parseInt(document.getElementById("card_id")?.textContent || "");
        const type = form.elements.namedItem("type") as HTMLInputElement;
        let updatedCard: Card | undefined;
    
        // Mettre à jour les informations de la carte dans la liste
        if (type.value === 'cce') {
            const credit = form.elements.namedItem("credit") as HTMLInputElement;
            const montantDernierCredit = form.elements.namedItem("montantDernierCredit") as HTMLInputElement;
            const dernierCredit = form.elements.namedItem("dernierCredit") as HTMLInputElement;
    
            updatedCard = cardsData.find(card => card.id === cardId);
            if (updatedCard) {
                updatedCard.credit = parseFloat(credit.value);
                updatedCard.montantDernierCredit = parseFloat(montantDernierCredit.value);
                updatedCard.dernierCredit = dernierCredit.value;
            }
        } else if (type.value === 'cm') {
            const ptsMembre = form.elements.namedItem("ptsMembre") as HTMLInputElement;
    
            updatedCard = cardsData.find(card => card.id === cardId);
            if (updatedCard) {
                updatedCard.ptsMembre = parseFloat(ptsMembre.value);
            }
        }

        const idClient = form.elements.namedItem("idClient") as HTMLInputElement;
        updatedCard = cardsData.find(card => card.id === cardId);
        if (updatedCard && idClient.value) {
            updatedCard.idClient = parseInt(idClient.value);
        }

        // Effacez le contenu de la section info-customer
        if (infoCustomer) {
            infoCustomer.innerHTML = '';
        }
    
        // Rafraîchir la liste des cartes
        refreshCardList();
    }

    /*************** AJOUT D'UNE NOUVELLE CARTE ***************/

    // Récupérer le bouton d'ajout de carte
    const addCardButton = document.getElementById("add-card-button");

    // Ajouter un écouteur d'événements au bouton d'ajout de carte
    if (addCardButton) {
        addCardButton.addEventListener("click", handleAddCardClick);
    }

    // Définir la fonction pour gérer le clic sur le bouton d'ajout de carte
    function handleAddCardClick(event: Event, card?: Card) {
        event.preventDefault();

        // Générer une nouvelle carte avec des valeurs par défaut ou vides
        let newCard: Card;

        if (!card) {
            newCard = {
                id: 0, 
                type: "", 
                ptsMembre: 0, 
                credit: 0,
                dernierCredit: "", 
                montantDernierCredit: 0, 
                idClient: 0
            };
        } else {
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
            createMemberCardButton.addEventListener('click', function (event) {
                event.preventDefault();
                newCard.type = "cm";

                const cardId = document.getElementById('card-id') as HTMLInputElement;
                newCard.id = parseFloat(cardId.value);

                cardsData.push(newCard);
                clearInfoCustomer();
                refreshCardList();

            });
        }

        if (createEnergyCreditCardButton) {
            createEnergyCreditCardButton.addEventListener('click', function (event) {
                event.preventDefault();
                newCard.type = "cce";

                const cardId = document.getElementById('card-id') as HTMLInputElement;
                newCard.id = parseFloat(cardId.value);
                
                cardsData.push(newCard);
                clearInfoCustomer();
                refreshCardList();
            });
        }
    }



    //////////////////////////// CARTES ////////////////////////////



    // Sélectionnez les boutons par leur ID
    const customerButton = document.getElementById("customer-button");
    const cardButton = document.getElementById("card-button");

    // Ajoutez des écouteurs d'événements pour chaque bouton
    //Afficher la liste des clients
    if (customerButton) {
        customerButton.addEventListener("click", () => {
            clearInfoCustomer()
            refreshCustomerList();
        });
    }
    //Afficher la liste des cartes
    if (cardButton) {
        cardButton.addEventListener("click", () => {
            clearInfoCustomer()
            refreshCardList();
        });
    }

});