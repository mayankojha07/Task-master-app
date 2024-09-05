import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import PrivateRoute from "./components/core/PrivateRoute";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import OpenRoute from "./components/core/OpenRoute";
import TaskView from "./pages/TaskView";

function App() {
  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden">
        {/* Navbar  */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <OpenRoute>
                <AuthPage />
              </OpenRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <OpenRoute>
                <AuthPage />
              </OpenRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />

          <Route
            path="/task/:id"
            element={
              <PrivateRoute>
                <TaskView />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
