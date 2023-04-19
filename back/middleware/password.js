const passwordSchema = require("../models/password"); // importation du schèma pour le mot de passe

//Fonction pour vérifier le mot de passe
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
      res.writeHead(
        400,
        "Votre mot de passe doit compoter entre 8 et 20 caractères dont un chiffre et une majuscule. Espaces non autorisés",
        {
          "content-type": "application/json",
        }
      );
      res.end("Format invalide du mot de passe.");
    } else {
      next();
    }
  };

// var regex = /^[^@&"()!<>.$*€£`+=\/;?#]+$/
// passwordSchema.replace(regex, '_');
