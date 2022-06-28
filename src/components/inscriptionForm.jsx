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
import { createNewInscription } from "../functions";
import { useNavigate } from "react-router-dom";

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

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <AlertDialog
          open={OpenDialog}
          close={handleCloseDialog}
          status={contentDialog}
        />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <MapIcon />
          </Avatar>
          {/* <Typography component="h1" variant="h5">
            Formulario de inscripción
          </Typography> */}
          <Typography component="h3" variant="h6">
            Ingrese los datos del colegio
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  focused={nombreFocused}
                  helperText={helper}
                  fullWidth
                  id="nombreColegio"
                  label="Nombre del colegio"
                  name="nombreColegio"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={direccFocus}
                  id="direccColegio"
                  label="Dirección del colegio"
                  name="direccColegio"
                  autoComplete="street-address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={localidadFocus}
                  id="localidadColegio"
                  label="Localidad"
                  name="localidadColegio"
                  autoComplete="address-level1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={emailFocus}
                  id="emailColegio"
                  label="Email del colegio"
                  name="emailColegio"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  focused={telFocus}
                  id="telColegio"
                  label="Teléfono del colegio"
                  name="telColegio"
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  name="nombreDirectivo"
                  required
                  fullWidth
                  focused={nombreDFocus}
                  id="nombreDirectivo"
                  label="Nombre Directivo"
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
                  label="Apellido Directivo"
                  name="apellidoDirectivo"
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
