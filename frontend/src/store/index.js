import { createStore } from 'vuex'
import { accountStore } from './account-store'
import { roomStore } from './room-store'

export default createStore({
  modules: {
    account: accountStore,
    room: roomStore
  },
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  },
})
