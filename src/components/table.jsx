import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { getAllIncriptions } from "../services";
import { deepOrange } from "@mui/material/colors";
import { esES as coreEsES } from "@mui/material/locale";

const theme = createTheme(
  {
    palette: {
      primary: deepOrange,
      secondary: {
        main: "#bf360c",
      },
    },
  },
  esES, // x-data-grid translations
  coreEsES // core translations
);

const columns = [
  { field: "id", headerName: "#", width: 50 },
  {
    field: "nombreTransportista",
    headerName: "Nombre del transportista",
    width: 170,
  },
  {
    field: "nombreColegio",
    headerName: "Nombre del colegio",
    width: 200,
  },
  { field: "direccColegio", headerName: "Dirección del colegio", width: 170 },
  { field: "localidadColegio", headerName: "Localidad", width: 150 },
  { field: "emailColegio", headerName: "Email del colegio", width: 250 },
  { field: "telColegio", headerName: "Teléfono del colegio", width: 150 },
  { field: "nombreDirectivo", headerName: "Nombre Directivo", width: 150 },
  { field: "apellidoDirectivo", headerName: "Apellido Directivo", width: 150 },
  {
    field: "dateViaje",
    headerName: "Fecha del viaje",
    width: 100,
    align: "right",
  },
  {
    field: "timeViaje",
    headerName: "Hora del viaje",
    width: 100,
    align: "right",
  },
];

export default function DataTable() {
  var [rows, setRows] = useState([]);
  var [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getAllIncriptions();
      if (res) {
        setRows(res);
      }
    })(setLoading(false));
  }, []);

  return (
    <Paper elevation={3} sx={{ m: 2 }} style={{ height: 750 }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                id: false,
              },
            },
            sorting: {
              sortModel: [{ field: "id", sort: "desc" }],
            },
          }}
          rows={rows}
          loading={loading}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25]}
        />
      </ThemeProvider>
    </Paper>
  );
}
