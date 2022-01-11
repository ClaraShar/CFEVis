import axios from 'axios'

//好像是红宝书上24章跨域请求资源
let config = {
    baseURL : '/api', //雨薇姐这里是‘/’
    transfromRequest: [
        function(data) {
            let ret = '';
            for(let it in data){
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }
    ],
    transfromResponse: [
        function(data) {
            return data
        }
    ],
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout: 10000,
    responseType: 'json'
}

axios.interceptors.response.use(function(res){
    return res.data
})

export function get(url){
    return axios.get(url, config)
}

export function post(url){
    return axios.post(url, config)
}