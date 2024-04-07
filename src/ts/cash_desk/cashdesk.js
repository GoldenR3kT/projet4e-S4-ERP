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
                        productPrice.textContent = produit.prixHT + ' €';
                        productDiv.textContent = produit.nom;
                        buttonAdd.textContent = 'Ajouter';
                        divNamePrice.appendChild(productName);
                        divNamePrice.appendChild(productPrice);
                        divNamePrice.className = 'div-namePrice';
                        productDiv.className = 'product-div';
                        buttonAdd.className = 'add-product-button';
                        buttonAdd.addEventListener('click', () => {
                            const productToAdd = divNamePrice.cloneNode(true);
                            totalPrice += produit.prixHT;
                            total.textContent = totalPrice + ' €';
                            disableAllCheckboxes();
                            productList === null || productList === void 0 ? void 0 : productList.appendChild(productToAdd);
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
            const allMembers = yield response.json();
            const member = allMembers.find((m) => m.id === memberId);
            if (member) {
                const memberIdParagraph = document.getElementById('member-card-client-id');
                const memberPointsParagraph = document.getElementById('member-card-client-points');
                memberIdParagraph.textContent = 'Client : ' + member.id;
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
            pumps.forEach((pump) => {
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
                    pumpStatut.textContent = 'Statut : ' + pump.statut;
                    pumpDiv.appendChild(pumpName);
                    pumpDiv.appendChild(pumpEnergy);
                    pumpDiv.appendChild(pumpQuantity);
                    pumpDiv.appendChild(pumpStatut);
                    pumpDiv.className = 'pump-div';
                    pumpDiv.addEventListener('click', () => {
                        document.querySelectorAll('.pump-div').forEach((element) => {
                            element.classList.remove('selected');
                        });
                        pumpDiv.classList.add('selected');
                    });
                    pumpScrollable.appendChild(pumpDiv);
                }
                else {
                    console.error('Article not found for pump:', pump);
                }
            });
        }
        else {
            console.error('Element with ID "pumps-station-scrollable" not found.');
        }
    });
}
displayPumps();
