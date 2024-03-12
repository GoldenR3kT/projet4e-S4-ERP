import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// chemin absolu vers le dossier 'html'
const htmlPath = path.join(__dirname, 'src', 'html');
const cssPath = path.join(__dirname, 'assets', 'css');


// On indique à Express d'utiliser le moteur de vue ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/css', express.static(cssPath));


//dossier des vues à utiliser
app.set('views', htmlPath);
// Gérer les requêtes GET à la racine


app.get('/', (req, res) => {
    res.sendFile(path.join(htmlPath, 'index.html'));
});

// Gérer les requêtes GET pour chaque page
app.get('/cash_desk', (req, res) => {
    res.sendFile(path.join(htmlPath, 'cash_desk', 'cash_desk.html'));
});

app.get('/customer_cards', (req, res) => {
    res.sendFile(path.join(htmlPath, 'customer_cards', 'customer_cards.html'));
});

app.get('/help', (req, res) => {
    res.sendFile(path.join(htmlPath, 'help', 'help.html'));
});

app.get('/human_resources', (req, res) => {
    res.sendFile(path.join(htmlPath, 'human_resources', 'human_resources.html'));
});

app.get('/incidents', (req, res) => {
    res.sendFile(path.join(htmlPath, 'incidents', 'incidents.html'));
});

app.get('/management', (req, res) => {
    res.sendFile(path.join(htmlPath, 'management', 'management.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(htmlPath, 'profile', 'profile.html'));
});

app.get('/schedule', (req, res) => {
    res.sendFile(path.join(htmlPath, 'schedule', 'schedule.html'));
});

app.get('/storage', (req, res) => {
    res.sendFile(path.join(htmlPath, 'storage', 'storage.html'));
});

app.get('/topbar', (req, res) => {
    res.sendFile(path.join(htmlPath, 'top-bar.html'));
});

app.get('/navigation', (req, res) =>{
    res.sendFile(path.join(htmlPath, 'navigation.html'))
});

// On lance le serveur sur le port 3000
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});