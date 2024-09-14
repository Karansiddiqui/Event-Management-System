const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  liveDate: { type: Date },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
},
  { timestamps: true } // automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Event', EventSchema);
