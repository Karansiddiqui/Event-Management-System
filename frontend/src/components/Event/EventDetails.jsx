import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '../../services/api.jsx';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getEvent = async () => {
      try {
        const data = await fetchEvent(id);
        setEvent(data);
      } catch (err) {
        setError('Failed to fetch event details');
      }
    };

    getEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
      <p>{event.description}</p>
      <p className="text-gray-500">{new Date(event.date).toLocaleString()}</p>
    </div>
  );
};

export default EventDetail;
