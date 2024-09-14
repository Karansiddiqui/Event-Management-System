const express = require('express');
const { createEvent, getEvents, getEventById, deleteEvent, rsvpEvent, sendEventReminder, getAttendees } = require('../controllers/eventController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/createEvents', authMiddleware, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.delete('/:id', authMiddleware, deleteEvent);
router.post('/:id/rsvp', authMiddleware, rsvpEvent);
router.post('/:id/reminder', authMiddleware, sendEventReminder);
router.get('/:eventId/attendees', getAttendees);

module.exports = router;
