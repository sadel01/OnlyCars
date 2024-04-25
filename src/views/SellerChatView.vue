<template>
    <div class="general-container">
      <div class="chat-container">
        <div class="minimized-chats">
          <input class="search-chat" type="text" placeholder="Buscar.." @input="emitInput" />
          <div v-for="chat in sellerChats" :key="chat.id" class="chat" @click="loadChat(chat._id)">
            <h4>{{ chat.buyerName }} {{ chat.buyerLastName }}</h4>
            <h4>{{ chat.brand }} {{chat.model }}</h4>
          </div>
        </div>
  
        <div class="chat">
          <div class="chat-header">
            <h1>{{receiver.nombre }} {{receiver.apellido }}</h1>
          </div>
          <div class="messages">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="{
                'sent-message': message.user === user,
                'received-message': message.user !== user
              }"
            >
              <p>{{ message.text }}</p>
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
    data() {
      return {
        messages: [],
        newMessage: '',
        error: null,
        chatId: null,
        receiver: '',
        sellerChats: []
      }
    },
    async created() {
      const response = await axios.get('http://localhost:8080/findSellerChats', {
        params: {
          sellerID: this.$store.state.user._id
        }
      })
      this.sellerChats = response.data
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
          socket.emit('message', this.chatId, { text: this.newMessage, user: this.user })
          this.newMessage = ''
        }
      },
      async uploadMessages() {
        await axios.post('http://localhost:8080/chat/' + this.chatId, {
          id: this.chatId,
          message: this.messages[this.messages.length - 1]
        })
      },
  
      async loadChat(chatID) {
        console.log('id:' + this.sellerChats.buyerName)
        this.chatId = chatID
        const response = await axios.get('http://localhost:8080/chat/' + chatID)
        console.log('enviando solicitud a chat:' + this.chatId)
        console.log('mensajes:', response.data.messages)
        this.messages = response.data.messages
        this.getReceiver(response.data.buyerID)
        socket.emit('join', chatID, this.$store.state.user._id, (error) => {
          if (error) {
            console.error('Error joining chat:', error)
          }
        })
      },
      async getReceiver(id) {
      const response = await axios.get(`http://localhost:8080/users/${id}`)
      console.log(response.data)
      this.receiver = response.data
    }
    }
  }
  </script>
  
  <style scoped>
  .search-chat {
    width: calc(93% - 20px); 
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none; 
  }
  
  .search-chat:focus,
  .search-chat:hover {
    border-color: #000; 
  }
  h2 {
    margin-top: 18%;
  }
  
  #messageInput:focus ~ #sendButton svg path,
  #messageInput:valid ~ #sendButton svg path {
    fill: #3c3c3c;
    stroke: white;
  }
  
  button, input[type="text"], input[type="file"] {
    border: 2px solid #ddd; 
    padding: 8px 16px; 
    border-radius: 4px; 
    outline: none; 
  }
  
  button:hover, input[type="text"]:hover, input[type="file"]:hover {
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
    border-right: 1px solid #ccc;
    padding: 10px;
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
    width: calc(68% - 10px); 
    background-color: #f7f7f7; 
    cursor: pointer; 
    transition: background-color 0.2s; 
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
  }
  
  .messages {
    display: flex; 
    flex-direction: column; 
    align-items: flex-start;
    max-width: 100%; 
    padding: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 10px;
    overflow-y: auto;
    max-height: 70vh;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    .sent-message, .received-message {
      max-width: 80%; 
    }
  }
  </style>
  