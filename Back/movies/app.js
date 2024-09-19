const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');
var cors = require('cors')
const app = express()
const port = 3000
const client = new MongoClient('mongodb://localhost:27017');
app.use(cors())
app.use(express.json())
// Database Name
const dbName = 'movies_app';
async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('catalog');
  
    // the following code examples can be pasted here...
  
    return collection;
  }
app.get('/', (req, res) => {
  res.send('Movies API')
})
app.get('/movies/all', async(req, res) => {
    const collection = await main();
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
  })

  app.post('/movies/insert', async(req, res) => {
    const {id,titulo, sinopsis, actores, imagen, categoria} = req.body;
    const collection = await main();
    const insertResult = await collection.insertMany([{
        titulo,
        sinopsis,
        actores,
        imagen,
        categoria,
        id
      }]);
    res.json(insertResult)
  })

  app.put('/movies/update/:id', async(req, res) => {
    const {id} = req.params;
    const {titulo, sinopsis, actores, imagen, categoria} = req.body;
    console.log(titulo);
    
    const collection = await main();
    const insertResult = await collection.updateOne(
        { "id": parseInt(id) },
        {
            $set: {
                titulo,
                sinopsis,
                actores,
                imagen,
                categoria
              }
        })
        console.log(insertResult);
    res.json(insertResult)
  })

  app.delete('/movies/remove/:id', async(req, res) => {
    const {id} = req.params;
    const collection = await main();
    const deleteResult = await collection.deleteMany({ id: parseInt(id) });
    console.log(deleteResult);
    
    res.json(deleteResult)
  })

app.listen(port, async() => {
  console.log(`Example app listening on port ${port}`)
})