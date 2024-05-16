<template>
  <header>
    <div class="wrapper">
      <nav v-if="!user || user.rol !== 'admin'">
        <RouterLink to="/" class="logo-container">
          <img src="@/assets/logoOnlyCars.svg" alt="logoOC" class="logo-image" />
        </RouterLink>
        <button class="hamburger" @click="toggleNav">&#9776;</button>
        <div class="nav-links" :class="{ active: navActive }">
          <RouterLink to="/" class="nav-link" @click="closeNav">Inicio</RouterLink>
          <RouterLink to="/catalog" class="nav-link" @click="closeNav">Catálogo</RouterLink>
          <RouterLink to="/contact" class="nav-link" @click="closeNav">Contacto</RouterLink>
          <RouterLink to="/about" class="nav-link" @click="closeNav">Nosotros</RouterLink>
          <RouterLink to="/sell" class="nav-link" @click="closeNav">Vender</RouterLink>
          <RouterLink to="/profile" class="nav-link profile-link" @click="closeNav"
            >Perfil</RouterLink
          >
          <RouterLink to="/chats" class="nav-link chat-link" @click="closeNav">Chat</RouterLink>
          <RouterLink to="/favorites" class="nav-link favorites-link" @click="closeNav"
            >Favoritos</RouterLink
          >
        </div>
        <div class="nav-buttons" :class="{ active: navActive }">
          <RouterLink to="/chats" :class="'nav-link'" @click="closeNav" v-if="isLoggedIn"
            ><font-awesome-icon :icon="['fas', 'message']" class="iconNavbar"
          /></RouterLink>
          <RouterLink to="/favorites" :class="'nav-link'" @click="closeNav" v-if="isLoggedIn"
            ><font-awesome-icon :icon="['fas', 'heart']" class="iconNavbar"
          /></RouterLink>

          <RouterLink v-if="user" to="/profile" class="nav-button" @click="closeNav">
            <FontAwesomeIcon :icon="faUser" class="iconUser" />
            {{ user.nombre + ' ' + user.apellido }}
          </RouterLink>
          <RouterLink v-else to="/login" class="nav-button" @click="closeNav">
            <FontAwesomeIcon :icon="faRightToBracket" /> Ingresar
          </RouterLink>
          <RouterLink v-if="!user" to="/register" class="nav-button" @click="closeNav"
            >Registrarse</RouterLink
          >
        </div>
      </nav>

      <nav v-else>
        <RouterLink to="/catalogManagment" class="logo-container">
          <img src="@/assets/logoOnlyCars.svg" alt="logoOC" class="logo-image" />
        </RouterLink>
        <div class="nav-links" :class="{ active: navActive }">
          <RouterLink to="/catalogManagment" class="nav-link" @click="closeNav"
            >Catálogo</RouterLink
          >
          <RouterLink to="/userManagment" class="nav-link" @click="closeNav"
            >Gestionar Usuarios</RouterLink
          >
          <RouterLink to="/chatsManagment" class="nav-link" @click="closeNav"
            >Gestionar Chats</RouterLink
          >
        </div>

        <div class="nav-buttons" :class="{ active: navActive }">
          <RouterLink v-if="user" to="/profile" class="nav-button" @click="closeNav">
            <FontAwesomeIcon :icon="faUser" class="iconUser" />
            {{ user.nombre + ' ' + user.apellido }}
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
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue'
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

watchEffect(() => {
  document.body.style.overflow = navActive.value ? 'hidden' : 'auto'
})
</script>

<style scoped>
body {
  overflow-y: hidden;
  overflow-x: hidden;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #1f1f1f;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.profile-link,
.chat-link,
.favorites-link {
  display: none;
}

.iconUser {
  margin-right: 5px;
}

.iconNavbar {
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

.nav-link:hover {
  color: #fbc40e;
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

.nav-button:hover {
  color: #c19400;
}

@media (max-width: 1024px) {
  .profile-link,
  .chat-link,
  .favorites-link,
  .nav-link,
  .hamburger,
  .nav-buttons,
  .nav-links,
  .close-btn {
    transition: all 0.7s ease;
  }

  .profile-link,
  .chat-link,
  .favorites-link,
  .nav-link {
    display: block;
    width: 100%;
    text-align: left;
    margin-top: 10px;
    margin-left: 80px;
    padding: 15px 20px;
    color: white;
    font-size: 1.2rem;
    background-color: transparent;
    overflow-x: hidden;
    transform: translateY(-20px);
  }

  .hamburger {
    display: block;
    z-index: 1002;
  }

  .nav-buttons {
    display: none !important;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    width: 100%;
    justify-content: flex-start;
    flex-direction: column;
    background-color: #1f1f1f;
    align-items: center;
    padding-top: 20px;
    margin-top: 58px;
    overflow-y: hidden;
    overflow-x: hidden;
    visibility: hidden;
  }

  .nav-links.active {
    height: 100vh;
    visibility: visible;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    margin-top: 60px;
    overflow-x: hidden;
  }

  .close-btn {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 24px;
    color: white;
    cursor: pointer;
    z-index: 1002;
  }
}
</style>
