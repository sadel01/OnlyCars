<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="logo-container">
          <img src="@/assets/logoOnlyCars.svg" alt="logoOC" class="logo-image" />
        </RouterLink>
        <button class="hamburger" @click="toggleNav">&#9776;</button>
        <div class="nav-links" :class="{ active: navActive }">
          <RouterLink to="/" class="nav-link" @click="closeNav">Inicio</RouterLink>
          <RouterLink to="/catalog" class="nav-link" @click="closeNav">Catálogo</RouterLink>
          <RouterLink to="/contact" class="nav-link" @click="closeNav">Contacto</RouterLink>
          <RouterLink to="/about" class="nav-link" @click="closeNav">Nosotros</RouterLink>
          <RouterLink to="/sell" :class="'nav-link'" @click="closeNav">Vender</RouterLink>
        </div>
        <div class="nav-buttons" :class="{ active: navActive }">
          <RouterLink to="/chats" :class="'nav-link'" @click="closeNav" v-if="isLoggedIn"><font-awesome-icon :icon="['fas', 'message']" class="iconNavbar"/></RouterLink>
          <RouterLink to="/favorites" :class="'nav-link'" @click="closeNav" v-if="isLoggedIn"><font-awesome-icon :icon="['fas', 'heart']" class="iconNavbar"/></RouterLink>

          <RouterLink v-if="user" to="/profile" class="nav-button" @click="closeNav">
            <FontAwesomeIcon :icon="faUser" class="iconUser" /> {{ user.nombre + ' ' + user.apellido }}
          </RouterLink>
          <RouterLink v-else to="/login" class="nav-button" @click="closeNav">
            <FontAwesomeIcon :icon="faRightToBracket" /> Ingresar
          </RouterLink>
          <RouterLink v-if="!user" to="/register" class="nav-button" @click="closeNav"
            >Registrarse</RouterLink
          >
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons'

const store = useStore()
const navActive = ref(false)

const toggleNav = () => {
  navActive.value = !navActive.value
}

const closeNav = () => {
  navActive.value = false
}

const isLoggedIn = computed(() => store.state.user !== null)

const user = computed(() => store.state.user)
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #1f1f1f;
  height: 60px;
}

.iconUser{
  margin-right: 5px;
}

.iconNavbar{
  font-size: 18px;
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
  justify-content: flex-start;
  margin-right: 40px;
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

.nav-links {
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
}
.nav-link:hover{
  color: #FBC40E;

}

.nav-link,
.nav-button {
  padding: 5px 10px;
  text-decoration: none;
  font-size: 1rem;
  margin: 0 1rem;
}

.nav-link:hover,
.nav-button:hover {
  color: #fbc40e;
}

.nav-buttons {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  color: #fbc40e;
}
.nav-button:hover{
  color: #c19400;
}



@media (max-width: 1024px) {
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
    color: #fbc40e;
  }
}
</style>
