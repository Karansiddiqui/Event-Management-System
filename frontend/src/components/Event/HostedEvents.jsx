import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../services/api';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  
  // const extractEvents = events.data;
  
  
  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await axios.get('/api/events',  {params: {
          userId: currentUser._id,
        }});
        setEvents(data.data);
      } catch (err) {
        setError('Failed to fetch events');
      }
    };
    
    getEvents();
  }, []);
  
  console.log(events);
  return (
    <div className="p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Event List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {events.map(event => (
          <li key={event._id} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-gray-500">{new Date(event.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
