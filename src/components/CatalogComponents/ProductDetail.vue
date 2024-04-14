<template>
  <main>
    <div class="productDetails">
      <p>Detalles del vehículo</p>
      <button class="closeButton" @click="closePanel">Cerrar vista</button>
      <img :src="product.image" alt="Product image" class="content-image">
      <p class="productText productTitle">{{ product.brand }}</p>
      <p class="productText productDescription">{{ product.mileage }} KM</p>
        <p class="productText productDescription data">{{ product.transmission }}</p>
        <p class="productText productDescription data">{{ product.fuel }}</p>
        <p class="productText productPriceNumber">${{ product.price }} CLP</p>
      <button class="verMas"><span>Ver más</span></button>

    </div>
  </main>
</template>

// Componente para mostrar y cerrar el panel de detalles del vehiculo.

<script>
/*
export default {
  props: ['open', 'product'],
  methods: {
    closePanel() {
      this.$emit('close')
    }
  }
}
*/
export default {
  props: ['open', 'product'],
  data() {
    return {}
  },
  methods: {
    closePanel() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

.verMas{
    margin-top:3%;
    margin-bottom:5%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #FBC40E;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    border: none;
    padding: 5% 45%;
  }
  .verMas:after {
    content: " ";
    width: 0%;
    height: 100%;
    background: #C19400;
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
  }
  
  .verMas:hover::after {
    right: auto;
    left: 0;
    width: 100%;
  }
  
  .verMas span {
    text-align: center;
    text-decoration: none;
    width: 100%;
    color: black;
    font-size: 1.125em;
    font-weight: 700;
    letter-spacing: 0.1em;
    z-index: 20;
    transition: all 0.3s ease-in-out;
  }
  
  .verMas:hover span {
    color: white;
    animation: scaleUp 0.3s ease-in-out;
  }


  .closeButton {
    position: absolute;
    top: 10px;
    right: 10px;
  }

.productDetails {
  position: relative;
  top: 0;
  right: 0;
  width: 93.5%;
  height: 80vh;
  background-color: #efefef5f;
  padding: 20px;
  box-shadow: 3px 4px 5px rgb(185, 185, 185);
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 16px;
  border: 2px solid #1717172c;
}

.content-image {
  max-width: 100%;
  border-radius: 0%;
}
</style>
