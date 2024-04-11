<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="logo-slogan-container">
        <div class="logo">ONLYCARS</div>
        <div class="slogan">Exclusividad al volante.</div>
      </div>
      <div class="footer-links">
        <div class="link-group">
          <strong class="titles">NAVEGACIÓN</strong>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/catalog">Catálogo</RouterLink>
          <RouterLink to="/about">Nosotros</RouterLink>
          <RouterLink to="/contact">Contacto</RouterLink>
          <RouterLink to="/sell">Vender</RouterLink>
        </div>
        <div class="link-group">
          <strong class="titles">CONTACTO</strong>
          <a href="#">Dirección</a>
          <a href="#">Teléfono</a>
          <a href="#">Email</a>
        </div>
        <div class="link-group">
          <strong class="titles">INFORMACIONES</strong>
          <a href="#">FAQ</a>
          <a href="#">Ubicación</a>
        </div>
      </div>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-social">
      <div class="social-icons">
        <a href="https://www.facebook.com" target="_blank">
          <FontAwesomeIcon :icon="faFacebookF" />
        </a>
        <a href="https://www.twitter.com" target="_blank">
          <FontAwesomeIcon :icon="faTwitter" />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <FontAwesomeIcon :icon="faInstagram" />
        </a>
        <a href="https://www.linkedin.com" target="_blank">
          <FontAwesomeIcon :icon="faLinkedinIn" />
        </a>
      </div>
      <p class="copyright">©Copyright, All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>

.titles {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #FBC40E;
}

.footer {
  background-color: #1f1f1f;
  color: #fff;
  font-family: Arial, sans-serif;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 4rem;
}

.logo-slogan-container {
  text-align: left;
  margin-bottom: 1rem;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: #FBC40E;
}

.slogan {
  font-size: 1.2rem;
}

.footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.link-group {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 0 40px;
}

.link-group a {
  color: #fff;
  text-decoration: none;
  margin: 0.25rem 0;
}

.footer-divider {
  width: 100%;
  height: 1px;
  background-color: #E4EDDB;
  margin-bottom: 1rem;
}

.footer-social {
  text-align: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.social-icons a {
  color: #fff;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    align-items: center;
  }

  .link-group {
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .link-group a {
    text-align: center;
  }

  .footer-divider {
    margin-bottom: 0.5rem;
  }

  .social-icons {
    margin-bottom: 0.5rem;
  }
}
</style>
