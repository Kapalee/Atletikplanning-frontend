/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { Event, Track } from "../interfaces/types";
import { updateEvent } from "../services/EventService";
import { getTracksByDiscipline } from "../services/TrackService";

const ageGroups = ["Junior", "Senior", "Women", "Men", "U18", "U21", "Open"];

interface UpdateEventDialogProps {
  event: Event;
  onClose: () => void;
  onUpdate: (updatedEvent: Event) => void;
}

const UpdateEventDialog: React.FC<UpdateEventDialogProps> = ({
  event,
  onClose,
  onUpdate,
}) => {
  const [eventData, setEventData] = useState<Event>(event);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const filterTracks = useCallback(
    (allTracks: Track[]) => {
      const disciplineId = eventData.discipline.id;
      const filtered = allTracks.filter(
        (track) => track.discipline.id === disciplineId
      );
      setFilteredTracks(filtered);
    },
    [eventData.discipline.id]
  );

  useEffect(() => {
    const fetchTracks = async () => {
      if (eventData.discipline.id) {
        try {
          const disciplineId = Number(eventData.discipline.id);
          const data = await getTracksByDiscipline(disciplineId);
          console.log("Fetched tracks:", data);
          filterTracks(data); // Call filterTracks here
        } catch (err) {
          setError("Failed to fetch tracks");
        }
      } else {
        setFilteredTracks([]);
      }
    };

    fetchTracks();
  }, [eventData.discipline.id, filterTracks]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "trackId") {
      const selectedTrack = filteredTracks.find(
        (track) => track.id === Number(value)
      );
      setEventData((prevData) => ({
        ...prevData,
        track: selectedTrack || null,
      }));
    } else {
      setEventData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedEvent = await updateEvent(event.id, eventData);
      onUpdate(updatedEvent);
      setSuccess(true);
      setError(null);
      onClose();
    } catch (err) {
      setError("Failed to update event");
      setSuccess(false);
    }
  };

  return (
    <div className="dialog">
      <h2>Update Event</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Event updated successfully!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="minimumDuration"
          value={eventData.minimumDuration}
          onChange={handleChange}
          placeholder="Minimum Duration"
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
        <select
          name="trackId"
          value={eventData.track?.id || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Track</option>
          {filteredTracks.map((track) => (
            <option key={track.id} value={track.id}>
              {track.type} {track.id}
            </option>
          ))}
        </select>
        <button type="submit">Update Event</button>
        <button type="button" className="cancel" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateEventDialog;
