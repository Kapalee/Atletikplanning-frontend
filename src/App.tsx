import React from "react";
import { Routes, Route, Link } from "react-router-dom"; // Import Link
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
import TimeSlotList from "./components/TimeSlotList";
import CreateTimeSlot from "./components/CreateTimeSlot";

function App() {
  return (
    <div className="bg-blue-300 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-white text-5xl font-extrabold mb-8 text-center shadow-lg p-6 bg-blue-700 rounded-lg">
        Athletics Management
      </h1>
      <nav className="bg-blue-600 p-4 rounded-md shadow-md mb-4">
        <div className="container mx-auto flex justify-between">
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:text-blue-200">
              Event List
            </Link>
            <Link to="/create" className="text-white hover:text-blue-200">
              Create Event
            </Link>
            <Link to="/timeslot" className="text-white hover:text-blue-200">
              Time Slot List
            </Link>
            <Link
              to="/createtimeslot"
              className="text-white hover:text-blue-200"
            >
              Create Time Slot
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/timeslot" element={<TimeSlotList />} />
        <Route path="/createtimeslot" element={<CreateTimeSlot />} />
      </Routes>
    </div>
  );
}

export default App;
