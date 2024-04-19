<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <div class="main-content">
      <RouterView/>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex: 1 0 auto;
}

footer {
  height: auto;
}

header {
  line-height: 1.5;
  height: auto;
}
</style>