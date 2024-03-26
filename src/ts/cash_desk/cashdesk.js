"use strict";
const productSearched = document.getElementById('search-product-scrollable');
const productList = document.getElementById('products-list-scrollable');
function addProductToScrollable() {
    const inputElement = document.getElementById('search-product-input');
    const searchText = inputElement ? inputElement.value : '';
    if (!searchText.trim()) {
        alert('Veuillez saisir du texte pour effectuer la recherche.');
        return;
    }
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = searchText;
    if (productList) {
        productList.appendChild(paragraphElement);
    }
    else {
        console.error('Element with ID "search-product-scrollable" not found.');
    }
}
