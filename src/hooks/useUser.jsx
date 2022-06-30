import { useCallback, useContext } from "react";
import Context from "../context/UserContext";
import { loginService } from "../services";

export default function useUser() {
  const { jwt, setJWT } = useContext(Context);

  const login = useCallback(
    ({ nombre, password }) => {
      loginService({ nombre, password })
        .then((jwt) => {
          console.log("token en useUser", jwt);
          setJWT(jwt);
        })
        .catch((error) => {
          console.error(error);
        });
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
