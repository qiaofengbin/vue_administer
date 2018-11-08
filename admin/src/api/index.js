
import Fetch from '../utils/fetch'
const api = {
    user: {
        login: (data) => Fetch.post('/api/login',data),
        info:()=>Fetch.get('/api/user/info',{})
    },
    product:{
        list: (options) => Fetch.get('/api/product/list',options),
        status:({id,status})=>Fetch.post('/api/product/status',{id,status}),
        deleteList:({id})=>Fetch.post('/api/product/delete',{id:id})
    }
}
export default api