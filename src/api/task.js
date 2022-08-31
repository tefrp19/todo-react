import instance from "./app.js";

export const getTasksApi = (groupId) => {
    return instance.get(`/groups/${groupId}/tasks`)
}

/**
 * 添加任务
 * @param {object} task
 * @param {number} task.groupId
 * @param {string} task.name
 */
export const addTaskApi = (task) => {
    return instance.post(`/groups/${task.groupId}/tasks`, task) // 请求体中需要有name字段
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
export const modifyTaskApi = (task) => {
    return instance.put(`/groups/1/tasks/${task.id}`, task)
}

export const deleteTaskApi = (taskId) => {
    return instance.delete(`/groups/1/tasks/${taskId}`)
}

export const getImportantTasksApi = () => {
    return instance.get('/tasks/important')
}

export const getTodayTasksApi = () => {
    return instance.get('/tasks/today')
}