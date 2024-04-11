<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPhone, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
    <main class="principal">
        <div class="transparent-box">
            <div class="datos">
                <div class="container1">
                    <FontAwesomeIcon :icon="faPhone" class="iconos" /><p class="textoDatos">Teléfono</p>
                </div>
                <p class="textoDatos2">+56 9 7358 8879</p>
                <div class="container1">
                    <FontAwesomeIcon :icon="faLocationDot" class="iconos" /><p class="textoDatos">Ubicación</p>                
                </div>
                <p class="textoDatos2">Donde no llegan las pelaitas.</p>
                <div class="container1">
                    <FontAwesomeIcon :icon="faClock" class="iconos" /><p class="textoDatos">Horario</p>
                </div>
                <p class="textoDatos2">No disponible. Somos universitarios.</p>
            </div>
            
            <div class="linea"></div>
            <div class="enviarCorreo">
                <p class="textoContactanos" >Contáctanos</p>
                <input class="in" type="text" placeholder="Nombre">
                <input class="in" type="text" placeholder="Email">
                <textarea cols="30" rows="10" placeholder="Descripción"></textarea>
                <button class="btn"><span>Enviar</span></button>
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

.iconos{
    font-size: 40px;
}

.textoDatos{
    font-size: 30px;
    font-weight: bold;
}

.textoDatos2{
    font-size: 15px;
    font-weight: bold;
}

.container1{
    display: flex;
    gap: 20px;
    align-items: center;
}

.in{
    width: 100%;
    color: rgb(36, 35, 42);
    font-size: 16px;
    line-height: 20px;
    min-height: 28px;
    border-radius: 4px;
    border: 2px solid transparent;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
    background: #d1ccbd;
    transition: all 0.1s ease 0s;        
}

.enviarCorreo input::placeholder,
.enviarCorreo textarea::placeholder {
    color: #000000; /* Cambia el color del texto del marcador de posición a amarillo */
}

.datos{
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
    background-color: rgba(142, 132, 132, 0.58);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
    justify-content: space-evenly;
    gap: 20px;
    margin-right: 110px;
    margin-bottom: 50px;
    width: 35%;
}

.enviarCorreo textarea{
    width: 100%;
    color: rgb(36, 35, 42);
    font-size: 16px;
    line-height: 20px;
    min-height: 28px;
    border-radius: 4px;
    border: 2px solid transparent;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
    background: #d1ccbd;
    transition: all 0.1s ease 0s;    
    resize: none;
}

.textoContactanos{
    font-size: 40px;
    text-align: center;
    font-weight: bold;
}

.btn{
    margin-top:15%;
    margin-bottom:5%;
    width: 185px;
    margin: 0 auto;
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
    padding: 4% 10%;
}
.btn:after {
  content: " ";
  width: 0%;
  height: 100%;
  background: #C19400;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

.btn:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.btn span {
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

.btn:hover span {
  color: white;
  animation: scaleUp 0.3s ease-in-out;
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