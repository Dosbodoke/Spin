import axios from 'axios'
import store from '@/store'

const getAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 1000,
})

// Interceptor to refresh access token if it's expired.
getAPI.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        console.log('Refreshing token')
        return store.dispatch('account/refreshToken')
          .then(data => {
              error.config.headers.Authorization = `Bearer ${data.accessToken}`
              return getAPI.request(error.config)
          })
    }
    return error
})

export { getAPI }