import "./index.css"
import {useEffect} from "react";
import User from "./User";
import {addGroupApi, getGroupsApi} from "../../../api/group";
import {GroupItem} from "./GroupItem";
import {useBlurInput} from "../../../hooks/useBlurInput";


export default function Left(props) {
    const {groups, setGroups, setNowGroup, setTasks, setShowRightColumn, showLeftColumn} = props
    const inputPros = useBlurInput(addNewGroup)

    useEffect(() => {
        async function getGroups() {
            // debugger
            const {data: groups} = await getGroupsApi()
            setGroups(groups)
        }

        getGroups()
    }, [])

     function addNewGroup(newGroupName) {
         return new Promise((resolve, reject)=>{
             const data = {name: newGroupName}
              resolve(addGroupApi(data))
         }).then(res=>{
             const {data: {newGroupId}} =res
             const newGroup = {id: newGroupId, name: newGroupName}
             setGroups(groups => [...groups, newGroup]) // React会检测state的值是否变化来更新视图。由于数组是引用值，直接在原数组上修改元素，原数组的引用也不会改变，React则认为state未发生改变不会更新视图，正确做法是：https://beta.reactjs.org/learn/updating-arrays-in-state#updating-arrays-without-mutation
         })
    }


    return <aside className={showLeftColumn ? 'leftColumn-entered' : 'leftColumn-exited'}>
        <div className="warpper">
            <User/>
            <ul className="functions">
                <GroupItem key={-1} groupId={-1} groupIcon={'fa-sun-o'} groupName={'我的一天'}
                           setNowGroup={setNowGroup} setTasks={setTasks} setShowRightColumn={setShowRightColumn}
                />
                <GroupItem key={-2} groupId={-2} groupIcon={'fa-star-o'} groupName={'重要'}
                           setNowGroup={setNowGroup} setTasks={setTasks} setShowRightColumn={setShowRightColumn}
                />
            </ul>
            <ul className="groups">
                {
                    groups.map(group => <GroupItem key={group.id} groupId={group.id} groupIcon={'fa-bars'}
                                                   groupName={group.name} setNowGroup={setNowGroup}
                                                   setTasks={setTasks} setShowRightColumn={setShowRightColumn}
                        />
                    )
                }
            </ul>
            <div className="addGroup group-item">
                <i className="fa fa-plus"/>
                <input placeholder="新建分组" {...inputPros}/>
            </div>
        </div>
    </aside>
}