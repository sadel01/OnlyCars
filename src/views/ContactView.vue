<template>
  <main class="principal">
    <div class="transparent-box">
      <div class="datos">
        <div class="container1">
          <font-awesome-icon :icon="['fas', 'phone']" class="iconosContacto" />
          <p class="textoDatos">Teléfono</p>
        </div>
        <p class="textoDatos2">+56 9 7358 8879</p>
        <div class="container1">
          <font-awesome-icon :icon="['fas', 'location-dot']" class="iconosContacto" />
          <p class="textoDatos">Ubicación</p>
        </div>
        <p class="textoDatos2">Universidad de Talca.</p>
        <div class="container1">
          <font-awesome-icon :icon="['fas', 'clock']" class="iconosContacto" />
          <p class="textoDatos">Horario</p>
        </div>
        <p class="textoDatos2">No disponible.</p>
      </div>
      <div class="linea"></div>
      <div class="enviarCorreo">
        <p class="textoContactanos">Contáctanos</p>
        <form class="form" type="contacto">
          <div class="groupC">
            <input  v-model="name" type="text" required="" placeholder="Nombre"/>
          </div>
          <div class="groupC">
            <input placeholder="Correo Electrónico" v-model="email" type="email" id="email" name="email" required="" />
          </div>
          <div class="groupC">
            <textarea placeholder="Mensaje" v-model="message"  name="comment" rows="5" required=""></textarea>
          </div>
          <div class="botonEnviar">
            <button type="botonsubmit" @click="enviarFormulario"><span>ENVIAR</span></button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPhone, faDotCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

export default {
  name: 'ContactView',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      enviado: false,
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    enviarFormulario() {
      if (this.nombre === '' || this.email === '' || this.message === '') {
        this.errorMessage()
        return
      }
      this.successMessage()
      this.resetForm()
    },

    successMessage() {
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado con éxito',
        showConfirmButton: false,
        timer: 1500
      })
    },

    errorMessage() {
      Swal.fire({
        icon: 'error',
        title: 'Error, complete todos los campos.',
        showConfirmButton: false,
        timer: 1500
      })
    },

    resetForm() {
      this.name = ''
      this.email = ''
      this.message = ''
    }
  }
}
</script>

<style scoped>

.form[type='contacto'] {
  bottom: 20%;
  display: flex;
  flex-direction: column;
}

.groupC {
  bottom: 5%;
  position: relative;
}

.form[type='contacto'] .groupC label {
  color: #fbc40e;
  position: absolute;
  top: -3%;
  left: 10px;
  transition: all 0.3s ease;
}

.form[type='contacto'] .groupC input,
.form[type='contacto'] .groupC textarea {
  color: white;
  padding: 2%;
  border-radius: 5px;
  border: 1px solid #b8b8b8;
  margin-bottom: 10%;
  outline: 0;
  width: 100%;
  height: 50%;
  bottom: 10%;
  background-color: transparent;
  font-size: 16px;
}



.form[type='contacto'] .groupC input:focus,
.form[type='contacto'] .groupC textarea:focus {
  border-color: #fbc40e;
}

.form[type='contacto'] .groupC input:focus + label,
.form .groupC textarea:focus + label {
  top: -2%;
  left: 10px;
  background-color: transparent;
  color: #fbc40e;
  font-weight: 600;
  font-size: 14px;
}

.form[type='contacto'] .groupC textarea {
  resize: none;
  height: 120px;
}

.principal {
  background-image: url('@/assets/contactus.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.iconosContacto {
  font-size: 30px;
}

.textoDatos {
  font-size: 40px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  margin-top: 5px;
}

.textoDatos2 {
  margin: 0;
  font-size: 24px;
  color: white;
}

.container1 {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 3%;
}

.in {
  width: 100%;
  color: rgb(36, 35, 42);
  font-size: 16px;
  line-height: 20px;
  min-height: 28px;
  border-radius: 4px;
  border: 2px solid transparent;
  box-shadow:
    rgb(0 0 0 / 12%) 0px 1px 3px,
    rgb(0 0 0 / 24%) 0px 1px 2px;
  background: #d1ccbd;
  transition: all 0.1s ease 0s;
}

.enviarCorreo input::placeholder,
.enviarCorreo textarea::placeholder {
  color: hsla(0, 0%, 100%, 0.614); /* Cambia el color del texto del marcador de posición a amarillo */
}

.datos {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 110px;
  margin-bottom: 50px;
  text-align: left;
}

.transparent-box {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 80%;
  max-width: 1300px;
  height: 80%;
  max-height: 700px;
  border-radius: 16px;
  backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #fbc40e;
}

.linea {
  position: absolute;
  top: 10%;
  bottom: 10%;
  left: 50%;
  width: 1px;
  background-color: #fbc40e;
  margin-left: 40px;
}

.enviarCorreo {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 20px;
  margin-right: 110px;
  margin-bottom: 50px;
  width: 35%;
  height: 100%;
}

.enviarCorreo textarea {
  width: 100%;
  color: rgb(36, 35, 42);
  font-size: 16px;
  line-height: 20px;
  min-height: 28px;
  border-radius: 4px;
  border: 2px solid transparent;
  box-shadow:
    rgb(0 0 0 / 12%) 0px 1px 3px,
    rgb(0 0 0 / 24%) 0px 1px 2px;
  background: #d1ccbd;
  transition: all 0.1s ease 0s;
  font-family: "Poppins", sans-serif;;
  resize: none;
}

.textoContactanos {
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  max-width: px;
}

button[type='botonsubmit'] {
  margin-top: 5%;
  bottom: 10%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #fbc40e;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  width: 105%;
  height: 8%;
}
button[type='botonsubmit']:after {
  content: ' ';
  width: 0%;
  height: 100%;
  background: #c19400;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

button[type='botonsubmit']:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

button[type='botonsubmit'] span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  color: black;
  font-size: 1.125em;
  font-weight: 700;
  letter-spacing: 0.3em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}
button[type='botonsubmit']:hover span {
  color: white;
  animation: scaleUp 0.3s ease-in-out;
}
.mensajeExito {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  transform: translateX(-50%);
}

@media (max-width: 600px) {
  .transparent-box {
    width: 90%;
    height: 90%;
  }

  .enviarCorreo {
    width: 100%;
  }

  .enviarCorreo input,
  .enviarCorreo textarea {
    width: 100%;
  }
}
.botonEnviar {
  bottom: 5%;
  margin-top: -50px;
  margin-left: 20px;
  position: center;
}
.botonEnviar button {
  width: 100%;
  color: white;
  background-color: #fbc40e;
  border: none;
  border-radius: 5px;
  padding: 25px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
