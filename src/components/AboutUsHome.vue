<script setup>
import { defineProps } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <Navbar />
    <main>
      <div class="wrapper">
        <h1>Nosotros</h1>
        <p>Somos un equipo muy profesional de desarrolladores, deberían comprar autos en esta página.</p>
        <p> Dinero, plata, guita, money.</p>
        <img src="@/assets/explorer.jpg" alt="explorer" class="wrapper-image">
      </div>
    </main>
  </div>
</template>

<style scoped>

.wrapper-image {
  position: relative;
  left: -22%;
  top: -55px;
  width: 700px; 
  border-radius: 10%;
}

.wrapper{
    background-color: #E5E5E5;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    color: black;
}

h1 {
  font-weight: 500;
  font-size: 3rem;
  position: absolute;
  top: 1600px;
  right: 22%;
  color: black;
}

p{
    color: black;
    font-size: 1rem;
    margin: 1rem 30%;
    position: relative;
    top: 220px;
    right: -22%;
}

main {
  text-align: center;
}

</style>