import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const { LOGIN_API, SIGNUP_API, LOGOUT_API } = authEndpoints;

export const login = async (
  loginData,
  setUser,
  setToken,
  setLoading,
  navigate
) => {
  setLoading(true);

  try {
    const response = await apiConnector("POST", LOGIN_API, {
      email: loginData.email,
      password: loginData.password,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setToken(response.data.token);
    setUser(response.data.user);
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    navigate("/dashboard");
  } catch (error) {
    console.log("Error while logging in -> ", error);

    console.log("message -> ", error.response.data.message);
    const errorMessage = error.response.data.message || "Something went wrong";
    toast.error(errorMessage);
  }
  setLoading(false);
};

export const signup = async (
  signupData,
  setUser,
  setToken,
  setLoading,
  navigate
) => {
  setLoading(true);
  try {
    const response = await apiConnector("POST", SIGNUP_API, signupData);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setToken(response.data.token);
    setUser(response.data.user);
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    navigate("/dashboard");
  } catch (error) {
    console.log("Error while signing in -> ", error);
    console.log("message -> ", error.response.data.message);
    const errorMessage = error.response.data.message || "Something went wrong";
    toast.error(errorMessage);
  }
  setLoading(false);
};

export const logout = async (setUser, setToken, navigate) => {
  try {
    const response = await apiConnector("POST", LOGOUT_API);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  } catch (error) {
    console.log("Error while logging out -> ", error);
    console.log("message -> ", error.response.data.message);
    const errorMessage = error.response.data.message || "Something went wrong";
    toast.error(errorMessage);
  }
};
