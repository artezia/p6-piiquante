const http = require('http'); // importation du package http de node pour créer un serveur
const app = require('./app'); // importation de l'application express
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // importation du package dotenv pour stocker les variables d'environnement
dotenv.config(); //fonction pour configurer dotenv


const normalizePort = val => { // renvoi un port valide (fonction normalize)
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || '3000'); // Déclaration du port sur lequel on souhaite que l'application tourne
  app.set('port', port);
  
  const errorHandler = error => { // gère les erreurs du serveur
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  const server = http.createServer(app); // Création du serveur pour gérer les req/res de l'app (méthode createServer du package http)
  
  server.on('error', errorHandler); // Connexion au port
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
  
  server.listen(port); // à l'écoute du port défini