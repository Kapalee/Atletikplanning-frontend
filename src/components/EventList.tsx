import React, { useEffect, useState } from "react";
import { getEvents } from "../services/EventService";
import { getTracks } from "../services/TrackService";
import { Event, Track } from "../interfaces/types";
import { deleteEvent } from "../services/EventService";
import UpdateEventDialog from "./UpdateDialog";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await getEvents();
        console.log("Fetched events:", data);
        setEvents(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    const fetchTracks = async () => {
      try {
        const data = await getTracks();
        console.log("Fetched tracks:", data);
        setTracks(data);
      } catch (err) {
        console.error("Error fetching tracks:", err);
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

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Failed to delete event");
    }
  };

  const handleUpdateClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleEventUpdate = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

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
          const track = tracks.find((t) => t.id === event.track.id);
          return (
            <li key={event.id}>
              <p>
                <span className="label">Event ID:</span>{" "}
                <span className="value">{event.id}</span>
              </p>
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
              <button
                className="delete-button"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
              <button
                className="update-button"
                onClick={() => handleUpdateClick(event)}
              >
                Update
              </button>
            </li>
          );
        })}
      </ul>
      {isDialogOpen && selectedEvent && (
        <UpdateEventDialog
          event={selectedEvent}
          onClose={handleDialogClose}
          onUpdate={handleEventUpdate}
        />
      )}
    </div>
  );
};

export default EventList;
