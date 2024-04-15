<template>
  <main>
    <div class="productDetails">
      <p class="detalleVehiculo">{{ product.name }}</p>
      <button class="closeButton" @click="closePanel">X</button>

      <img :src="product.image" alt="Product image" class="content-image">

      <div class="description">

        <div class="card"> 
          <FontAwesomeIcon :icon="faGaugeHigh" class="icono"/>
          <p class="productText productTitle">{{ product.brand }}</p> 
        </div>

        <div class="card">
          <FontAwesomeIcon :icon="faCar" class="icono"/> 
          <p class="productText productDescription">{{ product.mileage }} KM</p> 
        </div>

        <div class="card">
          <FontAwesomeIcon :icon="faGasPump" class="icono"/>
          <p class="productText productDescription data">{{ product.transmission }}</p> 
        </div>

        <div class="card">
          <FontAwesomeIcon :icon="faMoneyBill" class="icono"/> 
          <p class="productText productPriceNumber">${{ product.fuel }} CLP</p>
        </div>

      </div>
      <button class="verMas"><span>Ver más</span></button>

    </div>
  </main>
</template>

// Componente para mostrar y cerrar el panel de detalles del vehiculo.

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGasPump, faGaugeHigh, faCar, faMoneyBill } from '@fortawesome/free-solid-svg-icons'

library.add(faGasPump)

export default {
  components: {
    FontAwesomeIcon
  },
  props: ['open', 'product'],
  data() {
    return {
      faGasPump: faGasPump,
      faGaugeHigh: faGaugeHigh,
      faCar: faCar,
      faMoneyBill: faMoneyBill
    }
  },
  methods: {
    closePanel() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

.productText {
  font-size: 15px;
  color: black;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  text-align: center; 
  height: 100%;
}

.icono {
  color: #333;
  font-size: 40px; 
  margin-right: 10px;
  position: absolute;
  top: 20px;
  left: 20px;
}

.card {
  position: relative;
  width: 150px;
  height: 204px;
  border: 2px solid #1717172c;
  border-radius: 10px;
  background: efefef5f;
  box-shadow: 3px 4px 5px rgb(185, 185, 185);
  margin: 10px;
}

.description {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px; /* Ejemplo: Cambia el tamaño de la fuente a 14px */
  color: #333; /* Ejemplo: Cambia el color del texto a #333 */
  line-height: 1.5; /* Ejemplo: Cambia la altura de línea a 1.5 */
  padding: 10px; /* Ejemplo: Agrega un padding de 10px */
}

.detalleVehiculo{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    font-weight: 700;
    text-align: center;
    margin-top: 2%;
    margin-bottom: 2%;
}

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
  padding: 4% 45%;
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

.closeButton {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: black; 
  font-size: 22px; 
  cursor: pointer;
}

.productDetails {
  position: relative;
  top: 0;
  right: -4px;
  width: 93.5%;
  height: 85vh;
  justify-content: center;
  align-items: center;
  background-color: #efefef5f;
  padding: 20px;
  box-shadow: 3px 4px 5px rgb(185, 185, 185);
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 16px;
  border: 2px solid #1717172c;
}

.content-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  border-radius: 10px;
}
</style>
