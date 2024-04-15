<template>
  <main>
    <div class="principalContainer">
      <div class="container listContainer">
        <ul class="list">
          <li v-for="product in products" :key="product.id" @click="showProductDetail(product)">
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
              </div>
            </div>
          </li>
        </ul>
      </div>
      <ProductDetail class="product-detail" v-if="selectedProduct" :product="selectedProduct" :open="selectedProduct != null" @close="closeProductDetail" />
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
    },
    closeProductDetail() {
      this.selectedProduct = null;
    }
  },
  components: {
    SearchItems,
    ProductDetail
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
</style>
