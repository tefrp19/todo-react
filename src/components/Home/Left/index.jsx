import "./index.css"
import avatar from "../img/avatar.png"
import {useEffect, useState} from "react";
import axios from "axios";
import User from "./User";


export default function Left() {
    const [groups, setGroups] = useState(null)
    const [newGroupName, setNewGroupName] = useState('')
    useEffect(() => {
        async function getGroups() {
            const {data: {data: groups}} = (await axios.get('http://127.0.0.1:3000/groups'))
            setGroups(groups)
        }

        getGroups()
    }, [])

    function handleChange(e) {
        setNewGroupName(e.target.value)
    }

    async function addNewGroup() {
        if (newGroupName) {
            const data = {name: newGroupName}
            const {data: {data: {newGroupId}}} = (await axios.post('http://127.0.0.1:3000/groups', data))
            // console.log('新增分组：', newGroupName);
            const newGroup = {id: newGroupId, name: newGroupName}
            setGroups([...groups, newGroup])
        }
        setNewGroupName('')
    }

    // 回车触发事件
    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            addNewGroup()
        }
    }

    return <aside className="leftColumn-exited">
        <div className="warpper">
            <User/>
            <ul className="functions">
                <li className="group-item" data-id="-1"><i className="fa fa-sun-o"/><span>我的一天</span></li>
                <li className="group-item" data-id="-2"><i className="fa fa-star-o"/><span>重要</span></li>
            </ul>
            <ul className="groups">
                {
                    groups ?
                        groups.map(group =>
                            <li className="group-item" data-id="1" key={group.id}>
                                <i className="fa fa-bars"/>
                                <span>{group.name}</span>
                            </li>
                        ) : null
                }
            </ul>
            <div className="addGroup group-item">
                <i className="fa fa-plus"/>
                <input placeholder="新建分组" value={newGroupName} autoComplete="off" onChange={handleChange}
                       onBlur={addNewGroup} onKeyDown={handleKeyDown}/>
            </div>
        </div>
    </aside>
}