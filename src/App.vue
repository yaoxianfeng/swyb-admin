<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
     //初始化用户信息
    this.$store.commit('initUser')
  }
}
</script>

<style scoped>
</style>
