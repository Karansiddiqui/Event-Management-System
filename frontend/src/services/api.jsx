import axios from 'axios';

// Auth
export const signIn = async (email, password) => {
  const { data } = await axios.post('/auth/signin', { email, password });
  localStorage.setItem('token', data.token);
};

export const signUp = async (name, email, password) => {
  await axios.post('/auth/signup', { name, email, password });
};

// Event
export const createEvent = async (eventData) => {
  const token = localStorage.getItem('token');
  await axios.post('/api/events', eventData, { headers: { Authorization: `Bearer ${token}` } });
};

export const fetchEvents = async () => {
  const { data } = await axios.get('/events');
  return data;
};

export const fetchEvent = async (id) => {
  const { data } = await axios.get(`/events/${id}`);
  return data;
};

// Attendees
export const fetchAttendees = async (eventId) => {
  const { data } = await axios.get(`/events/${eventId}/attendees`);
  return data;
};

// Notifications
export const fetchNotifications = async () => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get('/notifications', { headers: { Authorization: `Bearer ${token}` } });
  return data;
};
