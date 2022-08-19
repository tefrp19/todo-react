
export  default  function Right(){

    return  <div className="task-detail rightColumn-exited">
        <div className="warpper">
            <div className="detail-header task-detail-item">
                <div className="checkBox">
                    <i className="fa fa-circle-thin"/>
                    <i className="fa fa-check-circle-o"/>
                </div>
                <div className="modify-task-name" contentEditable="true"/>
                <div className="importance">
                    <i className="fa fa-star-o"/>
                </div>
            </div>

            <div className="modify-deadline task-detail-item">
                <input type="date" name="deadline"/><br/>
            </div>
            <button className="add-to-today task-detail-item">
                <i className="fa fa-sun-o"/>
                <span>添加到“我的一天”</span>
            </button>

            <div className="modify-note task-detail-item" contentEditable="true" placeholder="添加备注"/>
            <button className="delete-task task-detail-item">
                <i className="fa fa-trash-o"/>
                <span>删除任务</span></button>
        </div>
    </div>
}