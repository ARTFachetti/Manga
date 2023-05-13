const express = require('express');
const connection = require('../DB/connection');
const validateCapitulo = require('../middlewares/validateCapitulo')

const route = express.Router();

route.get('/', async (req, res) => {
  const [result] = await connection.execute('SELECT * FROM capitulos');
  
  res.status(200).json(result);
})
//CONTEM ERRO NO POST, PERGUNTAR AO PROFESSOR PRA CORRIGIR
route.post('/', validateCapitulo, async (req, res) => {
  const {  titulo, num_capitulo, id_manga } = req.body;

  const [result] = await connection.execute(
    'INSERT INTO capitulos(titulo, num_capitulo, id_manga) VALUES(?, ?, ?)', [ titulo, num_capitulo, id_manga] 
  );

  const newPlayer = {
    id: result.insertId,
    titulo,
    num_capitulo,
    id_manga
  }

  res.status(201).json(newPlayer);
})

route.put('/:id',validateCapitulo, async (req, res) => {
    const { titulo, num_capitulo, id_manga } = req.body;
  const { id } = req.params;

  const updatedPlayer = await connection.execute(`
  UPDATE capitulos
  SET titulo = ?, num_capitulo = ? , id_manga = ?
  WHERE id = ?`, [titulo, num_capitulo, id_manga, id]);

  const newPlayer = {
    id,
    titulo,
    num_capitulo,
    id_manga
  }

  res.status(200).json(newPlayer);
})

route.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await connection.execute(`
    DELETE FROM capitulos
    WHERE id = ?
  `, [id])

  res.status(204).send();
});



module.exports = route