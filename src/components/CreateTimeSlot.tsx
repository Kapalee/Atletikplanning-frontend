import React, { useState } from "react";
import { createTimeSlot } from "../services/TimeSlotService"; 
import { DetailedTimeSlot } from "../interfaces/types"; 

const CreateTimeSlot: React.FC = () => {
  const [timeSlotData, setTimeSlotData] = useState<DetailedTimeSlot>({
    id: "", 
    startTime: 0, 
    endTime: 0, 
    date: new Date().toISOString().split("T")[0], 
    label: "", 
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTimeSlotData((prevData) => ({
      ...prevData,
      [name]:
        name === "startTime" || name === "endTime"
          ? parseInt(value.replace(":", ""), 10)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTimeSlot(timeSlotData);
      setSuccess(true);
      setError(null);
      setTimeSlotData({
        id: "",
        startTime: 0,
        endTime: 0,
        date: new Date().toISOString().split("T")[0],
        label: "",
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to create time slot");
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Create Time Slot</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">Time slot created successfully!</p>
      )}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Date:
          <input
            type="date"
            name="date"
            value={timeSlotData.date}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </label>
        <label className="block mb-2">
          Start Time:
          <input
            type="time"
            name="startTime"
            value={timeSlotData.startTime
              .toString()
              .padStart(4, "0")
              .replace(/(\d{2})(\d{2})/, "$1:$2")}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </label>
        <label className="block mb-2">
          End Time:
          <input
            type="time"
            name="endTime"
            value={timeSlotData.endTime
              .toString()
              .padStart(4, "0")
              .replace(/(\d{2})(\d{2})/, "$1:$2")}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </label>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Time Slot
        </button>
      </form>
    </div>
  );
};

export default CreateTimeSlot;
