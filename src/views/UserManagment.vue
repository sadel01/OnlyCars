<template>
    <div>
    <div class="container" >

        <div class="search">
            <input class="search-input" type="text" v-model="searchName" placeholder="Buscar por nombre">
            <input class="search-input" type="text" v-model="searchLastName" placeholder="Buscar por apellido">
            <input class="search-input" type="text" v-model="searchEmail" placeholder="Buscar por email">
            <input class="search-input" type="text" v-model="searchRut" placeholder="Buscar por RUT">

        </div>
        <div class="userList">
            <table class="aligned-table">
                <thead>
                    <tr class="header-table">
                        <th>ID</th>
                        <th>RUT</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Mail</th>
                        <th>Rol</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user._id" :class="{ 'changed': user.tipo !== user.originalTipo }" class="users-table">
                        <td> {{ user._id }} </td>
                        <td> {{ user.rut }} </td>
                        <td> {{ user.nombre }} </td>
                        <td> {{ user.apellido }} </td>
                        <td> {{ user.mail }} </td>
                        <td> {{ user.rol }} </td>

                        <td>
                            <select class="select-verified" v-model="user.tipo" @change="mostrarBoton() ">
                                <option value="verificado">Verificado</option>
                                <option value="normal">Normal</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        </div>
    |       <div class="buttons-container" :class="{ 'hidden': dataChanged }">
            <button class="aplicate-button" @click="aplicarCambio()">Aplicar</button>
            <button class="aplicate-button" @click="rehacerCambio()">Rehacer</button>
        
        </div>
        <div class="modal" v-if="showModal">
            <div class="modal-content">
                <button class="aplicate-button close-button " @click="closeModal()">x</button>
                 <p class="pop-up-text">¡Tus cambios se han realizado con exito!</p>
                <button class="aplicate-button accept-button" @click="closeModal()">Aceptar</button>
            </div>
        </div>
        <div class="modal-overlay" v-if="showModal"></div>

        
    </div>
   
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: [],
            searchName: '',
            searchEmail: '',
            searchRut: '',
            searchLastName: '',
            dataChanged: false,
            showModal: false
        }
    },
    async created() {
        const response = await axios.get('http://localhost:8080/admin/users')
        this.users = response.data.map(user => ({ ...user, originalTipo: user.tipo }));
        this.users.sort((a, b) => a.nombre.localeCompare(b.nombre));
    },
    computed: {
        filteredUsers() {
            return this.users.filter(user =>
                user.nombre.toLowerCase().includes(this.searchName.toLowerCase()) &&
                user.mail.toLowerCase().includes(this.searchEmail.toLowerCase()) &&
                user.apellido.toLowerCase().includes(this.searchLastName.toLowerCase()) &&
                user.rut.includes(this.searchRut)
            );
        }
    },
    methods: {
        mostrarBoton() {
            this.dataChanged = this.users.some(user => user.tipo !== user.originalTipo);
        },
        async aplicarCambio() {
            const changedUsers = this.users.filter(user => user.tipo !== user.originalTipo);
            for (const user of changedUsers) {
                await axios.post(`http://localhost:8080/admin/users/${user._id}`, { tipo: user.tipo });
                user.originalTipo = user.tipo;
            }

            
            
            this.dataChanged = false;

            this.showModal = true;
            
        },
        async rehacerCambio() {
            const changedUsers = this.users.filter(user => user.tipo !== user.originalTipo);
            for (const user of changedUsers) {
                await axios.post(`http://localhost:8080/admin/users/${user._id}`, { tipo: user.originalTipo });
                user.tipo = user.originalTipo;
            }
            this.dataChanged = false;
        },
        closeModal() {
            this.showModal = false;
        },

    }

}

</script>

<style scoped>
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
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    animation: modalAppear 0.5s ease-out;
}
.modal-content {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    height: 100%;
}
.aplicate-button.close-button {
    width: 35px;
    height: 35px;
    border: none;
    left: 5px;
    margin-top: 0;
}
.aplicate-button.accept-button {
    border: none;
    left: 65%;
}
.pop-up-text {
    margin-left: 12%;
    color: #1a1a1a;
}


.buttons-container {
    display: flex;
    position: relative;
    justify-content: flex-end; 
    margin-right: 3rem;
    top: -3rem;
    visibility: hidden; 
}

.buttons-container.hidden {
    visibility: visible; 
}
.select-verified {
  width: 60%;
  text-align: center;
  padding: 10px 10px 10px 10px;
  font-size: 15px;
  color: black;
  background-color: transparent;
  border-color: 1px solid black;
}
.select-verified:focus {
  outline: none;
  border-color: #fbc40e;
  box-shadow: 0 0 10px #fbc40e;
  background-color: white;
}
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
}

.search-input:focus {
  border-bottom: 4px solid #fbc40e;
  border-radius: 4px 4px 2px 2px;
}
.aplicate-button {
    transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  font-size: 15px;
  border-radius: 0.3em;
  border: 2px solid #1a1a1a;
  background: #ffffff;
  color: #090909;  
  width: 7rem;
  height: 2.5rem;
  font-weight: bold;
  margin-left: 1rem; 
  right: 2rem;
  margin-top: 1rem;
}

.aplicate-button:active{
  color: #666;
  box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.aplicate-button:before{
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.aplicate-button:after{
  content: "";
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #fbc40e;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.aplicate-button:hover {
  color: #ffffff;
  border-color: #fbc40e;
  transform: scale(1.05);
}

.aplicate-button:hover:before{
  top: -35%;
  background-color: #fbc40e;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.aplicate-button:hover:after {
  top: -45%;
  background-color: #fbc40e;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.header-table {
    background-color: #1a1a1a;
    color: white;
    text-align: center;
    font-weight: bold;
}
.changed {
    background-color: #fbc40e;
    color: black;
    font-weight: bold;
}
.users-table.changed:hover {
    background-color: #fbc40e; 
}



.aligned-table {
    width: 98%;
    text-align: left;
    border-collapse: collapse;
    text-align: center;
    border-bottom: 3px solid #1a1a1a;
}
.changed:nth-child(even) {
    background-color: #fbc40e !important; 
}
tr:nth-child(even) {
    background-color: #ebebeb;
}
.users-table:hover {
    background-color: #b3b3b3;
}

.aligned-table th,
.aligned-table td {
    padding: 10px;
    border: 1px solid #ddd;
}
.aligned-table td, .aligned-table th {
  border-radius: 5px;
}
.container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
}

.search {
    display: flex;
    justify-content: start;
    padding: 10px 10px 10px 10px;
    margin-bottom: 1rem;
    background-color: #1a1a1a;
}

.userList {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

input {
    margin: 10px;
    padding: 10px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 5px;
    width: 200px;
}
.container{
    overflow-x:auto;
    height: 90vh;
    margin-bottom: 1rem;
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
</style>