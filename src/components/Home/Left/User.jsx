import avatar from "../img/avatar.png";
import {useContext, useEffect, useRef, useState} from "react";
import {UserLoginContext} from "../../App";
import {getUserApi, logoutApi} from "../../../api/user";

export default function User() {
    const [username, setUsername] = useState('用户名')
    const avatarRef = useRef(null) // 用于访问头像的下拉列表
    const imgRef = useRef(null) // 用于访问头像的下拉列表
    const [showAccountCrtl, setShowAccountCrtl] = useState(false) // 是否展示头像的下拉列表
    const setUserLogin = useContext(UserLoginContext)
    useEffect(() => {

        async function getUsername() {
            const {data: {username}} = await getUserApi()
            setUsername(username)
        }

        getUsername()
        document.addEventListener('click', function (e) {
            if (e.target !== avatarRef.current && e.target !== imgRef.current) {
                setShowAccountCrtl(false)
            }
        })

    }, [])

    function handleClick() {
        setShowAccountCrtl(true)
    }

    async function handleLogout() {
        await logoutApi()
        localStorage.removeItem('userLogin')
        setUserLogin(false)
    }

    return <div className="user">
        <div className="avatar" ref={avatarRef} onClick={handleClick}>
            <img src={avatar} ref={imgRef} alt="" srcSet=""/>
        </div>
        <div className="username">{username}</div>
        <ul className="account-crtl" style={showAccountCrtl ? {height: '2rem'} : {height: '0'}}>
            < li className="logout" onClick={handleLogout}>
                登出
            </li>
        </ul>
    </div>
}
