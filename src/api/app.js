import {UserLoginContext} from "../components/App";
import React, {useEffect, useState} from "react";

const ip = '127.0.0.1:3000'

// export function useUserLogin() {
//     const [userLogin, setUserLogin] = useState(false)
//     useEffect(() => {
//         if (localStorage.getItem('userLogin')) {
//             setUserLogin(true)
//         } else {
//             setUserLogin(false)
//         }
//     },[])
//     return [userLogin,setUserLogin]
// }

const fetchData = (path, method, params) => {
    return fetch(`//${ip}${path}`, {
        method,
        // 默认fetch请求不带上cookie
        credentials: "include",
        // 配置MIME请求类型，以保证服务端能正确解析json数据
        headers: {
            'Content-Type': 'application/json',
        },
        body: params ? JSON.stringify(params) : null,
    })
        .then(res => res.json())
        .then(res => {
            if (res.message === 'session无效，请登录') {
                setTimeout(() => {
                    // 1.删localStorage
                    // 2.改全局状态 ？如何
                    const setUserLogin = React.useContext(UserLoginContext)
                    console.log(setUserLogin)
                    // window.alert('session无效，请重新登录！')
                    // location.href = 'login.html'
                }, 2000)
            }
            return res
        })
};
export default fetchData