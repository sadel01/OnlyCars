<template>
  <div class="container">
    <div class="search-bar">
      <input
        class="search-input"
        type="text"
        v-model="searchName"
        placeholder="Buscar por nombre"
      />
      <input
        class="search-input"
        type="text"
        v-model="searchLastName"
        placeholder="Buscar por apellido"
      />
      <input
        class="search-input"
        type="text"
        v-model="searchEmail"
        placeholder="Buscar por email"
      />
      <input class="search-input" type="text" v-model="searchRut" placeholder="Buscar por RUT" />
    </div>

    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Mail</th>
            <th>RUT</th>
            <th>Rol</th>
            <th>Verificado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(user, index) in paginatedUsers">
            <tr :class="{ 'selected-row': selectedUser && selectedUser._id === user._id }">
              <td>
                <input type="checkbox" v-model="selectedUsers" :value="user._id" @click.stop />
              </td>
              <td @click="selectUser(user)">
                <img
                  :src="user.imgProfile || '../src/assets/icons/userDefault.jpg'"
                  class="profile-img"
                  alt="profile"
                />
                <span class="user-name">{{ user.nombre }}</span>
              </td>
              <td @click="selectUser(user)">{{ user.apellido }}</td>
              <td @click="selectUser(user)">{{ user.mail }}</td>
              <td @click="selectUser(user)">{{ user.rut }}</td>
              <td @click="selectUser(user)">{{ user.rol }}</td>
              <td>
                <label class="switch">
                  <input
                    type="checkbox"
                    class="checkbox"
                    :checked="isVerified(user.tipo)"
                    @change="toggleVerification(user)"
                  />
                  <div class="slider"></div>
                </label>
              </td>
              <td class="actions">
                <button class="edit-button" @click.stop="editUser(user)">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="delete-button" @click.stop="deleteUser(user)">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
            <transition name="expand">
              <tr v-if="selectedUser && selectedUser._id === user._id" class="user-details-row">
                <td colspan="8">
                  <div class="user-details">
                    <div><strong>Nombre:</strong> {{ selectedUser.nombre }}</div>
                    <div><strong>Apellido:</strong> {{ selectedUser.apellido }}</div>
                    <div><strong>Email:</strong> {{ selectedUser.mail }}</div>
                    <div><strong>RUT:</strong> {{ selectedUser.rut }}</div>
                    <div><strong>Rol:</strong> {{ selectedUser.rol }}</div>
                    <div><strong>Verificado:</strong> {{ selectedUser.tipo }}</div>
                  </div>
                </td>
              </tr>
            </transition>
          </template>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
    </div>

    <div class="buttons-container" :class="{ hidden: !dataChanged }">
      <button class="apply-button" @click="aplicarCambio()">Aplicar</button>
      <button class="apply-button" @click="rehacerCambio()">Rehacer</button>
    </div>

    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <button class="apply-button close-button" @click="closeModal()">x</button>
        <p class="pop-up-text">¡Tus cambios se han realizado con éxito!</p>
        <button class="apply-button accept-button" @click="closeModal()">Aceptar</button>
      </div>
    </div>
<<<<<<< HEAD
    <div class="modal-overlay" v-if="showModal"></div>
=======
    <div class="buttons-container" :class="{ hidden: dataChanged }">
      <button class="aplicate-button" @click="aplicarCambio()">Aplicar</button>
      <button class="aplicate-button" @click="deshacerCambio()">Deshacer</button>
    </div>
    <div class="modal" v-if="showModal">
            <div class="modal-content">
                <button class="aplicate-button close-button " @click="closeModal()">x</button>
                 <p class="pop-up-text">¡Tus cambios se han realizado con exito!</p>
                <button class="aplicate-button accept-button" @click="closeModal()">Aceptar</button>
            </div>
        </div>
        <div class="modal-overlay" v-if="showModal"></div>
>>>>>>> origin/Adrian
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
      searchName: '',
      searchEmail: '',
      searchRut: '',
      searchLastName: '',
      dataChanged: false,
      showModal: false,
      selectedUser: null,
      selectedUsers: [],
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  async created() {
    const response = await axios.get('http://localhost:8080/admin/users')
    this.users = response.data.map((user) => ({ ...user, originalTipo: user.tipo }))
    this.users.sort((a, b) => a.nombre.localeCompare(b.nombre))
  },
  computed: {
    filteredUsers() {
      return this.users.filter(
        (user) =>
          user.nombre.toLowerCase().includes(this.searchName.toLowerCase()) &&
          user.mail.toLowerCase().includes(this.searchEmail.toLowerCase()) &&
          user.apellido.toLowerCase().includes(this.searchLastName.toLowerCase()) &&
          user.rut.includes(this.searchRut)
      )
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    }
  },
  methods: {
    mostrarBoton() {
      this.dataChanged = this.users.some((user) => user.tipo !== user.originalTipo)
    },
    async aplicarCambio() {
      const changedUsers = this.users.filter((user) => user.tipo !== user.originalTipo)
      for (const user of changedUsers) {
        await axios.post(`http://localhost:8080/admin/users/${user._id}`, { tipo: user.tipo })
        user.originalTipo = user.tipo
      }

      console.log('Se aplicaron cambios a :', changedUsers)
      this.dataChanged = false
      this.showModal = true
    },
    async deshacerCambio() {
      const changedUsers = this.users.filter((user) => user.tipo !== user.originalTipo)
      for (const user of changedUsers) {
        await axios.post(`http://localhost:8080/admin/users/${user._id}`, {
          tipo: user.originalTipo
        })
        user.tipo = user.originalTipo
      }
      this.dataChanged = false
    },
    closeModal() {
      this.showModal = false
    },
    selectUser(user) {
      this.selectedUser = this.selectedUser && this.selectedUser._id === user._id ? null : user
    },
    editUser(user) {
      // Implementar lógica para editar usuario
      console.log('Editar usuario:', user)
    },
    deleteUser(user) {
      // Implementar lógica para eliminar usuario
      console.log('Eliminar usuario:', user)
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    toggleVerification(user) {
      user.tipo = user.tipo === 'verificado' ? 'normal' : 'verificado'
      this.mostrarBoton()
    },
    isVerified(tipo) {
      return tipo === 'verificado'
    }
  }
}
</script>

<style scoped>
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

.search-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  margin: 0 10px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
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

.user-details-row {
  background-color: #f8f9fa;
}

.user-details {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}

.user-name {
  vertical-align: middle;
}

.actions {
  display: flex;
  justify-content: space-around;
}

.edit-button,
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

.edit-button i,
.delete-button i {
  color: #6c757d;
}

.edit-button,
.delete-button {
  background-color: #e0e0e0;
}

.edit-button:hover {
  background-color: #f5cd49;
}

.edit-button:hover i {
  color: black;
}

.delete-button:hover {
  background-color: rgba(220, 53, 69, 0.2);
}

.delete-button:hover i {
  color: #dc3545;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.buttons-container.hidden {
  display: none;
}

.apply-button {
  padding: 10px 20px;
  border: none;
  background-color: #fbc40e;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.apply-button:hover {
  background-color: #fbc40e;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  background-color: #fbc40e;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  height: 200px;
  width: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: modalAppear 0.5s ease-out;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.apply-button.close-button {
  width: 35px;
  height: 35px;
  border: none;
  margin-bottom: 15px;
  background-color: transparent;
  color: #ff0000;
}

.apply-button.accept-button {
  border: none;
}

.pop-up-text {
  margin-bottom: 15px;
  color: #1a1a1a;
}

@keyframes modalAppear {
  0% {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
}
.expand-enter, .expand-leave-to /* .expand-leave-active in <2.1.8 */ {
  max-height: 0;
  opacity: 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px; /* Adjusted for smaller size */
  height: 20px; /* Adjusted for smaller size */
}

.checkbox {
  display: none;
}

.slider {
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: 2px solid transparent; /* Adjusted for smaller size */
  transition: 0.3s;
  box-shadow: 0 0 10px 0 rgb(0, 0, 0, 0.25) inset;
  cursor: pointer;
}

.slider::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: #fff;
  transform: translateX(-20px); /* Adjusted for smaller size */
  border-radius: 20px;
  transition: 0.3s;
  box-shadow: 0 0 10px 3px rgb(0, 0, 0, 0.25);
}

.checkbox:checked + .slider::before {
  transform: translateX(20px); /* Adjusted for smaller size */
  box-shadow: 0 0 10px 3px rgb(0, 0, 0, 0.25);
}

.checkbox:checked + .slider {
  background-color: #fbc40e;
}

.checkbox:active + .slider::before {
  transform: translateX(10px); /* Adjusted for smaller size */
}
</style>
