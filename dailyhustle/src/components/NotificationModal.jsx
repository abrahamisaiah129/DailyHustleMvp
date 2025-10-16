// src/components/NotificationModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useUserData } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";

export default function NotificationModal({ show, onHide, notificationId }) {
    const { userData, markNotificationAsRead } = useUserData();
    const navigate = useNavigate();
    const [currentNotification, setCurrentNotification] = useState(null);

    // ✅ SUPER SIMPLE: Find notification by ID
    useEffect(() => {
        if (show && notificationId && userData?.notifications) {
            const found = userData.notifications.find(
                (n) => n.id === notificationId
            );
            if (found) {
                setCurrentNotification(found);
                markNotificationAsRead(found.id); // Auto read
            }
        }
    }, [show, notificationId, userData?.notifications, markNotificationAsRead]);

    if (!show || !currentNotification) return null;

    const getIconClass = (type) => {
        const icons = {
            success: "bi-check-circle-fill text-success",
            error: "bi-x-circle-fill text-danger",
            info: "bi-info-circle-fill text-primary",
            warning: "bi-exclamation-triangle-fill text-warning",
            default: "bi-bell-fill text-secondary",
        };
        return icons[type] || icons.default;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // ✅ Mark THIS as read
    const markAsRead = () => {
        markNotificationAsRead(currentNotification.id);
    };

    // ✅ Delete THIS
    const deleteNotification = () => {
        if (window.confirm("Delete this notification?")) {
            onHide();
        }
    };

    // ✅ Go to Task
    const handleTaskClick = () => {
        if (currentNotification.taskId) {
            navigate("/tasks?tab=my");
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered size="md" backdrop="static">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="w-100 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <i
                            className={`bi ${getIconClass(
                                currentNotification.type
                            )} me-2 fs-4`}
                        ></i>
                        <span className="fw-bold">
                            {currentNotification.title}
                        </span>
                    </div>
                    <span
                        className={`badge fs-6 ${
                            currentNotification.type === "success"
                                ? "bg-success"
                                : currentNotification.type === "error"
                                ? "bg-danger"
                                : currentNotification.type === "warning"
                                ? "bg-warning text-dark"
                                : "bg-primary"
                        } text-white`}
                    >
                        {currentNotification.category}
                    </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-2">
                <div className="card border-0">
                    <div className="card-body p-3">
                        {/* Message */}
                        <p className="card-text mb-3 fs-6">
                            {currentNotification.message}
                        </p>

                        {/* Task Button */}
                        {currentNotification.taskId && (
                            <button
                                className="btn btn-outline-primary w-100 mb-3"
                                onClick={handleTaskClick}
                            >
                                <i className="bi bi-clipboard-check me-1"></i>
                                View Task #{currentNotification.taskId}
                            </button>
                        )}

                        {/* ✅ 2 SIMPLE BUTTONS ON NOTIFICATION */}
                        <div className="d-flex gap-2 mb-3">
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={deleteNotification}
                                className="flex-grow-1"
                            >
                                <i className="bi bi-trash"></i> Delete
                            </Button>

                            {!currentNotification.isRead && (
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={markAsRead}
                                    className="flex-grow-1"
                                >
                                    <i className="bi bi-check"></i> Read
                                </Button>
                            )}
                        </div>

                        {/* Timestamp */}
                        <p className="text-muted small mb-0">
                            <i className="bi bi-clock me-1"></i>
                            {formatDate(currentNotification.createdAt)}
                        </p>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="border-0 pt-0">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onHide}
                    className="w-100"
                >
                    <i className="bi bi-x me-1"></i>Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
