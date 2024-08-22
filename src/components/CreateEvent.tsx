import React, { useState, useEffect } from "react";
import { createEvent } from "../services/EventService";
import { getDisciplines } from "../services/DisciplineService";
import { getTracksByDiscipline } from "../services/TrackService";
import { Discipline, Track } from "../interfaces/types"; // Import the interfaces

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

    fetchDisciplines();
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      if (eventData.disciplineId) {
        try {
          const disciplineId = Number(eventData.disciplineId); // Convert to number
          const data = await getTracksByDiscipline(disciplineId); // Fetch tracks by discipline
          console.log("Fetched tracks:", data); // Log fetched tracks
          setTracks(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          setError("Failed to fetch tracks");
        }
      } else {
        setTracks([]); // Reset tracks if no discipline is selected
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
    <div>
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
          disabled={!eventData.disciplineId} // Disable if no discipline is selected
        >
          <option value="">Select Track</option>
          {tracks.map((track) => (
            <option key={track.id} value={track.id}>
              {track.type} {/* Assuming track has a 'type' property */}
            </option>
          ))}
        </select>

        {/* Other input fields remain unchanged */}
        <input
          type="text"
          name="timeSlotId"
          placeholder="Time Slot ID"
          value={eventData.timeSlotId}
          onChange={handleChange}
          required
        />
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
        <input
          type="text"
          name="participantAgeGroup"
          placeholder="Participant Age Group"
          value={eventData.participantAgeGroup}
          onChange={handleChange}
          required
        />
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
