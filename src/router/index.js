import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import ContactView from '../views/ContactView.vue'
import AboutView from '../views/AboutView.vue'
import SellView from '../views/SellView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ItemView from '../views/ItemView.vue'
import UserView from '../views/UserView.vue'
import ProfileView from '../views/Profile.vue'
import store from '../../back-end/src/store';
import ChatView from '../views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/sell',
      name: 'sell',
      component: SellView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/catalog/:id',
      name: 'catalog-item',
      component: ItemView
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserView
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: ChatView
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    // Si hay información de usuario, inicia la sesión del usuario
    store.commit('setUser', user);
  }
  next();
  if (requiresAuth && !store.state.user) {
    next('/login'); // Redirige al usuario a la página de inicio de sesión si no está autenticado
  } else {
    next(); // Permite que la navegación continúe normalmente si el usuario está autenticado o si la ruta no requiere autenticación
  }
});

export default router;