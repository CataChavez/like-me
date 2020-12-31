const http = require('http')
const fs = require('fs')
const url = require('url')
const db = require('./db')

const server = http.createServer(async (req, res) => {
  if (req.url == '/' && req.method == 'GET') {
    fs.readFile('./views/index.html', (err, file) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(file)
    })
  }

  if (req.url == '/post' && req.method == 'POST') {
    let params = null;
    req.on('data', body => {
      params = body
    });
    req.on('end', async () => {
      const paramsArray = Object.values(JSON.parse(params));
      const result = await db.createPost(paramsArray);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(result));
      console.log(result)
      res.end();
    });
  }
  
  if (req.url == '/posts' && req.method == 'GET') {
    const result = await db.getPosts();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(result.rows));
    res.end();
  }
  if (req.url.startsWith('/post?id=') && req.method == 'PUT') {
    const { id } = url.parse(req.url, true).query;
    await db.likePost(id)
    }
    req.on('end', async () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(result.rows));
      res.end();
    });
  

})
server.listen(3000, () => console.log('escuchando el puerto 3000'))