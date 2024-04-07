<template>
  <main>
    
    <div>
      <SearchItems @inputItems="findItems" />
    </div>
    

    <div class="container">
      <ul class="list">

        <li v-for="product in productsFiltered" :key="product.id">
          <div class="listElements">
            <img :src="product.image" alt="product image" />
            <div class="vehicleDescription">
              <div>
                <p class="productText productTitle">{{ product.name }}</p>          
              </div>
              
              <div class="description">
                <p class="productText productDescription">Kilometraje : {{product.km}}</p>
                <p class="productText productDescription data">Transmisión : {{product.transmision}}</p>
                <p class="productText productDescription data">Combustible : {{product.combustible }}</p>
              
              </div>
              
              <div class="productPrice">
                <p class="productText productPriceText">Price: </p>
                <p class="productText productPriceNumber">${{product.price}}</p>
              </div>

            </div>
            
          </div>
        </li>
      </ul>
    </div>
      
  </main>
</template>

<script>
import SearchItems from './SearchItems.vue';


export default {
  data() {
    return {
      products: [
        { id: 1, name: 'Product 1', combustible: 'gasolina',transmision:'manual',price: '100',km : '100', image: 'src/components/CatalogComponents/image/auto.jpg', description: 'This is a product description' },
        { id: 2, name: 'Product 2', combustible: 'gasolina',transmision:'manual',price: '100',km : '100', image: 'src/components/CatalogComponents/image/auto.jpg', description: 'This is a product description' },
        { id: 3, name: 'Product 3', combustible: 'gasolina',transmision:'manual',price: '100',km : '100', image: 'src/components/CatalogComponents/image/auto.jpg', description: 'This is a product description' },
        { id: 4, name: 'Product 4', combustible: 'gasolina',transmision:'manual',price: '100',km : '100', image: 'src/components/CatalogComponents/image/auto.jpg', description: 'This is a product description' },
    ],
      productsFiltered: [],
    };
  },
  created() {
    this.productsFiltered = this.products;
  },
  methods: {
    findItems(item) {
      this.productsFiltered = this.products.filter((product) => 
         product.name.toLowerCase().includes(item.toLowerCase()));
    },
  },
  components: {
    SearchItems
  },
};
</script>

<style scoped>

.listElements{
  display: flex;
  margin: 20px;
  justify-content: flex-start;
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 4px 5px 1px rgb(185, 185, 185);
}

.list {
  padding-bottom: .5%;
  padding-top: .5%;
  background-color: white;
  @media (max-width: 768px) {
    margin-left: 10%;
    margin-right: 10%;
  }
}

ul {
  list-style-type: none;
  background-color: white;
  margin: 0 auto;
}

img {
  max-width: 100%;
  height: auto;
  width: 400px;
  height: 400px;
  /*border-radius: 4%;*/
}

.description{
  display: flex;
  flex-wrap: wrap;
}
.productPrice{
  margin-top: 15%;
}
.productText {
  font-family: 'Roboto', sans-serif;
  color: black;
  margin: 0 0 0 0;
}
.productText.productPriceNumber{
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  /*border: 1px solid black;*/
}
.productText.productPriceText{
  font-size: 1rem;
  opacity: 0.5;
  text-align: left;
  /*border: 1px solid black;*/
}
.productText.productDescription{
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 0.5;
  text-align: left;
  /*border: 1px solid black;*/
}
.productText.productDescription.data{
  margin-left: 5%;
}

.productText.productTitle{
  font-size: 3.5rem;
  font-weight: bold;
  text-align: left;
  /*border: 1px solid black;*/
}

.vehicleDescription{
  width: 100%;
  margin-bottom: 3%;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: column;
  
}
.container{
  margin-left: 20%;
  margin-right: 5%;
  padding: 1% 1% 1% 1%;
  border-radius: 10px;
  background-color: white;
  box-shadow: 3px 4px 5px 1px rgb(185, 185, 185);
}
</style>
