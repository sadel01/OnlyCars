import express from 'express'
import { carItems } from './temp-data.js'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import { Server } from 'socket.io'
import http from 'http'
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const app = express()
const url = `mongodb://admin:12345adminADMIN@ac-sjjuxyv-shard-00-00.2sd1gmw.mongodb.net:27017,ac-sjjuxyv-shard-00-01.2sd1gmw.mongodb.net:27017,ac-sjjuxyv-shard-00-02.2sd1gmw.mongodb.net:27017/?ssl=true&replicaSet=atlas-a9gjt5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(url)

// Configuración de Multer
const uploadDirectory = path.join(__dirname, '../../src/assets/uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Configuracion de CORS para permitir la conexion entre el cliente y el servidor
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

// Configuracion de socket.io para permitir la conexion entre el cliente y el servidor y poder ver los mensajes en "tiempo real"
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

// Conexion a la base de datos de MongoDB
client
  .connect()
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error) => {
    console.error('Failed to connect to database', error)
  })
app.use(express.json())

// Configuracion de eventos para el chat
io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log('message: ' + msg)
    io.emit('message', msg)
  })
  socket.on('disconnect', () => {
  })
})

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
  }).format(value);
}

app.get('/catalog/:id', async (req, res) => {
  const id = req.params.id
  try {
    const database = client.db('onlycars')
    const collection = database.collection('posts')
    const post = await collection.findOne({ _id: new ObjectId(id) })
    res.send(post)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/upload', upload.array('files'), (req, res) => {
  // Comprueba si se subieron archivos
  if (req.files && req.files.length > 0) {
    // Mapea los archivos para obtener sus rutas
    const filePaths = req.files.map(file => {
      return `../src/assets/uploads/${file.filename}`;
    });

    // Envía las rutas de los archivos en la respuesta
    res.json({ message: 'Images uploaded successfully!', filePaths: filePaths });
  } else {
    // Si no hay archivos, envía un error
    res.status(400).json({ message: 'No files uploaded.' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('users')
    const result = await collection.insertOne(req.body)
    res.send({ success: true, message: 'Registro exitoso' })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
})

app.post('/postsPrueba', async (req, res) => {
  // SE DEBE CAMBIAR postsPrueba POR posts
  try {
    const database = client.db('onlycars')
    const collection = database.collection('posts') // SE DEBE CAMBIAR postsPrueba POR posts
    req.body.price = req.body.price.replace('$', '');
    const result = await collection.insertOne(req.body)
    res.send({ message: 'Item publicado con éxito', itemId: result.insertedId })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error al publicar el item' })
  }
})

app.post('/login', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('users')
    const user = await collection.findOne({ rut: req.body.rut })
    if (user) {
      if (user.password === req.body.password) {
        // Enviar un objeto que contenga el mensaje y los datos del usuario
        res.send({
          message: 'Inicio de sesion exitoso',
          userData: {
            _id: user._id, //ID PARA MAS ADELANTE MANEJAR EDICIONES EN LA BASE DE DATOS
            nombre: user.nombre,
            apellido: user.apellido,
            rut: user.rut,
            mail: user.mail
          }
        })
        console.log('Inicio de sesion exitoso')
      } else {
        res.send('Contraseña incorrecta')
        console.log('Contraseña incorrecta')
      }
    } else {
      res.send('Usuario no encontrado')
      console.log('User no encontrado')
    }
  } catch (error) {
    console.log(error)
  }
})

app.get('/brands', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('vehicles')
    const brands = await collection.distinct('make')
    res.send(brands)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/models/:brand', async (req, res) => {
  const brand = req.params.brand
  try {
    const database = client.db('onlycars')
    const collection = database.collection('vehicles')
    const models = await collection.find({ make: brand }).toArray()
    res.send(models.map((model) => model.model))
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/posts', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('posts')
    const posts = await collection.find().toArray()
    res.send(posts)
  } catch (error) {
    res.status(500).send(error.message)
  }
})


// iniciar un chat
app.post('/chat/startChat', async (req, res) => {
  try {
    const {buyerID, sellerID, productID} = req.body;
    const database = client.db('onlycars')
    const collection = database.collection('chat')
    let chat = await collection.findOne({buyerID, sellerID, productID});

    if (!chat) {
      chat = await collection.insertOne({buyerID, sellerID, productID, messages: []});
    }

    res.send(chat);
  } catch (error) {
    res.status(500).send(error.message)
  }
});

app.post('/chat/:id', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('chat')
    const chat = await collection.find().toArray()
    res.send(chat)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

const PORT = 8080
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
