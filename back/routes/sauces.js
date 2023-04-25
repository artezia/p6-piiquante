const express = require('express'); // import d'express pour créer le router
const router = express.Router(); 
const auth = require('../middleware/auth'); //importation du middleware d'authentification
const multer = require('../middleware/multer-config'); //importation du middleware d'ajout de photo
const saucesController = require ('../controllers/sauces'); // import du controller pour associer les fonctions aux différentes routes

router.post('/', auth, multer, saucesController.createSauce);// créer une sauce
router.put('/:id', auth, multer, saucesController.modifySauce);// modifier une sauce
router.delete('/:id', auth, saucesController.deleteSauce); // supprimer une sauce
router.get('/:id', auth, saucesController.getOneSauce);// obtenir une sauce en fonction de son id
router.get('/', auth, saucesController.getAllSauces);// obtenir toutes les sauces
router.post('/:id/like', auth, saucesController.likeSauce);// créer un like ou dislike

module.exports = router;// export router sauces