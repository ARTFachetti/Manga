const express = require("express");
const manga = require ("./routes/manga");
const capitulos = require ("./routes/capitulos");
const paginas = require ("./routes/paginas");

const app = express ()

app.use(express.json())

app.use ('/manga',manga)
app.use ('/capitulos',capitulos)
app.use ('/paginas',paginas)

module.exports = {
    app,
}
