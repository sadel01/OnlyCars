
<template>
  <div class="login-container" >
    <div class="login-box">
      <form class="form">
      <p>Regístrate</p>
      <div class="group">
        <input required="true" class="main-input" type="text" id="nombre">
        <span class="highlight-span"></span>
        <label class="lebal-email">Ingrese su nombre</label>
      </div>
      <div class="container-1">
      <div class="group">
        <input required="true" class="main-input" type="text" id="apellido">
        <span class="highlight-span"></span>
        <label class="lebal-email">Ingrese su apellido</label>
      </div>
    </div>
    <div class="container-1">
      <div class="group">
        <input required="true" class="main-input" type="text" id="rut">
        <span class="highlight-span"></span>
        <label class="lebal-email">Ingrese su RUT</label>
      </div>
    </div>
    <div class="container-1">
      <div class="group">
        <input required="true" class="main-input" type="text" id="mail">
        <span class="highlight-span"></span>
        <label class="lebal-email">Ingrese su correo</label>
      </div>
    </div>
    <div class="container-1">
        <div class="group">
          <input required="true" class="main-input" type="text" id="password">
          <span class="highlight-span"></span>
          <label class="lebal-email">Ingrese su contraseña</label>
        </div>
      </div>
      <div class="container-1">
        <div class="group">
          <input required="true" class="main-input" type="text" id="confirm-password">
          <span class="highlight-span"></span>
          <label class="lebal-email">Confirmar contraseña</label>
        </div>
      </div>
      <button type="submit"><span>Registrarse </span></button>
          <div class="sign-up">
            <span class="txt">¿Ya tienes cuenta? </span><router-link to="/login" style="color: #FBC40E;">Inicia sesión aquí</router-link>
          </div>
    </form>
    </div>
  </div>
  </template>
  
  <style scoped>
  .txt{
    color: white;
  }
  .login-container {
    background-image: url("@/assets/mustang-rally.jpg");
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
    letter-spacing: .5px;
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
    margin-top:5%;
    margin-bottom:5%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #FBC40E;
    font-family: "Montserrat", sans-serif;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    border: none;
    padding: 5% 20%;
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
    letter-spacing: 0.3em;
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
   