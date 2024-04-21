<template>
<div class="general-container">
  <div class="chat-container">
    <div class="minimized-chats">
      <input
        class="search-chat"
        type="text"
        placeholder="Buscar.."
        v-model="searchTerm"
        @input="emitInput"
      />
      <p>Aqui van los chats del user
      </p>
    </div>

    <div class="chat">
      <div class="chat-header">
        <h1>Nombre Vendedor</h1>
      </div>
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" :class="{ 'sent-message': message.user === user, 'received-message': message.user !== user }">
          <p>{{user}}: {{ message }}</p>
        </div>
      </div>
      <div>
        <div class="inputContainer">
      <form class="formMessage" @submit.prevent="sendMessage">  
        <div class="fileUploadWrapper">
                <label for="file">
                  <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 10C3 8.34315 4.34315 7 6 7H14C15.6569 7 17 8.34315 17 10V18C17 19.6569 15.6569 21 14 21H6C4.34315 21 3 19.6569 3 18V10Z" stroke="#000000" stroke-width="1.104" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 14V11M10 14V17M10 14H13M10 14H7" stroke="#000000" stroke-width="1.104" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 3L18 3C19.6569 3 21 4.34315 21 6L21 17" stroke="#000000" stroke-width="1.104" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  <span class="tooltip">Agregar imagen</span>
                </label>
                <input type="file" id="file" name="file" />
        </div>
        <input class="chat-input" v-model="newMessage" placeholder="Escribe un mensaje" type="text">
        <button :disabled="newMessage.trim() === ''" type="submit" class="sendMessage" id="sendButton"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
      <path
        fill="none"
        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
      ></path>
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="33.67"
        stroke="black"
        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
      ></path>
    </svg></button>
      </form>
      </div>
    </div>
    

    </div>
    <div class="sell-data">
      <h2>Año Marca Modelo</h2>
      <p>Imagenes</p>
      <p>Descripcion</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
const socket = io('http://localhost:8080')
export default {
  // inicializa el array de mensajes y mensajes nuevos
  data() {
    return {
      messages: [],
      newMessage: '',
      error: null,
      chatId: null
    }
  },
  // escucha el evento 'message' y agrega el mensaje al array de mensajes
  created() {
    
    this.chatId = this.$route.params.id

    socket.emit('join', this.$store.state.chat._id, this.$store.state.chat.buyerID , (error) => {
      if (error) {
        console.error('Error joining chat:', error);
      }
    });

    socket.on('message', (message) => {
      this.messages.push(message)
      this.uploadMessages()
    })

    socket.on('connectError', (error) => {
      this.error = 'Connection error, please try again later.' + error.message
    })
  },
  computed: {
    user() {
      return this.$store.state.user.nombre
    }
  },
  methods: {
    // método para enviar el mensaje
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        console.log('Sending message:', this.newMessage)
        console.log('Chat ID:', this.chatId)
        axios.post(`http://localhost:8080/chat/${this.chatId}`,{
          chatId: this.chatId,
          message: this.newMessage
        })
        socket.emit('message', this.chatId, this.newMessage)
        this.newMessage = ''
      }
    },
    async uploadMessages() {
      const chatID = this.$store.state.chat._id
      await axios.post('http://localhost:8080/chat/'+chatID, {
        id : chatID,
        message: this.messages,
      })
    }
  }
}
  </script>

<style scoped>
.search-chat {
  box-sizing: border-box; 
  width: 90%; 
  padding: 10px; 
  font-size: 15px;
  border: none;
  border-radius: 4px 4px 2px 2px;
  background-color: white;
  outline: none;
  margin: 0; 
  border:1px solid #c5c5c5;
}
.search-chat:hover {
  border-color: #000000;
}
.search-chat:focus {
  border-color: #000000;
}
h2{
  margin-top: 18%;
}
.sell-data {
  flex: 1;
  margin-left: auto;
  border-left: 1px solid #ccc;
  justify-content: center;
  text-align: center;
  height: 85vh;
  background-color: #ececec;
}
#messageInput:focus ~ #sendButton svg path,
#messageInput:valid ~ #sendButton svg path {
  fill: #3c3c3c;
  stroke: white;
}

#sendButton {
  width: fit-content;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}
#sendButton svg {
  height: 22px;
  transition: all 0.3s;
}
#sendButton svg path {
  transition: all 0.3s;
}
#sendButton:hover svg path {
  fill: #3c3c3c;
  stroke: white;
}
.sent-message {
  background-color: #007bff; /* Color de fondo */
  color: white; /* Color de texto */
  border-radius: 10px; /* Borde redondeado */
  padding: 5px 10px; /* Espaciado interno */
  margin-bottom: 5px; /* Espaciado inferior */
}

/* Establece estilos para los mensajes recibidos */
.received-message {
  background-color: #d1d1d1; /* Color de fondo */
  color: black; /* Color de texto */
  border-radius: 20px; /* Borde redondeado */
  padding: 5px 10px; /* Espaciado interno */
  margin-top: 0.5%; /* Espaciado inferior */
  margin-left: 1%;
  margin-right: 1%;
  text-align: right; /* Alinea el texto a la derecha */
  display: flex; /* Activa el modelo de caja flexible */
  align-items: center; /* Alinea verticalmente los elementos */
  height: 50px; /* Altura deseada para los mensajes */
  align-self: flex-end; /* Alinea el mensaje a la derecha */
  display: inline-block; /* Hace que el contenedor se ajuste al tamaño del contenido */
}

.general-container {
  display: flex;
  height: 85vh;
}

.minimized-chats {
  width: 20%;
  padding: 10px;
  border-right: 1px solid #ccc;
  flex: 0 0 auto; /* Hace que el ancho sea fijo y no flexible */
  height: 80vh;
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.minimized-chat {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
}

.minimized-chat:hover {
  background-color: #f0f0f0;
}
.unread-messages {
  margin-left: 10px;
  background-color: red;
  color: white;
  padding: 2px 5px;
  border-radius: 50%;
}
.iconFile{
  margin-top:10%;
}
.inputContainer {
  widows: 80%;
  display: flex;
  align-items: center;
  justify-content: center; /* Add this line to center horizontally */
  
  margin-top: 1.5%;
}

.fileUploadWrapper {
  margin-right:1%;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
}

#file {
  width:50%; /* Ajusta el ancho según sea necesario */
  display: none;
}
.fileUploadWrapper label {
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.fileUploadWrapper label svg {
  height: 25px;
  width: 25px;
}
.fileUploadWrapper label svg path {
  transition: all 0.3s;
}
.fileUploadWrapper label svg circle {
  transition: all 0.3s;
}
.fileUploadWrapper label:hover svg path {
  stroke: #fff;
  fill: #3c3c3c;
}
.fileUploadWrapper label:hover svg circle {
  stroke: #fff;
  fill: #3c3c3c;
}
.fileUploadWrapper label:hover .tooltip {
  display: block;
  opacity: 1;
}
.tooltip {
  position: absolute;
  top: -40px;
  display: none;
  opacity: 0;
  color: white;
  font-size: 10px;
  white-space: nowrap;
  background-color: #000;
  padding: 6px 10px;
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.596);
  transition: all 0.3s;
}


.chat-container {
  display: flex;
  flex: 1; /* Hace que ocupe el espacio restante */
}

.minimized-chats {
  width: 13%;
  height: 85vh;
  border-right: 1px solid #ccc;
}

.minimized-chat {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.minimized-chat:hover {
  background-color: #f0f0f0;
}

.unread-messages {
  margin-left: 10px;
  background-color: red;
  color: white;
  padding: 2px 5px;
  border-radius: 50%;
}

.chat {
  padding: 10px;
  width: calc(68% - 10px); /* El 80% restante del contenedor, restando el padding */
  overflow-y: auto; /* Añade desplazamiento vertical si es necesario */
  margin-left: 1.5%;
  height: 100%; /* Establece la altura al 100% */
  max-height: 120%; /* Establece la altura máxima al 100% */
  
  margin-right: 1.5%;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5%;
  margin-top: 1.5%;
  margin-bottom: 3%;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 10px;
  border: 1px solid #ccc;
  height: 120%; /* Establece la altura al 100% */
  max-height: 75%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
}
.formMessage{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.chat-input {
  width: 80%;
  padding: 10px;
  border: 1px solid #a5a5a5;
  border-radius: 18px;
  margin-right: 10px;
  background-color: #dddddd;
}
.chat-input:hover {
  border-color:black;
}
.chat-input:focus {
  border-color: #474747; /* Cambia el color del borde cuando está enfocado */
  outline: none; /* Quita el contorno predeterminado del input */
  background-color: white;
}

</style>
