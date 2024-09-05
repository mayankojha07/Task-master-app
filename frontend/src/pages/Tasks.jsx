import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getTaskDetails } from "../services/operations/taskAPI";
import TaskCard from "../components/core/TaskCard";
import AuthBtn from "../components/common/AuthBtn";
import Spinner from "../components/common/Spinner";
import CreateTaskModal from "../components/core/CreateTaskModal";
import { Link } from "react-router-dom";

const Tasks = () => {
  const { token, tasks, setTasks, user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await getTaskDetails(token, setTasks);
    })();
    setLoading(false);
  }, []);
  return (
    <>
      <div className="w-full space-y-6 p-4 md:p-8 relative">
        {loading ? (
          <div className="w-full h-[calc(100vh-8.850rem)] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Page heading */}
            <div className="w-full pb-4 border-b border-b-gray-300/80 flex flex-row justify-between items-center">
              <h2 className="text-3xl md:text-4xl font-semibold">My Tasks</h2>

              {/* Create Task button */}
              {user.role === "admin" && (
                <AuthBtn
                  text={"Create Task"}
                  active={true}
                  onclick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                />
              )}
            </div>

            {tasks.length ? (
              <div className="w-full  flex flex-col gap-3 items-start justify-between">
                {tasks.map((task, index) => (
                  <TaskCard
                    key={index}
                    task={task}
                    role={user.role}
                    setShowModal={setShowModal}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full text-center mt-8 text-black/70 text-2xl font-medium">
                You don't have any task
              </div>
            )}

            {/* Create Task Modal */}
            {showModal && <CreateTaskModal setShowModal={setShowModal} />}
          </>
        )}
      </div>
    </>
  );
};

export default Tasks;
