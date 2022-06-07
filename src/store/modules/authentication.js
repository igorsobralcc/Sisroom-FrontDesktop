import axios from 'axios'
import router from '@/router.js'
import SecureLS from 'secure-ls'

export default {
  namespaced: true,

  state: {
    singInUrl: 'http://localhost:8080/api/usuario/autenticar',
    ruleInUrl: process.env.VUE_APP_RULE_IN_URL,
    idToken: null,
    user: null,
    permissions: null,
  },

  getters: {
    user (state) {
      return state.user
    },

    permissions (state) {
      return state.permissions
    },

    isAuthenticated (state) {
      return state.idToken !== null
    },
  },

  actions: {
    login ({ state, commit }, authData) {
      var ls = new SecureLS()
      console.log('entrei no login', authData)

      axios
        .post(state.singInUrl, {
          email: authData.email,
          senha: authData.senha,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const tkHead = res.data.token
          console.log('logou:', `Bearer ${tkHead}`)
          axios.defaults.headers.common.Authorization = `Bearer ${tkHead}`
          commit('authUser', {
            token: tkHead,
          })

          ls.set('token', tkHead)

          router.push({ name: 'Dashboard' })
          console.log('vari: ', state.singInUrl)
        })
        .catch((error) => {
          console.log('erro aqui: ', error.response)
          return error.response
        })

      axios
        .get(state.ruleInUrl, {
          headers: {
            Authorization: `Bearer ${state.idToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log('resRule;', res)

          const permissionsKeys = Object.keys(res.data.permissions)

          for (
            let permission = 0;
            permission < permissionsKeys.length;
            permission++
          ) {
            res.data.permissions[permissionsKeys[permission]] = Boolean(
              res.data.permissions[permissionsKeys[permission]],
            )
          }

          commit('setUserAndPermissions', {
            user: res.data.user,
            permissions: res.data.permissions,
          })

          ls.set('user', JSON.stringify(res.data.user))
          ls.set('permissions', JSON.stringify(res.data.permissions))
        })
        .catch((error) => {
          return error.response
        })
    },

    logout ({ commit }) {
      var ls = new SecureLS()
      ls.removeAll()

      commit('clearData')

      router.push('/')
    },

    autoLogin ({ commit }) {
      var ls = new SecureLS()
      const token = ls.get('token')
      console.log('autoL: ', token)
      if (!token) {
        return
      }

      commit('authUser', {
        token: token,
      })

      ls = new SecureLS()

      commit('setUserAndPermissions', {
        user: JSON.parse(ls.get('user')),
        permissions: JSON.parse(ls.get('permissions')),
      })

      router.push('/dashboard')
    },
  },

  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
    },

    setUserAndPermissions (state, userAndPermissionsData) {
      state.user = userAndPermissionsData.user
      state.permissions = userAndPermissionsData.permissions
    },

    clearData (state) {
      state.idToken = null
      state.user = null
      state.permissions = null
    },
  },
}
