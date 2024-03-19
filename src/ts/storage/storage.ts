class StockManager {

    constructor() {
        // Remplacez ces données simulées par vos propres données
        const stocksDataEnergie = [
            { nom: 'Diesel', prixHT: '1.2', prixTTC: '1.70', quantite: '500L' },
            { nom: 'SP 95', prixHT: '1.5', prixTTC: '2.00', quantite: '600L' },
        ];
        const reapproDataEnergie = [
            { num: '1', date: '15/01/2024', produit: 'Diesel', quantite: '500L', prix: '1.70'},
            { num: '2', date: '17/01/2024', produit: 'SP 95', quantite: '600L', prix: '2.00' },
        ];
        this.fillStocksData(stocksDataEnergie);
        this.fillReapproData(reapproDataEnergie);
    }

    clearTable(table: Element) {
        const tableRows = table.querySelectorAll('tr');
        // Commencez à partir de 1 pour ne pas supprimer la première ligne (les titres des colonnes)
        for (let i = 1; i < tableRows.length; i++) {
            tableRows[i].remove();
        }
    }
    fillStocksData(stockData: any[]) {
        const table = document.querySelector(".table-stocks");

        if (table) {
            const tableBody = table.querySelector('tbody');

            if (tableBody) {
                this.clearTable(table)

                for (const data of stockData) {
                    const newRow = tableBody.insertRow();

                    // Ajoutez les cellules avec les données appropriées
                    const cell1 = newRow.insertCell(0);
                    const cell2 = newRow.insertCell(1);
                    const cell3 = newRow.insertCell(2);
                    const cell4 = newRow.insertCell(3);
                    const cell5 = newRow.insertCell(4);

                    cell1.textContent = data.nom;
                    cell2.textContent = data.prixHT;
                    cell3.textContent = data.prixTTC;
                    cell4.textContent = data.quantite;
                    cell5.innerHTML = '<button>Réapprovisionner</button>';
                    cell5.className = "no_border";
                }
            }
        }
    }

    fillReapproData(reapproData: any[]) {
        const table = document.querySelector(".table-reappro");

        if (table) {
            const tableBody = table.querySelector('tbody');

            if (tableBody) {
                this.clearTable(table)
                for (const data of reapproData) {
                    const newRow = tableBody.insertRow();

                    // Ajoutez les cellules avec les données appropriées
                    const cell1 = newRow.insertCell(0);
                    const cell2 = newRow.insertCell(1);
                    const cell3 = newRow.insertCell(2);
                    const cell4 = newRow.insertCell(3);
                    const cell5 = newRow.insertCell(4);
                    const cell6 = newRow.insertCell(5);

                    cell1.textContent = data.num;
                    cell2.textContent = data.date;
                    cell3.textContent = data.produit;
                    cell4.textContent = data.quantite;
                    cell5.textContent = data.prix
                    cell6.innerHTML = '<button>Annuler</button> <button>Enregistrer</button>';
                    cell6.className = "no_border";
                }
            }
        }
    }

    setupMenuListeners() {
        const menuItems = document.querySelectorAll('.menu a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Obtenez l'identifiant de l'onglet à partir de l'attribut href
                const tabId = item.getAttribute('href').substring(1);

                switch (tabId) {
                    case 'energie':
                        document.getElementById('categorie_title').textContent = 'Energie';
                        const energieData = [
                            { nom: 'Diesel', prixHT: '1.2', prixTTC: '1.70', quantite: '500L' },
                            { nom: 'SP 95', prixHT: '1.5', prixTTC: '2.00', quantite: '600L' },
                        ];
                        this.fillStocksData(energieData);

                        const reapproEnergieData = [
                            { num: '1', date: '15/01/2024', produit: 'Diesel', quantite: '500L', prix: '1.70'},
                            { num: '2', date: '17/01/2024', produit: 'SP 95', quantite: '600L', prix: '2.00' },
                        ];
                        this.fillReapproData(reapproEnergieData);
                        break;
                    case 'boutique':
                        document.getElementById('categorie_title').textContent = 'Boutique';
                        const stocksData = [
                            { nom: 'twix', prixHT: '10.00', prixTTC: '12.00', quantite: '50' },
                            { nom: 'redbull', prixHT: '15.00', prixTTC: '18.00', quantite: '30' },
                        ];
                        this.fillStocksData(stocksData);

                        const reapproBoutiqueData = [
                            { num: '1', date: '15/01/2024', produit: 'twix', quantite: '50', prix: '1.00'},
                            { num: '2', date: '17/01/2024', produit: 'redbull', quantite: '30', prix: '2.00' },
                        ];
                        this.fillReapproData(reapproBoutiqueData);
                        break;
                    case 'atelier':
                        document.getElementById('categorie_title').textContent = 'Atelier';
                        break;
                    case 'restaurant':
                        document.getElementById('categorie_title').textContent = 'Restaurant';
                        break;
                }

            });
        });
    }

}

const stockManager = new StockManager();
// Ajouter des gestionnaires d'événements pour écouter les clics sur les liens de menu
stockManager.setupMenuListeners();