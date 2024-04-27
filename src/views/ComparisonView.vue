<template>
  <h1>Textos de prueba</h1>
  <div v-if="comparisonList.length">
    <div v-for="(product, index) in comparisonList" :key="index">
      <h2>Producto {{ index + 1 }}</h2>
      <p>ID: {{ product._id }}</p>
      <p>Nombre: {{ product.brand }}</p>
      <p>Modelo: {{ product.model }}</p>
      <p>Precio: {{ product.price }}</p>
      <p>Descripción: {{ product.description }}</p>
    </div>
  </div>
  <p v-else>No hay productos para comparar.</p>
</template>

<script>
export default {
  computed: {
    comparisonList() {
      return this.$store.state.comparison.list
    }
  },
  created() {
    if (!this.comparisonList.length) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style></style>
