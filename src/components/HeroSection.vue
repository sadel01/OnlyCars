<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div id="app">
    <Navbar />
    <main>
      <div class="wrapper">
        <h1>OnlyCars</h1>
        <h2>Subtitulo</h2>
        <p>Prueba de cómo se ve este texto sobre la imagen de un Ferrari rojo</p>
        <img src="@/assets/oc.svg" alt="logoOC" class="wrapper-image">
      </div>

        <div class="botoncito">
          <RouterLink to="/catalog">
            <button>
    <span>Ver Catalogo</span>
    <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
    </svg>
</button>
          </RouterLink>
        </div>
    </main>
  </div>
</template>

<style scoped>

.wrapper-image {
  position: relative;
  top: -200px;
  right: -7.5%;
  width: 100px; 
  border-radius: 10%;
}

.botoncito{

  position: absolute;
  top: 430px; /*570*/
  left: 870px; /*1620*/
}

.wrapper {
  position: relative;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 25rem;
}

.wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/ferrari.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(50%);
  z-index: -1;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  font-weight: bold ;
  position: relative;
  top: -10px;
  color: white;
}

h2 {
  font-size: 1.2rem;
  position: relative;
  top: -15px;
  color: white;
}

p{
    font-size: 1rem;
    color: white;
    position: relative;
    margin: 1rem 20%;
}

main {
  text-align: center;
}

button {
  cursor: pointer;
  font-weight: 700;
  font-family: Helvetica,"sans-serif";
  transition: all .2s;
  padding: 10px 20px;
  border-radius: 100px;
  background: #FBC40E;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  font-size: 15px;
}

button:hover {
  background: #FBC40E;
}

button > svg {
  width: 34px;
  margin-left: 10px;
  transition: transform .3s ease-in-out;
}

button:hover svg {
  transform: translateX(5px);
}

button:active {
  transform: scale(0.95);
}



</style>
