import axios from "axios";

const API_URL = "http://localhost:8080/tracks"; 

export const getTracksByDiscipline = async (disciplineId: number) => {
  const response = await axios.get(`${API_URL}/by-discipline/${disciplineId}`);
  return response.data; 
};

export const getTracks = async () => {
  const response = await axios.get(API_URL);
  return response.data; 
};

