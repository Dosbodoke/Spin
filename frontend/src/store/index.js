import { createStore } from 'vuex'
import { accountStore } from './account-store'
import { contactStore } from './contact-store'

export default createStore({
  modules: {
    account: accountStore,
    contact: contactStore,
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
