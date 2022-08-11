import axios from "axios";
import API from "../utils/const";

const getAllIncriptions = async () => {
  const petition = await axios.get(`${API.URI}/api/v1/inscriptions/`);
  return petition.data.data;
};

const createNewInscription = async (data) => {
  try {
    const resp = await axios.post(`${API.URI}/api/v1/inscriptions/`, data);
    return resp;
  } catch (err) {
    // Handle Error Here
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
    return response.data.token;
  } catch (error) {
    return error;
  }
};

// const uploadImage = (data) => {
//   var data = new FormData();
//   formData.append("fotos", uri_fotos);
//   fetch("http://localhost:8080/api/v1/proveedores/image?img", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "multipart/form-data",
//     },
//     body: data,
//   })
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.code == 1) {
//         console.log("se subio correctamente");
//       } else {
//         console.log("Hubo un error");
//       }
//     });
// };

const uploadImage = async (file, name, id) => {
  const form = new FormData();
  form.append("img_nombre", "name");
  form.append("prov_id", "23");
  form.append("img", file);
  console.log(form);
  try {
    const resp = await axios.post(
      `${API.URI}/api/v1/proveedores/image?img/`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("resp", resp);
    return resp;
  } catch (err) {
    // Handle Error Here
    console.log("error up", err);
    return err;
  }
};
export { getAllIncriptions, createNewInscription, loginService, uploadImage };
