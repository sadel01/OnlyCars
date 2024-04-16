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

app.post('/postsPrueba', async (req, res) => {   // SE DEBE CAMBIAR postsPrueba POR posts
    try {
        await client.connect();
        const database = client.db('onlycars');
        const collection = database.collection('postsPrueba'); // SE DEBE CAMBIAR postsPrueba POR posts
        const result = await collection.insertOne(req.body);
        res.send({ message: 'Item publicado con éxito', itemId: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al publicar el item' });
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
                // Enviar un objeto que contenga el mensaje y los datos del usuario
                res.send({
                    message: 'Inicio de sesion exitoso',
                    userData: {
                        _id: user._id.toString(), //ID PARA MAS ADELANTE MANEJAR EDICIONES EN LA BASE DE DATOS
                        nombre: user.nombre,
                        apellido: user.apellido,
                        rut: user.rut,
                        mail: user.mail
                    }
                });
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

app.get('/brands', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('onlycars');
        const collection = database.collection('vehicles');
        const brands = await collection.distinct("make");
        res.send(brands);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/models/:brand', async (req, res) => {
    const brand = req.params.brand;
    try {
        await client.connect();
        const database = client.db('onlycars');
        const collection = database.collection('vehicles');
        const models = await collection.find({ make: brand }).toArray();
        res.send(models.map(model => model.model));
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(8080, () => {
  console.log('Server started on port 8080!');
});