<template>
  <main>
    <div>
      <div class="container">
        <div class="fila_uno">
          <p class="Title">{{ product.year }} {{ product.brand }} {{ product.model }}</p>
          <div class="imagen">
            <carousel :items-to-show="1">
              <slide v-for="image in product.image" :key="image">
                <img :src="image" class="carousel__item" />
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
          <button id="botonContactar" type="submit" @click="contactSeller">
            <span>Contactar al vendedor </span>
          </button>
        </div>
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
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async contactSeller() {
      const response = await axios.post('http://localhost:8080/chat/startChat', {
        buyerID: this.user._id,
        sellerID: this.product.user._id,
        productID: this.product._id
      })

      const chatID = response.data._id

      this.$store.commit('setChat', {
        _id: chatID,
        buyerID: this.user._id,
        sellerID: this.product.user._id,
        productID: this.product._id
      });

      console.log(this.$store.state.chat)

      this.$router.push(`/chat/${chatID}`)
    }
  },
  async created() {
    const id = this.$route.params.id
    const response = await axios.get(`http://localhost:8080/catalog/${id}`)
    this.product = response.data
  }
}
</script>

<style scoped>
.imagen {
  width: auto;
  height: auto;
}
.container {
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

button[type='submit'] {
  margin-top: 5%;
  margin-bottom: 5%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #fbc40e;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 3% 5%;
}
button[type='submit']:after {
  content: ' ';
  width: 0%;
  height: 100%;
  background: #c19400;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

button[type='submit']:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

button[type='submit'] span {
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

button[type='submit']:hover span {
  color: white;
  animation: scaleUp 0.3s ease-in-out;
}
</style>
