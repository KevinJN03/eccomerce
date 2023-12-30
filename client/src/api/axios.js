import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const defaultAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

const adminAxios = axios.create({
    baseURL: BASE_URL + '/admin',
    withCredentials: true,
});

// adminAxios.interceptors.response.use(
//     function (response) {
//         // console.log('response: ', response);

//         return response;
//     },
//     function (error) {
//         console.log('error here: ', { error });
//         // if (error.response?.status == 401) {
//         //     console.log({ 401: true });
//         //     window.location.replace(`/admin/login`);
//         // }

//         return Promise.reject(error);
//     }
// );

// defaultAxios.interceptors.response.use(function (response) {
//     console.log('response: ', response);

//     // return response;
// });

export { defaultAxios as default, adminAxios };
