class StockManager {
    fillTableWithData(stockData: any[]) {
        // Obtenez une référence à la table
        const table = document.querySelector(".table-stocks");

        // Assurez-vous que la table existe avant de continuer
        if (table) {
            // Obtenez une référence à la ligne où vous voulez ajouter les données
            const tableBody = table.querySelector('tbody');
            // Assurez-vous que le corps de la table existe avant de continuer
            if (tableBody) {
                // Bouclez à travers les données et ajoutez-les à la table
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
}

// Exemple d'utilisation
const stockData = [
    { nom: 'Produit1', prixHT: '10.00', prixTTC: '12.00', quantite: '50' },
    { nom: 'Produit2', prixHT: '15.00', prixTTC: '18.00', quantite: '30' },
    // Ajoutez d'autres données selon vos besoins
];

const stockManager = new StockManager();
stockManager.fillTableWithData(stockData);