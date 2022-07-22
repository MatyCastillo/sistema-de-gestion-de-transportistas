import { useCallback, useContext } from "react";
import Context from "../context/UserContext";
import { loginService } from "../services";

export default function useUser() {
  const { jwt, setJWT } = useContext(Context);

  const login = useCallback(
    ({ nombre, password }) => {
      setJWT(true);
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    setJWT(null);
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
  };
}
