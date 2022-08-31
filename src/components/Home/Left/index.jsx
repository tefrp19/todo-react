import "./index.css"
import avatar from "../img/avatar.png"
import {useEffect, useState} from "react";
import axios from "axios";
import User from "./User";
import {addGroupApi, getGroups, getGroupsApi} from "../../../api/group";
import {message} from "antd";
import {GroupItem} from "./GroupItem";


export default function Left({setNowGroupName, setIsGroupPage, setTasks}) {
    const [groups, setGroups] = useState([])
    const [newGroupName, setNewGroupName] = useState('')
    useEffect(() => {
        async function getGroups() {
            const {data: groups} = await getGroupsApi()
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
            const {data: {newGroupId}} = await addGroupApi(data)
            message.success('添加分组成功')
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
                <GroupItem key={-1} groupId={-1} groupIcon={'fa-sun-o'} groupName={'我的一天'}
                           setNowGroupName={setNowGroupName} setTasks={setTasks}
                           setIsGroupPage={setIsGroupPage}/>
                <GroupItem key={-2} groupId={-2} groupIcon={'fa-star-o'} groupName={'重要'}
                           setNowGroupName={setNowGroupName} setTasks={setTasks}
                           setIsGroupPage={setIsGroupPage}/>
            </ul>
            <ul className="groups">
                {
                    groups.map(group => <GroupItem key={group.id} groupId={group.id} groupIcon={'fa-bars'}
                                                   groupName={group.name} setNowGroupName={setNowGroupName}
                                                   setTasks={setTasks}
                                                   setIsGroupPage={setIsGroupPage}/>
                    )
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