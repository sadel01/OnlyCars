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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique, eum saepe tenetur magni vel voluptatibus velit, quam numquam adipisci veniam perspiciatis consequuntur facere quis dolorem excepturi! Animi, perspiciatis consequuntur!</p>
        <RouterLink to="/catalog">
          <button>Ver Catalogo</button>
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped>

.wrapper{
    background-color: grey;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    padding-bottom: 3rem;
    color: white;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h2 {
  font-size: 1.2rem;
}

p{
    font-size: 1rem;
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
