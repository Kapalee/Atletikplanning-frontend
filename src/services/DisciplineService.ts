import axios from "axios";

const API_URL = "http://localhost:8080/disciplines"; // Update with your backend URL

export const getDisciplines = async () => {
  const response = await axios.get(API_URL);
  return response.data; // Returns the list of disciplines
};
