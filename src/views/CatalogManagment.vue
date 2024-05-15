<template>
    <div class="container">
        
        <div class="searchBar">
            <input
          class="search-input"
          type="text"
          v-model="postId"
          placeholder="Buscar por Id"
        />
        <input
          class="search-input"
          type="text"
          v-model="postBrand"
          placeholder="Buscar por Marca"
        />
        <input
          class="search-input"
          type="text"
          v-model="postModel"
          placeholder="Buscar por modelo"
        />
        <input 
            class="search-input" 
            type="text" 
            v-model="userRut" 
            placeholder="Buscar por RUT" />
        <input 
            type="text" 
            placeholder="Buscar por Nombre"
            v-model="userName">
        </div>
        
        <table class="aligned-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Nombre</th>
                    <th>Rut</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in filteredProducts" :key="product.id">
                    <td>{{ product._id }}</td>
                    <td>{{ product.brand }}</td>
                    <td>{{ product.model }}</td>
                    <td>{{ product.user.name }}</td>
                    <td>{{ product.user.rut }}</td>
                    <td>
                        <!--<router-link :to="{ name: 'EditProduct', params: { id: product._id } }">Editar</router-link>-->
                        <button @click="viewMore(product._id)" class="verMas"><span>Ver más</span></button>
                        <button @click="deleteProduct(product._id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        

    </div>

  
</template>
  

<script>
import axios from 'axios'

export default{
    data(){
        return{
            products: [],
            postId: '',
            postBrand: '',
            postModel: '',
            userRut: '',
            userName: ''

        }
    },
    async created(){
        const response = await axios.get('http://localhost:8080/posts')
        console.log(response.data)
        this.products = response.data
    },
    methods: {
        async fetchProductDetails(id) {
            if (id) {
                const response = await axios.get(`http://localhost:8080/catalog/${id}`)
                const post = response.data
                this.post = post
            }else {
                console.error('Product id is not defined')
            }
        },
        async deleteProduct(id){
            //eliminar producto
            console.log("se elimina la publicación : "+id)
        },
        viewMore(id) {
            this.fetchProductDetails(id)
            window.open(`/catalog/${id}`, '_blank')
        }
    },
    computed :{
        filteredProducts(){
           return this.products.filter(
                (product) =>
                product._id.toLowerCase().includes(this.postId.toLowerCase()) &&
                product.brand.toLowerCase().includes(this.postBrand.toLowerCase()) &&
                product.model.toLowerCase().includes(this.postModel.toLowerCase()) &&
                product.user.rut.toLowerCase().includes(this.userRut.toLowerCase()) &&
                product.user.name.toLowerCase().includes(this.userName.toLowerCase())
            )
        }
    
    }
}


</script>

<style scoped>
.aligned-table {
    width: 98%;
    text-align: left;
    border-collapse: collapse;
    text-align: center;
    border-bottom: 3px solid #1f1f1a;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  tr:nth-child(even) {
    background-color: #ebebeb;
  }
  .aligned-table th,
.aligned-table td {
  padding: 10px;
  border: 1px solid #ddd;
  margin: 0;
}
.aligned-table td,
.aligned-table th {
  border-radius: 5px;
}
.container {
    overflow-x: auto;
    height: 90vh;
    margin-bottom: 1rem;
  }
.searchBar {
    display: flex;
    justify-content: start;
    padding: 10px 10px 10px 10px;
    margin-bottom: 1rem;
    background-color: #1a1a1a;
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
  }
  input {
    margin: 10px;
    padding: 10px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 5px;
    width: 200px;
  }
</style>
  