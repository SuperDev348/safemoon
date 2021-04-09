
// import axios from "axios";
import siteConfig from '../config/site.config';

const ApiService = {
    init(){
        // Vue.use(VueAxios, axios);
        // axios.defaults.baseURL = siteConfig.apiUrl;
    },

    setHeader(){
        // axios.defaults.headers.common = {
        //     'X-Requested-With': 'XMLHttpRequest',
        //     "Authorization":`Bearer ${JwtService.getToken()}`
        // };
    },

    get(resource) {
        return fetch(`${siteConfig.apiUrl}/${resource}`);
        // return axios.get(`${siteConfig.apiUrl}/${resource}`).catch(error => {
        //     throw new Error(`[RWV] ApiService ${error}`);
        // });     
    },

    post(resource, params) {
        return fetch(`${siteConfig.apiUrl}/${resource}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(params)
        });
        // return axios.post(`${siteConfig.apiUrl}/${resource}`, params);
    },
};

export default ApiService;