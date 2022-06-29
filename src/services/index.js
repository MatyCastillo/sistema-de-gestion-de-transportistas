import axios from "axios";

const getAllIncriptions = async () => {
  const petition = await axios.get(
    "http://localhost:8080/api/v1/inscriptions/"
  );
  return petition.data.data;
};

const createNewInscription = async (data) => {
  try {
    const resp = await axios.post(
      "http://localhost:8080/api/v1/inscriptions/",
      data
    );
    return resp;
  } catch (err) {
    // Handle Error Here
    return err;
  }
};

export { getAllIncriptions, createNewInscription };
