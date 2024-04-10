<template>
  <div id="app">
    <Navbar />
    <main>
      <div class="content-wrapper">
        <div class="image-container">
          <img src="@/assets/car1.png" alt="astonMartin" class="content-image">
        </div>
        <div class="text-container">
          <div class="text-block">
            <strong class="title">Título de la Página</strong>
            <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis iure pariatur ullam omnis reprehenderit. Rerum vitae voluptatibus nisi numquam ad, officiis in modi odit minima corrupti eius ratione consequuntur, dicta eaque laborum ipsa neque, vel reiciendis voluptatem minus sapiente necessitatibus commodi magni accusamus? Ratione sint incidunt ipsa repudiandae, pariatur totam atque praesentium.</p>
            <RouterLink to="/sell" class="boton">
              <button>Vende tu auto</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>

.title {
  font-size: 2rem; 
  margin-bottom: 1rem; 
  font-weight: bold;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.content-image {
  max-width: 100%;
  border-radius: 10%;
}

.text-container {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-block {
  padding: 1rem;
}


.description {
  font-size: 1rem;
  margin: 1rem 0;
  text-align: justify;
}

.boton {
  text-align: center; /* Centra el botón horizontalmente */
  margin-top: 1rem; /* Ajusta según sea necesario */
}

button {
 appearance: none;
 background-color: #FAFBFC;
 border: 1px solid rgba(27, 31, 35, 0.15);
 border-radius: 6px;
 box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
 box-sizing: border-box;
 color: #24292E;
 cursor: pointer;
 display: inline-block;
 font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
 font-size: 14px;
 font-weight: 500;
 line-height: 20px;
 list-style: none;
 padding: 6px 16px;
 position: relative;
 transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
 user-select: none;
 -webkit-user-select: none;
 touch-action: manipulation;
 vertical-align: middle;
 white-space: nowrap;
 word-wrap: break-word;
}

button:hover {
 background-color: #F3F4F6;
 text-decoration: none;
 transition-duration: 0.1s;
}

button:disabled {
 background-color: #FAFBFC;
 border-color: rgba(27, 31, 35, 0.15);
 color: #959DA5;
 cursor: default;
}

button:active {
 background-color: #EDEFF2;
 box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
 transition: none 0s;
}

button:focus {
 outline: 1px transparent;
}

button:before {
 display: none;
}

button:-webkit-details-marker {
 display: none;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .image-container,
  .text-container {
    width: 100%;
  }

  .text-block {
    text-align: center;
  }

  .boton {
    width: 100%;
  }
}
</style>
