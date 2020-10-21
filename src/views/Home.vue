<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <div>
        <span style="font-weight: 100; margin: 0 10px; font-size: 14px;">{{navBar}}{{user.username}}</span>
        <span style="font-weight: 100; margin: 0 10px; font-size: 14px;">{{user.email}}</span>
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="togleCollapse">|||</div>
        <el-menu
        background-color="#333744"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activePath"
        unique-opened
        :collapse-transition="false"
        :router="true"
        :collapse="isCollapse">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"
            @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { mapState, mapMutations} from 'vuex'
  import { menus } from '../api/menu';
  console.log(menus)
export default {
  data () {
    return {
      userinfo: {},
      menuList: [],
      // 默认不折叠
      isCollapse: false,
      // 被激活的连接地址
      activePath: '',
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      }
      // 左侧菜单数据
    }
  },
  created () {
    //较原始的方法
   /* const info = window.sessionStorage.getItem('userinfo')
    this.userinfo = JSON.parse(info) */
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  computed:{
    ...mapState({
      user:state=>state.user.user,
      navBar:state=>state.menu.navBar
    })
  },

  methods: {

    // 菜单的折叠与展开
    togleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      debugger
      // 清空token
      /*window.sessionStorage.clear()*/
      //第二种方法从仓库中提取
      this.$store.commit('logout')
      this.$message('退出成功')
      this.$router.push('/login')
    },

    // 保存连接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    // 获取菜单
    async getMenuList () {
      let that=this
      const res = await menus()
      debugger
     if (res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
      that.menuList = res.data.data
    },

  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      height: 40px;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;

  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}
</style>
