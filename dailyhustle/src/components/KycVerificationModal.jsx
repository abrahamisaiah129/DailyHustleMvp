import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { useUserData } from "../context/UserDataContext";
import "react-toastify/dist/ReactToastify.css";

export default function KycVerificationModal({ show, onHide }) {
    const { theme } = useTheme();
    const { submitKYC, verifyKYC } = useUserData();
    const [kycType, setKycType] = useState("NIN");
    const [idNumber, setIdNumber] = useState("");
    const [documentUrl, setDocumentUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const isDark = theme === "dark";
    const cardBg = isDark ? "#1c1c1e" : "#ffffff";
    const textColor = isDark ? "#f8f9fa" : "#212529";
    const labelColor = isDark ? "#adb5bd" : "#6c757d";
    const buttonBg = "#28a745";
    const buttonText = "#000000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!kycType || !idNumber || !documentUrl) {
            toast.warning("Please fill all fields before submitting.", {
                position: "top-center",
                className: "bg-light text-dark border border-warning rounded-3",
            });
            return;
        }

        setLoading(true);
        const kycData = { type: kycType, idNumber, documentUrl };

        await submitKYC(kycData);

        toast.info("KYC submitted for review. Awaiting verification...", {
            position: "top-center",
            className: "bg-light text-dark border border-info rounded-3",
        });

        setTimeout(() => {
            verifyKYC("verified");
            toast.success("Your KYC has been verified successfully!", {
                position: "top-center",
                className: "bg-light text-dark border border-success rounded-3",
            });
            setLoading(false);
            onHide();
        }, 2000);
    };

    return (
        <div
            className={`modal fade ${show ? "show" : ""}`}
            style={{
                display: show ? "block" : "none",
                backgroundColor: isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)",
            }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="kycModalLabel"
            aria-hidden={!show}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div
                    className="modal-content"
                    style={{ backgroundColor: cardBg, color: textColor }}
                >
                    <div
                        className="modal-header"
                        style={{ backgroundColor: "#dc3545", color: "#ffffff" }}
                    >
                        <h5 className="modal-title fw-bold" id="kycModalLabel">
                            KYC Verification
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onHide}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor="kycType"
                                    className="form-label"
                                    style={{ color: labelColor }}
                                >
                                    KYC Type
                                </label>
                                <select
                                    id="kycType"
                                    className="form-control"
                                    value={kycType}
                                    onChange={(e) => setKycType(e.target.value)}
                                    style={{
                                        backgroundColor: isDark
                                            ? "#2c2c2e"
                                            : "#fff",
                                        color: textColor,
                                        borderColor: isDark
                                            ? "#495057"
                                            : "#ced4da",
                                    }}
                                >
                                    <option value="NIN">NIN</option>
                                    <option value="BVN">BVN</option>
                                    <option value="Voter ID">Voter ID</option>
                                    <option value="Driver’s License">
                                        Driver’s License
                                    </option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="idNumber"
                                    className="form-label"
                                    style={{ color: labelColor }}
                                >
                                    ID Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="idNumber"
                                    placeholder="Enter your ID number"
                                    value={idNumber}
                                    onChange={(e) =>
                                        setIdNumber(e.target.value)
                                    }
                                    style={{
                                        backgroundColor: isDark
                                            ? "#2c2c2e"
                                            : "#fff",
                                        color: textColor,
                                        borderColor: isDark
                                            ? "#495057"
                                            : "#ced4da",
                                    }}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="documentUrl"
                                    className="form-label"
                                    style={{ color: labelColor }}
                                >
                                    Document URL (proof)
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="documentUrl"
                                    placeholder="https://example.com/document.jpg"
                                    value={documentUrl}
                                    onChange={(e) =>
                                        setDocumentUrl(e.target.value)
                                    }
                                    style={{
                                        backgroundColor: isDark
                                            ? "#2c2c2e"
                                            : "#fff",
                                        color: textColor,
                                        borderColor: isDark
                                            ? "#495057"
                                            : "#ced4da",
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn w-100 fw-bold rounded-pill"
                                disabled={loading}
                                style={{
                                    backgroundColor: buttonBg,
                                    color: buttonText,
                                    borderColor: buttonBg,
                                }}
                            >
                                {loading ? "Submitting..." : "Submit KYC"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
