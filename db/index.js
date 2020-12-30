const { Pool } = require('pg');

const config = {
  users: 'cata',
  password: '1234',
  host: 'localhost',
  database: 'likeme',
  port: 5432
}

const pool = new Pool(config);

async function createPost(paramsArray) {
  const qryObject = {
    text: 'INSERT INTO posts (usuario, url, descripcion, likes) VALUES ($1, $2, $3, 0)',
    values: paramsArray
  }
  try {
    const result = await pool.query(qryObject)
    return result

  } catch (error) {
    console.error(error)
  }
}

async function getPosts() {
  try {
    const result = await pool.query('SELECT * FROM posts')
    return result

  } catch (error) {
    console.error(error)
  }
}

async function likePost(paramsArray) {
  const qryObj = {
    text: 'UPDATE posts SET likes=0+1 WHERE id = $1 RETURNING *',
    values: paramsArray
  }
  try {
    const result = await pool.query(qryObj);
    return result;
    
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  createPost,
  getPosts,
  likePost
}