const jwt = require('jsonwebtoken'); // import jsonWebToken
const dotenv = require('dotenv'); // importation des variables d'environnement
dotenv.config();

// export du middleware d'authentification
module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]; // diviser la chaine de caractère en un tableau (Bearer / token)
        const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY); // méthode verify (token et clé secrete)
        const userId = decodedToken.userId; // récupération du userId encodé dans le token
        req.auth ={ // objet req transmis aux routes avec userID
            userId: userId
        };
        next(); 
    } catch(error){
        res.status(401).json({error});
    }
};