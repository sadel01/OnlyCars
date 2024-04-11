<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
    <main class="principal">
        <div class="transparent-box" >            
            <div class="linea"></div>
            <div class="enviarCorreo">
                <p class="textoContactanos" >Contáctanos</p>
                <input type="text" placeholder="Nombre">
                <input type="text" placeholder="Email">
                <textarea cols="30" rows="10" placeholder="Descripción"></textarea>
                <button class="botonEnviar">Enviar</button>
            </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.principal {
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</script>

.transparent-box {
    display: flex;
    justify-content: end;
    position: relative;
    width: 80%;
    max-width: 1300px;
    height: 80%;
    max-height: 700px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.colorBox::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/contacto.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(50%);
  z-index: -1;
}
.mensajeExito {
  margin-top: 1px;
  color: white;
  font-size: 15px;
}
.mensajeNoExito {
  margin-top: 1px;
  color: #a32d2d;
  font-size: 15px;
}

.linea {
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 50%;
    width: 1px;
    background-color: black;
}

.enviarCorreo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    margin-right: 110px;
    margin-bottom: 50px;
    width: 35%;
}

textarea{
    resize: none;
    width: 99%;
}

.textoContactanos{
    font-size: 40px;
    text-align: center;
}

.botonEnviar{
    width: 100px;
    height: 40px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    align-self: center;
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
</style>
