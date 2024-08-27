import React, { useEffect, useState } from "react";
import { getTimeSlots } from "../services/TimeSlotService";
import { deleteEvent, getEvents } from "../services/EventService";
import { DetailedTimeSlot, Event } from "../interfaces/types";

const TimeSlotList: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<DetailedTimeSlot[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const data = await getTimeSlots();
        console.log("Fetched Time Slots:", data);
        setTimeSlots(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch time slots");
      }
    };

    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch events");
      }
    };

    fetchTimeSlots();
    fetchEvents();
  }, []);

  const hasEvent = (timeSlotId: string) => {
    return events.some((event) => event.timeSlot.id === timeSlotId);
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter((event) => event.id !== eventId));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to delete event");
    }
  };

  return (
    <div>
      <h2>Time Slots</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="grid grid-cols-7 gap-4">
        {timeSlots.map((timeSlot) => (
          <div
            key={timeSlot.id}
            className={`p-4 border rounded-lg ${
              hasEvent(timeSlot.id) ? "bg-green-200" : "bg-gray-200"
            }`}
          >
            <strong>Date:</strong> {timeSlot.date} <br />
            <strong>Start Time:</strong>{" "}
            {timeSlot.startTime !== undefined
              ? timeSlot.startTime
                  .toString()
                  .padStart(4, "0")
                  .replace(/(\d{2})(\d{2})/, "$1:$2")
              : "N/A"}{" "}
            <br />
            <strong>End Time:</strong>{" "}
            {timeSlot.endTime !== undefined
              ? timeSlot.endTime
                  .toString()
                  .padStart(4, "0")
                  .replace(/(\d{2})(\d{2})/, "$1:$2")
              : "N/A"}{" "}
            <br />
            {events
              .filter((event) => event.timeSlot.id === timeSlot.id)
              .map((event) => (
                <div key={event.id}>
                  <span className="text-red-600">Event ID: {event.id}</span>
                  <br />
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-500"
                  >
                    Delete Event
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotList;
