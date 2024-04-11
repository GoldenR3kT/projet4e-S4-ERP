"use strict";
//On récupère les éléments du DOM
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e;
const productSearched = document.getElementById('search-product-scrollable');
const productList = document.getElementById('products-list-scrollable');
const pumpScrollable = document.getElementById('pumps-station-scrollable');
const searchInput = document.getElementById('search-product-input');
const total = document.getElementById('price-total');
const buttonValidate = document.getElementById('validate');
//On initialise les tableaux pour les produits, les quantités et les moyens de paiement
let tabProduits = [];
let tabQuantites = [];
let tabMoyenDePaiement = [];
//On ajoute un écouteur d'événement sur l'input de recherche
searchInput.addEventListener('input', searchProducts);
//On ajoute un écouteur d'événement sur le bouton pour rediriger vers la page de gestion des cartes du client
(_a = document.getElementById('member-card-client-add')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    window.location.href = '/customer_cards';
});
(_b = document.getElementById('cce-card-client-add')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    window.location.href = '/customer_cards';
});
(_c = document.querySelector('#member-card-client-search')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', getMemberCard);
(_d = document.querySelector('#cce-card-client-search')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', getCardCCE);
//fonction pour rechercher les produits
function searchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const searchInputValue = searchInput.value.trim().toLowerCase();
        try {
            // Récupérer les produits
            const response = yield fetch(`/voirArticles`);
            const produits = yield response.json();
            if (productSearched) {
                productSearched.innerHTML = '';
                let totalPrice = 0;
                const filteredProduits = produits.filter((produit) => produit.nom.toLowerCase().includes(searchInputValue));
                if (filteredProduits.length === 0) {
                    // Afficher un message si aucun produit n'est trouvé
                    const noResultsMessage = document.createElement('p');
                    noResultsMessage.textContent = 'Aucun produit trouvé.';
                    productSearched.appendChild(noResultsMessage);
                }
                else {
                    // Afficher les produits trouvés
                    filteredProduits.forEach((produit) => {
                        // Créer les éléments du DOM pour chaque produit
                        const productDiv = document.createElement('div');
                        const buttonAdd = document.createElement('button');
                        const divNamePrice = document.createElement('div');
                        const productName = document.createElement('p');
                        const productPrice = document.createElement('p');
                        productName.textContent = produit.nom;
                        productPrice.textContent = produit.prixTTC + ' €';
                        productDiv.textContent = produit.nom;
                        buttonAdd.textContent = 'Ajouter';
                        divNamePrice.className = 'div-namePrice';
                        productDiv.className = 'product-div';
                        buttonAdd.className = 'add-product-button';
                        // Ajouter un écouteur d'événement sur le bouton d'ajout qui permet d'ajouter le produit à la liste des produits
                        buttonAdd.addEventListener('click', () => {
                            var _a, _b, _c, _d;
                            const productToAdd = divNamePrice.cloneNode(true);
                            disableAllCheckboxes();
                            // Gère le cas où le produit est un carburant
                            if (((_a = productName.textContent) === null || _a === void 0 ? void 0 : _a.includes("Diesel")) || ((_b = productName.textContent) === null || _b === void 0 ? void 0 : _b.includes("Sans Plomb")) || ((_c = productName.textContent) === null || _c === void 0 ? void 0 : _c.includes("Electricite")) || ((_d = productName.textContent) === null || _d === void 0 ? void 0 : _d.includes("Gaz"))) {
                                let toAskQEnergy = document.getElementById('toast-energy-quantity');
                                toAskQEnergy.style.display = 'block';
                                toAskQEnergy.style.zIndex = '1000';
                                let pumpOkClickHandler;
                                let pumpOk = document.getElementById('toask-energy-button');
                                pumpOkClickHandler = () => __awaiter(this, void 0, void 0, function* () {
                                    let energyInput = document.getElementById("quantity-energy");
                                    tabProduits.push(produit.id);
                                    tabQuantites.push(energyInput.value);
                                    toAskQEnergy.style.display = 'none';
                                    toAskQEnergy.style.zIndex = '0';
                                    console.log(energyInput.value);
                                    let modifiedProductName = document.createElement('p');
                                    modifiedProductName.textContent = productName.textContent + " X " + energyInput.value;
                                    let newProductToAdd = document.createElement('div').cloneNode(true);
                                    newProductToAdd.className = 'product-div';
                                    newProductToAdd.appendChild(modifiedProductName);
                                    newProductToAdd.appendChild(productPrice);
                                    totalPrice += produit.prixTTC * parseInt(energyInput.value);
                                    total.textContent = totalPrice + ' €';
                                    productList === null || productList === void 0 ? void 0 : productList.appendChild(newProductToAdd);
                                    if (pumpOkClickHandler) {
                                        pumpOk.removeEventListener('click', pumpOkClickHandler);
                                    }
                                });
                                pumpOk.addEventListener('click', pumpOkClickHandler);
                                const pumpCancel = document.getElementById('toask-energy-cancel');
                                pumpCancel.addEventListener('click', () => {
                                    toAskQEnergy.style.display = 'none';
                                    toAskQEnergy.style.zIndex = '0';
                                });
                            }
                            else {
                                // Ajouter le produit à la liste des produits et mettre à jour le prix total
                                totalPrice += produit.prixTTC;
                                total.textContent = totalPrice + ' €';
                                tabProduits.push(produit.id);
                                tabQuantites.push(1);
                                const newProductToAdd = document.createElement('div').cloneNode(true);
                                const productNameClone = productName.cloneNode(true);
                                const productPriceClone = productPrice.cloneNode(true);
                                newProductToAdd.className = 'product-div';
                                newProductToAdd.appendChild(productNameClone);
                                newProductToAdd.appendChild(productPriceClone);
                                productList === null || productList === void 0 ? void 0 : productList.appendChild(newProductToAdd);
                            }
                        });
                        productDiv.appendChild(buttonAdd);
                        productSearched.appendChild(productDiv);
                    });
                }
            }
            else {
                console.error('Element with ID "search-product-scrollable" not found.');
            }
        }
        catch (error) {
            console.error('Une erreur est survenue lors de la récupération des produits:', error);
        }
    });
}
// Fonction pour désactiver tous les checkboxes
function disableAllCheckboxes() {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        if (checkbox instanceof HTMLInputElement) {
            checkbox.disabled = false;
        }
    });
}
// Ajouter un écouteur d'événement sur chaque checkbox pour gérer la sélection des moyens de paiement
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    if (checkbox instanceof HTMLInputElement) {
        checkbox.addEventListener('change', () => {
            var _a, _b;
            const associatedInput = document.getElementById(checkbox.id + '-input');
            const associatedLabel = checkbox.previousElementSibling;
            if (associatedInput instanceof HTMLInputElement && associatedLabel instanceof HTMLLabelElement) {
                associatedInput.style.backgroundColor = checkbox.checked ? '#0FD274' : '#f1e3a4';
                associatedInput.disabled = !checkbox.checked;
                if (checkbox.checked) {
                    (_a = checkbox.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('checked');
                    buttonValidate.disabled = false;
                    associatedInput.disabled = false;
                    // Ajouter au tableau tabmoyendepaiement selon le type de paiement
                    if (associatedLabel.textContent === 'CB') {
                        tabMoyenDePaiement.push(1);
                    }
                    else if (associatedLabel.textContent === 'CCE') {
                        tabMoyenDePaiement.push(2);
                    }
                    else if (associatedLabel.textContent === 'Espèces') {
                        tabMoyenDePaiement.push(3);
                    }
                }
                else {
                    (_b = checkbox.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('checked');
                    buttonValidate.disabled = true;
                    if (associatedLabel.textContent === 'CB') {
                        tabMoyenDePaiement = tabMoyenDePaiement.filter(item => item !== 1);
                    }
                    else if (associatedLabel.textContent === 'CCE') {
                        tabMoyenDePaiement = tabMoyenDePaiement.filter(item => item !== 2);
                    }
                    else if (associatedLabel.textContent === 'Espèces') {
                        tabMoyenDePaiement = tabMoyenDePaiement.filter(item => item !== 3);
                    }
                }
            }
        });
    }
});
// Fonction pour récupérer les informations d'un membre
function getMemberCard() {
    return __awaiter(this, void 0, void 0, function* () {
        const memberIdInput = document.getElementById('id-member');
        const memberId = memberIdInput.value;
        try {
            const response = yield fetch(`/getMemberCard`);
            const allCards = yield response.json();
            console.log(allCards);
            const member = allCards.find((m) => m.num === parseInt(memberId));
            if (member) {
                const memberIdParagraph = document.getElementById('member-card-client-id');
                const memberPointsParagraph = document.getElementById('member-card-client-points');
                memberIdParagraph.textContent = 'Client : ' + member.num;
                memberPointsParagraph.textContent = 'Points de fidélité : ' + member.ptsMembre;
            }
            else {
                const memberIdParagraph = document.getElementById('member-card-client-id');
                const memberPointsParagraph = document.getElementById('member-card-client-points');
                memberIdParagraph.textContent = 'Aucun membre trouvé avec l\'ID ' + memberId;
                memberPointsParagraph.textContent = '';
            }
        }
        catch (error) {
            console.error('Une erreur est survenue lors de la récupération des membres:', error);
        }
    });
}
// Fonction pour récupérer les informations d'une carte CCE
function getCardCCE() {
    return __awaiter(this, void 0, void 0, function* () {
        const cceIdInput = document.getElementById('id-cce');
        const cceId = cceIdInput.value;
        try {
            const response = yield fetch(`/getCardCCE`);
            const allCards = yield response.json();
            const member = allCards.find((m) => m.num === parseInt(cceId));
            if (member) {
                const cceIdParagraph = document.getElementById('energy-card-id-answer');
                const ccePointsParagraph = document.getElementById('amount-cce-answer');
                cceIdParagraph.textContent = member.num;
                ccePointsParagraph.textContent = member.credit;
            }
            else {
                const cceIdParagraph = document.getElementById('member-card-client-id');
                const ccePointsParagraph = document.getElementById('member-card-client-points');
                cceIdParagraph.textContent = 'Aucun membre trouvé avec l\'ID ' + cceId;
                ccePointsParagraph.textContent = '';
            }
        }
        catch (error) {
            console.error('Une erreur est survenue lors de la récupération des membres:', error);
        }
    });
}
// Fonction pour récupérer les Articles
function getArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/voirArticles`);
            return yield response.json();
        }
        catch (error) {
            console.error('Une erreur est survenue lors de la récupération des articles:', error);
            return [];
        }
    });
}
// Fonction pour récupérer les Energies
function getEnergies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/voirEnergies`);
            return yield response.json();
        }
        catch (error) {
            console.error('Une erreur est survenue lors de la récupération des énergies:', error);
            return [];
        }
    });
}
// Fonction pour récupérer les Pompes
function getPumps() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/getPump`);
            return yield response.json();
        }
        catch (error) {
            console.error('Une erreur est survenue lors de la récupération des pompes:', error);
            return [];
        }
    });
}
// Fonction pour afficher les pompes
function displayPumps() {
    return __awaiter(this, void 0, void 0, function* () {
        const articles = yield getArticles();
        const energies = yield getEnergies();
        const pumps = yield getPumps();
        // Afficher les pompes
        if (pumpScrollable) {
            for (const pump of pumps) {
                const pumpDiv = document.createElement('div');
                const pumpName = document.createElement('div');
                const pumpEnergy = document.createElement('p');
                const pumpQuantity = document.createElement('p');
                const pumpStatut = document.createElement('p');
                const energy = energies.find((energy) => energy.id === pump.id);
                const article = articles.find((article) => article.id === pump.id);
                if (article && energy) {
                    pumpName.textContent = "POMPE N°" + pump.id;
                    pumpName.className = 'pump-name';
                    pumpEnergy.textContent = article.nom;
                    pumpQuantity.textContent = 'Quantite dispo : ' + article.quantite + '/' + pump.stockage_max + energy.unite;
                    // Gérer le cas où la quantité est nulle
                    if (article.quantite === 0) {
                        pumpStatut.textContent = 'Statut : Indisponible';
                        pumpDiv.style.backgroundColor = 'red';
                        pumpName.style.backgroundColor = 'red';
                        const updateState = () => __awaiter(this, void 0, void 0, function* () {
                            try {
                                const response = yield fetch('/changerEtatPompe', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        idPompe: pump.id,
                                        etat: 'Indisponible'
                                    })
                                });
                                const data = yield response.json();
                                console.log(data.message);
                            }
                            catch (error) {
                                console.error('Une erreur est survenue lors de la mise à jour de l\'état de la pompe:', error);
                            }
                        });
                        yield updateState();
                    }
                    else {
                        pumpStatut.textContent = 'Statut : ' + pump.statut;
                    }
                    pumpDiv.appendChild(pumpName);
                    pumpDiv.appendChild(pumpEnergy);
                    pumpDiv.appendChild(pumpQuantity);
                    pumpDiv.appendChild(pumpStatut);
                    pumpDiv.className = 'pump-div';
                    // Ajouter un écouteur d'événement sur la pompe pour changer son état et la dévérouiller pour le client
                    pumpDiv.addEventListener('click', () => {
                        document.querySelectorAll('.pump-div').forEach((element) => {
                            element.classList.remove('selected');
                        });
                        document.querySelectorAll('.pump-name').forEach((element) => {
                            element.classList.remove('selected');
                        });
                        pumpDiv.classList.add('selected');
                        pumpName.classList.add('selected');
                        const toAskPump = document.getElementById('toask-pump');
                        toAskPump.style.display = 'block';
                        toAskPump.style.zIndex = '1000';
                        const pumpOk = document.getElementById('toask-pump-button');
                        pumpOk.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                            try {
                                let newEtat;
                                if (pump.statut === 'Prêt à l\'emploi') {
                                    newEtat = 'En cours d util.';
                                }
                                else {
                                    newEtat = 'Prêt à l\'emploi';
                                }
                                const response = yield fetch('/changerEtatPompe', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        idPompe: pump.id,
                                        etat: newEtat
                                    })
                                });
                                const data = yield response.json();
                                console.log(data.message);
                                toAskPump.style.display = 'none';
                                toAskPump.style.zIndex = '0';
                                pump.statut = newEtat;
                                pumpStatut.textContent = 'Statut : ' + pump.statut;
                                pumpDiv.classList.remove('selected');
                                pumpName.classList.remove('selected');
                            }
                            catch (error) {
                                console.error('Une erreur est survenue:', error);
                            }
                        }));
                        const pumpCancel = document.getElementById('toask-pump-cancel');
                        pumpCancel.addEventListener('click', () => {
                            toAskPump.style.display = 'none';
                            toAskPump.style.zIndex = '0';
                            pumpDiv.classList.remove('selected');
                        });
                    });
                    pumpScrollable.appendChild(pumpDiv);
                }
                else {
                    console.error('Article not found for pump:', pump);
                }
            }
        }
        else {
            console.error('Element with ID "pumps-station-scrollable" not found.');
        }
    });
}
displayPumps();
// Ajouter un écouteur d'événement sur le bouton de validation pour encaisser
(_e = document.getElementById('validate')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = Date.now();
        const totalHT = total.textContent ? parseFloat(total.textContent) : 0;
        const TVA = 0.2;
        console.log(tabProduits);
        console.log(tabQuantites);
        const response = yield fetch('/encaisser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: date,
                totalHT: totalHT,
                TVA: TVA,
                idArticles: tabProduits,
                quantites: tabQuantites
            })
        });
        if (response.ok) {
            window.location.href = '/cash_desk/overview';
        }
        //await addPaymentDb();
    }
    catch (error) {
        console.error('Une erreur est survenue:', error);
    }
}));
// Fonction pour ajouter un paiement dans la base de données
/*
async function addPaymentDb() {
    try {

        const totalMon= total.textContent ? parseFloat(total.textContent.replace('€', '')) : 0;
        const idTransaction = await fetch('/voirHistoriqueTransactions');
        const idTransactionJson = await idTransaction.json();
        if (idTransactionJson.length > 0) {
            idTransactionJson.sort((a: any, b: any) => b.id - a.id);
            const transactionWithMaxId = idTransactionJson[0];
            console.log('Transaction avec l\'ID le plus grand :', transactionWithMaxId);
        } else {
            console.log('Aucune transaction trouvée.');
        }

        for (let i = 0; i < tabMoyenDePaiement.length; i++) {
            const response = await fetch('/enregistrerPaiement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    montantTotal: totalMon,
                    id_transaction: idTransactionJson[0].id,
                    id_moyenDePaiement: tabMoyenDePaiement[i],
                    id_client: null
                })
            });

            if (response.ok) {
                console.log('Mise à jour des points de fidélité effectuée avec succès.');
            } else {
                console.error('Erreur lors de la requête:', response.status);
            }
        }
    } catch (error) {
        console.error('Une erreur est survenue:', error);
    }
}*/
