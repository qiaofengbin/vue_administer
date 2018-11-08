<template>
    <el-container>
        <el-aside width="200px" class="app-menu">
            <div class="logo"><img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1533276214&di=37dec99b9581a54cd0bdb143ce54e23c&src=http://img.zcool.cn/community/013d9a554984e50000019ae98897c4.jpg" alt=""></div>
            <Menu />
        </el-aside>

        <el-container class="app-container">
            <Header />
            <el-main>
                <div class="page">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import Menu from './components/menu.vue'
    import Header from './components/header.vue'
    export default {
        name: 'HelloWorld',
        components:{
            Menu,
            Header
        }
    }
</script>
<style scoped lang="less">
    .el-container {
        height: 100%;
        .el-main {
            height: 100%;
        }
    }

    .logo {
        width: 100%;
        height: 50px;
        background: #e7fcfd;
        padding-top: 8px;
        img{
            width:50px;
            display:block;
            margin:0 auto;
        }
    }

    .app-menu {
        background: #e7fcfd;
        position: fixed;
        left: 0;
        bottom: 0;
        top: 0;
        height: 100%;
        overflow-x: hidden;
        box-shadow: 3px 0px 5px #9e9090;;
    }

    .app-container {
        margin-left: 200px;
        display: flex;
        flex-direction: column;
        background: #eee;
        height: 100%;
      
        .page {
            background: #fff;
            min-height: 100%;
        }
    }
</style>