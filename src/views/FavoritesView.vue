<template>
  <div class="wrapper">
    <h1>Favoritos</h1>
    <div class="favorites-container">
      <div class="favorites-list">
        <div class="favorite-card" v-for="(car, index) in paginatedProducts" :key="index">
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
      cars: [
        {
          name: 'Auto 1',
          description: 'Descripción del auto 1',
          price: 1000,
          image: 'https://via.placeholder.com/150'
        },
        {
          name: 'Auto 2',
          description: 'Descripción del auto 2',
          price: 2000,
          image: 'https://via.placeholder.com/150'
        },
        {
          name: 'Auto 3',
          description: 'Descripción del auto 3',
          price: 3000,
          image: 'https://via.placeholder.com/150'
        },
        {
          name: 'Auto 3',
          description: 'Descripción del auto 3',
          price: 3000,
          image: 'https://via.placeholder.com/150'
        },
        {
          name: 'Auto 3',
          description: 'Descripción del auto 3',
          price: 3000,
          image: 'https://via.placeholder.com/150'
        },
        {
          name: 'Auto 3',
          description: 'Descripción del auto 3',
          price: 3000,
          image: 'https://via.placeholder.com/150'
        },
        {
          name: 'Auto 3',
          description: 'Descripción del auto 3',
          price: 3000,
          image: 'https://via.placeholder.com/150'
        },
        {
          name: 'Auto 3',
          description: 'Descripción del auto 3',
          price: 3000,
          image: 'https://via.placeholder.com/150'
        },
        {
          name: 'Auto 3',
          description: 'Descripción del auto 3',
          price: 3000,
          image: 'https://via.placeholder.com/150'
        },
        {
          name: 'Auto 3',
          description: 'Descripción del auto 3',
          price: 3000,
          image: 'https://via.placeholder.com/150'
        }
        // Agrega más autos aquí
      ],
      page: 1,
      perPage: 9
    }
  },
  methods: {
    previousPage() {
      this.page--
    },
    nextPage() {
      this.page++
    },
    goToPage(page) {
      this.page = page
    },
    async fetchFavorites() {
      const userId = this.$store.state.user._id
      const response = await axios.get('http://localhost:8080/favorites', {
        params: {
          userId: userId,
        }
      })
      const data = response.data
      console.log(data)
    }
  },
  computed: {
    maxPage() {
      return Math.ceil(this.cars.length / 9)
    },
    paginatedProducts() {
      const start = (this.page - 1) * this.perPage
      const end = start + this.perPage
      return this.cars.slice(start, end)
    }
  },
  created() {
    this.fetchFavorites()
  }
}
</script>

<style scoped>
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
