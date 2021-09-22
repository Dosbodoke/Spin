import { getAPI } from '@/axios-api'

const accountStore = {
    namespaced: true,
    state: {
      accessToken: null,
      refreshToken: null,
      firstName: null,
      lastName: null,
    },
    mutations: {
      updateToken(state, { access, refresh }) {
        state.accessToken = access
        state.refreshToken = refresh
      },
      updateUserCredentials(state, { firstName, lastName }) {
        state.firstName = firstName
        state.lastName = lastName
      }
    },
    actions: {
      userLogin(context, userCredentials) {
        return new Promise ((resolve, reject) => {
          getAPI.post('auth/api-token/', {
            email: userCredentials.email,
            password: userCredentials.password
          })
            .then(response => {
              context.commit('updateToken', {
                access: response.data.access,
                refresh: response.data.refresh,
              })
              context.commit('updateUserCredentials', {
                firstName: response.data.first_name,
                lasName: response.data.last_name,
              })
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