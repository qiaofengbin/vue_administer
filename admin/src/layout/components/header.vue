<template>
    <header class="header-bar">
        <el-header class="header-info" style="text-align: right; font-size: 12px">
            <div class="info">
                <img :src="info.img" alt="">
                <h3>{{info.username}}</h3>
            </div>
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <div class="header-des">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item 
                :to="{ path: '/' }"
                v-for="(item,index) in $route.matched"
                :key="index"
                >
                   <router-link :to="item.path"> {{item.meta.title}}</router-link>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <h2>{{$route.meta.title}}</h2>
        </div>
    </header>
</template>
<script>
    import api from '@/api'
    import {mapState} from 'vuex'
    export default {
        name: 'Header',
        data(){
            return {
                info:[]
            }
        },
        computed:{
            ...mapState(['User/userInfo'])
        },
        created(){
            this.getUserInfo()
        },
        methods:{
            getUserInfo(){
                // this.$store.dispatch('User/info')
                api.user.info().then((res)=>{
                   this.info=res.data
                })
            }
        }
    }
</script>
<style scoped lang="less">
    .header-bar {
        border-bottom: 1px solid #ccc;
        background: #fff;
        .header-des {
            text-align: left;
            padding: 10px;
            h2 {
                font-size: 18px;
                color: #000;
                font-weight: 800;
                line-height: 1.5;
            }
        }
        .info{
            img{
                width:30px;
                height: 30px;
                border-radius:50%;
                vertical-align:middle;
            }
            h3{
                display: inline;
            }
        }
    }
</style>