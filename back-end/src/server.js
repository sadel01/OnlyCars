import express from 'express';
import {MongoClient} from 'mongodb';
import {carItems} from './temp-data.js';
import cors from 'cors';

const app = express();
const url = `mongodb+srv://admin:12345adminADMIN@cluster0.2sd1gmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(url);

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('onlycars');
        const collection = database.collection('users');
        const result = await collection.insertOne(req.body);
        res.send({ success: true, message: 'Registro exitoso' });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('onlycars');
        const collection = database.collection('users');
        const user = await collection.findOne({rut: req.body.rut});
        if (user) {
            if (user.password === req.body.password) {
                res.send('Inicio de sesion exitoso');
                console.log('Inicio de sesion exitoso');
            } else {
                res.send('Contraseña incorrecta');
                console.log('Contraseña incorrecta');
            }
        }else{
            res.send('Usuario no encontrado');
            console.log('User no encontrado');
        }
    } catch (error) {
        console.log(error);
    }
});


app.listen(8080, () => {
  console.log('Server started on port 8080!');
});