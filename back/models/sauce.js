const mongoose = require('mongoose'); // import mongoose pour communiquer avec la base de donnée

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true}, // ID de l'utilisateur qui a créé la sauce
    name: {type: String, required: true},// Nom de la sauce
    manufacturer: {type: String, required: true}, // Fabricant de la sauce
    description: {type: String, required: true}, // Description de la sauce
    mainPepper: {type: String, required: true}, // Principale épice de la sauce
    imageUrl: {type: String, required: true}, // URL de l'image téléchargée par l'user
    heat: {type: Number, required: true}, // Nombre entre 1 et 10 décrivant la sauce
    likes: {type: Number, required: true}, // Nombre d'utilisateurs qui ont liké la sauce
    dislikes: {type: Number, required: true},// Nombre d'utilisateurs qui ont disliké la sauce
    usersLiked: {type: [String], required: true}, // Tableau des identifiants de ceux qui ont liké
    usersDisliked: {type: [String], required: true} // Tableau des identifiants de ceux qui ont disliké
});

module.exports = mongoose.model('Sauce', sauceSchema);