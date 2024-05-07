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
import store from '../../back-end/src/store'
import ChatView from '../views/ChatView.vue'
import ComparisonView from '../views/ComparisonView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import AdminView from '../views/AdminView.vue'

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
      meta: { requiresAuth: true }
    },
    {
      path: '/sell',
      name: 'sell',
      component: SellView,
      meta: { requiresAuth: true }
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
      path: '/comparison',
      name: 'comparison',
      component: ComparisonView
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserView
    },
    {
      path: '/chats',
      name: 'chats',
      component: ChatView,
      meta: { requiresAuth: true },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/AdminView',
      name: 'AdminView',
      component: AdminView,
      meta: { requiresAuth: true , requiresAdmin: true},
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !store.state.user) {
    next('/login') // Si la ruta requiere autenticación y no hay usuario, redirige a login
  }else if (requiresAdmin && (!store.state.user || store.state.user.rol !== 'admin')){
    next('/');
  }
  else {
    next() // De lo contrario, permite que la navegación continúe
  }
})

export default router
