import {UserLoginContext} from "../App";
import {useContext} from "react";
import {login} from "../../api/user";
import axios from "axios";
import instance from "../../api/app";

export default function LoginForm() {
    const setUserLogin = useContext(UserLoginContext)

    async function handleSubmit(e) {
        e.preventDefault() // 阻止表单默认提交
        const [{value: username}, {value: password}] = e.target // 嵌套解构赋值
        const data = {username, password}
        // const res = await axios.post('http://127.0.0.1:3000/login', data)
        try{
        const res =await instance.post('/login', data)

        if (res.data.status === 200) {
            localStorage.setItem('userLogin', 'userLogin')
            setUserLogin(true)
        } else {
            alert(res.data.message)
        }

        }catch (e) {
            console.log(e)
        }

    }

    return <form className="login" onSubmit={handleSubmit} method='post'>
        <input className="text-input" type="text" placeholder="Username" name="username" required/>
        <input className="text-input" type="password" placeholder="Password" name="password" required/>
        <button className="text-input login-btn">LOGIN NOW</button>
    </form>

}

