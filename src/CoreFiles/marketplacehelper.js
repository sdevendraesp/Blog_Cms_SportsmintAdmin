import axios from 'axios'
import Cookies from 'js-cookie';
import config from './config';
const loginData = (!Cookies.get('loginSuccessMrMintAdminCms', { domain: 'mrmint.io' })) ? [] : JSON.parse(Cookies.get('loginSuccessMrMintAdminCms', { domain: 'mrmint.io' }));


const marketplaceServerPath = config.marketplaceServerPath;

export const request = (path, data, method) => {
    var options = {
        method: method,
        url: `${marketplaceServerPath}/${path}`,
        headers: {
            'Content-Type': 'application/json'
        },
        dataType: 'json'
    };
    if (loginData) {
        options.headers['Authorization'] = loginData?.authToken
    }
    if (method === 'GET') {
        options['params'] = data
    } else {
        options['data'] = data
    }
    let res = axios(options)
    res.then(res1 => { })
    return res
}

export const requestFormData = (path, data, method) => {
    var form_data = new FormData();
    for (var key in data) {
        form_data.append(key, data[key]);
    }
    var options = {
        method: method,
        url: `${marketplaceServerPath}/${path}`,
        data: form_data,
        headers: { authorization: loginData?.authToken },
    };
    let res = axios(options);
    res.then(res1 => { })
    return res
}

export const marketPlacePostRequest = async (path, data) => await request(path, data, 'POST')
export const marketPlacegetRequest = async (path, data) => await request(path, data, 'GET')
export const marketPlaceputRequest = async (path, data) => await request(path, data, 'PUT')
export const marketPlacedeleteRequest = async (path, data) => await request(path, data, 'DELETE')
export const marketPlacePostRequestFormData = async (path, data) => await requestFormData(path, data, 'POST')