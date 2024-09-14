const mongoose = require('mongoose');

const AttendeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  status: { type: String, enum: ['attending', 'interested'], default: 'interested' },
});

module.exports = mongoose.model('Attendee', AttendeeSchema);
