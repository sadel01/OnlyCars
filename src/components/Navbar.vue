<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <img src="@/assets/oc.svg" alt="logoOC" class="logo-image">
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">Inicio</RouterLink>
          <RouterLink to="/catalog" class="nav-link">Catalogo</RouterLink>
          <RouterLink to="/contact" class="nav-link">Contactos</RouterLink>
          <RouterLink to="/about" class="nav-link">Nosotros</RouterLink>
        </div>
        <div class="nav-buttons">
          <RouterLink to="/login" class="nav-button"><FontAwesomeIcon :icon="faRightToBracket" /> Ingresar</RouterLink>
          <RouterLink to="/register" class="nav-button">Registrarse</RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.wrapper {
    display: flex;
    justify-content: space-between; /* Centrado horizontal de los elementos de nav */
    align-items: center;
    padding: 0 2rem;
    background-color: #1f1f1f;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 60px;
}

nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center; /* Asegura que nav-links y nav-buttons estén centrados */
}

/* tamaño logo */
.logo-image {
    height: auto;
    width: 70px;
    filter: invert(1);
}

.nav-links, .nav-buttons {
    display: flex;
    align-items: center;
}

.nav-link {
    margin: 0 2rem; /* Espaciado uniforme para centrar */
    padding: 5px 10px;
    text-decoration: none;
    color: #ffffff;
    font-size: 1rem;
}

.nav-button {
    margin-left: 2rem;
    text-decoration: none;
    color: #FBC40E;
    font-size: 1rem;
}

.nav-link:hover, .nav-button:hover, .sell-button:hover {
    text-decoration: underline;
    color: #FBC40E;
    background-color: #1f1f1f;
}
</style>
