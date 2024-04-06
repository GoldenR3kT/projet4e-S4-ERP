const productSearched: HTMLElement | null = document.getElementById('search-product-scrollable');
const productList: HTMLElement | null = document.getElementById('products-list-scrollable');

function addProductToScrollable(): void {
    const inputElement: HTMLInputElement | null = document.getElementById('search-product-input') as HTMLInputElement;
    const searchText: string = inputElement ? inputElement.value : '';

    if (!searchText.trim()) {
        alert('Veuillez saisir du texte pour effectuer la recherche.');
        return;
    }

    const paragraphElement: HTMLParagraphElement = document.createElement('p');
    paragraphElement.textContent = searchText;
    if (productList) {
        productList.appendChild(paragraphElement);
    } else {
        console.error('Element with ID "search-product-scrollable" not found.');
    }
}

