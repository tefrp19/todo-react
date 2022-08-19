import React, {useEffect, useState} from "react";
import PreHome from "./PreHome";
import Home from "./Home";
import {useUserLogin} from "../api/app";

export const UserLoginContext = React.createContext(false) // 创建全局context，用于判定用户登录状态

export default function App() {
    const [userLogin, setUserLogin] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('userLogin')) {
            setUserLogin(true)
        } else {
            setUserLogin(false)
        }
    }, [])

    return <UserLoginContext.Provider value={setUserLogin}>
        {userLogin ?
            <Home/> :
            <PreHome/>
        }
    </UserLoginContext.Provider>

}