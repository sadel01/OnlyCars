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
        <div class="postList">
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
                    <tr v-for="product in filteredProducts" :key="product._id">
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

            <div v-if="showDetail">
                <div class="detail">
                    <h2>Detalles del producto</h2>
                    <p>Id: </p>
                    <p>Marca: </p>
                    <p>Modelo: </p>
                    <p>Nombre: </p>
                    <p>Rut: </p>
                </div>
            </div>

        </div>
        

        

    </div>
    <div class="modal" v-if="showModal">
        <div class="modal-content">
            <button class="aplicate-button close-button " @click="cancelModal()">x</button>
             <p class="pop-up-text">¿Estas seguro que deseas eliminar la publicación? <br><br>Este cambio es irreversible.</p>
             <div class="modal-content-buttons">
                <button class="aplicate-button cancel-button" @click="cancelModal()">Cancelar</button>
                <button class="aplicate-button accept-button" @click="acceptModal()">Aceptar</button>
             </div>
        </div>
    </div>
  <div class="modal-overlay" v-if="showModal"></div>

  
</template>
  
<!--EDITAR LA SECCION VER MAS PARA QUE MUESTRE INFORMACIÓN DETALLADA DE LA PUBLICACIÓN-->
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
            userName: '',
            post: {},
            showDetail: false,
            showModal: false,
            deleteProductId: ''
        }
    },
    async created(){
        const response = await axios.get('http://localhost:8080/posts')
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
            this.showModal = true
            this.deleteProductId = id
            
        },
        viewMore(id) {
            //this.fetchProductDetails(id)
            console.log()
        },
        cancelModal(){
            this.showModal = false
        },
        async acceptModal(){
            this.showModal = false
            const response = await axios.delete(`http://localhost:8080/admin/delete/${this.deleteProductId}`)
            //eliminar producto
            console.log("se elimina la publicación : "+this.deleteProductId)

            const response2 = await axios.get('http://localhost:8080/posts')
            this.products = response2.data
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
.aplicate-button {
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    z-index: 1;
    cursor: pointer;
    font-size: 15px;
    border-radius: 0.3em;
    border: 2px solid #1a1a1a;
    background: #ffffff;
    color: #090909;
    width: 7rem;
    height: 2.5rem;
    font-weight: bold;
    right: 2rem;
}
.aplicate-button:active {
color: #666;
box-shadow:
    inset 4px 4px 12px #c5c5c5,
    inset -4px -4px 12px #ffffff;
}
.aplicate-button:before {
content: '';
position: absolute;
left: 50%;
transform: translateX(-50%) scaleY(1) scaleX(1.25);
top: 100%;
width: 140%;
height: 180%;
background-color: rgba(0, 0, 0, 0.05);
border-radius: 50%;
display: block;
transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
z-index: -1;
}
.aplicate-button:after {
content: '';
position: absolute;
left: 55%;
transform: translateX(-50%) scaleY(1) scaleX(1.45);
top: 180%;
width: 160%;
height: 190%;
background-color: #fbc40e;
border-radius: 50%;
display: block;
transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
z-index: -1;
}
.aplicate-button.close-button {
    width: 35px;
    height: 35px;
    border: none;
    left: 85%;
    margin-top: 5px;
}
.aplicate-button.accept-button {
    border: none;
    left: 65%;
}
.aplicate-button:hover {
    color: #ffffff;
    border-color: #fbc40e;
    transform: scale(1.05);
}

.aplicate-button:hover:before {
top: -35%;
background-color: #fbc40e;
transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.aplicate-button:hover:after {
top: -45%;
background-color: #fbc40e;
transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}
.pop-up-text {
    margin-left: 10px;
    color: #1a1a1a;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
}
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    height: 200px;
    width: 400px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    animation: modalAppear 0.5s ease-out;
}
.cancel-button{
    background-color: #fbc40e;
    color: #1a1a1a;
    border: none;
    left: 20px;

}
.modal-content {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    height: 100%;
}
.modal-content-buttons{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}
.detail {
    color: red;
    background-color: #c2c2c2;
    padding: 10px 0px 0px 0px;
    width: 10%;
    height: 90%;
    
    /* Resto de los estilos... */
}

.postList{
    display: flex;
    flex-direction: row;
    justify-content:start;
    margin-top: 1rem;
    height: 100%;
}

.aligned-table {
    width: 98%;
    text-align: left;
    border-collapse: collapse;
    text-align: center;
    border-bottom: 3px solid #1f1f1a;
    margin-top: 0px;
    margin-bottom: 0px;
    overflow-x: auto;
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
    display: flex;
    flex-direction: column;
    height: 90vh;
    margin-bottom: 1rem;
  }
.searchBar {
    display: flex;
    justify-content: start;
    padding: 10px 0px 10px 0px;
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
  