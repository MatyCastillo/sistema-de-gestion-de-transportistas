import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MapIcon from "@mui/icons-material/Map";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SaveIcon from "@mui/icons-material/Save";
import esLocale from "date-fns/locale/es";
import { format, formatISO, parse } from "date-fns";
import AlertDialog from "./alertDialog";
import {
  createNewProv,
  uploadImage,
  getProvById,
  updateProv,
  getImagesById,
} from "../services";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import noImg from "../img/no-photo.png";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from "@mui/icons-material/CancelTwoTone";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import ImageForm from "./imageForm";
import { useEffect } from "react";
import API from "../utils/const";
import ImageDialog from "./imgDialog";

const theme = createTheme({
  palette: {
    primary: deepOrange,
    secondary: {
      main: "#bf360c",
    },
  },
});

const parceDateDb = (date) => {
  try {
    var dateFormat = formatISO(new Date(date), {
      representation: "date",
    });
    var dateCell = parse(dateFormat, "yyyy-MM-dd", new Date());
    return dateCell;
  } catch (e) {
    console.error(e);
  }
};

export default function IncriptionForm(props) {
  let navigate = useNavigate();
  var userType = sessionStorage.getItem("userType");
  // const userType = props.userType;
  const [edit, setEdit] = useState();
  useEffect(() => {
    (async () => {
      if (props.id !== undefined) {
        const res = await getProvById(props.id);
        const imgs = await getImagesById(res[0].prov_asoc);

        setDniTitF(
          imgs.data.filter((e) => e.img_nombre === "dniTitF").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "dniTitF" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setDniTitD(
          imgs.data.filter((e) => e.img_nombre === "dniTitD").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "dniTitD" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setDniChofF(
          imgs.data.filter((e) => e.img_nombre === "dniChofF").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "dniChofF" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setDniChofD(
          imgs.data.filter((e) => e.img_nombre === "dniChofD").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "dniChofD" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setHab1(
          imgs.data.filter((e) => e.img_nombre === "hab1").length === 0
            ? { preview: noImg }
            : {
                preview: `"${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "hab1" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setHab2(
          imgs.data.filter((e) => e.img_nombre === "hab2").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "hab2" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setPol1(
          imgs.data.filter((e) => e.img_nombre === "pol1").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "pol1" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setPol2(
          imgs.data.filter((e) => e.img_nombre === "pol2").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "pol2" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setSeg1(
          imgs.data.filter((e) => e.img_nombre === "seg1").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "seg1" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setSeg2(
          imgs.data.filter((e) => e.img_nombre === "seg2").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "seg2" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setRegTitF(
          imgs.data.filter((e) => e.img_nombre === "regTitF").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "regTitF" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setRegTitD(
          imgs.data.filter((e) => e.img_nombre === "regTitD").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "regTitD" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setRegChofF(
          imgs.data.filter((e) => e.img_nombre === "regChofF").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "regChofF" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setRegChofD(
          imgs.data.filter((e) => e.img_nombre === "regChofD").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "regChofD" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );
        setVtv(
          imgs.data.filter((e) => e.img_nombre === "vtv").length === 0
            ? { preview: noImg }
            : {
                preview: `${API.imgURI}/${
                  imgs.data.filter((e) =>
                    e.img_nombre === "vtv" ? e.img_path : ""
                  )[0].img_path
                }`,
              }
        );

        try {
        } catch (error) {}
        if (res) {
          setEdit(res[0]);
          setProv_asoc(res[0].prov_asoc);
          setProv_nombre(res[0].prov_nombre);
          setProv_dni(res[0].prov_dni);
          setChofer_cuitTitular(res[0].chofer_cuitTitular);
          setChofer(res[0].chofer);
          setChofer_dni(res[0].chofer_dni);
          setChofer_cuitSocio(res[0].chofer_cuitSocio);
          setProv_titularVehiculo(res[0].prov_titularVehiculo);
          setChofer_vehiculo(res[0].chofer_vehiculo);
          setChofer_patente(res[0].chofer_patente);
          setChofer_anioMod(res[0].chofer_anioMod);
          setChofer_seguro(res[0].chofer_seguro);
          setChofer_nPoliza(res[0].chofer_nPoliza);
          setChofer_nVtv(res[0].chofer_nVtv);
          setChofer_vehiculoCapacidad(res[0].chofer_vehiculoCapacidad);
          setChofer_habilitacion(res[0].chofer_habilitacion);
          setVtoRegistro(parceDateDb(res[0].chofer_registro));
          setVtoPoliza(parceDateDb(res[0].chofer_vtoPoliza));
          setVtoHab(parceDateDb(res[0].chofer_vtoHab));
          setVtoVtv(parceDateDb(res[0].chofer_vtoVtv));
          setVtoCupon(parceDateDb(res[0].chofer_cupon));
          setVtoProrroga(
            res[0].chofer_prorroga === "0000-00-00" ||
              res[0].chofer_prorroga === null ||
              res[0].chofer_prorroga === undefined
              ? null
              : parceDateDb(res[0].chofer_prorroga)
          );
        }
      } else {
      }
    })(setEdit(false));
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  const [timePickerValue, setTimePickerValue] = useState(null);
  const [helper, setHelper] = useState("");
  const [prov_asoc, setProv_asoc] = useState("");
  const [prov_nombre, setProv_nombre] = useState("");
  const [prov_dni, setProv_dni] = useState("");
  const [chofer_cuitTitular, setChofer_cuitTitular] = useState("");
  const [chofer, setChofer] = useState("");
  const [chofer_dni, setChofer_dni] = useState("");
  const [chofer_cuitSocio, setChofer_cuitSocio] = useState("");
  const [prov_titularVehiculo, setProv_titularVehiculo] = useState("");
  const [chofer_vehiculo, setChofer_vehiculo] = useState("");
  const [chofer_patente, setChofer_patente] = useState("");
  const [chofer_anioMod, setChofer_anioMod] = useState("");
  const [chofer_seguro, setChofer_seguro] = useState("");
  const [chofer_nPoliza, setChofer_nPoliza] = useState("");
  const [chofer_nVtv, setChofer_nVtv] = useState("");
  const [chofer_vehiculoCapacidad, setChofer_vehiculoCapacidad] = useState("");
  const [chofer_habilitacion, setChofer_habilitacion] = useState("");

  const [data, setData] = useState({});
  const [OpenDialog, setOpenDialog] = useState(false);
  const [contentDialog, setContentDialog] = useState("");

  const [vtoRegistro, setVtoRegistro] = useState(null);
  const [vtoProrroga, setVtoProrroga] = useState(null);
  const [vtoPoliza, setVtoPoliza] = useState(null);
  const [vtoHab, setVtoHab] = useState(null);
  const [vtoVtv, setVtoVtv] = useState(null);
  const [vtoCupon, setVtoCupon] = useState(null);
  const [prorroga, setProrroga] = useState(false);

  const [dniTitF, setDniTitF] = useState({ preview: noImg });
  const [dniTitD, setDniTitD] = useState({ preview: noImg });
  const [dniChofF, setDniChofF] = useState({ preview: noImg });
  const [dniChofD, setDniChofD] = useState({ preview: noImg });
  const [hab1, setHab1] = useState({ preview: noImg });
  const [hab2, setHab2] = useState({ preview: noImg });
  const [pol1, setPol1] = useState({ preview: noImg });
  const [pol2, setPol2] = useState({ preview: noImg });
  const [seg1, setSeg1] = useState({ preview: noImg });
  const [seg2, setSeg2] = useState({ preview: noImg });
  const [regTitF, setRegTitF] = useState({ preview: noImg });
  const [regTitD, setRegTitD] = useState({ preview: noImg });
  const [regChofF, setRegChofF] = useState({ preview: noImg });
  const [regChofD, setRegChofD] = useState({ preview: noImg });
  const [vtv, setVtv] = useState({ preview: noImg });

  const [viewPreview, setViewPreview] = useState({ state: false });

  const [dniTitFPreview, setDniTitFImgPreview] = useState(noImg);
  const [dniTitDPreview, setDniTitDImgPreview] = useState(noImg);

  const handleDniTitFPreview = (e) => {
    setDniTitF({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleDniTitDPreview = (e) => {
    setDniTitD({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleDniChofFPreview = (e) => {
    setDniChofF({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleDniChofDPreview = (e) => {
    setDniChofD({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleHab1Preview = (e) => {
    setHab1({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleHab2Preview = (e) => {
    setHab2({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handlePol1Preview = (e) => {
    setPol1({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handlePol2Preview = (e) => {
    setPol2({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleSeg1Preview = (e) => {
    setSeg1({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleSeg2Preview = (e) => {
    setSeg2({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleRegTitFPreview = (e) => {
    setRegTitF({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleRegTitDPreview = (e) => {
    setRegTitD({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleRegChofFPreview = (e) => {
    setRegChofF({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleRegChofDPreview = (e) => {
    setRegChofD({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleVtvPreview = (e) => {
    setVtv({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };

  const guardarImg = async (data) => {
    if (data.img_nombre !== undefined) {
      const resImg = await uploadImage(data.img, data.img_nombre, data.prov_id);
      console.log("imagen guadada", data.img, data.img_nombre, data.prov_id);
    } else {
      console.log("imagen no guardada");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event, seter) => {
    seter(event.target.value);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const reload = () => {
    navigate("/", { replace: false });
    window.location.reload();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (prorroga === false) {
      setData({
        ...data,
        chofer_prorroga: "0000-00-00",
      });
    }
    // console.log(document.getElementById("nAsos").value);
    // if (data.nombreColegio == null || "") {
    //   setNombreFocused(true);
    // } else if (data.direccColegio == null || "") {
    //   setDireccFocus(true);
    // } else if (data.localidadColegio == null || "") {
    //   setLocalidadFocus(true);
    // } else if (data.emailColegio == null || "") {
    //   setEmailFocus(true);
    // } else if (data.telColegio == null || "") {
    //   setTelFocus(true);
    // } else if (data.nombreDirectivo == null || "") {
    //   setNombreDFocus(true);
    // } else if (data.apellidoDirectivo == null || "") {
    //   setApellidoDFocus(true);
    // } else if (data.nombreTransportista == null || "") {
    //   setTansportFocus(true);
    // } else if (data.dateViaje == null || "") {
    //   setDateFocus(true);
    // } else if (data.timeViaje == null || "") {
    //   setTimeFocus(true);
    // } else {
    try {
      console.log(data);
      let res;
      if (props.id === undefined) {
        res = await createNewProv(data); //work!!!
      } else {
        res = await updateProv(data); //  still not work
      }

      guardarImg(dniTitF);
      guardarImg(dniTitD);
      guardarImg(dniChofF);
      guardarImg(dniChofD);
      guardarImg(hab1);
      guardarImg(hab2);
      guardarImg(pol1);
      guardarImg(pol2);
      guardarImg(seg1);
      guardarImg(seg2);
      guardarImg(regTitF);
      guardarImg(regTitD);
      guardarImg(regChofF);
      guardarImg(regChofD);
      guardarImg(vtv);

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
    } catch (e) {
      console.log("error handle", e);
      setContentDialog("error");
      handleOpenDialog();
      setTimeout(handleCloseDialog, 2000);
    }
    // }
  };

  const dateOnChange = (date, set, dateId) => {
    set(date);
    try {
      setData({
        ...data,
        [dateId]: format(date, "yyyy-MM-dd"),
        // format(date, "yyyy-MM-dd")
      });
    } catch {
      setData({
        ...data,
        [dateId]: date,
      });
    }
  };
  const [imgUrl, setImgUrl] = useState("");
  const handeClickOpenPreview = (e) => {
    const elem = e.target.currentSrc;
    setImgUrl(elem);
    setViewPreview({ state: true });
  };

  const handeClickClosePreview = () => {
    setViewPreview({ state: false });
  };

  const textInput = useRef(null);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <ImageDialog
          image={imgUrl}
          open={viewPreview.state}
          close={handeClickClosePreview}
        ></ImageDialog>
        <AlertDialog
          open={OpenDialog}
          close={handleCloseDialog}
          status={contentDialog}
          title="Envio de formulario"
          success="Formulario enviado exitosamente"
          error="Error! El formulario no fué enviado"
        />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Typography component="h1" variant="h5">
            Formulario de inscripción
          </Typography> */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Typography component="h3" variant="h6">
                  Datos del proveedor
                </Typography>
                {/* <Button
                  onClick={() => {
                    textInput.current.focus(); //para hace focus en el area de texto
                    setErrorMessage("Campo obligatorio.");
                    setTimeout(() => {
                      setErrorMessage("");
                    }, 1500);
                  }}
                >
                  Focus TextField
                </Button> 
                <br />*/}
                <TextField
                  error={setErrorMessage === ""}
                  margin="normal"
                  onChange={(e) => handleInputChange(e, setProv_asoc)}
                  required
                  inputRef={textInput}
                  id="prov_asoc"
                  name="prov_asoc"
                  label="Nº Asociado"
                  helperText={errorMessage}
                  variant="standard"
                  size="small"
                  value={prov_asoc}
                  //disabled={userType === "administrador" ? false : true}
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  onChange={(e) => handleInputChange(e, setProv_nombre)}
                  required
                  helperText={helper}
                  fullWidth
                  id="prov_nombre"
                  name="prov_nombre"
                  value={prov_nombre}
                  label="Nombre y apellido"
                  size="small"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  onChange={(e) => handleInputChange(e, setProv_dni)}
                  required
                  helperText={helper}
                  fullWidth
                  id="prov_dni"
                  name="prov_dni"
                  value={prov_dni}
                  label="DNI"
                  size="small"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  onChange={(e) => handleInputChange(e, setChofer_cuitTitular)}
                  required
                  helperText={helper}
                  fullWidth
                  id="chofer_cuitTitular"
                  name="chofer_cuitTitular"
                  value={chofer_cuitTitular}
                  label="CUIT"
                  size="small"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography component="h3" variant="h6">
                  Datos del Chofer
                </Typography>
                <TextField
                  variant="standard"
                  margin="normal"
                  onChange={(e) => handleInputChange(e, setChofer)}
                  required
                  helperText={helper}
                  fullWidth
                  id="chofer"
                  name="chofer"
                  value={chofer}
                  label="Nombre y apellido"
                  size="small"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                />
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    onChange={(e) => handleInputChange(e, setChofer_dni)}
                    required
                    fullWidth
                    id="chofer_dni"
                    name="chofer_dni"
                    value={chofer_dni}
                    label="DNI"
                    // autoComplete="street-address"
                    size="small"
                    inputProps={{
                      disabled: userType === "administrador" ? false : true,
                    }}
                  />
                  <TextField
                    variant="standard"
                    margin="normal"
                    onChange={(e) => handleInputChange(e, setChofer_cuitSocio)}
                    required
                    helperText={helper}
                    fullWidth
                    id="chofer_cuitSocio"
                    name="chofer_cuitSocio"
                    value={chofer_cuitSocio}
                    label="CUIT"
                    size="small"
                    inputProps={{
                      disabled: userType === "administrador" ? false : true,
                    }}
                  />
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={esLocale}
                  >
                    <DatePicker
                      inputProps={{
                        disabled: userType === "administrador" ? false : true,
                      }}
                      variant="inline"
                      label="Vto Registro"
                      value={vtoRegistro}
                      onChange={(date) =>
                        dateOnChange(date, setVtoRegistro, "chofer_registro")
                      }
                      InputAdornmentProps={{ position: "start" }}
                      renderInput={(params) => (
                        <TextField
                          placeholder="DD/MM/AAAA"
                          margin="normal"
                          size="small"
                          fullWidth
                          variant="standard"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={esLocale}
                  >
                    <DatePicker
                      inputProps={{
                        disabled: userType === "administrador" ? false : true,
                      }}
                      variant="inline"
                      label="Vto Prorroga"
                      value={vtoProrroga}
                      onChange={(date) =>
                        dateOnChange(date, setVtoProrroga, "chofer_prorroga")
                      }
                      InputAdornmentProps={{ position: "start" }}
                      renderInput={(params) => (
                        <TextField
                          placeholder="DD/MM/AAAA"
                          margin="normal"
                          size="small"
                          fullWidth
                          variant="standard"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography component="h3" variant="h6">
                  Datos del vehiculo
                </Typography>
                <TextField
                  variant="standard"
                  onChange={(e) =>
                    handleInputChange(e, setProv_titularVehiculo)
                  }
                  required
                  fullWidth
                  id="prov_titularVehiculo"
                  name="prov_titularVehiculo"
                  value={prov_titularVehiculo}
                  label="Titular del vehiculo"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                  // autoComplete="street-address"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={(e) => handleInputChange(e, setChofer_vehiculo)}
                  required
                  fullWidth
                  id="chofer_vehiculo"
                  name="chofer_vehiculo"
                  value={chofer_vehiculo}
                  label="Vehiculo(marca/modelo)"
                  // autoComplete="address-level1"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={(e) => handleInputChange(e, setChofer_patente)}
                  required
                  fullWidth
                  id="chofer_patente"
                  name="chofer_patente"
                  value={chofer_patente}
                  label="Patente"
                  // autoComplete="email"
                  size="small"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={(e) => handleInputChange(e, setChofer_anioMod)}
                  required
                  fullWidth
                  id="chofer_anioMod"
                  name="chofer_anioMod"
                  value={chofer_anioMod}
                  label="Año"
                  // autoComplete="address-level1"
                  size="small"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={(e) => handleInputChange(e, setChofer_seguro)}
                  required
                  fullWidth
                  id="chofer_seguro"
                  name="chofer_seguro"
                  value={chofer_seguro}
                  label="Compañia de seguro"
                  // autoComplete="tel"
                  size="small"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={(e) => handleInputChange(e, setChofer_nPoliza)}
                  required
                  fullWidth
                  id="chofer_nPoliza"
                  name="chofer_nPoliza"
                  value={chofer_nPoliza}
                  label="Nº poliza"
                  // autoComplete="given-name"
                  size="small"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={esLocale}
                >
                  <DatePicker
                    inputProps={{
                      disabled: userType === "administrador" ? false : true,
                    }}
                    variant="inline"
                    label="Vto poliza"
                    value={vtoPoliza}
                    onChange={(date) =>
                      dateOnChange(date, setVtoPoliza, "chofer_vtoPoliza")
                    }
                    InputAdornmentProps={{ position: "start" }}
                    renderInput={(params) => (
                      <TextField
                        placeholder="DD/MM/AAAA"
                        size="small"
                        fullWidth
                        variant="standard"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={(e) => handleInputChange(e, setChofer_habilitacion)}
                  required
                  fullWidth
                  id="chofer_habilitacion"
                  name="chofer_habilitacion"
                  value={chofer_habilitacion}
                  label=" Nº habilitación municipal"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={esLocale}
                >
                  <DatePicker
                    inputProps={{
                      disabled: userType === "administrador" ? false : true,
                    }}
                    variant="inline"
                    label="Vto habilitación"
                    value={vtoHab}
                    onChange={(date) =>
                      dateOnChange(date, setVtoHab, "chofer_vtoHab")
                    }
                    InputAdornmentProps={{ position: "start" }}
                    renderInput={(params) => (
                      <TextField
                        placeholder="DD/MM/AAAA"
                        size="small"
                        fullWidth
                        variant="standard"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={(e) => handleInputChange(e, setChofer_nVtv)}
                  required
                  fullWidth
                  id="chofer_nVtv"
                  name="chofer_nVtv"
                  value={chofer_nVtv}
                  label="Nº certificado Técnico / VTV"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={esLocale}
                >
                  <DatePicker
                    inputProps={{
                      disabled: userType === "administrador" ? false : true,
                    }}
                    variant="inline"
                    label="Vto VTV"
                    value={vtoVtv}
                    onChange={(date) =>
                      dateOnChange(date, setVtoVtv, "chofer_vtoVtv")
                    }
                    InputAdornmentProps={{ position: "start" }}
                    renderInput={(params) => (
                      <TextField
                        placeholder="DD/MM/AAAA"
                        size="small"
                        fullWidth
                        variant="standard"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={(e) =>
                    handleInputChange(e, setChofer_vehiculoCapacidad)
                  }
                  required
                  fullWidth
                  id="chofer_vehiculoCapacidad"
                  name="chofer_vehiculoCapacidad"
                  value={chofer_vehiculoCapacidad}
                  label="Capacidad"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={esLocale}
                >
                  <DatePicker
                    inputProps={{
                      disabled: userType === "administrador" ? false : true,
                    }}
                    variant="inline"
                    label="Vto Cupón"
                    value={vtoCupon}
                    onChange={(date) =>
                      dateOnChange(date, setVtoCupon, "chofer_cupon")
                    }
                    InputAdornmentProps={{ position: "start" }}
                    renderInput={(params) => (
                      <TextField
                        placeholder="DD/MM/AAAA"
                        size="small"
                        fullWidth
                        variant="standard"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid item sx={{ mt: 3 }}>
              <Typography component="h3" variant="h6">
                Carga de imagenes
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
                sx={{ mt: 1 }}
              >
                {/*<ImageForm title="Nuevo" />*/}
                <Grid>
                  {/*<img id="dniFront" src={imgPreview} style={{width: 56, height: 56}}/>*/}
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() =>
                      userType === "administrador"
                        ? setDniTitF({ preview: noImg })
                        : ""
                    }
                    sx={{ zIndex: "tooltip", ml: 1 }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    onClick={handeClickOpenPreview}
                    variant="rounded"
                    id="dniTitF"
                    alt="no-photo"
                    src={dniTitF.preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
                  {userType === "administrador" ? (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                      }}
                      component="label"
                      variant="outlined"
                    >
                      DNI Titular Frente
                      <input
                        hidden
                        id="dniTitF"
                        name="dniTitF"
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleDniTitFPreview}
                      />
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                        cursor: "context-menu",
                      }}
                      component="label"
                      variant="text"
                    >
                      DNI Titular Frente
                    </Button>
                  )}
                </Grid>
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() =>
                      userType === "administrador"
                        ? setDniTitD({ preview: noImg })
                        : ""
                    }
                    sx={{ zIndex: "tooltip", ml: 1 }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    onClick={handeClickOpenPreview}
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={dniTitD.preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
                  {userType === "administrador" ? (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                      }}
                      component="label"
                      variant="outlined"
                    >
                      DNI titular Dorso
                      <input
                        hidden
                        id="dniTitD"
                        name="dniTitD"
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleDniTitDPreview}
                      />
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                        cursor: "context-menu",
                      }}
                      component="label"
                      variant="text"
                    >
                      DNI Titular Dorso
                    </Button>
                  )}
                </Grid>
                <Grid>
                  {/*<img id="dniFront" src={imgPreview} style={{width: 56, height: 56}}/>*/}
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() =>
                      userType === "administrador"
                        ? setDniChofF({ preview: noImg })
                        : ""
                    }
                    sx={{ zIndex: "tooltip", ml: 1 }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    onClick={handeClickOpenPreview}
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={dniChofF.preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
                  {userType === "administrador" ? (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                      }}
                      component="label"
                      variant="outlined"
                    >
                      DNI Chofer Frente
                      <input
                        hidden
                        id="dniChofF"
                        name="dniChofF"
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleDniChofFPreview}
                      />
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                        cursor: "context-menu",
                      }}
                      component="label"
                      variant="text"
                    >
                      DNI Chofer Frente
                    </Button>
                  )}
                </Grid>
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() =>
                      userType === "administrador"
                        ? setDniChofD({ preview: noImg })
                        : ""
                    }
                    sx={{ zIndex: "tooltip", ml: 1 }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    onClick={handeClickOpenPreview}
                    variant="rounded"
                    id="dniFront"
                    name="dniFront"
                    alt="no-photo"
                    src={dniChofD.preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
                  {userType === "administrador" ? (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                      }}
                      component="label"
                      variant="outlined"
                    >
                      DNI Chofer Dorso
                      <input
                        hidden
                        id="dniFront"
                        name="dniFront"
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleDniChofDPreview}
                      />
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                        cursor: "context-menu",
                      }}
                      component="label"
                      variant="text"
                    >
                      DNI Chofer Dorso
                    </Button>
                  )}
                </Grid>
                {/**Inicio habilitacion foto 1 */}
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() =>
                      userType === "administrador"
                        ? setHab1({ preview: noImg })
                        : ""
                    }
                    sx={{ zIndex: "tooltip", ml: 1 }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    onClick={handeClickOpenPreview}
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={hab1.preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
                  {userType === "administrador" ? (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                      }}
                      component="label"
                      variant="outlined"
                    >
                      Habilitación foto 1
                      <input
                        hidden
                        id="hab1"
                        name="hab1"
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleHab1Preview}
                      />
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                        cursor: "context-menu",
                      }}
                      component="label"
                      variant="text"
                    >
                      Habilitacion 1
                    </Button>
                  )}
                </Grid>
                {/**Fin habilitacion foto 1 */}
                {/**Inicio habilitacion foto 2 */}
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() =>
                      userType === "administrador"
                        ? setHab2({ preview: noImg })
                        : ""
                    }
                    sx={{ zIndex: "tooltip", ml: 1 }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    onClick={handeClickOpenPreview}
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={hab2.preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
                  {userType === "administrador" ? (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                      }}
                      component="label"
                      variant="outlined"
                    >
                      habilitación foto 2
                      <input
                        hidden
                        id="hab2"
                        name="hab2"
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleHab2Preview}
                      />
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                        cursor: "context-menu",
                      }}
                      component="label"
                      variant="text"
                    >
                      Habilitacion 2
                    </Button>
                  )}
                </Grid>
                {/**Fin habilitacion foto 2 */}
                {/**Inicio poliza foto 1 */}
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() =>
                      userType === "administrador"
                        ? setPol1({ preview: noImg })
                        : ""
                    }
                    sx={{ zIndex: "tooltip", ml: 1 }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    onClick={handeClickOpenPreview}
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={pol1.preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
                  {userType === "administrador" ? (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                      }}
                      component="label"
                      variant="outlined"
                    >
                      poliza foto 1
                      <input
                        hidden
                        id="pol1"
                        name="pol1"
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handlePol1Preview}
                      />
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                        cursor: "context-menu",
                      }}
                      component="label"
                      variant="text"
                    >
                      Poliza 1
                    </Button>
                  )}
                </Grid>
                {/**Fin poliza foto 1 */}
                {/**Inicio poliza foto 2 */}
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() =>
                      userType === "administrador"
                        ? setPol2({ preview: noImg })
                        : ""
                    }
                    sx={{ zIndex: "tooltip", ml: 1 }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    onClick={handeClickOpenPreview}
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={pol2.preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
                  {userType === "administrador" ? (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                      }}
                      component="label"
                      variant="outlined"
                    >
                      poliza foto 2
                      <input
                        hidden
                        id="pol2"
                        name="pol2"
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handlePol2Preview}
                      />
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        m: 2,
                        mt: -1,
                        maxWidth: "100px",
                        textAlign: "center",
                        cursor: "context-menu",
                      }}
                      component="label"
                      variant="text"
                    >
                      Poliza 2
                    </Button>
                  )}
                </Grid>
                {/**Fin poliza foto 2 */}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={1}
            >
              {/**Inicio seguro foto 1 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() =>
                    userType === "administrador"
                      ? setSeg1({ preview: noImg })
                      : ""
                  }
                  sx={{ zIndex: "tooltip", ml: 1 }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  onClick={handeClickOpenPreview}
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={seg1.preview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
                {userType === "administrador" ? (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    component="label"
                    variant="outlined"
                  >
                    Seguro foto 1
                    <input
                      hidden
                      id="seg1"
                      name="seg1"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleSeg1Preview}
                    />
                  </Button>
                ) : (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                      cursor: "context-menu",
                    }}
                    component="label"
                    variant="text"
                  >
                    Seguro 1
                  </Button>
                )}
              </Grid>
              {/**Fin seguro foto 1 */}
              {/**Inicio seguro foto 2 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() =>
                    userType === "administrador"
                      ? setSeg2({ preview: noImg })
                      : ""
                  }
                  sx={{ zIndex: "tooltip", ml: 1 }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  onClick={handeClickOpenPreview}
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={seg2.preview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
                {userType === "administrador" ? (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    component="label"
                    variant="outlined"
                  >
                    seguro foto 2
                    <input
                      hidden
                      id="seg2"
                      name="seg2"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleSeg2Preview}
                    />
                  </Button>
                ) : (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                      cursor: "context-menu",
                    }}
                    component="label"
                    variant="text"
                  >
                    seguro 2
                  </Button>
                )}
              </Grid>
              {/**Fin seguro foto 2 */}
              {/**Inicio registro titular foto 1 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() =>
                    userType === "administrador"
                      ? setRegTitF({ preview: noImg })
                      : ""
                  }
                  sx={{ zIndex: "tooltip", ml: 1 }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  onClick={handeClickOpenPreview}
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={regTitF.preview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
                {userType === "administrador" ? (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    component="label"
                    variant="outlined"
                  >
                    registro titular frente
                    <input
                      hidden
                      id="regTitF"
                      name="regTitF"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleRegTitFPreview}
                    />
                  </Button>
                ) : (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                      cursor: "context-menu",
                    }}
                    component="label"
                    variant="text"
                  >
                    registro titular frente
                  </Button>
                )}
              </Grid>
              {/**Fin registro titular foto 1 */}
              {/**Inicio registro titular foto 2 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() =>
                    userType === "administrador"
                      ? setRegTitD({ preview: noImg })
                      : ""
                  }
                  sx={{ zIndex: "tooltip", ml: 1 }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  onClick={handeClickOpenPreview}
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={regTitD.preview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
                {userType === "administrador" ? (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    component="label"
                    variant="outlined"
                  >
                    registro titular dorso
                    <input
                      hidden
                      id="regTitD"
                      name="regTitD"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleRegTitDPreview}
                    />
                  </Button>
                ) : (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                      cursor: "context-menu",
                    }}
                    component="label"
                    variant="text"
                  >
                    registro titular dorso
                  </Button>
                )}
              </Grid>
              {/**Fin registro titular foto 2 */}
              {/**Inicio registro chofer foto 1 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() =>
                    userType === "administrador"
                      ? setRegChofF({ preview: noImg })
                      : ""
                  }
                  sx={{ zIndex: "tooltip", ml: 1 }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  onClick={handeClickOpenPreview}
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={regChofF.preview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
                {userType === "administrador" ? (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    component="label"
                    variant="outlined"
                  >
                    registro chofer frente
                    <input
                      hidden
                      id="regChofF"
                      name="regChofF"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleRegChofFPreview}
                    />
                  </Button>
                ) : (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                      cursor: "context-menu",
                    }}
                    component="label"
                    variant="text"
                  >
                    registro chofer frente
                  </Button>
                )}
              </Grid>
              {/**Fin registro chofer foto 1 */}
              {/**Inicio registro chofer foto 2 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() =>
                    userType === "administrador"
                      ? setRegChofD({ preview: noImg })
                      : ""
                  }
                  sx={{ zIndex: "tooltip", ml: 1 }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  onClick={handeClickOpenPreview}
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={regChofD.preview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
                {userType === "administrador" ? (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    component="label"
                    variant="outlined"
                  >
                    registro chofer dorso
                    <input
                      hidden
                      id="regChofD"
                      name="regChofD"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleRegChofDPreview}
                    />
                  </Button>
                ) : (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                      cursor: "context-menu",
                    }}
                    component="label"
                    variant="text"
                  >
                    registro chofer Dorso
                  </Button>
                )}
              </Grid>
              {/**Fin registro chofer foto 2 */}
              {/**Inicio foto vtv */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() =>
                    userType === "administrador"
                      ? setVtv({ preview: noImg })
                      : ""
                  }
                  sx={{ zIndex: "tooltip", ml: 1 }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  onClick={handeClickOpenPreview}
                  variant="rounded"
                  id="dniFront"
                  name="vtv"
                  alt="no-photo"
                  src={vtv.preview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
                {userType === "administrador" ? (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    component="label"
                    variant="outlined"
                  >
                    informe vtv
                    <input
                      hidden
                      id="vtv"
                      name="vtv"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleVtvPreview}
                    />
                  </Button>
                ) : (
                  <Button
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                      cursor: "context-menu",
                    }}
                    component="label"
                    variant="text"
                  >
                    informe vtv
                  </Button>
                )}
              </Grid>
              {/**Fin registro foto vtv */}
            </Grid>
            {userType === "administrador" ? (
              <Grid container justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  endIcon={
                    props.id === undefined ? <SaveIcon /> : <SaveAsIcon />
                  }
                  onClick={handleSubmit}
                >
                  {props.id === undefined ? "Guardar" : "Actualizar"}
                </Button>
              </Grid>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
