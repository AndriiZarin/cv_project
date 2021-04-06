import { createContext, useContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { setAuthorizationHeader } from "../api";

const initState = {
  token: undefined,
  role: "",
};

const reducer = (s, v) => ({ ...s, ...v });

export const UserStateContext = createContext();
export const UserDispatchContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useReducer(reducer, initState);

  useEffect(() => {
    if (localStorage.userToken) {
      const { user } = jwtDecode(localStorage.userToken);
      setUser({
        token: localStorage.userToken,
        role: user.role,
      });
      setAuthorizationHeader(localStorage.userToken);
    }
  }, []);

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const user = useContext(UserStateContext);
  if (!user) {
    throw Error("userStateContext must be used within UserProvider");
  }
  return user;
}

export function useUserDispatch() {
  const setUser = useContext(UserDispatchContext);
  if (!setUser) {
    throw Error("userStateDispatch must be used within UserProvider");
  }
  return setUser;
}

export function useLogin() {
  const setUser = useUserDispatch();
  function login(token) {
    const { user } = jwtDecode(token);
    setUser({ token, role: user.role });
    localStorage.userToken = token;
    setAuthorizationHeader(token);
  }
  return login;
}

export function useLogout() {
  const setUser = useUserDispatch();
  return function () {
    setUser(initState);
    delete localStorage.userToken;
    setAuthorizationHeader();
  };
}
