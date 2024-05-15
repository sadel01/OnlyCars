<template>
    <div>
        <h1>Chats Reportados</h1>

        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>

        <div v-for="chat in reportedChats" :key="chat._id" class="chat">
            <h2>Reporte de: {{ chat.buyerName }} {{ chat.buyerLastName }}</h2>
            <p>Chat con: {{ chat.sellerName}} {{ chat.sellerLastName }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {

  data() {
    return {
      errorMessage: '',
      userChats: [],
      reportedChats: []
    }
  },

  async created() {
    try {
      const response = await axios.get('http://localhost:8080/getReportedChats')
        this.reportedChats = response.data
    } catch (error) {
      this.errorMessage = 'Error al obtener los chats reportados: ' + error.message
    }

  }
}
</script>

<style scoped>
.chat {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}

.error-message {
  color: red;
}
</style>
