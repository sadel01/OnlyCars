import express from 'express';
import {carItems} from './temp-data.js';
import cors from 'cors';
import {MongoClient, ObjectId} from 'mongodb'; 

const app = express();
const url = `mongodb://admin:12345adminADMIN@ac-sjjuxyv-shard-00-00.2sd1gmw.mongodb.net:27017,ac-sjjuxyv-shard-00-01.2sd1gmw.mongodb.net:27017,ac-sjjuxyv-shard-00-02.2sd1gmw.mongodb.net:27017/?ssl=true&replicaSet=atlas-a9gjt5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(url);
client.connect().then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.error("Failed to connect to database", error);
});
app.use(express.json());
app.use(cors());

app.get('/catalog/:id', async (req, res) => { 
    const id = req.params.id; 
    try{ 
        const database = client.db('onlycars'); 
        const collection = database.collection('posts'); 
        const post = await collection.findOne({ _id: new ObjectId(id) }); 
        res.send(post); 
    }catch(error){ 
        res.status(500).send(error.message); 
    } 
}); 

app.post('/register', async (req, res) => {
    try {
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
        const database = client.db('onlycars');
        const collection = database.collection('vehicles');
        const models = await collection.find({ make: brand }).toArray();
        res.send(models.map(model => model.model));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/posts', async (req, res) => {
    try{
        const database = client.db('onlycars');
        const collection = database.collection('posts');
        const posts = await collection.find().toArray();
        res.send(posts);
    }catch(error){
        res.status(500).send(error.message);
    }
});

// implementacion para el chat

app.post('/chat/:id', async (req, res) => {
    try{
        const database = client.db('onlycars');
        const collection = database.collection('chat');
        const chat = await collection.find().toArray();
        res.send(chat);
    }catch(error){
        res.status(500).send(error.message);
    }
});


app.listen(8080, () => {
  console.log('Server started on port 8080!');
});