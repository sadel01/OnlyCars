<template>
  <div class="team-section">
    <div class="title-background">
      <h1>NOSOTROS</h1>
    </div>
    <p class="about-text">
      En OnlyCars, estamos comprometidos con la excelencia en la industria automotriz. Nos enorgullece ofrecer una plataforma integral para la compra y venta de vehículos en Chile, con un enfoque en la seguridad, la transparencia y la satisfacción del cliente. <br><br>

Nuestra Visión: Ser líderes en innovación y servicio dentro del mercado automotriz chileno, proporcionando una experiencia de usuario superior y fomentando relaciones comerciales sólidas y confiables.


<h1>Por Qué Elegirnos:</h1>
<p class="about-text"><span class="subtitleWhy">Innovación Tecnológica:</span> Utilizamos la última tecnología para ofrecer una plataforma robusta y fácil de usar que simplifica el proceso de compra y venta de vehículos. <br><br>
<span class="subtitleWhy">Seguridad Garantizada:</span> Implementamos medidas de seguridad rigurosas para proteger la información de nuestros usuarios y garantizar transacciones seguras. <br><br>
<span class="subtitleWhy">Compromiso con la Comunidad:</span> Nos comprometemos a ser una fuerza positiva en la comunidad automotriz, apoyando prácticas comerciales éticas y sostenibles. <br><br>
En OnlyCars, nos esforzamos por establecer relaciones sólidas y duraderas con nuestros usuarios. Únete a nosotros y experimenta la diferencia hoy mismo.</p>

    </p>
    <h1 class="team-title">NUESTRO EQUIPO</h1>
    <div class="team">
      <div class="member">
        <img class="memberImg" src="../assets/team/benja.jpg" />
        <h2>Benjamin Puebla</h2>
        <p>CEO OnlyCars</p>
      </div>
      <div class="member">
        <img class="memberImg" src="../assets/team/nelson.jpg" />
        <h2>Nelson Silva</h2>
        <p>Desarrollador</p>
      </div>
      <div class="member">
        <img class="memberImg" src="../assets/team/jose.jpg" />
        <h2>Jose Diaz</h2>
        <p>Desarrollador</p>
      </div>
      <div class="member">
        <img class="memberImg" src="../assets/team/martin.jpg" />
        <h2>Martin Flores</h2>
        <p>Desarrollador</p>
      </div>
      <div class="member">
        <img class="memberImg" src="../assets/team/rodrigo.jpg" />
        <h2>Rodrigo Dominguez</h2>
        <p>Desarrollador</p>
      </div>
      <div class="member">
        <img class="memberImg" src="../assets/team/adrian.jpg" />
        <h2>Adrian Espinoza</h2>
        <p>Desarrollador</p>
      </div>
      <div class="member">
        <img class="memberImg" src="../assets/team/agustin.jpg" />
        <h2>Agustin Meza</h2>
        <p>Desarrollador</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.subtitleWhy {
  font-weight: bold;
}


.team {
  margin: 4em;
}

.memberImg {
  border-radius: 50%;
}

h2 {
  font-size: 18px;
  color: #1f1f1f;
}

.title-background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('../assets/contactus.jpg');
  background-size: cover;
  background-position: center;
  padding: 90px 0;
  color: white;
  text-align: center;
}

.team-section {
  background-color: #f8f9fa;
  text-align: center;
}

.about-text {
  margin: 4em auto;
  color: #6c757d;
  width: 70%;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
}

.team-title {
  color: #1f1f1f;
  margin: 30px 0;
}

.member {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  width: 180px;
}

.member-img {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.member img {
  width: 100%;
  height: auto;
}

.member-info h2,
.member-info p {
  margin: 5px 0;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .member {
    width: 220px;
  }
  .about-text {
    width: 60%;
  }
}
</style>
