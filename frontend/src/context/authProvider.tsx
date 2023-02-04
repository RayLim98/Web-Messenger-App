import React, { createContext, useState, useEffect, useContext } from "react";
import { ObjectId } from "bson";
import getUserDataApi from "../api/getUser";
import loginUserApi from "../api/loginUser";
import registerUserApi from "../api/registerUser";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<{
  user: UserInterface;
  login: (payload: any) => void;
  register: (payload: any) => void;
  setUser: (payload: any) => void;
  getUserData: (payload: any) => void;
  logout: () => void;
  isAuthed: boolean;
}>({
  user: {} as UserInterface,
  login: () => {},
  register: () => {},
  setUser: () => {},
  getUserData: () => {},
  logout: () => {},
  isAuthed: false,
});

const intialState: UserInterface = {
  _id: null,
  userName: "",
  age: -1,
  image: "",
  token: "",
  lobbies: [],
};

interface UserInterface {
  _id: ObjectId | null;
  userName: string;
  age: number;
  image: string;
  token: string;
  lobbies: ObjectId[];
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // user value is a JWT string
  const [user, setUser] = useState<UserInterface>(intialState);
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has previously logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const userJson = JSON.parse(loggedInUser);
      setUser(userJson);
      setIsAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthed) navigate("/home");
    else navigate("/");
  }, [isAuthed]);

  const login = async (payload: any) => {
    try {
      // Save user
      const { data } = await loginUserApi(payload);
      setUser(data);
      setIsAuthed(true);

      // Store data as a string to avoid VAUGE object output
      localStorage.setItem("user", JSON.stringify(data));
      console.log("Login sucessful: ", data);
    } catch (err) {
      console.log("Login ussucessful: ", err);
    }
  };

  const register = (data: any) =>
    registerUserApi(data)
      .then((res) => {
        console.log("Sucess", res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });

  const logout = () => {
    localStorage.clear();
    setUser(intialState);
    setIsAuthed(false);
  };

  /**
   * @description takings in a user token. if verified user can access data
   * @param token
   */
  const getUserData = async () => {
    if (user)
      try {
        const res = await getUserDataApi(user.token);
        console.log("Getting user data: ", res);
        return res.data;
      } catch (err) {
        console.log("Could not get data", err);
        return err;
      }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthed,
        login,
        register,
        setUser,
        getUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() is called outside of a provider?");
  }
  return auth;
};

export { AuthProvider, useAuth };
