
// import axios from "axios";
import siteConfig from '../config/site.config';

const ApiService = {
    init(){
        // Vue.use(VueAxios, axios);
        // axios.defaults.baseURL = siteConfig.apiUrl;
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