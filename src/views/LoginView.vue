
<template>
  <div class="login-container" >
    <div class="login-box">
      <form class="form" @submit.prevent>
      <p>Inicia sesión</p>
      <div class="group">
        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 12H15M21 8H3M18 16H15M13 19C12.6218 17.2883 10.9747 16 9 16C7.03262 16 5.39034 17.2788 5.00424 18.9811M9 12H9.01M5.00424 18.9811C5.31776 19 5.70396 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.33038 18.9035 4.60979 18.9572 5.00424 18.9811ZM10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z" stroke="#FBC40E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <input required="true" class="main-input" type="text" id="rut" v-model="rut">
        <span class="highlight-span"></span>
        <label class="lebal-email">Ingrese su RUT</label>
      </div>
      <div class="container-1">
        <div class="group">
          <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon">
            <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
          <input required="true" class="main-input" type="password" id="password" v-model="password">
          <span class="highlight-span"></span>
          <label class="lebal-email" type="password">Ingrese su contraseña</label>
          <p v-if="errorMessage" class="error" style="font-size: 12px; color:red">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success" style="font-size: 12px; color:green">{{ successMessage }}</p>
        </div>
      </div>
      <button type="submit" @click="login"><span>Ingresar </span></button>
          <div class="sign-up">
            <span class="txt">¿No tienes cuenta? </span><router-link to="/register" style="color: #FBC40E;">Regístrate aquí</router-link>
          </div>
    </form>
    </div>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        rut: '',
        password: '',
        successMessage: '',
        errorMessage: '',
      };
    },
    methods: {
  async login() {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        rut: this.rut,
        password: this.password,
      });
      if (response.data === 'Inicio de sesion exitoso') {
        // Simula obtener datos del usuario como el nombre
        this.$store.commit('setUser', {
          name: 'Nombre Apellido' // Cambia esto por los datos reales
        });
        this.successMessage = 'Inicio de sesion exitoso';
        this.errorMessage = '';
        setTimeout(() => {
          this.$router.push('/');
        }, 1500);
      } else {
        this.errorMessage = 'Rut o contraseña incorrectos';
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Error en el servidor';
    }
  },
}
  };
  </script>
  
  
  <style scoped>
   .icon {
    color: #FBC40E;
    left: -17%;
    top: 35%;
    position: absolute;
    fill: none;
    width: 2rem;
    height: 1.5rem;
  }
  .txt{
    color: white;
  }
  .login-container {
    background-image: url("@/assets/sportage.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .login-box{
    background-color: rgba(0, 0, 0, 0.7);;
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 0% 2.5%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .group {
    position: relative;
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
    padding: 40px;
    padding-right: 40px;
    padding-left: 40px;
    position: relative;
  }
  
  .form p {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: .5px;
    color: white;
  }
  
  .container-1 {
    padding-top: 30px;
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
    border-bottom-color: #FBC40E;
  }
  
  .lebal-email {
    color: #d8d8d8;
    font-size: 18px;
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
    color: #FBC40E;
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
      background: #FBC40E;
    }
  
    to {
      width: 185px;
    }
  }
  
  button[type="submit"]{
    margin-top:15%;
    margin-bottom:5%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #FBC40E;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    border: none;
    padding: 5% 30%;
  }
  button[type="submit"]:after {
    content: " ";
    width: 0%;
    height: 100%;
    background: #C19400;
    position: absolute;
    transition: all 0.4s ease-in-out;
    right: 0;
  }
  
  button[type="submit"]:hover::after {
    right: auto;
    left: 0;
    width: 100%;
  }
  
  button[type="submit"] span {
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
  
  button[type="submit"]:hover span {
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
  
  
  .sign-up{
    text-align: center;
    margin-top: 20px;
  
  }
  </style>
   