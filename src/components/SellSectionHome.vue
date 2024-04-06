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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique, eum saepe tenetur magni vel voluptatibus velit, quam numquam adipisci veniam perspiciatis consequuntur facere quis dolorem excepturi! Animi, perspiciatis consequuntur!</p>
        <RouterLink to="/sell">
          <button>Vende tu auto</button>
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped>
.wrapper{
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    padding-bottom: 3rem;
    color: black;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

p{
    font-size: 1rem;
    margin: 1rem 20%;
}

main {
  text-align: center;
}

button {
  background-color: #f39c12;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 20px;
}

button:hover {
  background-color: #f39c12;
}

</style>