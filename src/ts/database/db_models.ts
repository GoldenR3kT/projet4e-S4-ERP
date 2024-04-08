import { timeStamp } from "console";

const { DataTypes, Model, Sequelize } = require('sequelize');

//CONFIG BDD
const { host, dialect, database, username, password } = require("./dbconfig.json");

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const Partenaire = sequelize.define('partenaire', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

const Personne = sequelize.define('personne', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Personne.belongsTo(Partenaire, { foreignKey: 'id' });

const Contact = sequelize.define('contact', {
  partenaire_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  courriel: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tel: DataTypes.STRING(10),
  adresse: DataTypes.STRING(255),
  codePostal: DataTypes.STRING(5),
  pays: DataTypes.STRING(100)
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Contact.belongsTo(Partenaire, { foreignKey: 'partenaire_id' });

const Fournisseur = sequelize.define('fournisseur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Fournisseur.belongsTo(Partenaire, { foreignKey: 'id' });

const Client = sequelize.define('client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Client.belongsTo(Personne, { foreignKey: 'id' });

const Transaction = sequelize.define('transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalHT: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  TVA: DataTypes.DOUBLE
});

const MoyenDePaiement = sequelize.define('moyenDePaiement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
});

const Paiement = sequelize.define('paiement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  montantTotal: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Paiement.belongsTo(Transaction, { foreignKey: 'id_transaction' });
Paiement.belongsTo(MoyenDePaiement, { foreignKey: 'id_moyenDePaiement' });
Paiement.belongsTo(Client, { foreignKey: 'id_client' });

const Article = sequelize.define('article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  quantite: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  seuil_alerte: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  prixHT: DataTypes.DOUBLE,
  prixTTC: DataTypes.DOUBLE
});

const Energie = sequelize.define('energie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  unite: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Energie.belongsTo(Article, { foreignKey: 'id' });

const Produit = sequelize.define('produit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  image: DataTypes.STRING(100),
  catégorie: DataTypes.STRING(20)
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Produit.belongsTo(Article, { foreignKey: 'id' });

const Menu = sequelize.define('menu', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

const ProduitMenu = sequelize.define('produitMenu', {
  id_menu: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_produit: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

ProduitMenu.belongsTo(Menu, { foreignKey: 'id_menu' });
ProduitMenu.belongsTo(Produit, { foreignKey: 'id_produit' });

const Pompe = sequelize.define('pompe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  emplacement: DataTypes.INTEGER,
  stockage_max: DataTypes.INTEGER,
  statut: DataTypes.STRING(40)

}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Pompe.belongsTo(Energie, { foreignKey: 'id_energie' });

const Mouvement = sequelize.define('mouvement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantite: DataTypes.INTEGER
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Mouvement.belongsTo(Article, { foreignKey: 'article_id' });
Mouvement.belongsTo(Transaction, { foreignKey: 'transaction_id' });

const Carte = sequelize.define('carte', {
  num: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Carte.belongsTo(Client, { foreignKey: 'client_id' });

const CM = sequelize.define('cm', {
  num: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  ptsMembre: DataTypes.INTEGER
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

CM.belongsTo(Carte, { foreignKey: 'num' });

const CCE = sequelize.define('cce', {
  num: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  credit: DataTypes.DOUBLE,
  dernierCredit: DataTypes.DATE,
  montantDernierCredit: DataTypes.DOUBLE
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

CCE.belongsTo(Carte, { foreignKey: 'num' });

const GestionCCE = sequelize.define('gestion_cce', {
  cce: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  montantMin: DataTypes.DOUBLE
});

const Bonus = sequelize.define('bonus', {
  trancheBonus: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  valeurBonus: DataTypes.DOUBLE
});

const CceBonus = sequelize.define('cce_bonus', {
  cce: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  trancheBonus: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

CceBonus.belongsTo(Bonus, { foreignKey: 'trancheBonus' });

const Employe = sequelize.define('employe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  alias: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  mdp: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  dep: DataTypes.STRING(100),
  poste: DataTypes.STRING(100),
  rang: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Employe.belongsTo(Personne, { foreignKey: 'id' });

const Periode = sequelize.define('periode', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dateDebut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateFin: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

const ActiviteEdt = sequelize.define('activite_edt', {
  employe_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  periode_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  intitule: DataTypes.STRING(255)
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

ActiviteEdt.belongsTo(Employe, { foreignKey: 'employe_id' });
ActiviteEdt.belongsTo(Periode, { foreignKey: 'periode_id' });

const Promo = sequelize.define('promo', {
  periode_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  article_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  valeur: DataTypes.DOUBLE
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Promo.belongsTo(Periode, { foreignKey: 'periode_id' });
Promo.belongsTo(Article, { foreignKey: 'article_id' });

const Evenement = sequelize.define('evenement', {
  periode_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  intitule: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Evenement.belongsTo(Periode, { foreignKey: 'periode_id' });

const Incident = sequelize.define('incident', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  desc: DataTypes.STRING(100),
  niveau: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  heure: {
    type: DataTypes.TIME,
    allowNull: false
  },
  en_cours: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Incident.belongsTo(Employe, { foreignKey: 'employe_id' });

const SolutionIncident = sequelize.define('solution_incident', {
  incident_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  desc: DataTypes.STRING(100),
  date: DataTypes.DATE
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

SolutionIncident.belongsTo(Incident, { foreignKey: 'incident_id' });
SolutionIncident.belongsTo(Employe, { foreignKey: 'employe_id' });

const Aide = sequelize.define('aide', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  corps: DataTypes.STRING(100),
  categorie: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
});

const AchatClient = sequelize.define('achatClient', {
  id_transaction: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_client: DataTypes.INTEGER
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

AchatClient.belongsTo(Transaction, { foreignKey: 'id_transaction' });
AchatClient.belongsTo(Client, { foreignKey: 'id_client' });

const Reappro = sequelize.define('reappro', {
  id_transaction: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_fournisseur: DataTypes.INTEGER,
  annulable: DataTypes.BOOLEAN,
  reception: DataTypes.BOOLEAN
}, {
  foreignKeyConstraints: true,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Reappro.belongsTo(Transaction, { foreignKey: 'id_transaction' });
Reappro.belongsTo(Fournisseur, { foreignKey: 'id_fournisseur' });


module.exports = {
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
    GestionCCE,
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
};