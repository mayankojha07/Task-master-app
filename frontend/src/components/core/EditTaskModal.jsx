import React, { useState, useContext } from "react";
import AuthBtn from "../common/AuthBtn";
import { IoCloseOutline } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import { updateTask } from "../../services/operations/taskAPI";

const EditTaskModal = ({ task, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const { token, setTasks } = useContext(UserContext);

  // Format the dueDate to YYYY-MM-DD if it exists
  const formatDate = (dateString) => {
    if (!dateString) return ""; // If the date is not available, return an empty string
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [taskData, setTaskData] = useState({
    _id: task._id,
    title: task.title || "",
    description: task.description || "",
    assignedToEmail: task.assignedTo.email || "",
    priority: task.priority || "",
    dueDate: formatDate(task.dueDate) || "",
  });

  const onChangeHandler = (e) => {
    setTaskData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    (async () => {
      await updateTask(token, taskData, setTasks);
    })();

    setLoading(false);
    setShowModal(false);
  };
  return (
    <>
      <div className="fixed overflow-auto -top-20 left-0 right-0 bottom-0 z-[999] bg-white/80 flex justify-center items-center">
        <div className="my-20 mt-96 w-[96%] md:w-[70%] lg:w-[60%] flex flex-col gap-y-6 bg-white shadow p-4 md:p-8 rounded-lg">
          <div className="flex flex-row gap-8 justify-between items-center">
            <h4 className="text-xl md:text-2xl font-semibold">{"Edit Task"}</h4>
            <IoCloseOutline
              fontSize={25}
              className="cursor-pointer"
              onClick={() => setShowModal(false)}
            />
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-lg font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                className="w-full text-base sm:text-lg px-3 sm:px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
                value={taskData.title}
                onChange={onChangeHandler}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="assignedToEmail" className="text-lg font-medium">
                Assigned To
              </label>

              <input
                type="email"
                id="assignedToEmail"
                name="assignedToEmail"
                placeholder="Email"
                className="w-full text-base sm:text-lg px-3 sm:px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
                value={taskData.assignedToEmail}
                onChange={onChangeHandler}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="dueDate" className="text-lg font-medium">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                placeholder="Due Date"
                className="w-full text-base sm:text-lg px-3 sm:px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
                value={taskData.dueDate}
                onChange={onChangeHandler}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="priority" className="text-lg font-medium">
                Priority
              </label>

              <select
                name="priority"
                id="priority"
                className="w-full text-base sm:text-lg px-3 sm:px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
                onChange={onChangeHandler}
                defaultValue={taskData.priority}
              >
                <option defaultValue={""}>Select</option>
                <option value={"high"}>High</option>
                <option value={"medium"}>Medium</option>
                <option value={"low"}>Low</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-lg font-medium">
                Description
              </label>

              <textarea
                name="description"
                id="description"
                placeholder="Description"
                className="w-full text-base sm:text-lg px-3 sm:px-4 py-3 bg-[#eeeeee] text-black rounded-md outline-none"
                rows={4}
                value={taskData.description}
                onChange={onChangeHandler}
              />
            </div>

            <div className="w-full flex gap-x-4 justify-end items-center">
              <AuthBtn
                text={"Cancel"}
                onclick={() => {
                  setShowModal(false);
                }}
              />
              <AuthBtn
                disable={loading ? true : false}
                text={loading ? "Loading..." : "Submit"}
                active={true}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTaskModal;
