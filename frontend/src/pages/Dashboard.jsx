import React, { useContext, useEffect, useState } from "react";
import { getTaskDetails } from "../services/operations/taskAPI";
import { UserContext } from "../context/UserContext";
import Spinner from "../components/common/Spinner";
import TaskStatus from "../components/core/TaskStatus";
import { SiTask } from "react-icons/si";
import { BiTask } from "react-icons/bi";
import { BiTaskX } from "react-icons/bi";

const Dashboard = () => {
  const { token, tasks, setTasks } = useContext(UserContext);

  const [totolTask, setTotalTask] = useState(0);
  const [completedTask, setCompletedTask] = useState(0);
  const [pendingTask, setPendingTask] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getTaskDetails(token, setTasks);
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, setTasks]);

  // Calculate task counts whenever tasks change
  useEffect(() => {
    let count = 0;
    tasks.forEach((el) => {
      if (el.isCompleted) count++;
    });

    setTotalTask(tasks.length);
    setCompletedTask(count);
    setPendingTask(tasks.length - count);
  }, [tasks]);

  return (
    <>
      <div
        className={`w-full max-h-[calc(100vh - 4.425rem)] p-4 md:p-8 rounded-lg flex flex-col justify-between gap-4 relative`}
      >
        {loading ? (
          <div className="w-full h-[calc(100vh-8.850rem)] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col md:flex-row gap-3 border-b pb-6 border-b-slate-300">
              <TaskStatus
                heading={"Total Tasks"}
                number={totolTask}
                Icon={SiTask}
              />
              <TaskStatus
                heading={"Completed Tasks"}
                number={completedTask}
                Icon={BiTask}
              />
              <TaskStatus
                heading={"Pending Tasks"}
                number={pendingTask}
                Icon={BiTaskX}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
