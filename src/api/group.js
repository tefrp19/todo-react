import fetchparams from './app.js';
import instance from "./app.js";

export const getGroupsApi = () => {
    return instance.get('/groups')
}

/**
 * @param  group
 * @param  group.name
 */
export const addGroupApi = (group) => {
    return instance.post('/groups', group)
}

/**
 *
 * @param {Object} params
 * @param {number} params.id
 * @param {string} params.name
 * @returns
 */
export const modifyGroupApi = async (params) => {
    return await fetchparams(`/groups/${params.id}`, 'put', params)
}

/**
 *
 * @param {number} id
 * @returns
 */
export const deleteGroup = async (id) => {
    return await fetchparams(`/groups/${id}`, 'delete')
}

