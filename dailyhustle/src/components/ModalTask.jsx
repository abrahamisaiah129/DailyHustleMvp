// src/components/ModalTask.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import {
    ClipboardCheck,
    Upload,
    FileText,
    ShieldCheck,
    XCircle,
} from "lucide-react";

export default function ModalTask({ task, show, onClose, onApply }) {
    const [proofText, setProofText] = useState("");
    const [image, setImage] = useState(null);
    const [agreed, setAgreed] = useState(false);

    // ✅ FIXED: REAL ThemeContext!
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const bgColor = isDark ? "#1c1c1e" : "#ffffff";
    const textColor = isDark ? "#f8f9fa" : "#212529";
    const labelColor = isDark ? "#adb5bd" : "#6c757d";
    const borderColor = isDark ? "#333" : "#dee2e6";

    const handleClose = () => onClose?.();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreed) {
            toast.warning(
                "⚠️ Please confirm your proof is genuine before submitting."
            );
            return;
        }

        const submissionData = {
            id: Date.now(),
            taskId: task?.id,
            title: task?.title,
            category: task?.category,
            payout: task?.payout,
            proofText,
            image,
            submittedAt: new Date().toISOString(),
            status: "Pending", // Default pending
        };

        onApply?.(submissionData);
        toast.success("✅ Task submitted! Waiting for approval...");

        setProofText("");
        setImage(null);
        setAgreed(false);
        handleClose();
    };

    if (!task) return null;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop
            centered
            contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
        >
            {/* Header */}
            <div
                className="py-3 px-4 d-flex justify-content-between align-items-center"
                style={{
                    background: isDark
                        ? "linear-gradient(90deg, #5a189a, #240046)"
                        : "linear-gradient(90deg, #dc3545, #ff6b6b)",
                    color: "#fff",
                }}
            >
                <div className="d-flex align-items-center gap-2">
                    <ClipboardCheck size={22} />
                    <h5 className="fw-bold mb-0">{task.title}</h5>
                </div>
                <button
                    type="button"
                    aria-label="Close"
                    className="btn-close btn-close-white"
                    onClick={handleClose}
                ></button>
            </div>

            {/* Body */}
            <div
                className="p-4"
                style={{
                    backgroundColor: bgColor,
                    color: textColor,
                }}
            >
                {/* Task Overview */}
                <div
                    className="rounded-4 p-3 mb-4"
                    style={{
                        backgroundColor: isDark ? "#2a2a2d" : "#f8f9fa",
                        border: `1px solid ${borderColor}`,
                    }}
                >
                    <div className="row text-center text-md-start">
                        <div className="col-md-4 mb-2">
                            <p className="fw-semibold mb-1 text-uppercase small text-danger">
                                Category
                            </p>
                            <span>{task.category}</span>
                        </div>
                        <div className="col-md-4 mb-2">
                            <p className="fw-semibold mb-1 text-uppercase small text-danger">
                                Payout
                            </p>
                            <span className="fw-bold text-success">
                                ₦{task.payout.toLocaleString()}
                            </span>
                        </div>
                        <div className="col-md-4 mb-2">
                            <p className="fw-semibold mb-1 text-uppercase small text-danger">
                                Slots
                            </p>
                            <span>
                                {task.completedSlots}/{task.slots}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <h6 className="fw-bold text-danger mb-2">
                        <FileText className="me-2" size={18} /> Description
                    </h6>
                    <div
                        className="border rounded-3 p-3"
                        style={{
                            backgroundColor: isDark ? "#2a2a2d" : "#fff",
                            borderColor,
                            color: labelColor,
                        }}
                    >
                        {task.description}
                    </div>
                </div>

                {/* Instructions */}
                <div className="mb-4">
                    <h6 className="fw-bold text-danger mb-2">
                        <ShieldCheck className="me-2" size={18} /> Instructions
                    </h6>
                    <div
                        className="border rounded-3 p-3"
                        style={{
                            backgroundColor: isDark ? "#2a2a2d" : "#fff",
                            borderColor,
                            color: labelColor,
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {task.instructions}
                    </div>
                </div>

                {/* ✅ LINK BUTTON - ADDED BACK! */}
                {task.link && (
                    <Form.Group className="mb-3">
                        <Button
                            variant="outline-danger"
                            className="w-100 d-flex align-items-center justify-content-center gap-2"
                            href={task.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-box-arrow-up-right"></i>
                            go to task link
                        </Button>
                    </Form.Group>
                )}

                {/* Proof Form */}
                <Form onSubmit={handleSubmit}>
                    <h6
                        className="fw-bold mb-3 border-bottom pb-2"
                        style={{ color: textColor, borderColor }}
                    >
                        Submit Proof of Completion
                    </h6>

                    <Form.Group
                        className="mb-3 text-center p-4 rounded-3 border border-dashed"
                        style={{
                            borderColor: "#ff6b6b",
                            background: isDark
                                ? "rgba(255, 255, 255, 0.05)"
                                : "#fff9f9",
                            color: textColor,
                        }}
                    >
                        <Upload size={24} className="mb-2 text-danger" />
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="form-control border-0 bg-transparent"
                            style={{
                                backgroundColor: isDark ? "#2a2a2d" : "#fff",
                                color: textColor,
                                borderColor,
                            }}
                        />
                        <small
                            className="text-muted"
                            style={{ color: labelColor }}
                        >
                            Upload a screenshot (optional)
                        </small>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label
                            className="fw-semibold"
                            style={{ color: textColor }}
                        >
                            Proof Description
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={proofText}
                            onChange={(e) => setProofText(e.target.value)}
                            placeholder="Describe what you did to complete the task..."
                            style={{
                                backgroundColor: isDark ? "#2a2a2d" : "#fff",
                                color: textColor,
                                borderColor,
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="form-check mb-4">
                        <Form.Check
                            type="checkbox"
                            label="I confirm that my proof is genuine and accurate."
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            style={{ color: textColor }}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between mt-4">
                        <Button
                            variant={
                                isDark ? "outline-light" : "outline-secondary"
                            }
                            onClick={handleClose}
                            className="d-flex align-items-center gap-1 px-4"
                            style={{
                                borderColor: labelColor,
                                color: labelColor,
                            }}
                        >
                            <XCircle size={18} /> Close
                        </Button>
                        <Button
                            variant="danger"
                            type="submit"
                            className="fw-semibold px-4 shadow-sm rounded-pill"
                            disabled={!agreed}
                        >
                            Submit Proof
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
//  mr niyi asked me to add another box like instructions that will have copy for closed review and open review will just be default  , so you copy go to where ever and paste task instructions
