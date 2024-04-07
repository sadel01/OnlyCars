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
          <button>Ver Catalogo</button>
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
  background-image: url(@/assets/ferrari.jpg);
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
  background-color: #307672;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 20px;
}

button:hover {
  background-color: #1d4e4a;
}

button:active {
  background-color: #1d4e4a;
}

button:focus {
  outline: none;
}
</style>
