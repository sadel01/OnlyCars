<template>
    <div class="register-container" >
      <div class="register-box">
        <form @submit.prevent="login">
            <div class="form">
              <label for="name">Nombre</label>
              <input type="name" id="name" name="name" required>
            </div>
            <div class="form">
              <label for="apellido">Apellido</label>
              <input type="apellido" id="apellido" name="apellido" required>
            </div>
            <div class="form">
              <label for="rut">R.U.T.</label>
              <input type="rut" id="rut" name="rut" required>
            </div>
          <div class="form">
              <label for="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" required>
          </div>
          <div class="form">
              <label for="password">Contraseña</label>
              <input type="password" id="password" name="password" required>
          </div>
          <div class="form">
              <label for="conf-password">Confirmar contraseña</label>
              <input type="conf-password" id="conf-password" name="conf-password" required>
          </div>
          <button type="submit">Registrarse</button>
          <div class="socialmedia">
              <span>Síguenos en</span>
              <div class="socialicons">
              <!--iconos-->
            </div>
          </div>
          <div class="login">
            ¿Ya tienes una cuenta? <router-link to="/login" style="color: #144D53;">Inicia Sesión aquí</router-link>
          </div>
        </form>  
      </div>
    </div>
  
  </template>
  
  <style>
  .register-container {
    background-image: url("@/assets/f1 alpine.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .register-box{
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .form{
    margin-bottom: 20px;
  }
  label{
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  input[type="email"], input[type="password"], input[type="name"], input[type="apellido"], input[type="conf-password"], input[type="rut"]{
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  button[type="submit"]{
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #144D53;
    color: #fff;
    cursor: pointer;
  }
  .socialmedia{
    text-align: center;
    margin-top: 20px;
  }
  .socialicons{
    margin-top: 10px;
  }
  .login{
    text-align: center;
    margin-top: 20px;
  
  }
  </style>
   