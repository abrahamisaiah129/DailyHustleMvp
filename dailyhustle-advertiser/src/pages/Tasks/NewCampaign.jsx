import React, { useState, useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAdvertiserData } from "../../context/Advertiser/AdvertiserDataContext";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";

const categories = {
  affiliate: ["Sign up", "Referral", "Purchase Bonus"],
  app: ["Install only", "Install/Register", "Install & Use"],
  artist: ["Follow", "Stream Song", "Share Music"],
  content: ["Write Article", "Post Blog", "Comment"],
  facebook: ["Like Page", "Share Post", "Join Group"],
  instagram: ["Follow", "Like Post", "Share Story"],
  Review: [
    "Google Review",
    "Trustpilot Review",
    // "Facebook Reviews"
  ],
};
const categoryOptions = Object.keys(categories);
const countryOptions = [
  "All Worldwide",
  "Nigeria",
  "Africa",
  "United States",
  "Canada",
  "United Kingdom",
];

export default function NewCampaign() {
  const { theme } = useTheme();
  const { onCreateCampaign } = useAdvertiserData();
  const [showPreview, setShowPreview] = useState(false);
  const [fileName, setFileName] = useState("");
  const [form, setForm] = useState({
    title: "",
    details: "",
    country: "Nigeria",
    category: "",
    subCategory: "",
    workersNeeded: "",
    amountPerWorker: "",
    approvalDays: "3",
    screenshotProof: false,
    jobLink: "",
    approvalMode: "",
    file: null,
  });

  const isDark = theme === "dark";
  const palette = useMemo(
    () => ({
      bg: isDark ? "#121212" : "#f8f9fa",
      cardBg: isDark ? "#1c1c1e" : "#fff",
      text: isDark ? "#f8f9fa" : "#212529",
      label: isDark ? "#adb5bd" : "#6c757d",
      red: "var(--dh-red)",
    }),
    [isDark]
  );

  const subCategoryList = form.category ? categories[form.category] : [];
  const totalBudget =
    (parseInt(form.workersNeeded, 10) || 0) *
    (parseFloat(form.amountPerWorker) || 0);

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === "file") {
      setForm((f) => ({ ...f, file: files[0] }));
      setFileName(files[0]?.name || "");
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handlePreview(e) {
    e.preventDefault();
    setShowPreview(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onCreateCampaign(form); // Notifies, saves, resets via context!
    setForm({
      title: "",
      details: "",
      country: "Nigeria",
      category: "",
      subCategory: "",
      workersNeeded: "",
      amountPerWorker: "",
      approvalDays: "3",
      screenshotProof: false,
      jobLink: "",
      approvalMode: "",
      file: null,
    });
    setFileName("");
    setShowPreview(false);
  }

  return (
    <div className="container py-4" style={{ background: palette.bg }}>
      <h2 className="fw-bold mb-4" style={{ color: palette.red }}>
        Post New Campaign
      </h2>
      <Form onSubmit={handleSubmit} className="bg-white rounded shadow-sm p-4">
        <Row className="mb-3">
          <Col md>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Select
                name="country"
                value={form.country}
                onChange={handleChange}
              >
                {countryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Job Category</Form.Label>
          <Form.Select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select job category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sub Category</Form.Label>
          <Form.Select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            required
            disabled={!form.category}
          >
            <option value="">
              {form.category ? "Select sub category" : "Pick a category first"}
            </option>
            {subCategoryList.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Job Description & Instructions</Form.Label>
          <Form.Control
            as="textarea"
            name="details"
            value={form.details}
            onChange={handleChange}
            rows={3}
            placeholder="Explain task steps and required proof..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Share flyer on WhatsApp groups"
            required
          />
        </Form.Group>
        <Row className="mb-3">
          <Col md>
            <Form.Group>
              <Form.Label>Workers Needed</Form.Label>
              <Form.Control
                type="number"
                min={1}
                name="workersNeeded"
                value={form.workersNeeded}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group>
              <Form.Label>Amount per Worker</Form.Label>
              <Form.Control
                type="number"
                min={0}
                name="amountPerWorker"
                value={form.amountPerWorker}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group>
              <Form.Label>Approval Days</Form.Label>
              <Form.Control
                type="number"
                min={1}
                name="approvalDays"
                value={form.approvalDays}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md>
            <Form.Check
              type="checkbox"
              name="screenshotProof"
              label="Require Screenshot Proof"
              checked={form.screenshotProof}
              onChange={handleChange}
            />
          </Col>
          <Col md>
            <Form.Group>
              <Form.Label>Attachment (optional)</Form.Label>
              <Form.Control
                type="file"
                onChange={handleChange}
                accept=".jpg,.jpeg,.png,.pdf"
              />
              {fileName && (
                <div className="small text-muted mt-1">{fileName}</div>
              )}
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group>
              <Form.Label>Job Link (optional)</Form.Label>
              <Form.Control
                name="jobLink"
                value={form.jobLink}
                onChange={handleChange}
                placeholder="https://example.com"
                type="url"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md>
            <Form.Group>
              <Form.Label>Approval Model</Form.Label>
              <Form.Select
                name="approvalMode"
                value={form.approvalMode}
                onChange={handleChange}
                required
              >
                <option value="">Select approval mode</option>
                <option>Self Approval</option>
                <option>Platform Approval</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md className="d-flex align-items-end">
            <div className="bg-light rounded p-3 w-100">
              <div className="small text-muted">Estimated Total</div>
              <div
                className="fw-bold text-success"
                style={{ fontSize: "1.25rem" }}
              >
                ₦{totalBudget.toLocaleString()}
              </div>
            </div>
          </Col>
        </Row>
        <div className="d-flex gap-2 justify-content-end">
          <Button variant="outline-dark" type="button" onClick={handlePreview}>
            Preview
          </Button>
          <Button variant="primary" type="submit">
            Post Job
          </Button>
        </div>
        <Modal show={showPreview} onHide={() => setShowPreview(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Campaign Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>{form.title || "Job title preview"}</h5>
            <div className="small text-muted mb-2">
              {form.category} / {form.subCategory} / {form.country} <br />₦
              {totalBudget.toLocaleString()} total
            </div>
            <div className="mb-2">
              {form.details || "Job description preview..."}
            </div>
            <div className="d-flex gap-3 flex-wrap mb-2">
              <span>
                <i className="bi bi-people-fill me-1" />
                {form.workersNeeded || 0} worker(s)
              </span>
              <span>
                <i className="bi bi-clock me-1" />
                {form.approvalDays || 0} days
              </span>
              <span>
                <i className="bi bi-geo-alt me-1" />
                {form.country}
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setShowPreview(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
}
