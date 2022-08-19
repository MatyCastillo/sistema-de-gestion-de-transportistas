import React, { useEffect } from "react";
import Table from "../components/table";
import Nav2 from "../components/nav2";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function Home(prop) {
  const navigate = useNavigate();
  const { isLogged } = useUser();

  useEffect(() => {
    if (!isLogged) {
      {
        navigate("/", { state: { message: "Inicie sesión para continuar" } });
      }
    }
  });

  return (
    <>
      if(isLogged)
      {
        <Nav2 form={prop.form}>
          <Table sx={{ m: 2 }} />
        </Nav2>
      }
    </>
  );
}
