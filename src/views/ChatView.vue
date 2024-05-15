<template>
  <div class="general-container">
    <div class="chat-container">
      <div class="minimized-chats">
        <input
          class="search-chat"
          v-model="searchTerm"
          type="text"
          placeholder="Buscar.."
          @input="emitInput"
        />
        <div
          v-for="chat in filteredChats"
          :key="chat.id"
          class="chat"
          @click="loadChat(chat._id, chat)"
        >
          <h4>{{ chat.otherUserName }} {{ chat.otherUserLastName }}</h4>
          <h4>{{ chat.brand }} {{ chat.model }}</h4>
        </div>
      </div>

      <div class="chat">
        <div class="chat-header">
          <h1>{{ selectedChat.otherUserName }} {{ selectedChat.otherUserLastName }}</h1>
          <div class="report-section">
            <p v-if="chatReported">Reportado correctamente &nbsp;</p>
          <button class="report-button" @click="reportChat" :disabled="chatReported">Reportar chat</button>
        </div>
        </div>
        <div class="chatContainer" ref="chatContainer">
          <div class="messages" ref="messages">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="{
                'sent-message': message.user === user,
                'received-message': message.user !== user
              }"
              ref="messages"
            >
              <p>{{ message.text }}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="inputContainer">
            <form class="formMessage" @submit.prevent="sendMessage">
              <div class="fileUploadWrapper">
                <label for="file">
                  <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M3 10C3 8.34315 4.34315 7 6 7H14C15.6569 7 17 8.34315 17 10V18C17 19.6569 15.6569 21 14 21H6C4.34315 21 3 19.6569 3 18V10Z"
                        stroke="#000000"
                        stroke-width="1.104"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M10 14V11M10 14V17M10 14H13M10 14H7"
                        stroke="#000000"
                        stroke-width="1.104"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M7 3L18 3C19.6569 3 21 4.34315 21 6L21 17"
                        stroke="#000000"
                        stroke-width="1.104"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                  <span class="tooltip">Agregar imagen</span>
                </label>
                <input type="file" id="file" name="file" />
              </div>
              <input
                class="chat-input"
                v-model="newMessage"
                placeholder="Escribe un mensaje"
                type="text"
              />
              <button
                :disabled="newMessage.trim() === ''"
                type="submit"
                class="sendMessage"
                id="sendButton"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
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
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="sell-data" v-if="selectedChat">
        <h2>
          {{ selectedChat.product.brand }} {{ selectedChat.product.model }}
          {{ selectedChat.product.year }}
        </h2>

        <div class="vehicle-carousel-container">
          <carousel :items-to-show="1" v-if="selectedChat.product && selectedChat.product.image">
            <slide v-for="(image, index) in selectedChat.product.image" :key="index">
              <img :src="image" alt="Vehicle Image" class="carousel__item" />
            </slide>
            <template #addons>
              <navigation class="navigation" />
              <pagination class="pagination" />
            </template>
          </carousel>
          <div v-else class="no-images">Cargando imágenes o no hay imágenes disponibles.</div>
        </div>

        <div class="specs">
          <p>
            <img src="@/assets/icons/mileage.svg" class="icon" alt="Kilometraje" />
            <strong>Kilometraje: </strong> {{ ' ' + selectedChat.product.mileage }}
          </p>
          <p>
            <img src="@/assets/icons/paint-roller-solid.svg" class="icon" alt="Color" />
            <strong>Color: </strong> {{ selectedChat.product.exteriorColor }}
          </p>
          <p>
            <img src="@/assets/icons/horse.svg" class="icon" alt="Motor" />
            <strong>Motor: </strong> {{ selectedChat.product.power }}
          </p>

          <p>
            <img src="@/assets/icons/gas-pump-solid.svg" class="icon" alt="Combustible" />
            <strong>Combustible: </strong> {{ selectedChat.product.fuel }}
          </p>
          <p>
            <img src="@/assets/icons/gearbox.svg" class="icon" alt="Transmisión" />
            <strong>Transmisión:</strong> {{ ' ' + selectedChat.product.transmission }}
          </p>
          <p>
            <img src="@/assets/icons/camera-solid.svg" class="icon" alt="Cámara trasera" />
            <strong>Cámara trasera: </strong>
            {{ selectedChat.product.hasBackupCamera ? 'Sí' : 'No' }}
          </p>

          <p class="description">{{ selectedChat.product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
const socket = io('http://localhost:8080')
export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      error: null,
      chatId: null,
      receiver: '',
      userChats: [],
      selectedChat: '',
      product: {},
      searchTerm: '',
      chatReported: false,
      filteredChats: []
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
  async created() {
    const response = await axios.get('http://localhost:8080/findUserChats', {
      params: {
        userID: this.$store.state.user._id
      }
    })
    this.userChats = response.data
    this.filteredChats = this.userChats

    if (this.userChats.length > 0) {
      const firstChat = this.userChats[0]
      this.loadChat(firstChat._id, firstChat)
    }

    socket.on('message', (message) => {
      this.messages.push(message)
      this.$nextTick(() => {
        const chatElement = document.getElementsByClassName('messages')
        chatElement.scrollIntoView({ behavior: 'smooth', block: 'end' })
      })
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
  updated() {
    const container = this.$el.querySelector('.messages')
    container.scrollTop = container.scrollHeight
  },
  methods: {
    async reportChat() {
      try {
        const response = await axios.post('http://localhost:8080/reportChat', {
          chatId: this.chatId,
          reportedBy: this.user
        })

        if (response.status === 200) {
          this.successMessage = 'Chat reportado con éxito'
          console.log('Chat reportado con éxito')
          this.chatReported = true;
        } else {
          this.errorMessage = 'Error al reportar el chat'
          console.log('Error al reportar el chat')
        }
      } catch (error) {
        this.errorMessage = 'Error al reportar el chat: ' + error.message
      }
    },

    emitInput() {
      this.filteredChats = this.userChats.filter((chat) => {
        return (
          chat.otherUserName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          chat.otherUserLastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          chat.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          chat.model.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      })
    },

    // método para enviar el mensaje
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        socket.emit('message', this.chatId, { text: this.newMessage, user: this.user })
        await axios.post('http://localhost:8080/chat/' + this.chatId, {
          user: this.user,
          message: this.newMessage
        })
        this.newMessage = ''
      }
    },

    async loadChat(chatID, chat) {
      this.chatId = chatID
      this.selectedChat = chat
      const response = await axios.get('http://localhost:8080/chat/' + chatID)
      this.messages = response.data.messages
      this.getReceiver(response.data.buyerID)
      socket.emit('join', chatID, this.$store.state.user._id, (error) => {
        if (error) {
          console.error('Error joining chat:', error)
        }
      })
    },
    beforeUnmount() {
      socket.disconnect()
      socket.off('message')
      socket.off('connectError')
      socket.off('join')
    },
    async getReceiver(id) {
      const response = await axios.get(`http://localhost:8080/users/${id}`)
      this.receiver = response.data
    }
  }
}
</script>

<style scoped>

.report-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  float: right;
}

.report-button {
  /* Designado al departamento de CSS (Adrián) para agregar estilos, está default */ 
}

#messageInput:focus ~ #sendButton svg path,
#messageInput:valid ~ #sendButton svg path {
  fill: #3c3c3c;
  stroke: white;
}

button,
input[type='file'] {
  border: 2px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  outline: none;
}

button:hover,
input[type='text']:hover,
input[type='file']:hover {
  border-color: #555;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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

.received-message {
  background-color: #d1d1d1;
  color: black;
  border-radius: 20px;
  padding: 5px 10px;
  margin-top: 0.5%;
  margin-left: 1%;
  margin-right: 1%;
  text-align: right;
  display: flex;
  align-items: center;
  height: 50px;
  align-self: flex-end;
  display: inline-block;
}

.general-container {
  display: flex;
  flex-direction: row;
  min-height: 85vh;
  width: 100%;
}

.minimized-chats {
  flex: 0 0 20%;
  overflow-y: auto;
  justify-content: flex-start;
  align-items: center;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  overflow: hidden;
}

.search-chat {
  display: flex;
  width: 85%;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  padding: 10px 16px;
  margin: 16px 10px;
}

.search-chat:focus,
.search-chat:hover {
  border-color: #000;
}

.chat {
  padding: 10px;
  width: 90%;
  background-color: #f7f7f7;
  transition: background-color 0.2s;
  border-bottom: 1px solid #ccc;
}

.minimized-chat:hover {
  background-color: #f0f0f0;
}

.minimized-chat:hover {
  flex: 0 0 20%;
  background-color: #f0f0f0;
}

.minimized-chat.active-chat {
  background-color: #fbc40e;
  color: white;
}

.active-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
}

.unread-messages {
  margin-left: 10px;
  background-color: red;
  color: white;
  padding: 2px 5px;
  border-radius: 50%;
}
.iconFile {
  margin-top: 10%;
}
.inputContainer {
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
}

.fileUploadWrapper {
  margin-right: 1%;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
}

#file {
  width: 50%;
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
  flex: 1;
}

.unread-messages {
  margin-left: 10px;
  background-color: red;
  color: white;
  padding: 2px 5px;
  border-radius: 50%;
}

h1 {
  margin-top: 0;
  margin-bottom: 0;
}

.chat:hover {
  background-color: #ebebeb;
}

.chat h4 {
  margin: 4px 0;
  color: #333;
  font-size: 1em;
  font-weight: normal;
}

.chat-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatContainer {
  max-height: 70vh;
  min-height: 70vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  cursor: default;
}

.messages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  padding: 10px;
  background-color: #ffffff;
  overflow-y: auto;
  max-height: 68vh;
  border-radius: 10px;
}

.sent-message,
.received-message {
  max-width: 75%;
  word-wrap: break-word;
  padding: 5px 10px;
  border-radius: 10px;
  margin: 4px 0;
  display: inline-block;
}

.received-message {
  margin: 4px 0;
  padding: 6px 12px;
  max-width: 60%;
  align-self: flex-start;
  background-color: #e9ecef;
  color: black;
  border-radius: 10px;
  border-top-left-radius: 0;
}

.message-text {
  overflow-wrap: break-word;
}

.sell-data {
  flex: 0 0 20%;
  margin-left: auto;
  border-left: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
}

.vehicle-carousel-container {
  margin-bottom: 20px;
  max-width: 100%;
}

.vehicle-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.specs {
  width: 100%;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.carousel__pagination {
  margin: 0;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.icon {
  margin-right: 0.5rem;
  width: 18px;
  height: auto;
}

p {
  display: flex;
  align-items: center;
}

strong {
  margin-right: 0.5rem;
}

.description {
  margin-top: 2rem;
}

.sent-message {
  margin: 4px 0;
  padding: 6px 12px;
  max-width: 60%;
  align-self: flex-end;
  background-color: #fbc40e;
  color: black;
  border-radius: 10px;
  border-top-right-radius: 0;
}

.formMessage {
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
  border-color: black;
}
.chat-input:focus {
  border-color: #474747;
  outline: none;
  background-color: white;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 768px) {
  .sent-message,
  .received-message {
    max-width: 80%;
  }
}

@media (max-width: 1024px) {
  .sell-data {
    display: none;
  }
}
</style>
