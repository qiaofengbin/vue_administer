<template>
    <div id="app">
      <BaseLayout v-if="isLogin"/>
      <UserLayout v-else />
    </div>
  </template>
  
  <script>
    import('../static/css/reset.css');
    import BaseLayout from './layout/base.layout'
    import UserLayout from './layout/user.layout'
    import {mapState} from 'vuex'
    export default {
      name: 'App',
      data(){
        return {
          // isLogin:true
        }
      },
     created(){
        // ...mapState()
     },
      computed:{
        isLogin(){
          return this.$store.state.User.isLogin
        }
      },
      components:{
        BaseLayout,
        UserLayout
      }
    }
  </script>
  
  <style scoped lang="less">
  
  </style>