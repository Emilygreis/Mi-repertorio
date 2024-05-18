const express = require('express');
const path = require('path');
const { insertarCancion, editarCancion, borrarCancion, consultarCanciones } = require('./consultas');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/cancion', async (req, res) => {
  const { titulo, artista, tono } = req.body;
  try {
    await insertarCancion(titulo, artista, tono);
    res.json({ mensaje: 'Canción insertada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al insertar la canción' });
  }
});

app.get('/canciones', async (req, res) => {
  try {
    const canciones = await consultarCanciones();
    res.json(canciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al obtener las canciones' });
  }
});

app.put('/cancion/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, artista, tono } = req.body;
  try {
    await editarCancion(id, titulo, artista, tono);
    res.json({ mensaje: 'Canción editada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al editar la canción' });
  }
});

app.delete('/cancion', async (req, res) => {
  const { id } = req.query;
  try {
    await borrarCancion(id);
    res.json({ mensaje: 'Canción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al eliminar la canción' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`El servidor está corriendo en el puerto ${puerto}`);
});