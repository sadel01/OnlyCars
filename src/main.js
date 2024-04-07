import { createApp } from 'vue';
import './assets/main.css';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'; // Importa el ícono de Facebook
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser); // Añade el ícono faUser al conjunto de bibliotecas
library.add(faFacebookF); // Añade el ícono de Facebook al conjunto de bibliotecas

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon); // Registra el componente FontAwesomeIcon globalmente
app.use(router);

app.mount('#app');
