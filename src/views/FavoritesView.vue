<template>
  <div class="wrapper">
    <h1>Favoritos</h1>
    <div class="favorites-container">
      <div class="favorites-list">
        <div v-for="car in cars" :key="car._id">
          <img :src="car.image" :alt="car.name" />
          <div class="favorite-info">
            <h2>{{ car.name }}</h2>
            <p>{{ car.description }}</p>
            <p>Precio: ${{ car.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="navigation">
      <button v-if="page > 1" @click="previousPage" class="buttonPage">Anterior</button>
      <button
        v-for="n in maxPage"
        :key="n"
        @click="goToPage(n)"
        :class="{ buttonPage: true, buttonPageActive: n === page }"
      >
        {{ n }}
      </button>
      <button v-if="page < maxPage" @click="nextPage" class="buttonPage">Siguiente</button>
    </div>

    <div></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      cars: [],
      page: 1, 
      perPage: 9 
    }
  },
  methods: {
    previousPage() {
      if (this.page > 1) {
        this.page--
      }
    },
    nextPage() {
      if (this.page < this.maxPage) {
        this.page++
      }
    },
    goToPage(page) {
      this.page = page
    },
    async fetchFavorites() {
      const userId = this.$store.state.user._id
      try {
        const response = await axios.get('http://localhost:8080/favorites', {
          params: {
            userId: userId
          }
        })
        console.log('Autos favoritos:', response.data)
        this.cars = response.data
      } catch (error) {
        console.error('Error al obtener los autos favoritos:', error)
      }
    }
  },
  computed: {
    maxPage() {
      return Math.ceil(this.cars.length / this.perPage)
    },
    paginatedProducts() {
      const start = (this.page - 1) * this.perPage
      const end = Math.min(start + this.perPage, this.cars.length)
      return this.cars.slice(start, end)
    }
  },
  created() {
    this.fetchFavorites()
  }
}
</script>

<style scoped>

img {
  max-height: 300px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.favorites-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.favorites-list {
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
}

.favorite-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.favorite-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.favorite-info {
  padding: 10px;
}

.navigation {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 40px;
}

.pageButton {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 2%;
  margin-bottom: 2%;
  padding-bottom: 5px;
}

.buttonPage {
  margin: 0 0.3%;
  border-radius: 10px;
  background-color: white;
  padding: 6px 12px;
  font-size: 15px;
  border: 2px solid #fbc40e;
  transition: all 0.3s ease-in-out;
}

.buttonPageActive {
  background-color: #fbc40e;
  transform: scale(1.13);
  border: 1px solid #fbc40e;
  font-weight: bold;
}

.buttonPage:hover {
  background-color: #fbc40e;
  border: 1px solid #c19400;
  color: white;
  font-weight: bold;
}
</style>
