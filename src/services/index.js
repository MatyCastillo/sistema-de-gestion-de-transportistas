import axios from "axios";
import API from "../utils/const";

const getAllProv = async () => {
  const petition = await axios.get(`${API.URI}/api/v1/proveedores/`);
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
export {
  getAllProv,
  createNewProv,
  loginService,
  uploadImage,
  getProvById,
  deleteProvById,
  updateProv,
  getImagesById,
};
