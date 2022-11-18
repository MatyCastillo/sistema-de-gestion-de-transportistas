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
};
