import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://127.0.0.1:3000' });


api.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if  ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry)  {
      originalRequest._retry = true

      const refresh = window.localStorage.getItem('refreshToken')
      try {
        const response = await axios.post('/refreshToken', {
          refreshToken: refresh
        })
        const { accessToken, refreshToken } = response.data

        window.localStorage.setItem('accessToken', accessToken)
        window.localStorage.setItem('refreshToken', refreshToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        return api(originalRequest)
      } catch (err) {
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('refreshToken')
        router.push('/')
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
