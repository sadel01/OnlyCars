<template>
    <div v-if="user">
      <h1>Perfil de Usuario</h1>
      <p>Nombre: {{ user.nombre }}</p>
      <p>Apellido: {{ user.apellido }}</p>
      <p>Email: {{ user.mail }}</p>
      <p>RUT: {{ user.rut }}</p>
      <button class="logoutButton" @click="logout">Cerrar sesion</button>
    </div>
    <div v-else>
      <h1>Perfil de Usuario</h1>
      <p>Nombre: undefined</p>
      <p>Apellido: undefined</p>
      <p>Email: undefined</p>
      <p>RUT: undefined</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profile',
    computed: {
      user() {
        return this.$store.state.user;
      },
    },
    methods: {
      logout() {
        this.$store.commit('setUser', null); // Limpia los datos del usuario en el almacén Vuex
        this.$router.push('/login'); // Redirige al usuario a la página de inicio de sesión
      },
    },
  };
  </script>
  
  <style scoped>
  /* Aquí van tus estilos */
  </style>