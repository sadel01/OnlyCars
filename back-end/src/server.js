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

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));  

// Configuracion de eventos para el chat



io.on('connection', (socket) => {
  // Cuando un cliente se conecta, se une a una sala específica
  socket.on('join', (room) => {
    socket.join(room);
    console.log('joined room: ' + room)
  });

  // Cuando se recibe un mensaje, se emite solo a la sala específica
  socket.on('message', (room, message) => {
    console.log('message1: ' + message)
    io.to(room).emit('message', message);
  });

  socket.on('disconnect', () => {
    // Cuando un cliente se desconecta, se puede manejar aquí
  });
});

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
  try {
    const database = client.db('onlycars')
    const collection = database.collection('postsPrueba') // SE DEBE CAMBIAR postsPrueba POR posts
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

app.get('/regions', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('location')
    const regions = await collection.distinct('region')
    res.send(regions)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/provincia/:region', async (req, res) => {
  const region = req.params.region;
  try {
    const database = client.db('onlycars');
    const collection = database.collection('location');
    const provincias1 = await collection.distinct('provincia', { region: region });
    res.send(provincias1); // Asegúrate de que este mapeo es correcto
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/comuna/:provincia', async (req, res) => {
  const provincia = req.params.provincia;
  try {
    const database = client.db('onlycars');
    const collection = database.collection('location');
    const comuna = await collection.find({ provincia: provincia }).toArray();
    res.send(comuna.map(comuna => comuna.comuna)); // Asegúrate de que este mapeo es correcto
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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
      if (buyerID === sellerID) {
        const chats = await collection.find({sellerID}).toArray();
        res.send({success : true, message: 'No puedes iniciar un chat contigo mismo',sellerID });
        return;
      }
      chat = await collection.insertOne({buyerID, sellerID, productID, messages: []});
    }else{
      res.send(chat);
    }
    
  } catch (error) {
    res.status(500).send(error.message)
  }
});

app.post('/chat/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const message = req.body.message.text;
    const user = req.body.message.user;
    const database = client.db('onlycars');
    const collection = database.collection('chat');
    const chat = await collection.findOne({ _id: new ObjectId(id) });

    console.log('message: '+message);
    console.log('user: '+user);

    await collection.updateOne({ _id: new ObjectId(id) }, { $push: { messages: {text: message, user: user}} });
    res.send(chat);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/chat/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const database = client.db('onlycars');
    const collection = database.collection('chat');
    const chat = await collection.findOne({ _id: new ObjectId(id) });
    res.send(chat);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Buscar un chat en la base de datos entre dos usuarios, user1 y user2, independiente de quien es el comprador y quien es el vendedor

app.get('/findChat', async (req, res) => {
  try {
    const user1 = req.query.user1;
    const user2 = req.query.user2;
    const productID = req.query.productID;
    const database = client.db('onlycars');
    const collection = database.collection('chat');
    const chat = await collection.findOne({ 
      $or: [
        {buyerID: user1, sellerID: user2, productID: productID}, 
        {buyerID: user2, sellerID: user1, productID: productID}
      ] 
    });
    res.send(chat);
  } catch (error) {
    res.status(500).send(error.message);
    console.log('chat no encontrado');
  }
}
);

app.get('/findSellerChats', async (req, res) => {
  try {
    const sellerID = req.query.sellerID;
    const database = client.db('onlycars');
    const collection = database.collection('chat');
    const chats = await collection.find({ sellerID }).toArray();
    const chatIds = chats.map(chat => chat._id);

    const userCollection = database.collection('users');
    const productCollection = database.collection('posts');
    const chatsWithBuyerDetails = await Promise.all(chats.map(async chat => {
      const buyer = await userCollection.findOne({ _id: new ObjectId(chat.buyerID) });
      const product = await productCollection.findOne({ _id: new ObjectId(chat.productID) });
      return {
        ...chat,
        buyerName: buyer ? buyer.nombre : '',
        buyerLastName: buyer ? buyer.apellido : '',
        brand: product ? product.brand : '',
        model: product ? product.model : '',
      };
    }));

    res.send(chatsWithBuyerDetails);
    console.log('chats encontrados');
    console.log(chatsWithBuyerDetails);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
);


app.get('/findSpecificChat', async (req, res) => {
  try {
    const user1 = req.query.user1;
    const productID = req.query.productID;
    const database = client.db('onlycars');
    const collection = database.collection('chat');
    const chat = await collection.findOne({ sellerID: user1, productID: productID });
    res.send(chat);
  } catch (error) {
    res.status(500).send(error.message);
    console.log('chat no encontrado');
  }
}
);
app.get('/users/:id', async (req, res) => { 
  try { 
    const id = req.params.id; 
    const database = client.db('onlycars'); 
    const collection = database.collection('users'); 
    const post = await collection.findOne({ _id: new ObjectId(id) }); 
    res.send(post); 
  } catch (error) { 
    res.status(500).send(error.message); 
  } 
}); 

const PORT = 8080
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
