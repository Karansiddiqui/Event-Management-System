import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../../services/api';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError('Failed to fetch notifications');
      }
    };

    getNotifications();
  }, []);

  return (
    <div className="p-8 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {notifications.map(notification => (
          <li key={notification._id} className="mb-2 p-4 border border-gray-300 rounded">
            <p>{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
