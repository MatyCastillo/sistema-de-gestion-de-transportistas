import React from "react";
import NabBar from "../components/navBar";
import Table from "../components/table";
import Nav2 from "../components/nav2";
// import IncriptionForm from "../components/inscriptionForm";

const home = (prop) => {
  return (
    <>
      {/* <NabBar form={prop.form} /> */}
      <Nav2 form={prop.form}>
        <Table sx={{ m: 2 }} />
      </Nav2>
    </>
  );
};

export default home;
