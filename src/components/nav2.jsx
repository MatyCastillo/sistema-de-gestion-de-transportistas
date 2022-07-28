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
  Dialog,
  DialogContent,
  DialogTitle,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IncriptionForm from "./inscriptionCarrierForm";
import Tooltip from "@mui/material/Tooltip";
import useUser from "../hooks/useUser";
import AssessmentIcon from "@mui/icons-material/Assessment";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TabUnselectedIcon from "@mui/icons-material/TabUnselected";

const drawerWidth = 240;

const theme2 = createTheme({
  palette: {
    primary: deepOrange,
    secondary: {
      main: "#bf360c",
    },
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
  const { logout } = useUser();
  const [openSideBar, setOpenSideBar] = React.useState(
    !isMobile ? true : false
  );
  const [openModal, setOpenModal] = React.useState(props.form ? true : false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Sistema interno UTEAM
            </Typography>
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
            <Dialog open={openModal} onClose={handleCloseModal} scroll="body">
              <DialogTitle id="scroll-dialog-title">
                Sistema interno UTEAM
              </DialogTitle>
              <DialogContent>
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
                <IncriptionForm />
              </DialogContent>
            </Dialog>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={openSideBar}>
          <Toolbar />
          <List>
            <ListItem
              onClick={handleClickOpenModal}
              key="mail"
              disablePadding
              sx={{ display: "block" }}
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
                  primary="Añadir proveedor"
                  sx={{ opacity: openSideBar ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key="reports" disablePadding sx={{ display: "block" }}>
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
                  <QueryStatsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Reportes"
                  sx={{ opacity: openSideBar ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem key="stadistics" disablePadding sx={{ display: "block" }}>
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
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Estadísticas"
                  sx={{ opacity: openSideBar ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem key="incomplete" disablePadding sx={{ display: "block" }}>
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
                  <TabUnselectedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Incompletos"
                  sx={{ opacity: openSideBar ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
