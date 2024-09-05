import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getSingleTask } from "../services/operations/taskAPI";
import Spinner from "../components/common/Spinner";
import { MdTaskAlt, MdOutlineAddTask } from "react-icons/md";

const TaskView = () => {
  const { id } = useParams();
  const { token, user } = useContext(UserContext);

  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);

  const completeTaskHandler = (e) => {
    e.stopPropagation();
    (async () => {
      await completeTask(token, id, setTask);
    })();
  };

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        await getSingleTask(token, id, setTask);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  return (
    <>
      {loading ? (
        <div className="w-full h-[calc(100vh-4.425rem)] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full min-h-[calc(100vh-4.425rem)] flex flex-col  items-start gap-y-3 p-4 md:p-8 bg-[#E4E6EA] shadow-md rounded-md">
          <div className="w-full flex flex-row gap-x-6 justify-between items-center">
            <h3 className="font-semibold text-2xl md:text-4xl">
              {task?.title || "No Title"}
            </h3>
            {task.isCompleted ? (
              <MdTaskAlt
                fontSize={28}
                title="Completed"
                className="cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            ) : (
              <MdOutlineAddTask
                fontSize={28}
                title="Mark as complete"
                onClick={completeTaskHandler}
                className="cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            )}
          </div>

          <div className="flex flex-col items-start">
            {user.role !== "admin" ? (
              <>
                <p className="text-xl font-medium text-black/80">
                  Assigned By:
                </p>
                <p className="text-lg text-black/70 font-medium">
                  {task?.assignedBy?.firstName +
                    " " +
                    task?.assignedBy?.lastName || "N/A"}
                </p>
                <p className="text-lg text-black/70 font-medium">
                  {task?.assignedBy?.email || "N/A"}
                </p>
              </>
            ) : (
              <>
                <p className="text-xl font-medium text-black/80">
                  Assigned To:
                </p>
                <p className="text-base text-black/70 font-medium">
                  {task?.assignedTo?.firstName +
                    " " +
                    task?.assignedTo?.lastName || "N/A"}
                </p>
                <p className="text-base text-black/70 font-medium">
                  {task?.assignedTo?.email || "N/A"}
                </p>
              </>
            )}
          </div>

          <div>
            <p className="text-base text-black/60">
              <span className="font-medium mr-2">Due Date:</span>{" "}
              {task?.dueDate ? task.dueDate.split("T")[0] : "N/A"}
            </p>
            <p className="text-base text-black/60">
              <span className="font-medium mr-2">Priority:</span>{" "}
              {task?.priority ? task.priority.toUpperCase() : "N/A"}
            </p>
          </div>

          <div className="text-base text-black/60">
            <p className="text-xl font-medium text-black/70">Description: </p>
            <p className="text-base text-black/60">
              {task?.description || "No Description"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskView;
