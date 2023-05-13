const joi = require('joi')

const MANGA =joi.object({
titulo:joi.string().required().min(3),
imagem_capa:joi.string().required().min(3),
genero:joi.string().required().min(3),
leitores:joi.string().required().min(3),
})


function validateManga(req,res,next){
const {titulo, genero, imagem_capa, leitores}=req.body

const {error}=MANGA.validate({titulo, genero, imagem_capa, leitores})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validateManga;