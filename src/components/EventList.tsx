import React, { useEffect, useState } from "react";
import { getEvents } from "../services/EventService";
import { getTracks } from "../services/TrackService";
import { Event, Track } from "../interfaces/types"; // Import the interfaces

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // Use Event type
  const [tracks, setTracks] = useState<Track[]>([]); // Use Track type

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
    <div>
      <h1>Event List</h1>
      <ul>
        {events.map((event) => {
          const track = tracks.find((t) => t.id === event.track.id); // Match track by ID
          console.log("Processing event:", event); // Log each event being processed
          return (
            <li key={event.id}>
              <p>Discipline: {event.discipline.name}</p>
              <p>Track nr: {track ? track.id : "Track not found"}</p>{" "}
              {/* Display track type */}
              <p>
                Time Slot: {event.timeSlot.startTime} - {event.timeSlot.endTime}
              </p>
              <p>Minimum Duration: {event.minimumDuration} minutes</p>
              <p>Participants Gender: {event.participantsGender}</p>
              <p>Age Group: {event.participantAgeGroup}</p>
              <p>Max Participants: {event.maximumParticipants}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventList;
