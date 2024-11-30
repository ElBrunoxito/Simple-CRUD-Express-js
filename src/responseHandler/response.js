exports.success = function(req,res,message,status){
    const statusCode = status || 200
    const messageOk = message || 'Nada'
    res.status(statusCode).send({
        error:false,
        status:statusCode,
        body:messageOk
    });
}


exports.error = function(req,res,message,status){
    const statusCode = status || 500
    const messageErr = message || 'Error 500'
    res.status(statusCode).send({
        error:true,
        status:status,
        body:messageErr
    });
}
