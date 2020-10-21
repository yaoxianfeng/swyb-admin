export default {
  state: {
      user:{},    //存储用户信息
   		token:false,
      
  },

  getters: {},

  mutations: {
    // 初始化用户信息
    		initUser(state){
    			let user = window.sessionStorage.getItem('user')
    			if(user){
    				state.user = JSON.parse(user)
    				state.token = state.user.token
    			}
    		},

   login(state,user){
   			// 保存登录状态
   			state.user = user
   			state.token = user.token
   			// 存储到本地存储
   			window.sessionStorage.setItem('user',JSON.stringify(state.user))
   			window.sessionStorage.setItem('token',state.token)
   		},

    logout(state){
    		  state.user={}
    		  state.token=false
    		  window.sessionStorage.clear()


    }
  },

  actions: {
    setUserInfo({commit,initUser}){
      return new Promise(
        (resolve,reject)=>{
        //发送请求
      })
    }
  },
}
