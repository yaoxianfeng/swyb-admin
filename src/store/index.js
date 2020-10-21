import Vue from "vue"
import Vuex from "vuex"
import user from "./modules/user.js"
import menu from "./modules/menu.js"
Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		user,
    menu
	}
})
