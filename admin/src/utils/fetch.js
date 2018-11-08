

import Router from '@/router'
const format = (data) => {
    let str = '';
    for (let val in data) {
        if(typeof data[val] =='object'){
            str += `${val}=${JSON.stringify(data[val])}&`
        } else{
        str += `${val}=${data[val]}&`
        }
    }
    return str.slice(0, -1);
}
// format({name:'zs',age:12})
const ajaxCallback = {
    afterEach: () => { },
    beforeEach: () => { },
    successEach: () => { },
    errorEach: () => { },
}
const Fetch = (config) => {
    let options = {};
    let url = config.url;
    if (config.method == 'get') {
        options = {
            method: config.method
        }
        // console.log(format(config.data))
        url += `?${format(config.data)}`
    } else if (config.method == 'post') {
        options = {
            method: config.method,
            body: JSON.stringify(config.data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    ajaxCallback.beforeEach()
    return fetch(url, options).then(async (res) => {
        ajaxCallback.afterEach()
        if (res.ok) {
            ajaxCallback.successEach()
            return res.json()
        }
        const data = await res.json();
        ajaxCallback.errorEach(new Error(data.msg))
        if (res.status < 500) {
            if(res.status==400){
                Router.push('/login')
            }
            return Promise.reject(new Error(data.msg))
        }
        return Promise.reject(new Error('服务器繁忙，请稍后再试'))
    })
}
export default {
    ajaxCallback,
    get(url = '', data = {}) {
        return Fetch({
            method: 'get',
            url,
            data
        })
    },
    post(url = '', data = {}) {
        return Fetch({
            method: 'post',
            url,
            data
        })
    },
}