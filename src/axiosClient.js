import axios from "axios"
import { Toast } from "./SweetAlert.js"
import store from "/src/store"
import router from "/src/router"

const _axiosClient = axios.create({
  baseURL: import.meta.env.APP_BASE_URL,
  // httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Ignore certificate warnings in development.
  timeout: 2000,
  headers: { "X-Custom-Header": "foobar" },
})

export function inst() {
  return _axiosClient
}

/**
 * @param {*} url
 * @param {*} method
 * @param {*} o put rest parameters in this configuration file
 */
export const HTTP = (method, url, o = {}) => {
  o.method = method
  o.url = url
  if (o.data) o.data = JSON.stringify(o.data)
  if (["post"].includes(o.method.toLowerCase())) o.headers = { "Content-Type": "application/json" }
  _axiosClient(o).finally(() => o.finalCallback?.())
}

const excludePatterns = [/\/user\/(login|signup|refresh|parse)/, /\/(category|product)\/findAll/]
// const excludePatterns = [/^\/user\/(login|signup|refresh)/, /^\/user\/signup/, /^\/user\/refresh/]
_axiosClient.interceptors.request.use(
  (config) => {
    if (!excludePatterns.some((p) => p.test(config.url))) {
      console.log("add header to " + config.url)
      // Add the Authorization header dynamically
      const accessToken = localStorage.getItem("accessToken")
      if (accessToken?.length) config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

// Axios Response Interceptor
_axiosClient.interceptors.response.use(
  (resp) => {
    // 200-Succeed, 201-Created
    if ([200, 201].includes(resp.status)) {
      if (["post", "put", "delete"].includes(resp.config.method)) {
        if (!resp.config.noToast) {
          Toast.success(resp.data.message)
        }
      }
      // 203-Non Authoritative
    } else if ([203].includes(resp.status)) {
      Toast.error(resp.data.message)
    } else {
      Toast.error("Unknown status [" + resp.status + "]. Please contact technical support!")
    }
    resp.config?.resolve(resp.data)
    return resp
  },
  (e) => {
    if ([401].includes(e.response?.status)) {
      return handleUnauthorizedError(e)
    } else {
      translateECode(e)
      transferRespMsg(e)
      Toast.error(e.message, e.code)
    }
    if (e.config?.reject) e.config.reject(e)
    return Promise.reject(e)
  }
)

function translateECode(e) {
  switch (e.code) {
    case "ECONNABORTED":
      e.code = "Connection Failed!"
      break
    case "ERR_BAD_REQUEST":
      e.code = "Oops!!!"
      break
    case "ERR_BAD_RESPONSE":
      e.code = "Sorry, we've reported some error!"
      break
    case "ERR_NETWORK":
      e.code = null
      break
    default:
      break
  }
}

function transferRespMsg(e) {
  // Message from backend: e.response.data.message // AxiosError: e.code  e.message
  if (e.response?.data?.message) {
    e.message = e.response.data.message
  }
}

let subscribers = []
const subscribe = (cb) => subscribers.push(cb)
const onRefreshed = (newToken) => subscribers.forEach((cb) => cb(newToken))
let isRefreshing = false
let lastRefreshedTimeMs = new Date(0).getTime() // init with UNIX epoch time
function handleUnauthorizedError(e) {
  const originalReq = e.config
  const resp = e.response
  // If refreshToken is also expired or invalid, force Login
  // For other unauthorized errors (neither accessExpired or refreshExpired), force Login
  if (resp.data.errorCode !== "ACCESS_EXPIRED" || resp.data.errorCode === "REFRESH_EXPIRED") {
    router.push({ name: "Login" })
    return
  }
  // For accessTokenExpired errors, refresh using refreshToken
  // no more than one retry for every request
  if (originalReq._retried) return
  originalReq._retried = true
  // later requests will be queued, in case of duplicate refreshing
  if (isRefreshing)
    return new Promise((resolve, reject) => {
      subscribe((newToken) => {
        originalReq.headers["Authorization"] = `Bearer ${newToken}`
        try {
          resolve(_axiosClient(originalReq))
          // console.log("--- rest retried.")
        } catch (e) {
          reject(e)
        }
      })
    })
  // For later 401 responses that came right after the success refreshing, just retry with new token
  if (new Date().getTime() - lastRefreshedTimeMs < 10000) {
    const newAccessTk = localStorage.getItem("accessToken")
    originalReq.headers["Authorization"] = `Bearer ${newAccessTk}`
    _axiosClient(originalReq) // todo : what if the retry errors again ???  return new Promise((resolve, reject) => axios(req).then(resp=>resolve(resp).catch(e=>reject(e)))
    return
  }
  isRefreshing = true
  // the first request execute refreshing
  HTTP("post", "/user/refresh", {
    data: { refreshToken: localStorage.getItem("refreshToken") },
    resolve: (resp) => {
      // set authenticated.
      store.dispatch("auth/onRefreshTokenSuccess", resp)
      const newAccessTk = resp.accessToken
      // First retry self
      originalReq.headers["Authorization"] = `Bearer ${newAccessTk}`
      _axiosClient(originalReq) // todo : what if the retry errors again ???
      // console.log("--- self retried.")
      // Then retry later requests
      onRefreshed(newAccessTk)
      lastRefreshedTimeMs = new Date().getTime()
    },
    finalCallback: () => (isRefreshing = false),
  })
}
