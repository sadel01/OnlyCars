import express from 'express';
import {MongoClient} from 'mongodb';
import {carItems} from './temp-data.js';


const app = express();
const url = `mongodb+srv://admin:12345adminADMIN@cluster0.2sd1gmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(url);

app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('onlycars');
        const collection = database.collection('users');
        const result = await collection.insertOne(req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('onlycars');
        const collection = database.collection('users');
        const user = await collection.findOne({email: req.body.email});
        if (user) {
            if (user.password === req.body.password) {
                res.send('Login successful');
            } else {
                res.send('Incorrect password');
            }
        }else{
            res.send('User not found');
        }
    } catch (error) {
        console.log(error);
    }
});


app.listen(5173, () => {
  console.log('Server started on port 5173!');
});