<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">HOME</RouterLink>
        <RouterLink to="/catalog">CATALOGO</RouterLink>
        <RouterLink to="/contact">CONTACTO</RouterLink>
        <RouterLink to="/about">NOSOTROS</RouterLink>
        <RouterLink to="/sell">VENDER</RouterLink>
        
      </nav>
    </div>
  </header>

</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.login-icon {
  display: block;
  width: 27px; 
  height: 25px;
 }
.wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background-color: #307672;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.wrapper nav{
    margin-left: 10%;
    margin-right: 10%;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

nav {
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}


</style>