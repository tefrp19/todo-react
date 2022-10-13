import {useEffect, useState} from "react";
import Left from "./Left";
import "./index.css"
import Center from "./Center";
import Right from "./Right";

export default function Home() {
    const [groups, setGroups] = useState([])
    const [nowGroup, setNowGroup] = useState({id: -1, name: '我的一天'})
    const [tasks, setTasks] = useState([])
    const [showRightColumn, setShowRightColumn] = useState(false)
    const [showLeftColumn, setShowLeftColumn] = useState(false) // 手机端下是否显示左侧栏
    const [taskDetail, setTaskDetail] = useState({})
    const [showMask, setShowMask] = useState(false)

    return <div className="root">
        <Left groups={groups} setGroups={setGroups} setNowGroup={setNowGroup} setTasks={setTasks}
              setShowRightColumn={setShowRightColumn} showLeftColumn={showLeftColumn}/>
        <main>
            <Center groups={groups} setGroups={setGroups} nowGroup={nowGroup} setNowGroup={setNowGroup}
                    tasks={tasks} setTasks={setTasks} setShowRightColumn={setShowRightColumn} showMask={showMask}
                    setShowMask={setShowMask}
                    setTaskDetail={setTaskDetail} setShowLeftColumn={setShowLeftColumn}/>
            <Right showRightColumn={showRightColumn} setShowRightColumn={setShowRightColumn} taskDetail={taskDetail}
                   setTaskDetail={setTaskDetail} tasks={tasks} setTasks={setTasks} nowGroup={nowGroup} setShowMask={setShowMask}/>
        </main>
    </div>
}