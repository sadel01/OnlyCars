<template>
  <div id="app">
    <main>
      <div class="content-wrapper">
        <div class="text-container">
          <div class="text-block">
            <strong class="title">Nosotros</strong>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint omnis quis ad
              asperiores ab exercitationem nesciunt, minus voluptatum nihil repudiandae impedit
              perferendis laborum sapiente iste quo modi molestias provident natus. Cupiditate,
              nesciunt officia! Repellat nam assumenda aperiam blanditiis porro officiis vel enim
              accusantium autem. At iusto similique nemo. Veniam dolorum quia pariatur minus ipsa
              placeat. Impedit, tenetur nesciunt! Officia deleniti ducimus maiores corporis nisi!
            </p>
          </div>
        </div>
        <div class="image-container">
          <img src="@/assets/nosotros.jpeg" alt="explorer" class="content-image" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes wipe-in-left {
  from {
    clip-path: inset(0 0 0 100%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.content-wrapper {
  animation: 6s cubic-bezier(.25, 1, .30, 1) wipe-in-left both;
}
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  margin: 0 5%;
  padding: 2rem;
  height: 50vh;
}

.image-container {
  flex: 1;
  display: flex;
  height: 50vh;
  margin: 1.5rem;
}

.content-image {
  max-width: 100%;
  border-radius: 10%;
  padding: 1rem;
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

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

button {
  background-color: green;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 20px;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    height: auto;
    gap: 2rem;
    padding: 1rem;
  }

  .image-container,
  .text-container {
    width: 100%;
    margin: 0;
  }

  .content-image {
    height: auto;
  }

  .title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 1.25rem;
  }

  button {
    font-size: 18px;
    padding: 0.75rem;
  }
}
</style>
