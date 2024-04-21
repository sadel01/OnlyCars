<template>
  <div class="searchContainer">
    <FontAwesomeIcon :icon="faCar" class="icono-marca" />
    <div class="searchItems">
      <FontAwesomeIcon :icon="faPhone" class="iconos" />
      <input
        class="inputCarName"
        type="text"
        placeholder="Buscar.."
        v-model="searchTerm"
        @input="emitInput"
      />
    </div>
    <div class="grupo">
      <font-awesome-icon :icon="['fas', 'car']" class="icono-marca" />
      <select v-model="brand" @change="inputBrand" class="selects">
        <option value="">Marca</option>
        <option v-for="brand in brands">{{ brand }}</option>
      </select>
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="icono-chevron" />
    </div>

    <div class="grupo">
      <font-awesome-icon :icon="['fas', 'warehouse']" class="icono-marca" />
      <select v-model="model" @change="inputModel" class="selects">
        <option value="">Modelo</option>
        <option v-for="model in models" :key="model">{{ model }}</option>
      </select>
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="icono-chevron" />
    </div>

    <div class="grupo">
      <font-awesome-icon :icon="['fas', 'calendar-days']" class="icono-marca" />
      <select v-model="year" @change="inputYear" class="selects">
        <option value="">Año</option>
        <option v-for="yearOption in yearOptions" :key="yearOption" :value="yearOption">
          {{ yearOption }}
        </option>
      </select>
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="icono-chevron" />
    </div>

    <div class="grupo">
      <font-awesome-icon :icon="['fas', 'gas-pump']" class="icono-marca" />
      <select v-model="fuel" @change="inputFuel" class="selects">
        <option value="">Combustible</option>
        <option value="gas">Gasolina</option>
        <option value="diesel">Diesel</option>
        <option value="electric">Eléctrico</option>
      </select>
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="icono-chevron" />
    </div>

    <div class="grupo">
      <font-awesome-icon :icon="['fas', 'screwdriver-wrench']" class="icono-marca" />
      <select v-model="transmission" @change="inputTransmission" class="selects">
        <option value="">Transmisión</option>
        <option value="manual">Manual</option>
        <option value="automatic">Automático</option>
      </select>
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="icono-chevron" />
    </div>
    <div class="grupo">
      <font-awesome-icon :icon="['fas', 'location-dot']" class="icono-marca" />
      <select v-model="location" @change="inputLocation" class="selects">
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
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="icono-chevron" />
    </div>

    <div class="grupo">
      <div class="price-filter-container">
        <div class="price-label">Precio</div>
        <div class="price-inputs-container">
          <input
            type="text"
            class="price-input"
            placeholder="Min."
            v-model="minPrice"
            @input="formatPriceInput('minPrice')"
          />
          <div class="price-separator">a</div>
          <input
            type="text"
            class="price-input"
            placeholder="Max."
            v-model="maxPrice"
            @input="formatPriceInput('maxPrice')"
          />
        </div>
      </div>
    </div>

    <div class="grupo">
      <div class="km-filter-container">
        <div class="price-label">Kilometraje</div>
        <div class="price-inputs-container">
          <input type="text" class="price-input" placeholder="Km." v-model="mileage" />
          <button class="btnAplicar" @click="emitInput">Aplicar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      searchTerm: '',
      brands: [],
      models: [],
      brand: '',
      model: '',
      year: '',
      fuel: '',
      price: '',
      transmission: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      mileage: '',
      yearOptions: []
    }
  },
  created() {
    const anioActual = new Date().getFullYear()
    for (let i = anioActual; i >= 1900; i--) {
      this.yearOptions.push(i.toString())
    }
    this.getBrands()
  },

  methods: {
    emitInput() {
      this.$emit('inputKM', this.mileage)
    },
    inputBrand() {
      if (this.brand === '') {
        this.model = ''
        this.models = ''
      } else {
        this.getModels(this.brand)
      }
      this.$emit('inputBrand', this.brand)
    },
    inputModel() {
      this.$emit('inputModel', this.model)
    },
    inputTransmission() {
      this.$emit('inputTransmission', this.transmission)
    },
    inputYear() {
      this.$emit('inputYear', this.year)
    },
    inputFuel() {
      this.$emit('inputFuel', this.fuel)
    },
    inputLocation() {
      this.$emit('inputLocation', this.location)
    },
    inputKM() {
      this.$emit('inputKM', this.mileage)
    },
    updatePrice() {
      this.price = [this.formatPriceInput(this.minPrice), this.formatPriceInput(this.maxPrice)]
      this.$emit('inputPrice', this.price)
    },
    formatPriceInput(priceType) {
      let value = this[priceType].replace(/[\D]/g, '')
      value = parseInt(value, 10)
      if (isNaN(value)) {
        value = ''
      } else {
        value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Para colocar puntos chavales
      }
      this[priceType] = `$${value}` // añadir el signo de dolar
      this.$emit('priceChange', { minPrice: this.minPrice, maxPrice: this.maxPrice })
    },
    handlePriceChange(minPrice, maxPrice) {
      this.price = [minPrice, maxPrice]
    },
    async getBrands() {
      try {
        const response = await axios.get('http://localhost:8080/brands')
        this.brands = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async getModels(brand) {
      try {
        const response = await axios.get('http://localhost:8080/models/' + brand)
        this.models = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style>

.btnAplicar {
  background-color: #fbc40e;
  color: white;
  padding: 10px 0px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: calc(100% - 150px);
  box-sizing: border-box;
  margin: 0 10px;
}

.btnAplicar:hover {
  background-color: #c19400;
}

.price-separator {
  color: #fff;
}
.price-inputs-container {
  display: flex;
  justify-content: space-between;
}

.price-input,
.selects {
  box-sizing: border-box;
  width: calc(50% - 12px);
  padding: 10px;
  margin: 0;
  border: none;
}

.price-input {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: none;
}

.price-input:hover {
  background-color: #d1d1d1;
}

input:focus {
  outline: none;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.price-input:last-child {
  margin-right: 0;
}

.price-separator {
  display: inline-block;
  width: auto;
  margin: 0 5px;
  align-self: center;
}

.price-label {
  margin-bottom: 10px;
  color: #fff;
}

.icono-chevron {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #fff;
}

.searchContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
}

.searchItems {
  width: 90%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.inputCarName {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  font-size: 15px;
  border: none;
  border-radius: 4px 4px 2px 2px;
  background-color: white;
  outline: none;
  margin: 0;
}

.input {
  max-width: 190px;
  background-color: #f5f5f5;
  color: #242424;
  padding: 0.15rem 0.5rem;
  min-height: 40px;
  border-radius: 4px;
  outline: none;
  border: none;
  line-height: 1.15;
  box-shadow: 0px 10px 20px -18px;
}

input:focus {
  border-bottom: 4px solid #fbc40e;
  border-radius: 4px 4px 2px 2px;
}

.iconos {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #fbc40e;
  z-index: 10;
}

.grupo {
  width: 90%;
  position: relative;
  margin-bottom: 20px;
}

.selects {
  width: 100%;
  padding: 10px 10px 10px 40px;
  font-size: 15px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.grupo:hover .selects {
  color: #fbc40e;
  cursor: pointer;
}

.grupo:hover .icono-chevron {
  color: #fbc40e;
  cursor: pointer;
}

.selects option {
  background-color: #272727;
  color: white;
}

.icono-marca {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #fbc40e;
  z-index: 10;
}
</style>
