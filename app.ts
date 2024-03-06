import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// chemin absolu vers le dossier 'html'
const htmlPath = path.join(__dirname, 'src', 'html');

// On indique à Express d'utiliser le moteur de vue ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//dossier des vues à utiliser
app.set('views', htmlPath);

// Gérer les requêtes GET à la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(htmlPath, 'index.html'));
});

// Gérer les requêtes GET pour la route "cash_desk"
app.get('/cash_desk', (req, res) => {
    res.sendFile(path.join(htmlPath+"/cash_desk", 'cash_desk.html'));
});


//On lance le serveur sur le port 3000
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
