const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

function generateToken(id,username) {
  const payload = { id, username }; 
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
}

function isTokenValid(token) {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

function getIdFromToken(token) {
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded.id; 
}

module.exports = {
  generateToken,
  isTokenValid,
  getIdFromToken,
};
