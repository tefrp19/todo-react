import instance from "../../api/app";
import {message} from "antd";
import {loginApi, registerApi} from "../../api/user";

export default function RegisterForm({setUserLogin}) {
    async function handleSubmit(e) {
        e.preventDefault() // 阻止表单默认提交
        const [{value: username}, {value: password}] = e.target // 嵌套解构赋值
        const data = {username, password}
        const res = await registerApi(data)
        if (res.status === 200) {
            await loginApi(data)
            localStorage.setItem('userLogin', 'userLogin')
            setUserLogin(true)
            message.success('注册成功')
        } else {
            message.error(res.message)
        }
    }

    return <form className="register" onSubmit={handleSubmit}>
        <input className="text-input" type="text" placeholder="Username" required name="username"/>
        <div style={{opacity: 0.5}}>只能由字母、数字和下划线组成，且必须由字母或数字开头，长度最少1位最多10位</div>
        <input className="text-input" type="password" placeholder="Password" required
               name="password"/>
        <div style={{opacity: 0.5}}>长度为8-16位字符，只能包含如下特殊字符：-_.</div>
        <button className="text-input login-btn">REGISTER NOW</button>
    </form>
}

