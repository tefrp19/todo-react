import {modifyTaskApi} from "../../../api/task";

export function TaskItem(props) {
    const {taskInfo, tasks, setTasks, setShowRightColumn, setTaskDetail, setShowMask} = props
    const {id, checked, name, important} = taskInfo

    async function changeCheck() {
        const task = {id, check: checked ? 0 : 1}
        await modifyTaskApi(task)
        const target = tasks.find(task => task.id === id)
        target.check = target.check ? 0 : 1
        setTasks([...tasks])
    }

    async function changeImportant() {
        const task = {id, important: important ? 0 : 1}
        await modifyTaskApi(task)
        const target = tasks.find(task => task.id === id)
        target.important = target.important ? 0 : 1
        setTasks([...tasks])
    }

    function showTaskDetail() {
        setShowRightColumn(true)
        if (window.innerWidth <= 1200) {
            setShowMask(true)
        }
        const taskDetail = tasks.find(taks => taks.id === id)
        setTaskDetail(taskDetail)
    }

    return <li className="task-item">
        <div className="checkBox" onClick={changeCheck}>
            {checked ? null : <i className={`fa fa-circle-thin`}/>}
            <i className={`fa fa-check-circle${checked ? '' : '-o'}`}/>
        </div>
        <span className="task-name" onClick={showTaskDetail}>{name}</span>
        <div className="importance" style={important ? {color: '#0062cc'} : null} onClick={changeImportant}>
            <i className={`fa fa-star${important ? '' : '-o'}`}/>
        </div>
    </li>

}