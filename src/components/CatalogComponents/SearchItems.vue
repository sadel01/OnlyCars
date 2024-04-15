<template>
  <div class="searchContainer">
    <div class="searchItems">
      <input
        class="inputCarName"
        type="text"
        placeholder="Buscar.."
        v-model="searchTerm"
        @input="emitInput"
      />
    </div>
    <select v-model="brand" @change="inputBrand" class="selects">
      <option value="">Marca</option>
      <option value="KIA">KIA</option>
      <option value="TOYOTA">TOYOTA</option>
      <option value="MAZDA">MAZDA</option>
      <option value="BMW">BMW</option>
    </select>
    <select v-model="model" @change="inputItems" class="selects">
      <option disabled value="">Modelo</option>
    </select>
    <select v-model="year" @change="inputYear" class="selects">
      <option disabled value="">AÑO</option>
      <option v-for="yearOption in yearOptions" :key="yearOption" :value="yearOption">
        {{ yearOption }}
      </option>
    </select>
    <select v-model="fuel" @change="inputFuel" class="selects">
      <option disabled value="">COMBUSTIBLE</option>
      <option value="Gasolina">GASOLINA</option>
      <option value="Diesel">DIESEL</option>
      <option value="Eléctrico">ELÉRCTRICO</option>
    </select>
    <select v-model="transmision" @change="inputTransmision" class="selects">
      <option disabled value="">TRANSMISIÓN</option>
      <option value="Manual">MANUAL</option>
      <option value="Automático">AUTOMÁTICO</option>
    </select>
  </div>
</template>

// Componente para buscar productos por nombre y filtrar por marca, modelo, año, combustible y
transmisión. La idea despues es que // se obtengan las marcas y modelos desde la base de datos para
no agregar todas las marcas que existan, solo las que esten en la base de datos, si es que // se
puede

<script>
export default {
  data() {
    return {
      searchTerm: '',
      brand: '',
      model: '',
      year: '',
      fuel: '',
      transmision: '',
      yearOptions: []
    }
  },
  created() {
    const anioActual = new Date().getFullYear()
    for (let i = anioActual; i >= 1900; i--) {
      this.yearOptions.push(i.toString())
    }
  },

  methods: {
    emitInput() {
      this.$emit('inputItems', this.searchTerm)
    },
    inputBrand() {
      this.$emit('inputBrand', this.brand)
    },
    inputTransmision() {
      this.$emit('inputTransmision', this.transmision)
    },
    inputYear() {
      this.$emit('inputYear', this.year)
    },
    inputFuel() {
      this.$emit('inputFuel', this.fuel)
    }
  }
}
</script>

<style>
.searchContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchItems {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.inputCarName {
  width: 85%;
  height: 30px;
  border-radius: 10px;
  border: none;
  padding: 10px;
  font-size: 20px;
  outline: none;
}

.selects {
  width: 90%;
  height: 60px;
  border-radius: 10px;
  border: none;
  padding: 10px;
  font-size: 16px;
  outline: none;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
