<template>
  <div class="container">
    <div class="search-bar">
      <input class="search-input" type="text" v-model="searchReport" placeholder="reporte de..." />
      <input class="search-input" type="text" v-model="searchChatCon" placeholder="chat con..." />
    </div>

    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Reporte de</th>
            <th>Chat con</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chat in reportedChats" :key="chat._id">
            <td>{{ chat.buyerName }} {{ chat.buyerLastName }}</td>
            <td>{{ chat.sellerName }} {{ chat.sellerLastName }}</td>
            <td class="actions">
              <button @click.stop="deleteProduct(product._id)" class="delete-button">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
}

.delete-button i {
  color: #6c757d;
}

.delete-button {
  background-color: #e0e0e0;
}

.delete-button:hover {
  background-color: rgba(220, 53, 69, 0.2);
}

.delete-button:hover i {
  color: #dc3545;
}
.search-input {
  flex: 1;
  margin: 0 10px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}
.search-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 20px;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
  position: relative;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  padding: 20px;
}
.table-container {
  overflow-x: auto;
}
.styled-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.styled-table thead tr {
  background-color: #fbc40e;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f9f9f9;
}

.styled-table tbody tr.selected-row {
  background-color: #f8f4e7;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>
