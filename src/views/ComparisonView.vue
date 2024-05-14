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
            <section class="brand-model">
              <h3><strong>Marca y Modelo</strong></h3>
              <p><strong>Marca:</strong> {{ product.brand }}</p>
              <p><strong>Modelo:</strong> {{ product.model }}</p>
              <p><strong>Año:</strong> {{ product.year }}</p>
            </section>
            <section class="details">
              <h3><strong>Detalles</strong></h3>
              <p>
                <strong>Condición:</strong> {{ product.condition === 'used' ? 'Usado' : 'Nuevo' }}
              </p>
              <p><strong>Kilometraje:</strong> {{ product.mileage }}
                <span v-if="index === minMileageIndex">🡇</span>
              </p>
              <p><strong>Transmisión:</strong> {{ product.transmission }}</p>
              <p><strong>Combustible:</strong> {{ product.fuel }}</p>
              <p><strong>Cilindraje:</strong> {{ product.cylinderCapacity }}
                <span v-if="index === maxCylinderCapacityIndex">🡅</span>
              </p>
              <p><strong>Tracción:</strong> {{ product.driveTrain }}</p>
              <p>
                <strong>Potencia:</strong> {{product.power}} {{ product.fuel === 'Eléctrico' ? ' kW' : 'HP' }}
                <span v-if="index === maxPowerIndex">🡅</span>
              </p>
              <p><strong>Tipo de suspensión:</strong> {{ product.suspensionType }}</p>
              <p><strong>Tipo de neumáticos:</strong> {{ product.tireType }}</p>
            </section>
            <section class="pricing">
              <h3>Precio</h3>
              <p>${{ product.price }} CLP</p>
            </section>
            <section class="comfort">
              <h3><strong>Tecnologías de confort</strong></h3>
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
              <h3><strong>Seguros</strong></h3>
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
    maxPowerIndex() {
      let maxPower = 0;
      let index = -1;
      this.comparisonList.forEach((product, i) => {
        let power = Number(product.power);
        if (power > maxPower) {
          maxPower = power;
          index = i;
        }
      });
      return index;
    },
    minMileageIndex() {
      let minMileage = Infinity;
      let index = -1;
      this.comparisonList.forEach((product, i) => {
        let mileage = Number(product.mileage);
        if (mileage < minMileage) {
          minMileage = mileage;
          index = i;
        }
      });
      return index;
    },
    maxCylinderCapacityIndex() {
      let maxCapacity = 0;
      let index = -1;
      this.comparisonList.forEach((product, i) => {
        let capacity = Number(product.cylinderCapacity.split(' ')[0]);
        if (capacity > maxCapacity) {
          maxCapacity = capacity;
          index = i;
        }
      });
      return index;
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

      console.log(product.power)
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

      if (product.fuel === 'Diésel' || product.fuel === 'Gasolina') {
        score += parseFloat(product.cylinderCapacity.replace(' L', ''))
      }else{
        const cylinderScore = (parseFloat(product.cylinderCapacity.replace(' kW', '')) / 100) * 2
        score += cylinderScore
      }     

      const transmissionScore = product.transmission === 'Manual' ? 10 : -5
      score += transmissionScore

      const powerScore = product.power / 70 // PUEDE CAMBIAR
      score += powerScore

      const suspensionScore = product.suspensionType === 'Ajustable' ? 10 : -5
      score += suspensionScore

      const tireTypeScore = product.tireType === 'Todo Terreno' ? 10 : -5
      score += tireTypeScore
      
      if(product.groundClearance > 20){
        const groundClearanceScore = product.groundClearance / 5 // PUEDE CAMBIAR
        
        score += groundClearanceScore
      }else{
        score += product.groundClearance - 20
      }

      const driveTrainScore = product.driveTrain === 'Tracción total' ? 10 : -5
      score += driveTrainScore

      for (let i = 0; i < product.comfortFeatures.length; i++) {
        if (product.comfortFeatures[i] === 'Control de crucero' || product.comfortFeatures[i] === 'Sensores de estacionamiento' || product.comfortFeatures[i] === 'Cámara de visión trasera' || product.comfortFeatures[i] === 'Asistente de mantenimiento de carril') {
          score += 2
        }
      }

      score = Math.min(Math.max(score, 0), 100) //puntuación entre 0 y 100.      
      return score
    },

    calculateConfortScore(product) {
      let score = 0

      if (product.fuel === 'Diésel' || product.fuel === 'Gasolina') {
        score += parseFloat(product.cylinderCapacity.replace(' L', ''))
      }else{
        const cylinderScore = (parseFloat(product.cylinderCapacity.replace(' kW', '')) / 100) * 2
        score += cylinderScore
      }     

      const transmissionScore = product.transmission === 'Automatico' ? 10 : -5
      score += transmissionScore

      const airbagScore = product.airbag === 'yes' ? 10 : -5
      score += airbagScore

      const powerScore = product.power / 150 // PUEDE CAMBIAR
      score += powerScore

      const suspensionScore = product.suspensionType === 'Estándar' ? 10 : -5
      score += suspensionScore

      const tireTypeScore = product.tireType === 'Mixtos' ? 10 : -5
      score += tireTypeScore

      const driveTrainScore = product.driveTrain === 'Tracción total' ? 10 : -5
      score += driveTrainScore

      for (let i = 0; i < product.comfortFeatures.length; i++) {
        score += 2       
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
