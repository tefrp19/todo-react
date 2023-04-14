import {useEffect, useRef, useState} from "react";
import {addTaskApi, getTodayTasks, getTodayTasksApi} from "../../../api/task";
import {GroupToolbar} from "./GroupToolbar";
import {message} from "antd";
import {TaskItem} from "./TaskList/TaskItem";
import {useBlurInput} from "../../../hooks/useBlurInput";
import TaskList from "./TaskList";
import {TODAY_GROUP_ID} from "../index";

export default function Center(props) {
    const {
        view,
        setView,
        groups,
        setGroups,
        selectedGroupId,
        setSelectedGroupId,
        tasks,
        setTasks,
        setTaskDetailId,

    } = props
    const inputPros = useBlurInput(addTask)

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
        const showMask = () => {
            setView({
                showLeftColumn: false,
                showMask: false,
                showRightColumn: false,
            })
        }
        const maskNode = maskRef.current
        maskNode.addEventListener('click', showMask)
        return () => {
            maskNode.removeEventListener('click', showMask)
        }
    }, [])

    function addTask(newTaskName) {
        return new Promise((resolve, reject) => {
            const data = {groupId: selectedGroupId, name: newTaskName}
            resolve(addTaskApi(data))
        }).then(res => {
            const {data: {newTaskId}} = res
            const newTask = {
                id: newTaskId,
                name: newTaskName,
                group_id: selectedGroupId,
                check: 0,
                deadline: null,
                important: 0,
                note: null,
                today: 0
            }
            setTasks(tasks => [...tasks, newTask])
        })
    }

    return <div className="contanier">
        <div className="mask"
             style={view.showMask ? {display: 'block'} : {display: 'none'}} ref={maskRef}
        />

        <GroupToolbar groups={groups} setGroups={setGroups} selectedGroupId={selectedGroupId}
                      setSelectedGroupId={setSelectedGroupId}
                      setTasks={setTasks} setView={setView}
        />

        <TaskList tasks={tasks} setTasks={setTasks} setView={setView} setTaskDetailId={setTaskDetailId}/>
        <div className="addTask task-item"
             style={selectedGroupId > TODAY_GROUP_ID ? {display: 'flex'} : {display: 'none'}}>
            <i className="fa fa-plus checkBox"/>
            <input placeholder="添加任务" {...inputPros}/>
        </div>
    </div>
}

