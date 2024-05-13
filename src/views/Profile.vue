<template>
    <div v-if="user" class="profile-container">
      <div class="profile-image"></div>
  
      <div v-show="!editing">
        <h1>Perfil de Usuario</h1>
        <p><span class="label">Nombre:</span> {{ user.nombre }}</p>
        <p><span class="label">Apellido:</span> {{ user.apellido }}</p>
        <p><span class="label">Email:</span> {{ user.mail }}</p>
        <p><span class="label">RUT:</span> {{ user.rut }}</p>
        <p><span class="label">Verificado:</span> {{ verificacion }}</p>
        <div class="button-group">
          <button class="editButton" @click="editProfile">Editar Perfil</button>
          <button class="logoutButton" @click="logout">Cerrar Sesión</button>
        </div>
      </div>
      
      <div v-show="editing" class="edit-form">
        <h2>Editar Perfil</h2>
        <form @submit.prevent="saveProfile">
          <label for="nombre">Nombre:</label>
          <input id="nombre" v-model="editableUser.nombre" placeholder="Nombre" />
          
          <label for="apellido">Apellido:</label>
          <input id="apellido" v-model="editableUser.apellido" placeholder="Apellido" />
          
          <label for="email">Email:</label>
          <input id="email" v-model="editableUser.mail" type="email" placeholder="Email" />
          
          <label for="rut">RUT:</label>
          <input id="rut" v-model="editableUser.rut" placeholder="RUT" />
          
          <div class="form-buttons">
            <button type="submit" class="saveButton">Guardar</button>
            <button type="button" class="cancelButton" @click="cancelEdit">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
    
    <div v-else class="profile-container">
      <h1>Perfil de Usuario</h1>
      <p>No hay datos de usuario para mostrar.</p>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Profile',
    data() {
      return {
        editing: false,
        editableUser: {},
      };
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
    },
    methods: {
      editProfile() {
        this.editableUser = { ...this.user };
        this.editing = true;
      },
      cancelEdit() {
        this.editing = false;
      },
      logout() {
        this.$store.commit('setUser', null);
        this.$router.push('/login');
      },
    },
    created(){
        this.verificacion = "No";
        if (this.user.tipo === 'verificado') {
          this.verificacion = "Si";
        }
    }
  };
  </script>
  
  <style scoped>

.profile-container {
  position: relative;
  background-color: #1a1a1a;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.profile-image {
  position: absolute;
  top: 20px;
  right: 20px; 
  width: 100px; 
  height: 100px; 
  background-image: url('/src/assets/icons/userDefault.jpg');
  background-size: cover;
  border-radius: 50%;
}

.profile-container {
  background-color: #1a1a1a;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
  
  .user-info {
    margin-bottom: 20px;
  }
  
  .label {
    font-weight: bold;
  }
  
  .logoutButton, .editButton {
  background-color: transparent;
  color: white;
  border: 2px solid #FBC40E;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
}
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  .editButton {
    background-color: #FBC40E;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 4px;
    outline: none;
  }
  
  .edit-form {
    margin-top: 20px;
    background: #1a1a1a; 
    padding: 20px;
    border-radius: 5px;
    color: #fff; 
}
  
  .edit-form h2 {
    margin-bottom: 15px;
  }
  
  .edit-form input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #424242;
    background-color: #2e2e2e;
    border-radius: 4px;
    color: #fff;
  }
  
  .form-buttons {
    display: flex;
    justify-content: flex-end;
  }
  
  .saveButton {
    background-color: #FBC40E;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 4px;
    outline: none;
  }
  
  .cancelButton {
  background-color: transparent;
  color: white;
  border: 2px solid #FBC40E;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
}

  .edit-form label {
  font-weight: bold;
  display: block;
  margin-top: 10px;
}

.input-group {
  margin-bottom: 10px;
}

.input-group input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  margin-top: 20px;
}
  </style>
  