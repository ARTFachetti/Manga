const express = require('express');
const connection = require('../DB/connection');
const validateManga = require("../middlewares/validateManga")

const route = express.Router();

route.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * FROM mangas');
  
  res.status(200).json(result);
})

route.post('/', validateManga, async (req, res) => {
  const { titulo, genero, imagem_capa, leitores } = req.body;

  const [result] = await connection.execute(
    'INSERT INTO mangas( titulo, genero, imagem_capa, leitores) VALUES(?, ?, ?, ?)', [ titulo, genero, imagem_capa, leitores] 
  );

  const newPlayer = {
    id: result.insertId,
    titulo,
    genero,
    imagem_capa,
    leitores
  }

  res.status(201).json(newPlayer);
})

route.put('/:id', validateManga, async (req, res) => {
    const { titulo, genero, imagem_capa, leitores } = req.body;
  const { id } = req.params;

  const updatedPlayer = await connection.execute(`
  UPDATE mangas
  SET titulo = ?, genero = ? , imagem_capa = ?, leitores = ?
  WHERE id = ?`, [titulo, genero, imagem_capa, leitores, id]);

  const newPlayer = {
    id,
    titulo,
    genero,
    imagem_capa,
    leitores
  }

  res.status(200).json(newPlayer);
})

route.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await connection.execute(`
    DELETE FROM mangas
    WHERE id = ?
  `, [id])

  res.status(204).send();
});



module.exports = route