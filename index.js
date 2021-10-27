const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient } = require('mongodb');
require('dotenv').config()

const cors = require('cors')
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rf28w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run () {
    try{
        await client.connect();

        const database = client.db("volunteer-works");
        const worksCollection = database.collection("works");


        app.get('/works', async (req, res) => {
            const cursor = worksCollection.find({})
            const works = await cursor.toArray()
            res.send(works)
        })
    }
    finally{
        //await client.close();
    }
}
run().catch(console.dir)


app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log('Running');
})