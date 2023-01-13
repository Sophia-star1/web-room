import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({});
// service.interceptors.request.use(
//   (config) => {
//     if (localStorage.getItem('token')) {
//       if (isTokenTimeOut()) {
//         const store = useStore()
//         store.logout()
//         return Promise.reject(new Error('Token已失效'))
//       } else {
//         return config
//       }
//     } else {
//       return config
//     }
//   },
//   (error) => {
//     return Promise.reject(new Error(error))
//   }
// )
// service.interceptors.response.use(
//   (response) => {
//     const res = response.data;
//     if (res.data != undefined) {
//       const { data, meta } = res;
//       if (meta.status === 200 || meta.status === 201) {
//         ElMessage.success(meta.msg);
//         return data;
//       } else {
//         ElMessage.error(meta.msg);
//         return Promise.reject(new Error(meta.msg));
//       }
//     } else if (res.error_code != 0) {
//       return Promise.reject(new Error(res.error_msg));
//     } else {
//       return res;
//     }
//   },
//   (error) => {
//     return Promise.reject(new Error(error));
//   }
// );

export default service;
