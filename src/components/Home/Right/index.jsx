import {deleteTaskApi, getImportantTasksApi, getTodayTasksApi, modifyTaskApi} from "../../../api/task";
import {message, Modal} from "antd";
import {deleteGroupApi} from "../../../api/group";

export default function Right(props) {
    const {
        showRightColumn,
        setShowRightColumn,
        taskDetail,
        tasks,
        setTaskDetail,
        setTasks,
        nowGroup,
    } = props
    const {id, name, check, important, deadline, today, note} = taskDetail

    async function changeChecked() {
        await changeStatus('check')
    }

    async function modifyName(e) {
        const newName = e.target.textContent
        if (newName !== name) {
            taskDetail.name = newName
            await modifyTaskApi(taskDetail)
            setTaskDetail({...taskDetail})
            tasks.find(task => task.id === id).name = taskDetail.name
            setTasks([...tasks])
            message.success('修改成功')
        }
    }

    async function changeImportant() {
        await changeStatus('important')
        // 如果当前分组为“重要分组”则重新获取数据更新视图
        if (nowGroup.id === -2) {
            const newTasks = (await getImportantTasksApi()).data
            setTasks(newTasks)
            setShowRightColumn(false)
        }
    }

    async function modifyDeadline(e) {
        taskDetail.deadline = e.target.value
        await modifyTaskApi(taskDetail)
        setTaskDetail({...taskDetail})
        message.success('修改成功')
    }

    async function changeToday() {
        await changeStatus('today')
        // 如果当前分组为“今天分组”则重新获取数据更新视图
        if (nowGroup.id === -1) {
            const newTasks = (await getTodayTasksApi()).data
            setTasks(newTasks)
            setShowRightColumn(false)
        }
    }

    async function changeStatus(status) {
        taskDetail[status] = taskDetail[status] ? 0 : 1
        await modifyTaskApi(taskDetail)
        // 修改右列视图
        setTaskDetail({...taskDetail})
        tasks.find(task => task.id === id)[status] = taskDetail[status]
        // 修改中间列视图
        setTasks([...tasks])
        message.success('修改成功')
    }

    let oldNote

    function handleFocus(e) {
        oldNote = e.target.value
    }

    async function modifyNote(e) {
        const newNote = e.target.value
        if (newNote !== oldNote) {
            taskDetail.note = newNote
            await modifyTaskApi(taskDetail)
            setTaskDetail({...taskDetail})
            message.success('修改成功')
        }
    }

    function deleteTask() {
        const {confirm} = Modal;
        confirm({
            title: '确定删除？',
            okText: '确定',
            cancelText: '取消',
            okType: 'danger',

            async onOk() {
                await deleteTaskApi(id)
                const index = tasks.findIndex(task => task.id === id)
                tasks.splice(index, 1)
                setTasks([...tasks])
                message.success('删除成功')
                setShowRightColumn(false)
            },

        });
    }

    return <div className={`task-detail ${showRightColumn ? 'rightColumn-entered' : 'rightColumn-exited'}`}>
        <div className="warpper">
            <div className={`detail-header task-detail-item ${check ? 'checked' : ''}`}>
                <div className="checkBox" onClick={changeChecked}>
                    {check ?
                        <i className="fa fa-check-circle"/> :
                        <>
                            <i className="fa fa-circle-thin"/>
                            <i className="fa fa-check-circle-o"/>
                        </>
                    }
                </div>
                <div className="modify-task-name" contentEditable="true" suppressContentEditableWarning
                     onBlur={modifyName}
                >{name}
                </div>
                <div className="importance" onClick={changeImportant}>
                    {
                        important ?
                            <i className="fa fa-star" style={{color: '#0062cc'}}/>
                            : <i className="fa fa-star-o"/>
                    }

                </div>
            </div>

            <div className="modify-deadline task-detail-item">
                <input type="date" name="deadline"  value={deadline||''} onChange={modifyDeadline}/><br/>
            </div>
            <button className="add-to-today task-detail-item" style={today ? {color: '#0062cc'} : null}
                    onClick={changeToday}>
                <i className="fa fa-sun-o"/>
                <span>{today ? '取消添加到“我的一天”' : '添加到“我的一天”'}</span>
            </button>

            <textarea className="modify-note task-detail-item" value={note||''} autoComplete="off" placeholder="添加备注"
                      onChange={(e) => {
                          taskDetail.note = e.target.value
                          setTaskDetail({...taskDetail})
                      }
                      } onFocus={handleFocus} onBlur={modifyNote}/>
            <button className="delete-task task-detail-item" onClick={deleteTask}>
                <i className="fa fa-trash-o"/>
                <span>删除任务</span>
            </button>

        </div>
    </div>
}