<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1 id="title">ONLYCARS</h1>
      </div>
      <span class="subtitle">Compra y Vende Autos con nosotros</span>
      <p>Tu plataforma confiable para transacciones de automóviles seguras y convenientes</p>
      <RouterLink to="/catalog" class="theme-features-btn">
        <span>Ver Catálogo</span>
        <svg
          width="34"
          height="34"
          viewBox="0 0 74 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
          <path
            d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
            fill="black"
          ></path>
        </svg>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  z-index: 2;
}

body,
html {
  margin: 0;
  padding: 0;
}

.hero-text {
  font-weight: bold;
}

.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url(../assets/ferrari2.jpg); /*Agregar imagen*/
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  height: 700px;
  padding: 0 20px;
  position: relative;
  height: 100vh;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.hero-content {
  position: relative;
  top: -10%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 100%;
}

.subtitle {
  font-size: 1.5rem;
  margin-top: 2rem;
}

.hero-text > span {
  font-size: 4rem;
  line-height: 1.2;
}

#title {
  font-size: 4rem;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0;
}

p {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.theme-features-btn {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  transition: all 0.2s;
  padding: 10px 20px;
  border-radius: 50px;
  background: #fbc40e;
  border: 1px solid transparent;
  font-size: 15px;
  color: #1f1f1f;
  margin-top: 2rem;
  text-transform: uppercase;
  text-decoration: none;
}

.theme-features-btn:hover {
  background-color: #c19400;
}

.theme-features-btn svg {
  margin-left: 10px;
  transition: transform 0.3s ease-in-out;
}

.theme-features-btn:hover svg {
  transform: translateX(5px);
}

.theme-features-btn:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .hero-text > span {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }

  .hero-section {
    height: 600px;
  }
}

@media (max-width: 480px) {
  .hero-text > span {
    font-size: 2rem;
  }

  .hero-section {
    height: 500px;
  }

  .theme-features-btn {
    font-size: 14px;
    padding: 8px 15px;
  }
}
</style>
