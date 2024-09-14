const User = require('../models/User.js');
const Notification = require('../models/Notification.js');

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    const notification = new Notification({
      user: userId,
      type,
      message
    });

    await notification.save();

    // Optionally, add notification to the user's notifications list
    await User.findByIdAndUpdate(userId, { $push: { notifications: notification } });

    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch notifications for a user
const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request

    // Fetch notifications from User model
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createNotification, getNotifications };
