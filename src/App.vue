<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Navbar />
  </div>
  <RouterView/>
  <div>
    <Footer />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}


</style>
