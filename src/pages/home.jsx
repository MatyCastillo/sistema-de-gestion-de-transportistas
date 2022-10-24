import React, { useEffect } from "react";
import Table from "../components/table";
import Nav2 from "../components/nav2";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import TableSelection from "../components/tableSelection";
import { Button } from "@mui/material";

export default function Home(prop) {
  const navigate = useNavigate();
  const { isLogged } = useUser();

  useEffect(() => {
    if (!isLogged) {
      {
        navigate("/login", {
          state: { message: "Inicie sesión para continuar" },
        });
      }
    }
  });

  return (
    <>
      if(isLogged)
      {
        <Nav2 form={prop.form}>
          {/* <Button variant="contained" size="small" sx={{ ml: 2 }} color="error">
            Socios eliminados
          </Button> */}
          <Table sx={{ m: 2 }} />
          {/* <TableSelection sx={{ m: 2 }} /> */}
        </Nav2>
      }
    </>
  );
}
