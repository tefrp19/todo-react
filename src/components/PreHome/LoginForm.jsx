import {UserLoginContext} from "../App";
import {useContext} from "react";
import {login, loginApi} from "../../api/user";
import axios from "axios";
import instance from "../../api/app";
import {message} from "antd";

export default function LoginForm() {
    const setUserLogin = useContext(UserLoginContext)

    async function handleSubmit(e) {
        e.preventDefault() // 阻止表单默认提交
        const [{value: username}, {value: password}] = e.target // 嵌套解构赋值
        const data = {username, password}
        const res = await loginApi(data)
        if (res.status === 200) {
            localStorage.setItem('userLogin', 'userLogin')
            setUserLogin(true)
            message.success('登录成功')
        } else {
            message.error(res.message)
        }


    }

    return <form className="login" onSubmit={handleSubmit} method='post'>
        <input className="text-input" type="text" placeholder="Username" name="username" required/>
        <input className="text-input" type="password" placeholder="Password" name="password" required/>
        <button className="text-input login-btn">LOGIN NOW</button>
    </form>

}

