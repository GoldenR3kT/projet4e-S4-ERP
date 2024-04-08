"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerEvenement = exports.modifierPromotion = exports.creerPromotion = exports.voirEvenements = exports.voirPromotions = exports.modifierClient = exports.associerCarteClient = exports.supprimerCarte = exports.supprimerClient = exports.ajouterCarte = exports.creerClient = exports.voirDetailsClient = exports.voirClients = exports.modifierEdt = exports.voirEdt = exports.modifierInfosEmploye = exports.voirInfosEmploye = exports.voirTousEmployes = exports.enregistrerReceptionReappro = exports.annulerReappro = exports.lancerReappro = exports.modifierArticle = exports.voirReapproEnergie = exports.voirReapproProduit = exports.voirEnergies = exports.voirProduits = exports.voirArticles = exports.voirDetailTransaction = exports.voirHistoriqueTransactions = exports.enregistrerPaiement = exports.recupererCarteCCE = exports.recupererCarteMembre = exports.recupererEnergiePompe = exports.recupererPompe = exports.encaisser = exports.voirDetailsIncident = exports.voirTousIncidents = exports.gererIncident = exports.declarerIncident = exports.voirDerniersIncidentsRegles = exports.voirDerniersIncidentsNonRegles = exports.supprimerAide = exports.redigerAide = exports.voirAide = exports.voirAides = exports.voirEdtProfil = exports.modifierInfosEmployeProfil = exports.voirInfosEmployeProfil = exports.modifierMotDePasse = exports.seConnecter = void 0;
exports.modifierEvenement = void 0;
const models = require("./db_models");
const { Partenaire, Personne, Contact, Fournisseur, Client, Transaction, MoyenDePaiement, Paiement, Article, Energie, Produit, Menu, ProduitMenu, Pompe, Mouvement, Carte, CM, CCE, GestionCce, Bonus, CceBonus, Employe, Periode, ActiviteEdt, Promo, Evenement, Incident, SolutionIncident, Aide, AchatClient, Reappro } = models;
// AUTHENTIFICATION
// Se connecter
function seConnecter(alias) {
    return __awaiter(this, void 0, void 0, function* () {
        const employe = yield Employe.findOne({ where: { alias } });
        return employe ? employe.mdp : null;
    });
}
exports.seConnecter = seConnecter;
// Modifier le mdp
function modifierMotDePasse(alias, nouveauMotDePasse) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Employe.update({ mdp: nouveauMotDePasse }, { where: { alias } });
    });
}
exports.modifierMotDePasse = modifierMotDePasse;
// PROFIL
// Voir les infos
function voirInfosEmployeProfil(idEmploye) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Employe.findByPk(idEmploye);
    });
}
exports.voirInfosEmployeProfil = voirInfosEmployeProfil;
// Modif infos
function modifierInfosEmployeProfil(idEmploye, colonne, nouvelleValeur) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Employe.update({ [colonne]: nouvelleValeur }, { where: { id: idEmploye } });
    });
}
exports.modifierInfosEmployeProfil = modifierInfosEmployeProfil;
// Voir edt
function voirEdtProfil(idEmploye) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield ActiviteEdt.findAll({ where: { employe_id: idEmploye } });
    });
}
exports.voirEdtProfil = voirEdtProfil;
// AIDE
// Voir les aides
function voirAides() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Aide.findAll({ attributes: ['titre'] });
    });
}
exports.voirAides = voirAides;
// Voir une aide
function voirAide(idAide) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Aide.findByPk(idAide);
    });
}
exports.voirAide = voirAide;
// Rédiger une aide
function redigerAide(titre, corps, categorie) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Aide.create({ titre, corps, categorie });
    });
}
exports.redigerAide = redigerAide;
// Supprimer une aide
function supprimerAide(idAide) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Aide.destroy({ where: { id: idAide } });
    });
}
exports.supprimerAide = supprimerAide;
// INCIDENTS
// Voir les derniers incidents (non réglés)
function voirDerniersIncidentsNonRegles() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Incident.findAll({ where: { en_cours: true } });
    });
}
exports.voirDerniersIncidentsNonRegles = voirDerniersIncidentsNonRegles;
// Voir les derniers incidents (réglés)
function voirDerniersIncidentsRegles() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Incident.findAll({ where: { en_cours: false } });
    });
}
exports.voirDerniersIncidentsRegles = voirDerniersIncidentsRegles;
// Déclarer un incident
function declarerIncident(nom, description, niveau, idEmploye, date, heure) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Incident.create({ nom, desc: description, niveau, employe_id: idEmploye, date, heure, en_cours: true });
    });
}
exports.declarerIncident = declarerIncident;
// Gérer un incident
function gererIncident(id_incident, description, idEmploye, date, heure) {
    return __awaiter(this, void 0, void 0, function* () {
        yield SolutionIncident.create({ incident_id: id_incident, desc: description, employe_id: idEmploye, date, heure });
        yield Incident.update({ en_cours: 0 }, { where: { id: id_incident } });
    });
}
exports.gererIncident = gererIncident;
// Voir tout les incidents
function voirTousIncidents() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Incident.findAll();
    });
}
exports.voirTousIncidents = voirTousIncidents;
// Voir les détails d'un incident
function voirDetailsIncident(idIncident) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Incident.findByPk(idIncident);
    });
}
exports.voirDetailsIncident = voirDetailsIncident;
// DIRECTION
// CAISSE
// Encaisser
function encaisser(date, totalHT, TVA, idArticles, quantites) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield Transaction.create({ date, totalHT, TVA });
        for (let i = 0; i < idArticles.length; i++) {
            yield Mouvement.create({ article_id: idArticles[i], transaction_id: transaction.id, quantite: quantites[i] });
        }
    });
}
exports.encaisser = encaisser;
// Recuperer les pompes
function recupererPompe() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Pompe.findAll();
    });
}
exports.recupererPompe = recupererPompe;
// Recuperer Energie Pompe
function recupererEnergiePompe(idPompe) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Pompe.findByPk(idPompe, { include: { model: Energie } });
    });
}
exports.recupererEnergiePompe = recupererEnergiePompe;
//recuperer carteM
function recupererCarteMembre() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield CM.findAll();
    });
}
exports.recupererCarteMembre = recupererCarteMembre;
function recupererCarteCCE() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield CCE.findAll();
    });
}
exports.recupererCarteCCE = recupererCarteCCE;
// Enregistrer un paiement
function enregistrerPaiement(montant, idTransaction, idMoyenDePaiement, numCarte) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_client = yield Carte.findByPk(numCarte, { attributes: ['id_client'] });
        yield Paiement.create({ montantTotal: montant, id_transaction: idTransaction, id_moyenDePaiement: idMoyenDePaiement, id_client: id_client });
    });
}
exports.enregistrerPaiement = enregistrerPaiement;
// Imprimer une facture
// Voir historique des transactions
function voirHistoriqueTransactions() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Transaction.findAll();
    });
}
exports.voirHistoriqueTransactions = voirHistoriqueTransactions;
// Voir le détail d'une transaction
function voirDetailTransaction(idTransaction) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Transaction.findByPk(idTransaction, { include: { model: Mouvement, include: { model: Article } } });
    });
}
exports.voirDetailTransaction = voirDetailTransaction;
// STOCKAGE
// Voir les produits
function voirArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Article.findAll();
    });
}
exports.voirArticles = voirArticles;
function voirProduits(categorie) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Produit.findAll({ include: { model: Article, where: { catégorie: categorie } } });
    });
}
exports.voirProduits = voirProduits;
// Voir les énergies
function voirEnergies() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Energie.findAll({ include: { model: Article } });
    });
}
exports.voirEnergies = voirEnergies;
// Voir les réappros produit
function voirReapproProduit(categorie) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Reappro.findAll({
            include: [
                { model: Transaction, include: [{ model: Mouvement, include: { model: Produit, include: { model: Article, where: { catégorie: categorie } } } }] }
            ]
        });
    });
}
exports.voirReapproProduit = voirReapproProduit;
// Voir les réappros énergie
function voirReapproEnergie() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Reappro.findAll({
            include: [
                { model: Transaction, include: [{ model: Mouvement, include: { model: Energie, include: { model: Article } } }] }
            ]
        });
    });
}
exports.voirReapproEnergie = voirReapproEnergie;
// Modifier un article
function modifierArticle(idArticle, nouvellesValeurs) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Article.update(nouvellesValeurs, { where: { id: idArticle } });
    });
}
exports.modifierArticle = modifierArticle;
// Lancer un réappro
function lancerReappro(idArticle, quantite) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield Transaction.create({});
        yield Mouvement.create({ article_id: idArticle, transaction_id: transaction.id, quantite });
        yield Reappro.create({ id_transaction: transaction.id });
    });
}
exports.lancerReappro = lancerReappro;
// Annuler un réappro
function annulerReappro(idReappro) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Transaction.destroy({ where: { id: idReappro } });
    });
}
exports.annulerReappro = annulerReappro;
// Enregistrer la réception d'un réappro
function enregistrerReceptionReappro(idReappro) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Reappro.update({ reception: true }, { where: { id_transaction: idReappro } });
    });
}
exports.enregistrerReceptionReappro = enregistrerReceptionReappro;
// RESSOURCES HUMAINES
// Voir tout les employés
function voirTousEmployes() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Employe.findAll({ include: [Personne] });
    });
}
exports.voirTousEmployes = voirTousEmployes;
// Voir les infos
function voirInfosEmploye(idEmploye) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Employe.findByPk(idEmploye, { include: [Personne, Contact] });
    });
}
exports.voirInfosEmploye = voirInfosEmploye;
// Modif infos
function modifierInfosEmploye(idEmploye, nouvellesInfos) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Employe.update(nouvellesInfos, { where: { id: idEmploye } });
    });
}
exports.modifierInfosEmploye = modifierInfosEmploye;
// Voir edt
function voirEdt(idEmploye) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield ActiviteEdt.findAll({ where: { employe_id: idEmploye } });
    });
}
exports.voirEdt = voirEdt;
// Modif edt
function modifierEdt(idPeriode, nouvellesValeurs) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ActiviteEdt.update(nouvellesValeurs, { where: { periode_id: idPeriode } });
    });
}
exports.modifierEdt = modifierEdt;
// CLIENT / CARTE
// Voir les clients
function voirClients() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Client.findAll({ include: [Personne, Contact] });
    });
}
exports.voirClients = voirClients;
// Voir les détails d'un client
function voirDetailsClient(idClient) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Client.findByPk(idClient, { include: [Personne, Contact] });
    });
}
exports.voirDetailsClient = voirDetailsClient;
// Créer un client
function creerClient(nom, prenom, courriel, tel, adresse, codePostal, pays) {
    return __awaiter(this, void 0, void 0, function* () {
        const partenaire = yield Partenaire.create({});
        const personne = yield Personne.create({ nom, prenom, id: partenaire.id });
        yield Contact.create({ partenaire_id: partenaire.id, courriel, tel, adresse, codePostal, pays });
        yield Client.create({ id: partenaire.id });
    });
}
exports.creerClient = creerClient;
// Ajouter une carte
function ajouterCarte(idClient) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Carte.create({ client_id: idClient });
    });
}
exports.ajouterCarte = ajouterCarte;
// Supprimer un client
function supprimerClient(idClient) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Partenaire.destroy({ where: { id: idClient } });
    });
}
exports.supprimerClient = supprimerClient;
// Supprimer une carte
function supprimerCarte(numCarte) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Carte.destroy({ where: { num: numCarte } });
    });
}
exports.supprimerCarte = supprimerCarte;
// Associer une carte à un client
function associerCarteClient(numCarte, idClient) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Carte.update({ client_id: idClient }, { where: { num: numCarte } });
    });
}
exports.associerCarteClient = associerCarteClient;
// Modifier un client
function modifierClient(idClient, nouvellesInfos) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Partenaire.update(nouvellesInfos, { where: { id: idClient } });
    });
}
exports.modifierClient = modifierClient;
// CALENDRIER
// Voir les promotions
function voirPromotions() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Promo.findAll({ include: [Periode, Article] });
    });
}
exports.voirPromotions = voirPromotions;
// Voir les évènements
function voirEvenements() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Evenement.findAll({ include: [Periode] });
    });
}
exports.voirEvenements = voirEvenements;
// Créer une promotion
function creerPromotion(debut, fin, valeur, idArticle) {
    return __awaiter(this, void 0, void 0, function* () {
        const periode = yield Periode.create({ debut, fin });
        yield Promo.create({ periode_id: periode.id, article_id: idArticle, valeur });
    });
}
exports.creerPromotion = creerPromotion;
// Modifier une promotion
function modifierPromotion(idPeriode, nouvelleValeur) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promo.update({ valeur: nouvelleValeur }, { where: { periode_id: idPeriode } });
    });
}
exports.modifierPromotion = modifierPromotion;
// Créer un évènement
function creerEvenement(debut, fin, intitule) {
    return __awaiter(this, void 0, void 0, function* () {
        const periode = yield Periode.create({ debut, fin });
        yield Evenement.create({ periode_id: periode.id, intitule });
    });
}
exports.creerEvenement = creerEvenement;
// Modifier un évènement
function modifierEvenement(idPeriode, nouvelIntitule) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Evenement.update({ intitule: nouvelIntitule }, { where: { periode_id: idPeriode } });
    });
}
exports.modifierEvenement = modifierEvenement;
