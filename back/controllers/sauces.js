const Sauce = require('../models/sauce'); //importation du modèle sauce 
const fs = require('fs'); // importation package fileSystem pour supprimer des fichiers

// CRUD //
// créer une sauce
exports.createSauce = (req, res, next) => { 
    const sauceObject = JSON.parse(req.body.sauce); // récupération d'un objet utilisable
    delete sauceObject._id; // suppression du champ id (puisque généré par la base de donné)
    delete sauceObject._userId; // suppression du iserId (on utilise celui du token qui est plus sécurisé)
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0, 
        dislikes: 0, 
        usersLiked: [],
        usersDisliked: [], 
        userId: req.auth.userId, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // génération de l'url de l'image avec nom de fichier donné par multer
    });
    sauce.save() // enregistrement de la sauce
    .then(() => { res.status(201).json({message: 'Sauce enregistré !'})})
    .catch(error => { 
      res.status(400).json({error})});
 };

 // modifier une sauce
 exports.modifySauce = (req, res, next) => {  // route modifySauce 
    const sauceObject = req.file ? { //si il y a un champ file dans la requête (l'image est modifiée)
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }; // récuperation objet dans le corps de la requête
  
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id}) // recherche de l'objet dans la base de donnée
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) { // si userId est différent de celui du token, l'utilisateur essaie de modifier quelque chose qui ne lui appartient pas
                res.status(401).json({ message : 'Non autorisé !'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id}) // mise à jour enregistrement avec l'ID qui vient des paramétres de l'URL
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

// supprimer une sauce (si c'est le bon utilisateur qui en fait la demande)
 exports.deleteSauce = (req, res, next) => {  // route deleteSauce
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) { // on verifie l'userID base et Token
                res.status(401).json({message: 'Non authorisé !'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1]; // on récupère le nom de fichier
                fs.unlink(`images/${filename}`, () => { // méthode unlink pour trouver le fichier à supprimer
                    Sauce.deleteOne({_id: req.params.id}) // suppression du fichier dans la base de donnée
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

 // afficher une sauce
 exports.getOneSauce = (req, res, next) =>{ //route getOne
    Sauce.findOne({_id: req.params.id}) //methode findOne qui renvoie un tableau d'une sauce en fonction de son ID
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error})); 
};

 // afficher toutes les sauces
 exports.getAllSauces = (req, res, next) =>{ //route getAll
  console.log("hello world");
    Sauce.find() //promise qui renvoie un tableau de toutes les sauces de la bdd
    .then(sauces => {
      console.log("hello world");
      res.status(200).json(sauces)
    }) 
    .catch(error => {
      console.log(error);
      res.status(400).json({error})
      
    }); 
};

// afficher like et dislike ou annule un choix

exports.likeSauce = (req, res) => {
    /* Like de la sauce */
    console.log(req);
    if (req.body.like === 1) {
      Sauce.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
      )
        .then(() => res.status(200).json({ message: "Like ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
  
      /* Dislike de la sauce */
    } else if (req.body.like === -1) {
      Sauce.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
      )
        .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
  
      /* annule son choix like ou dislike */
    } else {
      Sauce.findOne({ _id: req.params.id }).then((resultat) => {
        if (resultat.usersLiked.includes(req.body.userId)) {
          Sauce.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
          )
            .then(() => res.status(200).json({ message: "Votre like a bien été annulé !" }))
            .catch((error) => res.status(400).json({ error }));
        } else if (resultat.usersDisliked.includes(req.body.userId)) {
          Sauce.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
          )
            .then(() => res.status(200).json({ message: "Votre dislike a bien été annulé !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      });
    }
  };