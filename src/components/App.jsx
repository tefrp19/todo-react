import React, {useEffect, useState} from "react";
import PreHome from "./PreHome";
import Home from "./Home";
import instance, {addUserLoginInterceptor, useUserLogin} from "../api/app";
import 'antd/dist/antd.css'
import './reset.css'

export const UserLoginContext = React.createContext(false) // 创建全局context，用于判定用户登录状态

export default function App() {
    const [userLogin, setUserLogin] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userLogin')) {
            setUserLogin(true)
        } else {
            setUserLogin(false)
        }

        addUserLoginInterceptor(setUserLogin)

    }, [])

    return <UserLoginContext.Provider value={setUserLogin}>
        {userLogin ?
            <Home/> :
            <PreHome/>
        }
    </UserLoginContext.Provider>

}