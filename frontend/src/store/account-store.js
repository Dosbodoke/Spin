import { getAPI } from '@/axios-api'

const accountStore = {
    namespaced: true,
    state: {
      accessToken: null,
      refreshToken: null,
      username: null,
    },
    mutations: {
      updateToken(state, { access, refresh }) {
        state.accessToken = access
        state.refreshToken = refresh
      },
      updateUserCredentials(state, { username }) {
        state.username = username
      }
    },
    actions: {
      Login(context, userCredentials) {
        return new Promise ((resolve, reject) => {
          getAPI.post('api/auth/token/', {
            username: userCredentials.username,
            password: userCredentials.password
          })
            .then(response => {
              context.commit('updateToken', {
                access: response.data.access,
                refresh: response.data.refresh,
              })
              context.commit('updateUserCredentials', {
                username: userCredentials.username,
              })
              resolve()
            })
            .catch(error => {
              reject()
            })
        })
      },
      Register(context, userCredentials) {
        return new Promise ((resolve, reject) => {
          getAPI.post('api/auth/register/', {
            username: userCredentials.username,
            password: userCredentials.password
          })
            .then(response => {
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