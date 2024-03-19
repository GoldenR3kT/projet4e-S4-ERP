var StockManager = /** @class */ (function () {
    function StockManager() {
        // Remplacez ces données simulées par vos propres données
        var stocksDataEnergie = [
            { nom: 'Diesel', prixHT: '1.2', prixTTC: '1.70', quantite: '500L' },
            { nom: 'SP 95', prixHT: '1.5', prixTTC: '2.00', quantite: '600L' },
        ];
        var reapproDataEnergie = [
            { num: '1', date: '15/01/2024', produit: 'Diesel', quantite: '500L', prix: '1.70' },
            { num: '2', date: '17/01/2024', produit: 'SP 95', quantite: '600L', prix: '2.00' },
        ];
        this.fillStocksData(stocksDataEnergie);
        this.fillReapproData(reapproDataEnergie);
    }
    StockManager.prototype.clearTable = function (table) {
        var tableRows = table.querySelectorAll('tr');
        // Commencez à partir de 1 pour ne pas supprimer la première ligne (les titres des colonnes)
        for (var i = 1; i < tableRows.length; i++) {
            tableRows[i].remove();
        }
    };
    StockManager.prototype.fillStocksData = function (stockData) {
        var table = document.querySelector(".table-stocks");
        if (table) {
            var tableBody = table.querySelector('tbody');
            if (tableBody) {
                this.clearTable(table);
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
                }
            }
        }
    };
    StockManager.prototype.fillReapproData = function (reapproData) {
        var table = document.querySelector(".table-reappro");
        if (table) {
            var tableBody = table.querySelector('tbody');
            if (tableBody) {
                this.clearTable(table);
                for (var _i = 0, reapproData_1 = reapproData; _i < reapproData_1.length; _i++) {
                    var data = reapproData_1[_i];
                    var newRow = tableBody.insertRow();
                    // Ajoutez les cellules avec les données appropriées
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    var cell3 = newRow.insertCell(2);
                    var cell4 = newRow.insertCell(3);
                    var cell5 = newRow.insertCell(4);
                    var cell6 = newRow.insertCell(5);
                    cell1.textContent = data.num;
                    cell2.textContent = data.date;
                    cell3.textContent = data.produit;
                    cell4.textContent = data.quantite;
                    cell5.textContent = data.prix;
                    cell6.innerHTML = '<button>Annuler</button> <button>Enregistrer</button>';
                    cell6.className = "no_border";
                }
            }
        }
    };
    StockManager.prototype.setupMenuListeners = function () {
        var _this = this;
        var menuItems = document.querySelectorAll('.menu a');
        menuItems.forEach(function (item) {
            item.addEventListener('click', function () {
                // Obtenez l'identifiant de l'onglet à partir de l'attribut href
                var tabId = item.getAttribute('href').substring(1);
                switch (tabId) {
                    case 'energie':
                        document.getElementById('categorie_title').textContent = 'Energie';
                        var energieData = [
                            { nom: 'Diesel', prixHT: '1.2', prixTTC: '1.70', quantite: '500L' },
                            { nom: 'SP 95', prixHT: '1.5', prixTTC: '2.00', quantite: '600L' },
                        ];
                        _this.fillStocksData(energieData);
                        var reapproEnergieData = [
                            { num: '1', date: '15/01/2024', produit: 'Diesel', quantite: '500L', prix: '1.70' },
                            { num: '2', date: '17/01/2024', produit: 'SP 95', quantite: '600L', prix: '2.00' },
                        ];
                        _this.fillReapproData(reapproEnergieData);
                        break;
                    case 'boutique':
                        document.getElementById('categorie_title').textContent = 'Boutique';
                        var stocksData = [
                            { nom: 'twix', prixHT: '10.00', prixTTC: '12.00', quantite: '50' },
                            { nom: 'redbull', prixHT: '15.00', prixTTC: '18.00', quantite: '30' },
                        ];
                        _this.fillStocksData(stocksData);
                        var reapproBoutiqueData = [
                            { num: '1', date: '15/01/2024', produit: 'twix', quantite: '50', prix: '1.00' },
                            { num: '2', date: '17/01/2024', produit: 'redbull', quantite: '30', prix: '2.00' },
                        ];
                        _this.fillReapproData(reapproBoutiqueData);
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
    };
    return StockManager;
}());
var stockManager = new StockManager();
// Ajouter des gestionnaires d'événements pour écouter les clics sur les liens de menu
stockManager.setupMenuListeners();
