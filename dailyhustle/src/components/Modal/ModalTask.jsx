import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTheme } from "../../hooks/useThemeContext";
import { useAppData } from "../../hooks/AppDataContext";

export default function ModalTask({ task, show, onClose, onApply, isReview }) {
  const { theme } = useTheme();
  const { recordCopiedReviewText, userData } = useAppData();

  const isDark = theme === "dark";
  const primary = "var(--dh-red)";
  const bg = isDark ? "#1c1c1e" : "#fff";
  const text = isDark ? "#f8f9fa" : "#212529";

  // Find if user already applied & what status it has
  const existingTask = userData.tasks.find((t) => t.id === task.id);
  const userStatus = existingTask?.status || null;
  const isRejected = userStatus === "rejected";
  const isPending = userStatus === "pending";
  const isApproved = userStatus === "approved";
  const isEditingAllowed = !existingTask || isRejected;

  const [proofText, setProofText] = useState(existingTask?.proofText || "");
  const [proofImage, setProofImage] = useState(
    existingTask?.proofImage || null
  );

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProofImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditingAllowed) return;
    if (!proofText && !proofImage) {
      alert("Provide at least one proof (text or image)");
      return;
    }
    onApply({
      ...task,
      proofText,
      proofImage,
      status: "pending",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(task.reviewText);
    recordCopiedReviewText(task.id);
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      contentClassName="border-0 rounded-3 shadow-lg"
    >
      {/* HEADER */}
      <div
        className="py-3 px-4 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: primary, color: "#fff" }}
      >
        <h5 className="fw-bold m-0">
          {task.title}
          {isReview && " (Closed Review)"}
        </h5>
        <button
          className="btn-close btn-close-white"
          onClick={onClose}
        ></button>
      </div>

      {/* BODY */}
      <div className="p-4" style={{ backgroundColor: bg, color: text }}>
        <p>{task.description}</p>

        <div className="small mb-3">
          <p className="mb-1 fw-semibold" style={{ color: primary }}>
            Category: {task.category}
          </p>
          <p className="mb-1">Reward: ₦{task.payout.toLocaleString()}</p>
          <p className="mb-1">
            Slots: {task.completedSlots}/{task.slots}
          </p>
          {existingTask && (
            <p className="mb-1">
              Your Task Status:{" "}
              <span
                style={{
                  color: isPending
                    ? "#ffc107"
                    : isRejected
                    ? "#e74c3c"
                    : isApproved
                    ? "#2ecc71"
                    : "#adb5bd",
                }}
              >
                {userStatus?.toUpperCase() || "N/A"}
              </span>
            </p>
          )}
        </div>

        {task.link && (
          <a
            href={task.link}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm rounded-pill text-white mb-3"
            style={{ backgroundColor: primary, border: "none" }}
          >
            Go to Task Site
          </a>
        )}

        {/* Copy section for reviews */}
        {isReview && task.reviewText && (
          <div
            className="p-3 mb-3 rounded"
            style={{
              background: isDark ? "#2a2a2d" : "#f8f9fa",
              border: "1px solid #ddd",
            }}
          >
            <h6 className="fw-bold mb-2" style={{ color: primary }}>
              Copy Review Text
            </h6>
            <textarea
              className="form-control mb-2"
              readOnly
              rows={3}
              value={task.reviewText}
              style={{ backgroundColor: bg, color: text }}
            ></textarea>
            <Button
              className="rounded-pill text-white fw-semibold"
              style={{ backgroundColor: primary, border: "none" }}
              onClick={handleCopy}
            >
              Copy Text
            </Button>
          </div>
        )}

        {/* Proof Submission Section */}
        <Form onSubmit={handleSubmit}>
          <h6 className="fw-bold mb-2" style={{ color: primary }}>
            {isEditingAllowed
              ? "Upload Your Proof"
              : "Your Submitted Proof (View Only)"}
          </h6>

          <Form.Group className="mb-3">
            <Form.Label>Text Proof</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={proofText}
              onChange={(e) => setProofText(e.target.value)}
              disabled={!isEditingAllowed}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image Proof</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={!isEditingAllowed}
            />
          </Form.Group>

          {proofImage && (
            <div className="text-center mt-3">
              <img
                src={proofImage}
                alt="proof"
                className="img-fluid rounded shadow-sm"
                style={{
                  maxHeight: 250,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                }}
              />
            </div>
          )}

          {isEditingAllowed && (
            <div className="d-flex justify-content-end mt-4 gap-2">
              <Button
                variant="secondary"
                className="rounded-pill"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-pill text-white fw-semibold"
                style={{ backgroundColor: primary, border: "none" }}
              >
                Submit Proof
              </Button>
            </div>
          )}

          {!isEditingAllowed && (
            <div
              className="py-3 mt-3 rounded text-center fw-semibold"
              style={{
                border: `1px solid ${primary}40`,
                color: isRejected ? "#e74c3c" : "#adb5bd",
              }}
            >
              {isPending &&
                "Your proof has been submitted and is awaiting approval."}
              {isApproved && "This task has been successfully approved!"}
              {isRejected &&
                "Your proof was rejected. You can resubmit corrections now."}
            </div>
          )}
        </Form>
      </div>
    </Modal>
  );
}
