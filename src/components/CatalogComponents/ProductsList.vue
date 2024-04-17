<template>
  <main>
    <div class="principalContainer">
      <div class="container listContainer">
        <ul class="list">
          <li v-for="product in products" :key="product.id" @click="showProductDetail(product)">
            <div class="productCard">
              <img :src="product.image" alt="product image" class="imagenes" />
              <div class="vehicleDescription">
                <div>
                  <p class="productText productTitle">{{ product.brand }}</p>
                </div>

                <div class="description">
                  <p class="productText productDescription">{{ product.mileage }} KM</p>
                  <p class="productText productDescription data">
                    {{ product.transmission }}
                  </p>
                  <p class="productText productDescription data">
                    {{ product.fuel }}
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
      </div>
      <ProductDetail class="product-detail" v-if="selectedProduct && isLargeScreen" :product="selectedProduct" :open="selectedProduct != null" @close="closeProductDetail" />
    </div>
  </main>
</template>

<script>
import SearchItems from './SearchItems.vue'
import ProductDetail from './ProductDetail.vue'
import axios from 'axios';
export default {
  props: ['products'],
  data() {
    return {
      productsFiltered: [],
      productClicked: false,
      selectedProduct: null,
      isLargeScreen: window.innerWidth > 1024 && window.innerHeight > 768
    }
  },
  methods: {
    showProductDetail(product) {
      if (this.selectedProduct === product ) {
        this.selectedProduct = null
      } else {
        this.selectedProduct = product
      }
    },
    closeProductDetail() {
      this.selectedProduct = null;
    },
    viewMore(id){
      this.$router.push(`/catalog/${id}`);
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    handleResize() {
      this.isLargeScreen = window.innerWidth > 1024 && window.innerHeight > 768
    }
  },
  components: {
    SearchItems,
    ProductDetail
  },
  async created(){
    const response = await axios.get(`http://localhost:8080/catalog/${product.id}`);
    const post = response.data;
    this.post = post;
  }
}
</script>

<style scoped>
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
  height: 100vh
}

.container {
  flex: 1;
  overflow-y: auto;
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
  background-color: #efefef5f;
  margin-right: 30px;
  height: 270px;
  border: 2px solid #1717172c;
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
.viewMoreButt {
  display: flex;
  justify-content: flex-end; /* Centra el contenido del contenedor a la derecha */
  align-items: flex-end; /* Centra verticalmente el contenido en la parte inferior */
  padding-right: 3%;
}

.verMas2 {
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #FBC40E;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  margin-left: 75%;
  height: 15%;
  width: 20%;
  margin-bottom:30%;
  top: -25%; /* Ajusta la posición del botón un poco más arriba */
}

.verMas2:after {
  content: " ";
  width: 0%;
  height: 100%;
  background: #C19400;
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
@media screen and (max-width: 1280px) and (max-height: 1024px) {
  .product-detail {
    display: none; /* Ocultamos el detalle del producto */
  }
  .verMas2 {
  display: block;
  }
}
</style>