<template>
  <div class="main-container">
    <div v-if="user" class="profile-section">
      <div class="profile-image-container">
        <div
          class="profile-image"
          :style="{
            backgroundImage: `url(${user.imgProfile || '/src/assets/icons/userDefault.jpg'})`
          }"
        ></div>
        <div v-show="editing" class="edit-icon" @click="selectImage">
          <i class="fas fa-pencil-alt"></i>
        </div>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
      </div>
      <div v-show="!editing" class="profile-details">
        <h1>Perfil de Usuario</h1>
        <p><span class="label">Nombre:</span> {{ user.nombre }}</p>
        <p><span class="label">Apellido:</span> {{ user.apellido }}</p>
        <p><span class="label">Email:</span> {{ user.mail }}</p>
        <p><span class="label">RUT:</span> {{ user.rut }}</p>
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

    <div class="schedule-section">
      <h1 @click="toggleSection('schedule')">
        Horarios de atención
        <i
          :class="visibleSections.schedule ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
          class="arrow-icon"
        ></i>
      </h1>
      <transition name="slide-fade">
        <div v-show="visibleSections.schedule" class="schedule-container">
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
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
  name: 'Profile',
  components: {
    flatPickr
  },
  data() {
    return {
      editing: false,
      editableUser: {},
      visibleSections: {
        schedule: false
      },
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
      },
      imageFile: null
    }
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
    async saveProfile() {
      if (this.imageFile) {
        await this.uploadProfileImage()
      }
      try {
        const response = await axios.post(`http://localhost:8080/updateUserProfile`, {
          id: this.user._id,
          nombre: this.editableUser.nombre,
          apellido: this.editableUser.apellido,
          mail: this.editableUser.mail,
          rut: this.editableUser.rut,
          imgProfile: this.editableUser.imgProfile
        })
        this.$store.commit('setUser', { ...this.user, ...this.editableUser })
        this.editing = false
      } catch (error) {
        console.error('Error al guardar el perfil:', error)
      }
    },
    async uploadProfileImage() {
      const storage = getStorage()
      const fileRef = storageRef(storage, `profile-images/${this.imageFile.name}-${Date.now()}`)
      try {
        const snapshot = await uploadBytes(fileRef, this.imageFile)
        const downloadURL = await getDownloadURL(snapshot.ref)
        this.editableUser.imgProfile = downloadURL
      } catch (error) {
        console.error('Error al subir la imagen de perfil:', error)
        throw error
      }
    },
    saveSchedule() {
      const userId = this.user._id
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
    },
    toggleSection(section) {
      this.visibleSections[section] = !this.visibleSections[section]
    },
    selectImage() {
      this.$refs.fileInput.click()
    },
    handleFileChange(event) {
      this.imageFile = event.target.files[0]
    }
  },
  created() {
    this.verificacion = this.user.tipo === 'verificado' ? 'Si' : 'No'
  }
}
</script>

<style scoped>
body {
  background-color: #f5f5f5;
  color: #333;
  margin: 0;
  font-family: Arial, sans-serif;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.profile-section,
.schedule-section {
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.schedule-section {
  cursor: pointer;
}

.profile-image-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
}

.addContainer {
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 0.5rem;
}

.addTimeBtn {
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  font-size: 15px;
  border-radius: 0.3em;
  border: none;
  background: rgb(209, 208, 208);
  color: #090909;
  width: 80%;
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
  --width: 65px;
  --height: 28px;
  --tooltip-height: 35px;
  --tooltip-width: 90px;
  --gap-between-tooltip-to-button: 18px;
  --button-color: #e0e0e0;
  color: black;
  width: var(--width);
  height: var(--height);
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
  color: black;
}

.text {
  top: 0;
}

.text,
.icon-delete {
  transition: top 0.5s;
}

.icon-delete {
  color: black;
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

.time-slot {
  border-bottom: 1px solid #eeeeee;
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
  background-color: #fff;
  max-width: 100%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #bbbaba;
  border-radius: 20px;
  color: black;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

@media screen and (min-width: 1281px) {
  .schedule-container .schedule > div:not(:last-child) {
    border-right: 1px solid #c9c9c9;
  }
}

@media screen and (max-width: 1280px) {
  .schedule-container .schedule {
    flex-direction: column; /* Cambia la dirección de los elementos a columna */
  }
  .day-container {
    width: 100%; /* Ancho completo cuando está en modo columna */
    margin-bottom: 1rem; /* Reducir el margen inferior entre los elementos */
    border-bottom: 1px solid #8f8f8f;
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
  width: 100%;
  height: 100%;
  background-size: cover;
  border-radius: 50%;
}

.edit-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fbc40e;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-details h1,
.schedule-section h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}

.logoutButton,
.editButton,
.saveButton,
.cancelButton {
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
  background-color: #fbc40e;
  color: white;
}

.editButton:hover,
.logoutButton:hover,
.saveButton:hover,
.cancelButton:hover {
  background-color: #f8d150;
  color: #fff;
}

.saveButton,
.cancelButton {
  background-color: #fbc40e;
  color: white;
}

.edit-form label {
  font-weight: bold;
  display: block;
  margin-top: 10px;
}

.edit-form input {
  display: block;
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fafafa;
  color: #333;
}

.schedule {
  margin-top: 20px;
}

.day-schedule {
  background: #fafafa;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
  color: #333;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.time-entry {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.time-input {
  width: 100px;
  padding: 5px;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}

.addTimeBtn {
  margin-top: 10px;
  background-color: #fbc40e;
  color: white;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
}

.remove-btn {
  background: none;
  border: none;
  color: #ff4c4c;
  cursor: pointer;
}

.collapsible-section h2 {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow-icon {
  margin-left: 10px;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 1000px;
  opacity: 1;
}

@media (max-width: 600px) {
  .main-container {
    padding: 10px;
  }

  .profile-section,
  .schedule-section {
    padding: 10px;
  }

  .editButton,
  .logoutButton,
  .saveButton,
  .cancelButton,
  .addTimeBtn {
    padding: 8px 16px;
    font-size: 14px;
  }

  .time-input {
    width: 80px;
    padding: 5px;
  }
}
</style>
