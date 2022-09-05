import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { DataGrid, esES, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  styled,
  TableCell,
  tableCellClasses,
  Tooltip,
} from "@mui/material";
import { getAllProv, deleteProvById } from "../services";
import { deepOrange } from "@mui/material/colors";
import { esES as coreEsES } from "@mui/material/locale";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { parse, startOfToday, isAfter, formatISO, format } from "date-fns";
import IncriptionForm from "./inscriptionCarrierForm";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./confirmDialog";
import AlertDialog from "./alertDialog";
import { darken, lighten } from "@mui/material/styles";

const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#bf360c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(
  id,
  prov_asoc,
  prov_dni,
  prov_nombre,
  prov_titularVehiculo,
  chofer,
  chofer_dni,
  chofer_patente,
  chofer_habilitacion,
  chofer_vtoHab,
  chofer_seguro,
  chofer_nPoliza,
  chofer_vtoPoliza,
  chofer_nVtv,
  chofer_vtoVtv,
  chofer_vehiculo,
  chofer_vehiculoCapacidad,
  chofer_cupon,
  chofer_registro,
  chofer_prorroga,
  chofer_cuitSocio,
  chofer_nombreTitular,
  chofer_cuitTitular,
  chofer_anioMod
) {
  return {
    id,
    prov_asoc,
    prov_dni,
    prov_nombre,
    prov_titularVehiculo,
    chofer,
    chofer_dni,
    chofer_patente,
    chofer_habilitacion,
    chofer_vtoHab,
    chofer_seguro,
    chofer_nPoliza,
    chofer_vtoPoliza,
    chofer_nVtv,
    chofer_vtoVtv,
    chofer_vehiculo,
    chofer_vehiculoCapacidad,
    chofer_cupon,
    chofer_registro,
    chofer_prorroga,
    chofer_cuitSocio,
    chofer_nombreTitular,
    chofer_cuitTitular,
    chofer_anioMod,
  };
}

const rowsMock = [
  createData(
    1,
    "7b",
    "26.345.816",
    "DURSO, Fernando J.",
    "DURSO, Fernando J.",
    "DURSO, Fernando J",
    "26.345.816",
    "FTZ 322",
    "445",
    "28/02/2023",
    "CALEDONIA",
    "2115693",
    "10/07/2022",
    "222317189",
    "09/07/2022",
    "M BENZ",
    "50",
    "15/05/2022",
    "23/03/2023",
    "Sin prorroga",
    "20-26345816-9",
    "DURSO, Fernando J",
    "20-26345816-9",
    "2006"
  ),
];

export default function DataTable() {
  let navigate = useNavigate();
  var hoy = startOfToday();
  var userType = sessionStorage.getItem("userType");
  const [expired, setExpired] = useState("NotExpired");
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [contentDialog, setContentDialog] = useState("");
  const [OpenDialog, setOpenDialog] = useState(false);
  const [nombre, setNombre] = useState();
  const [idProv, setIdProv] = useState();
  const [idDelete, setIdDelete] = useState();
  var [rows, setRows] = useState([]);
  var [loading, setLoading] = useState(true);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditClick = (id, type) => () => {
    handleClickOpenModal();
    setIdProv(id);
  };

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenConfirmDialog = (id, name) => {
    setIdDelete(id);
    setNombre(name);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  useEffect(() => {
    (async () => {
      const res = await getAllProv();
      if (res) {
        setRows(res);
      }
    })(setLoading(false));
  }, []);

  const handleDeleteClick = (id) => {
    console.log(id);
  };

  const deleteById = (id) => {
    (async () => {
      handleCloseConfirmDialog();
      const res = await deleteProvById(id);
      console.error(res);
      if (res.data.status === "success") {
        setContentDialog("success");
        handleOpenDialog();
        setTimeout(handleCloseDialog, 1000);
        setTimeout(reload, 1000);
      } else {
        setContentDialog("error");
        handleOpenDialog();
        setTimeout(handleCloseDialog, 2000);
      }
    })(setLoading(false));
  };

  const reload = () => {
    navigate("/", { replace: false });
    window.location.reload();
  };
  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "prov_asoc", headerName: "Asoc", width: 70 },
    { field: "prov_dni", headerName: "DNI", width: 100 },
    {
      field: "prov_nombre",
      headerName: "Apellido y Nombre Proveedor",
      width: 170,
    },
    {
      field: "prov_titularVehiculo",
      headerName: "Datos Titular Vehiculo",
      width: 200,
    },
    { field: "chofer", headerName: "Choferes", width: 170 },
    { field: "chofer_dni", headerName: "DNI", width: 100 },
    { field: "chofer_patente", headerName: "Patente", width: 100 },
    { field: "chofer_habilitacion", headerName: "Habilitacion", width: 100 },
    {
      field: "chofer_vtoHab",
      headerName: "Vto Habilitacion",
      width: 120,
      renderCell: (cellValues) => {
        var dateFormat = formatISO(new Date(cellValues.value), {
          representation: "date",
        });
        var dateCell = parse(dateFormat, "yyyy-MM-dd", new Date());
        var today = startOfToday();
        var color;
        if (isAfter(dateCell, today)) {
          color = "green";
        } else {
          color = "red";
        }
        return (
          <div
            style={{
              color: color,
              fontWeight: "bold",
            }}
          >
            {format(dateCell, "dd/MM/yyyy")}
          </div>
        );
      },
    },
    { field: "chofer_seguro", headerName: "Seguro", width: 100 },
    { field: "chofer_nPoliza", headerName: "Nº Poliza", width: 100 },
    {
      field: "chofer_vtoPoliza",
      headerName: "Vto Poliza",
      width: 100,
      renderCell: (cellValues) => {
        var dateFormat = formatISO(new Date(cellValues.value), {
          representation: "date",
        });
        var dateCell = parse(dateFormat, "yyyy-MM-dd", new Date());
        var today = startOfToday();
        var color;
        if (isAfter(dateCell, today)) {
          color = "green";
        } else {
          color = "red";
        }
        return (
          <div
            style={{
              color: color,
              fontWeight: "bold",
            }}
          >
            {format(dateCell, "dd/MM/yyyy")}
          </div>
        );
      },
    },
    { field: "chofer_nVtv", headerName: "Nº VTV", width: 100 },
    {
      field: "chofer_vtoVtv",
      headerName: "Vto VTV",
      width: 100,
      renderCell: (cellValues) => {
        var dateFormat = formatISO(new Date(cellValues.value), {
          representation: "date",
        });
        var dateCell = parse(dateFormat, "yyyy-MM-dd", new Date());
        var today = startOfToday();
        var color;
        if (isAfter(dateCell, today)) {
          color = "green";
        } else {
          color = "red";
        }
        return (
          <div
            style={{
              color: color,
              fontWeight: "bold",
            }}
          >
            {format(dateCell, "dd/MM/yyyy")}
          </div>
        );
      },
    },
    { field: "chofer_vehiculo", headerName: "Vehiculo", width: 100 },
    { field: "chofer_vehiculoCapacidad", headerName: "Capacidad", width: 100 },
    {
      field: "chofer_cupon",
      headerName: "Cupon de pago",
      width: 150,
      renderCell: (cellValues) => {
        var dateFormat = formatISO(new Date(cellValues.value), {
          representation: "date",
        });
        var dateCell = parse(dateFormat, "yyyy-MM-dd", new Date());
        var today = startOfToday();
        var color;
        if (isAfter(dateCell, today)) {
          color = "green";
        } else {
          color = "red";
        }
        return (
          <div
            style={{
              color: color,
              fontWeight: "bold",
            }}
          >
            {format(dateCell, "dd/MM/yyyy")}
          </div>
        );
      },
    },
    {
      field: "chofer_registro",
      headerName: "Vto Registro",
      width: 120,
      renderCell: (cellValues) => {
        var dateFormat = formatISO(new Date(cellValues.value), {
          representation: "date",
        });
        var dateCell = parse(dateFormat, "yyyy-MM-dd", new Date());
        var today = startOfToday();
        var color;
        if (isAfter(dateCell, today)) {
          color = "green";
        } else {
          color = "red";
        }
        return (
          <div
            style={{
              color: color,
              fontWeight: "bold",
            }}
          >
            {format(dateCell, "dd/MM/yyyy")}
          </div>
        );
      },
    },
    {
      field: "chofer_prorroga",
      headerName: "Prorroga al",
      width: 120,
      renderCell: (cellValues) => {
        if (
          cellValues.value === "0000-00-00" ||
          cellValues.value === null ||
          cellValues.value === undefined
        ) {
          return <div>Sin prorroga</div>;
        } else {
          var dateFormat = formatISO(new Date(cellValues.value), {
            representation: "date",
          });
          var dateCell = parse(dateFormat, "yyyy-MM-dd", new Date());
          var today = startOfToday();
          var color;
          if (isAfter(dateCell, today)) {
            color = "green";
          } else {
            color = "red";
          }
          return (
            <div
              style={{
                color: color,
                fontWeight: "bold",
              }}
            >
              {format(dateCell, "dd/MM/yyyy")}
            </div>
          );
        }
      },
    },
    { field: "chofer_cuitSocio", headerName: "CUIT Socio", width: 150 },
    // {
    //   field: "prov_nombre",
    //   headerName: "Apellido y Nombre Titular",
    //   width: 200,
    // },
    { field: "chofer_cuitTitular", headerName: "CUIT Titular", width: 120 },
    { field: "chofer_anioMod", headerName: "Año Mod", width: 100 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        if (userType === "administrador") {
          return [
            <Tooltip title="Editar">
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(params.id, userType)}
                color="success"
              />
            </Tooltip>,
            <Tooltip title="Eliminar">
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() =>
                  handleOpenConfirmDialog(params.id, params.row.prov_nombre)
                }
                color="error"
              />
            </Tooltip>,
          ];
        } else if (userType === "operador") {
          return [
            <Tooltip title="Ver">
              <GridActionsCellItem
                icon={<VisibilityTwoToneIcon />}
                label="View"
                onClick={handleEditClick(params.id, userType)}
              />
            </Tooltip>,
          ];
        }
      },
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        m: 2,
        height: 650,
        "& .super-app-theme--NotExpired": {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.success.main, theme.palette.mode),
          "&:hover": {
            bgcolor: (theme) =>
              getHoverBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode
              ),
          },
        },
        "& .super-app-theme--Expired": {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.error.main, theme.palette.mode),
          "&:hover": {
            bgcolor: (theme) =>
              getHoverBackgroundColor(
                theme.palette.error.main,
                theme.palette.mode
              ),
          },
        },
      }}
      style={{}}
    >
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
          //loading={loading}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25]}
          selectRow={2}
        />
        <ConfirmDialog
          open={openConfirmDialog}
          close={handleCloseConfirmDialog}
          func={() => deleteById(idDelete)}
          title="Eliminar socio"
          description={`¿Eliminar socio ${nombre}?`}
          actionButton="Eliminar"
          actionButtonColor="error"
        />
        <AlertDialog
          open={OpenDialog}
          close={handleCloseDialog}
          status={contentDialog}
          title="Eliminar socio"
          message="Socio eliminado exitosamente"
          error="Error! No se pudo eliminar"
        />
        <Dialog
          open={openModal}
          maxWidth="lg"
          onClose={handleCloseModal}
          scroll="body"
        >
          <DialogTitle id="scroll-dialog-title">
            Formulario de actualización
          </DialogTitle>
          <DialogContent dividers>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <IncriptionForm id={idProv} userType={userType} />
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </Paper>
  );
}
