import React, { useEffect, useState } from "react";
import { getEvents } from "../services/EventService";
import { getTracks } from "../services/TrackService";
import { Event, Track } from "../interfaces/types"; 


const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); 
  const [tracks, setTracks] = useState<Track[]>([]); 

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await getEvents();
        console.log("Fetched events:", data); // Log fetched events
        setEvents(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const fetchTracks = async () => {
      try {
        const data = await getTracks();
        console.log("Fetched tracks:", data); // Log fetched tracks
        setTracks(data);
      } catch (err) {
        console.error("Error fetching tracks:", err); // Debugging log
        setError("Failed to fetch tracks");
      }
    };

    fetchEvents();
    fetchTracks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

return (
  <div className="event-list">
    <h1>Event List</h1>
    <ul>
      {events.map((event) => {
        const track = tracks.find((t) => t.id === event.track.id); // Match track by ID
        return (
          <li key={event.id}>
            <p>
              <span className="label">Discipline:</span>{" "}
              <span className="value">{event.discipline.name}</span>
            </p>
            <p>
              <span className="label">Track nr:</span>{" "}
              <span className="value">
                {track ? track.id : "Track not found"}
              </span>
            </p>
            <p>
              <span className="label">Time Slot:</span>{" "}
              <span className="value">
                {event.timeSlot.startTime} - {event.timeSlot.endTime}
              </span>
            </p>
            <p>
              <span className="label">Minimum Duration:</span>{" "}
              <span className="value">{event.minimumDuration} minutes</span>
            </p>
            <p>
              <span className="label">Participants Gender:</span>{" "}
              <span className="value">{event.participantsGender}</span>
            </p>
            <p>
              <span className="label">Age Group:</span>{" "}
              <span className="value">{event.participantAgeGroup}</span>
            </p>
            <p>
              <span className="label">Max Participants:</span>{" "}
              <span className="value">{event.maximumParticipants}</span>
            </p>
          </li>
        );
      })}
    </ul>
  </div>
);
};

export default EventList;
