<template>
  <div class="main-container">
    <div class="loading-container" v-if="isLoadingCar">
      <p id="loading-text">Conectando...</p>
      <div id="loading-spinner"></div>
    </div>
    <main class="vehicle-listing" v-if="!isLoadingCar">
      <div class="vehicle-header" v-if="product">
        <h1 class="vehicle-title">{{ product.year }} {{ product.brand }} {{ product.model }}</h1>
        <label class="containerFav" @click.stop="addToFavorites(product)">
          <input type="checkbox" :checked="isFavorite(product)" />
          <div class="checkmark">
            <svg viewBox="0 0 256 256">
              <rect fill="none" height="256" width="256"></rect>
              <path
                d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                stroke-width="25px"
                stroke="#333"
                fill="none"
              ></path>
            </svg>
          </div>
        </label>
      </div>
      <p class="fechaPublicacion">{{ formatDate(product.fechaPublicacion) }}</p>
      <p class="vehicle-price" v-if="product">${{ product.price }} CLP</p>
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
            <div class="specs-left" v-if="product">
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
                <strong>Cilindraje: </strong> {{ product.cylinderCapacity }}
              </p>
              <p>
                <img src="@/assets/icons/horse.svg" class="icon" alt="Potencia" />
                <strong>Potencia: </strong> {{ product.power }}
              </p>
            </div>
            <!-- Columna derecha -->
            <div class="specs-right" v-if="product">
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
              <p>
                <img src="@/assets/icons/suspension.svg" class="icon" alt="Suspensión" />
                <strong>Suspensión: </strong> {{ product.suspensionType }}
              </p>
            </div>
          </div>
          <!-- Botón de contacto -->
          <button @click="contactSeller" class="btn-contact-seller">
            <span> Iniciar chat</span>
          </button>
        </div>
      </section>

      <!-- Sección del perfil del usuario ajustada -->
      <section class="user-profile" v-if="product">
        <div class="user-avatar-name">
          <img src="@/assets/icons/userDefault.jpg" alt="User Avatar" class="avatar" />
          <div class="user-info">
            <div class="userNameVerificated">
              <h3 class="user-name">{{ product.user.name + ' ' + product.user.lastName }}</h3>
              <div class="verifacion" v-if="isVerificated">
                <img src="@/assets/icons/verified.svg" alt="User Verified" class="icon" />
                Vendedor verificado
              </div>
            </div>

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
      <section class="vehicle-description" v-if="product">
        <h2>Descripción</h2>
        <p class="user-email">{{ product.description }}</p>
      </section>
      <!-- Sección de calificacion y reseñas -->
      <section class="calificacion-resenias">
        <h2>Calificaciones y reseñas</h2>
        <!-- Botón para calificar -->
        <button @click="mostrarFormulario" class="btnCalificar">
          <span>Calificar</span>
        </button>

        <!-- Formulario de calificación -->
        <div id="formulario-calificacion" v-if="showRatingForm">
          <h3>Calificar este producto</h3>
          <form>
            <p><span class="label">Nombre:</span> {{ user.nombre }}</p>

            <label for="calificacion">Calificación:</label>
            <div class="calification">
              <div
                class="star"
                v-for="index in 5"
                :key="index"
                @click="starColor(index - 1)"
                style="cursor: pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                  :id="'star:' + (index - 1)"
                >
                  <rect fill="none" height="256" width="256"></rect>
                  <path
                    d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
                  />
                </svg>
              </div>
            </div>
            <label for="comentario">Comentario:</label><br />
            <textarea id="comentario" name="comentario" rows="4" cols="30" required></textarea
            ><br /><br />

            <button type="submit" class="btnEnviar">
              <span>Enviar</span>
            </button>
          </form>
        </div>
      </section>

      <!-- Sección de información adicional desplegable -->
      <section class="additional-info">
        <h2 @click="toggleDetails">
          Información Adicional
          <span class="toggle-icon">{{ isDetailsVisible ? '−' : '+' }}</span>
        </h2>
        <div v-show="isDetailsVisible" class="details-content" v-if="product">
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
              <span class="boldd">Tipo neumático:</span> {{ product.tireType }}
            </div>
            <div class="detail-row">
              <span class="boldd">Airbag:</span>
              {{ product.airbag ? 'Sí' : 'No' }}
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
      chat: null,
      cars: [],
      isLoadingCar: true,
      isVerificated: false,
      showRatingForm: false,
      selectedRating: 0
    }
  },

  async mounted() {
    try {
      await axios.post(`http://localhost:8080/catalog/${this.$route.params.id}/visit`)
    } catch (error) {
      console.error(error)
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
    starColor(starIndex) {
      this.selectedRating = starIndex + 1
      for (let i = 0; i < this.selectedRating; i++) {
        const starElement = document.getElementById(`star:${i}`)
        if (starElement) {
          starElement.style.fill = 'gold'
        }
      }
      for (let i = this.selectedRating; i < 5; i++) {
        const starElement = document.getElementById(`star:${i}`)
        if (starElement) {
          starElement.style.fill = 'black'
        }
      }
    },

    mostrarFormulario() {
      if (!this.user) {
        this.errorMessage = 'Debe iniciar sesión para contactar al vendedor'
        this.$router.push('/login')
        return
      } else {
        if (this.showRatingForm == false) {
          this.showRatingForm = true
        } else {
          this.showRatingForm = false
        }
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('es-CL', options)
    },
    async addToFavorites(product) {
      try {
        if (!this.$store.state.user) {
          this.$router.push('/login')
          return
        }

        this.isLoading = true
        const user = this.$store.state.user
        const vehicleData = {
          userId: user._id,
          postId: product._id
        }
        if (this.isFavorite(product)) {
          // Si el producto ya está en favoritos, lo eliminamos
          await axios.delete(`http://localhost:8080/favorites`, { data: vehicleData })
        } else {
          // Si el producto no está en favoritos, lo agregamos
          await axios.post('http://localhost:8080/favorites', vehicleData)
        }
        // Actualizamos la lista de favoritos
        await this.fetchFavorites()
      } catch (error) {
        this.errorMessage = 'Error al actualizar los favoritos'
        setTimeout(() => {
          this.errorMessage = ''
        }, 1500)
        console.error('Error al actualizar los favoritos:', error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchFavorites() {
      try {
        const userId = this.$store.state.user._id
        const response = await axios.get('http://localhost:8080/favorites', {
          params: { userId: userId }
        })

        // Verificar si la respuesta contiene datos de autos favoritos
        if (response.data && Array.isArray(response.data)) {
          this.cars = response.data
        } else {
          console.error(
            'La respuesta del servidor no contiene datos de autos favoritos válidos:',
            response
          )
        }
      } catch (error) {
        console.error('Error al obtener los autos favoritos:', error)
      }
    },
    isFavorite(product) {
      if (this.cars) {
        return this.cars.some((car) => car._id === product._id)
      } else {
        return false
      }
    },
    toggleDetails() {
      this.isDetailsVisible = !this.isDetailsVisible
    },
    async contactSeller() {
      if (!this.user) {
        this.errorMessage = 'Debe iniciar sesión para contactar al vendedor'
        this.$router.push('/login')
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

        if (response.data) {
          this.$store.commit('setChat', {
            _id: response.data._id,
            buyerID: this.user._id,
            sellerID: this.product.user._id,
            productID: this.product._id
          })
          this.$router.push(`/chats`)
        } else {
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

            await this.$router.push(`/chats`)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  async created() {
    // Primero, cargamos los favoritos
    await this.fetchFavorites()

    // Luego, obtenemos el producto actual
    const id = this.$route.params.id
    try {
      const response = await axios.get(`http://localhost:8080/catalog/${id}`)
      this.product = response.data
      this.isLoadingCar = false

      // Verificamos si el producto actual está en favoritos
      if (this.product) {
        this.product.isFavorited = this.isFavorite(this.product)
      }
    } catch (error) {
      console.error(error)
    }

    try {
      const response = await axios.get(`http://localhost:8080/users/${this.product.user._id}`)
      if (response.data.tipo === 'verificado') {
        this.isVerificated = true
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style scoped>
/*Si pueden corregir userNameverifacted verifacion para que que queden alineados con el nombre 
del usuario y el icono de verificado seria genial ;D
*/

.fechaPublicacion {
  font-size: 0.9rem;
  color: #333;
  margin-top: 0;
}

.userNameVerificated {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.verifacion {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 10px;
}

.vehicle-header {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}
.containerFav input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.containerFav {
  display: block;
  position: relative;
  right: 2%;
  cursor: pointer;
  user-select: none;
  transition: 100ms;
  margin-left: 3rem;
}
.calification {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}
.checkmark {
  top: 7rem;
  left: 0;
  height: 2.5em;
  width: 2.5em;
  transition: 100ms;
  animation: dislike_effect 400ms ease;
}
.star {
  top: 7rem;
  left: 0;
  height: 2.5em;
  width: 2.5em;
  transition: 100ms;
  animation: dislike_effect 400ms ease;
}
.star:hover {
  transform: scale(1.1);
}

.containerFav input:checked ~ .checkmark path {
  fill: #fbc40e;
  stroke-width: 0;
  height: 2.5em;
  width: 2.5em;
}

.containerFav input:checked ~ .checkmark {
  animation: like_effect 400ms ease;
}

.containerFav:hover {
  transform: scale(1.1);
}

@keyframes like_effect {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes dislike_effect {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

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
  margin-bottom: 0;
}

.vehicle-price {
  font-size: 28px;
  color: #fbc40e;
  margin-top: 0.5rem;
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
  margin-top: 3%;
  margin-bottom: 5%;
  margin-left: 2.5%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #fbc40e;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 3% 20%;
}
.btn-contact-seller:after {
  content: ' ';
  width: 0%;
  height: 100%;
  background: #c19400;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

.btn-contact-seller:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.btn-contact-seller span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  color: black;
  font-size: 1.125em;
  font-weight: 700;
  letter-spacing: 0.1em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}
.btn-contact-seller:hover span {
  color: white;
  animation: scaleUp 0.3s ease-in-out;
}

.btnCalificar {
  top: 0;
  margin-top: 3%;
  margin-bottom: 5%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #a0c4d3;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 1%;
}
.btnCalificar:after {
  content: ' ';
  width: 0%;
  height: 100%;
  background: #63b2d4;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

.btnCalificar:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.btnCalificar span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  color: black;
  font-size: 1.125em;
  font-weight: 700;
  letter-spacing: 0.1em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}
.btnCalificar:hover span {
  color: white;
  animation: scaleUp 0.3s ease-in-out;
}

.btnEnviar {
  top: 0;
  margin-top: 0%;
  margin-bottom: 3%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #a0c4d3;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 1%;
}
.btnEnviar:after {
  content: ' ';
  width: 0%;
  height: 100%;
  background: #63b2d4;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

.btnEnviar:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.btnEnviar span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  color: black;
  font-size: 1.125em;
  font-weight: 700;
  letter-spacing: 0.1em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}
.btnEnviar:hover span {
  color: white;
  animation: scaleUp 0.3s ease-in-out;
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

.calificacion-resenias {
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}
</style>
