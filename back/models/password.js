const passwordValidator = require("password-validator"); // importation package password validator

const passwordSchema = new passwordValidator(); // création du schéma pour le mot de passe

passwordSchema
  .is().min(8) // Minimum 8 caractères
  .is().max(20) // Maximum 18 caractères
  .has().uppercase(1) // doit contenir une lettre majuscule
  .has().lowercase() // doit contenir une lettre minuscule
  .has().digits(1) // doit contenir un chiffre
  .has().not().spaces() // pas d'espace
  .is().not().oneOf(["Passw0rd", "Password123", "M0nm0tdepasse"]); // valeurs interdites

module.exports = passwordSchema; // exportation du schèma
