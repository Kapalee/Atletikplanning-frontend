import axios from "axios";

const API_URL = "http://localhost:8080/event"; 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEvent = async (eventData: any) => {
  const response = await axios.post(API_URL, eventData);
  return response.data; 
};

export const getEvents = async () => {
  const response = await axios.get(API_URL); 
  return response.data; 
};

export const deleteEvent = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`); 
  return response.data; 
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateEvent = async (id: string, eventData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, eventData); 
  return response.data; 
};
