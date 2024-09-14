import React, { useEffect, useState } from 'react';
import { fetchAttendees } from '../../services/api';

const ManageAttendees = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getAttendees = async () => {
      try {
        const data = await fetchAttendees(eventId);
        setAttendees(data);
      } catch (err) {
        setError('Failed to fetch attendees');
      }
    };

    getAttendees();
  }, [eventId]);

  return (
    <div className="p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Attendees</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {attendees.map(attendee => (
          <li key={attendee._id} className="mb-2">{attendee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAttendees;
