<template>
  <main>
    <div class="productDetails">
      <p class="detalleVehiculo">{{ product.brand }}</p>
      <button class="closeButton" @click="closePanel">X</button>
      
      <carousel :items-to-show="1">
        <slide v-for="image in product.image" :key="slide">
          <img :src="image" class="carousel__item " />
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>

      <div class="description">

        <div class="card"> 
          <FontAwesomeIcon :icon="faGaugeHigh" class="icono"/>
          <p class="productText productTitle">ECONOMIA</p> 
        </div>

        <div class="card">
          <FontAwesomeIcon :icon="faGasPump" class="icono"/> 
          <p class="productText productDescription">COMBUSTIBLE</p> 
        </div>

        <div class="card">
          <FontAwesomeIcon :icon="faLocationDot" class="icono"/>
          <p class="productText productDescription data">UBICACION</p> 
        </div>

        <div class="card">
          <FontAwesomeIcon :icon="faWrench" class="icono"/> 
          <p class="productText productPriceNumber">MOTOR</p>
        </div>

      </div>

      <button @click="viewMore(product._id)" class="verMas"><span>Ver más</span></button>
      
      

    </div>
  </main>
</template>

// Componente para mostrar y cerrar el panel de detalles del vehiculo.

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGasPump, faGaugeHigh, faCar, faMoneyBill, faLocationDot,faWrench } from '@fortawesome/free-solid-svg-icons'
import 'vue3-carousel/dist/carousel.css'
import axios from 'axios';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
library.add(faGasPump)

export default {
  components: {
    FontAwesomeIcon,
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
  props: ['open', 'product'],
  data() {
    return {
      faGasPump: faGasPump,
      faGaugeHigh: faGaugeHigh,
      faCar: faCar,
      faMoneyBill: faMoneyBill,
      faLocationDot: faLocationDot,
      faWrench: faWrench,
      slide: 0
    }
  },
  methods: {
    closePanel() {
      this.$emit('close')
    },
    viewMore(id){
      this.$router.push(`/catalog/${id}`);
    }
  },
  async created(){
    const response = await axios.get(`http://localhost:8080/catalog/${product.id}`);
    const post = response.data;
    this.post = post;
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
  width: 142px;
  height: 150px;
  border: 2px solid #1717172c;
  border-radius: 10px;
  background: efefef5f;
  box-shadow: 3px 4px 5px rgb(185, 185, 185);
  margin: 0px 10px 0 10px ;
  
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
    margin-top: 0%;
    margin-bottom: 0%;
}

.verMas{
  margin-top:4%;
  margin-bottom:5%;
  margin-left: 6%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #FBC40E;
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 4% 39.3%;
  
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
  background-color: #efefef5f;
  padding: 20px;
  padding-bottom: 30px;
  box-shadow: 3px 4px 5px rgb(185, 185, 185);
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 16px;
  border: 2px solid #1717172c;
  display: flex;
  flex-direction: column;
}

.content-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  border-radius: 10px;
}

.carousel__item {
  min-height: 200px;
  width: 90%;
  height: 400px;
  background-color: var(--vc-clr-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
