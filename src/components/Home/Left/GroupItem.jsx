import {getImportantTasksApi, getTasksApi, getTodayTasksApi} from "../../../api/task";

export function GroupItem({groupId, groupIcon, groupName, setNowGroup, setTasks}) {

    async function handleClick() {
        setNowGroup({id: groupId, name: groupName})
        // setNowGroupName(groupName)
        document.title = `分组：${groupName}`
        let tasks
        switch (groupId) {
            case -1:
                tasks = (await getTodayTasksApi()).data
                break
            case -2:
                tasks = (await getImportantTasksApi()).data
                break
            default:
                tasks = (await getTasksApi(groupId)).data
        }
        setTasks(tasks)
    }

    return <li className="group-item" onClick={handleClick}>
        <i className={`fa ${groupIcon}`}/>
        <span>{groupName}</span>
    </li>
}