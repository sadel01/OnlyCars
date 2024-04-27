import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import comparison from './comparison'

export default createStore({
  modules: {
    comparison
  },
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
  plugins: [createPersistedState()]
})
