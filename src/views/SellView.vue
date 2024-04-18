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
          <input type="number" id="year" v-model="vehicle.year" placeholder="Ingrese el año" />
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
      </div>

      <div class="details-column">
        <div class="form-group">
          <label for="fuel">Combustible</label>
          <select id="fuel" v-model="vehicle.fuel">
            <option value="gasoline">Gasolina</option>
            <option value="diesel">Diésel</option>
            <option value="electric">Eléctrico</option>
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
// comentario meme para mostrar mis horas de investigación en el git
import axios from 'axios';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => store.state.user);

export default {
  name: 'SellView',
  data() {
    return {
      user: {
        nombre: '',
        email: ''
      },
      vehicle: {
        brand: '',
        model: '',
        year: null,
        condition: '',
        mileage: '',
        fuel: '',
        transmission: '',
        driveTrain: '',
        cylinderCapacity: '',
        airbag: ''
      },
      brands: [],
      models: [],
      imagePreviews: []
    }
  },
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      const files = event.target.files
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith('image/')) {
          alert('Solo se pueden subir imágenes');
          return;
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    },
    removeImage() {
      this.imagePreviews.pop();
      let fileList = Array.from(this.$refs.fileInput.files);
      fileList.pop();
      this.$refs.fileInput.value = null;
      fileList.forEach(file => this.$refs.fileInput.files.push(file));
    },
    async saveImages() {
      const formData = new FormData()
      Array.from(this.$refs.fileInput.files).forEach((file, index) => {
        formData.append(`image${index}`, file)
      })
      const response = await fetch('/api/save-images', {
        method: 'POST',
        body: formData
      })
      if (!response.ok) {
        throw new Error('Failed to save images')
      }
    },
    async fetchBrands() {
      try {
        const response = await fetch('http://localhost:8080/brands')
        if (response.ok) {
          this.brands = await response.json()
        } else {
          throw new Error('No se pudo cargar la lista de marcas')
        }
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
        if (response.ok) {
          this.models = await response.json()
        } else {
          throw new Error('No se pudo cargar la lista de modelos')
        }
      } catch (error) {
        console.error('Error al recuperar los modelos:', error)
      }
    },
    async submitVehicle() {
      try {
        const user = this.$store.state.user;
        console.log(user);
        const response = await axios.post('http://localhost:8080/postsPrueba', {    // SE DEBE CAMBIAR postsPrueba POR posts
          nombre: user.nombre,
          apellido: user.apellido,
          mail: user.mail,         
          rut: user.rut,
          brand:this.vehicle.brand,
          model:this.vehicle.model,
          year:this.vehicle.year,
          condition:this.vehicle.condition,
          mileage:this.vehicle.mileage,
          fuel:this.vehicle.fuel,
          transmission:this.vehicle.transmission,
          driveTrain:this.vehicle.driveTrain,
          cylinderCapacity:this.vehicle.cylinderCapacity,
          airbag:this.vehicle.airbag
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  watch: {
    // cambio de marca buscara modelos que correspondan
    'vehicle.brand': function (newBrand) {
      this.fetchModels()
    }
  },
  mounted() {
    this.fetchBrands() // Lamada para cargar las marcas
  }
}
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
