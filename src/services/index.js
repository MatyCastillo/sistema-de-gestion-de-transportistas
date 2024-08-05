import axios from "axios";
import fileDownload from "js-file-download";
import API from "../utils/const";
import { format } from "date-fns";
const dia = format(new Date(), "dd-MM-yyyy_HH-mm");

const getAllProv = async () => {
  const petition = await axios.get(`${API.URI}/api/v1/proveedores/`);
  return petition.data.data;
};

const getDeleteProvs = async () => {  
  const petition = await axios.get(`${API.URI}/api/v1/proveedores/deleted`);
  return petition.data.data;
};

const getProvById = async (id) => {
  try {
    const petition = await axios.get(
      `${API.URI}/api/v1/proveedores/prov-${id}`
    );
    return petition.data.data;
  } catch (err) {
    return err;
  }
};

const createNewProv = async (data) => {
  try {
    const resp = await axios.post(`${API.URI}/api/v1/proveedores/`, data);
    return resp;
  } catch (err) {
    // Handle Error Here
    return err;
  }
};
const updateProv = async (data, id) => {
  try {
    const resp = await axios.put(`${API.URI}/api/v1/proveedores/${id}`, data);
    return resp;
  } catch (err) {
    // Handle Error Here
    return err;
  }
};

const markAsDeleted = async (data, id) => {
  try {
    const resp = await axios.put(`${API.URI}/api/v1/proveedores/`, data);
    return resp;
  } catch (err) {
    // Handle Error Here
    return err;
  }
};

const deleteProvById = async (id) => {
  const data = { idProveedor: id };
  try {
    const petition = await axios.delete(`${API.URI}/api/v1/proveedores/`, {
      data,
    });
    return petition;
  } catch (err) {
    return err;
  }
};

const loginService = async ({ nombre, password }) => {
  const data = {
    nombre: nombre,
    password: password,
  };
  try {
    const response = await axios.post(`${API.URI}/api/v1/auth/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const uploadImage = async (file, name, id) => {
  const bodyFormData = new FormData();
  bodyFormData.set("img_nombre", name);
  bodyFormData.set("prov_id", id);
  bodyFormData.append("img", file);
  try {
    const resp = await axios.post(
      `${API.URI}/api/v1/proveedores/image?img/`,
      bodyFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return resp;
  } catch (err) {
    // Handle Error Here
    return err;
  }
};

const deleteImageById = async (name, id, url) => {
  console.log("Valores recibidos:", name, id);
  const formData = {
    img_nombre: name,
    prov_id: id,
    new_url: url
  };
  console.log("Datos en formData:", formData);

  try {
    const resp = await axios.put(
      `${API.URI}/api/v1/proveedores/deleteImage/`,
      formData
    );
    return resp;
  } catch (err) {
    // Handle Error Here
    return err;
  }
};

const uploadImageById = async (file, name, id) => {
  const bodyFormData = new FormData();
  bodyFormData.set("img_nombre", name);
  bodyFormData.set("prov_id", id);
  bodyFormData.append("img", file);
  try {
    const resp = await axios.put(
      `${API.URI}/api/v1/proveedores/image?img/`,
      bodyFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return resp;
  } catch (err) {
    // Handle Error Here
    return err;
  }
};

const getImagesById = async (id) => {
  try {
    const petition = await axios.get(
      `${API.URI}/api/v1/proveedores/image/${id}`
    );
    return petition.data;
  } catch (err) {
    return err;
  }
};

const getPdf = async (user) => {
  const prov = await getProvById(user);
  const file_name = `${prov[0].prov_asoc}_${prov[0].prov_nombre}_${dia}hs.pdf`;
  const urlApi = `${API.URI}/api/v1/proveedores/pdf/${user}`;
  const petition = await axios
    .get(urlApi, {
      responseType: "blob",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  return petition;
};

const getYears = async () => {
  let data = [];
  try {
    return await axios
      .get(`${API.URI}/api/v1/proveedores/years`)
      .then((response) => {
        data = response.data.data;
        return data;
      });
  } catch (error) {}
};

const getProvsByYear = async (year) => {
  try {
    const petition = await axios.get(
      `${API.URI}/api/v1/proveedores/year-${year}`
    );
    return petition.data.data;
  } catch (err) {
    return err;
  }
};

const getImagesStatus = async (id) => {
  try {
    const petition = await axios.get(
      `${API.URI}/api/v1/proveedores/imageUps/${id}`
    );
    return petition.data;
  } catch (err) {
    return err;
  }
};

const getRecordsBetweenDates = async (startDate, endDate) => {
  try {
    // Validación de las fechas
    if (!startDate || !endDate) {
      throw new Error("Falta proporcionar las fechas de inicio y/o fin.");
    }

    // Convertir las fechas a objetos Date
    const inicio = new Date(startDate);
    const fin = new Date(endDate);

    // Asegurarse de que la fecha de inicio sea anterior o igual a la fecha de fin
    if (inicio > fin) {
      throw new Error(
        "La fecha de inicio debe ser anterior o igual a la fecha de fin."
      );
    }

    const respuesta = await axios.post(
      `${API.URI}/api/v1/proveedores/searchBetween`,
      { startDate: inicio.toISOString(), endDate: fin.toISOString() }
    );

    if (respuesta.status === 200) {
      return respuesta.data.data; // Suponiendo que el servidor devuelve los registros bajo la propiedad 'data'
    } else {
      throw new Error("Error al obtener los registros entre las fechas.");
    }
  } catch (error) {
    throw error;
  }
};

// Función para generar y descargar el archivo XLSX desde el frontend
async function descargarArchivoXLSX (datos) {
  const startDate = new Date(datos.startDate)
  const formatStartDate = format(startDate, 'dd-MM-yy')
  const endDate = new Date(datos.endDate)
  const formatEndDate = format(endDate, 'dd-MM-yy')
  try {
    const response = await axios.post(`${API.URI}/api/v1/proveedores/searchBetween/generarXlsx`, datos, {
      responseType: 'blob', // Indicar que esperamos una respuesta en formato binario (blob)
    });

    // Crear una URL para el blob recibido
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `desde ${formatStartDate}, hasta ${formatEndDate}.xlsx`); // Nombre del archivo a descargar
    document.body.appendChild(link);
    link.click();

    // Liberar la URL y eliminar el enlace
    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error) {
    console.error('Error al descargar el archivo XLSX:', error);
  }
}

const getNotifications = async  () =>{
  try {
    const response = await axios.get(`${API.URI}/api/v1/notificaciones/`)
    return response.data
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // O realiza alguna acción en caso de error
  }
}

const filterImgByIdType = async (id,tipo) =>{
  try {
    const response = await axios.get(`${API.URI}/api/v1/proveedores/image/${id}/${tipo}`)
    return response.data
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // O realiza alguna acción en caso de error
  }
}

export {
  getAllProv,
  createNewProv,
  loginService,
  uploadImage,
  getProvById,
  deleteProvById,
  updateProv,
  getImagesById,
  markAsDeleted,
  uploadImageById,
  getDeleteProvs,
  getPdf,
  getYears,
  getProvsByYear,
  getImagesStatus,
  getRecordsBetweenDates,
  descargarArchivoXLSX,
  getNotifications,
  deleteImageById,
  filterImgByIdType
};
