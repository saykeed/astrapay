import { createStore } from 'vuex'

export default createStore({
  state: {
    notificationMsg: null,
    notificationStatus: false
  },
  getters: {
  },
  mutations: {
      showNotification(state, payload) {
        state.notificationMsg = payload
        state.notificationStatus = true
      },
      closeNotification(state, payload) {
        state.notificationStatus = false
      }
  },
  actions: {
  },
  modules: {
  }
})
