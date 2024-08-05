import * as React from "react";
import { styled, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { deepOrange } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  Badge,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IncriptionForm from "./inscriptionCarrierForm";
import IncriptionFormProv from "./inscriptionCarrierFormProv";
import Tooltip from "@mui/material/Tooltip";
import useUser from "../hooks/useUser";
import AssessmentIcon from "@mui/icons-material/Assessment";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TabUnselectedIcon from "@mui/icons-material/TabUnselected";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import LogoUteam from "../img/logo-uteam-transparente.png";
import AvatarNab from "./avatarNab";
import noAvatar from "../img/no-avatar.png";
import DirectionsCarIcon from "@mui/icons-material/Money";
import BusAlertIcon from "@mui/icons-material/BusAlert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import NotificationsMenu from "./notifications";
import { getNotifications } from "../services";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const theme2 = createTheme({
  palette: {
    primary: { main: deepOrange[500] },
    secondary: {
      main: "#bf360c",
    },
    prov: "#42a5f5",
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const isMobile = window.innerWidth <= 500;

export default function NavBar(props) {
  var userType = sessionStorage.getItem("userType");
  var userName = sessionStorage.getItem("userName");
  const { logout } = useUser();
  const [openSideBar, setOpenSideBar] = React.useState(
    !isMobile ? true : false
  );
  const [openModal, setOpenModal] = React.useState(props.form ? true : false);
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifData, setNotifData] = React.useState([]);
  const [formType, setFormType] = React.useState("");
  const location = useLocation();

  // Acá se cargan las notificaciones desde la base de datos
  React.useEffect(() => {
    (async () => {
      let res;
      res = await getNotifications();

      setNotifData(res.data);
    })();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickOpenModal = () => {
    setFormType("");
    if (userType === "administrador") {
      setOpenModal(true);
    }
  };
  const handleClickOpenModalProv = () => {
    setFormType("prov");
    if (userType === "administrador") {
      setOpenModal(true);
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDrawerOpen = () => {
    setOpenSideBar(true);
  };

  const handleDrawerClose = () => {
    setOpenSideBar(false);
  };

  return (
    <ThemeProvider theme={theme2}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* <AppBar position="fixed"> 
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={openSideBar ? handleDrawerClose : handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <img
              component={Link}
              to="/"
              src={LogoUteam}
              alt="logo"
              style={{ width: "50px", marginRight: " 10px" }}
            />
            <Typography
              variant={isMobile ? "body1" : "h6"}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Sistema {isMobile ? <br /> : ""} interno UTEAM
            </Typography>
            {/*Notificaciones*/}
            {/*https://codesandbox.io/s/8k4gvv?file=/demo.tsx Sacar de ahi como mostrar las notificaciones*/}
            <IconButton size="large" color="inherit" onClick={handleMenu}>
              <Badge badgeContent={notifData.length} color="error">
                {/**"badgeContent" da el numero de notif. esto se podria manejar con el legnth del json para mostrar las notif. */}
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <NotificationsMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              handleClose={handleClose}
              data={notifData}
              primaryText="No hay notificaciones disponibles."
              secondaryText=""
            />
            {/*fin notificaciones*/}
            <AvatarNab img={noAvatar} user={userName} />
            <Tooltip
              title={
                userType && userType === "administrador"
                  ? "Los adminstradores puede crear y editar datos"
                  : "Los operadores solo puede visualizar los datos"
              }
            >
              <Typography>
                {userName && userType
                  ? `Bienvenido/a, ${userName.charAt(0).toUpperCase() + userName.slice(1)} (${userType})`
                  : `Bienvenido/a, Nombre (tipo de usario)`}
              </Typography>
            </Tooltip>
            <Tooltip title="Salir">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={logout}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            <Dialog
              open={openModal}
              maxWidth="lg"
              onClose={handleCloseModal}
              scroll="body"
            >
              <DialogTitle
                id="scroll-dialog-title"
                sx={{
                  backgroundColor: formType === "prov" ? "#37BBED" : "#f97146",
                }}
              >
                Formulario de alta |{" "}
                {formType === "prov" ? "Padrón Provincial" : "Padrón General"}
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
                {formType === "prov" ? (
                  <IncriptionFormProv />
                ) : (
                  <IncriptionForm />
                )}
              </DialogContent>
            </Dialog>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={openSideBar}>
          <Toolbar />
          <List>
            <Tooltip title="Añadir al Padron General">
              <ListItem
                onClick={handleClickOpenModal}
                disabled={
                  userType && userType === "administrador" ? false : true
                }
                key="form"
                disablePadding
                sx={
                  isMobile ? { display: "block", mt: 5 } : { display: "block" }
                }
                selected
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openSideBar ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openSideBar ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Añadir socio(PG)"
                    sx={{ opacity: openSideBar ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
            <Tooltip title="Añadir al Padron Provincial">
              <ListItem
                onClick={handleClickOpenModalProv}
                disabled={
                  userType && userType === "administrador" ? false : true
                }
                key="form"
                disablePadding
                sx={
                  isMobile
                    ? { display: "block", mt: 5 }
                    : {
                        display: "block",
                        "&.Mui-selected": {
                          backgroundColor: "#55c6f1c2", // Cambia el color de fondo cuando está seleccionado
                        },
                      }
                }
                selected
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openSideBar ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openSideBar ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Añadir socio(PP)"
                    sx={{ opacity: openSideBar ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </List>
          <Divider />
          <List>
            <Tooltip title="Padrón General" placement="right">
              <ListItem
                selected={location.pathname === "/"}
                component={Link}
                to="/"
                key="reports"
                disablePadding
                sx={{
                  display: "block",
                  "&.Mui-selected": {
                    backgroundColor: "#f97146", // Cambia el color de fondo cuando está seleccionado
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openSideBar ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openSideBar ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Padrón General"
                    sx={{ opacity: openSideBar ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
            <Tooltip title="Padrón Provincial" placement="right">
              <ListItem
                selected={location.pathname === "/padron-provincial"}
                component={Link}
                to="/padron-provincial"
                key="reports"
                disablePadding
                sx={{
                  display: "block",
                  "&.Mui-selected": {
                    backgroundColor: "#37BBED", // Cambia el color de fondo cuando está seleccionado
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openSideBar ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openSideBar ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Padrón Provincial"
                    sx={{ opacity: openSideBar ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
            <Tooltip title="Impresiones Padrón General" placement="right">
              <ListItem
                selected={location.pathname === "/impresiones-general"}
                component={Link}
                to="/impresiones-general"
                disablePadding
                sx={{
                  display: "block",
                  "&.Mui-selected": {
                    backgroundColor: "#f97146", // Cambia el color de fondo cuando está seleccionado
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openSideBar ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openSideBar ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <LocalPrintshopIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Impresiones General"
                    sx={{ opacity: openSideBar ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
            <Tooltip title="Impresiones Padrón Provincial" placement="right">
              <ListItem
                selected={location.pathname === "/impresiones-provincial"}
                component={Link}
                to="/impresiones-provincial"
                disablePadding
                sx={{
                  display: "block",
                  "&.Mui-selected": {
                    backgroundColor: "#37BBED", // Cambia el color de fondo cuando está seleccionado
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openSideBar ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openSideBar ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <LocalPrintshopIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Impresiones Provincial"
                    sx={{ opacity: openSideBar ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
            <ListItem key="stadistics" disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={handleClick}
                sx={{
                  minHeight: 48,
                  justifyContent: openSideBar ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openSideBar ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Reportes"
                  sx={{ opacity: openSideBar ? 1 : 0 }}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemButton
                  selected={location.pathname === "/reportes-logistica"}
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/reportes-logistica"
                >
                  <ListItemIcon>
                    <BusAlertIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logística"
                    sx={{ opacity: openSideBar ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
                <ListItemButton
                  selected={location.pathname === "/reportes-patentes"}
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/reportes-patentes"
                >
                  <ListItemIcon>
                    <DirectionsCarIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Patentes"
                    sx={{ opacity: openSideBar ? 1 : 0, color: "black" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
