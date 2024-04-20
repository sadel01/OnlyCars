<template>
  <div class="Chat">
    <div class="container">
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index">
          <p>{{ message }}</p>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input v-model="newMessage" type="text" placeholder="Escribe un mensaje" />
        <button :disabled="newMessage.trim() === ''" type="submit">Enviar</button>
      </form>
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
      error: null
    }
  },
  // escucha el evento 'message' y agrega el mensaje al array de mensajes
  created() {
    socket.on('message', (message) => {
      this.messages.push(message)
      this.uploadMessages()
    })

    socket.on('connectError', (error) => {
      this.error = 'Connection error, please try again later.' + error.message
    })
  },
  methods: {
    // metodo para enviar el mensaje
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        socket.emit('message', this.newMessage, (error) => {
          if (error) {
            console.error('Error sending message:', error)
          } else {
            this.newMessage = ''
          }
        })
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
.Chat {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
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
}

input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2rem;
}

button[type='submit'] {
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
}
</style>
