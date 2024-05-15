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

    <div class="schedule-section">
      <h1 @click="toggleSection('schedule')">
        Horarios de atención
        <i
          :class="visibleSections.schedule ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
          class="arrow-icon"
        ></i>
      </h1>
      <transition name="slide-fade">
        <div v-show="visibleSections.schedule" class="schedule">
          <div v-for="(day, index) in days" :key="index" class="day-schedule">
            <h2>{{ day }}</h2>
            <div v-for="(time, timeIndex) in schedule[day]" :key="timeIndex">
              <label class="labelStart" for="start">Inicio:</label>
              <flat-pickr v-model="time.start" :config="config" class="time-input"></flat-pickr>
              <label class="labelEnd" for="end">Fin:</label>
              <flat-pickr v-model="time.end" :config="config" class="time-input"></flat-pickr>
            </div>
            <button class="addTimeBtn" @click="addTime(day)">Agregar horario</button>
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
      this.schedule[day].push({ start: '', end: '' })
    },
    toggleSection(section) {
      this.visibleSections[section] = !this.visibleSections[section]
    },
    selectImage() {
      this.$refs.fileInput.click()
    },
    handleFileChange(event) {
      this.imageFile = event.target.files[0]
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
  width: 100%;
  padding: 20px;
}

.profile-section,
.schedule-section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-image-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
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

.button-group {
  display: flex;
  justify-content: space-between;
}

.editButton,
.logoutButton,
.saveButton,
.cancelButton,
.addTimeBtn {
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

/* Responsividad */
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
