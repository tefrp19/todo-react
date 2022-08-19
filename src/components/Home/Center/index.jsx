export default function Center() {

    return <div className="contanier">
        <div className="mask"/>

        <div className="groupToolbar">
            <div className="menu"><i className="fa fa-bars" aria-hidden="true"/></div>
            <div className="groupName" contentEditable="true">我的一天</div>
            <div className="toolbarButton">
                <i className="fa fa-ellipsis-h"/>
                <div className="message">分组选项菜单</div>
                <div className="toolbarDetail">
                    <button className="rename">
                        <i className="fa fa-pencil-square-o"/>
                        <span>
                                    重命名分组
                                </span>
                    </button>
                    <button className="delete">
                        <i className="fa fa-trash-o"/>
                        <span>
                                    删除分组
                                </span>
                    </button>

                </div>
            </div>

        </div>

        <ul className="tasks">

        </ul>
        <div className="splitLine">已完成 0</div>
        <ul className="tasks checked">

        </ul>
        <div className="addTask task-item">
            <i className="fa fa-plus checkBox"/>
            <input placeholder="添加任务" value="" autoComplete="off"/>
        </div>
    </div>
}

