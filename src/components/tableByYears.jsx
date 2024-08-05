import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getYears, getProvsByYear } from "../services";
import { createTheme } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: deepOrange,
    secondary: {
      main: "#e5ae9d",
    },
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F8EAE6",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(year, cant, partners) {
  return {
    year,
    cant,
    history: partners,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.year}
        </TableCell>
        <TableCell>{row.cant}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Socios
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      N° Asociado
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Nombre Proveedor
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Patente
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      N° Habilitación
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <StyledTableRow key={historyRow.prov_asoc}>
                      <TableCell component="th" scope="row">
                        {historyRow.prov_asoc}
                      </TableCell>
                      <TableCell>{historyRow.prov_nombre}</TableCell>
                      <TableCell align="right">
                        {historyRow.chofer_patente}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.chofer_habilitacion}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [filas, setFilas] = React.useState([]);

  useEffect(() => {
    (async () => {
      let res;
      res = await getYears();
      setFilas(res.map((e) => createData(e.year, e.count, e.partners)));
    })();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        m: 2,
        mt: -2,
        height: 650,
      }}
    >
      <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
        <Table
          key="colapse-table-by-year"
          stickyHeader
          aria-label="collapsible table"
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: "bold" }}>Año</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filas.map((row) => (
              //En la key se extrae en numero de la hablitación para que cada elmento tenga una key unica segun lo requiere React
              <Row key={row.history[0].chofer_habilitacion} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
