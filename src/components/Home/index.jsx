import {useEffect, useState} from "react";
import Left from "./Left";
import "./index.css"
import Center from "./Center";
import Right from "./Right";

export default function Home() {
    const [groups, setGroups] = useState([])
    const [nowGroup, setNowGroup] = useState({id: -1, name: '我的一天'})
    const [tasks, setTasks] = useState([])

    return <div className="root">
        <Left groups={groups} setGroups={setGroups} setNowGroup={setNowGroup} setTasks={setTasks}/>
        <main>
            <Center groups={groups} setGroups={setGroups} nowGroup={nowGroup} setNowGroup={setNowGroup}
                    tasks={tasks} setTasks={setTasks}/>
            {/*<Right/>*/}
        </main>
    </div>
}