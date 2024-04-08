"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
const productSearched = document.getElementById('search-product-scrollable');
const productList = document.getElementById('products-list-scrollable');
const pumpScrollable = document.getElementById('pumps-station-scrollable');
const searchInput = document.getElementById('search-product-input');
searchInput.addEventListener('input', searchProducts);
const total = document.getElementById('price-total');
const buttonValidate = document.getElementById('validate');
function searchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const searchInputValue = searchInput.value.trim().toLowerCase();
        try {
            const response = yield fetch(`/voirArticles`);
            const produits = yield response.json();
            if (productSearched) {
                productSearched.innerHTML = '';
                let totalPrice = 0;
                const filteredProduits = produits.filter((produit) => produit.nom.toLowerCase().includes(searchInputValue));
                if (filteredProduits.length === 0) {
                    const noResultsMessage = document.createElement('p');
                    noResultsMessage.textContent = 'Aucun produit trouvé.';
                    productSearched.appendChild(noResultsMessage);
                }
                else {
                    filteredProduits.forEach((produit) => {
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
                        buttonAdd.addEventListener('click', () => {
                            var _a, _b, _c, _d;
                            const productToAdd = divNamePrice.cloneNode(true);
                            disableAllCheckboxes();
                            if (((_a = productName.textContent) === null || _a === void 0 ? void 0 : _a.includes("Diesel")) || ((_b = productName.textContent) === null || _b === void 0 ? void 0 : _b.includes("Sans Plomb")) || ((_c = productName.textContent) === null || _c === void 0 ? void 0 : _c.includes("Electricite")) || ((_d = productName.textContent) === null || _d === void 0 ? void 0 : _d.includes("Gaz"))) {
                                let toAskQEnergy = document.getElementById('toast-energy-quantity');
                                toAskQEnergy.style.display = 'block';
                                toAskQEnergy.style.zIndex = '1000';
                                let previousPumpOkClickHandler;
                                let pumpOkClickHandler;
                                let pumpOk = document.getElementById('toask-energy-button');
                                pumpOkClickHandler = () => __awaiter(this, void 0, void 0, function* () {
                                    let energyInput = document.getElementById("quantity-energy");
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
                                totalPrice += produit.prixTTC;
                                total.textContent = totalPrice + ' €';
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
function disableAllCheckboxes() {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        if (checkbox instanceof HTMLInputElement) {
            checkbox.disabled = false;
        }
    });
}
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    if (checkbox instanceof HTMLInputElement) {
        checkbox.addEventListener('change', () => {
            var _a, _b;
            const associatedInput = document.getElementById(checkbox.id + '-input');
            if (associatedInput instanceof HTMLInputElement) {
                associatedInput.style.backgroundColor = checkbox.checked ? '#0FD274' : '#f1e3a4';
                associatedInput.disabled = !checkbox.checked;
            }
            if (checkbox.checked) {
                (_a = checkbox.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('checked');
                buttonValidate.disabled = false;
                associatedInput.disabled = false;
            }
            else {
                (_b = checkbox.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('checked');
                buttonValidate.disabled = true;
            }
        });
    }
});
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
function displayPumps() {
    return __awaiter(this, void 0, void 0, function* () {
        const articles = yield getArticles();
        const energies = yield getEnergies();
        const pumps = yield getPumps();
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
                        // Fonction asynchrone pour mettre à jour l'état dans la base de données
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
                        yield updateState(); // Appel de la fonction pour mettre à jour l'état dans la base de données
                    }
                    else {
                        pumpStatut.textContent = 'Statut : ' + pump.statut;
                    }
                    pumpDiv.appendChild(pumpName);
                    pumpDiv.appendChild(pumpEnergy);
                    pumpDiv.appendChild(pumpQuantity);
                    pumpDiv.appendChild(pumpStatut);
                    pumpDiv.className = 'pump-div';
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
(_a = document.querySelector('#member-card-client-search')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', getMemberCard);
(_b = document.querySelector('#cce-card-client-search')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', getCardCCE);
(_c = document.querySelector('#validate')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
    window.location.href = '/cash_desk/overview';
});
