import React, { useState, useEffect } from "react";
import { createEvent } from "../services/EventService";
import { getDisciplines } from "../services/DisciplineService";
import { getTracksByDiscipline } from "../services/TrackService";
import { getTimeSlots } from "../services/TimeSlotService";
import { Discipline, Track, TimeSlot } from "../interfaces/types";

const ageGroups = ["Junior", "Senior", "Women", "Men", "U18", "U21", "Open"];

const CreateEvent: React.FC = () => {
  const [eventData, setEventData] = useState({
    disciplineId: "",
    trackId: "",
    timeSlotId: "",
    minimumDuration: 0,
    participantsGender: "",
    participantAgeGroup: "",
    maximumParticipants: 0,
  });
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const data = await getDisciplines();
        setDisciplines(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch disciplines");
      }
    };

    const fetchTimeSlots = async () => {
      try {
        const data = await getTimeSlots(); 
        setTimeSlots(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch time slots");
      }
    };

    fetchDisciplines();
    fetchTimeSlots(); 
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      if (eventData.disciplineId) {
        try {
          const disciplineId = Number(eventData.disciplineId);
          const data = await getTracksByDiscipline(disciplineId);
          console.log("Fetched tracks:", data);
          setTracks(data);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setError("Failed to fetch tracks");
        }
      } else {
        setTracks([]);
      }
    };

    fetchTracks();
  }, [eventData.disciplineId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent(eventData);
      setSuccess(true);
      setError(null);
      setEventData({
        disciplineId: "",
        trackId: "",
        timeSlotId: "",
        minimumDuration: 0,
        participantsGender: "",
        participantAgeGroup: "",
        maximumParticipants: 0,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to create event");
      setSuccess(false);
    }
  };

  return (
    <div className="create-event-container">
      <h1>Create Event</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Event created successfully!</p>}
      <form onSubmit={handleSubmit}>
        <select
          name="disciplineId"
          value={eventData.disciplineId}
          onChange={handleChange}
          required
        >
          <option value="">Select Discipline</option>
          {disciplines.map((discipline) => (
            <option key={discipline.id} value={discipline.id}>
              {discipline.name}
            </option>
          ))}
        </select>

        <select
          name="trackId"
          value={eventData.trackId}
          onChange={handleChange}
          required
          disabled={!eventData.disciplineId}
        >
          <option value="">Select Track</option>
          {tracks.map((track) => (
            <option key={track.id} value={track.id}>
              {track.type} ({track.id}) 
            </option>
          ))}
        </select>

        <select
          name="timeSlotId"
          value={eventData.timeSlotId}
          onChange={handleChange}
          required
        >
          <option value="">Select Time Slot</option>
          {timeSlots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.label}
            </option>
          ))}
        </select>
        <h1>Minimum Duration</h1>
        <input
          type="number"
          name="minimumDuration"
          placeholder="Minimum Duration"
          value={eventData.minimumDuration}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="participantsGender"
          placeholder="Participants Gender"
          value={eventData.participantsGender}
          onChange={handleChange}
          required
        />
        <select
          name="participantAgeGroup"
          value={eventData.participantAgeGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Age Group</option>
          {ageGroups.map((ageGroup) => (
            <option key={ageGroup} value={ageGroup}>
              {ageGroup}
            </option>
          ))}
        </select>
        <h1>Maximum Participants</h1>
        <input
          type="number"
          name="maximumParticipants"
          placeholder="Max Participants"
          value={eventData.maximumParticipants}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
