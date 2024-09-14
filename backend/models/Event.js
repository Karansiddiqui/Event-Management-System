const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Use Date and default: Date.now
  liveData: { type: Date },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // Reference to the User model
});

module.exports = mongoose.model('Event', EventSchema);
