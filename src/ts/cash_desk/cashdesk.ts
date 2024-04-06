const productSearched: HTMLElement | null = document.getElementById('search-product-scrollable');
const productList: HTMLElement | null = document.getElementById('products-list-scrollable');

const searchInput = document.getElementById('search-product-input') as HTMLInputElement;
searchInput.addEventListener('input', searchProducts);
const total = document.getElementById('price-total') as HTMLParagraphElement;
const buttonValidate = document.getElementById('validate') as HTMLButtonElement;

async function searchProducts() {
    const searchInputValue = searchInput.value.trim().toLowerCase();

    try {
        const response = await fetch(`/voirArticles`);
        const produits = await response.json();

        if (productSearched) {
            productSearched.innerHTML = '';
            let totalPrice = 0;

            const filteredProduits = produits.filter((produit: any) => produit.nom.toLowerCase().includes(searchInputValue));

            if (filteredProduits.length === 0) {
                const noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = 'Aucun produit trouvé.';
                productSearched.appendChild(noResultsMessage);
            } else {
                filteredProduits.forEach((produit: any) => {
                    const productDiv = document.createElement('div');
                    const buttonAdd = document.createElement('button');
                    const divNamePrice = document.createElement('div');
                    const productName= document.createElement('p');
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
                        productList?.appendChild(productToAdd);
                    });

                    productDiv.appendChild(buttonAdd);
                    productSearched.appendChild(productDiv);
                });
            }
        } else {
            console.error('Element with ID "search-product-scrollable" not found.');
        }
    } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des produits:', error);
    }
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
            const associatedInput = document.getElementById(checkbox.id + '-input');
            if (associatedInput instanceof HTMLInputElement) {
                associatedInput.style.backgroundColor = checkbox.checked ? '#0FD274' : '#f1e3a4';
                associatedInput.disabled = !checkbox.checked;
            }
            if (checkbox.checked) {
                checkbox.parentElement?.classList.add('checked');
                buttonValidate.disabled = false;

            } else {
                checkbox.parentElement?.classList.remove('checked');
                buttonValidate.disabled = true;
            }
        });
    }
});




