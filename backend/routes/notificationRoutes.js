const express = require('express');
const { createNotification, getNotifications } = require('../controllers/notificationController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/', authMiddleware, createNotification); // Create notification
router.get('/', authMiddleware, getNotifications); // Fetch notifications for logged-in user

module.exports = router;
