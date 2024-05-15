<template>
  <div v-if="user" class="profile-container">
    <div class="profile-image"></div>

    <div v-show="!editing">
      <h1>Perfil de Usuario</h1>
      <p><span class="label">Nombre:</span> {{ user.nombre }}</p>
      <p><span class="label">Apellido:</span> {{ user.apellido }}</p>
      <p><span class="label">Email:</span> {{ user.mail }}</p>
      <p><span class="label">RUT:</span> {{ user.rut }}</p>
      <p><span class="label">Verificado:</span> {{ verificacion }}</p>
      <div class="button-group">
        <button class="editButton" @click="editProfile">Editar Perfil</button>
        <button class="logoutButton" @click="logout">Cerrar Sesión</button>
      </div>
    </div>

    <div v-show="editing" class="edit-form">
      <h2>Editar Perfil</h2>
      <form @submit.prevent="saveProfile">
        <label for="nombre">Nombre:</label>
        <input id="nombre" v-model="editableUser.nombre" placeholder="Nombre" />

        <label for="apellido">Apellido:</label>
        <input id="apellido" v-model="editableUser.apellido" placeholder="Apellido" />

        <label for="email">Email:</label>
        <input id="email" v-model="editableUser.mail" type="email" placeholder="Email" />

        <label for="rut">RUT:</label>
        <input id="rut" v-model="editableUser.rut" placeholder="RUT" />

        <div class="form-buttons">
          <button type="submit" class="saveButton">Guardar</button>
          <button type="button" class="cancelButton" @click="cancelEdit">Cancelar</button>
        </div>
      </form>
    </div>
  </div>

  <div class="schedule-container">
    <h1 class="day-title">Define tus horarios de atención</h1>
    <div class="schedule">
      <div class="day-container" v-for="(day, index) in days" :key="index">
        <h2 class="day-title">{{ day }}</h2>
        <div v-for="(time, timeIndex) in schedule[day]" :key="timeIndex" class="time-slot">
          <div class="labelStart">
            <label for="start">Inicio:</label>
            <flat-pickr v-model="time.start" :config="config"></flat-pickr>
          </div>
          <div class="labelEnd">
            <label for="end">Fin:</label>
            <flat-pickr v-model="time.end" :config="config"></flat-pickr>
          </div>
          <div class="deleteContainer">
            <div class="buttonDelete" @click="deleteSchedule(day, timeIndex)">
              <div class="button-wrapper">
                <div class="text">Borrar</div>
                <span class="icon-delete">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M10 11V17"
                        stroke="#ffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M14 11V17"
                        stroke="#ffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M4 7H20"
                        stroke="#ffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                        stroke="#ffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                        stroke="#ffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="addContainer">
          <button class="addTimeBtn" @click="addTime(day)">Añadir horario</button>
        </div>
      </div>
    </div>
    <div class="buttonSave-container">
      <button class="save" @click="saveSchedule()"><span>Guardar horario</span></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'Profile',
  data() {
    return {
      editing: false,
      editableUser: {},
      config: {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true
      },
      days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      schedule: {
        Lunes: [{ start: '', end: '' }],
        Martes: [{ start: '', end: '' }],
        Miércoles: [{ start: '', end: '' }],
        Jueves: [{ start: '', end: '' }],
        Viernes: [{ start: '', end: '' }],
        Sábado: [{ start: '', end: '' }],
        Domingo: [{ start: '', end: '' }]
      }
    }
  },
  components: {
    flatPickr
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    editProfile() {
      this.editableUser = { ...this.user }
      this.editing = true
    },
    cancelEdit() {
      this.editing = false
    },
    logout() {
      this.$store.commit('setUser', null)
      this.$router.push('/login')
    },
    addTime(day) {
      if (this.schedule[day].every((time) => time.start && time.end)) {
        this.schedule[day].push({ start: '', end: '' })
      }
    },
    deleteSchedule(day, timeIndex) {
      this.schedule[day].splice(timeIndex, 1)
    },
    saveSchedule() {
      const userId = this.user._id
      console.log('id: ',userId)
      console.log('horarios: ', this.schedule)
      if (Object.values(this.schedule).some((day) => day.some((time) => time.start && time.end))) {
        axios
          .post(`http://localhost:8080/profile/users/${userId}`, { schedules: this.schedule }) 
          .then(() => {
        console.log('Horarios guardados exitosamente')
          })
          .catch((error) => {
        console.error('Error al guardar horarios:', error)
          })
      } else {
        console.log('No se han definido horarios')
      }
    }
  },
  created() {
    this.verificacion = 'No'
    if (this.user.tipo === 'verificado') {
      this.verificacion = 'Si'
    }
  }
}
</script>

<style scoped>
.addContainer {
  justify-content: center;
  align-items: center;
  display: flex;
}
.addTimeBtn {
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  font-size: 15px;
  border-radius: 0.3em;
  border: 3px solid #fbc40e;
  background: #ececec;
  color: #090909;
  width: 100%;
  height: 2.5rem;
  font-weight: bold;
  margin: 1rem auto 1rem; /* Centrado horizontal y ajuste de margen superior e inferior */
}

.addTimeBtn:active {
  color: #666;
  box-shadow:
    inset 4px 4px 12px #c5c5c5,
    inset -4px -4px 12px #ffffff;
}

.addTimeBtn:before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.addTimeBtn:after {
  content: '';
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #fbc40e;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.addTimeBtn:hover {
  color: #ffffff;
  border-color: #fbc40e;
}

.addTimeBtn:hover:before {
  top: -35%;
  background-color: #fbc40e;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.addTimeBtn:hover:after {
  top: -45%;
  background-color: #fbc40e;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.deleteContainer {
  display: flex;
  justify-content: center;
  margin-top: -0.5rem; /* Ajuste para pegar el botón más arriba */
}
.buttonDelete {
  cursor: pointer;
  --width: 95px;
  --height: 28px;
  --tooltip-height: 35px;
  --tooltip-width: 90px;
  --gap-between-tooltip-to-button: 18px;
  --button-color: transparent;
  color: white;
  width: var(--width);
  height: var(--height);
  border: 3px solid #fbc40e;
  background: var(--button-color);
  position: relative;
  text-align: center;
  border-radius: 0.45em;
  font-size: 14px;
  transition: background 0.3s;
  margin-bottom: 0.5rem;
}

.buttonDelete::after,
.button::before {
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-wrapper,
.text,
.icon-delete {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  color: #fff;
}

.text {
  top: 0;
}

.text,
.icon-delete {
  transition: top 0.5s;
}

.icon-delete {
  color: #fff;
  top: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-delete svg {
  width: 24px;
  height: 24px;
}

.buttonDelete:hover {
  background: #c19400;
  border-color: #c19400;
}

.buttonDelete:hover .text {
  top: -100%;
}

.buttonDelete:hover .icon-delete {
  top: 0;
}

.buttonDelete:hover:before,
.buttonDelete:hover:after {
  opacity: 1;
  visibility: visible;
}

.buttonDelete:hover:after {
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) - 20px);
}

.buttonDelete:hover:before {
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button));
}

.day-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; /* Espacio entre cada día */
  width: 100%; /* Ancho relativo al contenedor principal */
}

.day-title {
  text-align: center;
}

.addTimeBtn {
  margin-top: 10px; /* Espacio entre el último slot de tiempo y el botón */
}

.buttonSave-container {
  text-align: center;
}

.buttonSave-container {
  margin-top: 1rem;
  margin-right: 1.5rem;
  margin-bottom: 0.5rem;
  width: auto;
  text-align: right;
}
.time-slot {
  display: flex;
  flex-direction: column;
}

.flatpickr-input {
  width: 30%;
}
.labelStart,
.labelEnd {
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 15%;
}
.labelStart {
  margin-top: 10%;
}
.labelEnd {
  margin-bottom: 1rem; /* Ajusta el margen según tu preferencia */
}

.labelStart label,
.labelEnd label {
  width: 30%; /* Ajusta el ancho del label según tu preferencia */
}

.schedule {
  margin-top: 20px;
  display: flex;
  width: 100%;
}

.save {
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
  height: 3rem;
  width: 15%;
  font-size: 15px;
  margin-left: 83%;
}

.save:hover {
  cursor: pointer;
}

.save:after {
  content: ' ';
  width: 0%;
  height: 100%;
  background: #c19400;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

.save:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.save span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  color: black;
  font-size: 1.125em;
  font-weight: 700;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}

.save:hover span {
  color: white;
  animation: scaleUp 0.3s ease-in-out;
}

.profile-container {
  position: relative;
  background-color: #1a1a1a;
  max-width: 70%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.schedule-container {
  flex: 1;
  position: relative;
  background-color: #1a1a1a;
  max-width: 70%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  color: #fff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}
@media screen and (min-width: 1281px) {
  .schedule-container .schedule > div:not(:last-child) {
    border-right: 1px solid #fff;
  }
}
@media screen and (max-width: 1280px) {
  .schedule-container .schedule {
    flex-direction: column; /* Cambia la dirección de los elementos a columna */
  }
  .day-container {
    width: 100%; /* Ancho completo cuando está en modo columna */
    margin-bottom: 1rem; /* Reducir el margen inferior entre los elementos */
    border-bottom: 1px solid #fff;
  }
  .time-slot {
    margin-bottom: 10px; /* Reducir el espacio entre los slots de tiempo */
  }
  .schedule-container {
    max-width: 50%; /* Reducir el ancho del contenedor al 90% del tamaño de la pantalla */
  }
  .day-container {
    border-right: none; /* Eliminar el borde derecho de todos los day-container */
  }
  .labelStart,
  .labelEnd {
    margin-bottom: 0.3rem;
    margin-right: 3rem;
  }
  .buttonDelete {
    margin-top: 1rem;
  }
}
.profile-image {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background-image: url('/src/assets/icons/userDefault.jpg');
  background-size: cover;
  border-radius: 50%;
}

.profile-container {
  background-color: #1a1a1a;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.user-info {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}

.logoutButton,
.editButton {
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 2px solid #fbc40e;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s ease-in;
  font-weight: bold;
}
.editButton {
  background-color: #fbc40e;
  color: white;
}
.logoutButton {
  background-color: transparent;
  color: white;
}

.logoutButton:active {
  color: #666;
  box-shadow:
    inset 4px 4px 12px #c5c5c5,
    inset -4px -4px 12px #ffffff;
}

.logoutButton:before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.logoutButton:after {
  content: '';
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #fbc40e;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.logoutButton:hover {
  color: black;
  border-color: #fbc40e;
}

.logoutButton:hover:before {
  top: -35%;
  background-color: #c19400;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.logoutButton:hover:after {
  top: -45%;
  background-color: #c19400;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.editButton:active {
  color: #666;
  box-shadow:
    inset 4px 4px 12px #c5c5c5,
    inset -4px -4px 12px #ffffff;
}

.editButton:before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.editButton:after {
  content: '';
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #fbc40e;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.editButton:hover {
  color: black;
  border-color: #c19400;
}

.editButton:hover:before {
  top: -35%;
  background-color: #c19400;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.editButton:hover:after {
  top: -45%;
  background-color: #c19400;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.edit-form {
  margin-top: 20px;
  background: #1a1a1a;
  padding: 20px;
  border-radius: 5px;
  color: #fff;
}

.edit-form h2 {
  margin-bottom: 15px;
}

.edit-form input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #424242;
  background-color: #2e2e2e;
  border-radius: 4px;
  color: #fff;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
}

.saveButton {
  background-color: #fbc40e;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
}

.cancelButton {
  background-color: transparent;
  color: white;
  border: 2px solid #fbc40e;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
}

.edit-form label {
  font-weight: bold;
  display: block;
  margin-top: 10px;
}

.input-group {
  margin-bottom: 10px;
}

.input-group input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  margin-top: 20px;
}
</style>
