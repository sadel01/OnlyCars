<template>
  <main>
    <div class="productDetails">
      <p class="detalleVehiculo">{{ product.brand }} {{ product.model }}</p>
      <button class="closeButton" @click="closePanel">x</button>

      <carousel :items-to-show="1">
        <slide v-for="image in product.image" :key="image">
          <img :src="image" class="carousel__item" />
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>

      <div class="description">
        <div class="card">
          <FontAwesomeIcon :icon="faCalendarDays" class="icono" />
          <p class="productText productTitle">{{ product.year }}</p>
        </div>

        <div class="card">
          <FontAwesomeIcon :icon="faGasPump" class="icono" />
          <p class="productText productDescription">{{ product.fuel }}</p>
        </div>

        <div class="card">
          <FontAwesomeIcon :icon="faLocationDot" class="icono" />
          <p class="productText productDescription data">UBICACION</p>
        </div>

        <div class="card">
          <FontAwesomeIcon :icon="faWrench" class="icono" />
          <p class="productText productPriceNumber">{{ product.cylinderCapacity }}</p>
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
import {
  faGasPump,
  faCalendarDays,
  faCar,
  faMoneyBill,
  faLocationDot,
  faWrench
} from '@fortawesome/free-solid-svg-icons'
import 'vue3-carousel/dist/carousel.css'
import axios from 'axios'
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
      faCalendarDays: faCalendarDays,
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
    async fetchProductDetails(id) {
      if (id) {
        const response = await axios.get(`http://localhost:8080/catalog/${id}`)
        const post = response.data
        this.post = post
      } else {
        console.error('Product id is not defined')
      }
    },
    viewMore(id) {
      this.fetchProductDetails(id)
      window.open(`/catalog/${id}`, '_blank')
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
  width: 20%;
  height: 150px;
  max-height: 150px;
  border: 2px solid #1717172c;
  border-radius: 10px;
  background-color: #efefef5f;
  box-shadow: 3px 4px 5px rgb(185, 185, 185);
  margin: 0px 10px 0 10px;
}

.description {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  padding: 10px;
}

.detalleVehiculo {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: 700;
  text-align: center;
  margin-top: 0%;
  margin-bottom: 0%;
}

.verMas {
  margin-top: 4%;
  margin-bottom: 5%;
  margin-left: 6%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #fbc40e;
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 4% 39.3%;
  width: auto;
}
.verMas:hover{
  cursor: pointer;
}

.verMas:after {
  content: ' ';
  width: 0%;
  height: 100%;
  background: #c19400;
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
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  color: black;
  font-size: 25px;
  cursor: pointer;
  font-weight: bold;
}

.productDetails {
  position: relative;
  top: 0;
  right: -4px;
  width: 93.5%;
  height: auto;
  background-color: #cccccc5f;
  padding: 20px;
  padding-bottom: 30px;
  box-shadow: 3px 4px 5px rgb(218, 218, 218);
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 16px;
  border: 2px solid #0707072c;
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
  max-height: 400px;
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
