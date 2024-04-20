<template>
  <div class="sell-view">
    <div class="image-upload-container" @click="triggerFileUpload">
      <p>Agregar Imágenes</p>
      <input
        type="file"
        id="image-upload"
        ref="fileInput"
        multiple accept="image/*"
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
          <input type="text" id="year" v-model="vehicle.year" placeholder="Ingrese el año" />
        </div>

        <div class="form-group">
          <label for="condition">Condición</label>
          <select id="condition" v-model="vehicle.condition">
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
      </div>

      <div class="details-column">
        <div class="form-group">
          <label for="fuel">Combustible</label>
          <select id="fuel" v-model="vehicle.fuel">
            <option value="Gasolina">Gasolina</option>
            <option value="Diésel">Diésel</option>
            <option value="Eléctrico">Eléctrico</option>
          </select>
        </div>

        <div class="form-group">
          <label for="transmission">Transmisión</label>
          <select id="transmission" v-model="vehicle.transmission">
            <option value="manual">Manual</option>
            <option value="automatic">Automático</option>
          </select>
        </div>

        <div class="form-group">
          <label for="driveTrain">Tracción</label>
          <select id="driveTrain" v-model="vehicle.driveTrain">
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
          />
        </div>

        <div class="form-group">
          <label for="airbag">Airbag</label>
          <select id="airbag" v-model="vehicle.airbag">
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    </div>

    <button type="button" @click="submitVehicle">Publicar</button>
  </div>
</template>

<script>
import axios from 'axios';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'SellView',
  setup() {
    const store = useStore();
    return {
      user: computed(() => store.state.user),
    };
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
      },
      brands: [],
      models: [],
      filesToUpload: [],
      imagePreviews: [],
      imagePaths: [],
    };
  },
  methods: {
    formatPriceInput() {
      let value = this.vehicle.price.replace(/[\D]/g, ''); 
      value = parseInt(value, 10);
      if (isNaN(value)) {
        value = '';
      } else {
        value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Para colocar puntos chavales
      }
      this.vehicle.price = `$${value}`; // añadir el signo de dolar
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },

    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith('image/')) {
          alert('Solo se pueden subir imágenes.');
          continue;
        }
        this.filesToUpload.push(files[i]);
        const reader = new FileReader();
        reader.onload = e => this.imagePreviews.push(e.target.result);
        reader.readAsDataURL(files[i]);
      }
      event.target.value = '';
    },

    removeImage(index) {
      this.imagePreviews.splice(index, 1);
      this.filesToUpload.splice(index, 1);
    },

    async saveImages() {
      const formData = new FormData();
      this.filesToUpload.forEach(file => formData.append('files', file, file.name));
      try {
        const response = await axios.post('http://localhost:8080/upload', formData);
        if (response.data.filePaths) this.imagePaths = response.data.filePaths;
      } catch (error) {
        console.error('Error al subir las imágenes:', error);
      }
    },

    async fetchBrands() {
      try {
        const response = await fetch('http://localhost:8080/brands');
        if (response.ok) this.brands = await response.json();
      } catch (error) {
        console.error('Error al recuperar las marcas:', error);
      }
    },

    async fetchModels() {
      if (!this.vehicle.brand) {
        this.models = [];
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/models/${this.vehicle.brand}`);
        if (response.ok) this.models = await response.json();
      } catch (error) {
        console.error('Error al recuperar los modelos:', error);
      }
    },

    async submitVehicle() {
      try {
        const user = this.$store.state.user;
        await this.saveImages();
        const vehicleData = {
          ...this.vehicle,
          image: this.imagePaths,
          user: {
            _id: user._id,
            name: user.nombre,
            lastName: user.apellido,
            email: user.mail,
            rut: user.rut,
          },
        };
        const response = await axios.post('http://localhost:8080/postsPrueba', vehicleData);
        console.log('Response from the server:', response.data);
      } catch (error) {
        console.error('Error al publicar el vehículo:', error);
      }
    },
  },
  watch: {
    'vehicle.brand': function (newBrand) {
      this.fetchModels();
    },
  },
  mounted() {
    this.fetchBrands();
  },
};
</script>


<style scoped>
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
