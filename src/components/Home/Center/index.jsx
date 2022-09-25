import {useEffect, useRef, useState} from "react";
import {getTodayTasks, getTodayTasksApi} from "../../../api/task";
import {GroupToolbar} from "./GroupToolbar";

export default function Center({groups, setGroups, nowGroup, setNowGroup, tasks, setTasks}) {
    const [newTaskName, setNewTaskName] = useState('')

    useEffect(() => {
        document.title = '我的一天'

        async function getTodayTasks() {
            const {data} = await getTodayTasksApi()
            setTasks(data)

        }

        getTodayTasks()
    }, [])

    function handleChange(e) {
        setNewTaskName(e.target.value)
    }

    return <div className="contanier">
        <div className="mask"/>

        <GroupToolbar groups={groups} setGroups={setGroups} nowGroup={nowGroup} setNowGroup={setNowGroup} setTasks={setTasks}
        />

        <ul className="tasks">
            {
                tasks.map(task => {
                        if (!task.check) return <li className="task-item" key={task.id}>
                            <div className="checkBox">
                                <i className="fa fa-circle-thin"/>
                                <i className="fa fa-check-circle-o"/></div>
                            <span className="task-name">{task.name}</span>
                            <div className="importance" style={task.important ? {color: '#0062cc'} : null}><i
                                className={`fa fa-star${task.important ? '' : '-o'}`}/></div>
                        </li>
                    }
                )
            }
        </ul>
        <div className="splitLine">{`已完成 ${tasks.filter(task => task.check).length}`}</div>
        <ul className="tasks checked">
            {
                tasks.map(task => {
                        if (task.check) return <li className="task-item" key={task.id}>
                            <div className="checkBox">
                                <i className="fa fa-check-circle"/>
                            </div>
                            <span className="task-name">{task.name}</span>
                            <div className="importance" style={task.important ? {color: '#0062cc'} : null}><i
                                className={`fa fa-star${task.important ? '' : '-o'}`}/></div>
                        </li>
                    }
                )
            }
        </ul>
        <div className="addTask task-item" style={nowGroup.id > 0 ? {display: 'flex'} : {display: 'none'}}>
            <i className="fa fa-plus checkBox"/>
            <input placeholder="添加任务" value={newTaskName} autoComplete="off" onChange={handleChange}/>
        </div>
    </div>
}

