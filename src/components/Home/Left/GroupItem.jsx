import {getImportantTasksApi, getTasksApi, getTodayTasksApi} from "../../../api/task";
import {IMPORTANT_GROUP_ID, TODAY_GROUP_ID} from "../index";

export function GroupItem({group, groupIcon, setNowGroupId, setTasks, setView}) {
    const {id, name} = group

    async function handleClick() {
        setView(view=>({
            ...view,
            showRightColumn: false
        }))
        setNowGroupId(id)
        document.title = `${id > TODAY_GROUP_ID ? '分组：' : ''}${name}`
        let tasks
        switch (id) {
            case TODAY_GROUP_ID:
                tasks = (await getTodayTasksApi()).data
                break
            case IMPORTANT_GROUP_ID:
                tasks = (await getImportantTasksApi()).data
                break
            default:
                tasks = (await getTasksApi(id)).data
        }
        setTasks(tasks)
    }

    return <li className="group-item" onClick={handleClick}>
        <i className={`fa ${groupIcon}`}/>
        <span>{name}</span>
    </li>
}