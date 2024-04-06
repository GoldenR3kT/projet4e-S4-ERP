import express from 'express';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import {Sequelize} from "sequelize";

const app = express();
const port = 3000;

// chemin absolu vers le dossier 'html'
const htmlPath = path.join(__dirname, 'src', 'html');
const cssPath = path.join(__dirname, 'assets', 'css');

// On indique à Express d'utiliser le moteur de vue ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/css', express.static(cssPath));


//Parser JSON
app.use(express.json());

// Serve TypeScript files from the 'ts' directory
const tsPath = path.join(__dirname, 'src', 'ts');
app.use('/ts', express.static(tsPath));

  
  // Route to handle JavaScript file requests
  app.get('/ts/:dir/:file', (req, res) => {
    const { dir, file } = req.params;
    const jsFilePath = path.join(__dirname, 'src', 'js', dir, `${file}.js`);
  
    // Check if the JavaScript file exists
    fs.access(jsFilePath, fs.constants.F_OK, (err) => {
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
    res.sendFile(path.join(htmlPath, 'index.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(htmlPath, 'forgot-password.html'));
});// Gérer les requêtes GET pour chaque page


//CASHDESK
app.get('/cash_desk', (req, res) => {
    res.sendFile(path.join(htmlPath, 'cash_desk', 'cash_desk.html'));
});

app.get('/cash_desk/overview', (req, res) => {
    res.sendFile(path.join(htmlPath, 'cash_desk', 'overview.html'));
});

app.get('/cash_desk/invoicelist', (req, res) => {
    res.sendFile(path.join(htmlPath, 'cash_desk', 'invoice-list.html'));
});

app.get('/cash_desk/transaction', (req, res) => {
    res.sendFile(path.join(htmlPath, 'cash_desk', 'transaction-history.html'));
});



//CUSTOMER/CARDS
app.get('/customer_cards', (req, res) => {
    res.sendFile(path.join(htmlPath, 'customer_cards', 'customer_cards.html'));
});


//HELP
app.get('/help', (req, res) => {
    res.sendFile(path.join(htmlPath, 'help', 'help.html'));
});


//HUMAN RESOURCES
app.get('/human_resources', (req, res) => {
    res.sendFile(path.join(htmlPath, 'human_resources', 'human_resources.html'));
});


//INCIDENTS
app.get('/incidents', (req, res) => {
    res.sendFile(path.join(htmlPath, 'incidents', 'incidents.html'));
});

app.get('/incidents/announce', (req, res) => {
    res.sendFile(path.join(htmlPath, 'incidents', 'announce_incident.html'));
});

app.get('/incidents/adjust', (req, res) => {
    res.sendFile(path.join(htmlPath, 'incidents', 'adjust_incident.html'));
});


//MANAGEMENT
app.get('/management', (req, res) => {
    res.sendFile(path.join(htmlPath, 'management', 'management.html'));
});


//PROFILE
app.get('/profile', (req, res) => {
    res.sendFile(path.join(htmlPath, 'profile', 'profile.html'));
});

app.get('/profile-modification', (req, res) => {
    res.sendFile(path.join(htmlPath, 'profile', 'profile-modification.html'));
});

//SCEDULE
app.get('/schedule', (req, res) => {
    res.sendFile(path.join(htmlPath, 'schedule', 'schedule.html'));
});

app.get('/schedule/event', (req, res) => {
    res.sendFile(path.join(htmlPath, 'schedule', 'event.html'));
});


//STORAGE
app.get('/storage', (req, res) => {
    res.sendFile(path.join(htmlPath, 'storage', 'storage.html'));
});

app.get('/storage/fournisseurs', (req, res) => {
    res.sendFile(path.join(htmlPath, 'storage', 'fournisseurs.html'));
});



//TEMPORARY
app.get('/topbar', (req, res) => {
    res.sendFile(path.join(htmlPath, 'top-bar.html'));
});

app.get('/navigation', (req, res) =>{
    res.sendFile(path.join(htmlPath, 'navigation.html'))
});

app.get('/topbar-incidents', (req, res) =>{
    res.sendFile(path.join(htmlPath, 'top-bar-incidents.html'))
});

// On lance le serveur sur le port 3000
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});




//API DB

import * as db from './src/ts/database/db_queries'

app.post('/seConnecter', async (req, res) => {
    const alias = req.body.alias;
    try {
      const mdp = await db.seConnecter(alias);
      res.send({ mdp });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
});


// Modifier le mdp
app.put('/modifierMotDePasse', async (req, res) => {
    const alias = req.body.alias;
    const nouveauMotDePasse = req.body.nouveauMotDePasse;
    try {
      await db.modifierMotDePasse(alias, nouveauMotDePasse);
      res.send({ message: 'Mot de passe modifié avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir les infos
  app.get('/voirInfosEmployeProfil/:idEmploye', async (req, res) => {
    const idEmploye = +req.params.idEmploye;
    try {
      const employe = await db.voirInfosEmployeProfil(idEmploye);
      res.send(employe);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Modif infos
  app.put('/modifierInfosEmployeProfil', async (req, res) => {
    const idEmploye = req.body.idEmploye;
    const colonne = req.body.colonne;
    const nouvelleValeur = req.body.nouvelleValeur;
    try {
      await db.modifierInfosEmployeProfil(idEmploye, colonne, nouvelleValeur);
      res.send({ message: 'Informations modifiées avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir edt
  app.get('/voirEdtProfil/:idEmploye', async (req, res) => {
    const idEmploye = +req.params.idEmploye;
    try {
      const edt = await db.voirEdtProfil(idEmploye);
      res.send(edt);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir les aides
  app.get('/voirAides', async (req, res) => {
    try {
      const aides = await db.voirAides();
      res.send(aides);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir une aide
  app.get('/voirAide/:idAide', async (req, res) => {
    const idAide = +req.params.idAide;
    try {
      const aide = await db.voirAide(idAide);
      res.send(aide);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Rédiger une aide
  app.post('/redigerAide', async (req, res) => {
    const titre = req.body.titre;
    const corps = req.body.corps;
    const categorie = req.body.categorie;
    try {
      await db.redigerAide(titre, corps, categorie);
      res.send({ message: 'Aide rédigée avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Supprimer une aide
  app.delete('/supprimerAide/:idAide', async (req, res) => {
    const idAide = +req.params.idAide;
    try {
      await db.supprimerAide(idAide);
      res.send({ message: 'Aide supprimée avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
// Voir les derniers incidents (non réglés)
app.get('/voirDerniersIncidentsNonRegles', async (req, res) => {
    try {
      const incidents = await db.voirDerniersIncidentsNonRegles();
      res.send(incidents);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Déclarer un incident
  app.post('/declarerIncident', async (req, res) => {
    const nom = req.body.nom;
    const description = req.body.description;
    const niveau = req.body.niveau;
    const idEmploye = req.body.idEmploye;
    const date = req.body.date;
    const heure = req.body.heure;
    try {
      await db.declarerIncident(nom, description, niveau, idEmploye, date, heure);
      res.send({ message: 'Incident déclaré avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Gérer un incident
  app.post('/gererIncident', async (req, res) => {
    const description = req.body.description;
    const idEmploye = req.body.idEmploye;
    const date = req.body.date;
    const heure = req.body.heure;
    try {
      await db.gererIncident(description, idEmploye, date, heure);
      res.send({ message: 'Incident géré avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir tout les incidents
  app.get('/voirTousIncidents', async (req, res) => {
    try {
      const incidents = await db.voirTousIncidents();
      res.send(incidents);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir les détails d'un incident
  app.get('/voirDetailsIncident/:idIncident', async (req, res) => {
    const idIncident = +req.params.idIncident;
    try {
      const incident = await db.voirDetailsIncident(idIncident);
      res.send(incident);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // CAISSE
  
  // Encaisser
  app.post('/encaisser', async (req, res) => {
    const date = req.body.date;
    const totalHT = req.body.totalHT;
    const TVA = req.body.TVA;
    const idArticles = req.body.idArticles;
    const quantites = req.body.quantites;
    try {
      await db.encaisser(date, totalHT, TVA, idArticles, quantites);
      res.send({ message: 'Encaissement effectué avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Enregistrer un paiement
  app.post('/enregistrerPaiement', async (req, res) => {
    const montant = req.body.montant;
    const idTransaction = req.body.idTransaction;
    const idMoyenDePaiement = req.body.idMoyenDePaiement;
    const idClient = req.body.idClient;
    try {
      await db.enregistrerPaiement(montant, idTransaction, idMoyenDePaiement, idClient);
      res.send({ message: 'Paiement enregistré avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
// Voir historique des transactions
app.get('/voirHistoriqueTransactions', async (req, res) => {
    try {
      const transactions = await db.voirHistoriqueTransactions();
      res.send(transactions);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir le détail d'une transaction
  app.get('/voirDetailTransaction/:idTransaction', async (req, res) => {
    const idTransaction = +req.params.idTransaction;
    try {
      const transaction = await db.voirDetailTransaction(idTransaction);
      res.send(transaction);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // STOCKAGE
  
  // Voir les produits
  app.get('/voirProduits/:categorie', async (req, res) => {
    const categorie = req.params.categorie;
    try {
      const produits = await db.voirProduits(categorie);
      res.send(produits);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir les énergies
  app.get('/voirEnergies', async (req, res) => {
    try {
      const energies = await db.voirEnergies();
      res.send(energies);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir les réappros produit
  app.get('/voirReapproProduit/:categorie', async (req, res) => {
    const categorie = req.params.categorie;
    try {
      const reappros = await db.voirReapproProduit(categorie);
      res.send(reappros);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir les réappros énergie
  app.get('/voirReapproEnergie/:categorie', async (req, res) => {
    const categorie = req.params.categorie;
    try {
      const reappros = await db.voirReapproEnergie(categorie);
      res.send(reappros);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Modifier un article
  app.put('/modifierArticle', async (req, res) => {
    const idArticle = req.body.idArticle;
    const nouvellesValeurs = req.body.nouvellesValeurs;
    try {
      await db.modifierArticle(idArticle, nouvellesValeurs);
      res.send({ message: 'Article modifié avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Lancer un réappro
  app.post('/lancerReappro', async (req, res) => {
    const idArticle = req.body.idArticle;
    const quantite = req.body.quantite;
    try {
      await db.lancerReappro(idArticle, quantite);
      res.send({ message: 'Réappro lancé avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Annuler un réappro
  app.delete('/annulerReappro/:idReappro', async (req, res) => {
    const idReappro = +req.params.idReappro;
    try {
      await db.annulerReappro(idReappro);
      res.send({ message: 'Réappro annulé avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
// Enregistrer la réception d'un réappro
app.put('/enregistrerReceptionReappro/:idReappro', async (req, res) => {
    const idReappro = +req.params.idReappro;
    try {
      await db.enregistrerReceptionReappro(idReappro);
      res.send({ message: 'Réception du réappro enregistrée avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // RESSOURCES HUMAINES
  
  // Voir tout les employés
  app.get('/voirTousEmployes', async (req, res) => {
    try {
      const employes = await db.voirTousEmployes();
      res.send(employes);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir les infos
  app.get('/voirInfosEmploye/:idEmploye', async (req, res) => {
    const idEmploye = +req.params.idEmploye;
    try {
      const employe = await db.voirInfosEmploye(idEmploye);
      res.send(employe);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Modif infos
  app.put('/modifierInfosEmploye', async (req, res) => {
    const idEmploye = req.body.idEmploye;
    const nouvellesInfos = req.body.nouvellesInfos;
    try {
      await db.modifierInfosEmploye(idEmploye, nouvellesInfos);
      res.send({ message: 'Informations de l\'employé modifiées avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir edt
  app.get('/voirEdt/:idEmploye', async (req, res) => {
    const idEmploye = +req.params.idEmploye;
    try {
      const edt = await db.voirEdt(idEmploye);
      res.send(edt);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Modif edt
  app.put('/modifierEdt', async (req, res) => {
    const idPeriode = req.body.idPeriode;
    const nouvellesValeurs = req.body.nouvellesValeurs;
    try {
      await db.modifierEdt(idPeriode, nouvellesValeurs);
      res.send({ message: 'EDT modifié avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // CLIENT / CARTE
  
  // Voir les clients
  app.get('/voirClients', async (req, res) => {
    try {
      const clients = await db.voirClients();
      res.send(clients);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir les détails d'un client
  app.get('/voirDetailsClient/:idClient', async (req, res) => {
    const idClient = +req.params.idClient;
    try {
      const client = await db.voirDetailsClient(idClient);
      res.send(client);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
// Créer un client
app.post('/creerClient', async (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const courriel = req.body.courriel;
    const tel = req.body.tel;
    const adresse = req.body.adresse;
    const codePostal = req.body.codePostal;
    const pays = req.body.pays;
    try {
      await db.creerClient(nom, prenom, courriel, tel, adresse, codePostal, pays);
      res.send({ message: 'Client créé avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Ajouter une carte
  app.post('/ajouterCarte', async (req, res) => {
    const idClient = req.body.idClient;
    try {
      await db.ajouterCarte(idClient);
      res.send({ message: 'Carte ajoutée avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Supprimer un client
  app.delete('/supprimerClient/:idClient', async (req, res) => {
    const idClient = +req.params.idClient;
    try {
      await db.supprimerClient(idClient);
      res.send({ message: 'Client supprimé avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Supprimer une carte
  app.delete('/supprimerCarte/:numCarte', async (req, res) => {
    const numCarte = +req.params.numCarte;
    try {
      await db.supprimerCarte(numCarte);
      res.send({ message: 'Carte supprimée avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Associer une carte à un client
  app.put('/associerCarteClient', async (req, res) => {
    const numCarte = req.body.numCarte;
    const idClient = req.body.idClient;
    try {
      await db.associerCarteClient(numCarte, idClient);
      res.send({ message: 'Carte associée au client avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Modifier un client
  app.put('/modifierClient', async (req, res) => {
    const idClient = req.body.idClient;
    const nouvellesInfos = req.body.nouvellesInfos;
    try {
      await db.modifierClient(idClient, nouvellesInfos);
      res.send({ message: 'Informations du client modifiées avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // CALENDRIER
  
  // Voir les promotions
  app.get('/voirPromotions', async (req, res) => {
    try {
      const promotions = await db.voirPromotions();
      res.send(promotions);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Voir les évènements
  app.get('/voirEvenements', async (req, res) => {
    try {
      const evenements = await db.voirEvenements();
      res.send(evenements);
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Créer une promotion
  app.post('/creerPromotion', async (req, res) => {
    const debut = req.body.debut;
    const fin = req.body.fin;
    const valeur = req.body.valeur;
    const idArticle = req.body.idArticle;
    try {
      await db.creerPromotion(debut, fin, valeur, idArticle);
      res.send({ message: 'Promotion créée avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
// Modifier une promotion
app.put('/modifierPromotion', async (req, res) => {
    const idPeriode = req.body.idPeriode;
    const nouvelleValeur = req.body.nouvelleValeur;
    try {
      await db.modifierPromotion(idPeriode, nouvelleValeur);
      res.send({ message: 'Promotion modifiée avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Créer un évènement
  app.post('/creerEvenement', async (req, res) => {
    const debut = req.body.debut;
    const fin = req.body.fin;
    const intitule = req.body.intitule;
    try {
      await db.creerEvenement(debut, fin, intitule);
      res.send({ message: 'Évènement créé avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  
  // Modifier un évènement
  app.put('/modifierEvenement', async (req, res) => {
    const idPeriode = req.body.idPeriode;
    const nouvelIntitule = req.body.nouvelIntitule;
    try {
      await db.modifierEvenement(idPeriode, nouvelIntitule);
      res.send({ message: 'Évènement modifié avec succès' });
    } catch (error) {
      res.status(500).send({ error: 'Une erreur est survenue' });
    }
  });
  

