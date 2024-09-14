import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import EventsPage from './pages/Event.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';
import NotificationsPage from './pages/NotificationPage.jsx';
import HomePage from './pages/Home.jsx'
import CreateEvent from './/components/Event/CreateEvent.jsx';
import Headers from './components/Header.jsx';
import HostedEvents from './components/Event/HostedEvents.jsx';
const App = () => (
  <Router>
    <Headers/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/hosteEvents" element={<HostedEvents />} />
      <Route path="/create-events" element={<CreateEvent />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
    </Routes>
  </Router>
);

export default App;
