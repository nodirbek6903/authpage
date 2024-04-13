import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import NotificationData from "../notifications-data/notifications-data";

const Notifications = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notificationIndex) => {
    setSelectedNotification(notificationIndex);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  const selectedNotificationData = NotificationData[selectedNotification];

  return (
    <div className="container">
      <div className="notifications-card shadow-lg p-4 w-100">
        <h2 className="text-center">All Notifications</h2>
        {NotificationData.map((notification, index) => (
          <div
            key={index}
            onClick={() => handleNotificationClick(index)}
            style={{ cursor: "pointer", ":hover": { backgroundColor: "gray" } }}
            className="notification-item d-flex gap-2 m-1"
          >
            <img
              className="mr-1"
              src={notification.avatar}
              width={30}
              height={30}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              alt="avatar"
            />
            <p className="d-flex gap-2">
              <span className="fw-bold">{notification.name}</span>
              <span>{notification.event}</span>
              <span style={{ color: "gray" }}>{notification.time}</span>
            </p>
          </div>
        ))}
      </div>

      {selectedNotification !== null && (
        <Modal show={true} onHide={closeModal}>
          <Modal.Header>
            <Modal.Title className="d-flex gap-2">
              <img
                src={selectedNotificationData.avatar}
                width={30}
                height={30}
                style={{ borderRadius: "50%", objectFit: "cover" }}
                alt="avatar"
                />
                <p>{selectedNotificationData.name}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedNotificationData.message}</p>
          </Modal.Body>
          <Modal.Footer>
            <p style={{color:"gray"}}>{selectedNotificationData.time}</p>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Notifications;
