# projet4E

Installation des dépendances
```bash
npm install
```

Installation TypeScript
```bash
npm install -D typescript
```

Lancement du serveur 
```bash
npm run start
```

Compilation des fichier Typescript
```bash
tsc --project .
```
ou
```bash
tsc -p .
```


# API BDD

## Connexion

- `POST /seConnecter` : Se connecter en utilisant un alias.
  - Requête :
    ```json
    {
      "alias": "string"
    }
    ```
  - Réponse :
    ```json
    {
      "mdp": "string"
    }
    ```

## Modification du mot de passe

- `PUT /modifierMotDePasse` : Modifier le mot de passe en utilisant un alias et un nouveau mot de passe.
  - Requête :
    ```json
    {
      "alias": "string",
      "nouveauMotDePasse": "string"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Mot de passe modifié avec succès"
    }
    ```

## Informations employé

- `GET /voirInfosEmployeProfil/:idEmploye` : Voir les informations d'un employé en utilisant son ID.
  - Réponse :
    ```json
    {
      "idEmploye": "number",
      "nom": "string",
      "prenom": "string",
      "courriel": "string",
      "tel": "string",
      "adresse": "string",
      "codePostal": "string",
      "ville": "string",
      "pays": "string"
    }
    ```

- `PUT /modifierInfosEmployeProfil` : Modifier les informations d'un employé en utilisant son ID, la colonne à modifier et la nouvelle valeur.
  - Requête :
    ```json
    {
      "idEmploye": "number",
      "colonne": "string",
      "nouvelleValeur": "string"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Informations modifiées avec succès"
    }
    ```

## EDT (Emploi du Temps)

- `GET /voirEdtProfil/:idEmploye` : Voir l'EDT d'un employé en utilisant son ID.
  - Réponse :
    ```json
    [
      {
        "idPeriode": "number",
        "idEmploye": "number",
        "jour": "string",
        "heureDebut": "string",
        "heureFin": "string"
      }
    ]
    ```

## Aides

- `GET /voirAides` : Voir toutes les aides.
  - Réponse :
    ```json
    [
      {
        "idAide": "number",
        "titre": "string",
        "corps": "string",
        "categorie": "string"
      }
    ]
    ```

- `GET /voirAide/:idAide` : Voir une aide en utilisant son ID.
  - Réponse :
    ```json
    {
      "idAide": "number",
      "titre": "string",
      "corps": "string",
      "categorie": "string"
    }
    ```

- `POST /redigerAide` : Rédiger une aide en utilisant un titre, un corps et une catégorie.
  - Requête :
    ```json
    {
      "titre": "string",
      "corps": "string",
      "categorie": "string"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Aide rédigée avec succès"
    }
    ```

- `DELETE /supprimerAide/:idAide` : Supprimer une aide en utilisant son ID.
  - Réponse :
    ```json
    {
      "message": "Aide supprimée avec succès"
    }
    ```

## Incidents

- `GET /voirDerniersIncidentsNonRegles` : Voir les derniers incidents non réglés.
  - Réponse :
    ```json
    [
      {
        "idIncident": "number",
        "nom": "string",
        "description": "string",
        "niveau": "string",
        "idEmploye": "number",
        "date": "string",
        "heure": "string",
        "regle": "boolean"
      }
    ]
    ```

- `POST /declarerIncident` : Déclarer un incident en utilisant un nom, une description, un niveau, un ID employé, une date et une heure.
  - Requête :
    ```json
    {
      "nom": "string",
      "description": "string",
      "niveau": "string",
      "idEmploye": "number",
      "date": "string",
      "heure": "string"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Incident déclaré avec succès"
    }
    ```

- `POST /gererIncident` : Gérer un incident en utilisant une description, un ID employé, une date et une heure.
  - Requête :
    ```json
    {
      "description": "string",
      "idEmployé": "number",
      "date": "string",
      "heure": "string"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Incident géré avec succès"
    }
    ```

- `GET /voirTousIncidents` : Voir tous les incidents.
  - Réponse :
    ```json
    [
      {
        "idIncident": "number",
        "nom": "string",
        "description": "string",
        "niveau": "string",
        "idEmploye": "number",
        "date": "string",
        "heure": "string",
        "regle": "boolean"
      }
    ]
    ```

- `GET /voirDetailsIncident/:idIncident` : Voir les détails d'un incident en utilisant son ID.
  - Réponse :
    ```json
    {
      "idIncident": "number",
      "nom": "string",
      "description": "string",
      "niveau": "string",
      "idEmploye": "number",
      "date": "string",
      "heure": "string",
      "regle": "boolean"
    }
    ```

## Caisse

- `POST /encaisser` : Encaisser en utilisant une date, un total HT, une TVA, des ID articles et des quantités.
  - Requête :
    ```json
    {
      "date": "string",
      "totalHT": "number",
      "TVA": "number",
      "idArticles": "array",
      "quantites": "array"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Encaissement effectué avec succès"
    }
    ```

- `POST /enregistrerPaiement` : Enregistrer un paiement en utilisant un montant, un ID transaction, un ID moyen de paiement et un ID client.
  - Requête :
    ```json
    {
      "montant": "number",
      "idTransaction": "number",
      "idMoyenDePaiement": "number",
      "idClient": "number"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Paiement enregistré avec succès"
    }
    ```

- `GET /voirHistoriqueTransactions` : Voir l'historique des transactions.
  - Réponse :
    ```json
    [
      {
        "idTransaction": "number",
        "date": "string",
        "totalHT": "number",
        "TVA": "number",
        "idClient": "number"
      }
    ]
    ```

- `GET /voirDetailTransaction/:idTransaction` : Voir le détail d'une transaction en utilisant son ID.
  - Réponse :
    ```json
    {
      "idTransaction": "number",
      "date": "string",
      "totalHT": "number",
      "TVA": "number",
      "idClient": "number"
    }
    ```

## Stockage

- `GET /voirProduits/:categorie` : Voir les produits d'une catégorie.
  - Réponse :
    ```json
    [
      {
        "idArticle": "number",
        "nom": "string",
        "description": "string",
        "prixHT": "number",
        "TVA": "number",
        "stock": "number",
        "categorie": "string"
      }
    ]
    ```

- `GET /voirEnergies` : Voir les énergies.
  - Réponse :
    ```json
    [
      {
        "idEnergie": "number",
        "nom": "string",
        "description": "string",
        "prixHT": "number",
        "TVA": "number",
        "stock": "number"
      }
    ]
    ```

- `GET /voirReapproProduit/:categorie` : Voir les réapprovisionnements des produits d'une catégorie.
  - Réponse :
    ```json
    [
      {
        "idReappro": "number",
        "idArticle": "number",
        "quantite": "number",
        "date": "string",
        "heure": "string",
        "recu": "boolean"
      }
    ]
    ```

- `GET /voirReapproEnergie/:categorie` : Voir les réapprovisionnements des énergies d'une catégorie.
  - Réponse :
    ```json
    [
      {
        "idReappro": "number",
        "idEnergie": "number",
        "quantite": "number",
        "date": "string",
        "heure": "string",
        "recu": "boolean"
      }
    ]
    ```

- `PUT /modifierArticle` : Modifier un article en utilisant son ID et de nouvelles valeurs.
  - Requête :
    ```json
    {
      "idArticle": "number",
      "nouvellesValeurs": "object"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Article modifié avec succès"
    }
    ```

- `POST /lancerReappro` : Lancer un réapprovisionnement en utilisant un ID article et une quantité.
  - Requête :
    ```json
    {
      "idArticle": "number",
      "quantite": "number"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Réappro lancé avec succès"
    }
    ```

- `DELETE /annulerReappro/:idReappro` : Annuler un réapprovisionnement en utilisant son ID.
  - Réponse :
    ```json
    {
      "message": "Réappro annulé avec succès"
    }
    ```

- `PUT /enregistrerReceptionReappro/:idReappro` : Enregistrer la réception d'un réapprovisionnement en utilisant son ID.
  - Réponse :
    ```json
    {
      "message": "Réception du réappro enregistrée avec succès"
    }
    ```

## Ressources Humaines

- `GET /voirTousEmployes` : Voir tous les employés.
  - Réponse :
    ```json
    [
      {
        "idEmploye": "number",
        "nom": "string",
        "prenom": "string",
        "courriel": "string",
        "tel": "string",
        "adresse": "string",
        "codePostal": "string",
        "ville": "string",
        "pays": "string"
      }
    ]
    ```

- `GET /voirInfosEmploye/:idEmploye` : Voir les informations d'un employé en utilisant son ID.
  - Réponse :
    ```json
    {
      "idEmploye": "number",
      "nom": "string",
      "prenom": "string",
      "courriel": "string",
      "tel": "string",
      "adresse": "string",
      "codePostal": "string",
      "ville": "string",
      "pays": "string"
    }
    ```

- `PUT /modifierInfosEmploye` : Modifier les informations d'un employé en utilisant son ID et de nouvelles informations.
  - Requête :
    ```json
    {
      "idEmploye": "number",
      "nouvellesInfos": "object"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Informations de l'employé modifiées avec succès"
    }
    ```

- `GET /voirEdt/:idEmploye` : Voir l'EDT d'un employé en utilisant son ID.
  - Réponse :
    ```json
    [
      {
        "idPeriode": "number",
        "idEmploye": "number",
        "jour": "string",
        "heureDebut": "string",
        "heureFin": "string"
      }
    ]
    ```

- `PUT /modifierEdt` : Modifier l'EDT en utilisant un ID période et de nouvelles valeurs.
  - Requête :
    ```json
    {
      "idPeriode": "number",
      "nouvellesValeurs": "object"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "EDT modifié avec succès"
    }
    ```

## Client / Carte

- `GET /voirClients` : Voir tous les clients.
  - Réponse :
    ```json
    [
      {
        "idClient": "number",
        "nom": "string",
        "prenom": "string",
        "courriel": "string",
        "tel": "string",
        "adresse": "string",
        "codePostal": "string",
        "pays": "string"
      }
    ]
    ```

- `GET /voirDetailsClient/:idClient` : Voir les détails d'un client en utilisant son ID.
  - Réponse :
    ```json
    {
      "idClient": "number",
      "nom": "string",
      "prenom": "string",
      "courriel": "string",
      "tel": "string",
      "adresse": "string",
      "codePostal": "string",
      "pays": "string"
    }
    ```

- `POST /creerClient` : Créer un client en utilisant un nom, un prénom, un courriel, un téléphone, une adresse, un code postal et un pays.
  - Requête :
    ```json
    {
      "nom": "string",
      "prenom": "string",
      "courriel": "string",
      "tel": "string",
      "adresse": "string",
      "codePostal": "string",
      "pays": "string"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Client créé avec succès"
    }
    ```

- `POST /ajouterCarte` : Ajouter une carte à un client en utilisant son ID.
  - Requête :
    ```json
    {
      "idClient": "number"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Carte ajoutée avec succès"
    }
    ```

- `DELETE /supprimerClient/:idClient` : Supprimer un client en utilisant son ID.
  - Réponse :
    ```json
    {
      "message": "Client supprimé avec succès"
    }
    ```

- `DELETE /supprimerCarte/:numCarte` : Supprimer une carte en utilisant son numéro.
  - Réponse :
    ```json
    {
      "message": "Carte supprimée avec succès"
    }
    ```

- `PUT /associerCarteClient` : Associer une carte à un client en utilisant le numéro de la carte et l'ID du client.
  - Requête :
    ```json
    {
      "numCarte": "number",
      "idClient": "number"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Carte associée au client avec succès"
    }
    ```

- `PUT /modifierClient` : Modifier un client en utilisant son ID et de nouvelles informations.
  - Requête :
    ```json
    {
      "idClient": "number",
      "nouvellesInfos": "object"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Informations du client modifiées avec succès"
    }
    ```

## Calendrier

- `GET /voirPromotions` : Voir les promotions.
  - Réponse :
    ```json
    [
      {
        "idPeriode": "number",
        "debut": "string",
        "fin": "string",
        "valeur": "number",
        "idArticle": "number"
      }
    ]
    ```

- `GET /voirEvenements` : Voir les événements.
  - Réponse :
    ```json
    [
      {
        "idPeriode": "number",
        "debut": "string",
        "fin": "string",
        "intitule": "string"
      }
    ]
    ```

- `POST /creerPromotion` : Créer une promotion en utilisant une date de début, une date de fin, une valeur et un ID article.
  - Requête :
    ```json
    {
      "debut": "string",
      "fin": "string",
      "valeur": "number",
      "idArticle": "number"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Promotion créée avec succès"
    }
    ```

- `PUT /modifierPromotion` : Modifier une promotion en utilisant un ID période et une nouvelle valeur.
  - Requête :
    ```json
    {
      "idPeriode": "number",
      "nouvelleValeur": "number"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Promotion modifiée avec succès"
    }
    ```

- `POST /creerEvenement` : Créer un événement en utilisant une date de début, une date de fin et un intitulé.
  - Requête :
    ```json
    {
      "debut": "string",
      "fin": "string",
      "intitule": "string"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Évènement créé avec succès"
    }
    ```

- `PUT /modifierEvenement` : Modifier un événement en utilisant un ID période et un nouvel intitulé.
  - Requête :
    ```json
    {
      "idPeriode": "number",
      "nouvelIntitule": "string"
    }
    ```
  - Réponse :
    ```json
    {
      "message": "Évènement modifié avec succès"
    }
    ```