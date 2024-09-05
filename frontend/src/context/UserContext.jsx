import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client";
import Notification from "../components/common/Notification";
import { Link } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  const [tasks, setTasks] = useState([]);
  const [socket, setSocket] = useState(null);

  // Initialize Socket.IO connection when user is authenticated
  useEffect(() => {
    if (user && token) {
      const socketInstance = io(import.meta.env.VITE_BASE_URL, {
        query: { userId: user._id },
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
      });

      // Register the user with their ID
      socketInstance.emit("register", user._id);

      // Listen for task notifications
      socketInstance.on("taskCreated", (data) => {
        toast.custom(
          <Link to={`/task/${data.taskId}`}>
            <Notification data={data} />
          </Link>
        );
      });

      socketInstance.on("taskUpdated", (data) => {
        toast.custom(
          <Link to={`/task/${data.taskId}`}>
            <Notification data={data} />
          </Link>
        );
      });

      socketInstance.on("taskDeleted", (data) => {
        toast.custom(<Notification data={data} />);
      });

      socketInstance.on("taskCompleted", (data) => {
        toast.custom(
          <Link to={`/task/${data.taskId}`}>
            <Notification data={data} />
          </Link>
        );
      });

      // Save the socket instance
      setSocket(socketInstance);

      // Clean up the connection when the component unmounts or user logs out
      return () => {
        socketInstance.disconnect();
      };
    }
  }, [user, token]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !socket?.connected) {
        socket?.connect(); // Reconnect the socket when the page becomes visible again
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socket]);

  const value = {
    user,
    setUser,
    token,
    setToken,
    loading,
    setLoading,
    tasks,
    setTasks,
    socket,
    setSocket,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
