const { Pool } = require('pg');

const pool = new Pool({
  user: 'emily',
  host: 'localhost',
  database: 'emily_mi_repertorio_637',
  password: '12345678',
  port: 5432,
});

const insertarCancion = async (titulo, artista, tono) => {
  try {
    const res = await pool.query({
      text: 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)',
      values: [titulo, artista, tono],
    });
    return res;
  } catch (error) {
    console.log(error);
    return 'Hubo un error al insertar la canción';
  }
};

const editarCancion = async (id, titulo, artista, tono) => {
  try {
    const res = await pool.query({
      text: 'UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4',
      values: [titulo, artista, tono, id],
    });
    return res;
  } catch (error) {
    console.log(error);
    return 'Hubo un error al editar la canción';
  }
};

const borrarCancion = async (id) => {
  try {
    const res = await pool.query({
      text: 'DELETE FROM canciones WHERE id = $1',
      values: [id],
    });
    return res;
  } catch (error) {
    console.log(error);
    return 'Hubo un error al borrar la canción';
  }
};

const consultarCanciones = async () => {
  try {
    const { rows } = await pool.query({
      text: 'SELECT * FROM canciones ORDER BY id',
    });
    return rows;
  } catch (error) {
    console.log(error);
    return 'Hubo un error al consultar las canciones';
  }
};

module.exports = {
  insertarCancion,
  editarCancion,
  borrarCancion,
  consultarCanciones,
};