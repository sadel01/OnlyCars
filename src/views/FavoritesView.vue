<template>
  <div class="wrapper">
    <h1 class="title">Favoritos</h1>
    <div class="favorites-container">
      <div class="favorites-list">
      <div v-for="car in cars" :key="car._id" class="favorite-card" @click=goCatalog(car._id)>
        <div class="imageContainer">
        <img :src="car.image" :alt="car.name" class="carImage"/>
        </div>
        <div class="favorite-info">
          <div class="header">
        <h2 class="title-car">{{ car.year }} {{ car.brand }} {{ car.model }}</h2>
        <label class="containerFav" @click.stop="addToFavorites(car)">
                <input type="checkbox" :checked="isFavorite(car)" />
                <div class="checkmark">
                  <svg viewBox="0 0 256 256">
                    <rect fill="none" height="256" width="256"></rect>
                    <path
                      d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                      stroke-width="20px"
                      stroke="black"
                      fill="none"
                    ></path>
                  </svg>
                </div>
              </label>
            </div>
        <p class="precio"><strong>Precio: ${{ car.price }}</strong></p>
        <p><strong>Kilometraje: </strong> {{ car.mileage }}</p>
        <p><strong>Cilindraje: </strong> {{ car.cylinderCapacity }}</p>
        <p><strong>Ubicación: </strong> {{ car.comuna }}, {{ car.region }}</p>
        <p><strong>Dueño(a): </strong> {{ car.user.name }} {{ car.user.lastName }}</p>
        <p class="description"><strong>Descripción: </strong>{{ car.description }}</p>
        
        
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
    async addToFavorites(car) {
      try {
      if (!this.$store.state.user) {
        this.$router.push('/login');
        return;
      }
      
      this.isLoading = true
      const user = this.$store.state.user
      const vehicleData = {
        userId: user._id,
        postId: car._id
      }
      if (this.isFavorite(car)) {
        // Si el producto ya está en favoritos, lo eliminamos
        await axios.delete(`http://localhost:8080/favorites`, { data: vehicleData })
      } else {
        // Si el producto no está en favoritos, lo agregamos
        await axios.post('http://localhost:8080/favorites', vehicleData)
      }
      // Actualizamos la lista de favoritos
      await this.fetchFavorites()
      } catch (error) {
      this.errorMessage = 'Error al actualizar los favoritos'
      setTimeout(() => {
        this.errorMessage = ''
      }, 1500)
      console.error('Error al actualizar los favoritos:', error)
      } finally {
      this.isLoading = false
      }
    },
    async fetchFavorites() {
      console.log('Fetching favorites...')
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
    },
    isFavorite(car) {
      return this.cars.some((car) => car._id === car._id)
    },
    goCatalog(id) {
    this.$router.push(`/catalog/${id}`)
    window.scrollTo(0, 0);
  },
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
.favorite-info h2 {
  margin-bottom: 0.5rem;
}
.favorite-info p {
  margin-bottom: 0.2rem;
}
.containerFav input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.containerFav {
  display: block;
  position: absolute; 
  top: 10px;
  right: 10px; 
  z-index: 1;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  transition: 100ms;
  align-self: flex-end;
  margin-bottom: 1rem;

}

.checkmark {
  top: 0;
  left: 0;
  height: 2rem;
  width: 2rem;
  transition: 100ms;
  animation: dislike_effect 400ms ease;
}

.containerFav input:checked ~ .checkmark path {
  fill: #fbc40e;
  stroke: #a37d00;
  stroke-width: 15;
}

.containerFav input:checked ~ .checkmark {
  animation: like_effect 400ms ease;
}

.containerFav:hover {
  transform: scale(1.1);
}

@keyframes like_effect {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes dislike_effect {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.precio{
  font-size: 16px;
}
.title{
  margin-top: 2rem;
  display: flex; 
  align-items: center; 
}
.title-car {
  position: relative;
  color: black;
  font-size: 1.5em;
  font-weight: bold;
  display: inline-block;
}
.description {
  text-align: justify;
  color: black;
  font-size: 15px;
  max-height: 5.8rem;
  overflow-y: auto;
  padding-right: 15px;
}
.carImage {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.imageContainer {
  height: 18em;
  overflow: hidden;
}
.favorites-container {
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.favorite-card {
  position: relative;
  width: calc(33% - 20px);
  margin: 10px;
  padding: 1em;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
}

.favorite-card:hover {
  border: 1px solid #0707072c;
  transform: scale(1.015);
  box-shadow: 3px 4px 5px rgb(218, 218, 218);
  background-color: #bdbdbd8f;
  transition: all 0.3s ease-in-out;
}
.favorite-info {
  padding: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.wrapper {
  width: 84%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 8%;
  padding-left: 8%;
  position: relative;
}

.favorites-list {
  display: flex;
  flex-wrap: wrap;
}

.navigation {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.buttonPage {
  border-radius: 10px;
  background-color: white;
  padding: 6px 12px;
  font-size: 15px;
  border: 2px solid #fbc40e;
  transition: all 0.3s ease-in-out;
  height: 2rem; 
  font-weight: bold;
  margin-bottom: 2rem;
}

.buttonPageActive {
  background-color: #e9b302;
  transform: scale(1.13);
  border: 1px solid #fbc40e;
  font-weight: bold;
}

.buttonPage:hover {
  cursor: pointer;
  background-color: #fbc40e;
  border: 1px solid #c19400;
  color: white;
  font-weight: bold;
}
</style>