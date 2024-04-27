import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import store from '../back-end/src/store'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocation, faUser } from '@fortawesome/free-solid-svg-icons'
import 'sweetalert2/dist/sweetalert2.min.css'
import {
  faChevronDown,
  faCar,
  faCalendarDays,
  faGasPump,
  faScrewdriverWrench,
  faLocationDot,
  faShield,
  faScaleUnbalancedFlip,
  faTrashCan,
  faCircleMinus,
  faCirclePlus
} from '@fortawesome/free-solid-svg-icons'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import VueSweetalert2 from 'vue-sweetalert2'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBgikcE00VlQ8DlEEBGpZJahWnaONoD3cY',
  authDomain: 'onlycars-b8137.firebaseapp.com',
  projectId: 'onlycars-b8137',
  storageBucket: 'onlycars-b8137.appspot.com',
  messagingSenderId: '538165779065',
  appId: '1:538165779065:web:de1867cef2ea83874112a8',
  measurementId: 'G-3QLSP8PRMV'
}

const appFirebase = initializeApp(firebaseConfig)

library.add(
  faChevronDown,
  faUser,
  faCar,
  faWarehouse,
  faCalendarDays,
  faGasPump,
  faScrewdriverWrench,
  faLocationDot,
  faShield,
  faScaleUnbalancedFlip,
  faTrashCan,
  faCircleMinus,
  faCirclePlus
)
library.add(faFacebookF)

const app = createApp(App)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon, VueSweetalert2)
app.use(router)

app.mount('#app')
