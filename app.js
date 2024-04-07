"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
// chemin absolu vers le dossier 'html'
const htmlPath = path_1.default.join(__dirname, 'src', 'html');
const cssPath = path_1.default.join(__dirname, 'assets', 'css');
// On indique à Express d'utiliser le moteur de vue ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/css', express_1.default.static(cssPath));
app.use(express_1.default.urlencoded({ extended: true }));
//Parser JSON
app.use(express_1.default.json());
// Serve TypeScript files from the 'ts' directory
const tsPath = path_1.default.join(__dirname, 'src', 'ts');
app.use('/ts', express_1.default.static(tsPath));
app.use(express_1.default.json());
// Route to handle JavaScript file requests
app.get('/ts/:dir/:file', (req, res) => {
    const { dir, file } = req.params;
    const jsFilePath = path_1.default.join(__dirname, 'src', 'js', dir, `${file}.js`);
    // Check if the JavaScript file exists
    fs_1.default.access(jsFilePath, fs_1.default.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }
        // Serve the compiled JavaScript file
        res.sendFile(jsFilePath);
    });
});
//dossier des vues à utiliser
app.set('views', htmlPath);
// Gérer les requêtes GET à la racine
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'index.html'));
});
app.get('/forgot-password', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'forgot-password.html'));
}); // Gérer les requêtes GET pour chaque page
//CASHDESK
app.get('/cash_desk', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'cash_desk', 'cash_desk.html'));
});
app.get('/cash_desk/overview', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'cash_desk', 'overview.html'));
});
app.get('/cash_desk/invoicelist', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'cash_desk', 'invoice-list.html'));
});
app.get('/cash_desk/transaction', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'cash_desk', 'transaction-history.html'));
});
//CUSTOMER/CARDS
app.get('/customer_cards', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'customer_cards', 'customer_cards.html'));
});
//HELP
app.get('/help', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'help', 'help.html'));
});
//HUMAN RESOURCES
app.get('/human_resources', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'human_resources', 'human_resources.html'));
});
//INCIDENTS
app.get('/incidents', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'incidents', 'incidents.html'));
});
app.get('/incidents/announce', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'incidents', 'announce_incident.html'));
});
app.get('/incidents/adjust/:id', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'incidents', 'adjust_incident.html'));
});
//MANAGEMENT
app.get('/management', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'management', 'management.html'));
});
//PROFILE
app.get('/profile', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'profile', 'profile.html'));
});
app.get('/profile-modification', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'profile', 'profile-modification.html'));
});
//SCEDULE
app.get('/schedule', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'schedule', 'schedule.html'));
});
app.get('/schedule/event', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'schedule', 'event.html'));
});
//STORAGE
app.get('/storage', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'storage', 'storage.html'));
});
app.get('/storage/fournisseurs', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'storage', 'fournisseurs.html'));
});
//TEMPORARY
app.get('/topbar', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'top-bar.html'));
});
app.get('/navigation', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'navigation.html'));
});
app.get('/topbar-incidents', (req, res) => {
    res.sendFile(path_1.default.join(htmlPath, 'top-bar-incidents.html'));
});
// On lance le serveur sur le port 3000
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
//API DB
const db = __importStar(require("./src/ts/database/db_queries"));
app.post('/seConnecter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alias = req.body.alias;
    try {
        const mdp = yield db.seConnecter(alias);
        if (mdp === req.body.password) {
            res.redirect('/cash_desk');
        }
        else {
            res.status(401).send({ error: 'Mot de passe incorrect' });
        }
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Modifier le mdp
app.put('/modifierMotDePasse', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alias = req.body.alias;
    const nouveauMotDePasse = req.body.nouveauMotDePasse;
    try {
        yield db.modifierMotDePasse(alias, nouveauMotDePasse);
        res.send({ message: 'Mot de passe modifié avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les infos
app.get('/voirInfosEmployeProfil/:idEmploye', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEmploye = +req.params.idEmploye;
    try {
        const employe = yield db.voirInfosEmployeProfil(idEmploye);
        res.send(employe);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Modif infos
app.put('/modifierInfosEmployeProfil', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEmploye = req.body.idEmploye;
    const colonne = req.body.colonne;
    const nouvelleValeur = req.body.nouvelleValeur;
    try {
        yield db.modifierInfosEmployeProfil(idEmploye, colonne, nouvelleValeur);
        res.send({ message: 'Informations modifiées avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir edt
app.get('/voirEdtProfil/:idEmploye', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEmploye = +req.params.idEmploye;
    try {
        const edt = yield db.voirEdtProfil(idEmploye);
        res.send(edt);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les aides
app.get('/voirAides', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aides = yield db.voirAides();
        res.send(aides);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir une aide
app.get('/voirAide/:idAide', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idAide = +req.params.idAide;
    try {
        const aide = yield db.voirAide(idAide);
        res.send(aide);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Rédiger une aide
app.post('/redigerAide', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const titre = req.body.titre;
    const corps = req.body.corps;
    const categorie = req.body.categorie;
    try {
        yield db.redigerAide(titre, corps, categorie);
        res.send({ message: 'Aide rédigée avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Supprimer une aide
app.delete('/supprimerAide/:idAide', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idAide = +req.params.idAide;
    try {
        yield db.supprimerAide(idAide);
        res.send({ message: 'Aide supprimée avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les derniers incidents (non réglés)
app.get('/voirDerniersIncidentsNonRegles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidents = yield db.voirDerniersIncidentsNonRegles();
        res.send(incidents);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Déclarer un incident
app.post('/declarerIncident', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nom = req.body.nom;
    const description = req.body.description;
    const niveau = req.body.niveau;
    const idEmploye = req.body.idEmploye;
    const date = req.body.date;
    const heure = req.body.heure;
    try {
        yield db.declarerIncident(nom, description, niveau, idEmploye, date, heure);
        res.send({ message: 'Incident déclaré avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Gérer un incident
app.post('/gererIncident', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const description = req.body.description;
    const idEmploye = req.body.idEmploye;
    const date = req.body.date;
    const heure = req.body.heure;
    try {
        yield db.gererIncident(description, idEmploye, date, heure);
        res.send({ message: 'Incident géré avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir tout les incidents
app.get('/voirTousIncidents', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidents = yield db.voirTousIncidents();
        res.send(incidents);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les détails d'un incident
app.get('/voirDetailsIncident/:idIncident', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idIncident = +req.params.idIncident;
    try {
        const incident = yield db.voirDetailsIncident(idIncident);
        res.send(incident);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// CAISSE
// Encaisser
app.post('/encaisser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.body.date;
    const totalHT = req.body.totalHT;
    const TVA = req.body.TVA;
    const idArticles = req.body.idArticles;
    const quantites = req.body.quantites;
    try {
        yield db.encaisser(date, totalHT, TVA, idArticles, quantites);
        res.send({ message: 'Encaissement effectué avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Récuperer Pompe
app.get('/getPump', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pompes = yield db.recupererPompe();
        res.send(pompes);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Recuperer energie pompe
app.get('/getEnergy/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const energie = yield db.recupererEnergiePompe(id);
        res.send(energie);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Recuperer carte membre
app.get('/getMemberCard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carte = yield db.recupererCarteMembre();
        res.send(carte);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Recuperer carte CCE
app.get('/getCardCCE', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cce = yield db.recupererCarteCCE();
        res.send(cce);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Enregistrer un paiement
app.post('/enregistrerPaiement', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const montant = req.body.montant;
    const idTransaction = req.body.idTransaction;
    const idMoyenDePaiement = req.body.idMoyenDePaiement;
    const idClient = req.body.idClient;
    try {
        yield db.enregistrerPaiement(montant, idTransaction, idMoyenDePaiement, idClient);
        res.send({ message: 'Paiement enregistré avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir historique des transactions
app.get('/voirHistoriqueTransactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield db.voirHistoriqueTransactions();
        res.send(transactions);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir le détail d'une transaction
app.get('/voirDetailTransaction/:idTransaction', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTransaction = +req.params.idTransaction;
    try {
        const transaction = yield db.voirDetailTransaction(idTransaction);
        res.send(transaction);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// STOCKAGE
app.get('/voirArticles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const produits = yield db.voirArticles();
        res.send(produits);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les produits
app.get('/voirProduits/:categorie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorie = req.params.categorie;
    try {
        const produits = yield db.voirProduits(categorie);
        res.send(produits);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les énergies
app.get('/voirEnergies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const energies = yield db.voirEnergies();
        res.send(energies);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les réappros produit
app.get('/voirReapproProduit/:categorie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorie = req.params.categorie;
    try {
        const reappros = yield db.voirReapproProduit(categorie);
        res.send(reappros);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les réappros énergie
app.get('/voirReapproEnergie/:categorie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorie = req.params.categorie;
    try {
        const reappros = yield db.voirReapproEnergie(categorie);
        res.send(reappros);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Modifier un article
app.put('/modifierArticle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idArticle = req.body.idArticle;
    const nouvellesValeurs = req.body.nouvellesValeurs;
    try {
        yield db.modifierArticle(idArticle, nouvellesValeurs);
        res.send({ message: 'Article modifié avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Lancer un réappro
app.post('/lancerReappro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idArticle = req.body.idArticle;
    const quantite = req.body.quantite;
    try {
        yield db.lancerReappro(idArticle, quantite);
        res.send({ message: 'Réappro lancé avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Annuler un réappro
app.delete('/annulerReappro/:idReappro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idReappro = +req.params.idReappro;
    try {
        yield db.annulerReappro(idReappro);
        res.send({ message: 'Réappro annulé avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Enregistrer la réception d'un réappro
app.put('/enregistrerReceptionReappro/:idReappro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idReappro = +req.params.idReappro;
    try {
        yield db.enregistrerReceptionReappro(idReappro);
        res.send({ message: 'Réception du réappro enregistrée avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// RESSOURCES HUMAINES
// Voir tout les employés
app.get('/voirTousEmployes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employes = yield db.voirTousEmployes();
        res.send(employes);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les infos
app.get('/voirInfosEmploye/:idEmploye', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEmploye = +req.params.idEmploye;
    try {
        const employe = yield db.voirInfosEmploye(idEmploye);
        res.send(employe);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Modif infos
app.put('/modifierInfosEmploye', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEmploye = req.body.idEmploye;
    const nouvellesInfos = req.body.nouvellesInfos;
    try {
        yield db.modifierInfosEmploye(idEmploye, nouvellesInfos);
        res.send({ message: 'Informations de l\'employé modifiées avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir edt
app.get('/voirEdt/:idEmploye', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idEmploye = +req.params.idEmploye;
    try {
        const edt = yield db.voirEdt(idEmploye);
        res.send(edt);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Modif edt
app.put('/modifierEdt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idPeriode = req.body.idPeriode;
    const nouvellesValeurs = req.body.nouvellesValeurs;
    try {
        yield db.modifierEdt(idPeriode, nouvellesValeurs);
        res.send({ message: 'EDT modifié avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// CLIENT / CARTE
// Voir les clients
app.get('/voirClients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield db.voirClients();
        res.send(clients);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les détails d'un client
app.get('/voirDetailsClient/:idClient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idClient = +req.params.idClient;
    try {
        const client = yield db.voirDetailsClient(idClient);
        res.send(client);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Créer un client
app.post('/creerClient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const courriel = req.body.courriel;
    const tel = req.body.tel;
    const adresse = req.body.adresse;
    const codePostal = req.body.codePostal;
    const pays = req.body.pays;
    try {
        yield db.creerClient(nom, prenom, courriel, tel, adresse, codePostal, pays);
        res.send({ message: 'Client créé avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Ajouter une carte
app.post('/ajouterCarte', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idClient = req.body.idClient;
    try {
        yield db.ajouterCarte(idClient);
        res.send({ message: 'Carte ajoutée avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Supprimer un client
app.delete('/supprimerClient/:idClient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idClient = +req.params.idClient;
    try {
        yield db.supprimerClient(idClient);
        res.send({ message: 'Client supprimé avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Supprimer une carte
app.delete('/supprimerCarte/:numCarte', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const numCarte = +req.params.numCarte;
    try {
        yield db.supprimerCarte(numCarte);
        res.send({ message: 'Carte supprimée avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Associer une carte à un client
app.put('/associerCarteClient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const numCarte = req.body.numCarte;
    const idClient = req.body.idClient;
    try {
        yield db.associerCarteClient(numCarte, idClient);
        res.send({ message: 'Carte associée au client avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Modifier un client
app.put('/modifierClient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idClient = req.body.idClient;
    const nouvellesInfos = req.body.nouvellesInfos;
    try {
        yield db.modifierClient(idClient, nouvellesInfos);
        res.send({ message: 'Informations du client modifiées avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// CALENDRIER
// Voir les promotions
app.get('/voirPromotions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotions = yield db.voirPromotions();
        res.send(promotions);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Voir les évènements
app.get('/voirEvenements', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evenements = yield db.voirEvenements();
        res.send(evenements);
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Créer une promotion
app.post('/creerPromotion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const debut = req.body.debut;
    const fin = req.body.fin;
    const valeur = req.body.valeur;
    const idArticle = req.body.idArticle;
    try {
        yield db.creerPromotion(debut, fin, valeur, idArticle);
        res.send({ message: 'Promotion créée avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Modifier une promotion
app.put('/modifierPromotion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idPeriode = req.body.idPeriode;
    const nouvelleValeur = req.body.nouvelleValeur;
    try {
        yield db.modifierPromotion(idPeriode, nouvelleValeur);
        res.send({ message: 'Promotion modifiée avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Créer un évènement
app.post('/creerEvenement', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const debut = req.body.debut;
    const fin = req.body.fin;
    const intitule = req.body.intitule;
    try {
        yield db.creerEvenement(debut, fin, intitule);
        res.send({ message: 'Évènement créé avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
// Modifier un évènement
app.put('/modifierEvenement', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idPeriode = req.body.idPeriode;
    const nouvelIntitule = req.body.nouvelIntitule;
    try {
        yield db.modifierEvenement(idPeriode, nouvelIntitule);
        res.send({ message: 'Évènement modifié avec succès' });
    }
    catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue' });
    }
}));
