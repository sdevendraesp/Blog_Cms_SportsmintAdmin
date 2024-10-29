import axios from 'axios'
import Cookies from 'js-cookie';
import config from './config';
const loginData = (!Cookies.get('loginSuccessMrMintAdmin')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMintAdmin'));

const serverPath = config.apiUrl;

const stepmintserverpath = config.stepmintserverpath;

const sportserverpath = config.sporturl;


export const request = (path, data, method, token) => {
    var options = {
        method: method,
        url: `${serverPath}/${path}`,
        headers: {
            'Content-Type': 'application/json',
            data
        },
        dataType: 'json'
    };

    if (token) {
        options.headers['Authorization'] = token.Authorization
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
export const sportrequest = (path, data, method , token) => {
    

    var options = {
        method: method,
        url: `${sportserverpath}/${path}`,
        headers: {
            'Content-Type': 'application/json'
        },
        dataType: 'json'
    };
    if (token) {
        options.headers['Authorization'] = token.Authorization
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

export const requestFormData = (path, data, method ,token) => {

    var form_data = new FormData();
    for (var key in data) {
        form_data.append(key, data[key]);
    }
    var options = {
        method: method,
        url: `${serverPath}/${path}`,
        data : form_data,
        headers: { authorization: token.Authorization },
    };
    let res = axios(options);
    res.then(res1 => { })
    return res
}

export const postRequest = async (path, data ,token) => await request(path, data, 'POST',token)
export const getRequest = async (path, data, token ) => await request(path, data, 'GET',token)
export const putRequest = async (path, data , token) => await request(path, data, 'PUT' ,token)
export const deleteRequest = async (path, data , token) => await request(path, data, 'DELETE',token)



export const postRequestFormData = async (path, data , token) => await requestFormData(path, data, 'POST',token)


export const postsportrequest = async (path, data ,token) => await sportrequest(path, data, 'POST',token)
export const getsportrequest = async (path, data, token ) => await sportrequest(path, data, 'GET',token)
export const putsportrequest = async (path, data , token) => await sportrequest(path, data, 'PUT' ,token)
export const deletesportrequest = async (path, data , token) => await sportrequest(path, data, 'DELETE',token)
