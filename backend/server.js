const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const errorMiddleware = require('./middleware/errorMiddleware.js');
const cookieParser = require('cookie-parser');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/events', require('./routes/eventRoutes.js'));
app.use('/api/notifications', require('./routes/notificationRoutes.js'));

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
  
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
  })
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
