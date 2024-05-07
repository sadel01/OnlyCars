<template>
    <div class="container">
        
        <div class="search">
            <input type="text" v-model="searchName" placeholder="Search by name">
            <input type="text" v-model="searchLastName" placeholder="Search by Last Name">
            <input type="text" v-model="searchEmail" placeholder="Search by email">
            <input type="text" v-model="searchRut" placeholder="Search by RUT">
            
        </div>
        <div class="userList">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Mail</th>
                        <th>Rut</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user._id">
                        <td> {{user._id}} </td>
                        <td> {{user.nombre}} </td>
                        <td> {{user.apellido}} </td>
                        <td> {{user.mail}} </td>
                        <td> {{user.rut}} </td>
                        <td> {{user.tipo}}</td>
                        <td>
                            <select v-model="user.tipo" @change="mostrarBoton()">
                            <option value="verificado">Verificado</option>
                            <option value="normal">normal</option>
                        </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button v-if="dataChanged" @click="aplicarCambio()">Aplicar</button>
        </div>
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
            dataChanged: false
        }
    },
    async created() {
        const response = await axios.get('http://localhost:8080/admin/users')
        this.users = response.data.map(user => ({ ...user, originalTipo: user.tipo }));
        
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
    mostrarBoton(){
        this.dataChanged = true
    },
    async aplicarCambio() {
    const changedUsers = this.users.filter(user => user.tipo !== user.originalTipo);
    for (const user of changedUsers) {
      await axios.post(`http://localhost:8080/admin/users/${user._id}`, { tipo: user.tipo });
      user.originalTipo = user.tipo;
    }

    console.log('Se aplicaron cambios a :', changedUsers);
    },

  }
  
}

</script>

<style scoped>
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
    border: 1px solid rgb(255, 0, 0);
}
.userList {
    
    border: 1px solid rgb(8, 0, 255);
}

input{
    margin: 10px;
    padding: 10px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 5px;
    width: 200px;
}


</style>
  