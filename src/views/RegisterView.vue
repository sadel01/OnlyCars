<template>
  <div class="login-container">
    <div class="login-box">
      <form class="form" @submit.prevent>
        <p>Regístrate</p>
        <div class="group">
          <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <circle cx="12" cy="6" r="4" stroke="#FBC40E" stroke-width="1.5"></circle>
              <path
                d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                stroke="#FBC40E"
                stroke-width="1.5"
              ></path>
            </g>
          </svg>
          <input required="true" class="main-input" type="text" id="nombre" v-model="nombre" />
          <span class="highlight-span"></span>
          <label class="lebal-email">Nombre</label>
        </div>
        <div class="container-1">
          <div class="group">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <circle cx="12" cy="6" r="4" fill="#FBC40E"></circle>
                <path
                  d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                  fill="#FBC40E"
                ></path>
              </g>
            </svg>
            <input
              required="true"
              class="main-input"
              type="text"
              id="apellido"
              v-model="apellido"
            />
            <span class="highlight-span"></span>
            <label class="lebal-email">Apellido</label>
          </div>
        </div>
        <div class="container-1">
          <div class="group">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M18 12H15M21 8H3M18 16H15M13 19C12.6218 17.2883 10.9747 16 9 16C7.03262 16 5.39034 17.2788 5.00424 18.9811M9 12H9.01M5.00424 18.9811C5.31776 19 5.70396 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.33038 18.9035 4.60979 18.9572 5.00424 18.9811ZM10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z"
                  stroke="#FBC40E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
            <input required="true" class="main-input" type="text" id="rut" v-model="rut" />
            <span class="highlight-span"></span>
            <label class="lebal-email">RUT</label>
            <div class="tooltip-container">
              <span class="tooltip">Ejemplo de RUT: 12345678-9</span>
              <span class="icon" type="icon-tip">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.58584 14.3415 10.232 13.883 10.704C13.7907 10.7989 13.7027 10.8869 13.6187 10.9708C13.4029 11.1864 13.2138 11.3753 13.0479 11.5885C12.8289 11.8699 12.75 12.0768 12.75 12.25V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V12.25C11.25 11.5948 11.555 11.0644 11.8642 10.6672C12.0929 10.3733 12.3804 10.0863 12.6138 9.85346C12.6842 9.78321 12.7496 9.71789 12.807 9.65877C13.0046 9.45543 13.125 9.18004 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#c19400"></path> </g></svg>
              </span>
            </div>
          </div>
        </div>
        <div class="container-1">
          <div class="group">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M4 18L9 12M20 18L15 12M3 8L10.225 12.8166C10.8665 13.2443 11.1872 13.4582 11.5339 13.5412C11.8403 13.6147 12.1597 13.6147 12.4661 13.5412C12.8128 13.4582 13.1335 13.2443 13.775 12.8166L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                  stroke="#FBC40E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
            <input required="true" class="main-input" type="text" id="mail" v-model="mail" />
            <span class="highlight-span"></span>
            <label class="lebal-email">Correo electrónico</label>
          </div>
        </div>
        <div class="container-1">
          <div class="group">
            <svg
              stroke="#FBC40E"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
            >
              <path
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
            <input
              required="true"
              class="main-input"
              type="password"
              id="password"
              v-model="password"
            />
            <span class="highlight-span"></span>
            <label class="lebal-email">Contraseña</label>
          </div>
        </div>
        <div class="container-1">
          <div class="group">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M21 8.5V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V11C3 12.1046 3.89543 13 5 13H10.875M19 14V12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12V14M14 20H20C20.5523 20 21 19.5523 21 19V15C21 14.4477 20.5523 14 20 14H14C13.4477 14 13 14.4477 13 15V19C13 19.5523 13.4477 20 14 20Z"
                  stroke="#FBC40E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <circle cx="7.5" cy="8.5" r="1.5" fill="#FBC40E"></circle>
                <circle cx="12" cy="8.5" r="1.5" fill="#FBC40E"></circle>
              </g>
            </svg>
            <input
              required="true"
              class="main-input"
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
            />
            <span class="highlight-span"></span>
            <label class="lebal-email">Confirmar contraseña</label>
            <p v-if="errorMessage" class="error" style="font-size: 12px; color:red">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success" style="font-size: 12px; color:green">{{ successMessage }}</p>
          </div>
        </div>
        <button type="submit" @click="register"><span>Registrarse </span></button>
        <div class="sign-up">
          <span class="txt">¿Ya tienes cuenta? </span
          ><router-link to="/login" style="color: #fbc40e">Inicia sesión aquí</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      nombre: '',
      apellido: '',
      rut: '',
      mail: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
  async register() {
    if (!this.validaRut(this.rut)) {
        this.errorMessage = 'RUT inválido';
        return;
      }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }
    if (!this.validaCorreo(this.mail)) {
    this.errorMessage = 'Correo electrónico inválido';
    return;
  }
    if (!this.nombre || !this.apellido || !this.rut || !this.mail || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/register', {
        nombre: this.nombre,
        apellido: this.apellido,
        rut: this.rut,
        mail: this.mail,
        password: this.password,
        confirmPassword: this.confirmPassword,
        rol : 'user'
      })
      if (response.data.success) {
        this.nombre = '';
        this.apellido = '';
        this.rut = '';
        this.mail = '';
        this.password = '';
        this.confirmPassword = '';
        this.errorMessage = '';
        this.successMessage = '¡Registro exitoso!';
        setTimeout(() => {
          this.successMessage = '';
          this.$router.push('/login');
        }, 1500);
      }
    } catch (error) {
      this.errorMessage = 'Hubo un error al registrarse. Por favor, inténtalo de nuevo.'
      console.log(this.errorMessage)
    }
  },

  validaRut(rutCompleto) {
      rutCompleto = rutCompleto.replace("‐","-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
          return false;
      var tmp = rutCompleto.split('-');
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == 'K') digv = 'k' ;

      return (this.dv(rut) == digv );
    },
    dv(T) {
      var M = 0, S = 1;
      for (; T; T = Math.floor(T / 10))
          S = (S + T % 10 * (9 - M++ % 6)) % 11;
      return S ? S - 1 : 'k';
    },
    validaCorreo(correo) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correo);
    },
}
}
</script>

<style scoped>
.tooltip-container {
  color: #ffffff;
  position: absolute;
  cursor: pointer;
  transition: all 0.2s;
  left: 107%;
  bottom: 65%;
}

.tooltip {
  background-color: #1f1f1f;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  width: 13.5rem;
  height: 1.75rem;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  bottom: 30%;
  border-radius: 10px;
  margin-top: 5%;
}

.tooltip::before {
  background-color: #1f1f1f;
  position: absolute;
  content: "";
  bottom: -0.2em;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
}

.tooltip-container:hover .tooltip {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}


.icon[type='icon-tip'] {
  width: 1.4rem;
  height: 1.5rem;
}

.icon {
  color: #fbc40e;
  left: -17%;
  top: 35%;
  position: absolute;
  fill: none;
  width: 2rem;
  height: 1.5rem;
}
.txt {
  color: white;
}
.login-container {
  flex: 1; 
  background-image: url('@/assets/mustang-rally.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5%;
  padding-bottom: 6%;
  height: 75vh;
}
.login-box {
  display: flex;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 0% 2.5%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.group {
  position: relative;
  margin-bottom: 15%;
}

.form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 10%;
  padding-right: 40px;
  padding-left: 40px;
  position: relative;
}

.form p {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: white;
}

.container-1 {
  padding-top: 5%;
}

.main-input {
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 185px;
  border: none;
  border-bottom: 1px solid #d8d8d8;
  background: transparent;
  color: #ffffff;
}

.main-input:focus {
  outline: none;
  border-bottom-color: #fbc40e;
}

.lebal-email {
  color: #d8d8d8;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.main-input:focus ~ .lebal-email,
.main-input:valid ~ .lebal-email {
  top: -20px;
  font-size: 14px;
  color: #fbc40e;
}

.highlight-span {
  position: absolute;
  height: 60%;
  width: 0px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

.main-input:focus ~ .highlight-span {
  -webkit-animation: input-focus 0.3s ease;
  animation: input-focus 0.3s ease;
}

@keyframes input-focus {
  from {
    background: #fbc40e;
  }

  to {
    width: 185px;
  }
}

button[type='submit'] {
  margin-top: 5%;
  margin-bottom: 5%;
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
  padding: 5% 20%;
}
button[type='submit']:after {
  content: ' ';
  width: 0%;
  height: 100%;
  background: #c19400;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

button[type='submit']:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

button[type='submit'] span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  color: black;
  font-size: 1.125em;
  font-weight: 700;
  letter-spacing: 0.1em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}

button[type='submit']:hover span {
  color: white;
  animation: scaleUp 0.3s ease-in-out;
}

@keyframes scaleUp {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}

.sign-up {
  text-align: center;
  margin-top: 20px;
}
</style>
