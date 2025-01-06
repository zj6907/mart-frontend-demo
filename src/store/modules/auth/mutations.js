export const setIsAuthenticated = (state, v) => (state.isAuthenticated = v)
export const setRoles = (state, v) => (state.roles = v)
export const setPreviousRoute = (state, v) => (state.previousRoute = v)
export const setRedirect = (state, v) => (state.redirect = v)
export const setRedirectData = (state, router) =>
  (state.redirectData = router ? { params: router.currentRoute.value.params, query: router.currentRoute.value.query } : null)
