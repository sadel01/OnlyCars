<template>
  <div class="sell-view">
    <div class="image-upload-container" @click="triggerFileUpload">
      <p>Agregar Imágenes</p>
      <input
        type="file"
        id="image-upload"
        ref="fileInput"
        multiple
        accept="image/*"
        style="display: none"
        @change="handleFileUpload"
      />
      <div class="imagePreviews">
        <div v-for="(src, index) in imagePreviews" :key="index" class="imagePreview">
          <img :src="src" alt="Image preview" class="previewImage" />
        </div>
      </div>
    </div>
    <button @click="removeImage(index)">Eliminar</button>

    <div class="vehicle-details">
      <div class="details-column">
        <div class="form-group">
          <label for="brand">Marca</label>
          <select id="brand" v-model="vehicle.brand" @change="fetchModels">
            <option disabled value="">Seleccione una marca</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="model">Modelo</label>
          <select id="model" v-model="vehicle.model" :disabled="!vehicle.brand">
            <option disabled value="">Seleccione un modelo</option>
            <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="year">Año</label>
          <input
            type="text"
            id="year"
            v-model="vehicle.year"
            placeholder="Ingrese el año"
            @input="formatYearInput"
          />
          <p
            v-if="errorMessage"
            class="error"
            style="font-size: 12px; color: red; margin-left: 20px"
          >
            {{ errorMessage }}
          </p>
        </div>

        <div class="form-group">
          <label for="condition">Condición</label>
          <select id="condition" v-model="vehicle.condition">
            <option value="" disabled selected>Seleccione una condición</option>
            <option value="new">Nuevo</option>
            <option value="used">Usado</option>
          </select>
        </div>
        <div class="form-group">
          <label for="cylinderCapacity">Cilindraje</label>
          <input
            type="text"
            id="cylinderCapacity"
            v-model="vehicle.cylinderCapacity"
            placeholder="Ingrese cilindraje"
          />
        </div>
        <div class="form-group">
          <label for="price">Precio</label>
          <input
            type="text"
            id="price"
            v-model="vehicle.price"
            placeholder="Precio del vehículo"
            @input="formatPriceInput"
          />
        </div>

        <div class="form-group">
          <label for="seguro">Seguro</label>
          <select id="seguro" v-model="vehicle.seguro">
            <option value="" disabled selected>Seleccione un seguro</option>
            <option value="RS">Responsabilidad social</option>
            <option value="C">Colisión</option>
            <option value="CRV">Contra robos y vandalismo</option>
            <option value="MSS/CSI">Motorista sin seguro o con seguro insuficiente</option>
            <option value="PAP">Protección para accidentes personales</option>
            <option value="AA">Alquiler de automóviles</option>
            <option value="AC">Asistencia en carretera</option>
            <option value="GAP">GAP</option>
            <option value="SS">Sin seguro</option>
          </select>
        </div>

        <div class="form-group">
          <label for="interiorColor">Color Interior</label>
          <input
            type="text"
            id="interiorColor"
            v-model="vehicle.interiorColor"
            placeholder="Ingrese un color"
          />
        </div>
      </div>

      <div class="details-column">
        <div class="form-group">
          <label for="fuel">Combustible</label>
          <select id="fuel" v-model="vehicle.fuel">
            <option value="" disabled selected>Selecciona un combustible</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diésel">Diésel</option>
            <option value="Eléctrico">Eléctrico</option>
          </select>
        </div>

        <div class="form-group">
          <label for="transmission">Transmisión</label>
          <select id="transmission" v-model="vehicle.transmission">
            <option value="" disabled selected>Selecciona una transmisión</option>
            <option value="Manual">Manual</option>
            <option value="Automatico">Automático</option>
          </select>
        </div>

        <div class="form-group">
          <label for="driveTrain">Tracción</label>
          <select id="driveTrain" v-model="vehicle.driveTrain">
            <option value="" disabled selected>Selecciona una tracción</option>
            <option value="fwd">FWD - Tracción delantera</option>
            <option value="rwd">RWD - Tracción trasera</option>
            <option value="awd">AWD - Tracción total</option>
          </select>
        </div>

        <div class="form-group">
          <label for="mileage">Kilometraje</label>
          <input
            type="text"
            id="mileage"
            v-model="vehicle.mileage"
            placeholder="Ingrese kilometraje"
            @input="formatKMInput"
          />
        </div>

        <div class="form-group">
          <label for="airbag">Airbag</label>
          <select id="airbag" v-model="vehicle.airbag">
            <option value="" disabled selected>¿Tiene airbag?</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div class="form-group">
          <label for="location">Región</label>
          <select id="location" v-model="vehicle.location">
            <option value="">Región</option>
            <option value="region15">Arica y Parinacota</option>
            <option value="region1">Tarapacá</option>
            <option value="region2">Antofagasta</option>
            <option value="region3">Atacama</option>
            <option value="region4">Coquimbo</option>
            <option value="region5">Valparaíso</option>
            <option value="regionRM">Metropolitana</option>
            <option value="region6">Bernardo O'Higgins</option>
            <option value="region7">Maule</option>
            <option value="region8">Biobío</option>
            <option value="region9">La Araucanía</option>
            <option value="region14">Los Ríos</option>
            <option value="region10">Los Lagos</option>
            <option value="region11">Aysén</option>
            <option value="region12">Magallanes</option>
          </select>
        </div>

        <div class="form-group">
          <label for="owners">N° propietarios anteriores</label>
          <input type="text" id="owners" v-model="vehicle.owners" placeholder="Ingrese el número" />
        </div>

        <div class="form-group">
          <label for="doors">N° puertas</label>
          <input type="text" id="doors" v-model="vehicle.doors" placeholder="Ingrese el número" />
        </div>

        <div class="form-group">
          <label for="exteriorColor">Color Exterior</label>
          <input
            type="text"
            id="exteriorColor"
            v-model="vehicle.exteriorColor"
            placeholder="Ingrese el color"
          />
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="description">Descripción</label>
      <textarea
        type="text"
        id="description"
        v-model="vehicle.description"
        placeholder="Ingrese descripción"
      />
    </div>
    <p v-if="errorMessage" class="error" style="font-size: 12px; color: red; margin-left: 20px">
      {{ errorMessage }}
    </p>
    <p
      v-if="successMessage"
      class="success"
      style="font-size: 12px; color: green; margin-left: 20px"
    >
      {{ successMessage }}
    </p>
    <button type="button" @click="submitVehicle" :disabled="isLoading">
      <span v-if="isLoading"> <i class="fa fa-spinner fa-spin"></i> Cargando... </span>
      <span v-else> Publicar </span>
    </button>
  </div>
</template>

<script>
import axios from 'axios'
import { computed } from 'vue'
import { useStore } from 'vuex'

function imageToBase64(img) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(img)
  })
}

export default {
  name: 'SellView',
  setup() {
    const store = useStore()
    return {
      user: computed(() => store.state.user)
    }
  },
  data() {
    return {
      vehicle: {
        brand: '',
        model: '',
        year: '',
        condition: '',
        mileage: '',
        fuel: '',
        transmission: '',
        driveTrain: '',
        cylinderCapacity: '',
        airbag: '',
        price: '', //Precio del vehiculo
        owners: '', //Numero de propietarios anteriores
        seguro: '', //Tipo de seguro
        doors: '', //Numero de puertas
        interiorColor: '', //Color interior
        exteriorColor: '', //Color exterior
        description: '',
        location: ''
      },
      errorMessage: '',
      successMessage: '',
      brands: [],
      models: [],
      filesToUpload: [],
      imagePreviews: [],
      imagePaths: [],
      isLoading: false
    }
  },
  methods: {
    formatKMInput() {
      let value = this.vehicle.mileage.replace(/[\D]/g, '')
      value = parseInt(value, 10)
      if (isNaN(value)) {
        value = ''
      } else {
        value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Para colocar puntos chavales
      }
      this.vehicle.mileage = value
    },
    formatPriceInput() {
      let value = this.vehicle.price.replace(/[\D]/g, '')
      value = parseInt(value, 10)
      if (isNaN(value)) {
        value = ''
      } else {
        value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Para colocar puntos chavales
      }
      this.vehicle.price = `$${value}` // añadir el signo de dolar
    },
    triggerFileUpload() {
      this.$refs.fileInput.click()
    },

    handleFileUpload(event) {
      const files = event.target.files
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith('image/')) {
          alert('Solo se pueden subir imágenes.')
          continue
        }
        this.filesToUpload.push(files[i])
        const reader = new FileReader()
        reader.onload = (e) => this.imagePreviews.push(e.target.result)
        reader.readAsDataURL(files[i])
      }
      event.target.value = ''
    },

    removeImage(index) {
      this.imagePreviews.splice(index, 1)
      this.filesToUpload.splice(index, 1)
    },

    async saveImages() {
      this.imagePaths = []
      for (let i = 0; i < this.filesToUpload.length; i++) {
        const base64 = await imageToBase64(this.filesToUpload[i])
        this.imagePaths.push(base64)
      }
    },
    async fetchBrands() {
      try {
        const response = await fetch('http://localhost:8080/brands')
        if (response.ok) this.brands = await response.json()
      } catch (error) {
        console.error('Error al recuperar las marcas:', error)
      }
    },
    isValidYear() {
      const value = this.vehicle.year.trim()
      if (value === '') {
        return false // El campo está vacío
      }
      if (!/^\d{4}$/.test(value)) {
        return false // No tiene 4 dígitos
      }
      const year = parseInt(value, 10)
      return year >= 1900 && year <= 2024 // Devuelve true si el año está dentro del rango válido
    },

    async fetchModels() {
      if (!this.vehicle.brand) {
        this.models = []
        return
      }
      try {
        const response = await fetch(`http://localhost:8080/models/${this.vehicle.brand}`)
        if (response.ok) this.models = await response.json()
      } catch (error) {
        console.error('Error al recuperar los modelos:', error)
      }
    },

    async submitVehicle() {
      if (
        !this.vehicle.brand ||
        !this.vehicle.model ||
        !this.vehicle.year ||
        !this.vehicle.condition ||
        !this.vehicle.mileage ||
        !this.vehicle.fuel ||
        !this.vehicle.transmission ||
        !this.vehicle.driveTrain ||
        !this.vehicle.cylinderCapacity ||
        !this.vehicle.airbag ||
        !this.vehicle.price ||
        !this.vehicle.owners ||
        !this.vehicle.seguro ||
        !this.vehicle.doors ||
        !this.vehicle.interiorColor ||
        !this.vehicle.exteriorColor ||
        !this.isValidYear()
      ) {
        this.errorMessage = 'Todos los campos son obligatorios'
        setTimeout(() => {
          this.errorMessage = ''
        }, 2000)
        return
      }
      try {
        this.isLoading = true
        const user = this.$store.state.user
        await this.saveImages()
        const vehicleData = {
          ...this.vehicle,
          image: this.imagePaths,
          user: {
            _id: user._id,
            name: user.nombre,
            lastName: user.apellido,
            email: user.mail,
            rut: user.rut
          }
        }
        this.successMessage = 'Auto publicado con éxito'
        setTimeout(() => {
          this.successMessage = ''
        }, 2000)
        const response = await axios.post('http://localhost:8080/postsPrueba', vehicleData)
        console.log('Response from the server:', response.data)
        // Reset vehicle data
        this.vehicle = {
          brand: '',
          model: '',
          year: '',
          condition: '',
          mileage: '',
          fuel: '',
          transmission: '',
          driveTrain: '',
          cylinderCapacity: '',
          airbag: '',
          price: '',
          owners: '',
          seguro: '',
          doors: '',
          interiorColor: '',
          exteriorColor: '',
          description: '',
          location: ''
        }
      } catch (error) {
        this.errorMessage = 'Error al publicar'
        setTimeout(() => {
          this.errorMessage = ''
        }, 1500)
        console.error('Error al publicar el vehículo:', error)
      } finally {
        this.isLoading = false
        this.imagePreviews = []
      }
    },
    formatYearInput() {
      let value = this.vehicle.year.trim() // Eliminar espacios al inicio y al final
      if (value === '') {
        this.errorMessage = '' // Limpiar el mensaje de error si el campo está vacío
      } else if (!/^\d{4}$/.test(value)) {
        // Verificar si el valor tiene 4 dígitos
        this.errorMessage = 'Ingrese un año válido con 4 dígitos'
      } else {
        const year = parseInt(value, 10) // Convertir a número entero
        if (year < 1900 || year > 2024) {
          this.errorMessage = 'Ingrese un año válido entre 1900 y 2024'
        } else {
          this.errorMessage = '' // Limpiar mensaje de error si el valor es válido
        }
      }
    }
  },
  watch: {
    'vehicle.brand': function (newBrand) {
      this.fetchModels()
    }
  },
  mounted() {
    this.fetchBrands()
  }
}
</script>

<style scoped>
#description {
  width: 98%;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  box-sizing: border-box;
  resize: none; /* Esto desactiva la capacidad de cambiar el tamaño del textarea */
  margin-left: 9px;
}

.imagePreviews {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

.imagePreview {
  margin-right: 10px;
  margin-bottom: 10px;
}

.previewImage {
  width: 200px;
  height: auto;
}

.sell-view {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.image-upload-container {
  border: 2px dashed #ccc;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  margin-bottom: 20px;
}

.vehicle-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.details-column {
  flex: 1;
  margin-right: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  margin-left: 10px;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 0 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

button {
  background-color: #fbc40e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: calc(100% - 20px);
  box-sizing: border-box;
  margin: 0 10px;
}

button:hover {
  background-color: #fbc40e;
}
</style>
