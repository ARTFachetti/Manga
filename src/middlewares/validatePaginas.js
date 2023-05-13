const joi = require('joi')

const PAGINAS =joi.object({
num_pagina:joi.number().required(),
imagem:joi.string().required().min(3),
id_capitulo:joi.number().required(),
})

function validatePaginas(req,res,next){
const {num_pagina, imagem, id_capitulo,}=req.body

const {error}=PAGINAS.validate({num_pagina, imagem, id_capitulo,})

if(error){
    next({status:400,message:error.details[0].message});
}

next();
}
module.exports = validatePaginas;

