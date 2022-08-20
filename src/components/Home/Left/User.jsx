import avatar from "../img/avatar.png";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

export default function User() {
    const [username, setUsername] = useState('用户名')
    const avatarRef = useRef(null) // 用于访问头像的下拉列表
    const accountCrtlRef = useRef(null) // 用于访问头像的下拉列表
    const [showAccountCrtl, setShowAccountCrtl] = useState(false) // 是否展示头像的下拉列表

    useEffect(() => {
        console.log('useEffect')

        async function getUsername() {
            const {data: {data: {username}}} = (await axios.get('http://127.0.0.1:3000/user'))
            setUsername(username)
        }

        getUsername()
        document.addEventListener('click', function (e) {
            // console.log(e.target);
            // console.log(avatarRef);
        })

    }, [])

    function handleClick() {
        setShowAccountCrtl(true)
    }

    return <div className="user">
        <div className="avatar" ref={avatarRef} onClick={handleClick}>
            <img src={avatar} alt="" srcSet=""/>
        </div>
        <div className="username">{username}</div>
        <ul className="account-crtl" ref={accountCrtlRef} style={showAccountCrtl ? {height: '2rem'} : {height: '0'}}>
            < li className="logout">
                登出
            </li>
        </ul>
    </div>
}
