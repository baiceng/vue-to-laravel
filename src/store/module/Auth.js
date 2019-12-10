import axios from 'axios'

export default {
  namespaced: true,
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success',
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    auth_logout(state) {
      state.status = '',
      state.token = '',
      state.user = {}
    },
    auth_refresh(state, token) {
      state.token = token
    }
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('/auth/login', user)
        .then(res => {
          const token = res.data.access_token
          const user = res.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(res)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('/auth/register', user)
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(res)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        commit('auth_logout')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    refresh({commit}, token) {
      return new Promise(() => {
        localStorage.token = token
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_refresh', token)
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
}