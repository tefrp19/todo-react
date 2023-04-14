import {modifyTaskApi} from "../../../../api/task";
import {message} from "antd";

export function TaskItem(props) {
    const {task, tasks, setTasks, setTaskDetailId, setView} = props
    const {id, check, name, important} = task

    async function changeCheck() {
        const task = {id, check: check ? 0 : 1}
        await modifyTaskApi(task)
        const target = tasks.find(task => task.id === id)
        target.check = target.check ? 0 : 1
        setTasks([...tasks])
        message.success('修改成功')
    }

    async function changeImportant() {
        const task = {id, important: important ? 0 : 1}
        await modifyTaskApi(task)
        const target = tasks.find(task => task.id === id)
        target.important = target.important ? 0 : 1
        setTasks([...tasks])
        message.success('修改成功')
    }

    function showTaskDetail() {
        setView(view => ({
            ...view,
            showRightColumn: true,
        }))

        if (window.innerWidth <= 1200) {
            setView(view => ({
                ...view,
                showMask: true,
            }))
        }

        setTaskDetailId(id)
    }

    return <li className="task-item">
        <div className="checkBox" onClick={changeCheck}>
            {check ? null : <i className={`fa fa-circle-thin`}/>}
            <i className={`fa fa-check-circle${check ? '' : '-o'}`}/>
        </div>
        <span className="task-name" onClick={showTaskDetail}>{name}</span>
        <div className="importance" style={important ? {color: '#0062cc'} : null} onClick={changeImportant}>
            <i className={`fa fa-star${important ? '' : '-o'}`}/>
        </div>
    </li>

}