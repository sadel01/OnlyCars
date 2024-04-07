<template>
    <main>
        <h1 class="contactoTexto">Contacto</h1>
        <p class="textoSub">Lorem ipsum dolor sit amet consectetur adipisicing elit. A asperiores consectetur dolor error. Sed ut vero incidunt dolor asperiores enim omnis esse tempore voluptates hic, consequuntur obcaecati eos cum architecto.</p>
        <div class="colorBox">    
            <div class="telefonoContainer">
                <img class="telefonoImg" src="@/assets/telefono.png" alt="Teléfono">
                <p class="telefonoTexto">Teléfono</p>
                <p class="textoDatos">Lorem ipsum dolor sit amet consectetur adipisicing elit. A asperiores consectetur dolor error. Sed ut vero incidunt dolor asperiores enim omnis esse tempore voluptates hic, consequuntur obcaecati eos cum architecto.</p>
            </div>        
            <div class="overlayBox">
                <div>
                    <p class="contactanos">Contáctanos</p>
                    <input type="text" v-model="datos" placeholder="Nombre">
                    <input type="text" v-model="datos" placeholder="Email">
                    <textarea class="input3" v-model="campo3" placeholder="Descripción"></textarea>
                </div>

            </div>
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
    width: 40px; 
    position: absolute; 
    top: 54%; 
    left: 5%;
    transform: translate(-50%, -50%);
}

.telefonoTexto {
    margin-left: 130px;
    padding-top: 45px;
    font-size: 50px;
}

.textoDatos{
    margin-left: 80px;
}

.contactanos{
    text-align: center;
    font-size: 50px;
}

.overlayBox div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.overlayBox div input {
    display: block;
    margin-bottom: 50px;
    width: 500px;
    font-size: 20px;
}

.input3{
    display: block;
    margin-bottom: 50px;
    width: 500px;
    height: 280px;
    font-size: 20px;
    resize: none;
}

</style>