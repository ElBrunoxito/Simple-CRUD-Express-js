const express = require('express')
const router = express.Router();
const responses = require('../../responseHandler/response')

const Joi = require('joi');


const controller = require('./controller')

const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required()
})

router.post('/login', async (req,res)=>{
    //let items = await controller.getAll()
    const {error,value} =  schema.validate(req.body);

    if(error){
        return responses.error(req,res,"Campos invalidos, vuelva a intentarlo",400)
    }

    try{
        controller.login(value,res,req)
        .then((respon)=>{
        return respon 
        })

    }catch(err){
        return responses.error(req,res,"Error interno del servidor",500)


    }

    //responses.success(req,res,items,200)



})

router.post('/register',async (req,res)=>{
    
    const {error,value} =  schema.validate(req.body);

    if(error){
        return responses.error(req,res,"Campos no validos",400)
    }

    const created = controller.register(value);

    //console.log("creaed" + created)
    responses.success(req,res,`Usuario ${req.body.username} creado correctamente`,200)

    
    //let items = await controller.register()


})



module.exports = router