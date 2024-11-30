
const express = require('express')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT ?? 3000
const morgan = require('morgan');

const authenticateToken = require('../config/authMiddleware');


const AUTH_ROUTES = require('../routes/users/auth');
const FILE_ROUTES = require('../routes/files/files');


//Cors
app.use(cors())

//MIDDLEWARE
app.use(morgan('dev'))
app.use(express.json())




//ROUTES
app.use('/auth',AUTH_ROUTES)
app.use('/files',authenticateToken,FILE_ROUTES) 
//app.use('/files',FILE_ROUTES) 









app.listen(PORT, ()=>{
    console.log("RUN EXPRESS " + PORT)
});


