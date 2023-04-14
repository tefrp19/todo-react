import "./index.css"
import {useEffect} from "react";
import User from "./User";
import {addGroupApi, getGroupsApi} from "../../../api/group";
import {GroupItem} from "./GroupItem";
import {useBlurInput} from "../../../hooks/useBlurInput";
import {IMPORTANT_GROUP_ID, TODAY_GROUP_ID} from "../index";


export default function Left(props) {
    const {groups, setGroups, setNowGroupId, setTasks, view,setView} = props
    const inputPros = useBlurInput(addNewGroup)

    useEffect(() => {
        async function getGroups() {
            const {data: groups} = await getGroupsApi()
            setGroups(groups)
        }

        getGroups()
    }, [])

    function addNewGroup(newGroupName) {
        return new Promise((resolve, reject) => {
            const data = {name: newGroupName}
            resolve(addGroupApi(data))
        }).then(res => {
            const {data: {newGroupId}} = res
            const newGroup = {id: newGroupId, name: newGroupName}
            setGroups(groups => [...groups, newGroup]) // React会检测state的值是否变化来更新视图。由于数组是引用值，直接在原数组上修改元素，原数组的引用也不会改变，React则认为state未发生改变不会更新视图，正确做法是：https://beta.reactjs.org/learn/updating-arrays-in-state#updating-arrays-without-mutation
        })
    }


    return <aside className={view.showLeftColumn ? 'leftColumn-entered' : 'leftColumn-exited'}>
        <div className="warpper">
            <User/>
            <ul className="functions">
                <GroupItem key={TODAY_GROUP_ID}  group={{id:TODAY_GROUP_ID,name:'我的一天'}} groupIcon={'fa-sun-o'}
                           setNowGroupId={setNowGroupId} setTasks={setTasks} setView={setView}
                />
                <GroupItem key={IMPORTANT_GROUP_ID} group={{id: IMPORTANT_GROUP_ID, name: '重要'}} groupIcon={'fa-star-o'}
                           setNowGroupId={setNowGroupId} setTasks={setTasks} setView={setView}
                />
            </ul>
            <ul className="groups">
                {
                    groups.map(group => <GroupItem key={group.id} group={group}  setNowGroupId={setNowGroupId}
                                                   setTasks={setTasks} setView={setView}
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