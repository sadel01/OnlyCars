// comparison.js
export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    setList(state, list) {
      state.list = list
    }
  }
}
