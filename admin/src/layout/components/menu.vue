<template>
    <el-menu
     :default-active="$route.path"
      background-color="#e7fcfd" 
      class="el-menu-vertical-demo" text-color="#26d7fb" active-text-color="#ffd04b"
        :router="true">
        <template v-for="(item,index) in menu">
            <el-menu-item :index="item.path" :key="index" v-if="!item.children">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
            <el-submenu :index="item.path" v-else :key="index">
                <template slot="title">
                    <i class="el-icon-message"></i>
                    <span>{{item.meta.title}}</span>
                </template>
                <el-menu-item v-for="(item2,index2) in item.children" :key="index2" :index="item.path+'/'+item2.path">{{item2.meta.title}}</el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</template>
<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                active:''
            }
        },
        computed: {
            menu() {
                let menuData = (routes) => {
                    return routes.filter((item, index) => {
                        // console.log(item.children)
                        if (routes.children) {
                            routes[index].children = menuData(item.children)
                        }
                        return item.meta && item.meta.isMenu
                    })
                }
                return menuData(this.$router.options.routes)
            }
        }
    }
</script>
<style scoped lang="less">
</style>