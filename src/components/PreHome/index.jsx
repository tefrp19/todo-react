import './index.css'
import {useState} from "react";

export default function PreHome() {
    const [isLoginPage, setIsLoginPage] = useState(true) // 当前页面是登录页或者注册页
    document.title = isLoginPage ? '登录todo' : '注册todo'

    return <main>
        <div className="cover"/>
        <div className="wrapper">
            <div className="container">
                <div className="header">
                    <div>
                        <strong>{isLoginPage ? '登录' : '注册'}todo</strong>
                    </div>
                    {isLoginPage ?
                        <div>
                            没有账号？<a href="#" onClick={() => setIsLoginPage(!isLoginPage)}>现在注册</a>
                        </div> :
                        <div>
                            已有账号？<a href="#" onClick={() => setIsLoginPage(!isLoginPage)}>现在登录</a>
                        </div>
                    }
                </div>

                <form className="login" action="http://127.0.0.1:8000/login" method="post">
                    <input className="text-input" type="text" placeholder="Username" name="username"/>
                    <input className="text-input" type="password" placeholder="Password" name="password"/>
                    <button className="text-input login-btn">{isLoginPage ? 'LOGIN NOW' : 'REGISTER NOW'}</button>
                </form>
            </div>
        </div>
    </main>

}