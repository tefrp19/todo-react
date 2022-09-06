import {useEffect, useState} from "react";
import Left from "./Left";
import "./index.css"
import Center from "./Center";
import Right from "./Right";

export default function Home() {
    const [isGroupPage, setIsGroupPage] = useState(false)
    const [nowGroupName, setNowGroupName] = useState('我的一天')//当前操作的分组名
    const [tasks, setTasks] = useState([])

    return <div className="root">
        <Left setNowGroupName={setNowGroupName} setTasks={setTasks} setIsGroupPage={setIsGroupPage}/>
        <main>
            <Center nowGroupName={nowGroupName} setNowGroupName={setNowGroupName} isGroupPage={isGroupPage} tasks={tasks} setTasks={setTasks}/>
            {/*<Right/>*/}
        </main>
    </div>
}