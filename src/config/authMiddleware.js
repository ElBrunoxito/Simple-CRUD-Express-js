
const jwtService = require('../config/jwtProvider');


const SECRET_KEY = process.env.SECRET_KEY

const authenticateToken = (req, res, next) => {
  //const token = req.headers['authorization']
  const token = req.header('Authorization')?.split(' ')[1]; 
  //console.log("TOKEN PRO : "+ token)

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado' });
  }


    if(jwtService.isTokenValid(token)){
      next(); 
    }else{
      //console.log("ERROR AL VERIFICAR TOKEN")
      return res.status(403).json({ error: 'Token no valido o expirado' });

    }

};

module.exports = authenticateToken;