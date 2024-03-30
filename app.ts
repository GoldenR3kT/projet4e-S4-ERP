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
