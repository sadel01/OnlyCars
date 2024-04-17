<template>
  <main class="catalog-section">
    <div class="searchBar">
      <SearchItems
        @inputItems="updateSearchTerm"
        @inputBrand="updateSelectedBrand"
        @inputTransmision="updateSelectedTransmision"
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
      selectedTransmision: '',
      selectedYear: '',
      selectedFuel: '',
      products: [
        {
          id: 1,
          name: 'Product 1 Toyota',
          brand: 'TOYOTA',
          model: 'Corolla',
          year: '2020',
          combustible: 'Gasolina',
          transmision: 'Manual',
          price: '10.000.000',
          km: '100.000',
          image: 'src/assets/mustang-rally.jpg',
          description: 'This is a product description'
        },
        {
          id: 2,
          name: 'Product 2',
          combustible: 'Gasolina',
          transmision: 'Manual',
          price: '10.000.000',
          km: '100.000',
          image: 'src/assets/explorer.jpg',
          description: 'This is a product description'
        },
        {
          id: 3,
          name: 'Product 3',
          combustible: 'Gasolina',
          transmision: 'Manual',
          price: '10.000.000',
          km: '100.000',
          image: 'src/components/CatalogComponents/image/auto.jpg',
          description: 'This is a product description'
        },
        {
          id: 4,
          name: 'Product 4',
          combustible: 'Gasolina',
          transmision: 'Manual',
          price: '10.000.000',
          km: '100.000',
          image: 'src/components/CatalogComponents/image/auto.jpg',
          description: 'This is a product description'
        },
        {
          id: 5,
          name: 'Product 5',
          combustible: 'Gasolina',
          transmision: 'Manual',
          price: '10.000.000',
          km: '100.000',
          image: 'src/components/CatalogComponents/image/auto.jpg',
          description: 'This is a product description'
        },
        {
          id: 6,
          name: 'Product 6',
          combustible: 'Gasolina',
          transmision: 'Manual',
          price: '10.000.000',
          km: '100.000',
          image: 'src/components/CatalogComponents/image/auto.jpg',
          description: 'This is a product description'
        },
        {
          id: 7,
          name: 'Product 7',
          combustible: 'Gasolina',
          transmision: 'Manual',
          price: '10.000.000',
          km: '100.000',
          image: 'src/components/CatalogComponents/image/auto.jpg',
          description: 'This is a product description'
        },
        {
          id: 8,
          name: 'Product 8',
          combustible: 'Gasolina',
          transmision: 'Manual',
          price: '10.000.000',
          km: '100.000',
          image: 'src/components/CatalogComponents/image/auto.jpg',
          description: 'This is a product description'
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      try {
        return this.products.filter(
          (product) =>
            product.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
            (!this.selectedBrand || product.brand === this.selectedBrand) &&
            (!this.selectedTransmision || product.transmision === this.selectedTransmision) &&
            (!this.selectedYear || product.year === this.selectedYear) &&
            (!this.selectedFuel || product.combustible === this.selectedFuel)
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

    updateSelectedTransmision(transmision) {
      this.selectedTransmision = transmision
    },
    updateSelectedYear(year) {
      this.selectedYear = year
    },
    updateSelectedFuel(combustible) {
      this.selectedFuel = combustible
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
