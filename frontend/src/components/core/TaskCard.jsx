import React, { useContext, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline, MdTaskAlt, MdOutlineAddTask } from "react-icons/md";
import { deleteTask, completeTask } from "../../services/operations/taskAPI";
import { UserContext } from "../../context/UserContext";
import EditTaskModal from "./EditTaskModal";
import { Link } from "react-router-dom";

const TaskCard = ({ task, role }) => {
  const { token, setTasks } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const onDeleteHandler = (e) => {
    e.stopPropagation();

    (async () => {
      await deleteTask(token, task._id, setTasks);
    })();
  };

  const completeTaskHandler = (e) => {
    e.stopPropagation();
    (async () => {
      await completeTask(token, task._id, setTasks);
    })();
  };

  return (
    <>
      <div className="w-full flex flex-col gap-y-0 justify-between items-start p-4 bg-[#E4E6EA] shadow-md rounded-md">
        <div className="w-full flex gap-x-8 justify-between items-start ">
          <Link to={`/task/${task._id}`} onClick={(e) => e.stopPropagation()}>
            <h3 className="font-medium text-xl md:text-2xl">{task.title}</h3>
          </Link>
          <div className="flex justify-end gap-x-4 items-center">
            {role === "admin" && (
              <>
                <FiEdit2
                  fontSize={20}
                  title="Edit Task"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                />
                <MdDeleteOutline
                  fontSize={24}
                  title="Delete Task"
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={onDeleteHandler}
                />
              </>
            )}
            {task.isCompleted ? (
              <MdTaskAlt
                fontSize={24}
                title="Completed"
                className="cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            ) : (
              <MdOutlineAddTask
                fontSize={24}
                title="Mark as complete"
                onClick={completeTaskHandler}
                className="cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            )}
          </div>
        </div>
        <p className="text-base text-black/60">
          {role !== "admin" ? (
            <>Assigned By: {task.assignedBy.name}</>
          ) : (
            <>Assigned To: {task.assignedTo.name}</>
          )}
        </p>
        <p className="text-base text-black/60">
          Due Date: {task.dueDate.split("T")[0]}
        </p>
        <p className="text-base text-black/60">
          Priority: {task.priority.toUpperCase()}
        </p>
      </div>

      {showModal && <EditTaskModal setShowModal={setShowModal} task={task} />}
    </>
  );
};

export default TaskCard;
