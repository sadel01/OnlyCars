<template>
  <div class="container">
    <div class="search-bar">
      <input class="search-input" type="text" v-model="postId" placeholder="Buscar por Id" />
      <input class="search-input" type="text" v-model="postBrand" placeholder="Buscar por Marca" />
      <input class="search-input" type="text" v-model="postModel" placeholder="Buscar por modelo" />
      <input class="search-input" type="text" v-model="userRut" placeholder="Buscar por RUT" />
      <input class="search-input" type="text" v-model="userName" placeholder="Buscar por Nombre" />
    </div>

    <div class="table-container">
      <table class="styled-table">
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
          <template v-for="(product, index) in filteredProducts" :key="product._id">
            <tr
              :class="{ 'selected-row': showDetail && selectedProductId === product._id }"
              @click="viewMore(product._id)"
            >
              <td>{{ product._id }}</td>
              <td>{{ product.brand }}</td>
              <td>{{ product.model }}</td>
              <td>{{ product.user.name }}</td>
              <td>{{ product.user.rut }}</td>
              <td class="actions">
                <button @click.stop="deleteProduct(product._id)" class="delete-button">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
            <transition name="expand">
              <tr
                v-if="showDetail && selectedProductId === product._id"
                class="product-details-row"
              >
                <td colspan="6">
                  <div class="product-details">
                    <div class="product-details-grid">
                      <div><strong>ID:</strong> {{ product._id }}</div>
                      <div><strong>Marca:</strong> {{ product.brand }}</div>
                      <div><strong>Modelo:</strong> {{ product.model }}</div>
                      <div><strong>Nombre:</strong> {{ product.user.name }}</div>
                      <div><strong>Rut:</strong> {{ product.user.rut }}</div>
                      <div><strong>Año:</strong> {{ product.year }}</div>
                      <div><strong>Condición:</strong> {{ product.condition }}</div>
                      <div><strong>Kilometraje:</strong> {{ product.mileage }}</div>
                      <div><strong>Combustible:</strong> {{ product.fuel }}</div>
                      <div><strong>Transmisión:</strong> {{ product.transmission }}</div>
                      <div><strong>Tracción:</strong> {{ product.driveTrain }}</div>
                      <div>
                        <strong>Capacidad del Cilindro:</strong> {{ product.cylinderCapacity }}
                      </div>
                      <div><strong>Airbag:</strong> {{ product.airbag }}</div>
                      <div><strong>Precio:</strong> {{ product.price }}</div>
                      <div><strong>Propietarios:</strong> {{ product.owners }}</div>
                      <div><strong>Puertas:</strong> {{ product.doors }}</div>
                      <div><strong>Color Interior:</strong> {{ product.interiorColor }}</div>
                      <div><strong>Color Exterior:</strong> {{ product.exteriorColor }}</div>
                      <div><strong>Descripción:</strong> {{ product.description }}</div>
                      <div><strong>Región:</strong> {{ product.region }}</div>
                      <div><strong>Provincia:</strong> {{ product.province }}</div>
                      <div><strong>Comuna:</strong> {{ product.comuna }}</div>
                      <div>
                        <strong>Características de Confort:</strong>
                        {{ product.comfortFeatures.join(', ') }}
                      </div>
                      <div><strong>Tipo de Suspensión:</strong> {{ product.suspensionType }}</div>
                      <div><strong>Tipo de Neumático:</strong> {{ product.tireType }}</div>
                      <div><strong>Altura del Suelo:</strong> {{ product.groundClearance }}</div>
                      <div>
                        <strong>Opciones de Seguro:</strong>
                        {{ product.insuranceOptions.join(', ') }}
                      </div>
                      <div><strong>Visitas:</strong> {{ product.visits }}</div>
                      <div>
                        <strong>Fecha de Publicación:</strong>
                        {{ new Date(product.fechaPublicacion).toLocaleDateString() }}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </transition>
          </template>
        </tbody>
      </table>
    </div>

    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <button class="apply-button close-button" @click="cancelModal()">x</button>
        <p class="pop-up-text">
          ¿Estas seguro que deseas eliminar la publicación? <br /><br />Este cambio es irreversible.
        </p>
        <div class="modal-content-buttons">
          <button class="apply-button cancel-button" @click="cancelModal()">Cancelar</button>
          <button class="apply-button accept-button" @click="acceptModal()">Aceptar</button>
        </div>
      </div>
    </div>
    <div class="modal-overlay" v-if="showModal"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      products: [],
      postId: '',
      postBrand: '',
      postModel: '',
      userRut: '',
      userName: '',
      post: {},
      showDetail: false,
      showModal: false,
      deleteProductId: '',
      selectedProductId: null,
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  async created() {
    const response = await axios.get('http://localhost:8080/posts')
    this.products = response.data
  },
  methods: {
    async fetchProductDetails(id) {
      if (id) {
        const response = await axios.get(`http://localhost:8080/catalog/${id}`)
        const post = response.data
        this.post = post
      } else {
        console.error('Product id is not defined')
      }
    },
    async deleteProduct(id) {
      this.showModal = true
      this.deleteProductId = id
    },
    viewMore(id) {
      this.selectedProductId = this.selectedProductId === id ? null : id
      this.showDetail = this.selectedProductId !== null
    },
    cancelModal() {
      this.showModal = false
    },
    async acceptModal() {
      this.showModal = false
      await axios.delete(`http://localhost:8080/admin/delete/${this.deleteProductId}`)
      console.log('se elimina la publicación : ' + this.deleteProductId)
      const response2 = await axios.get('http://localhost:8080/posts')
      this.products = response2.data
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(
        (product) =>
          product._id.toLowerCase().includes(this.postId.toLowerCase()) &&
          product.brand.toLowerCase().includes(this.postBrand.toLowerCase()) &&
          product.model.toLowerCase().includes(this.postModel.toLowerCase()) &&
          product.user.rut.toLowerCase().includes(this.userRut.toLowerCase()) &&
          product.user.name.toLowerCase().includes(this.userName.toLowerCase())
      )
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredProducts.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
  position: relative;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  padding: 20px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  margin: 0 10px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.table-container {
  overflow-x: auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.styled-table thead tr {
  background-color: #fbc40e;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f9f9f9;
}

.styled-table tbody tr.selected-row {
  background-color: #f8f4e7;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.product-details-row {
  background-color: #f8f9fa;
}

.product-details {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}

.user-name {
  vertical-align: middle;
}

.actions {
  display: flex;
  justify-content: space-around;
}

.edit-button,
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
}

.edit-button i,
.delete-button i {
  color: #6c757d;
}

.edit-button,
.delete-button {
  background-color: #e0e0e0;
}

.edit-button:hover {
  background-color: #f5cd49;
}

.edit-button:hover i {
  color: black;
}

.delete-button:hover {
  background-color: rgba(220, 53, 69, 0.2);
}

.delete-button:hover i {
  color: #dc3545;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.buttons-container.hidden {
  display: none;
}

.apply-button {
  padding: 10px 20px;
  border: none;
  background-color: #fbc40e;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.apply-button:hover {
  background-color: #fbc40e;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  background-color: #fbc40e;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
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
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: modalAppear 0.5s ease-out;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.apply-button.close-button {
  width: 35px;
  height: 35px;
  border: none;
  margin-bottom: 15px;
  background-color: transparent;
  color: #ff0000;
}

.apply-button.accept-button {
  border: none;
}

.pop-up-text {
  margin-bottom: 15px;
  color: #1a1a1a;
}

@keyframes modalAppear {
  0% {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
}
.expand-enter, .expand-leave-to /* .expand-leave-active in <2.1.8 */ {
  max-height: 0;
  opacity: 0;
}
</style>
