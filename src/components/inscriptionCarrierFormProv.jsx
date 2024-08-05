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
  uploadImageById,
  getPdf,
  deleteImageById,
  filterImgByIdType,
} from "../services/provincial";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import noImg from "../img/no-photo.png";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from "@mui/icons-material/CancelTwoTone";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import {
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import ImageForm from "./imageForm";
import { useEffect } from "react";
import API from "../utils/const";
import ImageDialog from "./imgDialog";
import Loader from "./loader";
import getImgPath from "../utils/imageHelper";
import ViewDelete from "./viewDelete";

const theme = createTheme({
  palette: {
    primary: { main: "#37bbed" },
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
        for (const property in res[0]) {
          setData(res[0]);
        }
        try {
          setDniTitF(
            imgs.data.filter((e) => e.img_nombre === "dniTitF").length === 0 ||
              !getImgPath("dniTitF", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "dniTitD").length === 0 ||
              !getImgPath("dniTitD", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "dniChofF").length === 0 ||
              !getImgPath("dniChofF", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "dniChofD").length === 0 ||
              !getImgPath("dniChofD", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "hab1").length === 0 ||
              !getImgPath("hab1", imgs.data)
              ? { preview: noImg }
              : {
                  preview: `${API.imgURI}/${
                    imgs.data.filter((e) =>
                      e.img_nombre === "hab1" ? e.img_path : ""
                    )[0].img_path
                  }`,
                }
          );
          setHab2(
            imgs.data.filter((e) => e.img_nombre === "hab2").length === 0 ||
              !getImgPath("hab2", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "pol1").length === 0 ||
              !getImgPath("pol1", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "pol2").length === 0 ||
              !getImgPath("pol2", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "seg1").length === 0 ||
              !getImgPath("seg1", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "seg2").length === 0 ||
              !getImgPath("seg2", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "regTitF").length === 0 ||
              !getImgPath("regTitF", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "regTitD").length === 0 ||
              !getImgPath("regTitD", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "regChofF").length === 0 ||
              !getImgPath("regChofF", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "regChofD").length === 0 ||
              !getImgPath("regChofD", imgs.data)
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
            imgs.data.filter((e) => e.img_nombre === "vtv").length === 0 ||
              !getImgPath("vtv", imgs.data)
              ? { preview: noImg }
              : {
                  preview: `${API.imgURI}/${
                    imgs.data.filter((e) =>
                      e.img_nombre === "vtv" ? e.img_path : ""
                    )[0].img_path
                  }`,
                }
          );
          setCedulaVerdeFront(
            imgs.data.filter((e) => e.img_nombre === "cedulaVerdeFront")
              .length === 0 || !getImgPath("cedulaVerdeFront", imgs.data)
              ? { preview: noImg }
              : {
                  preview: `${API.imgURI}/${
                    imgs.data.filter((e) =>
                      e.img_nombre === "cedulaVerdeFront" ? e.img_path : ""
                    )[0].img_path
                  }`,
                }
          );
          setCedulaVerdeBack(
            imgs.data.filter((e) => e.img_nombre === "cedulaVerdeBack")
              .length === 0 || !getImgPath("cedulaVerdeBack", imgs.data)
              ? { preview: noImg }
              : {
                  preview: `${API.imgURI}/${
                    imgs.data.filter((e) =>
                      e.img_nombre === "cedulaVerdeBack" ? e.img_path : ""
                    )[0].img_path
                  }`,
                }
          );
          setTitulo(
            imgs.data.filter((e) => e.img_nombre === "titulo").length === 0 ||
              !getImgPath("titulo", imgs.data)
              ? { preview: noImg }
              : {
                  preview: `${API.imgURI}/${
                    imgs.data.filter((e) =>
                      e.img_nombre === "titulo" ? e.img_path : ""
                    )[0].img_path
                  }`,
                }
          );
          setAnexoTitulo(
            imgs.data.filter((e) => e.img_nombre === "anexoTitulo").length ===
              0 || !getImgPath("anexoTitulo", imgs.data)
              ? { preview: noImg }
              : {
                  preview: `${API.imgURI}/${
                    imgs.data.filter((e) =>
                      e.img_nombre === "anexoTitulo" ? e.img_path : ""
                    )[0].img_path
                  }`,
                }
          );
        } catch {}
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
          setHabilitacion_colonia(
            res[0].habilitacion_colonia === null
              ? ""
              : res[0].habilitacion_colonia
          );
          setVtoHabilitacion_colonia(
            res[0].vtoHabilitacion_colonia === null
              ? null
              : parceDateDb(res[0].vtoHabilitacion_colonia)
          );
          setExcursion_tipo(res[0].tipo_habilitacion);
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

  const [loading, setLoading] = useState(false);
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
  const [habilitacion_colonia, setHabilitacion_colonia] = useState("");
  const [excusion_tipo, setExcursion_tipo] = useState("");

  const [data, setData] = useState({});
  const [OpenDialog, setOpenDialog] = useState(false);
  const [contentDialog, setContentDialog] = useState({});

  const [vtoRegistro, setVtoRegistro] = useState(null);
  const [vtoProrroga, setVtoProrroga] = useState(null);
  const [vtoPoliza, setVtoPoliza] = useState(null);
  const [vtoHab, setVtoHab] = useState(null);
  const [vtoVtv, setVtoVtv] = useState(null);
  const [vtoCupon, setVtoCupon] = useState(null);
  const [vtoHabilitacion_colonia, setVtoHabilitacion_colonia] = useState(null);
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
  const [cedulaVerdeFront, setCedulaVerdeFront] = useState({ preview: noImg });
  const [cedulaVerdeBack, setCedulaVerdeBack] = useState({ preview: noImg });
  const [titulo, setTitulo] = useState({ preview: noImg });
  const [anexoTitulo, setAnexoTitulo] = useState({ preview: noImg });

  const [viewPreview, setViewPreview] = useState({ state: false });

  const [dniTitFPreview, setDniTitFImgPreview] = useState(noImg);
  const [dniTitDPreview, setDniTitDImgPreview] = useState(noImg);

  const [deletedImgList, setDeletedImgList] = useState([1, 2, 3]);

  const [switchState, setSwitchState] = useState(true);
  const [showDeletedImages, setShowDeletedImages] = useState(false);
  const [existDeletedImages, setExistDeletedImages] = useState(false);
  const [fromViewDelete, setFromViewDelete] = useState({});

  const handleImageSelected = (imgObj) => {
    // console.log('url', fromViewDelete.type)
    fromViewDelete.type({
      preview: `${API.imgURI}/${imgObj}`,
      restore_url: true,
      img_nombre: fromViewDelete.img_name,
      prov_id: prov_asoc,
      new_url: imgObj,
    });
    handleCloseDeleteDialog();
  };

  useEffect(() => {
    // Este efecto se ejecuta cada vez que 'fromViewDelete' se actualiza
    if (fromViewDelete) {
      console.log(fromViewDelete.img_name);
    }
  }, [fromViewDelete]); // El efecto se ejecuta solo cuando 'fromViewDelete' cambia

  const handleOpenDeleteDialog = async (title, tp, img_name) => {
    setFromViewDelete({ title: title, type: tp, img_name: img_name });
    try {
      const deletedImagesStatus = await verImagenesBorradas(
        prov_asoc,
        img_name
      );
      console.log("lista de eliminados", deletedImagesStatus.archivos);
      setDeletedImgList(deletedImagesStatus.archivos);
      setShowDeletedImages(true);
    } catch (error) {
      console.error("Error al obtener imágenes borradas:", error);
      // Aquí puedes manejar el error según sea necesario
    }
  };

  const handleCloseDeleteDialog = () => {
    setShowDeletedImages(false);
  };

  const setearLoading = () => {
    setLoading(true);
    console.log("loading status", loading);
  };

  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
  };

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
  const handleCedulaVerdeFrontPreview = (e) => {
    setCedulaVerdeFront({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleCedulaVerdeBackPreview = (e) => {
    setCedulaVerdeBack({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleTituloPreview = (e) => {
    setTitulo({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };
  const handleAnexoTituloPreview = (e) => {
    setAnexoTitulo({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
      img_nombre: e.target.name,
      prov_id: document.getElementById("prov_asoc").value,
    });
  };

  const guardarImg = async (data) => {
    try {
      if (data.img_nombre !== undefined) {
        const resImg = await uploadImage(
          data.img,
          data.img_nombre,
          data.prov_id
        );
        return resImg.status;
      }
    } catch (error) {
      return error;
    }
  };

  const actualizarImg = async (data) => {
    try {
      if (data.restore_url && data.restore_url === true) {
        const resImg = await deleteImageById(
          data.img_nombre,
          data.prov_id,
          data.new_url
        );
        return resImg.status;
      }
      if (data.img === "") {
        const resImg = await deleteImageById(data.img_nombre, data.prov_id);
        return resImg.status;
      } else if (data.img_nombre !== undefined) {
        const resImg = await uploadImageById(
          data.img,
          data.img_nombre,
          data.prov_id
        );
        return resImg.status;
      }
    } catch (error) {
      return error;
    }
  };

  const handleChangeExcursion = (event) => {
    setExcursion_tipo(event.target.value);
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
    navigate("/padron-provincial", { replace: false });
    window.location.reload();
  };

  const handlePDF = async () => {
    const paraPdf = { userId: 132 };
    await getPdf(paraPdf);
  };

  const handleTest = () => {
    console.log(data);
  };

  const handleSubmit = async (event) => {
    let res;
    event.preventDefault();

    if (props.id === undefined) {
      if (prorroga === false) {
        setData({
          ...data,
          chofer_prorroga: "0000-00-00",
        });
      }
      try {
        setLoading(true);
        if (props.id === undefined) {
          res = await createNewProv(data); //work!!!
        }

        await guardarImg(dniTitF);
        await guardarImg(dniTitD);
        await guardarImg(dniChofF);
        await guardarImg(dniChofD);
        await guardarImg(hab1);
        await guardarImg(hab2);
        await guardarImg(pol1);
        await guardarImg(pol2);
        await guardarImg(seg1);
        await guardarImg(seg2);
        await guardarImg(regTitF);
        await guardarImg(regTitD);
        await guardarImg(regChofF);
        await guardarImg(regChofD);
        await guardarImg(vtv);
        await guardarImg(cedulaVerdeFront);
        await guardarImg(cedulaVerdeBack);
        await guardarImg(titulo);
        await guardarImg(anexoTitulo);
        console.log(res.data);
        if (res.data.status === "success") {
          setLoading(false);
          setContentDialog({
            title: "Guardado exitoso",
            status: res.data.status,
            message: res.data.message,
          });
          handleOpenDialog();
          setTimeout(handleCloseDialog, 1000);
          setTimeout(reload, 1000);
        } else {
          setContentDialog({
            title: "Error durante el guardado",
            status: res.data.status,
            message: res.data.message,
          });
          handleOpenDialog();
          setLoading(false);
          setTimeout(handleCloseDialog, 2000);
        }
      } catch (e) {
        console.log("error handle");
        console.log(res.data);
        setContentDialog({
          title: "Error durante el guardado",
          status: "error",
          message:
            "Verifique que todos los campos obligatorios(*) están completos",
        });
        handleOpenDialog();
        setLoading(false);
        setTimeout(handleCloseDialog, 3000);
      }
      // }
    } else {
      setLoading(true);
      await actualizarImg(dniTitF);
      await actualizarImg(dniTitD);
      await actualizarImg(dniChofF);
      await actualizarImg(dniChofD);
      await actualizarImg(hab1);
      await actualizarImg(hab2);
      await actualizarImg(pol1);
      await actualizarImg(pol2);
      await actualizarImg(seg1);
      await actualizarImg(seg2);
      await actualizarImg(regTitF);
      await actualizarImg(regTitD);
      await actualizarImg(regChofF);
      await actualizarImg(regChofD);
      await actualizarImg(vtv);
      await actualizarImg(cedulaVerdeFront);
      await actualizarImg(cedulaVerdeBack);
      await actualizarImg(titulo);
      await actualizarImg(anexoTitulo);
      
      res = await updateProv(data, props.id);
      if (res.data.status === "success") {
        setLoading(false);
        setContentDialog({
          title: "Guardado exitoso",
          status: res.data.status,
          message: res.data.message,
        });
        handleOpenDialog();
        setTimeout(handleCloseDialog, 1000);
        setTimeout(reload, 1000);
      } else {
        setContentDialog({
          title: "Error durante el guardado",
          status: res.data.status,
          message: res.data.message,
        });
        handleOpenDialog();
        setLoading(false);
        setTimeout(handleCloseDialog, 2000);
      }
    }
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

  const setearData = (name, data) => {
    setData({
      ...data,
      [name]: data,
    });
  };

  function copiarDatosTitular() {
    setChofer(prov_nombre);
    setChofer_dni(prov_dni);
    setChofer_cuitSocio(chofer_cuitTitular);
    setData({
      ...data,
      chofer: prov_nombre,
      chofer_dni: prov_dni,
      chofer_cuitSocio: chofer_cuitTitular,
    });
  }

  const deleteImage = (imageSetter, imageId) => {
    if (userType === "administrador") {
      imageSetter({
        preview: noImg,
        img: "",
        img_nombre: imageId,
        prov_id: document.getElementById("prov_asoc").value,
        restore_url: false,
      });
    }
  };

  const verImagenesBorradas = async (id, tipo) => {
    try {
      if (tipo !== undefined) {
        const resImg = await filterImgByIdType(id, tipo);
        console.log("id y tipo ", id, tipo);
        console.log("res", resImg);
        return resImg;
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* {loading && (
        <LinearProgress sx={{ width: "110%", mt: "-16px", ml: "-22px" }} />
      )} */}
      <Loader open={loading} title="Cargando..." />
      <Container component="main" maxWidth="xl">
        <ImageDialog
          image={imgUrl}
          open={viewPreview.state}
          close={handeClickClosePreview}
        ></ImageDialog>
        <ViewDelete
          list={deletedImgList}
          key={fromViewDelete.type}
          open={showDeletedImages}
          close={handleCloseDeleteDialog}
          title={fromViewDelete.title}
          userId={prov_asoc}
          onSelectImage={handleImageSelected}
        />
        <AlertDialog
          open={OpenDialog}
          close={handleCloseDialog}
          status={contentDialog.status}
          message={contentDialog.message}
          title={contentDialog.title}
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
                  Datos del titular
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
                  label="CUIT/CUIL"
                  size="small"
                  inputProps={{
                    disabled: userType === "administrador" ? false : true,
                  }}
                />
                <FormControl
                  id="form-control"
                  sx={{ mt: 4 }}
                  fullWidth
                  size="small"
                >
                  <InputLabel id="tipo_habilitacion-label">
                    Tipo de habilitación
                  </InputLabel>
                  <Select
                    labelId="tipo-habilitacion-label"
                    id="tipo_habilitacion"
                    name="tipo_habilitacion"
                    value={excusion_tipo}
                    label="Tipo de habilitación"
                    onChange={(e) => handleInputChange(e, setExcursion_tipo)}
                  >
                    <MenuItem value="">
                      <em>Ninguno</em>
                    </MenuItem>
                    <MenuItem value={"A"}>Excursión clase A</MenuItem>
                    <MenuItem value={"B"}>Excursión clase B</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box
                  m={1}
                  //margin
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Typography component="h3" variant="h6">
                    Datos del Chofer
                  </Typography>
                  {
                    <Button
                      onClick={() => copiarDatosTitular()}
                      variant="contained"
                      color="primary"
                      sx={{ height: 40 }}
                    >
                      Copiar Datos Titular
                    </Button>
                  }
                </Box>
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
                    label="CUIT/CUIL"
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
                      label="Vto Registro(*)"
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
                  label="Marca"
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
                    label="Vto poliza(*)"
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
              {/* Colonia */}
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={(e) =>
                    handleInputChange(e, setHabilitacion_colonia)
                  }
                  required
                  fullWidth
                  id="habilitacion_colonia"
                  name="habilitacion_colonia"
                  value={habilitacion_colonia}
                  label=" Nº habilitación municipal Colonia"
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
                    label="Vto habilitación Colonia(*)"
                    value={vtoHabilitacion_colonia}
                    onChange={(date) =>
                      dateOnChange(
                        date,
                        setVtoHabilitacion_colonia,
                        "vtoHabilitacion_colonia"
                      )
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
              {/* Colonia */}
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  onChange={(e) => handleInputChange(e, setChofer_habilitacion)}
                  required
                  fullWidth
                  id="chofer_habilitacion"
                  name="chofer_habilitacion"
                  value={chofer_habilitacion}
                  label=" Nº habilitación provincial"
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
                    label="Vto habilitación(*)"
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
                    label="Vto VTV(*)"
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
                  required
                  variant="standard"
                  onChange={(e) =>
                    handleInputChange(e, setChofer_vehiculoCapacidad)
                  }
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
                    label="Vto Cupón(*)"
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
              <Typography variant="caption" display="block" gutterBottom>
                En caso de que el titular del vehículo y el chofer sean la misma
                persona, solo es necesario subir la documentación del chofer.
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
                <Box width={100} alignItems="center" mr={2}>
                  {/*<img id="dniFront" src={imgPreview} style={{width: 56, height: 56}}/>*/}
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={
                      () => deleteImage(setDniTitF, "dniTitF")
                      // userType === "administrador"
                      //   ? setDniTitF({ preview: noImg })
                      //   : ""
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
                        minWidth: "100px",
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
                  <Button
                    onClick={() =>
                      handleOpenDeleteDialog(
                        "DNI Titular Frente",
                        setDniTitF,
                        "dniTitF"
                      )
                    }
                    disabled={props.id ? false : true}
                    color="error"
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    variant="outlined"
                  >
                    Eliminadas
                  </Button>
                </Box>
                <Box width={100} alignItems="center" mr={2}>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => deleteImage(setDniTitD, "dniTitD")}
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
                        minWidth: "100px",
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
                        minWidth: "100px",
                        textAlign: "center",
                        cursor: "context-menu",
                      }}
                      component="label"
                      variant="text"
                    >
                      DNI Titular Dorso
                    </Button>
                  )}
                  <Button
                    onClick={() =>
                      handleOpenDeleteDialog(
                        "DNI Titular Dorso",
                        setDniTitD,
                        "dniTitD"
                      )
                    }
                    disabled={props.id ? false : true}
                    color="error"
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    variant="outlined"
                  >
                    Eliminadas
                  </Button>
                </Box>
                <Box width={100} alignItems="center" mr={2}>
                  {/*<img id="dniFront" src={imgPreview} style={{width: 56, height: 56}}/>*/}
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => deleteImage(setDniChofF, "dniChofF")}
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
                  <Button
                    onClick={() =>
                      handleOpenDeleteDialog(
                        "DNI Chofer Frente",
                        setDniChofF,
                        "dniChofF"
                      )
                    }
                    disabled={props.id ? false : true}
                    color="error"
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    variant="outlined"
                  >
                    Eliminadas
                  </Button>
                </Box>
                <Box width={100} alignItems="center" mr={2}>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => deleteImage(setDniChofD, "dniChofD")}
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
                        id="dniChofD"
                        name="dniChofD"
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
                  <Button
                    onClick={() =>
                      handleOpenDeleteDialog(
                        "DNI Chofer Dorso",
                        setDniChofD,
                        "dniChofD"
                      )
                    }
                    disabled={props.id ? false : true}
                    color="error"
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    variant="outlined"
                  >
                    Eliminadas
                  </Button>
                </Box>
                {/**Inicio habilitacion foto 1 */}
                <Box width={100} alignItems="center" mr={2}>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => deleteImage(setHab1, "hab1")}
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
                  <Button
                    onClick={() =>
                      handleOpenDeleteDialog(
                        "Habilitación foto 1",
                        setHab1,
                        "hab1"
                      )
                    }
                    disabled={props.id ? false : true}
                    color="error"
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    variant="outlined"
                  >
                    Eliminadas
                  </Button>
                </Box>
                {/**Fin habilitacion foto 1 */}
                {/**Inicio habilitacion foto 2 */}
                <Box width={100} alignItems="center" mr={2}>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => deleteImage(setHab2, "hab2")}
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
                  <Button
                    onClick={() =>
                      handleOpenDeleteDialog("Habilitacion 2", setHab2, "hab2")
                    }
                    disabled={props.id ? false : true}
                    color="error"
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    variant="outlined"
                  >
                    Eliminadas
                  </Button>
                </Box>
                {/**Fin habilitacion foto 2 */}
                {/**Inicio poliza foto 1 */}
                <Box width={100} alignItems="center" mr={2}>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => deleteImage(setPol1, "pol1")}
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
                  <Button
                    onClick={() =>
                      handleOpenDeleteDialog("Poliza foto 1", setPol1, "pol1")
                    }
                    disabled={props.id ? false : true}
                    color="error"
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    variant="outlined"
                  >
                    Eliminadas
                  </Button>
                </Box>
                {/**Fin poliza foto 1 */}
                {/**Inicio poliza foto 2 */}
                <Box width={100} alignItems="center" mr={2}>
                  <IconButton
                    aria-label="clearImg"
                    color="error"
                    onClick={() => deleteImage(setPol2, "pol2")}
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
                  <Button
                    onClick={() =>
                      handleOpenDeleteDialog("Poliza foto 2", setPol2, "pol2")
                    }
                    disabled={props.id ? false : true}
                    color="error"
                    sx={{
                      m: 2,
                      mt: -1,
                      maxWidth: "100px",
                      textAlign: "center",
                    }}
                    variant="outlined"
                  >
                    Eliminadas
                  </Button>
                </Box>
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
              <Box width={100} alignItems="center" mr={2}>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => deleteImage(setSeg1, "seg1")}
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
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog("Seguro Hoja 1", setSeg1, "seg1")
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin seguro foto 1 */}
              {/**Inicio seguro foto 2 */}
              <Box width={100} alignItems="center" mr={2}>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => deleteImage(setSeg2, "seg2")}
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
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog("Seguro Hoja 2", setSeg2, "seg2")
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin seguro foto 2 */}
              {/**Inicio registro titular foto 1 */}
              <Box width={100} alignItems="center" mr={2}>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => deleteImage(setRegTitF, "regTitF")}
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
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog(
                      "Registro titular frente",
                      setRegTitF,
                      "regTitF"
                    )
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin registro titular foto 1 */}
              {/**Inicio registro titular foto 2 */}
              <Box width={100} alignItems="center" mr={2}>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => deleteImage(setRegTitD, "regTitD")}
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
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog(
                      "Registro titular dorso",
                      setRegTitD,
                      "regTitD"
                    )
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin registro titular foto 2 */}
              {/**Inicio registro chofer foto 1 */}
              <Box width={100} alignItems="center" mr={2}>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => deleteImage(setRegChofF, "regChofF")}
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
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog(
                      "Registro chofer frente",
                      setRegChofF,
                      "regChofF"
                    )
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin registro chofer foto 1 */}
              {/**Inicio registro chofer foto 2 */}
              <Box width={100} alignItems="center" mr={2}>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => deleteImage(setRegChofD, "regChofD")}
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
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog(
                      "Registro chofer Dorso",
                      setRegChofD,
                      "regChofD"
                    )
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin registro chofer foto 2 */}
              {/**Inicio foto vtv */}
              <Box width={100} alignItems="center" mr={2}>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => deleteImage(setVtv, "vtv")}
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
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog("Informe VTV", setVtv, "vtv")
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin registro foto vtv */}
              {/**Inicio foto cedula verde frente */}
              <Box width={100} alignItems="center" mr={2}>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() =>
                    deleteImage(setCedulaVerdeFront, "cedulaVerdeFront")
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
                  id="cedulaVerdeFront"
                  name="cedulaVerdeFront"
                  alt="no-photo"
                  src={cedulaVerdeFront.preview}
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
                    cedula verde frente
                    <input
                      hidden
                      id="cedulaVerdeFront"
                      name="cedulaVerdeFront"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleCedulaVerdeFrontPreview}
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
                    cedula verde frente
                  </Button>
                )}
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog(
                      "Cedula verde frente",
                      setCedulaVerdeFront,
                      "cedulaVerdeFront"
                    )
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin Inicio foto cedula verde frente */}
              {/**Inicio foto cedula verde dorso */}
              <Box width={100} alignItems="center" mr={2} id>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() =>
                    deleteImage(setCedulaVerdeBack, "cedulaVerdeBack")
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
                  id="cedulaVerdeBack"
                  name="cedulaVerdeBack"
                  alt="no-photo"
                  src={cedulaVerdeBack.preview}
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
                    cedula verde dorso
                    <input
                      hidden
                      id="cedulaVerdeBack"
                      name="cedulaVerdeBack"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleCedulaVerdeBackPreview}
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
                    cedula verde dorso
                  </Button>
                )}
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog(
                      "Cedula verde dorso",
                      setCedulaVerdeBack,
                      "cedulaVerdeBack"
                    )
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin Inicio foto cedula verde dorso */}
              {/**Inicio foto titulo */}
              <Box width={100} alignItems="center" mr={2}>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => deleteImage(setTitulo, "titulo")}
                  sx={{ zIndex: "tooltip", ml: 1 }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  onClick={handeClickOpenPreview}
                  variant="rounded"
                  id="titulo"
                  name="titulo"
                  alt="no-photo"
                  src={titulo.preview}
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
                    titulo
                    <input
                      hidden
                      id="titulo"
                      name="titulo"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleTituloPreview} //para cambiar
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
                    titulo
                  </Button>
                )}
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog("Titulo", setTitulo, "titulo")
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin Inicio foto Titulo */}
              {/**Inicio foto cedula Anexio Titulo */}
              <Box width={100} alignItems="center" mr={2}>
                <IconButton
                  aria-label="clearImg"
                  color="error"
                  onClick={() => deleteImage(setAnexoTitulo, "anexoTitulo")}
                  sx={{ zIndex: "tooltip", ml: 1 }}
                >
                  <Tooltip title="Eliminar imagen">
                    <CancelIcon />
                  </Tooltip>
                </IconButton>
                <Avatar
                  onClick={handeClickOpenPreview}
                  variant="rounded"
                  id="anexoTitulo"
                  name="anexoTitulo"
                  alt="no-photo"
                  src={anexoTitulo.preview}
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
                    anexo titulo
                    <input
                      hidden
                      id="anexoTitulo"
                      name="anexoTitulo"
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleAnexoTituloPreview}
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
                    anexo titulo
                  </Button>
                )}
                <Button
                  onClick={() =>
                    handleOpenDeleteDialog(
                      "Anexo titulo",
                      setAnexoTitulo,
                      "anexoTitulo"
                    )
                  }
                  disabled={props.id ? false : true}
                  color="error"
                  sx={{
                    m: 2,
                    mt: -1,
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                  variant="outlined"
                >
                  Eliminadas
                </Button>
              </Box>
              {/**Fin Inicio foto Anexo titulo */}
            </Grid>
            {userType === "administrador" ? (
              <Grid container justifyContent="flex-end">
                <Button
                  // type="submit"
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
