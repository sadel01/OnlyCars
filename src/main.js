import { createApp } from 'vue';
import './assets/main.css';
import App from './App.vue';
import store from '../back-end/src/store';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser); 
library.add(faFacebookF); 

const app = createApp(App);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon); 
app.use(router);

app.mount('#app');
