<template>
  <main class="catalog-section">
    <div class="searchBar">
      <SearchItems
        @inputItems="updateSearchTerm"
        @inputBrand="updateSelectedBrand"
        @inputTransmission="updateSelectedTransmission"
        @inputYear="updateSelectedYear"
        @inputFuel="updateSelectedFuel"
      />
    </div>
    <div class="productsList">
      <ProductsList :products="filteredProducts" />
    </div>
  </main>
</template>

<script>
import ProductsList from '../components/CatalogComponents/ProductsList.vue'
import SearchItems from '../components/CatalogComponents/SearchItems.vue'
import axios from 'axios'

export default {
  components: {
    SearchItems,
    ProductsList
  },
  data() {
    return {
      searchTerm: '',
      selectedBrand: '',
      selectedTransmission: '',
      selectedYear: '',
      selectedFuel: '',
      products: []
    }
  },
  computed: {
    filteredProducts() {
      try {
        return this.products.filter(
          (product) =>
            product.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
            (!this.selectedBrand || product.brand === this.selectedBrand) &&
            (!this.selectedTransmission || product.transmission === this.selectedTransmission) &&
            (!this.selectedYear || product.year === this.selectedYear) &&
            (!this.selectedFuel || product.fuel === this.selectedFuel)
        )
      } catch (error) {
        console.error(error)
      }
    }
  },
  methods: {
    updateSearchTerm(searchTerm) {
      this.searchTerm = searchTerm
    },
    updateSelectedBrand(brand) {
      this.selectedBrand = brand
    },

    updateSelectedTransmission(transmission) {
      this.selectedTransmission = transmission
    },
    updateSelectedYear(year) {
      this.selectedYear = year
    },
    updateSelectedFuel(fuel) {
      this.selectedFuel = fuel
    },

    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8080/posts')
        this.products = response.data
        console.log(this.products)
      } catch (error) {
        console.error(error)
      }
    }
  },
  created() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.catalog-section {
  display: flex;
  background-color: aliceblue;
}

.searchBar {
  flex: 0 0 15%;
  background-color: #fbc40e;
  display: flex;
  justify-content: center;
  border-top-right-radius: 16px;
}

.productsList {
  flex: 1;
  height: auto;
  margin-left: 20px;
}
</style>
