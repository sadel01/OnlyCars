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
              <p><strong>Kilometraje:</strong> {{ product.mileage }}</p>
              <p><strong>Transmisión:</strong> {{ product.transmission }}</p>
              <p><strong>Combustible:</strong> {{ product.fuel }}</p>
              <p><strong>Cilindraje:</strong> {{ product.cylinderCapacity }}</p>
            </section>
            <section class="pricing">
              <h3>Precio</h3>
              <p>${{ product.price }} CLP</p>
            </section>
            <section class="additional-info">
              <h3><strong>Información Adicional</strong></h3>
              <p><strong>Color Interior:</strong> {{ product.interiorColor }}</p>
              <p><strong>Color Exterior:</strong> {{ product.exteriorColor }}</p>
              <p><strong>Puertas:</strong> {{ product.doors }}</p>
              <p><strong>Seguro:</strong> {{ product.seguro }}</p>
              <!-- Agregar mas cosas a futuro para mejor comparasao -->
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
      const maxYearScore = 7 // Máximo puntaje para el año.
      const currentYear = new Date().getFullYear()
      const yearScore = ((product.year - 1990) / (currentYear - 1990)) * maxYearScore // Puntos por actualidad. mas antiguo mas puntos?
      score += yearScore

      if (product.fuel === 'Diésel' || product.fuel === 'Gasolina') {
        score += parseFloat(product.cylinderCapacity.replace(' L', ''))
      }else{
        const cylinderScore = (parseFloat(product.cylinderCapacity.replace(' kW', '')) / 100) * 2
        score += cylinderScore
      }     

      const transmissionScore = product.transmission === 'Manual' ? 10 : -5
      score += transmissionScore
      
      const seguroScore = product.insuranceOptions.length * 5
      for(let i = 0; i < product.insuranceOptions.length; i++){
        if(product.insuranceOptions[i] === 'Sin seguro'){
          seguroScore -= 5
        }
      }
      score += seguroScore

      const airbagScore = product.airbag === 'yes' ? 10 : 0
      score += airbagScore

      const conditionScore = product.condition === 'new' ? 10 : 0
      score += conditionScore

      if (product.owners > 5) {
        const ownerAgeScore = -10 // PUEDE CAMBIAR
        score += ownerAgeScore
      }else{
        const ownerAgeScore = product.owners * 2 // PUEDE CAMBIAR
        score += ownerAgeScore
      }

      const powerScore = product.power / 100 // PUEDE CAMBIAR
      score += powerScore

      const suspensionScore = product.suspensionType === 'sport' ? 10 : 0
      score += suspensionScore

      const tireTypeScore = product.tireType === 'road' ? 10 : 0
      score += tireTypeScore
      
      if(product.groundClearance < 10){
        const groundClearanceScore = product.groundClearance / 10 // PUEDE CAMBIAR
        
        score += groundClearanceScore
      }else{
        score += -(product.groundClearance) + 10
      }

      const driveTrainScore = product.driveTrain === 'Tracción trasera' ? 10 : -5
      score += driveTrainScore

      if(product.mileage<70000){
        score += 10
      }else{
        score-=5
      }

      score = Math.min(Math.max(score, 0), 100) //puntuación entre 0 y 100.      
      return score
    },

    calculateOffRoadScore(product) {
      let score = 0

      const driveTrainScore = product.driveTrain.toLowerCase().includes('total') ? 50 : 0 // Puntos si tiene traccion total.
      score += driveTrainScore

      const cylinderScore = parseFloat(product.cylinderCapacity.replace(' cm', '')) / 200 // Menos impacto de la cilindrada aquí. (copilot invento)
      score += cylinderScore

      score = Math.min(Math.max(score, 0), 100)
      return score
    },

    calculateConfortScore(product) {
      let score = 0
      const currentYear = new Date().getFullYear()
      score += (currentYear - product.year) * 1 // puntos por ser modelo mas reciente.
      score += product.doors >= 4 ? 20 : 0 // puntos adicionales si tiene 4 puertas o mas.
      score += product.airbag.toLowerCase() === 'yes' ? 20 : 0 // puntos por seguridad.
      score += product.seguro ? 15 : 0 // puntos adicionales por tener cualquier tipo de seguro.
      score += product.transmission.toLowerCase() === 'automatico' ? 15 : 0 // puntos por comodidad de caja de cambios.
      score = Math.min(score, 100)
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
  max-width: 1200px;
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
