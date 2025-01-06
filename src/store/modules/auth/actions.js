import * as axiosClient from "/src/axiosClient"

export function logout({ commit }, o = {}) {
  removeTokens()
  window.location.href = "/" // this will go to root page and clear all the state
}

export function onLoginSuccess({ commit, state }, o = {}) {
  saveTokens(o)
  setAuthenticated({ commit }, o)
  let to = "Home" // default to home page
  if (state.redirect && state.redirect.length) to = state.redirect // if need to redirect
  o.router.replace({ name: to, params: state.redirectData.params, query: state.redirectData.query })
  clearRedirectData({ commit })
}

export function onRefreshTokenSuccess({ commit }, o = {}) {
  saveTokens(o)
  setAuthenticated({ commit }, o)
}

export function clearAuthorities({ commit }, o = {}) {
  commit("setIsAuthenticated", false)
  commit("setRoles", [])
}
export function setAuthenticated({ commit }, o = {}) {
  commit("setIsAuthenticated", true)
  commit("setRoles", o.roles) // in the form of [{authority:"USER"}]
}

export function removeTokens() {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}
export function saveTokens(o = {}) {
  o.accessToken && localStorage.setItem("accessToken", o.accessToken)
  o.refreshToken && localStorage.setItem("refreshToken", o.refreshToken)
}

export function clearRedirectData({ commit }) {
  commit("setRedirect", null)
  commit("setRedirectData", null)
}

export function checkAuthentication({ commit }, o = {}) {
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken?.length) {
    axiosClient.HTTP("post", `/user/parse`, {
      noToast: true,
      data: { accessToken },
      resolve: (data) => {
        setAuthenticated({ commit }, { roles: data.roles })
        o.resolve?.(data)
      },
    })
  }
}
