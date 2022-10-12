import {useEffect, useRef, useState} from "react";
import {addTaskApi, getTodayTasks, getTodayTasksApi} from "../../../api/task";
import {GroupToolbar} from "./GroupToolbar";
import {message} from "antd";
import {TaskItem} from "./TaskItem";

export default function Center({
                                   groups,
                                   setGroups,
                                   nowGroup,
                                   setNowGroup,
                                   tasks,
                                   setTasks,
                                   setShowRightColumn,
                                   setTaskDetail
                               }) {
    const [newTaskName, setNewTaskName] = useState('')
    const [showMask, setShowMask] = useState(false)

    useEffect(() => {
        document.title = '我的一天'

        async function getTodayTasks() {
            const {data} = await getTodayTasksApi()
            setTasks(data)
        }

        getTodayTasks()
    }, [])

    // 遮罩层绑定点击事件
    const maskRef = useRef()
    useEffect(() => {
        maskRef.current.addEventListener('click', () => {
            console.log(123)
            console.log(window.innerWidth)
            // if (window.innerWidth<1200){
            //     setShowMask(true)
            // }
            setShowMask(false)
        })

    }, [])

    function handleChange(e) {
        setNewTaskName(e.target.value)
    }

    async function addTask() {
        let newTask = {groupId: nowGroup.id, name: newTaskName}
        const {data: {newTaskId}} = await addTaskApi(newTask)
        setNewTaskName('')
        message.success('添加成功')
        newTask = {
            id: newTaskId,
            name: newTaskName,
            group_id: nowGroup,
            check: 0,
            deadline: null,
            important: 0,
            note: null,
            today: 0
        }
        setTasks([...tasks, newTask])
    }

    function handleBlur() {
        if (newTaskName !== '') addTask()
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            if (newTaskName === '') {
                message.error('任务名不能为空')
                return
            }
            addTask()
        }
    }

    return <div className="contanier">
        <div className="mask"
             style={showMask ? {display: 'block'} : {display: 'none'}} ref={maskRef}
        />

        <GroupToolbar groups={groups} setGroups={setGroups} nowGroup={nowGroup} setNowGroup={setNowGroup}
                      setTasks={setTasks}
        />

        <ul className="tasks">
            {
                tasks.map(task => {
                        if (!task.check) {
                            const taskIno = {id: task.id, checked: task.check, name: task.name, important: task.important}
                            return <TaskItem key={task.id} taskInfo={taskIno} tasks={tasks} setTasks={setTasks}
                                             setShowRightColumn={setShowRightColumn} setTaskDetail={setTaskDetail}/>
                        }

                    }
                )
            }
        </ul>
        <div className="splitLine">{`已完成 ${tasks.filter(task => task.check).length}`}</div>
        <ul className="tasks checked">
            {
                tasks.map(task => {
                        if (task.check) {
                            const taskIno = {id: task.id, checked: task.check, name: task.name, important: task.important}
                            return <TaskItem key={task.id} taskInfo={taskIno} tasks={tasks} setTasks={setTasks}
                                             setShowRightColumn={setShowRightColumn} setTaskDetail={setTaskDetail}/>
                        }
                    }
                )
            }
        </ul>
        <div className="addTask task-item" style={nowGroup.id > 0 ? {display: 'flex'} : {display: 'none'}}>
            <i className="fa fa-plus checkBox"/>
            <input placeholder="添加任务" value={newTaskName} autoComplete="off" onChange={handleChange} onBlur={handleBlur}
                   onKeyDown={handleKeyDown}/>
        </div>
    </div>
}

