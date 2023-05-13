const joi = require('joi')

const CAPITULO =joi.object({
titulo:joi.string().required().min(3),
num_capitulo:joi.number().required(),
id_manga:joi.number().required(),
})

function validateCapitulo(req,res,next){
const {titulo, num_capitulo, id_manga}=req.body

const {error}=CAPITULO.validate({titulo, num_capitulo, id_manga})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validateCapitulo;