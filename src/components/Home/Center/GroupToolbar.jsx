import {useEffect, useRef} from "react";
import './GroupToolbar.css'
import {message, Modal} from "antd";
import {deleteGroupApi, modifyGroupApi} from "../../../api/group";
import {getTodayTasksApi} from "../../../api/task";
import {IMPORTANT_GROUP_ID, TODAY_GROUP_ID} from "../index";

export function GroupToolbar(props) {
    const {
        groups,
        setGroups,
        selectedGroupId,
        setSelectedGroupId,
        setTasks,
        setView,
    } = props
    let nowGroup
    nowGroup = groups.find(group => group.id === selectedGroupId)
    if (!nowGroup) {
        switch (selectedGroupId) {
            case TODAY_GROUP_ID : {
                nowGroup = {
                    id: TODAY_GROUP_ID,
                    name: '我的一天'
                }
                break
            }
            case IMPORTANT_GROUP_ID: {
                nowGroup = {
                    id: IMPORTANT_GROUP_ID,
                    name: '重要'
                }
                break
            }
            default: {
            }
        }
    }

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
        const newGroupName = groupNameRef.current.textContent
        await modifyGroupApi({id: selectedGroupId, name: nowGroup.name})
        setGroups(groups => {
            groups.find(group => group.id === nowGroup.id).name = newGroupName
            return [...groups]
        })
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
                await deleteGroupApi(nowGroup.id)
                message.success('删除成功')
                setGroups(groups => groups.filter(group => group.id !== nowGroup.id))
                setSelectedGroupId(TODAY_GROUP_ID)
                const {data} = await getTodayTasksApi()
                setTasks(data)
            },

        });
    }

    function showLeftColumn() {
        setView(view => ({
            ...view,
            showLeftColumn: true,
            showMask: true,
        }))
    }

    return <div className="groupToolbar">
        <div className="menu" onClick={showLeftColumn}><i className="fa fa-bars" aria-hidden="true"/></div>
        <div className="groupName" ref={groupNameRef}
             contentEditable={selectedGroupId > TODAY_GROUP_ID ? "true" : "false"}
             onBlur={handleBlur} onKeyDown={handleKeyDown}
             suppressContentEditableWarning
        >{nowGroup.name}
        </div>
        <div className="toolbarButton" style={{display: selectedGroupId > 0 ? 'block' : 'none'}}
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