import axios from 'axios'
import vueJwtDecode from 'vue-jwt-decode'
import Cookie from 'js-cookie'

export const state = () => ({
  idToken: null,
  user: null,
  newUser: null
})

export const mutations = {
  mutateLogin: (state, payload) => {
    state.idToken = payload.token
    state.user = payload.user
  },
  updateUser: (state, payload) => {
    state.user = payload.user
    state.newUser = payload.user
  },
  clearUser: (state) => {
    state.idToken = null
    state.user = null
    state.newUser = null
  },
}

export const actions = {
  updateLoginFB: (vuexContext, payload) => {
    // //console.log(payload)
    return new Promise((resolve, reject) => {
      //console.log(payload)
      //   if (Object.keys(payload).length !== 0 && payload.constructor === Object) {
      //console.log("vuexContext, payload",vuexContext, payload)
      if (payload) {
        axios.post("/facebook-signup-login", payload)
          .then((res) => {
            //console.log("got sucess fb token")
            //console.log(res)

            // setTimeout(() => {
            //    this.$router.replace("/"); 
            // }, 200);
            if (res.status == 200 && !res.data.error) {
              let token = res.data.access_token
              //console.log("res.data.access_token",res.data.access_token)
              let user = res.data.user
              let decoded_jwt = vueJwtDecode.decode(token)
              //console.log(decoded_jwt)
              //   let expiryTime = decoded_jwt.exp - decoded_jwt.iat
              Cookie.set('jwt', token)
              //   Cookie.set('expiresIn', new Date().getTime() + Number.parseInt(expiryTime) * 1000)
              Cookie.set('user', JSON.stringify(user))
              localStorage.setItem('token', token)
              localStorage.setItem('user', JSON.stringify(user))
              //   localStorage.setItem('expiresIn', new Date().getTime() + Number.parseInt(expiryTime) * 1000)
              vuexContext.commit('mutateLogin', { token: token, user: user })
              resolve(res)
              // this.$router.replace("/"); 
            }


          })
          .catch((err) => {
            //console.log("failed to send fb token")
            //console.log(err)
          })
      }
      else {
        //console.log("no fb token ")
      }


      //   }
    })
  },
  updateLogin: (vuexContext, payload) => {
    return new Promise((resolve, reject) => {
      if (Object.keys(payload).length !== 0 && payload.constructor === Object) {
        axios.post("/login", payload)
          .then((res) => {

            if (res.status == 200 && !res.data.error) {
              let token = res.data.access_token
              //console.log("res.data.access_token",res.data.access_token)
              let user = res.data.user
              let decoded_jwt = vueJwtDecode.decode(token)
              //console.log(decoded_jwt)
              let expiryTime = decoded_jwt.exp - decoded_jwt.iat
              Cookie.set('jwt', token)
              Cookie.set('expiresIn', new Date().getTime() + Number.parseInt(expiryTime) * 1000)
              Cookie.set('user', JSON.stringify(user))
              localStorage.setItem('token', token)
              localStorage.setItem('user', JSON.stringify(user))
              localStorage.setItem('expiresIn', new Date().getTime() + Number.parseInt(expiryTime) * 1000)
              vuexContext.commit('mutateLogin', { token: token, user: user })
              resolve(res)
            }
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  },
  initAuth(vuexContext, req) {
    let token
    let expiresIn
    let user

    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
      if (!jwtCookie) {
        return
      }

      token = jwtCookie.split('=')[1];
      const userCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('user='))
      if (!userCookie) {
        return
      }
      user = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
      // expiresIn = req.headers.cookie.split(';').find(c => c.trim().startsWith('expiresIn=')).split('=')[1]
    }
    else if (process.client) {
      token = localStorage.getItem('token')
      expiresIn = localStorage.getItem('expiresIn')
      user = JSON.parse(localStorage.getItem('user'))
    }

    if (new Date().getTime() > +expiresIn) {
      vuexContext.dispatch('updateLogout', req)
      return
    }
    if (!token) {
      Cookie.remove('jwt')
      Cookie.remove('expiresIn')
      Cookie.remove('user')
      if (process.browser) {
        localStorage.removeItem('token')
        localStorage.removeItem('expiresIn')
        localStorage.removeItem('user')
      }
      return
    }
    vuexContext.commit('mutateLogin', { token: token, user: user })
  },

  updateLogout(vuexContext, req) {
    Cookie.remove('jwt')
    Cookie.remove('expiresIn')
    Cookie.remove('user')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('expiresIn')
      localStorage.removeItem('user')
    }
    vuexContext.commit('clearUser')
  },
  changePassword(vuexContext, payload) {
    return new Promise((resolve, reject) => {
      axios
        .patch("/set-new-password", payload.userDetails, {
          headers: {
            Authorization: "Bearer " + payload.token
          }
        })
        .then(res => {
          console.log(res)
          let token = res.data.access_token
          let user = res.data.user
          let decoded_jwt = vueJwtDecode.decode(token)
          let expiryTime = decoded_jwt.exp - decoded_jwt.iat
          Cookie.set('jwt', token)
          Cookie.set('expiresIn', new Date().getTime() + Number.parseInt(expiryTime) * 1000)
          Cookie.set('user', JSON.stringify(user))
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('expiresIn', new Date().getTime() + Number.parseInt(expiryTime) * 1000)
          vuexContext.commit('mutateLogin', { token: token, user: user })
          vuexContext.dispatch('notification_alert/updateNotification', res.data, { root: true })
          resolve(res)
        })
        .catch(err => {
          if (err && err.response && err.response.data) {
            vuexContext.dispatch('notification_alert/updateNotification', err.response.data, { root: true })
          }
          reject(err)
        });
    })
  }
}

export const getters = {
  isAuthenticated: state => {
    return state.idToken != null
  },
  getUser: state => {
    return state.user
  },
  getnewUser: state => {
    return state.newUser
  },
  idToken: state => {
    return state.idToken
  }
}
