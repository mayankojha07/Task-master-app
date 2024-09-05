import { apiConnector } from "../apiConnector";
import { taskEndpoints } from "../apis";
import toast from "react-hot-toast";

const {
  CREATE_TASK_API,
  GET_TASK_DETAILS_API,
  UPDATE_TASK_API,
  DELETE_TASK_API,
  COMPLETE_TASK_API,
  GET_SINGLE_TASK_API,
} = taskEndpoints;

export const createTask = async (token, taskData, setTasks) => {
  try {
    const response = await apiConnector("POST", CREATE_TASK_API, taskData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setTasks((prev) => [response.data.task, ...prev]);
    toast.success("Task Created");
  } catch (error) {
    console.log("Error while creating in -> ", error);

    console.log("message -> ", error.response.data.message);
    const errorMessage = error.response.data.message || "Something went wrong";
    toast.error(errorMessage);
  }
};

export const getTaskDetails = async (token, setTasks) => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_TASK_DETAILS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.tasks;
  } catch (error) {
    console.log("Error while getting task -> ", error);

    console.log("message -> ", error.response.data.message);
    const errorMessage = error.response.data.message || "Something went wrong";
    toast.error(errorMessage);
  }
  setTasks(result);
};

export const updateTask = async (token, taskData, setTasks) => {
  try {
    const response = await apiConnector(
      "PUT",
      `${UPDATE_TASK_API}/${taskData._id}`,
      taskData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setTasks((prev) =>
      prev.map((el) => (el._id === taskData._id ? response.data.task : el))
    );
    toast.success("Task Updated");
  } catch (error) {
    console.log("Error while updating task  -> ", error);

    console.log("message -> ", error.response.data.message);
    const errorMessage = error.response.data.message || "Something went wrong";
    toast.error(errorMessage);
  }
};

export const deleteTask = async (token, id, setTasks) => {
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_TASK_API}/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setTasks((prev) => prev.filter((el) => el._id !== id));
    toast.success("Task Deleted");
  } catch (error) {
    console.log("Error while deleting task -> ", error);

    console.log("message -> ", error.response.data.message);
    const errorMessage = error.response.data.message || "Something went wrong";
    toast.error(errorMessage);
  }
};

export const completeTask = async (token, id, setTasks) => {
  try {
    const response = await apiConnector(
      "PUT",
      `${COMPLETE_TASK_API}/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setTasks((prev) =>
      prev.map((el) => (el._id === id ? response.data.task : el))
    );
    toast.success("Task Completed");
  } catch (error) {
    console.log("Error while completing task -> ", error);

    console.log("message -> ", error.response.data.message);
    const errorMessage = error.response.data.message || "Something went wrong";
    toast.error(errorMessage);
  }
};

export const getSingleTask = async (token, id, setTask) => {
  try {
    const response = await apiConnector(
      "GET",
      `${GET_SINGLE_TASK_API}/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setTask(response.data.task);
  } catch (error) {
    console.log("Error while getting single task -> ", error);

    console.log("message -> ", error.response.data.message);
    const errorMessage = error.response.data.message || "Something went wrong";
    toast.error(errorMessage);
  }
};
