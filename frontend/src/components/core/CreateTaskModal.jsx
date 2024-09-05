import React, { useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import AuthBtn from "../common/AuthBtn";
import { createTask } from "../../services/operations/taskAPI";
import { UserContext } from "../../context/UserContext";

const CreateTaskModal = ({ setShowModal }) => {
  const { token, setTasks } = useContext(UserContext);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignedToEmail: "",
    priority: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setTaskData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const convertToUTC = (date) => {
    const dateObj = new Date(date);
    return new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setLoading(true);
    (async () => {
      await createTask(
        token,
        { ...taskData, dueDate: convertToUTC(taskData.dueDate) },
        setTasks
      );
    })();

    setLoading(false);
    setShowModal(false);
  };

  return (
    <div className="fixed overflow-auto -top-20 left-0 right-0 bottom-0 z-[999] flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative my-20 mt-80 w-[90%] max-w-lg md:max-w-2xl lg:max-w-3xl bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h4 className="text-xl md:text-2xl font-semibold">Create Task</h4>
          <IoCloseOutline
            fontSize={25}
            className="cursor-pointer"
            onClick={() => setShowModal(false)}
          />
        </div>

        <form onSubmit={onSubmitHandler} className="p-4 space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-lg font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="w-full text-base px-4 py-3 bg-gray-100 text-black rounded-md outline-none"
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
              className="w-full text-base px-4 py-3 bg-gray-100 text-black rounded-md outline-none"
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
              className="w-full text-base px-4 py-3 bg-gray-100 text-black rounded-md outline-none"
              value={taskData.dueDate}
              onChange={onChangeHandler}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="priority" className="text-lg font-medium">
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              className="w-full text-base px-4 py-3 bg-gray-100 text-black rounded-md outline-none"
              onChange={onChangeHandler}
              value={taskData.priority}
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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
              className="w-full text-base px-4 py-3 bg-gray-100 text-black rounded-md outline-none"
              rows={4}
              value={taskData.description}
              onChange={onChangeHandler}
            />
          </div>

          <div className="flex justify-end gap-4 items-center">
            <AuthBtn text="Cancel" onclick={() => setShowModal(false)} />
            <AuthBtn
              disable={loading}
              text={loading ? "Loading..." : "Submit"}
              active
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
