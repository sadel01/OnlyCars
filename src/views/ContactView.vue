<template>
  <main>
    <h1 class="contactoTexto">Contacto</h1>
    <p class="textoSub"></p>
    <div class="colorBox">
      <div class="telefonoContainer">
        <img class="telefonoImg" src="@/assets/telefono.png" alt="Teléfono" />
        <p class="telefonoTexto">Teléfono</p>
        <p class="textoDatos"></p>
      </div>
      <div class="overlayBox">
        <div>
          <p class="contactanos">Contáctanos</p>
          <input type="text" v-model="datoNombre" placeholder="Nombre" @input="borrarMensaje" />
          <input type="text" v-model="datoEmail" placeholder="Email" @input="borrarMensaje" />
          <textarea
            class="input3"
            v-model="datoDescripcion"
            placeholder="Descripción"
            @input="borrarMensaje"
          ></textarea>
          <button @click="enviarFormulario" :disabled="!camposCompletos">Enviar</button>
          <p v-if="mensajeEnviado" class="mensajeExito">Mensaje enviado correctamente</p>
          <p v-if="mensajeNoEnviado" class="mensajeNoExito">Campos faltantes</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      datoNombre: '',
      datoEmail: '',
      datoDescripcion: '',
      mensajeEnviado: false,
      mensajeNoEnviado: false
    }
  },
  computed: {
    camposCompletos() {
      return this.datoNombre && this.datoEmail && this.datoDescripcion
    }
  },
  methods: {
    enviarFormulario() {
      console.log('Formulario enviado')
      this.mensajeEnviado = true
      this.mensajeNoEnviado = false
    },

    borrarMensaje() {
      this.mensajeEnviado = false
      this.mensajeNoEnviado = true
    }
  }
}
</script>

<style>
.contactoTexto {
  margin-left: 40px;
  margin-top: 60px;
  font-size: 50px;
  color: #144d53;
}

.textoSub {
  font-size: 15px;
  margin: 40px;
}

.colorBox {
  background: #307672;
  height: 600px;
  width: 100%;
  margin-top: 140px;
  margin-bottom: 140px;
}

.overlayBox {
  position: absolute;
  background-color: #1a3c40;
  height: 83%;
  width: 50%;
  top: 35%;
  left: 45%;
}

.telefonoImg {
  width: 40px;
  position: absolute;
  top: 54%;
  left: 5%;
  transform: translate(-50%, -50%);
}

.telefonoTexto {
  margin-left: 130px;
  padding-top: 45px;
  font-size: 50px;
}

.textoDatos {
  margin-left: 80px;
}

.contactanos {
  text-align: center;
  font-size: 50px;
}

.overlayBox div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.overlayBox div input {
  display: block;
  margin-bottom: 50px;
  width: 500px;
  font-size: 20px;
}

.input3 {
  display: block;
  margin-bottom: 50px;
  width: 500px;
  height: 280px;
  font-size: 20px;
  resize: none;
}
button {
  background-color: #307672;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 20px;
}

button:hover {
  background-color: #1d4e4a;
}

button:active {
  background-color: #1d4e4a;
}

button:focus {
  outline: none;
}
</style>
