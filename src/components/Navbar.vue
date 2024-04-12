<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="logo-container">
          <img src="@/assets/logoOnlyCars.svg" alt="logoOC" class="logo-image">
        </RouterLink>
        <button class="hamburger" @click="toggleNav">&#9776;</button>
        <div class="nav-links" :class="{ 'active': navActive }">
          <RouterLink to="/" class="nav-link" @click="closeNav">Inicio</RouterLink>
          <RouterLink to="/catalog" class="nav-link" @click="closeNav">Catálogo</RouterLink>
          <RouterLink to="/contact" class="nav-link" @click="closeNav">Contactos</RouterLink>
          <RouterLink to="/about" class="nav-link" @click="closeNav">Nosotros</RouterLink>
        </div>
        <div class="nav-buttons" :class="{ 'active': navActive }">
          <RouterLink to="/login" class="nav-button" @click="closeNav">
            <FontAwesomeIcon :icon="faRightToBracket" /> Ingresar
          </RouterLink>
          <RouterLink to="/register" class="nav-button" @click="closeNav">Registrarse</RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const navActive = ref(false);

const toggleNav = () => {
  navActive.value = !navActive.value;
};

const closeNav = () => {
  navActive.value = false;
};

const isMobile = () => window.innerWidth < 768;

onMounted(() => {
  window.addEventListener('resize', closeNav);
});

onUnmounted(() => {
  window.removeEventListener('resize', closeNav);
});
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #1f1f1f;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
}

nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-image {
  height: auto;
  width: 70px;
  filter: invert(1);
}

.hamburger {
  display: none;
  font-size: 1.5rem;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-links, .nav-buttons {
  display: flex;
  align-items: center;
}

.nav-link, .nav-button {
  margin: 0 1rem;
  padding: 5px 10px;
  text-decoration: none;
  color: white;
  font-size: 1rem;
}

.nav-button {
  color: #FBC40E;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-links,
  .nav-buttons {
    position: fixed;
    top: 60px; 
    left: 0;
    right: 0;
    flex-direction: column;
    width: 100%;
    display: none;
    background-color: #1f1f1f;
    z-index: 1000;
    padding-top: 10px;
  }

  .nav-links.active,
  .nav-buttons.active {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-link,
  .nav-button {
    width: 100%;
    text-align: left;
    padding: 10px 20px; 
    border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
    color: white; 
    background-color: transparent;
  }

  .nav-button {
    color: #FBC40E; 
  }
}

</style>
