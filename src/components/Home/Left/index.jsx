import "./index.css"
import avatar from "../img/avatar.png"
import {useEffect, useState} from "react";
import axios from "axios";


export default function Left() {
    const [groups, setGroups] = useState(null)

    useEffect(() => {
        async function getGroups() {

            const {data: {data}} = (await axios.get('http://127.0.0.1:3000/groups'))
            console.log(data)
            data.forEach(item => {
                item.key = item.id
            })
            setGroups(data)
        }

        getGroups()
    }, [])

    return <aside className="leftColumn-exited">
        <div className="warpper">
            <div className="user">
                <div className="avatar">
                    <img src={avatar} alt="" srcSet=""/>
                </div>
                <div className="username">用户名</div>
                <ul className="account-crtl">
                    <li className="logout">
                        登出
                    </li>
                </ul>
            </div>
            <ul className="functions">
                <li className="group-item" data-id="-1"><i className="fa fa-sun-o"/><span>我的一天</span></li>
                <li className="group-item" data-id="-2"><i className="fa fa-star-o"/><span>重要</span></li>
            </ul>
            <ul className="groups">
                {
                    // groups.map(group =>
                    //     <li className="group-item" data-id="1"><i className="fa fa-bars"/> <span>{group.name}</span></li>
                    // )
                }
            </ul>
            <div className="addGroup group-item">
                <i className="fa fa-plus"/>
                <input placeholder="新建分组" value="" autoComplete="off"/>
            </div>
        </div>
    </aside>
}