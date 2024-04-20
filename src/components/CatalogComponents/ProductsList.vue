<template>
  <main>
    <div class="principalContainer">
      <div class="container listContainer">
        <ul class="list">
          <li
            v-for="product in paginatedProducts"
            :key="product.id"
            @click="showProductDetail(product)"
          >
            <div class="productCard">
              <img :src="product.image[0]" alt="product image" class="imagenes" />
              <div class="vehicleDescription">
                <div>
                  <p class="productText productTitle">{{ product.brand }}</p>
                </div>

                <div class="description">
                  <p class="productText productDescription">{{ product.mileage }} KM</p>
                  <p class="productText productDescription data">
                    {{ product.transmission }}
                  </p>
                </div>

                <div class="productPrice">
                  <p class="productText productPriceText"></p>
                  <p class="productText productPriceNumber">${{ product.price }} CLP</p>
                </div>
                <button @click="viewMore(product._id)" class="verMas2"><span>Ver más</span></button>
              </div>
            </div>
          </li>
        </ul>

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
import SearchItems from './SearchItems.vue'
import ProductDetail from './ProductDetail.vue'
import axios from 'axios'

export default {
  props: ['products'],
  data() {
    return {
      productsFiltered: [],
      productClicked: false,
      selectedProduct: null,
      page: 1,
      perPage: 6,
      isLargeScreen: window.innerWidth > 1024 && window.innerHeight > 768
    }
  },
  methods: {
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
    viewMore(id){
      const userId = this.$store.state.user._id;
      window.open(`/catalog/${id}?userId=${userId}`, '_blank');
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  components: {
    SearchItems,
    ProductDetail
  },
  computed: {
    maxPage() {
      return Math.ceil(this.products.length / this.perPage)
    },
    paginatedProducts() {
      const start = (this.page - 1) * this.perPage
      const end = start + this.perPage
      return this.products.slice(start, end)
    },
    handleResize() {
      this.isLargeScreen = window.innerWidth > 1024 && window.innerHeight > 768
    }
  }
}
</script>

<style scoped>
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
  height: 15%;
  width: 20%;
  margin-bottom: 30%;
  top: -25%;
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

.productCard .imagenes {
  width: 30%;
  object-fit: cover;
}

.principalContainer {
  display: flex;
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
  width: 300px;
  height: auto;
  border-radius: 10px;
  margin: 20px;
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
  border-radius: 10px;
  display: flex;
  margin: 20px;
  background-color: #c2c2c27e;
  margin-right: 30px;
  height: 270px;
  border: 2px solid #1717172c;
  min-width: 350px;
}
.productCard:hover {
  transform: scale(1.02);
  border-width: 1px;
  background-color: white;
  box-shadow: 0 0 20px #a8a8a8;
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

@media screen and (max-width: 1280px) and (max-height: 1024px) {
  .product-detail {
    display: none;
  }
  .verMas2 {
    display: block;
  }
}
</style>
