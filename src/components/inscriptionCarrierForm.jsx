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
import SendIcon from "@mui/icons-material/Send";
import esLocale from "date-fns/locale/es";
import format from "date-fns/format";
import AlertDialog from "./alertDialog";
import { createNewInscription } from "../services";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

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
  const [OpenDialog, setOpenDialog] = useState(false);
  const [contentDialog, setContentDialog] = useState("");

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
    if (data.nombreColegio == null || "") {
      setNombreFocused(true);
    } else if (data.direccColegio == null || "") {
      setDireccFocus(true);
    } else if (data.localidadColegio == null || "") {
      setLocalidadFocus(true);
    } else if (data.emailColegio == null || "") {
      setEmailFocus(true);
    } else if (data.telColegio == null || "") {
      setTelFocus(true);
    } else if (data.nombreDirectivo == null || "") {
      setNombreDFocus(true);
    } else if (data.apellidoDirectivo == null || "") {
      setApellidoDFocus(true);
    } else if (data.nombreTransportista == null || "") {
      setTansportFocus(true);
    } else if (data.dateViaje == null || "") {
      setDateFocus(true);
    } else if (data.timeViaje == null || "") {
      setTimeFocus(true);
    } else {
      try {
        const res = await createNewInscription(data);
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
      } catch {
        setContentDialog("error");
        handleOpenDialog();
        setTimeout(handleCloseDialog, 2000);
      }
    }
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
              <Grid item xs={6}>
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
                  id="nombreColegio"
                  name="nombreColegio"
                  label="Nº Asociado"
                  variant="standard"
                  helperText={errorMessage}
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
              </Grid>
              <Grid item xs={6}>
                <Typography component="h3" variant="h6">
                  Datos del Chofer
                </Typography>
                <TextField
                  margin="normal"
                  onChange={handleInputChange}
                  required
                  focused={nombreFocused}
                  helperText={helper}
                  fullWidth
                  id="nombreColegio"
                  name="nombreColegio"
                  label="Nombre y apellido"
                  size="small"
                />
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    onChange={handleInputChange}
                    required
                    fullWidth
                    focused={direccFocus}
                    id="direccColegio"
                    name="direccColegio"
                    label="DNI"
                    autoComplete="street-address"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography component="h3" variant="h6">
                  Datos del vehiculo
                </Typography>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={direccFocus}
                  id="direccColegio"
                  name="direccColegio"
                  label="Titular del vehiculo"
                  autoComplete="street-address"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={localidadFocus}
                  id="localidadColegio"
                  name="localidadColegio"
                  label="Vehiculo"
                  autoComplete="address-level1"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={emailFocus}
                  id="emailColegio"
                  label="Patente"
                  name="patente"
                  autoComplete="email"
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={telFocus}
                  id="telColegio"
                  name="telColegio"
                  label="Cia de seguro"
                  autoComplete="tel"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  onChange={handleInputChange}
                  name="nombreDirectivo"
                  required
                  fullWidth
                  focused={nombreDFocus}
                  id="nombreDirectivo"
                  label="Nº poliza"
                  autoComplete="given-name"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  onChange={handleInputChange}
                  name="nombreDirectivo"
                  required
                  fullWidth
                  focused={nombreDFocus}
                  id="nombreDirectivo"
                  label="Vto poliza"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={apellidoDFocus}
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label="Habilitación municipal"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={apellidoDFocus}
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label="Vto habilitación"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={apellidoDFocus}
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label="Certificado Técnico / VTV"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={apellidoDFocus}
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label="Vto VTV"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={apellidoDFocus}
                  id="apellidoDirectivo"
                  name="apellidoDirectivo"
                  label="Capacidad"
                  autoComplete="family-name"
                />
              </Grid>
              <Typography
                sx={{
                  marginTop: 2,
                  marginLeft: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                component="h5"
                variant="h6"
              >
                Ingrese los datos del transportista
              </Typography>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={tansportFocus}
                  id="nombreTransportista"
                  label="Nombre y Apellido del transportista"
                  name="nombreTransportista"
                />
              </Grid>
              <br />
              <Typography
                sx={{
                  marginTop: 2,
                  marginLeft: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                component="h5"
                variant="h6"
              >
                Ingrese los datos del viaje
              </Typography>
              <Grid item xs={12}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={esLocale}
                >
                  <Stack spacing={3}>
                    <DatePicker
                      focused={dateFocus}
                      name="dateViaje"
                      label="Fecha de salida"
                      value={datePickerValue}
                      onSubmit={handleInputChange}
                      inputFormat="dd/MM/yyyy"
                      onChange={(newValue) => dateOnChange(newValue)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                      inputFormat="HH:mm"
                      focused={timeFocus}
                      ampm={false}
                      name="timeViaje"
                      label="Hora de salida"
                      value={timePickerValue}
                      onChange={(newValue) => timeOnChange(newValue)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              endIcon={<SendIcon />}
              onClick={handleSubmit}
            >
              Enviar formulario
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
