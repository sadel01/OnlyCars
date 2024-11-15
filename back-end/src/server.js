import express from 'express'
import { carItems } from './temp-data.js'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'
import { Server } from 'socket.io'
import http from 'http'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

// Configuración de Multer
const uploadDirectory = path.join(__dirname, '../../src/assets/uploads')
fs.mkdirSync(uploadDirectory, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

// Configuracion de CORS para permitir la conexion entre el cliente y el servidor
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

function appendFuelUnit(cylinderCapacity, fuelType) {
  let unit
  if (fuelType === 'Gasolina' || fuelType === 'Diésel') {
    unit = ' L'
  } else if (fuelType === 'Eléctrico') {
    unit = ' kW'
  } else {
    unit = ''
  }
  return cylinderCapacity + unit
}
function appendPotencyUnit(power, fuelType) {
  let unit
  if (fuelType === 'Gasolina' || fuelType === 'Diésel') {
    unit = ' HP'
  } else if (fuelType === 'Eléctrico') {
    unit = ' kWh'
  } else {
    unit = ''
  }
  return power + unit
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

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Configuracion de eventos para el chat

io.on('connection', (socket) => {
  // Cuando un cliente se conecta, se une a una sala específica
  socket.on('join', (room) => {
    socket.join(room)
  })

  // Cuando se recibe un mensaje, se emite solo a la sala específica
  socket.on('message', (room, message) => {
    io.to(room).emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

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
  const region = req.params.region
  try {
    const database = client.db('onlycars')
    const collection = database.collection('location')
    const provincias1 = await collection.distinct('provincia', { region: region })
    res.send(provincias1) // Asegúrate de que este mapeo es correcto
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/comuna/:provincia', async (req, res) => {
  const provincia = req.params.provincia
  try {
    const database = client.db('onlycars')
    const collection = database.collection('location')
    const comuna = await collection.find({ provincia: provincia }).toArray()
    res.send(comuna.map((comuna) => comuna.comuna)) // Asegúrate de que este mapeo es correcto
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

app.post('/posts', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('posts') // SE DEBE CAMBIAR postsPrueba POR posts
    req.body.price = req.body.price.replace('$', '')
    req.body.cylinderCapacity = appendFuelUnit(req.body.cylinderCapacity, req.body.fuel)
    req.body.power = appendPotencyUnit(req.body.power, req.body.fuel)
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
            mail: user.mail,
            rol: user.rol,
            tipo: user.tipo,
            imgProfile: user.imgProfile
          }
        })
      } else {
        res.send('Contraseña incorrecta')
      }
    } else {
      res.send('Usuario no encontrado')
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

// Contador de visitas

app.post('/catalog/:id/visit', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('posts')
    const post = await collection.findOne({ _id: new ObjectId(req.params.id) })
    await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { visitas: post.visitas + 1 } }
    )
    res.send({ message: 'Visita registrada' })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// iniciar un chat
app.post('/chat/startChat', async (req, res) => {
  try {
    const { buyerID, sellerID, productID } = req.body
    const database = client.db('onlycars')
    const collection = database.collection('chat')
    let chat = await collection.findOne({ buyerID, sellerID, productID })

    if (!chat) {
      if (buyerID === sellerID) {
        const chats = await collection.find({ sellerID }).toArray()
        res.send({ success: true, message: 'No puedes iniciar un chat contigo mismo', sellerID })
        return
      }
      chat = await collection.insertOne({ buyerID, sellerID, productID, messages: [] })
      res.send(chat)
    } else {
      res.send(chat)
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/chat/:id', async (req, res) => {
  try {
    const id = req.params.id
    const message = req.body.message
    const user = req.body.user
    const database = client.db('onlycars')
    const collection = database.collection('chat')
    const chat = await collection.findOne({ _id: new ObjectId(id) })

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { messages: { text: message, user: user } } }
    )
    res.send(chat)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/chat/:id', async (req, res) => {
  try {
    const id = req.params.id
    const database = client.db('onlycars')
    const collection = database.collection('chat')
    const chat = await collection.findOne({ _id: new ObjectId(id) })
    res.send(chat)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Actualizar el perfil del usuario
app.post('/updateUserProfile', async (req, res) => {
  try {
    const { id, nombre, apellido, mail, rut, imgProfile } = req.body
    const database = client.db('onlycars')
    const usersCollection = database.collection('users')
    const postsCollection = database.collection('posts')

    // Actualizar el perfil del usuario en la colección de users
    await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          nombre: nombre,
          apellido: apellido,
          mail: mail,
          rut: rut,
          imgProfile: imgProfile
        }
      }
    )

    // Actualizar el nombre del usuario en la colección de posts
    await postsCollection.updateMany(
      { 'user._id': id },
      {
        $set: {
          'user.name': nombre,
          'user.lastName': apellido,
          'user.imgProfile': imgProfile
        }
      }
    )

    res.send({ message: 'Usuario y publicaciones actualizadas con éxito' })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Buscar un chat en la base de datos entre dos usuarios, user1 y user2, independiente de quien es el comprador y quien es el vendedor

app.get('/findChat', async (req, res) => {
  try {
    const user1 = req.query.user1
    const user2 = req.query.user2
    const productID = req.query.productID
    const database = client.db('onlycars')
    const collection = database.collection('chat')
    const chat = await collection.findOne({
      $or: [
        { buyerID: user1, sellerID: user2, productID: productID },
        { buyerID: user2, sellerID: user1, productID: productID }
      ]
    })
    res.send(chat)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/findUserChats', async (req, res) => {
  try {
    const userID = req.query.userID
    const database = client.db('onlycars')
    const collection = database.collection('chat')
    const chats = await collection
      .find({ $or: [{ buyerID: userID }, { sellerID: userID }] })
      .toArray()

    const userCollection = database.collection('users')
    const productCollection = database.collection('posts')
    const chatsWithBuyerDetails = await Promise.all(
      chats.map(async (chat) => {
        const buyer = await userCollection.findOne({ _id: new ObjectId(chat.buyerID) })
        const seller = await userCollection.findOne({ _id: new ObjectId(chat.sellerID) })
        const product = await productCollection.findOne({ _id: new ObjectId(chat.productID) })

        let otherUserName = ''
        let otherUserLastName = ''
        let otherImgProfile = ''

        if (chat.buyerID === userID) {
          otherUserName = seller ? seller.nombre : ''
          otherUserLastName = seller ? seller.apellido : ''
          otherImgProfile = seller ? seller.imgProfile : ''
        } else {
          otherUserName = buyer ? buyer.nombre : ''
          otherUserLastName = buyer ? buyer.apellido : ''
          otherImgProfile = buyer ? buyer.imgProfile : ''
        }

        return {
          ...chat,
          buyerName: buyer ? buyer.nombre : '',
          buyerLastName: buyer ? buyer.apellido : '',
          sellerName: seller ? seller.nombre : '',
          sellerLastName: seller ? seller.apellido : '',
          otherUserName: otherUserName,
          otherUserLastName: otherUserLastName,
          otherImgProfile: otherImgProfile,
          brand: product ? product.brand : '',
          model: product ? product.model : '',
          product: product ? product : {}
        }
      })
    )

    res.send(chatsWithBuyerDetails)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/findSpecificChat', async (req, res) => {
  try {
    const user1 = req.query.user1
    const productID = req.query.productID
    const database = client.db('onlycars')
    const collection = database.collection('chat')
    const chat = await collection.findOne({ sellerID: user1, productID: productID })
    res.send(chat)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const database = client.db('onlycars')
    const collection = database.collection('users')
    const post = await collection.findOne({ _id: new ObjectId(id) })
    res.send(post)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Manejo de solicitudes para agregar y obtener de favoritos

app.post('/favorites', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('favorites')
    const { userId, postId } = req.body

    const result = await collection.updateOne(
      { userId: userId },
      { $addToSet: { postIds: postId } },
      { upsert: true }
    )

    if (result.modifiedCount === 0) {
      res.send({ message: 'Item ya estaba en favoritos' })
    } else {
      res.send({ message: 'Item agregado a favoritos' })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/favorites', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('favorites')
    const userId = req.query.userId
    const favorites = await collection.findOne({ userId: userId })
    const productCollection = database.collection('posts')
    const products = await productCollection
      .find({ _id: { $in: favorites.postIds.map((id) => new ObjectId(id)) } })
      .toArray()
    res.send(products)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.delete('/favorites', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('favorites')
    const { userId, postId } = req.body

    const result = await collection.updateOne({ userId: userId }, { $pull: { postIds: postId } })

    if (result.modifiedCount === 0) {
      res.send({ message: 'Item no estaba en favoritos' })
    } else {
      res.send({ message: 'Item eliminado de favoritos' })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/admin/users', async (req, res) => {
  try {
    const database = client.db('onlycars')
    const collection = database.collection('users')
    const users = await collection.find().toArray()
    res.send(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/admin/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const database = client.db('onlycars')
    const collection = database.collection('users')
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: req.body })
    res.send({ message: 'Usuario actualizado con éxito' })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/profile/users/:id', async (req, res) => {
  try {
    const schedules = req.body
    const id = req.params.id
    const database = client.db('onlycars')
    const collection = database.collection('users')
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { schedules: schedules } }
    )
    res.send({ message: 'Horarios actualizados con éxito' })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/reportChat', async (req, res) => {
  try {
    const { chatId, reportedBy } = req.body
    const database = client.db('onlycars')
    const chatsCollection = database.collection('chat')
    const usersCollection = database.collection('users')

    // Encontrar el chat que se está reportando
    const chat = await chatsCollection.findOne({ _id: new ObjectId(chatId) })

    if (!chat) {
      res.status(404).send('Chat no encontrado')
      return
    }

    // Marcar el chat como reportado
    await chatsCollection.updateOne({ _id: new ObjectId(chatId) }, { $set: { reported: true } })

    // Encontrar todos los usuarios con rol de admin
    const admins = await usersCollection.find({ rol: 'admin' }).toArray()

    for (const admin of admins) {
      // Hay que buscar alguna forma de informarle a los administradores, no sé qué puede ser.
      // Había pensado en enviar un correo, pero no sé si es posible hacerlo desde acá (probablemente sí)
    }

    res.send({ success: true, message: 'Chat reportado con éxito' })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/getReportedChats', async (req, res) => {
  try {
    console.log('HOLA')

    const database = client.db('onlycars')
    const userCollection = database.collection('users')
    const productCollection = database.collection('posts')
    const chatsCollection = database.collection('chat')

    // Encontrar todos los chats que han sido reportados
    const reportedChats = await chatsCollection.find({ reported: true }).toArray()

    const chatsWithBuyerDetails = await Promise.all(
      reportedChats.map(async (chat) => {
        const buyer = await userCollection.findOne({ _id: new ObjectId(chat.buyerID) })
        const seller = await userCollection.findOne({ _id: new ObjectId(chat.sellerID) })
        const product = await productCollection.findOne({ _id: new ObjectId(chat.productID) })

        return {
          buyerName: buyer ? buyer.nombre : '',
          buyerLastName: buyer ? buyer.apellido : '',
          sellerName: seller ? seller.nombre : '',
          sellerLastName: seller ? seller.apellido : '',
          brand: product ? product.brand : '',
          model: product ? product.model : '',
          product: product ? product : {}
        }
      })
    )

    res.send(chatsWithBuyerDetails)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.delete('/admin/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const database = client.db('onlycars')
    const collection = database.collection('posts')
    const collection2 = database.collection('favorites')

    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    const result2 = await collection2.updateMany({}, { $pull: { postIds: id } })

    res.send({ message: 'Publicación eliminada con éxito' })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

const PORT = 8080
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
