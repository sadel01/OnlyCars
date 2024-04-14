<template>
  <main>
    <div class="productDetails" v-if="open">
      <p>Product Details</p>
      <button @click="closePanel">Close Panel</button>
    </div>
  </main>
</template>

// Componente para mostrar y cerrar el panel de detalles del vehiculo.

<script>
export default {
  props: ['open'],
  data() {
    return {}
  },
  methods: {
    closePanel() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.productDetails {
position: relative;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background-color: rgb(232, 232, 232);
  padding: 20px;
  box-shadow: 3px 4px 5px rgb(185, 185, 185);
  z-index: 1;
}
h1 {
  text-align: center;
  font-size: 2rem;
}
</style>
