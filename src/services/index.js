import axios from "axios";

const getAllIncriptions = async () => {
  const petition = await axios.get(
    "https://test.tesetgps.com.ar/api/v1/inscriptions/"
  );
  return petition.data.data;
};

const createNewInscription = async (data) => {
  try {
    const resp = await axios.post(
      "https://test.tesetgps.com.ar/api/v1/inscriptions/",
      data
    );
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
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/login",
      data
    );
    return response.data.token;
  } catch (error) {
    return error;
  }
};

export { getAllIncriptions, createNewInscription, loginService };
