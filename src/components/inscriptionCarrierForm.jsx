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
import format from "date-fns/format";
import AlertDialog from "./alertDialog";
import { createNewInscription, uploadImage } from "../services";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import noImg from "../img/no-photo.png";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from "@mui/icons-material/CancelTwoTone";
import { IconButton } from "@mui/material";
import ImageForm from "./imageForm";

const theme = createTheme({
  palette: {
    primary: deepOrange,
    secondary: {
      main: "#bf360c",
    },
  },
});

export default function IncriptionForm() {
  let navigate = useNavigate();

  const dataPre = {
    nombreTransportista: null,
    nombreColegio: null,
    direccColegio: null,
    localidadColegio: null,
    emailColegio: null,
    telColegio: null,
    nombreDirectivo: null,
    apellidoDirectivo: null,
    dateViaje: null,
    timeViaje: null,
  };
  const [errorMessage, setErrorMessage] = React.useState("");
  const [datePickerValue, setDatePickerValue] = useState(null);
  const [timePickerValue, setTimePickerValue] = useState(null);
  const [helper, setHelper] = useState("");
  const [nombreFocused, setNombreFocused] = useState(false);
  const [direccFocus, setDireccFocus] = useState(false);
  const [localidadFocus, setLocalidadFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [telFocus, setTelFocus] = useState(false);
  const [nombreDFocus, setNombreDFocus] = useState(false);
  const [apellidoDFocus, setApellidoDFocus] = useState(false);
  const [tansportFocus, setTansportFocus] = useState(false);
  const [dateFocus, setDateFocus] = useState(false);
  const [timeFocus, setTimeFocus] = useState(false);
  const [data, setData] = useState(dataPre);
  const [imgData, setImgData] = useState({ preview: noImg });
  const [OpenDialog, setOpenDialog] = useState(false);
  const [contentDialog, setContentDialog] = useState("");

  const [dniTitFPreview, setDniTitFImgPreview] = useState(noImg);
  const [dniTitDPreview, setDniTitDImgPreview] = useState(noImg);
  const [dniChofFPreview, setDniChofFImgPreview] = useState(noImg);
  const [dniChofDPreview, setDniChofDImgPreview] = useState(noImg);
  const [hab1Preview, setHab1Preview] = useState(noImg);
  const [hab2Preview, setHab2Preview] = useState(noImg);
  const [pol1Preview, setPol1Preview] = useState(noImg);
  const [pol2Preview, setPol2Preview] = useState(noImg);
  const [seg1Preview, setSeg1Preview] = useState(noImg);
  const [seg2Preview, setSeg2Preview] = useState(noImg);
  const [regTitFPreview, setRegTitFImgPreview] = useState(noImg);
  const [regTitDPreview, setRegTitDImgPreview] = useState(noImg);
  const [regChofFPreview, setRegChofFImgPreview] = useState(noImg);
  const [regChofDPreview, setRegChofDImgPreview] = useState(noImg);
  const [vtvPreview, setVtvPreview] = useState(noImg);

  const handleDniTitFPreview = (e) => {
    setImgData({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("nAsos").value,
    });
    console.log(document.getElementById("nAsos").value);
  };
  const handleDniTitDPreview = (e) => {
    setDniTitDImgPreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleDniChofFPreview = (e) => {
    setDniChofFImgPreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleDniChofDPreview = (e) => {
    setDniChofDImgPreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleHab1Preview = (e) => {
    setHab1Preview(URL.createObjectURL(e.target.files[0]));
  };
  const handleHab2Preview = (e) => {
    setHab2Preview(URL.createObjectURL(e.target.files[0]));
  };
  const handlePol1Preview = (e) => {
    setPol1Preview(URL.createObjectURL(e.target.files[0]));
  };
  const handlePol2Preview = (e) => {
    setPol2Preview(URL.createObjectURL(e.target.files[0]));
  };
  const handleSeg1Preview = (e) => {
    setSeg1Preview(URL.createObjectURL(e.target.files[0]));
  };
  const handleSeg2Preview = (e) => {
    setSeg2Preview(URL.createObjectURL(e.target.files[0]));
  };
  const handleRegTitFPreview = (e) => {
    setRegTitFImgPreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleRegTitDPreview = (e) => {
    setRegTitDImgPreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleRegChofFPreview = (e) => {
    setRegChofFImgPreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleRegChofDPreview = (e) => {
    setRegChofDImgPreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleVtvPreview = (e) => {
    setVtvPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
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
      console.log(imgData.prov_id);
      const resImg = await uploadImage(
        imgData.img,
        imgData.img_nombre,
        imgData.prov_id
      );
      console.log(resImg);
      // const res = await createNewInscription(data);
      // if (res.data.status === "success") {
      //   setContentDialog("success");
      //   handleOpenDialog();
      //   setTimeout(handleCloseDialog, 1000);
      //   setTimeout(reload, 1000);
      // } else {
      //   setContentDialog("error");
      //   handleOpenDialog();
      //   setTimeout(handleCloseDialog, 2000);
      // }
    } catch (e) {
      console.log("error handle", e);
      setContentDialog("error");
      handleOpenDialog();
      setTimeout(handleCloseDialog, 2000);
    }
    // }
  };

  const dateOnChange = (newValue) => {
    setDatePickerValue(newValue);
    setData({
      ...data,
      dateViaje: format(newValue, "dd-MM-yyyy"),
    });
  };

  const timeOnChange = (newValue) => {
    setTimePickerValue(newValue);
    setData({
      ...data,
      timeViaje: format(newValue, "HH:mm"),
    });
  };

  const textInput = useRef(null);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <AlertDialog
          open={OpenDialog}
          close={handleCloseDialog}
          status={contentDialog}
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
                  onChange={handleInputChange}
                  required
                  inputRef={textInput}
                  id="nAsos"
                  name="nAsos"
                  label="Nº Asociado"
                  helperText={errorMessage}
                  variant="standard"
                  size="small"
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  onChange={handleInputChange}
                  required
                  helperText={helper}
                  fullWidth
                  id="nombreColegio"
                  name="nombreColegio"
                  label="Nombre y apellido"
                  size="small"
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  onChange={handleInputChange}
                  required
                  helperText={helper}
                  fullWidth
                  id="nombreColegio"
                  name="nombreColegio"
                  label="DNI"
                  size="small"
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  onChange={handleInputChange}
                  required
                  helperText={helper}
                  fullWidth
                  id="nombreColegio"
                  name="nombreColegio"
                  label="CUIT"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography component="h3" variant="h6">
                  Datos del Chofer
                </Typography>
                <TextField
                  variant="standard"
                  margin="normal"
                  onChange={handleInputChange}
                  required
                  helperText={helper}
                  fullWidth
                  id="nombreColegio"
                  name="nombreColegio"
                  label="Nombre y apellido"
                  size="small"
                />
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    onChange={handleInputChange}
                    required
                    fullWidth
                    id="direccColegio"
                    name="direccColegio"
                    label="DNI"
                    // autoComplete="street-address"
                    size="small"
                  />
                  <TextField
                    variant="standard"
                    margin="normal"
                    onChange={handleInputChange}
                    required
                    helperText={helper}
                    fullWidth
                    id="nombreColegio"
                    name="nombreColegio"
                    label="CUIT"
                    size="small"
                  />
                  <TextField
                    variant="standard"
                    margin="normal"
                    onChange={handleInputChange}
                    required
                    helperText={helper}
                    fullWidth
                    id="nombreColegio"
                    name="nombreColegio"
                    label="Vto Registro"
                    size="small"
                    placeholder="DD/MM/AAAA"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography component="h3" variant="h6">
                  Datos del vehiculo
                </Typography>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="direccColegio"
                  name="direccColegio"
                  label="Titular del vehiculo"
                  // autoComplete="street-address"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="localidadColegio"
                  name="localidadColegio"
                  label="Vehiculo(marca/modelo)"
                  // autoComplete="address-level1"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="emailColegio"
                  label="Patente"
                  name="patente"
                  // autoComplete="email"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="localidadColegio"
                  name="localidadColegio"
                  label="Año"
                  // autoComplete="address-level1"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="telColegio"
                  name="telColegio"
                  label="Compañia de seguro"
                  // autoComplete="tel"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  name="nombreDirectivo"
                  required
                  fullWidth
                  id="nombreDirectivo"
                  label="Nº poliza"
                  // autoComplete="given-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  name="nombreDirectivo"
                  required
                  fullWidth
                  id="nombreDirectivo"
                  label="Vto poliza"
                  // autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label=" Nº habilitación municipal"
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label="Vto habilitación"
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label="Nº certificado Técnico / VTV"
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label="Vto VTV"
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label="Capacidad"
                  // autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label="Vto cupón de pago"
                  // autoComplete="family-name"
                />
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
                alignItems="center"
                spacing={2}
                sx={{ mt: 1 }}
              >
                {/*<ImageForm title="Nuevo" />*/}
                <Grid>
                  {/*<img id="dniFront" src={imgPreview} style={{width: 56, height: 56}}/>*/}
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => setImgData({ preview: noImg })}
                    sx={{ zIndex: "tooltip" }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    onChange={handleInputChange}
                    variant="rounded"
                    id="dniTitF"
                    alt="no-photo"
                    src={imgData.preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
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
                </Grid>
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => setDniTitDImgPreview(noImg)}
                    sx={{ zIndex: "tooltip" }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={dniTitDPreview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
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
                      id="files"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleDniTitDPreview}
                    />
                  </Button>
                </Grid>
                <Grid>
                  {/*<img id="dniFront" src={imgPreview} style={{width: 56, height: 56}}/>*/}
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => setDniChofFImgPreview(noImg)}
                    sx={{ zIndex: "tooltip" }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={dniChofFPreview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
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
                      id="files"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleDniChofFPreview}
                    />
                  </Button>
                </Grid>
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => setDniChofDImgPreview(noImg)}
                    sx={{ zIndex: "tooltip" }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    variant="rounded"
                    id="dniFront"
                    name="dniFront"
                    alt="no-photo"
                    src={dniChofDPreview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
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
                      id="files"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleDniChofDPreview}
                    />
                  </Button>
                </Grid>
                {/**Inicio habilitacion foto 1 */}
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => setHab1Preview(noImg)}
                    sx={{ zIndex: "tooltip" }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={hab1Preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
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
                    habilitación foto 1
                    <input
                      hidden
                      id="files"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleHab1Preview}
                    />
                  </Button>
                </Grid>
                {/**Fin habilitacion foto 1 */}
                {/**Inicio habilitacion foto 2 */}
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => setHab2Preview(noImg)}
                    sx={{ zIndex: "tooltip" }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={hab2Preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
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
                      id="files"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleHab2Preview}
                    />
                  </Button>
                </Grid>
                {/**Fin habilitacion foto 2 */}
                {/**Inicio poliza foto 1 */}
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => setPol1Preview(noImg)}
                    sx={{ zIndex: "tooltip" }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={pol1Preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
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
                      id="files"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handlePol1Preview}
                    />
                  </Button>
                </Grid>
                {/**Fin poliza foto 1 */}
                {/**Inicio poliza foto 2 */}
                <Grid>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => setPol2Preview(noImg)}
                    sx={{ zIndex: "tooltip" }}
                  >
                    <Tooltip title="Eliminar imagen">
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                  <Avatar
                    variant="rounded"
                    id="dniFront"
                    alt="no-photo"
                    src={pol2Preview}
                    sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                    style={{
                      border: "0.1px solid  #E7441060",
                    }}
                  ></Avatar>
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
                      id="files"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handlePol2Preview}
                    />
                  </Button>
                </Grid>
                {/**Fin poliza foto 2 */}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {/**Inicio seguro foto 1 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => setSeg1Preview(noImg)}
                  sx={{ zIndex: "tooltip" }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={seg1Preview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
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
                  seguro foto 1
                  <input
                    hidden
                    id="files"
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleSeg1Preview}
                  />
                </Button>
              </Grid>
              {/**Fin seguro foto 1 */}
              {/**Inicio seguro foto 2 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => setSeg2Preview(noImg)}
                  sx={{ zIndex: "tooltip" }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={seg2Preview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
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
                    id="files"
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleSeg2Preview}
                  />
                </Button>
              </Grid>
              {/**Fin seguro foto 2 */}
              {/**Inicio registro titular foto 1 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => setRegTitFImgPreview(noImg)}
                  sx={{ zIndex: "tooltip" }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={regTitFPreview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
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
                    id="files"
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleRegTitFPreview}
                  />
                </Button>
              </Grid>
              {/**Fin registro titular foto 1 */}
              {/**Inicio registro titular foto 2 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => setRegTitDImgPreview(noImg)}
                  sx={{ zIndex: "tooltip" }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={regTitDPreview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
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
                    id="files"
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleRegTitDPreview}
                  />
                </Button>
              </Grid>
              {/**Fin registro titular foto 2 */}
              {/**Inicio registro chofer foto 1 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => setRegChofFImgPreview(noImg)}
                  sx={{ zIndex: "tooltip" }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={regChofFPreview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
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
                    id="files"
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleRegChofFPreview}
                  />
                </Button>
              </Grid>
              {/**Fin registro chofer foto 1 */}
              {/**Inicio registro chofer foto 2 */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => setRegChofDImgPreview(noImg)}
                  sx={{ zIndex: "tooltip" }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={regChofDPreview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
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
                    id="files"
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleRegChofDPreview}
                  />
                </Button>
              </Grid>
              {/**Fin registro chofer foto 2 */}
              {/**Inicio foto vtv */}
              <Grid>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => setVtvPreview(noImg)}
                  sx={{ zIndex: "tooltip" }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  variant="rounded"
                  id="dniFront"
                  alt="no-photo"
                  src={vtvPreview}
                  sx={{ width: 100, height: 100, m: 2, mt: -4 }}
                  style={{
                    border: "0.1px solid  #E7441060",
                  }}
                ></Avatar>
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
                    id="files"
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleVtvPreview}
                  />
                </Button>
              </Grid>
              {/**Fin registro foto vtv */}
            </Grid>
            <Grid container justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                endIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                Guardar
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
