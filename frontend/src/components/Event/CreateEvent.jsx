import React, { useState } from "react";
import { createEvent } from "../../services/api";
import axios from 'axios';
const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  console.log(date);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdEvent = await axios.post('/api/events/createEvents', {title: title, description: description, liveDate: date});
      setTitle("");
      setDescription("");
      setDate("");
    } catch (err) {
      setError("Failed to create event");
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-4">
          Live Date
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
