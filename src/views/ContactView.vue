<template>
    <main>
        <h1 class="contactoTexto">Contacto</h1>
        <p class="textoSub">Lorem ipsum dolor sit amet consectetur adipisicing elit. A asperiores consectetur dolor error. Sed ut vero incidunt dolor asperiores enim omnis esse tempore voluptates hic, consequuntur obcaecati eos cum architecto.</p>
        <div class="colorBox">    
            <div class="telefonoContainer">
                <img class="telefonoImg" src="@/assets/telefono.png" alt="Teléfono">
                <p class="telefonoTexto">Teléfono</p>
            </div>        
            <div class="overlayBox"></div>
        </div>
    </main>
</template>

<style>

.contactoTexto{
    margin-left: 40px;
    margin-top: 60px;
    font-size: 50px;
    color: #144D53;
}

.textoSub{
    font-size: 15px;
    margin: 40px
}

.colorBox {
    background: #307672;
    height: 600px;
    width: 100%;
    margin-top: 140px;
    margin-bottom: 140px;
}

.overlayBox {
    position: absolute;
    background-color: #1A3C40;
    height:83%;
    width: 50%;
    top: 35%;
    left: 45%;
}

.telefonoImg {
    width: 40px; /* Ajusta este valor según tus necesidades */
    position: absolute; /* Posiciona la imagen de forma absoluta en relación a su contenedor más cercano con posición relativa/absoluta */
    top: 55%; /* Posiciona la imagen a la mitad del contenedor desde arriba */
    left: 5%; /* Posiciona la imagen a la mitad del contenedor desde la izquierda */
    transform: translate(-50%, -50%); /* Centra la imagen exactamente en el medio del contenedor */
}

.telefonoTexto {
    margin-left: 130px;
    padding-top: 56px;
    font-size: 50px;
}

</style>