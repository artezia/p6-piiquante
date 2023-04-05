const express = require('express'); // constante pour importer express
const mongoose = require('mongoose'); // constante pour importer Mongoose
const dotenv = require('dotenv'); // constante pour importer le module de sécurité dotenv
dotenv.config();


// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://' + process.env.user + ':' + process.env.password + '@' + process.env.bd + '.mongodb.net/' + '?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // application
app.use(express.json()); // analyser le corps de la requête

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // * tout le monde peut acceder à  l'API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // autorisation de headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // autorisation de méthodes
  next();
});

app.use((req, res, next) => { // middleware
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;

module.exports = app; // exporter l'application pour y acceder depuis le serveur node