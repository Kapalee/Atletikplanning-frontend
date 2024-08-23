import axios from "axios";
import { DetailedTimeSlot } from "../interfaces/types";



const API_URL = "http://localhost:8080/timeslots"; 

export const getTimeSlots = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTimeSlot = async (timeSlot: DetailedTimeSlot) => {
  const response = await axios.post(API_URL, timeSlot);
  return response.data;
};



