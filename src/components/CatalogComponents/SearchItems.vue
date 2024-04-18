<script>
export default {
  data() {
    return {
      searchTerm: '',
      brand: '',
      model: '',
      year: '',
      fuel: '',
      transmission: '',
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
    inputTransmission() {
      this.$emit('inputTransmission', this.transmission)
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


<template>
  <div class="searchContainer">
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
      <svg class="marca" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License -
        https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path
          fill="#FBC40E"
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM199.4 312.6c31.2 31.2 81.9 31.2 113.1 0c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9c-50 50-131 50-181 0s-50-131 0-181s131-50 181 0c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0c-31.2-31.2-81.9-31.2-113.1 0s-31.2 81.9 0 113.1z"
        />
      </svg>
      <select v-model="brand" @change="inputBrand" class="selects">
        <option value="">Marca</option>
        <option value="Acura">Acura</option>
        <option value="Audi">Audi</option>
        <option value="BMW">BMW</option>
        <option value="Buik">Buik</option>
        <option value="Cadillac">Cadillac</option>
        <option value="Chevrolet">Chevrolet</option>
        <option value="Chrysler">Dodge</option>
        <option value="Ford">Ford</option>
      </select>
    </div>

    <div class="grupo">
      <svg class="modelo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License -
        https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path
          fill="#FBC40E"
          d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
        />
      </svg>
      <select v-model="model" @change="inputItems" class="selects">
        <option value="">Modelo</option>
      </select>
    </div>

    <div class="grupo">
      <svg class="anio" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License -
        https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path
          fill="#FBC40E"
          d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
        />
      </svg>
      <select v-model="year" @change="inputYear" class="selects">
        <option value="">Año</option>
        <option v-for="yearOption in yearOptions" :key="yearOption" :value="yearOption">
          {{ yearOption }}
        </option>
      </select>
    </div>

    <div class="grupo">
      <svg class="combustible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License -
        https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path
          fill="#FBC40E"
          d="M32 64C32 28.7 60.7 0 96 0H256c35.3 0 64 28.7 64 64V256h8c48.6 0 88 39.4 88 88v32c0 13.3 10.7 24 24 24s24-10.7 24-24V222c-27.6-7.1-48-32.2-48-62V96L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3V168v24 32V376c0 39.8-32.2 72-72 72s-72-32.2-72-72V344c0-22.1-17.9-40-40-40h-8V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64zM96 80v96c0 8.8 7.2 16 16 16H240c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16z"
        />
      </svg>
      <select v-model="fuel" @change="inputFuel" class="selects">
        <option value="">Combustible</option>
        <option value="gas">Gasolina</option>
        <option value="diesel">Diesel</option>
        <option value="electric">Eléctrico</option>
      </select>
    </div>

    <div class="grupo">
      <svg class="transmision" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License -
        https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path
          fill="#FBC40E"
          d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
        />
      </svg>
      <select v-model="transmission" @change="inputTransmission" class="selects">
        <option value="">Transmisión</option>
        <option value="manual">Manual</option>
        <option value="automatic">Automático</option>
      </select>
    </div>
  </div>
</template>

// Componente para buscar productos por nombre y filtrar por marca, modelo, año, combustible y
transmisión. La idea despues es que // se obtengan las marcas y modelos desde la base de datos para
no agregar todas las marcas que existan, solo las que esten en la base de datos, si es que // se
puede

<style>
.searchContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
}

.grupo {
  width: 80%; 
  max-width: 600px; 
  display: flex;
  justify-content: space-between;
  align-items: flex-start; 
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #1a1a1a;
}

.searchItems {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}


.inputCarName {
  width: 85%;
  height: 20px;
  padding: 10px;
  border: 1px solid rgba(97, 97, 97, 0.993);
  border-radius: 10px;
  font-size: 15px;
  color: #5e5e5e;
  outline: none;
}

.inputCarName:focus {
  border-color: #FBC40E;
  box-shadow: 0 0 0 0.2rem #ffdd6f;
}

.selects {
  width: 80%;
  height: 35px;
  border-radius: 10px;
  border: none;
  padding: 0 20px;
  font-size: 15px;
  outline: none;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  cursor: pointer;
  color: #303030;
  transition: background-color 0.3s;
}
.selects option {
  background-color: white;
  appearance: none;
  color: black;
}
.selects option:hover {
  font-size: 15px;
  color: white;
  font-weight: bold;
}
.selects:hover {
  font-size: 15px;
  color: black;
  border: 3px solid #FBC40E;
  box-sizing: border-box;
}
.modelo {
  width: 17%;
  margin-top: 21px;
}
.marca {
  width: 15%;
  margin-top: 20px;
}
.anio {
  width: 14%;
  margin-top: 19px;
}
.transmision {
  width: 15%;
  margin-top: 20px;
}
.combustible {
  width: 15%;
  margin-top: 20px;
}
</style>
