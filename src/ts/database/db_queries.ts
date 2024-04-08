const models = require("./db_models");

const Sequelize = require('sequelize');

const {
    Partenaire,
    Personne,
    Contact,
    Fournisseur,
    Client,
    Transaction,
    MoyenDePaiement,
    Paiement,
    Article,
    Energie,
    Produit,
    Menu,
    ProduitMenu,
    Pompe,
    Mouvement,
    Carte,
    CM,
    CCE,
    GestionCce,
    Bonus,
    CceBonus,
    Employe,
    Periode,
    ActiviteEdt,
    Promo,
    Evenement,
    Incident,
    SolutionIncident,
    Aide,
    AchatClient,
    Reappro
} = models;

// AUTHENTIFICATION

// Se connecter
export async function seConnecter(alias: string): Promise<string> {
    const employe = await Employe.findOne({ where: { alias } });
    return employe ? employe.mdp : null;
}

// Modifier le mdp
export async function modifierMotDePasse(alias: string, nouveauMotDePasse: string): Promise<void> {
    await Employe.update({ mdp: nouveauMotDePasse }, { where: { alias } });
}

// PROFIL

// Voir les infos
export async function voirInfosEmployeProfil(idEmploye: number): Promise<typeof Employe | null> {
    return await Employe.findByPk(idEmploye);
}

// Modif infos
export async function modifierInfosEmployeProfil(idEmploye: number, colonne: string, nouvelleValeur: any): Promise<void> {
    await Employe.update({ [colonne]: nouvelleValeur }, { where: { id: idEmploye } });
}

// Voir edt
export async function voirEdtProfil(idEmploye: number): Promise<typeof ActiviteEdt[]> {
    return await ActiviteEdt.findAll({ where: { employe_id: idEmploye } });
}

// AIDE

// Voir les aides
export async function voirAides(): Promise<typeof Aide[]> {
    return await Aide.findAll({ attributes: ['titre'] });
}

// Voir une aide
export async function voirAide(idAide: number): Promise<typeof Aide | null> {
    return await Aide.findByPk(idAide);
}

// Rédiger une aide
export async function redigerAide(titre: string, corps: string, categorie: string): Promise<void> {
    await Aide.create({ titre, corps, categorie });
}

// Supprimer une aide
export async function supprimerAide(idAide: number): Promise<void> {
    await Aide.destroy({ where: { id: idAide } });
}

// INCIDENTS

// Voir les derniers incidents (non réglés)
export async function voirDerniersIncidentsNonRegles(): Promise<typeof Incident[]> {
    return await Incident.findAll({ where: { en_cours: true } });
}

// Voir les derniers incidents (réglés)
export async function voirDerniersIncidentsRegles(): Promise<typeof Incident[]> {
    return await Incident.findAll({ where: { en_cours: false } });
}

// Déclarer un incident
export async function declarerIncident(nom: string, description: string, niveau: string, idEmploye: number, date: Date, heure: string): Promise<void> {
    await Incident.create({ nom, desc: description, niveau, employe_id: idEmploye, date, heure, en_cours: true });
}

// Gérer un incident
export async function gererIncident(id_incident: number, description: string, idEmploye: number, date: Date, heure: string): Promise<void> {
    await SolutionIncident.create({ incident_id: id_incident, desc: description, employe_id: idEmploye, date, heure });
    await Incident.update({ en_cours: 0 }, { where: { id: id_incident } });
}

// Voir tout les incidents
export async function voirTousIncidents(): Promise<typeof Incident[]> {
    return await Incident.findAll();
}

// Voir les détails d'un incident
export async function voirDetailsIncident(idIncident: number): Promise<typeof Incident | null> {
    return await Incident.findByPk(idIncident);
}

// DIRECTION

// CAISSE

// Encaisser
export async function encaisser(date: Date, totalHT: number, TVA: number, idArticles: number[], quantites: number[]): Promise<void> {
    const transaction = await Transaction.create({ date, totalHT, TVA });
    for (let i = 0; i < idArticles.length; i++) {
        await Mouvement.create({ article_id: idArticles[i], transaction_id: transaction.id, quantite: quantites[i] });
    }
}

// Recuperer les pompes
export async function recupererPompe(): Promise<typeof Pompe[]> {
    return await Pompe.findAll();
}

// changer etat pompe

export async function changerEtatPompe(idPompe: number, statut: string): Promise<void> {
    await Pompe.update({ statut }, { where: { id: idPompe } });
}

//recuperer carteM

export async function recupererCarteMembre(): Promise<typeof CM[]> {
    return await CM.findAll();
}
export async function recupererCarteCCE(): Promise<typeof CCE[]> {
    return await CCE.findAll();
}

// Enregistrer un paiement
export async function enregistrerPaiement(montant: number, idTransaction: number, idMoyenDePaiement: number, numCarte: number): Promise<void> {
    const id_client = await Carte.findByPk(numCarte, { attributes: ['id_client'] });
    await Paiement.create({ montantTotal: montant, id_transaction: idTransaction, id_moyenDePaiement: idMoyenDePaiement, id_client: id_client });
}

// Imprimer une facture

// Voir historique des transactions
export async function voirHistoriqueTransactions(): Promise<typeof Transaction[]> {
    return await Transaction.findAll();
}

// Voir le détail d'une transaction
export async function voirDetailTransaction(idTransaction: number): Promise<typeof Transaction | null> {
    return await Transaction.findByPk(idTransaction, { include: { model: Mouvement, include: { model: Article } } });
}

// STOCKAGE

// Voir les produits

export async function voirArticles(): Promise<typeof Article[]> {
    return await Article.findAll();
}

export async function voirProduits(categorie: string): Promise<typeof Produit[]> {
    return await Produit.findAll({ include: { model: Article }, where: { catégorie: categorie } });
}

// Voir les énergies
export async function voirEnergies(): Promise<typeof Energie[]> {
    return await Energie.findAll({ include: { model: Article } });
}

// Voir les réappros produit
export async function voirReapproProduit(categorie: string): Promise<typeof Reappro[]> {
    return await Reappro.findAll({
            include: [
              {
                model: Transaction,
                include: [
                  {
                    model: Mouvement,
                    include: [
                      {
                        model: Article,
                        include: [
                          {
                            model: Produit,
                            where: {
                              catégorie: categorie
                            },
                          }
                        ]
                      }
                    ]
                  }
                ],
                // Ajoutez cette condition pour filtrer les réappros correspondants
                where: Sequelize.literal(`EXISTS (
                  SELECT 1
                  FROM mouvement
                  JOIN article ON mouvement.article_id = article.id
                  JOIN produit ON article.id = produit.id
                  WHERE reappro.id_transaction = transaction.id
                  AND mouvement.transaction_id = transaction.id
                  AND produit.catégorie = '${categorie}'
                )`)
              }
            ]
          });
}

// Voir les réappros énergie
export async function voirReapproEnergie(): Promise<typeof Reappro[]> {
    return await Reappro.findAll({
        include: [
            { model: Transaction, include: [{ model: Mouvement, include: { model: Article, include: { model: Energie} } }] }
        ]
    });
}

// Modifier un article
export async function modifierArticle(idArticle: number, nouvellesValeurs: Partial<typeof Article>): Promise<void> {
    await Article.update(nouvellesValeurs, { where: { id: idArticle } });
}

// Lancer un réappro
export async function lancerReappro(date: Date, totalHT: number, TVA: number, idArticle: number, quantite: number): Promise<void> {
    const transaction = await Transaction.create({ date, totalHT, TVA });
    await Mouvement.create({ article_id: idArticle, transaction_id: transaction.id, quantite });
    await Reappro.create({ id_transaction: transaction.id });
}

// Annuler un réappro
export async function annulerReappro(idReappro: number): Promise<void> {
    await Transaction.destroy({ where: { id: idReappro } });
}

// Enregistrer la réception d'un réappro
export async function enregistrerReceptionReappro(idReappro: number): Promise<void> {
    await Reappro.update({ reception: true }, { where: { id_transaction: idReappro } });
}

// RESSOURCES HUMAINES

// Voir tout les employés
export async function voirTousEmployes(): Promise<typeof Employe[]> {
    return await Employe.findAll({ include: [Personne] });
}

// Voir les infos
export async function voirInfosEmploye(idEmploye: number): Promise<typeof Employe | null> {
    return await Employe.findByPk(idEmploye, { include: [
        { model: Personne, include: [ { model: Partenaire, include: [ { model: Contact,} ]} ]} ]} );
}

// Modif infos
export async function modifierInfosEmploye(idEmploye: number, nouvellesInfos: Partial<typeof Employe>): Promise<void> {
    await Employe.update(nouvellesInfos, { where: { id: idEmploye } });
}

// Voir edt
export async function voirEdt(idEmploye: number): Promise<typeof ActiviteEdt[]> {
    return await ActiviteEdt.findAll({ where: { employe_id: idEmploye } });
}

// Modif edt
export async function modifierEdt(idPeriode: number, nouvellesValeurs: Partial<typeof ActiviteEdt>): Promise<void> {
    await ActiviteEdt.update(nouvellesValeurs, { where: { periode_id: idPeriode } });
}

// CLIENT / CARTE

// Voir les clients
export async function voirClients(): Promise<typeof Client[]> {
    return await Client.findAll({ include: [
        { model: Personne, include: [ { model: Partenaire, include: [ { model: Contact,} ]} ]} ]} );
}

// Voir les détails d'un client
export async function voirDetailsClient(idClient: number): Promise<typeof Client | null> {
    return await Client.findByPk(idClient, { include: [
        { model: Personne, include: [ { model: Partenaire, include: [ { model: Contact,} ]} ]} ]} );
}

// Créer un client
export async function creerClient(nom: string, prenom: string, courriel: string, tel: string, adresse: string, codePostal: string, pays: string): Promise<void> {
    const partenaire = await Partenaire.create({});
    const personne = await Personne.create({ nom, prenom, id: partenaire.id });
    await Contact.create({ partenaire_id: partenaire.id, courriel, tel, adresse, codePostal, pays });
    await Client.create({ id: partenaire.id });
}

// Ajouter une carte
export async function ajouterCarte(idClient: number): Promise<void> {
    await Carte.create({ client_id: idClient });
}

// Supprimer un client
export async function supprimerClient(idClient: number): Promise<void> {
    await Partenaire.destroy({ where: { id: idClient } });
}

// Supprimer une carte
export async function supprimerCarte(numCarte: number): Promise<void> {
    await Carte.destroy({ where: { num: numCarte } });
}

// Associer une carte à un client
export async function associerCarteClient(numCarte: number, idClient: number): Promise<void> {
    await Carte.update({ client_id: idClient }, { where: { num: numCarte } });
}

// Modifier un client
export async function modifierClient(idClient: number, nouvellesInfos: Partial<typeof Client>): Promise<void> {
    await Partenaire.update(nouvellesInfos, { where: { id: idClient } });
}

// CALENDRIER

// Voir les promotions
export async function voirPromotions(): Promise<typeof Promo[]> {
    return await Promo.findAll({ include: [Periode, Article] });
}

// Voir les évènements
export async function voirEvenements(): Promise<typeof Evenement[]> {
    return await Evenement.findAll({ include: [Periode] });
}

// Créer une promotion
export async function creerPromotion(debut: Date, fin: Date, valeur: number, idArticle: number): Promise<void> {
    const periode = await Periode.create({ debut, fin });
    await Promo.create({ periode_id: periode.id, article_id: idArticle, valeur });
}

// Modifier une promotion
export async function modifierPromotion(idPeriode: number, nouvelleValeur: number): Promise<void> {
    await Promo.update({ valeur: nouvelleValeur }, { where: { periode_id: idPeriode } });
}

// Créer un évènement
export async function creerEvenement(debut: Date, fin: Date, intitule: string): Promise<void> {
    const periode = await Periode.create({ debut, fin });
    await Evenement.create({ periode_id: periode.id, intitule });
}

// Modifier un évènement
export async function modifierEvenement(idPeriode: number, nouvelIntitule: string): Promise<void> {
    await Evenement.update({ intitule: nouvelIntitule }, { where: { periode_id: idPeriode } });
}
