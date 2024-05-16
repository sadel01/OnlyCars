<template>
  <div class="container">
    <h1>Comparación de Vehículos</h1>
    <div class="product-container" v-if="comparisonList.length">
      <div class="product-list">
        <div v-for="(product, index) in comparisonList" :key="product._id" class="product-card">
          <h2 class="product-title">Vehiculo {{ index + 1 }}</h2>
          <div class="product-image">
            <img :src="product.image" alt="Imagen del producto" />
          </div>
          <div class="product-info">
            <section class="scores">
              <h3><strong>Puntuaciones</strong></h3>
              <div class="score-bar">
                <label for="confort-{{ product._id }}">Confort:</label>
                <progress
                  id="confort-{{ product._id }}"
                  :value="product.confortScore"
                  max="100"
                ></progress>
              </div>
              <div class="score-bar">
                <label for="offroad-{{ product._id }}">Off Road:</label>
                <progress
                  id="offroad-{{ product._id }}"
                  :value="product.offRoadScore"
                  max="100"
                ></progress>
              </div>
              <div class="score-bar">
                <label for="sport-{{ product._id }}">Sport:</label>
                <progress
                  id="sport-{{ product._id }}"
                  :value="product.sportScore"
                  max="100"
                ></progress>
              </div>
            </section>
            <section class="brand-model">
              <h3><strong>Marca y Modelo</strong></h3>
              <p><strong>Marca:</strong> {{ product.brand }}</p>
              <p><strong>Modelo:</strong> {{ product.model }}</p>
              <p><strong>Año:</strong> {{ product.year }} 
                <span v-if="newestCarIndices[0].includes(index)"><i class="fa-solid fa-arrow-up" style="color: #63E6BE;"></i></span>
                <span v-if="newestCarIndices[1].includes(index)"><i class="fa-solid fa-arrow-down" style="color: #e72a08;"></i></span>
              </p>
            </section>
            <section class="details">
              <h3><strong>Detalles</strong></h3>
              <p>
                <strong>Condición:</strong> {{ product.condition === 'used' ? 'Usado' : 'Nuevo' }}
              </p>
              <p><strong>Kilometraje:</strong> {{ product.mileage }} 
                <span v-if="lowestMileageIndices[1].includes(index)"><i class="fa-solid fa-arrow-down" style="color: #63E6BE;"></i></span>
                <span v-if="lowestMileageIndices[0].includes(index)"><i class="fa-solid fa-arrow-up" style="color: #e72a08;"></i></span>
              </p>
              <p><strong>Transmisión:</strong> {{ product.transmission }}</p>
              <p><strong>Combustible:</strong> {{ product.fuel }}</p>
              <p><strong>Cilindraje:</strong> {{ product.cylinderCapacity }} 
                <span v-if="maxCylinderCapacityIndices[0].includes(index)"><i class="fa-solid fa-arrow-up" style="color: #63E6BE;"></i></span>
                <span v-if="maxCylinderCapacityIndices[1].includes(index)"><i class="fa-solid fa-arrow-down" style="color: #e72a08;"></i></span>
              </p>
              <p><strong>Tracción:</strong> {{ product.driveTrain }}</p>
              <p><strong>Potencia:</strong> {{ product.power }} 
                <span v-if="maxPowerIndices[0].includes(index)"><i class="fa-solid fa-arrow-up" style="color: #63E6BE;"></i></span>
                <span v-if="maxPowerIndices[1].includes(index)"><i class="fa-solid fa-arrow-down" style="color: #e72a08;"></i></span>
              </p>
              <p><strong>Tipo de suspensión:</strong> {{ product.suspensionType }}</p>
              <p><strong>Tipo de neumáticos:</strong> {{ product.tireType }}</p>
            </section>
            <section class="pricing">
              <h3>Precio</h3>
              <p>${{ product.price }} 
                <span v-if="lowestPriceIndices[1].includes(index)"><i class="fa-solid fa-arrow-down" style="color: #63E6BE;"></i></span>
                <span v-if="lowestPriceIndices[0].includes(index)"><i class="fa-solid fa-arrow-up" style="color: #e72a08;"></i></span>
              </p>
            </section>
            <section class="comfort">
              <h3><strong>Tecnologías de confort </strong> 
                <span v-if="maxComfortTechIndices[0].includes(index)"><i class="fa-solid fa-arrow-up" style="color: #63E6BE;"></i></span>
                <span v-if="maxComfortTechIndices[1].includes(index)"><i class="fa-solid fa-arrow-down" style="color: #e72a08;"></i></span>
              </h3>
              <ul>
                <li v-for="(technology, index) in product.comfortFeatures" :key="index">{{ technology }}</li>
              </ul>
            </section>
            <section class="additional-info">
              <h3><strong>Información Adicional</strong></h3>
              <p><strong>Color Interior:</strong> {{ product.interiorColor }}</p>
              <p><strong>Color Exterior:</strong> {{ product.exteriorColor }}</p>
              <p><strong>Altura al suelo:</strong> {{ product.groundClearance }} cm</p>
              <p><strong>Puertas:</strong> {{ product.doors }}</p>
              <p><strong>Dueños:</strong> {{ product.owners }}</p>
              <p><strong>Seguridad:</strong> {{ product.airbag === 'yes' ? 'Con airbag' : 'Sin airbag' }}</p>
              
              <!-- Agregar mas cosas a futuro para mejor comparasao -->
            </section>
            <section class="insurances">
              <h3><strong>Seguros </strong> 
                <span v-if="maxInsuranceIndices[0].includes(index)"><i class="fa-solid fa-arrow-up" style="color: #63E6BE;"></i></span>
                <span v-if="maxInsuranceIndices[1].includes(index)"><i class="fa-solid fa-arrow-down" style="color: #e72a08;"></i></span>
              </h3>
              <ul>
                <li v-for="(seguro, index) in product.insuranceOptions" :key="index">{{ seguro }}</li>
              </ul>
            </section>
            <section class="ubication">
              <h3><strong>Ubicación</strong></h3>
              <p><strong>Región:</strong> {{ product.region }}</p>
              <p><strong>Ciudad:</strong> {{ product.provincia }}</p>
              <p><strong>Comuna:</strong> {{ product.comuna }}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
    <p v-else>No hay vehículos para comparar.</p>
  </div>
</template>

<script>
export default {
  computed: {
    comparisonList() {
      return this.$store.state.comparison.list.map((product) => {
        return {
          ...product,
          sportScore: this.calculateSportScore(product),
          offRoadScore: this.calculateOffRoadScore(product),
          confortScore: this.calculateConfortScore(product)
        }
      })
    },
    lowestMileageIndices() {
      let lowestMileage = Infinity;
      let highestMileage = 0;
      let mayor = [];
      let menor = [];
      this.comparisonList.forEach((product, i) => {
        let mileage = Number(product.mileage.replace('.', ''));
        if (mileage < lowestMileage) {
          lowestMileage = mileage;
          menor = [i];
        } else if (mileage === lowestMileage) {
          menor.push(i);
        }
      });
      this.comparisonList.forEach((product, i) => {
        let mileage = Number(product.mileage.replace('.', ''));
        if (menor.length === this.comparisonList.length) {
          return [mayor, menor];
        }
        else if (mileage > highestMileage) {
          highestMileage = mileage;
          mayor = [i];
        } else if (mileage === highestMileage) {
          mayor.push(i);
        }
      });
      return [mayor, menor];
    },
    newestCarIndices() {
      let newestYear = 0;
      let lowesYear = Infinity;
      let mayor = [];
      let menor = [];
      for (let i = 0; i < this.comparisonList.length; i++) {
        let product = this.comparisonList[i];
        let year = Number(product.year);
        if (year > newestYear) {
          newestYear = year;
          mayor = [i];
        } else if (year === newestYear) {
          mayor.push(i);
        }
      }
      for (let i = 0; i < this.comparisonList.length; i++) {
        let product = this.comparisonList[i];
        let year = Number(product.year);
        if(mayor.length === this.comparisonList.length){
          return [mayor, menor];
        }else if (year < lowesYear) {
          lowesYear = year;
          menor = [i];
        } else if (year === lowesYear) {
          menor.push(i);
        }
      }
      return [mayor, menor];
    },
    maxCylinderCapacityIndices() {
      let maxCapacity = 0;
      let minCapacity = Infinity;
      let mayor = [];
      let menor = [];
      this.comparisonList.forEach((product, i) => {
        let capacity = Number(product.cylinderCapacity.replace(' L', '').replace(' kW', ''));
        if (capacity > maxCapacity) {
          maxCapacity = capacity;
          mayor = [i];
        } else if (capacity === maxCapacity) {
          mayor.push(i);
        }
      });
      this.comparisonList.forEach((product, i) => {
        let capacity = Number(product.cylinderCapacity.replace(' L', '').replace(' kW', ''));
        if (mayor.length === this.comparisonList.length) {
          return [mayor, menor];
        }
        else if (capacity < minCapacity) {
          minCapacity = capacity;
          menor = [i];
        } else if (capacity === minCapacity) {
          menor.push(i);
        }
      });
      return [mayor, menor];
    },
    maxPowerIndices() {
      let maxPower = 0;
      let minPower = Infinity;
      let mayor = [];
      let menor = [];
      let power = 0;
      this.comparisonList.forEach((product, i) => {
        if(product.fuel === 'Eléctrico'){
          power = Number(product.power.replace(' kWh', ''))*0.7457;
        }else{
          power = Number(product.power.replace(' HP', ''));
        }
        if (power > maxPower) {
          maxPower = power;
          mayor = [i];
        } else if (power === maxPower) {
          mayor.push(i);
        }
      });
      this.comparisonList.forEach((product, i) => {
        if(product.fuel === 'Eléctrico'){
          power = Number(product.power.replace(' kWh', ''))*0.7457;
        }else{
          power = Number(product.power.replace(' HP', ''));
        }
        if(mayor.length === this.comparisonList.length){
          return [mayor, menor];
        }
        else if (power < minPower) {
          minPower = power;
          menor = [i];
        } else if (power === minPower) {
          menor.push(i);
        }
      });
      return [mayor, menor];
    },
    lowestPriceIndices() {
      let lowestPrice = Infinity;
      let highestPrice = 0;
      let mayor = [];
      let menor = [];
      this.comparisonList.forEach((product, i) => {
        let price = Number(product.price.replace('$', '').replace('.', ''));
        if (price < lowestPrice) {
          lowestPrice = price;
          menor = [i];
        } else if (price === lowestPrice) {
          menor.push(i);
        }
      });
      this.comparisonList.forEach((product, i) => {
        let price = Number(product.price.replace('$', '').replace('.', ''));
        if(menor.length === this.comparisonList.length){
          return [mayor, menor];
        }
        else if (price > highestPrice) {
          highestPrice = price;
          mayor = [i];
        } else if (price === highestPrice) {
          mayor.push(i);
        }
      });
      return [mayor, menor];
    },
    maxComfortTechIndices() {
      let maxTech = 0;
      let minTech = Infinity;
      let mayor = [];
      let menor = [];
      this.comparisonList.forEach((product, i) => {
        let techCount = product.comfortFeatures.length;
        if (techCount > maxTech) {
          maxTech = techCount;
          mayor = [i];
        } else if (techCount === maxTech) {
          mayor.push(i);
        }
      });
      this.comparisonList.forEach((product, i) => {
        let techCount = product.comfortFeatures.length;
        if(mayor.length === this.comparisonList.length){
          return [mayor, menor];
        }
        else if (techCount < minTech) {
          minTech = techCount;
          menor = [i];
        } else if (techCount === minTech) {
          menor.push(i);
        }
      });
      return [mayor, menor];
    },
    maxInsuranceIndices() {
      let maxInsurance = 0;
      let minInsurance = Infinity;
      let mayor = [];
      let menor = [];
      this.comparisonList.forEach((product, i) => {
        let insuranceCount = product.insuranceOptions.length;
        if (insuranceCount > maxInsurance) {
          maxInsurance = insuranceCount;
          mayor = [i];
        } else if (insuranceCount === maxInsurance) {
          mayor.push(i);
        }
      });
      this.comparisonList.forEach((product, i) => {
        let insuranceCount = product.insuranceOptions.length;
        if(mayor.length === this.comparisonList.length){
          return [mayor, menor];
        }
        else if (insuranceCount < minInsurance) {
          minInsurance = insuranceCount;
          menor = [i];
        } else if (insuranceCount === minInsurance) {
          menor.push(i);
        }
      });
      return [mayor, menor];
    }
  },
  created() {
    if (!this.comparisonList.length) {
      this.$router.push({ name: 'home' })
    }
  },
  methods: {
    calculateSportScore(product) {
      let score = 0

      if (product.fuel === 'Diésel' || product.fuel === 'Gasolina') { // CILINDRAJE EQUIVALE AL 10% DE LA PUNTUACIÓN
        score += parseFloat(product.cylinderCapacity.replace(' L', ''))
      }else{
        const cylinderScore = (parseFloat(product.cylinderCapacity.replace(' kW', '')) / 70) * 2
        score += cylinderScore
      }     

      const transmissionScore = product.transmission === 'Manual' ? 15 : 0 // TRANSMISION EQUIVALE AL 15% DE LA PUNTUACIÓN
      score += transmissionScore

      const power = parseInt(product.power.replace(' HP', ''))
      const normalizedPower = (power - 0) / (1000 - 0) // POTENCIA EQUIVALE AL 25% DE LA PUNTUACIÓN
      const powerScore = (normalizedPower / 4)*100 
      score += powerScore

      if(product.suspensionType === 'Deportiva'){ // SUSPENSIÓN EQUIVALE AL 20% DE LA PUNTUACIÓN
        score += 20
      }else if(product.suspensionType === 'Ajustable'){
        score += 10
      }

      const tireTypeScore = product.tireType === 'De Carretera' ? 15 : 0 // TIPO DE NEUMÁTICOS EQUIVALE AL 15% DE LA PUNTUACIÓN
      score += tireTypeScore
      
      if(product.groundClearance > 10 && product.groundClearance < 15){      
        score += 5// ALTURA AL SUELO EQUIVALE AL 5% DE LA PUNTUACIÓN
      }

      if(product.driveTrain === 'Tracción trasera'){ // TRACCIÓN EQUIVALE AL 10% DE LA PUNTUACIÓN
        score += 10
      }else if(product.driveTrain === 'Tracción total'){
        score += 5
      }

      score = Math.min(Math.max(score, 0), 100) //puntuación entre 0 y 100.      
      return score
    },
    calculateOffRoadScore(product) {
      let score = 0

      if (product.fuel === 'Diésel' || product.fuel === 'Gasolina') { // CILINDRAJE EQUIVALE AL 5% DE LA PUNTUACIÓN
        score += (parseFloat(product.cylinderCapacity.replace(' L', '')))/2
      }else{
        const cylinderScore = (parseFloat(product.cylinderCapacity.replace(' kW', '')) / 70)
        score += cylinderScore
      }     

      const transmissionScore = product.transmission === 'Manual' ? 5 : 0 // TRANSMISION EQUIVALE AL 5% DE LA PUNTUACIÓN
      score += transmissionScore

      const power = parseInt(product.power.replace(' HP', ''))
      const normalizedPower = (power - 0) / (1000 - 0) // POTENCIA EQUIVALE AL 10% DE LA PUNTUACIÓN
      const powerScore = (normalizedPower / 10)*100 
      score += powerScore

      if(product.suspensionType === 'Ajustable'){ // SUSPENSIÓN EQUIVALE AL 15% DE LA PUNTUACIÓN
        score += 15
      }else if(product.suspensionType === 'Estándar'){
        score += 7
      }

      const tireTypeScore = product.tireType === 'Todo Terreno' ? 25 : 0 // TIPO DE NEUMÁTICOS EQUIVALE AL 25% DE LA PUNTUACIÓN
      score += tireTypeScore
      
      if(product.groundClearance > 20 && product.groundClearance < 30){      
        score += 5// ALTURA AL SUELO EQUIVALE AL 5% DE LA PUNTUACIÓN
      }

      if(product.driveTrain === 'Tracción total'){// TRACCIÓN EQUIVALE AL 20% DE LA PUNTUACIÓN
        score += 20
      }

      score = Math.min(Math.max(score, 0), 100) //puntuación entre 0 y 100.      
      return score
    },

    calculateConfortScore(product) {
      let score = 0

      if (product.fuel === 'Diésel' || product.fuel === 'Gasolina') { // CILINDRAJE EQUIVALE AL 5% DE LA PUNTUACIÓN
        score += (parseFloat(product.cylinderCapacity.replace(' L', '')))/2
      }else{
        const cylinderScore = (parseFloat(product.cylinderCapacity.replace(' kW', '')) / 70)
        score += cylinderScore
      }     

      const transmissionScore = product.transmission === 'Automático' ? 10 : 0 // TRANSMISION EQUIVALE AL 10% DE LA PUNTUACIÓN
      score += transmissionScore

      const power = parseInt(product.power.replace(' HP', ''))
      const normalizedPower = (power - 0) / (1000 - 0) // POTENCIA EQUIVALE AL 5% DE LA PUNTUACIÓN
      const powerScore = (normalizedPower / 20)*100 
      score += powerScore

      if(product.suspensionType === 'Ajustable'){ // SUSPENSIÓN EQUIVALE AL 20% DE LA PUNTUACIÓN
        score += 20
      }else if(product.suspensionType === 'Estándar'){
        score += 10
      }

      const tireTypeScore = product.tireType === 'Mixtos' ? 10 : 0 // TIPO DE NEUMÁTICOS EQUIVALE AL 10% DE LA PUNTUACIÓN
      score += tireTypeScore
      
      if(product.groundClearance > 12 && product.groundClearance < 16){      
        score += 10// ALTURA AL SUELO EQUIVALE AL 10% DE LA PUNTUACIÓN
      }

      if(product.driveTrain === 'Tracción total'){// TRACCIÓN EQUIVALE AL 10% DE LA PUNTUACIÓN
        score += 10
      }

      for (let i = 0; i < product.comfortFeatures.length; i++) {
        score += 3
      }

      score = Math.min(Math.max(score, 0), 100) //puntuación entre 0 y 100.      
      return score
    }
  }
}
</script>

<style scoped>
.score-bar {
  display: grid;
  grid-template-columns: minmax(70px, auto) 1fr;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

progress {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
}

progress::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 5px;
}

progress::-webkit-progress-value {
  background-color: #fbc40e;
  border-radius: 5px;
}

progress::-moz-progress-bar {
  background-color: #fbc40e;
  border-radius: 5px;
}
.container {
  width: 100%;
  max-width: 1700px;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}

.product-container {
  display: flex;
  overflow-x: auto;
  padding: 20px 0;
  width: 100%;
  max-width: 100%;
  justify-content: center;
}

.product-list {
  display: flex;
  max-width: 1700px;
}

.product-card {
  flex: 0 0 auto;
  width: 300px;
  margin: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-container::-webkit-scrollbar {
  height: 8px;
}

.product-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.product-container::-webkit-scrollbar-track {
  background: #efefef;
}

.textBrandAndModel {
  color: #000;
  font-size: 18px;
  margin: 10px 0;
}

.product-info {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.insurances {
  height: 300px;
  overflow: auto;
}

.comfort{
  height: 430px;
  overflow: auto;
}

.product-info > section {
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-info h3 {
  margin-top: 0;
  color: #333;
  font-weight: bold;
}

.product-title {
  margin-bottom: 10px;
  text-align: center;
}

@media (max-width: 600px) {
  .product-card {
    width: 80%;
  }
}
</style>
