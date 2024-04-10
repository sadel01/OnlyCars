<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
    <main>
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
    </main>
</template>

<style>
main {
    background-color: #333; /* Fondo negro claro */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Asegura que main ocupe toda la altura de la pantalla */
}

.transparent-box {
    display: flex;
    justify-content: end;
    position: relative; /* Necesario para posicionar correctamente el pseudo-elemento */
    width: 80%; /* Ajusta estos valores según tus necesidades */
    max-width: 1300px;
    height: 80%;
    max-height: 700px;
    background-color: rgba(255, 255, 255, 0.5); /* Caja transparente */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Sombreado alrededor de la caja */
}

.linea {
    position: absolute;
    top: 10%; /* Ajusta estos valores para cambiar la altura de la línea */
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

/* Consulta de medios para pantallas pequeñas */
@media (max-width: 600px) {
    .transparent-box {
        width: 90%;
        height: 90%;
    }

    .enviarCorreo {
        width: 100%; /* Ajusta este valor para cambiar el ancho de .enviarCorreo en pantallas pequeñas */
    }

    .enviarCorreo input,
    .enviarCorreo textarea {
        width: 100%; /* Ajusta este valor para cambiar el ancho de los campos de entrada y el textarea en pantallas pequeñas */
    }
}
</style>