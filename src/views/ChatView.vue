<template>
  <div class="Chat">
    <div>
      <h1>Chat</h1>
    </div>

    <div class="container">
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index">
          <p>{{user}}: {{ message }}</p>
        </div>
      </div>
      <div>
        <div class="inputContainer">
      <form @submit.prevent="sendMessage">  
        <div class="fileUploadWrapper">
                <label for="file">
                  <svg class="iconFile" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 16V8" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  <span class="tooltip">Agregar imagen</span>
                </label>
                <input type="file" id="file" name="file" />
        </div>
        <input v-model="newMessage" placeholder="Escribe un mensaje" type="text">
        <button :disabled="newMessage.trim() === ''" type="submit" class="sendMessage">Enviar</button>
      </form>
    </div>
    </div>
      

    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io('http://localhost:8080')
export default {
  // inicializa el array de mensajes y mensajes nuevos
  data() {
    return {
      messages: [],
      newMessage: '',
      error: null
    }
  },
  // escucha el evento 'message' y agrega el mensaje al array de mensajes
  created() {
    socket.on('message', (message) => {
      this.messages.push(message)
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
        socket.emit('message', this.newMessage, (error) => {
          this.newMessage = '';
          if (error) {
            console.error('Error sending message:', error)
          } else {
            // Si no hay error al enviar el mensaje, limpiar el campo de entrada
            this.newMessage = '';
          }
        })
      }
    },
    }
  }
  </script>

<style scoped>
.iconFile{
  position: absolute;
  margin-top:10%;
}
.inputContainer {
  widows: 80%;
  display: flex;
  align-items: center;
  justify-content: center; /* Add this line to center horizontally */
}

.fileUploadWrapper {
  margin-left: 5%;
  margin-right:2%;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
}

#file {
  width:70%; /* Ajusta el ancho según sea necesario */
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
  height: 30px;
  width: 30px;
}
.fileUploadWrapper label svg path {
  transition: all 0.3s;
}
.fileUploadWrapper label svg circle {
  transition: all 0.3s;
}
.fileUploadWrapper label:hover svg path {
  stroke: #7c7c7c;
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
  text-wrap: nowrap;
  background-color: #000;
  padding: 6px 10px;
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.596);
  transition: all 0.3s;
}


.Chat {
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  margin-bottom: 7%;
  margin-left:17%;
}

.container {
  display: flex;
  flex-direction: column;
  height: 40vh;
  width: 70vw;
}

.messages {
  flex: 1;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  overflow-y: auto;
  height: 200px;
  font-size: 1.2rem;
}

form {
  display: flex;
  flex: 1; /* Para que ocupe todo el espacio disponible */
}

input {
  margin-top: 2.5%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
  height: 70%;
  width: 70%;
}

.sendMessage {
  position: relative;
  display: flex;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #fbc40e;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 3% 5%;
  font-size: 20px;
  font-weight: bold;
  width: 5%;
  height: 5%;
}

</style>
