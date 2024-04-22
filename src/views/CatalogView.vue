<template>
  <main class="catalog-section">
    <div class="searchBar">
      <SearchItems
        @inputItems="updateSearchTerm"
        @inputBrand="updateSelectedBrand"
        @inputModel="updateSelectedModel"
        @inputTransmission="updateSelectedTransmission"
        @inputYear="updateSelectedYear"
        @inputFuel="updateSelectedFuel"
        @inputKM="updateSelectedMileage"
        @inputMinPrice="updateSelectedMinPrice"
        @inputMaxPrice="updateSelectedMaxPrice"
        @inputAirbag="updateSelectedAirbag"
      />
    </div>
    <div class="productsList">
      <ProductsList :products="filteredProducts" />
      <div class="loading-container" v-if="isLoading">
        <p id="loading-text">Conectando...</p>
        <div id="loading-spinner"></div>
      </div>
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
      selectedModel: '',
      selectedMileage: '',
      selectedMaxPrice: '',
      selectedMinPrice: '',
      selectedAirbag: '',
      products: [],
      isLoading: false
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
            (!this.selectedFuel || product.fuel === this.selectedFuel) &&
            (!this.selectedModel || product.model === this.selectedModel) &&
            (!this.selectedMileage ||
              parseInt(product.mileage.replace('.', '')) <= parseInt(this.selectedMileage)) &&
            (!this.selectedMinPrice ||
              !this.selectedMaxPrice || // Modificación aquí
              (parseInt(product.price.replace(/\D/g, '')) >=
                parseInt(this.selectedMinPrice.replace(/\D/g, '')) &&
                parseInt(product.price.replace(/\D/g, '')) <=
                  parseInt(this.selectedMaxPrice.replace(/\D/g, '')))) &&
            (!this.selectedAirbag || product.airbag === this.selectedAirbag)
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
    updateSelectedModel(model) {
      this.selectedModel = model
    },
    updateSelectedMileage(mileage) {
      this.selectedMileage = mileage
    },
    updateSelectedMinPrice(minPrice) {
      if (minPrice.trim() === 'Min.' || minPrice.trim() === '$') {
        this.selectedMinPrice = ''
      } else {
        this.selectedMinPrice = minPrice
      }
    },

    updateSelectedMaxPrice(maxPrice) {
      if (maxPrice.trim() === 'Max.' || maxPrice.trim() === '$') {
        this.selectedMaxPrice = ''
      } else {
        this.selectedMaxPrice = maxPrice
      }
    },

    updateSelectedAirbag(airbag) {
      this.selectedAirbag = airbag
    },

    async fetchProducts() {
      this.isLoading = true
      try {
        const response = await axios.get('http://localhost:8080/posts')
        this.products = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
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
  min-height: 100vh;
}

.searchBar {
  flex: 0 0 15%;
  background-color: #fbc40e;
  display: flex;
  justify-content: center;
  height: auto;
  border-top-right-radius: 16px;
}

.productsList {
  flex: 1;
  height: auto;
  margin-left: 20px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Opcional: fondo semitransparente */
}

#loading-text {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

#loading-spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #fbc40e;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
