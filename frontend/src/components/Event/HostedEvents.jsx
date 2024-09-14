import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [joinedEvents, setJoinedEvents] = useState(new Set());
  const navigate = useNavigate();

  // Get current user from Redux store
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const getEvents = async () => {
      if (!currentUser) return; // Early return if currentUser is not defined
      
      try {
        const { data } = await axios.get('/api/events', { params: { userId: currentUser._id } });
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events');
      }
    };

    getEvents();
  }, [currentUser]);


  // const joinEvent = async (eventId) => {
  //   try {
  //     await axios.post('/api/events/join', { userId: currentUser._id, eventId });
  //     setJoinedEvents(prev => new Set(prev).add(eventId));
  //   } catch (err) {
  //     setError('Failed to join event');
  //   }
  // };

// console.log(currentUser._id);

const deleteEvent = async (eventId) => {
  console.log(eventId);
  
  try {
    const { data } = await axios.delete(`/api/events/deleteEvent/${eventId}`);
    console.log('Event deleted successfully:', data);
    navigate('/events')
  } catch (error) {
    console.error('Failed to delete event:', error);
  }
};
  

  return (
    <div className="p-20 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">Hosted Event List</h2>
      {error && <p className="text-red-600 text-center text-lg mb-4">{error}</p>}
      {events.length === 0 ? (
        <p className="text-gray-600 text-center">No hosted events available</p>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {events.map((event) => (
            <div key={event._id} className="max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img src={event.imageURL || '/default-image.jpg'} alt={event.title} className="w-full h-48 object-cover bg-gray-200" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">{event.title}</h3>
                <p className="text-gray-800 mb-4">{event.description}</p>
                <div className="flex gap-12 mb-4 text-gray-600 text-sm">
                  <p><span className="font-semibold">Created by:</span> {event.createdBy[0]?.username || 'Unknown'}</p>
                  <p className='flex flex-col'><span className="font-semibold">Time to Live:</span> {new Date(event.liveDate).toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className={`bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg ${event.liveData ? 'bg-blue-700' : 'bg-green-600'}`}>
                    {event.liveData ? 'Live Now' : 'Upcoming'}
                  </div>
                 
                  
                  {(event.createdBy[0]._id === currentUser._id) ?  <button
                  onClick={() => deleteEvent(event._id)}
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                >
                  Delete
                </button> : <button
                    onClick={() => joinEvent(event._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                  >
                    Register
                  </button>}
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
