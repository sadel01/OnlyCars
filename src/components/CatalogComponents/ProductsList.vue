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
                  <p class="productText productTitle">{{ product.name }}</p>
                </div>

                <div class="description">
                  <p class="productText productDescription">{{ product.km }} KM</p>
                  <p class="productText productDescription data">
                    {{ product.transmision }}
                  </p>
                  <p class="productText productDescription data">
                    {{ product.combustible }}
                  </p>
                </div>

                <div class="productPrice">
                  <p class="productText productPriceText"></p>
                  <p class="productText productPriceNumber">${{ product.price }} CLP</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="product-detail" v-if="selectedProduct">
        <img :src="selectedProduct.image" alt="Product image" class="content-image">
        <p class="productText productTitle">{{ selectedProduct.name }}</p>
        <p class="productText productDescription">{{ selectedProduct.km }} KM</p>
        <p class="productText productDescription data">{{ selectedProduct.transmision }}</p>
        <p class="productText productDescription data">{{ selectedProduct.combustible }}</p>
        <p class="productText productPriceNumber">${{ selectedProduct.price }} CLP</p>
        <button type="submit"><span>Ver más</span></button>
      </div>
    </div>
  </main>
</template>

<script>
import SearchItems from './SearchItems.vue'
import ProductDetail from './ProductDetail.vue'

export default {
  props: ['products'],
  data() {
    return {
      productsFiltered: [],
      productClicked: false,
      selectedProduct: null
    }
  },
  methods: {
    showProductDetail(product) {
      if (this.selectedProduct === product) {
        this.selectedProduct = null
      } else {
        this.selectedProduct = product
      }
    }
  },
  components: {
    SearchItems,
    ProductDetail
  }
}
</script>

<style scoped>

button[type="submit"]{
    margin-top:15%;
    margin-bottom:5%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #FBC40E;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    border: none;
    padding: 5% 40%;
  }
  button[type="submit"]:after {
    content: " ";
    width: 0%;
    height: 100%;
    background: #C19400;
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
  }
  
  button[type="submit"]:hover::after {
    right: auto;
    left: 0;
    width: 100%;
  }
  
  button[type="submit"] span {
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
  
  button[type="submit"]:hover span {
    color: white;
    animation: scaleUp 0.3s ease-in-out;
  }

.content-image {
  max-width: 100%;
  border-radius: 0%;
}

.productCard .imagenes {
  width: 30%;
  height: auto; 
  object-fit: cover; 
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

.product-detail {
  position: relative;
  top: 0;
  right: 0;
  width: 40%;
  height: 80vh;
  background-color: #efefef5f;
  padding: 20px;
  box-shadow: 3px 4px 5px rgb(185, 185, 185);
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 16px;
  border: 2px solid #1717172c;
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
  font-size: 38px;
  font-weight: bold;
  margin: 20px 0;
}

.vehicleDescription {
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
  height: auto;
  border: 2px solid #1717172c;
}

.productPrice {
  font-size: 32px;
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
  font-size: 22px;
}
</style>
