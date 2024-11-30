const express = require('express')
const router = express.Router();
const responses = require('../../responseHandler/response')

const jwtService = require('../../config/jwtProvider');



 const Joi = require('joi');



const controller = require('./controller')

const schema = Joi.object({
    type: Joi.string().min(3).required(),
    quantity: Joi.number().integer().min(1).required(),
    weight: Joi.number().precision(2).positive().required()
})

const schemaUpdate = Joi.object({
    id:Joi.number().required(),
    type: Joi.string().min(3).required(),
    quantity: Joi.number().integer().min(1).required(),
    weight: Joi.number().precision(2).positive().required()
})

router.get('/getAll', async (req,res)=>{
    try{
        const token = req.header('Authorization')?.split(' ')[1]; 
        let userId = jwtService.getIdFromToken(token)
        controller.getAll(res,req,userId);
    }catch(err){
        console.log(err)
    }
})

router.get('/getFile/:id', async (req,res)=>{

})

router.post('/addFile', async (req,res)=>{
    const {error,value} =  schema.validate(req.body);

    if(error){
        return responses.error(req,res,"Campos invalidos, vuelva a intentarlo",400)
    }

    try{        
        const token = req.header('Authorization')?.split(' ')[1]; 
        let userId = jwtService.getIdFromToken(token)

        let fileSave = await controller.addFile(value, userId)
        console.warn(fileSave)
        return res.json({data:fileSave});

    }catch(err){
        console.error(err)
        return responses.error(req,res,"Ocurrio un errror",500)

    }
    
})

router.put('/updateFile', async (req,res)=>{
    const {error,value} =  schemaUpdate.validate(req.body);
    if(error){
        return responses.error(req,res,"Campos invalidos, vuelva a intentarlo",400)
    }
    try{        
        const token = req.header('Authorization')?.split(' ')[1]; 
        let userId = jwtService.getIdFromToken(token)

        let fileSave = controller.updateFile(value, userId)
        return res.json({data:fileSave});

    }catch(err){
        console.error(err)
        return responses.error(req,res,"Ocurrio un errror",500)

    }

})

router.delete('/deleteFile/:id', async (req,res)=>{
    const id = req.params.id;
    if(!id){
        return responses.error(req,res,"Envie un id",400)
    }

    try{        

        controller.deleteFile(id)
        return responses.success(req,res,"Archivo eliminado correctamente",200)


    }catch(err){
        console.error(err)
        return responses.error(req,res,"Ocurrio un errror",500)

    }
    

})




router.post('/addFiles', async (req,res)=>{




})







module.exports = router