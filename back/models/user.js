const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({ // utilisation fonction schema de mongoose
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // applique le validator au schéma

module.exports = mongoose.model('User', userSchema); // exportation du schéma sous forme de modèle