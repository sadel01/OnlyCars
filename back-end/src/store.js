import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;
    }
  },
  plugins: [createPersistedState()],
});