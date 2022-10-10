import {useEffect, useRef} from "react";
import './GroupToolbar.css'
import {message, Modal} from "antd";
import {deleteGroupApi, modifyGroupApi} from "../../../api/group";
import {getTodayTasksApi} from "../../../api/task";

export function GroupToolbar({groups, setGroups, nowGroup, setNowGroup, setTasks}) {
    const toolbarDetail = useRef()
    const toolbarButtonRef = useRef()
    const groupNameRef = useRef()

    useEffect(() => {
        const fn = (e) => {
            if (e.target !== toolbarButtonRef.current) {
                toolbarDetail.current.style.height = '0px'
            }
        }
        document.addEventListener('click', fn)
        return () => {
            document.removeEventListener('click', fn)
        }
    }, [])

    async function modifyGroupName() {
        const newGroupName = groupNameRef.current.innerText
        for (const group of groups) {
            if (group.id === nowGroup.id) {
                group.name = newGroupName
                break
            }
        }
        setNowGroup({id: nowGroup.id, name: newGroupName})
        await modifyGroupApi({id: nowGroup.id, name: newGroupName})
        setGroups(groups)
        message.success('修改成功')

    }

    function handleKeyDown(e) {
        const newGroupName = e.target.innerText
        if (e.keyCode === 13) {
            e.preventDefault() // 阻止换行
            if (newGroupName !== nowGroup.name && newGroupName !== '') {
                modifyGroupName()
            }
        }
    }

    function handleBlur(e) {
        const newGroupName = e.target.innerText
        if (newGroupName !== nowGroup.name && newGroupName !== '') {
            modifyGroupName()
        }
    }


    function handleDelete() {
        const {confirm} = Modal;
        confirm({
            title: '这会删除该分组下所有任务，确定删除？',
            okText: '确定',
            cancelText: '取消',
            okType: 'danger',

            async onOk() {
                const index = groups.findIndex(group => group.id === nowGroup.id)
                groups.splice(index, 1)
                await deleteGroupApi(nowGroup.id)
                setGroups([...groups])
                message.success('删除成功')
                const {data} = await getTodayTasksApi()
                setNowGroup({id: -1, name: '我的一天'})
                setTasks(data)

            },

        });
    }

    return <div className="groupToolbar">
        <div className="menu" onClick={() => {
            console.log(123)
        }
        }><i className="fa fa-bars" aria-hidden="true"/></div>
        <div className="groupName" ref={groupNameRef}
             contentEditable={nowGroup.id > 0 ? "true" : "false"}
             onBlur={handleBlur} onKeyDown={handleKeyDown}
             suppressContentEditableWarning
        >{nowGroup.name}
        </div>
        <div className="toolbarButton" style={{display: nowGroup.id > 0 ? 'block' : 'none'}}
        >
            <i className="fa fa-ellipsis-h" ref={toolbarButtonRef} onClick={function (e) {
                toolbarDetail.current.style.height = '80px'
            }
            }/>
            <div className="message">分组选项菜单</div>
            <div className="toolbarDetail" ref={toolbarDetail}>
                <button className="rename" onClick={() => {
                    // 全选
                    const range = document.createRange();
                    range.selectNodeContents(groupNameRef.current);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                }
                }>
                    <i className="fa fa-pencil-square-o"/>
                    <span>重命名分组</span>
                </button>

                <button className="delete" onClick={handleDelete}>
                    <i className="fa fa-trash-o"/>
                    <span>删除分组</span>
                </button>
            </div>
        </div>
    </div>
}