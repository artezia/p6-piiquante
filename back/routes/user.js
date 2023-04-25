const express = require('express'); // importation d'express pour créer le routeur
const router = express.Router(); 
const passwordCheck = require('../middleware/password');//importation du middleware password
const userController = require('../controllers/user'); //importation du controller pour associer les fonctions aux différentes routes

router.post('/signup', passwordCheck, userController.signup); // route création nouvel utilisateur
router.post('/login', userController.login); // route connexion utilisateur

module.exports = router; 