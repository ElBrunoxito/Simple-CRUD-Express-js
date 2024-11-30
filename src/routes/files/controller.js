const pool = require('../../db/postgresql')
const bcrypt = require('bcryptjs'); 
const responses = require('../../responseHandler/response')



const TABLE_FILE = 'file'
//const TABLE_USER = 'users'

async function getAll(res, req, id){

    //const resultUser = await pool.query(`SELECT * FROM ${TABLE_USER} WHERE username = $1`, [data.username]);
    //const user = resultUser.rows[0];

    const resultFiles = await pool.query(`SELECT * FROM ${TABLE_FILE} F WHERE F.user_id =${id}`)

    const files = resultFiles.rows;

    responses.success(req,res,{files},200)

}

async function addFile(data,userId){


    const query = `INSERT INTO ${TABLE_FILE} (weight, type, quantity, user_id) VALUES ($1, $2, $3,$4) RETURNING *`;
    const values = [data.weight, data.type, data.quantity, userId];
      
    try {
        const res = await pool.query(query, values);
        return res.rows[0]; 

    } catch (err) {
        throw err;
    }

}


async function updateFile(data,userId) {
    const query = `UPDATE ${TABLE_FILE} SET weight = $1, type = $2, quantity=$3, user_id=$4 WHERE id=$5 RETURNING *`;
    const values = [data.weight, data.type, data.quantity, userId,data.id];
      
    try {
        const res = await pool.query(query, values);
        return res.rows[0]; 

    } catch (err) {
        throw err;
    }

}

async function deleteFile(id){
    const query = `DELETE FROM ${TABLE_FILE} WHERE id=$1`;
    const values = [id];
      
    try {
        await pool.query(query, values);

    } catch (err) {
        throw err;
    }
}



module.exports = {
    getAll,
    addFile,
    updateFile,
    deleteFile
}