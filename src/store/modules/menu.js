export default {
  state: {
    navBar: {
      active: '0',
      list: []
    }
  },
  getters: {},
  mutations: {
    //创建菜单
    createNavBar(state, menus) {
   /* let list = menus.map(item => {
        let submenu = item.children.map(v => {
          return {
            "id": v.id,
            "authName": v.authName,
            "path": v.path,
          }
        })
        return {
          "id": item.id,
          "authName": item.authName,
          "path": item.path,
          "children":submenu,
        }
      })
      state.navBar.list=list
      window.sessionStorage.setItem('navBar',JSON.stringify(state.navBar)) */
    }
  },
  actions: {}
}
