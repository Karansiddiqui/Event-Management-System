const Event = require('../models/Event.js');
const Attendee = require('../models/Attendee.js');
const { sendReminder } = require('../utils/email.js');

const User = require('../models/User');

const createEvent = async (req, res) => {
  
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user.id // Set the createdBy field to the authenticated user
    });

    // Optional: Add the event to the user's createdEvents list
    await User.findByIdAndUpdate(req.user._id, { $push: { createdEvents: event._id } });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getEvents = async (req, res) => {
  try {
    let events;

    // Check if userId exists in the query parameters
    console.log("inside event", req.query.userId);
    if (req.query.userId) {
      
      // Fetch events created by the specific user
      events = await Event.find({ createdBy: req.query.userId }).populate("createdBy");
      
    } else {
      // Fetch all events if no userId is provided
      events = await Event.find().populate("createdBy");
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {

  try {
    const id = req.params.id;
    console.log(id);
    
    if (!id) {
      return res.status(400).json({ error: 'Event ID is required' });
    }

    const result = await Event.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

const rsvpEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    const existingAttendee = await Attendee.findOne({ userId, eventId: req.params.id });

    if (existingAttendee) return res.status(400).json({ message: 'Already RSVPed' });

    const attendee = await Attendee.create({ userId, eventId: req.params.id });
    event.attendees.push(userId);
    await event.save();
    res.json({ message: 'RSVP added' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const sendEventReminder = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Send reminder
    await sendReminder(event);
    res.json({ message: 'Reminder sent' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find({ eventId: req.params.eventId }).populate('userId');
    res.json(attendees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  deleteEvent,
  rsvpEvent,
  sendEventReminder,
  getAttendees,
};