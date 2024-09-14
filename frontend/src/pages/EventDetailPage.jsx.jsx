import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetail from '../components/Event/EventDetails.jsx';
import ManageAttendees from '../components/Event/ManageAttendee.jsx';

const EventDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="p-8">
      <EventDetail />
      <ManageAttendees eventId={id} />
    </div>
  );
};

export default EventDetailPage;
