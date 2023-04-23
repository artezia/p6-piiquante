const bcrypt = require('bcrypt'); // importation de bcrypt pour hasher les mots de passe
const jwt = require('jsonwebtoken'); // importation de JsonWebToken pour les tokens d'authentification
const dotenv = require('dotenv'); // importation des variables d'environnement
dotenv.config();
const User = require('../models/user'); // importation du modèle utilisateur

// middleware inscription nouvel utilisateur
exports.signup = (req, res, next) => { 
    console.log(req.body),
bcrypt.hash(req.body.password, 10) // 10 tours de l'algorithme pour sécuriser
.then(hash => { // recupération du mot de passe crypté
    console.log(hash)
    const user = new User ({ // enregistrement dans la base de donnée avec un nouvel user
        email: req.body.email, // adresse email fournit dans le corps de la requête
        password: hash // mot de passe crypé
    });
    console.log(user);
    User.save() //enregistrement dans la base de donnée
    .then(() => res.status(201).json({message: 'Utilisateur créé !'})) // 201 pour une création de ressource
    .catch(error => {
        console.log(error);
        return res.status(500).json({ error })}
        );
})
.catch(error => res.status(500).json({ error }));
};

// middleware connexion utilisateur
exports.login = (req, res, next) => { 
    User.findOne({email: req.body.email}) // méthode findOne pour récupérer la saisie de l'email
    .then(user => {
        if (user === null) {
            res.status(401).json({message: 'Paire identifiant/ mot de passe incorrecte'}) // 401 Unauthorized - message erreur user non enregistré
        } else {
            bcrypt.compare(req.body.password, user.password) // fonction compare pour comparer le mot de passe)
            .then(valid => {
                if (!valid) { // si mot de passe non valide
                    res.status(400).json({message: 'Paire identifiant/ mot de passe incorrecte' })
                } else {
                    res.status(200).json({ // objet avec user ID et un token
                        userId: user._id,
                        // fonction sign de jsonWebToken
                        token: jwt.sign(  
                          { userId: user._id }, //données que l'on veut encoder à l'intérieur du token (payload)
                          process.env.JWTPRIVATEKEY, // utilisation de la clé secrete pour encodage - chaine de caractère pour securiser l'encodage
                          { expiresIn: '2h'} // expiration du token de 2 heures
                        )
                    });
                }
            })
            .catch(error => {
                res.status(500).json({error}); // erreur de traitement
            })
        }
    })
    .catch(error => {
        res.status(500).json({error}); // erreur serveur
    })
};