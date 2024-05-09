<template>
  <div id="app">
    <Navbar />
    <main>
      <div class="content-wrapper">
        <div class="image-container">
          <img src="@/assets/car1.png" alt="astonMartin" class="content-image" />
        </div>
        <div class="text-container">
          <div class="text-block">
            <strong class="title">Vende tu Auto</strong>
            <p class="description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis iure pariatur ullam
              omnis reprehenderit. Rerum vitae voluptatibus nisi numquam ad, officiis in modi odit
              minima corrupti eius ratione consequuntur, dicta eaque laborum ipsa neque, vel
              reiciendis voluptatem minus sapiente necessitatibus commodi magni accusamus? Ratione
              sint incidunt ipsa repudiandae, pariatur totam atque praesentium.
            </p>
            <RouterLink to="/sell" class="boton">
              <button class="botonVendeAuto"><span>Vende tu auto</span></button>
            </RouterLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
@keyframes wipe-in-right {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.content-wrapper {
  animation: 5s cubic-bezier(0.25, 1, 0.3, 1) wipe-in-right both;
  display: flex;
  align-items: center; /* Alinea los elementos hijos verticalmente en el centro */
  justify-content: center;
  gap: 4rem;
  margin: 0 5%;
  padding: 2rem;
}

.image-container {
  flex: 0 0 30%;
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem;
}

.content-image {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 10%;
}

.text-container {
  flex: 0 0 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
}

.text-block {
  padding: 1rem;
  padding-top: 7rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.botonVendeAuto {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #fbc40e;
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 1.6% 3.7%;
}
.botonVendeAuto:after {
  content: ' ';
  width: 0%;
  height: 100%;
  background: #c19400;
  position: absolute;
  transition: all 0.4s ease-in-out;
  right: 0;
}

.botonVendeAuto:hover::after {
  right: auto;
  left: 0;
  width: 100%;
}

.botonVendeAuto span {
  text-align: center;
  text-decoration: none;
  width: 100%;
  color: black;
  font-size: 1.125em;
  font-weight: 700;
  letter-spacing: 0.1em;
  z-index: 20;
  transition: all 0.3s ease-in-out;
}
.botonVendeAuto:hover span {
  color: white;
  animation: scaleUp 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
  }

  .image-container,
  .text-container {
    width: 100%;
    padding: 1rem 0;
    flex: none;
  }

  .content-image {
    height: auto;
    padding: 0;
  }

  .title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.25rem;
  }
}
</style>
