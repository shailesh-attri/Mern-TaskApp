import { baseurl } from "../baseUrl";
const api = `${baseurl}/api`
export const loginRoute = `${api}/user/login`
export const changeAvatar = `${api}/user/changeAvatar`
export const registerRoute = `${api}/user/register`
export const createTask = `${api}/task/createTask`
export const updateTaskRoute = `${api}/task/updateTask`
export const deleteTaskRoute = `${api}/task/deleteTask`
export const markImportant = `${api}/task/markImportant`
export const markCompleted = `${api}/task/markCompleted`
export const getTask = `${api}/taskRef/getTask`
export const getUser = `${api}/user/getUser`
