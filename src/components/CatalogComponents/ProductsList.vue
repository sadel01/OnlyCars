<template>
  <main>
    <h2>Products</h2>

    <div class="list">
      <ul>
        <li v-for="product in products" :key="product.id">
          <img :src="product.image" alt="product image" />
          {{ product.name }} 
        </li>
      </ul>
    </div>
    
    
  </main>


</template>
  
<script>
  export default {
    data() {
      return {
        products: [
          { id: 1, name: 'Product 1', image: 'src/components/CatalogComponents/image/auto.jpg' },
          { id: 2, name: 'Product 2', image: 'src/components/CatalogComponents/image/auto.jpg' },
          { id: 3, name: 'Product 3', image: 'src/components/CatalogComponents/image/auto.jpg' },
        ],
      };
    },
  };
</script>
<style scoped>

  .list{
    margin-left: 20%;
    margin-right: 5%;
    @media (max-width: 768px) {
      margin-left: 10%;
      margin-right: 10%;
    }
  }
 

  ul {
    list-style-type: none;
    background-color: gray;
    margin: 0 auto;
  }

  img{
    max-width: 100%;
    height: auto;
  }
  img{
    width: 400px;
    height: 400px;
  }
</style>
