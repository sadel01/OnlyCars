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

      <div class="product-detail" v-if="selectedProduct"></div>
    </div>
  </main>
</template>

// Componente para mostrar la lista de productos y el detalle de un producto seleccionado.

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
.listContainer {
  border-top-left-radius: 16px;
}

.principalContainer {
  display: flex;
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
