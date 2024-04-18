<template>
    <main>
    <div>
        <div class="container">
            <div class="fila_uno">
            <p class="Title">{{ product.year }} {{ product.brand }} {{ product.model }}</p>
            <div class="imagen">
            <carousel :items-to-show="1">
                <slide v-for="image in product.image" :key="image">
                <img :src="image" class="carousel__item " />
                </slide>
                <template #addons>
                <navigation />
                <pagination />
                </template>
            </carousel>
            </div>
            <h1>{{ product.price }}</h1>
            <p>{{ product.fuel }}</p>
            <p>{{ product.transmission }}</p>
            <p>{{ product.mileage }}</p>
            <p>{{ product.location }}</p>
            <p>{{ product.engine }}</p>
            </div>
            <div >presio</div>
        </div>
        
    </div>
    </main>
  </template>
  
  <script>
  import axios from 'axios'
  import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  export default {
    data() {
      return {
        product: null
      }
    },
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation
    },
    async created() {
      const id = this.$route.params.id
    const response = await axios.get(`http://localhost:8080/catalog/${id}`);
      this.product = response.data
    }
  }
  </script>

  <style scoped>
  .imagen{
    width: auto;
    height: auto;
  }
  .container{
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: 10%;
  }
  .Title {
    font-size: 2rem;
    font-weight: bold;
  }
  .carousel__item {
  width: 100%;
  height: 100%;
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
