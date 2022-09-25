import instance from "./app.js";

export const getGroupsApi = () => {
    return instance.get('/groups')
}

/**
 * @param {Object} group
 * @param {string} group.name
 */
export const addGroupApi = (group) => {
    return instance.post('/groups', group)
}

/**
 *
 * @param {Object} group
 * @param {number} group.id
 * @param {string} group.name
 * @returns
 */
export const modifyGroupApi = async (group) => {
    return instance.put(`/groups/${group.id}`, group)
}

/**
 *
 * @param {number} id
 * @returns
 */
export const deleteGroupApi = async (id) => {
    return instance.delete(`/groups/${id}`,)
}

