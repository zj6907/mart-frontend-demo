import { createStore } from "vuex"
import state from "./main/state.js"
import * as getters from "./main/getters.js"
import * as mutations from "./main/mutations.js"
import * as actions from "./main/actions.js"
import auth from "./modules/auth"

const myStorePlugin = (store) => {
  store.subscribeAction((action, state) => {
    // if (action.type === "auth/logout") {}
    console.log(action)
    // Can check the authentication for every action here.
  })
}

const store = createStore({
  state: state,
  getters,
  mutations,
  actions,
  strict: true,
  modules: { auth },
  plugins: [myStorePlugin],
})

export default store
