<script setup>
import { defineProps } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <Navbar />
    <main>
      <div class="wrapper">
        <h1>Vender</h1>
        <p>Prueba para ver cómo se ve el texto sobre la imagen que usamos de fondo. </p>
        <p> La imagen es solo referencial, está sujeta a muchos cambios.</p>
        <img src="@/assets/astonMartin.jpg" alt="astonMartin" class="wrapper-image">
      </div>

        <div class="boton">
          <RouterLink to="/sell">
            <button>Vende tu auto</button>
          </RouterLink>
        </div>
    </main>
  </div>
</template>

<style scoped>

.wrapper-image {
  position: relative;
  top: -105px;
  right: -22%;
  width: 700px; 
  border-radius: 10%;
}

.boton{
  position: absolute;
  top: 1150px; 
  left: 24%; 
}

.wrapper{
    background-color: #F0F0F0;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    color: black;
}

h1 {
  font-weight: 500;
  font-size: 3rem;
  position: relative;
  top: 80px;
  left: -22%;
  color: black;
}

p{
    color: black;
    font-size: 1rem;
    margin: 1rem 20%;
    position: relative;
    top: 100px;
    left: -22%;
}

main {
  text-align: center;
}

button {
  background-color: green;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 20px;
}

button:hover {
  color: black;
  background-color: greenyellow;
}

</style>