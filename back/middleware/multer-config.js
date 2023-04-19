const multer = require('multer'); // import de multer 

const MIME_TYPES = { // extensions autorisées
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // objet de configuration de multer pour enregistrer les images
  destination: (req, file, callback) => { // dossier ou enregistrer les fichiers
    callback(null, 'images'); // null indique qu'il n'y a pas eut d'erreur à ce niveau la
  },
  filename: (req, file, callback) => { // génération d'un nouveau nom de fichier
    const name = file.originalname.split(' ').join('_');  // on elimine les espaces en les remplacant par un underscore _
        const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); // appel du callback, argument null pas d'erreur, timestamp pour rendre le nom unique
  }
});

module.exports = multer({storage: storage}).single('image'); // export du middleware multer