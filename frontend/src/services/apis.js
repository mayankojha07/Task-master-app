const BASE_URL = import.meta.env.VITE_BASE_URL;

// Authentication Endpoints
export const authEndpoints = {
  LOGIN_API: BASE_URL + "/api/auth/login",
  SIGNUP_API: BASE_URL + "/api/auth/register",
  LOGOUT_API: BASE_URL + "/api/auth/logout",
};

// Task CRUD Operations Endpoints
export const taskEndpoints = {
  GET_TASK_DETAILS_API: BASE_URL + "/api/tasks",
  CREATE_TASK_API: BASE_URL + "/api/tasks",
  UPDATE_TASK_API: BASE_URL + "/api/tasks",
  DELETE_TASK_API: BASE_URL + "/api/tasks",
  COMPLETE_TASK_API: BASE_URL + "/api/task/complete",
  GET_SINGLE_TASK_API: BASE_URL + "/api/task",
};
