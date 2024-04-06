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
            }
            else {
                (_b = checkbox.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('checked');
                buttonValidate.disabled = true;
            }
        });
    }
});
