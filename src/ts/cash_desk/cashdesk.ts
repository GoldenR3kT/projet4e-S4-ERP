const productSearched: HTMLElement | null = document.getElementById('search-product-scrollable');
const productList: HTMLElement | null = document.getElementById('products-list-scrollable');
const pumpScrollable: HTMLElement | null = document.getElementById('pumps-station-scrollable') as HTMLElement;

const searchInput = document.getElementById('search-product-input') as HTMLInputElement;
searchInput.addEventListener('input', searchProducts);

let tabProduits: any[] = [];
let tabQuantites: any[] = [];
let tabMoyenDePaiement: any[] = [];


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
                    productPrice.textContent = produit.prixTTC + ' €';
                    productDiv.textContent = produit.nom;
                    buttonAdd.textContent = 'Ajouter';

                    divNamePrice.className = 'div-namePrice';
                    productDiv.className = 'product-div';
                    buttonAdd.className = 'add-product-button';
                    buttonAdd.addEventListener('click', () => {
                        const productToAdd = divNamePrice.cloneNode(true);
                        disableAllCheckboxes();

                        if (productName.textContent?.includes("Diesel") || productName.textContent?.includes("Sans Plomb") || productName.textContent?.includes("Electricite") || productName.textContent?.includes("Gaz")) {
                            let toAskQEnergy = document.getElementById('toast-energy-quantity') as HTMLElement;
                            toAskQEnergy.style.display = 'block';
                            toAskQEnergy.style.zIndex = '1000';

                            let previousPumpOkClickHandler: () => void
                            let pumpOkClickHandler: () => void;


                            let pumpOk = document.getElementById('toask-energy-button') as HTMLInputElement;


                            pumpOkClickHandler = async () => {
                                let energyInput = document.getElementById("quantity-energy") as HTMLInputElement;

                                tabProduits.push(produit.id);

                                tabQuantites.push(energyInput.value);
                                toAskQEnergy.style.display = 'none';
                                toAskQEnergy.style.zIndex = '0';
                                console.log(energyInput.value);

                                let modifiedProductName = document.createElement('p');
                                modifiedProductName.textContent = productName.textContent + " X " + energyInput.value;

                                let newProductToAdd = document.createElement('div').cloneNode(true) as HTMLDivElement;
                                newProductToAdd.className = 'product-div';
                                newProductToAdd.appendChild(modifiedProductName);
                                newProductToAdd.appendChild(productPrice);
                                totalPrice += produit.prixTTC * parseInt(energyInput.value)
                                total.textContent = totalPrice + ' €';
                                productList?.appendChild(newProductToAdd);

                                if (pumpOkClickHandler) {
                                    pumpOk.removeEventListener('click', pumpOkClickHandler);
                                }
                            };

                            pumpOk.addEventListener('click', pumpOkClickHandler);






                            const pumpCancel = document.getElementById('toask-energy-cancel') as HTMLInputElement;
                            pumpCancel.addEventListener('click', () => {
                                toAskQEnergy.style.display = 'none';
                                toAskQEnergy.style.zIndex = '0';
                            });
                        }
                        else{
                            totalPrice += produit.prixTTC;
                            total.textContent = totalPrice + ' €';

                            tabProduits.push(produit.id);

                            tabQuantites.push(1);

                            const newProductToAdd = document.createElement('div').cloneNode(true) as HTMLDivElement;
                            const productNameClone = productName.cloneNode(true) as HTMLParagraphElement;
                            const productPriceClone = productPrice.cloneNode(true) as HTMLParagraphElement;

                            newProductToAdd.className = 'product-div';
                            newProductToAdd.appendChild(productNameClone);
                            newProductToAdd.appendChild(productPriceClone);
                            productList?.appendChild(newProductToAdd);
                        }

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
            const associatedInput = document.getElementById(checkbox.id + '-input') as HTMLInputElement;
            const associatedLabel = checkbox.previousElementSibling as HTMLLabelElement;

            if (associatedInput instanceof HTMLInputElement && associatedLabel instanceof HTMLLabelElement) {
                associatedInput.style.backgroundColor = checkbox.checked ? '#0FD274' : '#f1e3a4';
                associatedInput.disabled = !checkbox.checked;

                if (checkbox.checked) {
                    checkbox.parentElement?.classList.add('checked');
                    buttonValidate.disabled = false;

                    associatedInput.disabled = false;

                    // Ajouter au tableau tabmoyendepaiement selon le type de paiement
                    if (associatedLabel.textContent === 'CB') {
                        tabMoyenDePaiement.push(1);
                    } else if (associatedLabel.textContent === 'CCE') {
                        tabMoyenDePaiement.push(2);
                    } else if (associatedLabel.textContent === 'Espèces') {
                        tabMoyenDePaiement.push(3);
                    }
                } else {
                    checkbox.parentElement?.classList.remove('checked');
                    buttonValidate.disabled = true;

                    if (associatedLabel.textContent === 'CB') {
                        tabMoyenDePaiement = tabMoyenDePaiement.filter(item => item !== 1);
                    } else if (associatedLabel.textContent === 'CCE') {
                        tabMoyenDePaiement = tabMoyenDePaiement.filter(item => item !== 2);
                    } else if (associatedLabel.textContent === 'Espèces') {
                        tabMoyenDePaiement = tabMoyenDePaiement.filter(item => item !== 3);
                    }
                }
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
        for (const pump of pumps) {
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
                pumpQuantity.textContent = 'Quantite dispo : ' + article.quantite + '/' + pump.stockage_max + energy.unite;

                // Gérer le cas où la quantité est nulle
                if (article.quantite === 0) {
                    pumpStatut.textContent = 'Statut : Indisponible';
                    pumpDiv.style.backgroundColor = 'red';
                    pumpName.style.backgroundColor = 'red';

                    // Fonction asynchrone pour mettre à jour l'état dans la base de données
                    const updateState = async () => {
                        try {
                            const response = await fetch('/changerEtatPompe', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    idPompe: pump.id,
                                    etat: 'Indisponible'
                                })
                            });
                            const data = await response.json();
                            console.log(data.message);
                        } catch (error) {
                            console.error('Une erreur est survenue lors de la mise à jour de l\'état de la pompe:', error);
                        }
                    };

                    await updateState(); // Appel de la fonction pour mettre à jour l'état dans la base de données
                } else {
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
                    const toAskPump = document.getElementById('toask-pump') as HTMLElement;
                    toAskPump.style.display = 'block';
                    toAskPump.style.zIndex = '1000';

                    const pumpOk = document.getElementById('toask-pump-button') as HTMLInputElement;
                    pumpOk.addEventListener('click', async () => {
                        try {
                            let newEtat;
                            if (pump.statut === 'Prêt à l\'emploi') {
                                newEtat = 'En cours d util.';
                            } else {
                                newEtat = 'Prêt à l\'emploi';
                            }
                            const response = await fetch('/changerEtatPompe', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    idPompe: pump.id,
                                    etat: newEtat
                                })
                            });
                            const data = await response.json();
                            console.log(data.message);
                            toAskPump.style.display = 'none';
                            toAskPump.style.zIndex = '0';
                            pump.statut = newEtat;
                            pumpStatut.textContent = 'Statut : ' + pump.statut;
                            pumpDiv.classList.remove('selected');
                            pumpName.classList.remove('selected');
                        } catch (error) {
                            console.error('Une erreur est survenue:', error);
                        }
                    });

                    const pumpCancel = document.getElementById('toask-pump-cancel') as HTMLInputElement;
                    pumpCancel.addEventListener('click', () => {
                        toAskPump.style.display = 'none';
                        toAskPump.style.zIndex = '0';
                        pumpDiv.classList.remove('selected');
                    });
                });

                pumpScrollable.appendChild(pumpDiv);
            } else {
                console.error('Article not found for pump:', pump);
            }
        }
    } else {
        console.error('Element with ID "pumps-station-scrollable" not found.');
    }
}



displayPumps();


document.querySelector('#member-card-client-search')?.addEventListener('click', getMemberCard);
document.querySelector('#cce-card-client-search')?.addEventListener('click', getCardCCE);
document.getElementById('validate')?.addEventListener('click', async () => {
    try {
        const date = Date.now();
        const totalHT = total.textContent ? parseFloat(total.textContent) : 0;
        const TVA = 0.2
        console.log(tabProduits);
        console.log(tabQuantites);
        const response = await fetch('/encaisser', {
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
        if(response.ok){
            window.location.href = '/cash_desk/overview';
        }
        //await addPaymentDb();
    } catch (error) {
        console.error('Une erreur est survenue:', error);
    }

});

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
