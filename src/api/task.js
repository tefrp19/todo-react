import fetchparams from './app.js';

export const getTasks=async (groupId)=>{
    return await fetchparams(`/groups/${groupId}/tasks`,'get')
}

/**
 * 添加任务
 * @param {object} task 
 * @param {number} task.groupId 
 * @param {string} task.name 
 */
export const addTask=async (task)=>{
    return await fetchparams(`/groups/${task.groupId}/tasks`,'post',task) // 请求体中需要有name字段
}

/**
 * 修改任务
 * @param {object} task 
 * @param {number} task.id 
 * @param {string} task.name 
 * @param {number} task.check 
 * @param {number} task.important 
 * @param {string} task.deadline
 * @param {string} task.note
 */
export const modifyTask=async (task)=>{
    return await fetchparams(`/groups/1/tasks/${task.id}`,'put',task)
}

export const deleteTask=async (taskId)=>{
    return await fetchparams(`/groups/1/tasks/${taskId}`,'delete')
}

export const getImportantTasks=async ()=>{
    return await fetchparams('/tasks/important','get')
}

export const getTodayTasks=async ()=>{
    return await fetchparams('/tasks/today','get')
    
}