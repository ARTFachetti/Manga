const express = require('express');
const connection = require('../DB/connection');
const validatePaginas = require ('../middlewares/validatePaginas')
const route = express.Router();

route.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * FROM paginas');
  
  res.status(200).json(result);
})
//CONTEM ERRO NO POST, PERGUNTAR AO PROFESSOR PRA CORRIGIR
route.post('/',validatePaginas, async (req, res) => {
  const {num_pagina, imagem, id_capitulo } = req.body;

  const [result] = await connection.execute(
    'INSERT INTO paginas( num_pagina, imagem, id_capitulo) VALUES(?, ?, ?)', [num_pagina, imagem, id_capitulo] 
  );

  const newPlayer = {
    id: result.insertId,
    num_pagina,
    imagem,
    id_capitulo
  }

  res.status(201).json(newPlayer);
})

route.put('/:id',validatePaginas, async (req, res) => {
    const {num_pagina, imagem, id_capitulo } = req.body;
  const { id } = req.params;

  const updatedPlayer = await connection.execute(`
  UPDATE paginas
   num_pagina = ? , imagem, id_capitulo = ?
  WHERE id = ?`, [num_pagina, imagem, id_capitulo, id]);

  const newPlayer = {
    id,
    num_pagina,
    imagem,
    id_capitulo,
  }

  res.status(200).json(newPlayer);
})

route.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await connection.execute(`
    DELETE FROM paginas
    WHERE id = ?
  `, [id])

  res.status(204).send();
});



module.exports = route