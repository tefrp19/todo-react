import {useRef} from "react";
import './GroupToolbar.css'
export function GroupToolbar({isGroupPage,nowGroupName}) {
    const toolbarButtonRef = useRef()

    return <div className="groupToolbar">
        <div className="menu"><i className="fa fa-bars" aria-hidden="true"/></div>
        <div className="groupName" contentEditable={isGroupPage ? "true" : "false"}>{nowGroupName}</div>
        <div className="toolbarButton" style={{display: isGroupPage ? 'block' : 'none'}}
        >
            <i className="fa fa-ellipsis-h" onClick={function (e) {
                console.log(toolbarButtonRef)
                toolbarButtonRef.current.style.height = '80px'
            }
            }/>
            <div className="message">分组选项菜单</div>
            <div className="toolbarDetail" ref={toolbarButtonRef}>
                <button className="rename">
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