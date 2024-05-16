<template>
  <div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div class="search">
      <input class="search-input" type="text" v-model="searchReport" placeholder="reporte de..." />
      <input class="search-input" type="text" v-model="searchChatCon" placeholder="chat con..." />
    </div>
    <div></div>
    <div>
      <table v-if="reportedChats.length > 0">
        <thead>
          <tr>
            <th>Reporte de</th>
            <th>Chat con</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chat in reportedChats" :key="chat._id">
            <td>{{ chat.buyerName }} {{ chat.buyerLastName }}</td>
            <td>{{ chat.sellerName }} {{ chat.sellerLastName }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No se encontraron chats reportados.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      errorMessage: '',
      reportedChats: [],
      searchReport: '',
      searchChatCon: ''
    }
  },
  computed: {
    filteredChats() {
      return this.reportedChats.filter((chat) => {
        return (
          chat.buyerName.toLowerCase().includes(this.searchReport.toLowerCase()) &&
          chat.sellerName.toLowerCase().includes(this.searchChatCon.toLowerCase())
        )
      })
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
.search-input {
  max-width: 190px;
  background-color: #f5f5f5;
  color: #242424;
  padding: 0.13rem 0.8rem;
  min-height: 40px;
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 1.15;
  box-shadow: 0px 10px 20px -18px;
  font-size: 16px;
  margin-right: 15px;
}
.search-input:focus {
  border-bottom: 4px solid #fbc40e;
  border-radius: 4px 4px 2px 2px;
}
.search {
  display: flex;
  justify-content: start;
  padding: 10px;
  background-color: #1a1a1a;
  position: sticky;
  top: -10px;
  z-index: 1;
  width: 100%;
  margin-bottom: 0;
  margin-right: 10px;
}
.error-message {
  color: red;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
