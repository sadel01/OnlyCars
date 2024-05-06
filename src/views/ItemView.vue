<template>
  <div class="main-container">
    <div class="loading-container" v-if="isLoadingCar">
      <p id="loading-text">Conectando...</p>
      <div id="loading-spinner"></div>
    </div>
    <main class="vehicle-listing" v-if="!isLoadingCar">
      <div class="vehicle-header">
        <h1 class="vehicle-title">{{ product.year }} {{ product.brand }} {{ product.model }}</h1>
        <p class="vehicle-price">${{ product.price }} CLP</p>
      </div>

      <!-- Sección principal del vehículo -->
      <section class="vehicle-section">
        <!-- Carrusel de imágenes del vehículo -->
        <div class="vehicle-carousel-container">
          <carousel :items-to-show="1" v-if="product && product.image">
            <slide v-for="(image, index) in product.image" :key="index">
              <img :src="image" alt="Vehicle Image" class="vehicle-image" />
            </slide>
          </carousel>
          <div v-else class="no-images">Cargando imágenes o no hay imágenes disponibles.</div>
        </div>

        <!-- Detalles del vehículo con íconos -->
        <div class="vehicle-details-container">
          <h2 class="details-title">Detalles</h2>
          <div class="vehicle-specs-container">
            <!-- Columna izquierda -->
            <div class="specs-left">
              <p>
                <img src="@/assets/icons/mileage.svg" class="icon" alt="Kilometraje" />
                <strong>Kilometraje: </strong> {{ ' ' + product.mileage }}
              </p>
              <p>
                <img src="@/assets/icons/paint-roller-solid.svg" class="icon" alt="Color" />
                <strong>Color: </strong> {{ product.exteriorColor }}
              </p>
              <p>
                <img src="@/assets/icons/engine.svg" class="icon" alt="Motor" />
                <strong>Motor: </strong> {{ product.engine }}
              </p>
            </div>
            <!-- Columna derecha -->
            <div class="specs-right">
              <p>
                <img src="@/assets/icons/gas-pump-solid.svg" class="icon" alt="Combustible" />
                <strong>Combustible: </strong> {{ product.fuel }}
              </p>
              <p>
                <img src="@/assets/icons/gearbox.svg" class="icon" alt="Transmisión" />
                <strong>Transmisión:</strong> {{ ' ' + product.transmission }}
              </p>
              <p>
                <img src="@/assets/icons/camera-solid.svg" class="icon" alt="Cámara trasera" />
                <strong>Cámara trasera: </strong> {{ product.hasBackupCamera ? 'Sí' : 'No' }}
              </p>
            </div>
          </div>
          <!-- Botón de contacto -->
          <button @click="contactSeller" class="btn-contact-seller">Iniciar chat</button>
        </div>
      </section>

      <!-- Sección del perfil del usuario ajustada -->
      <section class="user-profile">
        <div class="user-avatar-name">
          <img src="@/assets/icons/userDefault.jpg" alt="User Avatar" class="avatar" />
          <div class="user-info">
            <h3 class="user-name">{{ product.user.name + ' ' + product.user.lastName }}</h3>
            <p class="user-email">{{ product.user.email }}</p>
          </div>
        </div>
      </section>

      <!-- Sección de verificación del vendedor -->
      <section class="seller-verification">
        <div class="verification-header">
          <h2>Verificaciones del vendedor</h2>
        </div>
        <div class="verification-items">
          <div class="verification-item">
            <img src="@/assets/icons/verified.svg" alt="Email Verified" class="icon" />
            Email
          </div>
          <div class="verification-item">
            <img src="@/assets/icons/verified.svg" alt="Mobile Verified" class="icon" />
            Mobile
          </div>
          <div class="verification-item">
            <img src="@/assets/icons/verified.svg" alt="Driver's License Verified" class="icon" />
            Driver's License
          </div>
          <div class="verification-item">
            <img src="@/assets/icons/verified.svg" alt="Payment Verified" class="icon" />
            Payment Verified
          </div>
        </div>
      </section>

      <!-- Sección de descripción del vehículo -->
      <section class="vehicle-description">
        <h2>Descripción</h2>
        <p class="user-email">{{ product.description }}</p>
      </section>

      <!-- Sección de información adicional desplegable -->
      <section class="additional-info">
        <h2 @click="toggleDetails">
          Información Adicional
          <span class="toggle-icon">{{ isDetailsVisible ? '−' : '+' }}</span>
        </h2>
        <div v-show="isDetailsVisible" class="details-content">
          <!-- Primera columna de detalles -->
          <!-- Primera columna de detalles -->
          <div class="detail-column">
            <div class="detail-row"><span class="boldd">Año:</span> {{ product.year }}</div>
            <div class="detail-row">
              <span class="boldd">Transmisión:</span> {{ product.transmission }}
            </div>
            <div class="detail-row">
              <span class="boldd">Tracción:</span> {{ product.driveTrain }}
            </div>
            <div class="detail-row">
              <span class="boldd">Cantidad de puertas:</span> {{ product.doors }}
            </div>
            <div class="detail-row"><span class="boldd">Seguro:</span> {{ product.seguro }}</div>
          </div>
          <div class="detail-column">
            <div class="detail-row"><span class="boldd">Dueños:</span> {{ product.owners }}</div>
            <div class="detail-row">
              <span class="boldd">Color interior:</span> {{ product.interiorColor }}
            </div>
            <div class="detail-row">
              <span class="boldd">Color exterior:</span> {{ product.exteriorColor }}
            </div>
            <div class="detail-row">
              <span class="boldd">Capacidad cilindraje:</span> {{ product.cylinderCapacity }}
            </div>
            <div class="detail-row">
              <span class="boldd">Airbag:</span>
              {{ product.airbag ? 'Yes' : 'No' }}
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de servicios adicionales -->
      <section class="addon-services">
        <!-- Contenedor de servicios adicionales aquí -->
      </section>

      <section class="onlycars-section">
        <div class="onlycars-info">
          <h3>¿Por qué usar OnlyCars?</h3>
          <div class="onlycars-benefits">
            <div class="benefit">
              <img src="@/assets/icons/moneyTransfer.png" alt="Transferencia segura" />
              <div>
                <h4>Transferencia segura de dinero</h4>
                <p>
                  Transfiere dinero de manera instantánea entre las partes con OnlyCars Pay. Sin
                  tarifas de transacción.
                </p>
              </div>
            </div>

            <div class="benefit">
              <img src="@/assets/icons/easyBuy.png" alt="Compra fácil" />
              <div>
                <h4>Compra fácil</h4>
                <p>
                  Programa fácilmente pruebas de manejo, haz ofertas y firma el contrato de venta
                  electrónicamente en una sola app.
                </p>
              </div>
            </div>

            <div class="benefit">
              <img src="@/assets/icons/scammer.png" alt="Evita estafadores" />
              <div>
                <h4>Evita estafadores</h4>
                <p>
                  Conéctate con usuarios verificados y chatea sin compartir tu información personal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  data() {
    return {
      product: null,
      errorMessage: '',
      isDetailsVisible: false,
      chat: null
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    toggleDetails() {
      this.isDetailsVisible = !this.isDetailsVisible
    },
    async contactSeller() {
      if (!this.user) {
        this.errorMessage = 'Debe iniciar sesión para contactar al vendedor'
        this.$router.push('/login');
        return
      }

      try {
        const response = await axios.get('http://localhost:8080/findChat', {
          params: {
            user1: this.user._id,
            user2: this.product.user._id,
            productID: this.product._id
          }
        })

        console.log(response.data)

        if (response.data) {
          console.log('ENTRA ACA 1')
          this.$store.commit('setChat', {
            _id: response.data._id,
            buyerID: this.user._id,
            sellerID: this.product.user._id,
            productID: this.product._id
          })
          this.$router.push(`/chats`)
        } else {
          console.log('ENTRA ACA 2')
          const newChat = await axios.post('http://localhost:8080/chat/startChat', {
            buyerID: this.user._id,
            sellerID: this.product.user._id,
            productID: this.product._id
          })

          if (newChat.data) {
            this.$store.commit('setChat', {
              _id: newChat.data._id,
              buyerID: this.user._id,
              sellerID: this.product.user._id,
              productID: this.product._id
            })

            console.log('Actualizacion de store')

            await this.$router.push(`/chats`)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const response = await axios.get(`http://localhost:8080/catalog/${id}`)
      this.product = response.data
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style scoped>
.main-container {
  min-height: 100vh;
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

.additional-info h2 {
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.additional-info h2 {
  width: 100%;
  text-align: left;
}

.details-content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  gap: 16px;
  width: calc(100% - 40px);
  margin-top: 20px;
}

.boldd {
  font-weight: bold;
}

.detail-row {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
}

.onlycars-section {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.onlycars-info {
  display: flex;
  flex-direction: column;
}

.onlycars-info h3 {
  text-align: center;
  color: #333;
  font-size: 1.5em;
  margin-bottom: 20px;
}

.onlycars-benefits {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.benefit {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 80%;
}

.benefit:last-child {
  margin-bottom: 0;
}

.benefit img {
  width: 40px;
  height: auto;
  margin-right: 10px;
}

.benefit h4 {
  margin: 0;
  color: #333;
  font-size: 1.2em;
}

.benefit p {
  color: #666;
  font-size: 0.9em;
}

.user-profile {
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  align-items: flex-start;
}

.user-avatar-name {
  display: flex;
  align-items: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0px;
}

.user-email {
  font-size: 1em;
}

.seller-verification {
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.verification-header h2 {
  font-size: 20px;
  margin-bottom: 15px;
}

.verification-items {
  display: flex;
  align-items: center;
  justify-content: start;
}

.verification-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.verification-item .icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.vehicle-description h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.vehicle-description p {
  font-size: 1em;
  margin-bottom: 10px;
}

.additional-info h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.accordion {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
}

.accordion-toggle {
  font-size: 1.2em;
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.accordion-content {
  display: none;
}

.accordion-content.open {
  display: block;
}

strong {
  margin-right: 0.3em;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.detail-col {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.5rem;
  width: 24px;
  height: auto;
}

.details-title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.vehicle-listing {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
}

.vehicle-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.vehicle-carousel-container {
  flex: 1;
  padding-right: 20px;
  max-width: 50%;
}

.vehicle-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.vehicle-details-container {
  flex: 1;
  padding-left: 20px;
  max-width: 50%;
}

.vehicle-title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.vehicle-price {
  font-size: 28px;
  color: #fbc40e;
}

.vehicle-specs-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.specs-left,
.specs-right {
  flex: 1 1 45%;
  margin-bottom: 10px;
  font-size: 20px;
}

.btn-contact-seller {
  padding: 10px 40px;
  background-color: #fbc40e;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto;
}

.user-container,
.vehicle-description,
.additional-info,
.addon-services {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.icon-svg {
  height: 24px;
  width: 24px;
  margin-right: 10px;
}

.specs-left p,
.specs-right p {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .vehicle-carousel-container,
  .vehicle-details-container {
    flex: 1 1 100%;
  }
  .specs-left,
  .specs-right {
    flex: 1 1 100%;
  }
}

.user-container {
  /* Agrega estilos aca xavales */
}

.vehicle-description {
  /* Agrega estilos aca xavales */
}

.additional-info {
  /* Agrega estilos aca xavales */
}

.addon-services {
  /* Agrega estilos aca xavales */
}
</style>
