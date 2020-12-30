const { Pool } = require('pg');

const config = {
  users: 'cata',
  password: '1234',
  host: 'localhost',
  database: 'likeme',
  port: 5432
}

const pool = new Pool(config);

async function createPost(paramsArray){
    const qryObject = {
        text: 'INSERT INTO posts (usuario, url, descripcion) VALUES ($1, $2, $3)',
        values: paramsArray
    }
    const result = await pool.query(qryObject)
    return result
}

async function getUsers(){
    const result = await pool.query('SELECT * FROM posts')
    return result
}

module.exports = {
    createPost
}