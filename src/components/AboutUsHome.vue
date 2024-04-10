<template>
  <div id="app">
    <Navbar />
    <main>
      <div class="content-wrapper">
        <div class="text-container">
          <div class="text-block">
            <strong class="title">Nosotros</strong>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint omnis quis ad asperiores ab exercitationem nesciunt, minus voluptatum nihil repudiandae impedit perferendis laborum sapiente iste quo modi molestias provident natus. Cupiditate, nesciunt officia! Repellat nam assumenda aperiam blanditiis porro officiis vel enim accusantium autem. At iusto similique nemo. Veniam dolorum quia pariatur minus ipsa placeat. Impedit, tenetur nesciunt! Officia deleniti ducimus maiores corporis nisi!</p>
          </div>
        </div>
        <div class="image-container">
          <img src="@/assets/nosotros.jpeg" alt="explorer" class="wrapper-image">
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.wrapper-image {
  width: 100%;
  border-radius: 5%;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.text-container,
.image-container {
  width: 100%;
}

.text-block {
  padding: 1rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

p {
  max-width: 800px;
  overflow-wrap: break-word;
  font-size: 1rem;
  margin: 1rem 0;
  text-align: justify;
}

@media (min-width: 768px) {
  .content-wrapper {
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem 5rem; /* Ajusta el padding horizontal */
  }

  .text-container {
    flex: 2;
    margin-right: 2rem; /* Ajusta el espacio entre el texto y la imagen */
  }

  .image-container {
    flex: 1;
  }

  .text-block {
    padding: 1rem 3rem; /* Ajusta el padding interior del bloque de texto */
  }
}
</style>
