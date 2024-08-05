import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { DataGrid, esES, GridActionsCellItem } from "@mui/x-data-grid";
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
} from "@mui/material";
import {
  getAllProv,
  getDeleteProvs,
  markAsDeleted,
  getImagesStatus,
  getRecordsBetweenDates,
  descargarArchivoXLSX 
} from "../services";
import {
  getAllProv as getAllProv_provincial,
  getDeleteProvs as getDeleteProvs_provincial,
  markAsDeleted as markAsDeleted_provincial,
  getImagesStatus as getImagesStatus_provincial,
  getRecordsBetweenDates as getRecordsBetweenDates_provincial,
  descargarArchivoXLSX as descargarArchivoXLSX_provincial
} from "../services/provincial";
import { deepOrange } from "@mui/material/colors";
import { esES as coreEsES } from "@mui/material/locale";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { parse, startOfToday, isAfter, formatISO, format, set } from "date-fns";
import IncriptionForm from "./inscriptionCarrierForm";
import IncriptionFormProv from "./inscriptionCarrierFormProv";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./confirmDialog";
import AlertDialog from "./alertDialog";
import { darken, lighten } from "@mui/material/styles";
import RestoreIcon from "@mui/icons-material/Restore";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";


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
        secondary: "#bbdefb" 
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
  const [rowDelete, setRowDelete] = useState([]);
  const [rowRestore, setRowRestore] = useState([]);
  const [deletedPart, setDeletedPart] = useState(false);
  const [restoreDelete, setRestoreDelete] = useState({});
  const [stat, setStat] = useState();
  const today = new Date();
  const past7days = new Date();
  past7days.setDate(past7days.getDate() + 7)
  const [startDate, setStartDate] = React.useState(today);
  const [endDate, setEndDate] = React.useState(past7days);


  var [rows, setRows] = useState([]);
  var [rows2, setRows2] = useState([]);
  var [onLoading, setLoading] = useState(true);

  const tableRef = React.createRef();

  var bodyObject = new Object();

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

  const handleOpenConfirmDialog = (id, name, row, typeAction) => {
    setIdDelete(id);
    setNombre(name);
    typeAction === "delete"
      ? setRowDelete({ ...row, eliminado: 1 })
      : setRowRestore({ ...row, eliminado: 0 });
    typeAction === "delete"
      ? setRestoreDelete({
          type: "delete",
          title: "Eliminar socio",
          description: `¿Eliminar socio ${name}?`,
          actionButton: "Eliminar",
          actionButtonColor: "error",
        })
      : setRestoreDelete({
          type: "restore",
          title: "Restaurar socio",
          description: `¿Restaurar socio ${name}?`,
          actionButton: "Restaurar",
          actionButtonColor: "error",
        });
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  
  useEffect(() => {
    (async () => {
      let res;
      if(props.type==="provincial"){
        res= await getAllProv_provincial();
      }else {
        res = await getAllProv();
      }
      if (res && userType !== null) {
        if (props.type !== "logistic") {
          setRows(res);
        }
      }
    })(setLoading(false));
  }, []);

  useEffect(() => {
    (async () => {
      let res;
      res = props.type==="provincial"?await getDeleteProvs_provincial():await getDeleteProvs();
      if (res) {
        setRows2(res);
      }
    })(setLoading(false));
  }, []);


  const handlegetRecordsBetweenDates = async () => {
    try {
      const res = await getRecordsBetweenDates(startDate, endDate);
      setRows(res);
    } catch (error) {
      // Manejar el error si es necesario
      console.error("Error al buscar registros:", error);
      setOpenDialog(true)
      setContentDialog("error")
      setRestoreDelete({
        alertTitle: "Error al filtrar por fecha",
        alertMessage: error.message,
      })
      
    }
  };

  const handleDeleteClick = (id) => {
    console.log(id);
  };

  const deletedPartners = () => {
    setDeletedPart(true);
  };
  const activePart = () => {
    setDeletedPart(false);
  };

  const deleteRestoreById = (id) => {
    (async () => {
      handleCloseConfirmDialog();
      let res
      if(props.type==="provincial"){
         res = await markAsDeleted_provincial(
          restoreDelete.type === "delete" ? rowDelete : rowRestore
        );
      }else{
           res = await markAsDeleted(
          restoreDelete.type === "delete" ? rowDelete : rowRestore
        );
      }

      if (res.data.status === "success") {
        setContentDialog("success");
        setRestoreDelete(
          restoreDelete.type === "delete"
            ? {
                alertTitle: "Eliminar Socio",
                alertMessage: "Socio eliminado exitosamente",
                alertError: "Error! No se pudo eliminar",
              }
            : {
                alertTitle: "Restaurar Socio",
                alertMessage: "Socio restaurado exitosamente",
                alertError: "Error! No se pudo restaurar",
              }
        );
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
    if (props.type==="provincial"){
    navigate("/padron-provincial", { replace: false });
    }else{
      navigate("/", { replace: false });
    }
    window.location.reload();
  };

  const descargarXLSX = (datos,fechaInicio,fechaFin) => {
    bodyObject.data = rows
    bodyObject.startDate = startDate
    bodyObject.endDate = endDate

    descargarArchivoXLSX(bodyObject)    
  }

  function Deleted() {
   
    return (
      <Button
        variant="outlined"
        size="small"
        sx={{ mt: 1, ml: 1 }}
        color={deletedPart ? "success" : "error"}
        onClick={deletedPart ? () => activePart() : () => deletedPartners()}
      >
        {deletedPart ? "Ir a Socios Activos" : "Ir a Socios eliminados"}
      </Button>
    );
  }

  function filterByDay() {
    return (
      <>
        {/* Inicio */}
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={esLocale}
        >
          <DatePicker
            variant="inline"
            label="Buscar desde:"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            InputAdornmentProps={{ position: "start" }}
            renderInput={(params) => (
              <TextField
                placeholder="DD/MM/AAAA"
                sx={{ ml: 1, mt: 1 }}
                size="small"
                variant="standard"
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        {/*Fin*/}
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={esLocale}
        >
          <DatePicker
            variant="inline"
            label="Buscar hasta:"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            InputAdornmentProps={{ position: "start" }}
            renderInput={(params) => (
              <TextField
                placeholder="DD/MM/AAAA"
                sx={{ ml: 2, mt: 1 }}
                size="small"
                variant="standard"
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          size="small"
          sx={{ mt: 2, ml: 1 }}
          onClick={()=>handlegetRecordsBetweenDates()}
        >
          Filtrar
        </Button>
        <Button
          disabled={rows.length===0?true:false}
          variant="contained"
          endIcon={<DownloadIcon />}
          size="small"
          sx={{ mt: 2, ml: 1 }}
          color="success"
          onClick={()=>descargarXLSX()}
        >
          Generar XLSX
        </Button>
        <Button
          variant="contained"
          endIcon={<DeleteIcon />}
          size="small"
          sx={{ mt: 2, ml: 1 }}
          color="error"
          onClick={()=>cleanButton()}
        >
          Limpiar
        </Button>
      </>
    );
  }
function cleanButton(){
  setRows([])
  setStartDate(today)
  setEndDate(past7days)
}
  const imageStatus = async (id) => {
    const res = await getImagesStatus(id);
    return res.data;
  };

  const [statusTest, setStatusTeset] = useState();
  const columns = [
    // {
    //   field: "status",
    //   headerName: "Estado",
    //   width: 70,
    //   renderCell: (cellValues) => {
    //     const s = () => {
    //       return imageStatus(cellValues.row.prov_asoc);
    //     };
    //     return (
    //       <Tooltip
    //         placement="right"
    //         title={
    //           statusTest
    //             ? "Todas las imagenes cargadas"
    //             : "Faltan imagenes por cargar"
    //         }
    //       >
    //         <GridActionsCellItem
    //           icon={statusTest ? <TaskAltIcon /> : <HighlightOffIcon />}
    //           label="Edit"
    //           className="textPrimary"
    //           color={statusTest ? "success" : "error"}
    //         />
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        if (userType === "administrador") {
          if (!deletedPart) {
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
                    handleOpenConfirmDialog(
                      params.id,
                      params.row.prov_nombre,
                      params.row,
                      "delete"
                    )
                  }
                  color="error"
                />
              </Tooltip>,
            ];
          } else {
            return [
              <Tooltip title="Restaurar">
                <GridActionsCellItem
                  icon={<RestoreIcon />}
                  label="Restore"
                  onClick={() =>
                    handleOpenConfirmDialog(
                      params.id,
                      params.row.prov_nombre,
                      params.row,
                      "restore"
                    )
                  }
                />
              </Tooltip>,
            ];
          }
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
        ref={tableRef}
          id="data-table"
          components={
            props.type === "logistic"
              ? {
                  Toolbar: filterByDay,
                }
              : {
                  Toolbar: Deleted,
                }
          }
          initialState={
            props.type === "logistic"
              ? {
                  columns: {
                    columnVisibilityModel: {
                      // Hide columns status and traderName, the other columns will remain visible
                      id: false,
                      prov_dni: false,
                      prov_titularVehiculo: false,
                      chofer: false,
                      chofer_dni: false,
                      chofer_seguro: false,
                      chofer_nPoliza: false,
                      chofer_nVtv: false,
                      chofer_vehiculo: false,
                      chofer_registro: false,
                      chofer_prorroga: false,
                      chofer_cuitSocio: false,
                      chofer_cuitTitular: false,
                      chofer_anioMod: false,
                      status: false,
                      actions: false,
                    },
                  },
                }
              : {
                  columns: {
                    columnVisibilityModel: {
                      // Hide columns status and traderName, the other columns will remain visible
                      id: false,
                    },
                  },
                }
          }
          rows={!deletedPart ? rows : rows2}
          loading={onLoading}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          selectRow={2}
          getRowClassName={(params) => `super-app-theme--${params.row.expire}`}
          disableSelectionOnClick={true}
          
        />
        <ConfirmDialog
          open={openConfirmDialog}
          close={handleCloseConfirmDialog}
          func={() => deleteRestoreById(idDelete)}
          title={restoreDelete.title}
          description={restoreDelete.description}
          actionButton={restoreDelete.actionButton}
          actionButtonColor={restoreDelete.actionButtonColor}
        />
        <AlertDialog
          open={OpenDialog}
          close={handleCloseDialog}
          status={contentDialog}
          title={restoreDelete.alertTitle}
          message={restoreDelete.alertMessage}
          error={restoreDelete.alertError}
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
            {props.type==="provincial"?<IncriptionFormProv id={idProv} userType={userType} />:<IncriptionForm id={idProv} userType={userType} />}
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </Paper>
  );
}
