<!--<template>
  <div class="login-container" >
    <div class="login-box">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="form">
            <label for="rut">R.U.T.</label>
            <input type="rut" id="rut" name="rut" required>
        </div>
        <div class="form">
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit"><a href="https://www.youtube.com/watch?v=FJ6_h3HGsW4&list=RDFJ6_h3HGsW4&start_radio=1&ab_channel=KiddVoodoo">Ingresar </a></button>
        <div class="socialmedia">
            <span>Síguenos en</span>
            <div class="socialicons">
            
          </div>
        </div>
        <div class="sign-up">
          ¿No tienes cuenta? <router-link to="/register" style="color: #144D53;">Regístrate aquí</router-link>
        </div>
      </form>  
    </div>
  </div>

</template>

<style>
.login-container {
  background-image: url("@/assets/f1.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-box{
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
input[type="rut"], input[type="password"]{
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
.sign-up{
  text-align: center;
  margin-top: 20px;

}
</style>-->

<template>
<div class="login-container" >
  <div class="login-box">
    <form class="form">
    <p>Inicia sesión con tu cuenta</p>
    <div class="group">
      <input required="true" class="main-input" type="text">
      <span class="highlight-span"></span>
      <label class="lebal-email">Ingrese su R.U.T.</label>
    </div>
    <div class="container-1">
      <div class="group">
        <input required="true" class="main-input" type="text">
        <span class="highlight-span"></span>
        <label class="lebal-email">Ingrese su contraseña</label>
      </div>
    </div>
    <button type="submit"><span>Ingresar </span></button>
        <div class="socialmedia">
            <span class="txt">Síguenos en</span>
            <div class="socialicons">
            
          </div>
        </div>
        <div class="sign-up">
          <span class="txt">¿No tienes cuenta? </span><router-link to="/register" style="color: #FAE00F;">Regístrate aquí</router-link>
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
  background-image: url("@/assets/f1.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-box{
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(25px);
  border-radius: 30px;
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
  padding: 120px 40px;
  padding-top: 60px;
  padding-bottom: 90px;
  padding-right: 40px;
  padding-left: 40px;
  position: relative;
}

.form p {
  padding-bottom: 20px;
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
  border-bottom-color: #FAE00F;
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
  color: #FAE00F;
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
    background: #FAE00F;
  }

  to {
    width: 185px;
  }
}


button[type="submit"]{
 margin-top: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #F8FF0F;
  font-family: "Montserrat", sans-serif;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  
}
button[type="submit"]:after {
  content: " ";
  width: 0%;
  height: 100%;
  background: #FAC30F;
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




.socialmedia{
  text-align: center;
  margin-top: 20px;
}
.socialicons{
  margin-top: 10px;
}
.sign-up{
  text-align: center;
  margin-top: 20px;

}
</style>
 