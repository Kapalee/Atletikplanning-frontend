import React from "react";
import { Routes, Route, Link } from "react-router-dom"; // Import Link
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";

function App() {
  return (
    <div className="bg-blue-300 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-white text-4xl mb-6">Event Management</h1>
      <nav className="mb-4">
        <Link to="/" className="text-white mr-4">
          Event List
        </Link>
        <Link to="/create" className="text-white">
          Create Event
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
      </Routes>
    </div>
  );
}

export default App;
