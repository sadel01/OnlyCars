<script>
import { computed } from 'vue'
import axios from 'axios'

export default {
  data() {
    return {
      searchTerm: '',
      brands: [],
      models: [],
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
    this.getBrands()
  },

  methods: {
    emitInput() {
      this.$emit('inputItems', this.searchTerm)
    },
    inputBrand() {
      this.getModels(this.brand)
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
      <svg class="icon-search" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="" stroke="0.5"><g id="SVGRepo_bgCarrier" stroke-width="0.5"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M49.368 11.228c-11.646-.171-27.826.079-31.156 9.027l-8.184 19.204a2.85 2.85 0 0 0-1.37-.865l-3.296-.927a2.86 2.86 0 0 0-3.534 1.983l-1.72 6.104a2.86 2.86 0 0 0 1.983 3.535l3.297.927c.11.03.22.04.33.059c-.63 1.569-1.023 3.295-1.023 4.322v22.32c0 1.145.48 1.674 1.243 1.922v5.947a4.008 4.008 0 0 0 4.017 4.017H20.73a4.008 4.008 0 0 0 4.017-4.017v-5.729h50.504v5.729a4.01 4.01 0 0 0 4.018 4.017h10.775a4.01 4.01 0 0 0 4.019-4.017v-5.947c.763-.248 1.24-.777 1.24-1.922v-22.32c0-1.027-.393-2.753-1.022-4.322c.11-.018.22-.028.33-.06l3.297-.926a2.86 2.86 0 0 0 1.982-3.535l-1.717-6.104a2.861 2.861 0 0 0-3.536-1.983l-3.295.927a2.855 2.855 0 0 0-1.37.865l-8.185-19.204c-3.57-9.084-20.773-8.856-32.42-9.027zm33.358 29.444c.194.576-.386.96-.993.995c0 0-1.984.168-4.72.389c-2.082-4.864-6.92-8.292-12.525-8.292c-6.151 0-11.373 4.13-13.048 9.754c-.464.006-1.003.026-1.435.026c-10.596 0-31.738-1.877-31.738-1.877c-.607-.036-1.187-.419-.993-.995c8.142-24.821 8.385-22.955 32.275-22.694c23.891.26 24.03-1.513 33.177 22.694zm-18.238-2.217a8.886 8.886 0 0 1 7.447 3.991c-4.785.356-10.292.719-15.424.93a8.879 8.879 0 0 1 7.977-4.921zM9.407 46.511c.072.106.142.213.221.317h-.31zm5.294 6.234c2.096-.035 13.348 3.753 13.348 3.753c1.405.395 2.642 3.051 2.635 4.511c-.021 4.917-12.71 3.21-17.86 3.23a2.63 2.63 0 0 1-2.635-2.634V55.38c0-1.46 2.416-2.6 4.512-2.635zm70.598 0c2.096.034 4.512 1.175 4.512 2.635v6.225a2.63 2.63 0 0 1-2.635 2.635c-5.15-.02-17.839 1.686-17.86-3.23c-.007-1.46 1.23-4.117 2.635-4.512c0 0 11.252-3.788 13.348-3.753z" fill="#FBC40E"></path></g></svg>
      
      <select v-model="brand" @change="inputBrand" class="selects">
        <option value="">Marca</option>
        <option v-for="brand in brands" :key="brand">{{ brand }}</option>
      </select>
    </div>

    <div class="grupo">
      <svg class= "icon-search" fill="#FBC40E" viewBox="0 0 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M61.44,21.74c10.96,0,20.89,4.44,28.07,11.63c7.18,7.18,11.63,17.11,11.63,28.07c0,10.96-4.44,20.89-11.63,28.07 c-7.18,7.18-17.11,11.63-28.07,11.63c-10.96,0-20.89-4.44-28.07-11.63c-7.18-7.18-11.63-17.11-11.63-28.07 c0-10.96,4.44-20.89,11.63-28.07C40.55,26.19,50.48,21.74,61.44,21.74L61.44,21.74z M61.44,0c16.97,0,32.33,6.88,43.44,18 c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44c-11.12,11.12-26.48,18-43.44,18c-16.97,0-32.33-6.88-43.44-18 C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18C29.11,6.88,44.47,0,61.44,0L61.44,0z M93.47,29.41 c-8.2-8.2-19.52-13.27-32.03-13.27c-12.51,0-23.83,5.07-32.03,13.27c-8.2,8.2-13.27,19.52-13.27,32.03 c0,12.51,5.07,23.83,13.27,32.03c8.2,8.2,19.52,13.27,32.03,13.27c12.51,0,23.83-5.07,32.03-13.27c8.2-8.2,13.27-19.52,13.27-32.03 C106.74,48.93,101.67,37.61,93.47,29.41L93.47,29.41z M65.45,56.77c-1.02-1.02-2.43-1.65-4.01-1.65c-1.57,0-2.99,0.63-4.01,1.65 l-0.01,0.01c-1.02,1.02-1.65,2.43-1.65,4.01c0,1.57,0.63,2.99,1.65,4.01l0.01,0.01c1.02,1.02,2.43,1.65,4.01,1.65 c1.57,0,2.99-0.63,4.01-1.65l0.01-0.01c1.02-1.02,1.65-2.44,1.65-4.01C67.1,59.21,66.47,57.8,65.45,56.77L65.45,56.77L65.45,56.77z M65.06,50.79c1.47,0.54,2.8,1.39,3.89,2.48l0,0l0,0c0.37,0.37,0.72,0.77,1.03,1.2l0.1-0.03l21.02-5.63 c-1.63-3.83-3.98-7.28-6.88-10.17c-5.03-5.03-11.72-8.41-19.17-9.24v21.12C65.07,50.61,65.07,50.7,65.06,50.79L65.06,50.79z M72.04,61.63c-0.14,1.73-0.69,3.35-1.57,4.76c0.05,0.06,0.09,0.13,0.13,0.2l12.07,19.13c0.54-0.47,1.06-0.96,1.57-1.47 c5.83-5.83,9.44-13.9,9.44-22.8c0-1.87-0.16-3.7-0.47-5.49L72.04,61.63L72.04,61.63z M64.57,70.95c-0.99,0.31-2.04,0.47-3.13,0.47 c-0.98,0-1.93-0.13-2.84-0.38L46.82,90.19c4.39,2.24,9.36,3.5,14.62,3.5c5.46,0,10.6-1.36,15.11-3.75L64.57,70.95L64.57,70.95z M52.57,66.64c-0.92-1.38-1.52-2.99-1.7-4.71l-0.01,0l-21.09-6.6c-0.38,1.98-0.58,4.02-0.58,6.11c0,8.9,3.61,16.97,9.44,22.8 c0.63,0.63,1.29,1.24,1.98,1.82l11.8-19.19C52.47,66.8,52.52,66.72,52.57,66.64L52.57,66.64z M52.72,54.72 c0.36-0.51,0.76-1,1.21-1.44l0,0l0,0c1.05-1.04,2.31-1.87,3.71-2.41c-0.01-0.11-0.02-0.23-0.02-0.34v-21.1 c-7.38,0.87-14,4.23-18.98,9.22c-2.75,2.75-5.01,6-6.63,9.6L52.72,54.72L52.72,54.72z"></path> </g> </g></svg><select v-model="model" @change="inputModel" class="selects">
        <option value="">Modelo</option>
        <option v-for="model in models" :key="model">{{ model }}</option>
      </select>
    </div>

    <div class="grupo">
      <svg class="icon-search" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#FBC40E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <select v-model="year" @change="inputYear" class="selects">
        <option value="">Año</option>
        <option v-for="yearOption in yearOptions" :key="yearOption" :value="yearOption">
          {{ yearOption }}
        </option>
      </select>
    </div>

    <div class="grupo">
      <svg class="icon-search"  xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 14 14" id="svg2" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <metadata id="metadata8"> <rdf:rdf> <cc:work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title></dc:title> </cc:work> </rdf:rdf> </metadata> <defs id="defs6"></defs> <rect width="14" height="14" x="0" y="0" id="canvas" style="fill:none;stroke:none;visibility:hidden"></rect> <path d="m 10.78125,0 -0.625,0.71875 1.1875,1.09375 c 0.03621,0.036212 0.0856,0.084693 0.125,0.125 l -0.25,0.28125 C 10.818532,2.6189681 11.105689,3.1369332 11.25,3.28125 L 12,4.03125 12,10 c 0,1 -0.392136,1 -0.5,1 C 11.392136,11 11,11 11,10 L 11,6 C 11,4.7190916 10,4 9,4 L 9,2 C 9,1.4486964 8.575273,1 8,1 L 2,1 C 1.400757,1 1,1.4247267 1,2 l 0,12 8,0 0,-9 c 0,0 1,0 1,1 l 0,4 c 0,2 1.239698,2 1.5,2 0.275652,0 1.5,0 1.5,-2 L 13,3 C 13,2 12.713983,1.7907839 12.375,1.46875 L 10.78125,0 z M 2,3 8,3 8,6 2,6 2,3 z" id="fuel" style="fill:#FBC40E;fill-opacity:1;stroke:none"></path> </g></svg><select v-model="fuel" @change="inputFuel" class="selects">
        <option value="">Combustible</option>
        <option value="gas">Gasolina</option>
        <option value="diesel">Diesel</option>
        <option value="electric">Eléctrico</option>
      </select>
    </div>

    <div class="grupo">
      <svg fill="#FBC40E" class="icon-search" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 254.533 254.533" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M127.267,0C57.092,0,0,57.091,0,127.266s57.092,127.267,127.267,127.267s127.267-57.092,127.267-127.267 S197.441,0,127.267,0z M127.269,226.336c-54.627,0-99.069-44.442-99.069-99.07s44.442-99.071,99.069-99.071 c54.628,0,99.071,44.443,99.071,99.071S181.896,226.336,127.269,226.336z"></path> <path d="M187.144,81.838c-4.4,0-7.968,3.567-7.968,7.968v30.145h-23.982V89.806c0-4.4-3.567-7.968-7.968-7.968 s-7.968,3.567-7.968,7.968v30.145h-23.984V89.806c0-4.4-3.567-7.968-7.968-7.968c-4.4,0-7.968,3.567-7.968,7.968v30.145H75.354 V89.806c0-4.4-3.567-7.968-7.968-7.968c-4.4,0-7.968,3.567-7.968,7.968v34.832c0,7.729,4.791,11.248,9.243,11.248h30.677v28.842 c0,4.4,3.567,7.968,7.968,7.968c4.4,0,7.968-3.567,7.968-7.968v-28.842h23.984v28.842c0,4.4,3.567,7.968,7.968,7.968 s7.968-3.567,7.968-7.968v-28.842h23.982v28.842c0,4.4,3.567,7.968,7.968,7.968c4.4,0,7.968-3.567,7.968-7.968V89.806 C195.112,85.406,191.545,81.838,187.144,81.838z"></path> </g> </g></svg>
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
.icon-search {
  width: 11%;
  margin-top: 11.3%;
  margin-left: 1%;
}

</style>
