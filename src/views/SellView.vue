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
            inputmode="numeric"
            pattern="[0-9]*"
            @input="formatYearInput"
          />
          <p
            v-if="vehicle.errorMessage.year"
            class="error"
            style="font-size: 12px; color: red; margin-left: 20px"
          >
            {{ vehicle.errorMessage.year }}
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
            @input="formatCylinderInput"
            :disabled="!vehicle.fuel"
          />
          <p
            v-if="vehicle.errorMessage.cylinderCapacity"
            class="error"
            style="font-size: 12px; color: red; margin-left: 20px"
          >
            {{ vehicle.errorMessage.cylinderCapacity }}
          </p>
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
          <label for="interiorColor">Color Interior</label>
          <input
            type="text"
            id="interiorColor"
            v-model="vehicle.interiorColor"
            placeholder="Ingrese un color"
          />
        </div>

        <div class="form-group">
          <label for="region">Región</label>
          <select id="region" v-model="vehicle.region" @change="fetchRegion">
            <option value="" disabled selected>Seleccione una región</option>
            <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="provincia">Provincia</label>
          <select id="provincia" v-model="vehicle.provincia" :disabled="!vehicle.region">
            <option value="" disabled selected>Seleccione una provincia</option>
            <option v-for="provincia in provincias" :key="provincia" :value="provincia">
              {{ provincia }}
            </option>
          </select>
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
            <option value="Tracción delantera">FWD - Tracción delantera</option>
            <option value="Tracción trasera">RWD - Tracción trasera</option>
            <option value="Tracción total">AWD - Tracción total</option>
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
          <p
            v-if="vehicle.errorMessage.mileage"
            class="error"
            style="font-size: 12px; color: red; margin-left: 20px"
          >
            {{ vehicle.errorMessage.mileage }}
          </p>
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
          <label for="owners">N° propietarios anteriores</label>
          <input
            type="text"
            id="owners"
            v-model="vehicle.owners"
            placeholder="Ingrese el número"
            @input="formatOwnerInput"
          />
          <p
            v-if="vehicle.errorMessage.owners"
            class="error"
            style="font-size: 12px; color: red; margin-left: 20px"
          >
            {{ vehicle.errorMessage.owners }}
          </p>
        </div>

        <div class="form-group">
          <label for="doors">N° puertas</label>
          <input
            type="text"
            id="doors"
            v-model="vehicle.doors"
            placeholder="Ingrese el número"
            @input="formatDoorInput"
          />
          <p
            v-if="vehicle.errorMessage.doors"
            class="error"
            style="font-size: 12px; color: red; margin-left: 20px"
          >
            {{ vehicle.errorMessage.doors }}
          </p>
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

        <div class="form-group">
          <label for="comuna">Comuna</label>
          <select id="comuna" v-model="vehicle.comuna" :disabled="!vehicle.provincia">
            <option value="" disabled selected>Seleccione una comuna</option>
            <option v-for="comuna in comunas" :key="comuna" :value="comuna">{{ comuna }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Seguro</label>
      <div class="insurance-options-container">
        <div
          v-for="(insuranceOption, index) in insuranceOptions"
          :key="index"
          class="checkbox-container"
        >
          <input
            type="checkbox"
            :id="'insurance-' + insuranceOption"
            :value="insuranceOption"
            v-model="vehicle.insuranceOptions"
          />
          <label :for="'insurance-' + insuranceOption">{{ insuranceOption }}</label>
        </div>
      </div>
    </div>

    <div class="additional-data-section">
      <h3>Datos Adicionales</h3>
      <div class="form-group">
        <label for="power">Potencia del Motor (HP o kW)</label>
        <input
          type="text"
          id="power"
          v-model="vehicle.power"
          placeholder="Ingrese la potencia del motor en HP o kW"
          @input="formatPowerInput"
        />
        <p
          v-if="vehicle.errorMessage.power"
          class="error"
          style="font-size: 12px; color: red; margin-left: 20px"
        >
          {{ vehicle.errorMessage.power }}
        </p>
      </div>

      <div class="form-group">
        <label for="suspensionType">Tipo de Suspensión</label>
        <select id="suspensionType" v-model="vehicle.suspensionType">
          <option value="" disabled selected>Seleccione el tipo de suspensión</option>
          <option value="Estándar">Estándar</option>
          <option value="Deportiva">Deportiva</option>
          <option value="Ajustable">Ajustable</option>
        </select>
      </div>

      <div class="form-group">
        <label for="tireType">Tipo de Neumáticos</label>
        <select id="tireType" v-model="vehicle.tireType">
          <option value="" disabled selected>Seleccione el tipo de neumáticos</option>
          <option value="De Carretera">De Carretera</option>
          <option value="Mixtos">Mixtos</option>
          <option value="Todo Terreno">Todo Terreno</option>
        </select>
      </div>

      <div class="form-group">
        <label for="groundClearance">Altura del Vehículo al Suelo (cm)</label>
        <input
          type="text"
          id="groundClearance"
          v-model="vehicle.groundClearance"
          placeholder="Ingrese la altura del vehículo al suelo en cm"
          @input="formatGroundClearenceInput"
        />
        <p
          v-if="vehicle.errorMessage.groundClearance"
          class="error"
          style="font-size: 12px; color: red; margin-left: 20px"
        >
          {{ vehicle.errorMessage.groundClearance }}
        </p>
      </div>
    </div>

    <!-- Sistemas de Confort Principales -->
    <div class="form-group">
      <label>Sistemas de Confort Principales</label>
      <div class="comfort-features-container">
        <div
          v-for="(comfortFeature, index) in comfortFeatures"
          :key="index"
          class="checkbox-container"
        >
          <input
            type="checkbox"
            :id="'comfort-' + comfortFeature"
            :value="comfortFeature"
            v-model="vehicle.comfortFeatures"
          />
          <label :for="'comfort-' + comfortFeature">{{ comfortFeature }}</label>
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
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getStorage } from 'firebase/storage'

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
      selectedComfortFeatures: [], // las características de confort seleccionadas
      selectedInsuranceOptions: [], // las características de confort seleccionadas
      insuranceOptions: [
        'Responsabilidad social',
        'Colisión',
        'Contra robos y vandalismo',
        'Motorista sin seguro o con seguro insuficiente',
        'Protección para accidentes personales',
        'Alquiler de automóviles',
        'Asistencia en carretera',
        'GAP',
        'Sin seguro'
        // ... añadir más según se desee ...
      ],
      comfortFeatures: [
        // Lista de sistemas de confort para elegir
        'Control de clima automático',
        'Asientos calefactables',
        'Sistema de infoentretenimiento avanzado',
        'Sensores de estacionamiento',
        'Cámara de visión trasera',
        'Control de crucero',
        'Asistente de mantenimiento de carril',
        'Cierre centralizado',
        'Ventanas eléctricas',
        'Sistema de navegación GPS'
        // ... añadir más según se desee ...
      ],
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
        doors: '', //Numero de puertas
        interiorColor: '', //Color interior
        exteriorColor: '', //Color exterior
        description: '',
        region: '',
        provincia: '',
        comuna: '',
        comfortFeatures: '',
        power: '', //Potencia del motor
        suspensionType: '', //Tipo de suspensión
        tireType: '', //Tipo de neumáticos
        groundClearance: '', //Altura del vehículo al suelo
        comfortFeatures: [], // Sistemas de confort seleccionados
        insuranceOptions: [], // las opciones de seguro seleccionadas
        errorMessage: {
          mileage: '',
          year: '',
          doors: '',
          cylinderCapacity: '',
          owners: '',
          power: '',
          groundClearance: ''
        }
      },
      errorMessage: '',
      successMessage: '',
      brands: [],
      models: [],
      regions: [],
      provincias: [],
      comunas: [],
      filesToUpload: [],
      imagePreviews: [],
      imagePaths: [],
      isLoading: false
    }
  },
  methods: {
    clear() {
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
        region: '',
        provincia: '',
        comuna: '',
        comfortFeatures: [],
        insuranceOptions: [],
        errorMessage: {
          mileage: '',
          year: '',
          doors: '',
          cylinderCapacity: '',
          owners: '',
          power: '',
          groundClearance: ''
        }
      }
      this.errorMessage = ''
      this.successMessage = ''
      this.imagePreviews = []
      this.filesToUpload = []
    },
    formatKMInput() {
      let value = this.vehicle.mileage.replace(/[\D]/g, '')
      value = parseInt(value, 10)
      if (this.vehicle.mileage.trim() === '') {
        this.vehicle.errorMessage.mileage = ''
      } else if (isNaN(value) || value < 0) {
        this.vehicle.errorMessage.mileage = 'Ingrese un kilometraje válido'
      } else {
        this.vehicle.errorMessage.mileage = ''
        value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Para colocar puntos chavales
        this.vehicle.mileage = value
      }
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
    formatDoorInput() {
      let value = this.vehicle.doors.replace(/[\D]/g, '')
      value = parseInt(value, 10)
      if (this.vehicle.doors.trim() === '') {
        this.vehicle.errorMessage.doors = ''
      } else if (isNaN(value) || value < 0) {
        this.vehicle.errorMessage.doors = 'Ingrese un número de puertas válido'
      } else {
        this.vehicle.errorMessage.doors = ''
        this.vehicle.doors = value
      }
    },
    formatCylinderInput() {
      if (this.vehicle.fuel === 'Diésel' || this.vehicle.fuel === 'Gasolina') {
        const value = this.vehicle.cylinderCapacity.trim()

        if (value === '') {
          this.vehicle.errorMessage.cylinderCapacity = '' // Limpiar mensaje de error si el campo está vacío
          return
        }

        // Validar si el valor contiene caracteres no permitidos
        if (!/^[\d,.]+$/.test(value)) {
          this.vehicle.errorMessage.cylinderCapacity =
            'El cilindraje debe contener solo números, punto (.) o coma (,)'
          return
        }

        const sanitizedValue = value.replace(',', '.')
        const floatValue = parseFloat(sanitizedValue)

        if (isNaN(floatValue) || floatValue <= 0) {
          this.vehicle.errorMessage.cylinderCapacity = 'Ingrese un cilindraje válido' // Mostrar error si no es un número válido
        } else if (floatValue > 10) {
          this.vehicle.errorMessage.cylinderCapacity = 'El cilindraje máximo es de 10 litros' // Mostrar error si excede el límite
        } else {
          this.vehicle.errorMessage.cylinderCapacity = '' // Limpiar mensaje de error si es válido
          this.vehicle.cylinderCapacity = sanitizedValue // Asignar el valor como está (cadena de texto)
        }
      } else if (this.vehicle.fuel === 'Eléctrico') {
        this.vehicle.errorMessage.cylinderCapacity = 'Se medirá en kWh'
        const value = this.vehicle.cylinderCapacity.trim()

        if (value === '') {
          this.vehicle.errorMessage.cylinderCapacity = '' // Limpiar mensaje de error si el campo está vacío
          return
        }

        // Validar si el valor contiene caracteres no permitidos
        if (!/^[\d,.]+$/.test(value)) {
          this.vehicle.errorMessage.cylinderCapacity =
            'La capacidad de la bateria debe contener solo números, punto (.) o coma (,)'
          return
        }

        const sanitizedValue = value.replace(',', '.')
        const floatValue = parseFloat(sanitizedValue)

        if (isNaN(floatValue) || floatValue <= 0) {
          this.vehicle.errorMessage.cylinderCapacity = 'Ingrese una capacidad de bateria válida' // Mostrar error si no es un número válido
        } else if (floatValue > 350) {
          this.vehicle.errorMessage.cylinderCapacity = 'El máximo es de 350 Kwh' // Mostrar error si excede el límite
        } else {
          this.vehicle.errorMessage.cylinderCapacity = '' // Limpiar mensaje de error si es válido
          this.vehicle.cylinderCapacity = sanitizedValue // Asignar el valor como está (cadena de texto)
        }
      }
    },
    formatGroundClearenceInput() {
      const value = this.vehicle.groundClearance.trim()
      if (value === '') {
        this.vehicle.errorMessage.groundClearance = ''
        return
      }
      if (!/^[\d.,]+$/.test(value)) {
        this.vehicle.errorMessage.groundClearance = 'La altura debe contener solo números'
        return
      }
      const sanitizedValue = value.replace(',', '.')
      const floatValue = parseFloat(sanitizedValue)
      if (isNaN(floatValue) || floatValue < 0) {
        this.vehicle.errorMessage.groundClearance = 'Ingrese un número de altura válido'
      } else {
        this.vehicle.errorMessage.groundClearance = ''
        this.vehicle.groundClearance = sanitizedValue
      }
    },
    formatOwnerInput() {
      let value = this.vehicle.owners.replace(/[\D]/g, '')
      value = parseInt(value, 10)
      if (this.vehicle.owners.trim() === '') {
        this.vehicle.errorMessage.owners = ''
      } else if (isNaN(value) || value < 0) {
        this.vehicle.errorMessage.owners = 'Ingrese un número de propietarios válido'
      } else {
        this.vehicle.errorMessage.owners = ''
        this.vehicle.owners = value
      }
    },
    formatPowerInput() {
      const value = this.vehicle.power.trim()
      if (value === '') {
        this.vehicle.errorMessage.power = ''
        return
      }
      if (!/^[\d,.]+$/.test(value)) {
        this.vehicle.errorMessage.power =
          'La potencia debe contener solo números, punto (.) o coma (,)'
        return
      }
      const sanitizedValue = value.replace(',', '.')
      const floatValue = parseFloat(sanitizedValue)
      if (isNaN(floatValue) || floatValue <= 0) {
        this.vehicle.errorMessage.power = 'Ingrese una potencia válida'
      } else {
        this.vehicle.errorMessage.power = ''
        this.vehicle.power = sanitizedValue
      }
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
      const storage = getStorage()
      const uploadPromises = this.filesToUpload.map((file) => {
        const fileRef = storageRef(storage, `images/${file.name}-${Date.now()}`)
        return uploadBytes(fileRef, file).then((snapshot) => {
          return getDownloadURL(snapshot.ref)
        })
      })

      try {
        this.imagePaths = await Promise.all(uploadPromises)
      } catch (error) {
        console.error('Error al subir imágenes:', error)
        throw error // Asegúrate de manejar este error donde llames a saveImages
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

    async fetchRegion() {
      try {
        const response = await fetch('http://localhost:8080/regions')
        if (response.ok) {
          this.regions = await response.json()
          this.comunas = []
        }
      } catch (error) {
        console.error('Error al recuperar las regiones:', error)
      }
    },

    async fetchProvincia() {
      if (!this.vehicle.region) {
        this.provincias = []
        this.comunas = [] // Resetea las comunas si las usas
        return
      }
      try {
        const response = await fetch(`http://localhost:8080/provincia/${this.vehicle.region}`)
        if (response.ok) {
          this.provincias = await response.json()
          this.provincia = '' // Resetea la provincia seleccionada
        }
      } catch (error) {
        console.error('Error al recuperar las provincias:', error)
      }
    },

    async fetchComunas() {
      // Añade este método si gestionas comunas
      if (!this.vehicle.provincia) {
        this.comunas = []
      }
      try {
        // Debes tener un endpoint para obtener comunas basado en la provincia
        const response = await fetch(`http://localhost:8080/comuna/${this.vehicle.provincia}`)
        if (response.ok) {
          this.comunas = await response.json()
        }
      } catch (error) {
        console.error('Error al recuperar las comunas:', error)
      }
    },

    async submitVehicle() {
      if (Object.values(this.vehicle).some((value) => !value)) {
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
          },
          visitas: 0
        }
        this.successMessage = 'Auto publicado con éxito'
        setTimeout(() => {
          this.successMessage = ''
          this.clear()
        }, 2000)
        const response = await axios.post('http://localhost:8080/posts', vehicleData)
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
          region: '',
          provincia: '',
          comuna: ''
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
        this.vehicle.errorMessage.year = '' // Limpiar el mensaje de error si el campo está vacío
      } else if (!/^\d{4}$/.test(value)) {
        // Verificar si el valor tiene 4 dígitos
        this.vehicle.errorMessage.year = 'Ingrese un año válido con 4 números'
      } else {
        const year = parseInt(value, 10) // Convertir a número entero
        if (year < 1900 || year > 2024) {
          this.vehicle.errorMessage.year = 'Ingrese un año válido entre 1900 y 2024'
        } else {
          this.vehicle.errorMessage.year = '' // Limpiar mensaje de error si el valor es válido
        }
      }
    }
  },
  watch: {
    'vehicle.brand': function (newBrand) {
      this.fetchModels()
    },
    'vehicle.region'() {
      this.fetchProvincia()
    },
    'vehicle.provincia'() {
      this.fetchComunas()
    },
    selectedComfortFeatures(newVal) {
      this.vehicle.comfortFeatures = newVal
    },
    selectedInsuranceOptions(newVal) {
      this.vehicle.insuranceOptions = newVal
    }
  },
  mounted() {
    this.fetchBrands()
    this.fetchRegion()
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
  resize: none;
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

.comfort-features-container {
  height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 5px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.checkbox-container input[type='checkbox'] {
  margin: 0;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.checkbox-container label {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.form-group label {
  display: block;
}

.insurance-options-container {
  height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 5px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.checkbox-container input[type='checkbox'] {
  margin: 0;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.checkbox-container label {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.form-group label {
  display: block;
}
</style>
