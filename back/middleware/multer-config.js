const multer = require('multer'); // import de multer 

const MIME_TYPES ={ // extensions autorisées
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

const storage = multer.diskStorage({ // objet de configuration de multer pour enregistrer les images
    destination: (req, file, callback) =>{ // dossier ou enregistrer les fichiers
        callback(null, 'images') // null indique qu'il n'y a pas eut d'erreur à ce niveau la
    },
    filename: (req, file, callback) =>{ // génération d'un nouveau nom de fichier
        const name = file.originalname.split(' ').join('_'); // on elimine les espaces en les remplacant par un underscore _
        const extension = MIME_TYPES[file.mimetype]; 
        callback(null, name + Date.now() + '.' + extension); // appel du callback, argument null pas d'erreur, timestamp pour rendre le nom unique
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }, 
    fileFilter: function (req, file, callback) {
        if(MIME_TYPES.hasOwnProperty(file.mimetype)) { // (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
            callback(null, true);
        } else {
            callback(null, false);
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
     },
 });


module.exports = upload.single('image');// export du middleware multer