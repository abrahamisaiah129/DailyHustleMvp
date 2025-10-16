// src/context/GeneralContext.jsx
import React, { useState, useEffect } from "react";
import { GeneralContext } from "./GeneralContext";
export const GeneralProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [notifications, setNotifications] = useState([]);
    // const [loading, setLoading] = useState(false);

    // Default mock data
    // const defaultTasks = [
    //     {
    //         id: number,          // Unique identifier for the task
    //         title: string,      // Task title (e.g., "Post a Review")
    //         completed: boolean, // Whether the task is completed
    //         color: string,      // Color for UI (e.g., "green", "blue")
    //         payout: number,     // Task payout in currency (e.g., 5000)
    //         category: string,   // Task category (e.g., "Social Media")
    //         slots: number,      // Number of workers needed
    //         status: string,     // Task status ("Open", "Closed", "In Progress")
    //         dateAdded: string   // ISO date string (e.g., "2025-10-14T17:01:00Z")
    //     },
    useEffect(() => {
        setTasks([
            {
                id: 1,
                title: "Post a Review on Instagram",
                category: "Social Media",
                payout: 5000,
                slots: 10,
                completedSlots: 3,
                color: "#28a745",
                status: "Open",
                dateAdded: "2025-10-14T17:01:00Z",
                link: "https://instagram.com",
                instructions:
                    "1. Download the app\n2. Post about it on Twitter\n3. Submit the post link below",
                description:
                    "<p>You must include our hashtag <strong>#NubianDevApp</strong> in your post.</p>",
            },
            {
                id: 2,
                title: "Share Referral Link on Twitter",
                category: "Marketing",
                payout: 3000,
                slots: 5,
                completedSlots: 5,
                color: "#007bff",
                status: "Closed",
                dateAdded: "2025-10-13T12:00:00Z",
                link: "https://twitter.com",
                instructions:
                    "1. Download the app\n2. Post about it on Twitter\n3. Submit the post link below",
                description:
                    "<p>You must include our hashtag <strong>#NubianDevApp</strong> in your post.</p>",
            },
            {
                id: 3,
                title: "Join Telegram Channel",
                category: "Community",
                payout: 1000,
                slots: 20,
                completedSlots: 8,
                color: "#0088cc",
                status: "Open",
                dateAdded: "2025-10-15T09:00:00Z",
                link: "https://t.me/examplechannel",
                instructions:
                    "1. Download the app\n2. Post about it on Twitter\n3. Submit the post link below",
                description:
                    "<p>You must include our hashtag <strong>#NubianDevApp</strong> in your post.</p>",
            },
        ]);
        // {
        //       id: 1,
        //       title: "Post a Review",
        //       completed: false,
        //       color: "green",
        //       payout: 5000,
        //       category: "Social Media",
        //       slots: 10,
        //       status: "Open",
        //       completedCount: 3,
        //       dateAdded: "2025-10-14T17:01:00Z",
        //       link: "https://instagram.com",
        //       response: "",
        //     },
        //     {
        //       id: 2,
        //       title: "Share a Referral Link",
        //       completed: true,
        //       color: "blue",
        //       payout: 3000,
        //       category: "Marketing",
        //       slots: 5,
        //       status: "Closed",
        //       completedCount: 5,
        //       dateAdded: "2025-10-13T12:00:00Z",
        //       link: "https://twitter.com",
        //       response: "",
        setNotifications([
            {
                id: 1,
                title: "Payment Successful",
                description: "You received ₦5,000 for your last task.",
                type: "success",
                timestamp: new Date(),
                read: false,
            },
            {
                id: 2,
                title: "New Task Available",
                description: "A new writing task has been posted in Tasks.",
                type: "info",
                timestamp: new Date(),
                read: false,
            },
            {
                id: 3,
                title: "Account Alert",
                description: "Please verify your BVN to continue earning.",
                type: "urgent",
                timestamp: new Date(),
                read: true,
            },
            {
                id: 4,
                title: "Payment Successful",
                description: "You received ₦6,000 for your last task.",
                type: "success",
                timestamp: new Date(),
                read: false,
            },
            {
                id: 5,
                title: "New Task Available",
                description:
                    "A new writing task has been posted in Tasks, Hurry!!!.",
                type: "info",
                timestamp: new Date(),
                read: false,
            },
            {
                id: 6,
                title: "Account Alert",
                description: "Please verify your NIN to continue earning.",
                type: "urgent",
                timestamp: new Date(),
                read: true,
            },
        ]);
    }, []);

    const markNotificationAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };
    const completeTask = (taskId, answer) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          completed: true,
                          completedCount: task.completedCount + 1,
                          status: "Closed",
                          response: answer,
                      }
                    : task
            )
        );
    };
    console.log("Tasks in GeneralProvider:", tasks);
    return (
        <GeneralContext.Provider
            value={{
                tasks,
                notifications,
                completeTask,
                // loading,
                setNotifications,
                markNotificationAsRead,
            }}
        >
            {children}
        </GeneralContext.Provider>
    );
};
