import {useEffect, useReducer, useState} from "react";
import Left from "./Left";
import "./index.css"
import Center from "./Center";
import Right from "./Right";
import tasksReducer from "./tasksReducer";

// 当前分组id，-1表示“我的一天”分组，-2表示“重要”分组
export const TODAY_GROUP_ID=-1
export const IMPORTANT_GROUP_ID=-2

export default function Home() {
    const [groups, setGroups] = useState([])
    const [selectedGroupId, setSelectedGroupId] = useState(TODAY_GROUP_ID) // 当前选中的分组
    const [taskks, setTaskks] = useState([])
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [view, setView] = useState({
        showLeftColumn: false, // 手机端下是否显示左侧栏
        showMask: false, // 是否显示遮罩层
        showRightColumn: false, // 是否显示右侧栏
    })
    // todo 将showRightColumn、showMask和showLeftColumn合并（因为经常一起修改他们）

    // todo 不要复制state，用id保持state一致
    const [taskDetailId, setTaskDetailId] = useState()

    return <div className="root">
        <Left groups={groups} setGroups={setGroups} setNowGroupId={setSelectedGroupId} setTasks={setTaskks}
              view={view} setView={setView}/>
        <main>
            <Center view={view} setView={setView} groups={groups} setGroups={setGroups} selectedGroupId={selectedGroupId} setSelectedGroupId={setSelectedGroupId}
                    tasks={taskks} setTasks={setTaskks}
                    setTaskDetailId={setTaskDetailId}/>
            {/*    <Right view={view}*/}
            {/*           setView={setView} taskDetailId={taskDetailId}*/}
            {/*           setTaskDetailId={setTaskDetailId} tasks={taskks} setTasks={setTaskks} nowGroup={nowGroup}*/}
            {/*    />*/}
        </main>
    </div>
}