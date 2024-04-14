<template>
  <div class="about">
    <h1>NOSOTROS</h1>
    <h2>Benjamín Puebla <br>
      Nelson Silva <br>
      José Díaz<br>
      Adrián Espinoza<br>
      Martín Flores<br>
      Agustín Meza<br>
      Rodrigo Domínguez
    </h2>
  </div>
</template>

<style scoped>

.about {
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.about::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/nosotros.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(50%);
}


h1 {
  font-size: 80px;
  font-weight: bold;
  position: absolute;
  top: -3%;
  left: 40%;
  color: white; 
}

h2 {
  font-size: 25px;
  font-weight: lighter;
  position: absolute;
  top: 37%;
  right: 2%;
  transform: translate(-50%, -50%);
  color: white;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center; 
  }
}
</style>
