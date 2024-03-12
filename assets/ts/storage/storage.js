var StockManager = /** @class */ (function () {
    function StockManager() {
    }
    StockManager.prototype.fillTableWithData = function (stockData) {
        // Obtenez une référence à la table
        var table = document.querySelector(".table-stocks");
        console.log(table);
        console.log(stockData);
        // Assurez-vous que la table existe avant de continuer
        if (table) {
            // Obtenez une référence à la ligne où vous voulez ajouter les données
            var tableBody = table.querySelector('tbody');
            console.log(tableBody);
            // Assurez-vous que le corps de la table existe avant de continuer
            if (tableBody) {
                // Bouclez à travers les données et ajoutez-les à la table
                console.log(tableBody);
                for (var _i = 0, stockData_1 = stockData; _i < stockData_1.length; _i++) {
                    var data = stockData_1[_i];
                    var newRow = tableBody.insertRow();
                    // Ajoutez les cellules avec les données appropriées
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    var cell3 = newRow.insertCell(2);
                    var cell4 = newRow.insertCell(3);
                    var cell5 = newRow.insertCell(4);
                    cell1.textContent = data.nom;
                    cell2.textContent = data.prixHT;
                    cell3.textContent = data.prixTTC;
                    cell4.textContent = data.quantite;
                    cell5.innerHTML = '<button>Réapprovisionner</button>';
                    cell5.className = "no_border";
                    console.log("ça a fini askip");
                }
            }
        }
    };
    return StockManager;
}());
// Exemple d'utilisation
var stockData = [
    { nom: 'Produit1', prixHT: '10.00', prixTTC: '12.00', quantite: '50' },
    { nom: 'Produit2', prixHT: '15.00', prixTTC: '18.00', quantite: '30' },
    // Ajoutez d'autres données selon vos besoins
];
var stockManager = new StockManager();
stockManager.fillTableWithData(stockData);
console.log("coucouuuu");
