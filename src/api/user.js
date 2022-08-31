import instance from "./app.js";

/**
 *
 * @param data
 * @param data.username
 * @param data.password
 */
export const registerApi = (data) => {
    return instance.post('/register', data);
}

/**
 *
 * @param data
 * @param data.username
 * @param data.password
 */
export const loginApi = (data) => {
    return instance.post('/login', data);
}

export const getUserApi = () => {
    return instance.get('/user')
}

export const logoutApi = () => {
    return instance.get('/logout')
}

