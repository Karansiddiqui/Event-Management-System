import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../services/api';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  
  // const extractEvents = events.data;
  
  
  
  
  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await axios.get('/api/events');
        setEvents(data.data);
      } catch (err) {
        setError('Failed to fetch events');
      }
    };
    
    getEvents();
  }, []);
  
  console.log(events);
  return (
    <div className="p-20 bg-gray-100 min-h-screen">
    <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">Event List</h2>
    {error && <p className="text-red-600 text-center text-lg mb-4">{error}</p>}
    <div className="flex flex-wrap gap-8 justify-center">
      {events.map((event) => (
        <div key={event._id} className="max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
          <img src={event.imageURL} alt={event.title} className="w-full h-48 object-cover bg-gray-200" />
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">{event.title}</h3>
            <p className="text-gray-800 mb-4">{event.description}</p>
            <div className="flex gap-12 mb-4 text-gray-600 text-sm">
              <p><span className="flex flex-col font-semibold">Created by:</span> {event.createdBy[0].username}</p>
              <div>

              <p className='flex flex-col'><span className="font-semibold">Time to Live:</span> {new Date(event.date).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className={`bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg ${event.liveData ? 'bg-blue-700' : 'bg-green-600'}`}>
                {event.liveData ? 'Live Now' : 'Upcoming'}
              </div>
                <button 
                  onClick={() => joinEvent(event._id)}
                  // isJoined={joinedEvents.has(event._id)}
                >Register</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
