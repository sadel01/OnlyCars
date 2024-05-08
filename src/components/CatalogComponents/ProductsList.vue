<template>
  <main>
    <div v-if="comparisonList.length" class="comparisonBar">
      <div class="comparisonItemsContainer">
        <div v-for="item in comparisonList" :key="item.id" class="comparisonItem">
          <img :src="item.image" alt="Product image" class="smallImage" />
          {{ item.brand }} {{ item.model }}
          <button @click="toggleComparison(item)" class="removeButton">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
      <button class="compareButton" v-on:click="goToComparisonView">Comparar</button>
    </div>
    <div class="principalContainer">
      <div class="container listContainer">
        <ul class="list">
          <li
            v-for="product in productsWithComparisonState"
            :key="product.id"
            @click="showProductDetail(product)"
          >
            <div class="productCard">
              <div class="imageContainer">
                <img :src="product.image[0]" alt="product image" class="imagenes" />
              </div>
              <div class="vehicleDescription">
                <div class="productTitleWithCheckmark">
                  <p class="productText productTitle">{{ product.brand }} {{ product.model }}</p>

                  <label class="containerFav" @click.stop="addToFavorites(product)">
                    <input type="checkbox" :checked="isFavorite(product)" />
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
                <div class="description">
                  <div class="detail">
                    <img src="@/assets/icons/mileage.svg" alt="KM Icon" class="icon-svg" />
                    <p class="productText productDescription">{{ product.mileage }} KM</p>
                  </div>
                  <div class="detail">
                    <img
                      src="@/assets/icons/gearbox.svg"
                      alt="Transmission Icon"
                      class="icon-svg"
                    />
                    <p class="productText productDescription data">
                      {{ product.transmission }}
                    </p>
                  </div>
                  <div class="detailButtons">
                    <div class="detail">
                      <button
                        @click.stop="toggleComparison(product)"
                        :class="{ plus: !product.isCompared, minus: product.isCompared }"
                      >
                        <font-awesome-icon
                          :icon="product.isCompared ? 'circle-minus' : 'circle-plus'"
                        />
                        {{ product.isCompared ? ' Comparar' : ' Comparar' }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="productPrice">
                  <p class="productText productPriceNumber">${{ product.price }} CLP</p>
                  <button @click="viewMore(product._id)" class="verMas2">
                    <span>Ver más</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="!paginatedProducts.length && isLoading" class="noProducts">
          No hay productos disponibles.
        </div>
        <div class="pageButton">
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
      <ProductDetail
        class="product-detail"
        v-if="selectedProduct && isLargeScreen"
        :product="selectedProduct"
        :open="selectedProduct != null"
        @close="closeProductDetail"
        :class="{ productDetailOpen: selectedProduct, productDetailClose: !selectedProduct }"
      />
    </div>
  </main>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import mileageIcon from '@/assets/icons/mileage.svg'
import gearboxIcon from '@/assets/icons/gearbox.svg'
import 'sweetalert2/dist/sweetalert2.min.css'
import SearchItems from './SearchItems.vue'
import ProductDetail from './ProductDetail.vue'
import axios from 'axios'

export default {
  props: ['products'],
  data() {
    return {
      comparisonList: [],
      productsFiltered: [],
      productClicked: false,
      selectedProduct: null,
      page: 1,
      perPage: 6,
      cars: [],
      isLargeScreen: window.innerWidth > 1280 || window.innerHeight > 1024
    }
  },
  methods: {
    async addToFavorites(product) {
      try {
        this.isLoading = true
        const user = this.$store.state.user
        const vehicleData = {
          userId: user._id,
          postId: product._id
        }
        if (this.isFavorite(product)) {
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
    isFavorite(product) {
      return this.cars.some((car) => car._id === product._id)
    },
    isCompared(product) {
      const compared = this.comparisonList.some((p) => p._id === product._id)
      console.log(`Producto ${product._id} comparado:`, compared)
      return compared
    },

    toggleComparison(product) {
      const productIndex = this.comparisonList.findIndex((p) => p._id === product._id)
      if (productIndex !== -1) {
        this.comparisonList.splice(productIndex, 1)
      } else {
        if (this.comparisonList.length < 6) {
          this.comparisonList.push(product)
        } else {
          alert('No puedes comparar más de 6 productos') //TOTALMENTE SUJETO A CAMBIOS GRACIAS, NO ME GUSTA EL ALERT
        }
      }
    },

    nextPage() {
      this.page++
      window.scrollTo(0, 0)
    },
    previousPage() {
      this.page--
      window.scrollTo(0, 0)
    },
    showProductDetail(product) {
      if (this.selectedProduct === product) {
        this.selectedProduct = null
      } else {
        this.selectedProduct = product
      }
    },
    async fetchProductDetails(id) {
      if (id) {
        const response = await axios.get(`http://localhost:8080/catalog/${id}`)
        const post = response.data
        post.isCompared = false
        this.post = post
      } else {
        console.error('Product id is not defined')
      }
    },
    closeProductDetail() {
      this.selectedProduct = null
    },
    goToPage(n) {
      this.page = n
      window.scrollTo({
        top: 0
      })
    },
    viewMore(id) {
      this.fetchProductDetails(id)
      window.open(`/catalog/${id}`, '_blank')
    },
    handleResize() {
      this.isLargeScreen = window.innerWidth > 1280 || window.innerHeight > 1024
      if (!this.isLargeScreen && this.selectedProduct) {
        this.selectedProduct = null
      }
    }
  },
  created() {
    this.fetchFavorites()
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', () => {
      this.handleResize()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.handleResize()
    })
  },
  components: {
    SearchItems,
    ProductDetail
  },
  computed: {
    productsWithComparisonState() {
      return this.products.map((product) => ({
        ...product,
        isCompared: this.comparisonList.some((compProduct) => compProduct._id === product._id)
      }))
    },
    maxPage() {
      return Math.ceil(this.products.length / this.perPage)
    },
    paginatedProducts() {
      const start = (this.page - 1) * this.perPage
      const end = start + this.perPage
      return this.products.slice(start, end).map((product) => {
        return {
          ...product,
          isCompared: this.comparisonList.some((compProduct) => compProduct.id === product.id)
        }
      })
    }
  }
}
</script>

<style scoped>
.containerFav input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.containerFav {
  display: block;
  position: relative;
  right: 2%;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  transition: 100ms;
}

.checkmark {
  top: 0;
  left: 0;
  height: 1.5em;
  width: 1.5em;
  transition: 100ms;
  animation: dislike_effect 400ms ease;
}

.containerFav input:checked ~ .checkmark path {
  fill: #fbc40e;
  stroke-width: 0;
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

.detail button {
  border: none;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 20px;
  transition:
    background-color 0.3s,
    transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.detail button:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.detail button:focus {
  outline: none;
}

.detail button.plus {
  background-color: #fbc40e;
  color: black;
}

.detail button.minus {
  background-color: #1a1a1a;
}

.detailButtons {
  display: flex;
  margin-top: 10px;
}


.font-awesome-icon {
  margin-right: 5px;
}

.comparisonBar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: start;
  padding: 10px;
  background-color: #f0f8ff;
  position: relative;
  color: #f0f8ff;
}

.comparisonItemsContainer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-right: 30px;
  min-height: 50px;
  flex-grow: 1;
}

.compareButton {
  appearance: none;
  background-color: #fbc40e;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 5px 15px;
  position: absolute;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  margin-left: auto;
  height: 50px;
  right: 10px;
  margin-top: 10px;
  top: center;
  user-select: none;
}

.compareButton:hover {
  background-color: #fad55c;
  text-decoration: none;
  transition-duration: 0.1s;
}

.compareButton:disabled {
  background-color: #fbc40e;
  border-color: rgba(27, 31, 35, 0.15);
  color: #e0af0e;
  cursor: default;
}

.compareButton:active {
  background-color: #f8e39d;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.compareButton:focus {
  outline: 1px transparent;
}

.compareButton:before {
  display: none;
}

.compareButton:-webkit-details-marker {
  display: none;
}

.comparisonItem {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin-right: 10px;
  background-color: #cccccc5f;
  border: 2px solid #0707072c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  position: relative;
  color: #000;
  margin-top: 10px;
  width: 210px;
  height: 50px;
  user-select: none;
}
.smallImage {
  max-width: 50px;
  max-height: 50px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
  user-select: none;
}

.removeButton {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  margin-left: auto;
  font-size: 20px;
}

.fas.fa-trash {
  font-size: 18px;
}

.removeButton:hover {
  color: #a3202a;
}

.productDetailOpen {
  animation: 1s cubic-bezier(0.25, 1, 0.3, 1) wipe-in-left both;
}

@keyframes wipe-in-left {
  from {
    clip-path: inset(0 0 0 100%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.icon-svg {
  height: 1.4em;
  width: auto;
  vertical-align: middle;
  margin-right: 8px;
}

.detail {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}


.detailFav {
  display: none;
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

.verMas2 {
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #fbc40e;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  margin-left: 75%;
  height: 3rem;
  width: 20%;
  margin-bottom: 30%;
}
.verMas2:after {
  content: ' ';
  width: 0%;
  height: 100%;
  background: #c19400;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
  top: 0.5%;
}
.verMas2:hover::after {
  right: auto;
  left: 0;
  width: 100%;
  top: 0.5%;
}

.verMas2 span {
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

.verMas2:hover span {
  color: white;
  animation: scaleUp 0.3s ease-in-out;
  position: relative;
}

.imageContainer {
  flex: 0 0 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  object-fit: cover;
  margin: 20px;
}

.productCard .imagenes {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.principalContainer {
  display: flex;
  max-width: 100%;
}

.product-detail {
  flex: 1;
}

.listContainer {
  border-top-left-radius: 16px;
}

.principalContainer {
  display: flex;
}

.container {
  flex: 1;
}

.imagenes {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.productText {
  color: black;
}

.productTitle {
  font-size: 35px;
  font-weight: bold;
  margin: 20px 0;
}

.vehicleDescription {
  line-height: 0.85;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;
  overflow-wrap: break-word;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  height: auto;
}

.productCard {
  border: 2px solid transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  margin: 20px 10px 0px 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.productCard:hover {
  border: 2px solid #0707072c;
  box-shadow: 3px 4px 5px rgb(218, 218, 218);
  background-color: #cccccc5f;
  cursor: pointer;
}

.productPrice {
  font-size: 30px;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

.productPriceNumber {
  margin: 0;
  margin-top: 20px;
}

.description {
  font-size: 20px;
}

.productTitleWithCheckmark {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 1600px){
  .product-detail {
    display: none;
  }

  .productPrice {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .checkmark {
    height: 1.5em;
    width: 1.5em;
    transition: 100ms;
    animation: dislike_effect 400ms ease;
  }

  .verMas2 {
    display: flex;
    border-radius: 5px;
    background: #fbc40e;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    border: none;
    height: 2.5rem;
    width: 20%;
    margin: 0;
    margin-right: 10px;
  }

  .productPriceNumber {
    margin: 0;
  }

  .productTitleWithCheckmark {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}


</style>
