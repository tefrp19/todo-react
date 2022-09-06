import {useEffect, useRef} from "react";
import './GroupToolbar.css'
import {message} from "antd";
import {modifyGroupApi} from "../../../api/group";

export function GroupToolbar({isGroupPage, nowGroupName, setNowGroupName}) {
    const toolbarDetail = useRef()
    const toolbarButtonRef = useRef()
    const groupNameRef = useRef()

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (e.target !== toolbarButtonRef.current) {
                toolbarDetail.current.style.height = '0px'
            }
        })

    }, [])

    function modifyGroupName() {
        const newGroupName = groupNameRef.current.innerText
        if (newGroupName !== nowGroupName) {
            console.log('修改分组名字:', newGroupName)
           modifyGroupApi()
            message.success('修改分组名成功')
            setNowGroupName(newGroupName)
        }
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault() // 阻止换行
            modifyGroupName()
        }
    }


    return <div className="groupToolbar">
        <div className="menu"><i className="fa fa-bars" aria-hidden="true"/></div>
        <div className="groupName" ref={groupNameRef}
             contentEditable={isGroupPage ? "true" : "false"}
             onBlur={modifyGroupName} onKeyDown={handleKeyDown}
             suppressContentEditableWarning
        >{nowGroupName}
        </div>
        <div className="toolbarButton" style={{display: isGroupPage ? 'block' : 'none'}}
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
                <button className="delete">
                    <i className="fa fa-trash-o"/>
                    <span>删除分组</span>
                </button>

            </div>
        </div>
    </div>
}