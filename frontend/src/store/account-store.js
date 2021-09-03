import { getAPI } from '@/axios-api'

const accountStore = {
    namespaced: true,
    state: {
      accessToken: null,
      refreshToken: null,
    },
    mutations: {
      updateToken(state, { access, refresh }) {
        state.accessToken = access
        state.refreshToken = refresh
      },
    },
    actions: {
      userLogin(context, userCredentials) {
        return new Promise ((resolve, reject) => {
          getAPI.post('auth/api-token/', {
            email: userCredentials.email,
            password: userCredentials.password
          })
            .then(response => {
              context.commit('updateToken', { access: response.data.access, refresh: response.data.refresh })
              resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
      }
    },
    modules: {
    }
  }

export { accountStore }