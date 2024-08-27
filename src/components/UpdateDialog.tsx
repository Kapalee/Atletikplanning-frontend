import React, { useState, useEffect, useCallback } from "react";
import { Event, Track } from "../interfaces/types";
import { updateEvent } from "../services/EventService";
import { getTracks } from "../services/TrackService";

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
  const [tracks, setTracks] = useState<Track[]>([]);
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
      try {
        const data = await getTracks();
        setTracks(data);
        filterTracks(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch tracks");
      }
    };

    fetchTracks();
  }, [filterTracks]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // If disciplineId changes, filter tracks
    if (name === "disciplineId") {
      filterTracks(tracks);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <input
          type="text"
          name="participantAgeGroup"
          value={eventData.participantAgeGroup}
          onChange={handleChange}
          placeholder="Participant Age Group"
          required
        />
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

