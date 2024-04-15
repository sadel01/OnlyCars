<template>
  <div class="searchContainer">
    <div class="searchItems">
      <input
        class="inputCarName"
        type="text"
        placeholder="Buscar..."
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
    <select v-model="year" @change="inputItems" class="selects">
      <option disabled value="">Año</option>
    </select>
    <select v-model="fuel" @change="inputItems" class="selects">
      <option disabled value="">Combustible</option>
    </select>
    <select v-model="transmision" @change="inputItems" class="selects">
      <option disabled value="">Transmisión</option>
    </select>
  </div>
</template>

// Componente para buscar productos por nombre y filtrar por marca, modelo, año, combustible y transmisión. La idea despues es que
// se obtengan las marcas y modelos desde la base de datos para no agregar todas las marcas que existan, solo las que esten en la base de datos, si es que
// se puede

<script>
export default {
  data() {
    return {
      searchTerm: '',
      brand: '',
      model: '',
      year: '',
      fuel: '',
      transmision: ''
    }
  },
  methods: {
    emitInput() {
      this.$emit('inputItems', this.searchTerm)
    },
    inputBrand() {
      this.$emit('inputBrand', this.brand)
    }
  }
}
</script>

<style>
.searchContainer {
  width: 90%;
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
  height: 20px;
  border-radius: 10px;
  border: none;
  padding: 10px;
  font-size: 20px;
  outline: none;
  font-size: 16px;
}

.selects {
  width: 90%;
  height: 50px;
  border-radius: 10px;
  border: none;
  padding: 10px;
  font-size: 16px;
  outline: none;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
