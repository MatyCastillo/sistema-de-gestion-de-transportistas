import { useCallback, useContext, useState } from "react";
import Context from "../context/UserContext";
import { loginService } from "../services";

export default function useUser() {
  const { jwt, setJWT } = useContext(Context);
  const [type, setType] = useState();
  const [state, setState] = useState({
    loading: false,
    error: false,
    message: "",
  });

  const login = useCallback(
    ({ nombre, password }) => {
      setState({ loading: true, error: false });
      loginService({ nombre, password })
        .then((jwt) => {
          window.sessionStorage.setItem("jwt", jwt.jwt);
          window.sessionStorage.setItem("userType", jwt.userType);
          window.sessionStorage.setItem("userName", jwt.userNombre);
          setState({ loading: false, error: true });
          setJWT(jwt.jwt);
          if (jwt.userType === "administrador") {
            setType("administrador");
          }
        })
        .catch((error) => {
          window.sessionStorage.removeItem("jwt");
          setState({
            loading: false,
            error: true,
            message: error.response.data.message,
          });
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("jwt");
    setJWT(null);
  }, [setJWT]);
  return {
    isLogged: Boolean(jwt),
    statusMessage: state.message,
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    tipoDeUsuario: type,
    //jwt: jwt,
    login,
    logout,
  };
}
