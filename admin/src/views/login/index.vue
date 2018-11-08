<template>
    <el-form status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="pass">
            <el-input type="text" v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登陆</el-button>
            <el-button @click="register">注册</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import api from '@/api'
    import Fetch from '../../utils/fetch.js'
    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    username: '张三',
                    password: '123'
                }
            }
        },
        methods: {
            login() {
               this.$store.dispatch('User/login',this.form).then(()=>{
                   console.log(this)
                   this.$router.push('/')
               })
            },
            register() {
               this.$store.dispatch('User/login',this.form).then(()=>{
                   console.log(this)
                   this.$router.push('/home')
               })
                // console.log('注册')
            }
        }
    }
</script>