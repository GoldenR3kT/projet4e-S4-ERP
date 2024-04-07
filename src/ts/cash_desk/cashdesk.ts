const productSearched: HTMLElement | null = document.getElementById('search-product-scrollable');
const productList: HTMLElement | null = document.getElementById('products-list-scrollable');
const pumpScrollable: HTMLElement | null = document.getElementById('pumps-station-scrollable') as HTMLElement;

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
            const associatedInput = document.getElementById(checkbox.id + '-input')as HTMLInputElement;
            if (associatedInput instanceof HTMLInputElement) {
                associatedInput.style.backgroundColor = checkbox.checked ? '#0FD274' : '#f1e3a4';
                associatedInput.disabled = !checkbox.checked;
            }
            if (checkbox.checked) {
                checkbox.parentElement?.classList.add('checked');
                buttonValidate.disabled = false;

                associatedInput.disabled = false;
            } else {
                checkbox.parentElement?.classList.remove('checked');
                buttonValidate.disabled = true;
            }
        });
    }
});

async function getMemberCard() {
    const memberIdInput = document.getElementById('id-member') as HTMLInputElement;
    const memberId = memberIdInput.value;

    try {
        const response = await fetch(`/getMemberCard`);
        const allCards = await response.json();

        console.log(allCards);
        const member = allCards.find((m: any) => m.num === parseInt(memberId));

        if (member) {
            const memberIdParagraph = document.getElementById('member-card-client-id') as HTMLParagraphElement;
            const memberPointsParagraph = document.getElementById('member-card-client-points') as HTMLParagraphElement;

            memberIdParagraph.textContent = 'Client : ' + member.num;
            memberPointsParagraph.textContent = 'Points de fidélité : ' + member.ptsMembre;
        } else {
            const memberIdParagraph = document.getElementById('member-card-client-id') as HTMLParagraphElement;
            const memberPointsParagraph = document.getElementById('member-card-client-points') as HTMLParagraphElement;
            memberIdParagraph.textContent = 'Aucun membre trouvé avec l\'ID ' + memberId;
            memberPointsParagraph.textContent = '';
        }
    } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des membres:', error);
    }
}

async function getCardCCE() {
    const cceIdInput = document.getElementById('id-cce') as HTMLInputElement;
    const cceId = cceIdInput.value;

    try {
        const response = await fetch(`/getCardCCE`);
        const allCards = await response.json();

        const member = allCards.find((m: any) => m.num === parseInt(cceId));

        if (member) {
            const cceIdParagraph = document.getElementById('energy-card-id-answer') as HTMLParagraphElement;
            const ccePointsParagraph = document.getElementById('amount-cce-answer') as HTMLParagraphElement;

            cceIdParagraph.textContent = member.num;
            ccePointsParagraph.textContent = member.credit;
        } else {
            const cceIdParagraph = document.getElementById('member-card-client-id') as HTMLParagraphElement;
            const ccePointsParagraph = document.getElementById('member-card-client-points') as HTMLParagraphElement;
            cceIdParagraph.textContent = 'Aucun membre trouvé avec l\'ID ' + cceId;
            ccePointsParagraph.textContent = '';
        }
    } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des membres:', error);
    }
}


async function getArticles() {
    try {
        const response = await fetch(`/voirArticles`);
        return await response.json();
    } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des articles:', error);
        return [];
    }
}

async function getEnergies() {
    try {
        const response = await fetch(`/voirEnergies`);
        return await response.json();
    } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des énergies:', error);
        return [];
    }
}

async function getPumps() {
    try {
        const response = await fetch(`/getPump`);
        return await response.json();
    } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des pompes:', error);
        return [];
    }
}

async function displayPumps() {
    const articles = await getArticles();
    const energies = await getEnergies();
    const pumps = await getPumps();

    if (pumpScrollable) {
        pumps.forEach((pump: any) => {
            const pumpDiv = document.createElement('div');
            const pumpName = document.createElement('div');
            const pumpEnergy = document.createElement('p');
            const pumpQuantity = document.createElement('p');
            const pumpStatut = document.createElement('p');

            const energy = energies.find((energy: any) => energy.id === pump.id);
            const article = articles.find((article: any) => article.id === pump.id);
            if (article && energy) {
                pumpName.textContent = "POMPE N°" + pump.id;
                pumpName.className = 'pump-name';

                pumpEnergy.textContent = article.nom;
                pumpQuantity.textContent = 'Quantite dispo : ' +article.quantite+'/'+ pump.stockage_max + energy.unite;
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
            } else {
                console.error('Article not found for pump:', pump);
            }
        });
    } else {
        console.error('Element with ID "pumps-station-scrollable" not found.');
    }
}

displayPumps();


document.querySelector('#member-card-client-search')?.addEventListener('click', getMemberCard);
document.querySelector('#cce-card-client-search')?.addEventListener('click', getCardCCE);
document.querySelector('#validate')?.addEventListener('click', () => {
    window.location.href = '/cash_desk/overview';
});