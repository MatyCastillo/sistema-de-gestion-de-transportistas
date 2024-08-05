import React, { useEffect } from "react";
import Table from "../components/table";
import Nav2 from "../components/nav2";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import TableSelection from "../components/tableSelection";
import TableByYears from "../components/tableByYears";

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

  function tableType(props) {
    const table = props.table;
    if (table === "impresiones") {
      return (
        <TableSelection key={props.key_comp} print={props.print} sx={{ m: 2 }} />
      );
    } else if (table === "patentes") {
      return <TableByYears key="patentes" sx={{ m: 2 }} />;
    } else {
      return <Table key={props.type} type={props.type} sx={{ m: 2 }} />;
    }
  }

  return (
    <>
      if(isLogged)
      {
        <Nav2 form={prop.form}>
          {/* <Button variant="contained" size="small" sx={{ ml: 2 }} color="error">
            Socios eliminados
          </Button> */}
          {/* {prop.table ? (
            <TableSelection sx={{ m: 2 }} />
          ) : (
            <Table sx={{ m: 2 }} />
          )} */}
          {tableType(prop)}
          {/* <TableSelection sx={{ m: 2 }} /> */}
        </Nav2>
      }
    </>
  );
}
