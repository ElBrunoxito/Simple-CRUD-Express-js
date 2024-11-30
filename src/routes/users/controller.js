const pool = require('../../db/postgresql')
const bcrypt = require('bcryptjs'); 
const responses = require('../../responseHandler/response')

const jwtService = require('../../config/jwtProvider');



const TABLA = 'users'

async function login(data,res, req){
    const result = await pool.query(`SELECT * FROM ${TABLA} WHERE username = $1`, [data.username]);
    const user = result.rows[0];
    if (!user) {
        return responses.error(req,res,"Usuario no encontrado",400)
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        return responses.error(req,res,"Contraseña incorrecta",400)
    }
    //console.log("TOKEN GENERADO A PARTIR:  " + process.env.JWT_SECRET)

    const token = jwtService.generateToken(user.id, user.username);
    
    
    responses.success(req,res,{message: 'Inicio de sesión exitoso', token},200)
  

}

async function register(data){
    const encriptPassword = await bcrypt.hash(data.password, 10); 

    const query = `INSERT INTO ${TABLA} (username, password) VALUES ($1, $2) RETURNING *`;
    const values = [data.username, encriptPassword];
  
    try {
      const res = await pool.query(query, values);
      return res.rows[0]; // Devuelve el usuario creado
    } catch (err) {
      console.error('Error al registrar el usuario:', err);
      throw err;
    }

}



module.exports = {
    login,
    register
}