import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: null,
    chat: null
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData
    },
    setChat(state, chatData) {
      state.chat = chatData
    }
  },
  plugins: [createPersistedState()],
});