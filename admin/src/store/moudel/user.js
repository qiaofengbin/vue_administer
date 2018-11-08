import Fetch from '../../utils/fetch'
import api from '@/api'
import Router from '@/router'

const User = {
    namespaced: true,
    state: {
        isLogin: false,
        userInfo:{},
    },
    getters: {},
    mutations: {
        SET_LOGIN_STATUS(state, newVal) {
            state.isLogin = newVal;
        },
        SET_USER_INFO(state, newVal){
            // console.log(newVal)
            state.userInfo=newVal
        }
    },
    actions: {
        login({commit},{username,password}){
            api.user.login({username,password}).then((res)=>{
                commit('SET_LOGIN_STATUS',true)
                // console.log(res.data)
                commit('SET_USER_INFO',res.data)
                Router.push('/')
            })
        },
        info({commit}){
            api.user.info().then((res)=>{
                // console.log(res)
                commit('SET_LOGIN_STATUS',false)
                commit('SET_USER_INFO',res.data)
            })
        }
    }
}
export default User