import "./index.css"
import avatar from "../img/avatar.png"
import {useEffect, useState} from "react";
import axios from "axios";
import User from "./User";
import {addGroupApi, getGroups, getGroupsApi} from "../../../api/group";
import {message} from "antd";
import {GroupItem} from "./GroupItem";


export default function Left({groups, setGroups, setNowGroup, setTasks}) {
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
            const newGroup = {id: newGroupId, name: newGroupName}
            groups.push(newGroup)
            const newGroups = [...groups]
            setGroups(newGroups) // React会检测state的值是否变化来更新视图。由于数组是引用值，直接在原数组上修改元素，原数组的引用也不会改变，React则认为state未发生改变不会更新视图，正确做法是修改state后拷贝一份新的state再setState
            setNewGroupName('')
            message.success('添加分组成功')
        }
    }

    // 回车触发事件
    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            if (newGroupName === '') message.error('分组名不能为空')
            else addNewGroup()
        }
    }

    return <aside className="leftColumn-exited">
        <div className="warpper">
            <User/>
            <ul className="functions">
                <GroupItem key={-1} groupId={-1} groupIcon={'fa-sun-o'} groupName={'我的一天'}
                           setNowGroup={setNowGroup} setTasks={setTasks}
                />
                <GroupItem key={-2} groupId={-2} groupIcon={'fa-star-o'} groupName={'重要'}
                           setNowGroup={setNowGroup} setTasks={setTasks}
                />
            </ul>
            <ul className="groups">
                {
                    groups.map(group => <GroupItem key={group.id} groupId={group.id} groupIcon={'fa-bars'}
                                                   groupName={group.name} setNowGroup={setNowGroup}
                                                   setTasks={setTasks}
                        />
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