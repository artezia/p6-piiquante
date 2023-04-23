const express = require('express'); // constante pour importer express
const mongoose = require('mongoose'); // constante pour importer Mongoose
const dotenv = require('dotenv'); // constante pour importer le module de sécurité dotenv
dotenv.config();
const path = require('path'); //constante path pour gérer les chemins de fichiers
const helmet = require('helmet'); // import module sécurité helmet pour entêtes http

const userRoutes = require('./routes/user'); //importation du routeur user
const saucesRoutes = require('./routes/sauces'); // importation du routeur sauces

const app = express(); // creation de l'application
app.use(express.json()); // analyser le corps de la requête
app.use(helmet());// utilisation d'helmet 

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://' + process.env.user + ':' + process.env.password + '@' + process.env.bd + '.mongodb.net/' + '?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// middleware pour le traitement des erreurs de CORS de toutes toutes les requêtes du serveur (use)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy','cross-origin') 
  res.setHeader('Access-Control-Allow-Origin', '*'); // * tout le monde peut acceder à  l'API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // autorisation de headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // autorisation de méthodes
  next();
});


// principaux accès 
app.use('/api/sauces', saucesRoutes); // enregristrement du routeur pour les demandes CRUD sauces
app.use('/api/auth', userRoutes); // enregistrement du routeur pour l'authentification
app.use('/images', express.static(path.join(__dirname, 'images'))); // middleware static fournit par express pour obtenir le chemin complet pour l'image

module.exports = app; // exporter l'application pour y acceder depuis le serveur node