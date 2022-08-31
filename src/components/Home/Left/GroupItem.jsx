import {getImportantTasksApi, getTasksApi, getTodayTasksApi} from "../../../api/task";

export function GroupItem({groupId, groupIcon, groupName, setNowGroupName, setIsGroupPage, setTasks}) {

    async function handleClick() {
        setNowGroupName(groupName)
        document.title=groupName
        let tasks
        switch (groupId) {
            case -1:
                setIsGroupPage(false)
                tasks = (await getTodayTasksApi()).data
                break
            case -2:
                setIsGroupPage(false)
                tasks = (await getImportantTasksApi()).data
                break
            default:
                setIsGroupPage(true)
                tasks = (await getTasksApi(groupId)).data
        }
        setTasks(tasks)
    }

    return <li className="group-item" onClick={handleClick}>
        <i className={`fa ${groupIcon}`}/>
        <span>{groupName}</span>
    </li>
}