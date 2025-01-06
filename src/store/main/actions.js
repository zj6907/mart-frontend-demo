import * as axiosClient from "/src/axiosClient.js"

export function loadCategories({ commit }, o = {}) {
  axiosClient.HTTP("get", import.meta.env.APP_CATEGORY_FIND_ALL, {
    resolve: (data) => {
      commit("setCategories", data)
      o.resolve?.(data)
    },
  })
}

export function loadProducts({ commit }) {
  axiosClient.HTTP("get", import.meta.env.APP_PRODUCT_FIND_ALL, {
    resolve: (data) => commit("setProducts", data),
  })
}

export function loadAllCollected({ commit }, o = {}) {
  axiosClient.HTTP("get", `/collected/findAll`, {
    resolve: (data) => {
      commit("setAllCollected", data)
      o.resolve?.(data)
    },
  })
}

export function loadCart({ commit }, o = {}) {
  axiosClient.HTTP("get", `/cartitem/findAll`, {
    resolve: (data) => {
      commit("setCart", data)
      o.resolve?.(data)
    },
  })
}
