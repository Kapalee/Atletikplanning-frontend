import axios from "axios";

const API_URL = "http://localhost:8080/event"; // Update with your backend URL

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEvent = async (eventData: any) => {
  const response = await axios.post(API_URL, eventData); // Sends a POST request to create an event
  return response.data; // Returns the response data
};

export const getEvents = async () => {
  const response = await axios.get(API_URL); // Sends a GET request to retrieve all events
  return response.data; // Returns the response data
};

export const deleteEvent = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`); // Sends a DELETE request to remove an event by ID
  return response.data; // Returns the response data
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateEvent = async (id: number, eventData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, eventData); // Sends a PUT request to update an event
  return response.data; // Returns the response data
};
