import {TaskItem} from "./TaskItem";


export default function TaskList({tasks, setTasks, setView,setTaskDetailId,}) {

    return (<>
        <List check={0} tasks={tasks} setTasks={setTasks} setView={setView} setTaskDetailId={setTaskDetailId}/>
        <div className="splitLine">{`已完成 ${tasks.filter(task => task.check).length}`}</div>
        <List check={1} tasks={tasks} setTasks={setTasks} setView={setView} setTaskDetailId={setTaskDetailId}/>
    </>)
}

function List({check, tasks, setTasks,setView,setTaskDetailId}) {


    return <ul className={`tasks ${check ? 'checked' : ''}`}>
        {
            tasks.map(task => {
                    if (task.check === check) {
                        return <TaskItem key={task.id} task={task} setTasks={setTasks}
                            setView={setView} setTaskDetailId={setTaskDetailId}
                        />
                    }
                }
            )
        }
    </ul>
}