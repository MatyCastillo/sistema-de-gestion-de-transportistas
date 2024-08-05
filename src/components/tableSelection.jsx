import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  DataGrid,
  esES,
  GridActionsCellItem,
  GridRowParams,
  GridRowId,
} from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  styled,
  TableCell,
  tableCellClasses,
  Tooltip,
  Typography,
} from "@mui/material";
import { getAllProv, getPdf, getDeleteProvs, markAsDeleted } from "../services";
import {
  getAllProv as getAllProv_provincial,
  getPdf as getPdf_provincial,
} from "../services/provincial";
import { deepOrange } from "@mui/material/colors";
import { esES as coreEsES } from "@mui/material/locale";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { parse, startOfToday, isAfter, formatISO, format, set } from "date-fns";
import IncriptionForm from "./inscriptionCarrierForm";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./confirmDialog";
import AlertDialog from "./alertDialog";
import { darken, lighten } from "@mui/material/styles";
import RestoreIcon from "@mui/icons-material/Restore";
import Loader from "./loader";

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

export default function DataTable(props) {
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
  const [deletedPart, setDeletedPart] = useState(false);
  const [restoreDelete, setRestoreDelete] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);
  const [cant, setCant] = useState();
  var [rows, setRows] = useState([]);
  var [rows2, setRows2] = useState([]);
  var [loading, setLoading] = useState(false);

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
    setLoading(true);
  };

  const handleCloseModal = () => {
    setLoading(false);
  };

  // const handlePDF = async (id) => {
  //   return await getPdf(id);
  // };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  useEffect(() => {
    (async () => {
      let res;
      if (props.print === "impresion_provincial") {
        res = await getAllProv_provincial();
      } else {
        res = await getAllProv();
      }
      if (res && userType !== null) {
        if (props.type !== "logistic") {
          setRows(res);
        }
      }
    })(setLoading(false));
  }, []);

  const reload = () => {
    navigate("/", { replace: false });
    window.location.reload();
  };

  const print = async (arr) => {
    console.log("array", selectionModel.length);

    let res;
    handleClickOpenModal();
    arr.forEach(async (element) => {
      if (props.print === "impresion_provincial") {
        res = await getPdf_provincial(element);
      } else {
        res = await getPdf(element);
      }
    });
    return res;
  };

  const arrayLg = () => {
    console.log(selectionModel.length);
  };

  function Print() {
    return (
      <>
        <Button
          disabled={selectionModel.length !== 0 ? false : true}
          variant="outlined"
          size="small"
          sx={{ mt: 1, ml: 1 }}
          color="primary"
          onClick={async () => {
            let res;
            try {
              res = await print(selectionModel);
            } catch (err) {
              console.log("error", err);
            } finally {
              setTimeout(handleCloseModal, 5000);
              setCant(selectionModel.length);
              setSelectionModel([]);
              console.log("res", res);
            }
          }}
        >
          Descargar socio/s seleccionados
        </Button>
        <Typography
          variant="body2"
          color={"GrayText"}
          component="div"
          sx={{ ml: 1 }}
        >
          Se admite la selección de hasta 5 socios
        </Typography>
      </>
    );
  }
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
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        m: 2,
        mt: -2,
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
    >
      <ThemeProvider theme={theme}>
        <DataGrid
          components={{
            Toolbar: Print,
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                id: false,
              },
            },
          }}
          rows={!deletedPart ? rows : rows2}
          //loading={onLoading}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          selectRow={2}
          getRowClassName={(params) => `super-app-theme--${params.row.expire}`}
          disableSelectionOnClick={true}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={(selection) => {
            if (selection.length > 5) {
              const selectionSet = new Set(selectionModel);
              const result = selection.filter((s) => !selectionSet.has(s));

              setSelectionModel(result);
            } else {
              setSelectionModel(selection);
            }
          }}
        />
        <AlertDialog
          open={OpenDialog}
          close={handleCloseDialog}
          status={contentDialog}
          title={restoreDelete.alertTitle}
          message={restoreDelete.alertMessage}
          error={restoreDelete.alertError}
        />
        <Loader
          open={loading}
          title="Descargando..."
          message={` ${cant} documento/s descargando, por favor espere`}
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
