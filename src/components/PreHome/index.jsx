import './index.css'
import {useEffect, useState} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./Register";
import {UserLoginContext} from "../App";

export default function PreHome() {
    const [isLoginPage, setIsLoginPage] = useState(true) // 当前页面是登录页或者注册页
    useEffect(()=>{
    document.title = isLoginPage ? '登录todo' : '注册todo'

    })

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
                <UserLoginContext.Consumer>
                    {
                        value => isLoginPage ? <LoginForm setUserLogin={value}/> : <RegisterForm setUserLogin={value}/>
                    }
                </UserLoginContext.Consumer>


            </div>
        </div>
    </main>

}