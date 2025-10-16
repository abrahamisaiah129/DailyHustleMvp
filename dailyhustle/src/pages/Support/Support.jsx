// src/pages/Support/Support.jsx
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useUserData } from "../../context/UserDataContext";
import { toast } from "react-toastify";

export default function Support() {
    const { theme } = useTheme();
    const { userData, addNotification } = useUserData();

    const [activeTab, setActiveTab] = useState("faq");
    const [searchQuery, setSearchQuery] = useState("");
    const [ticketSubject, setTicketSubject] = useState("");
    const [ticketMessage, setTicketMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const isDark = theme === "dark";
    const cardBg = isDark ? "#1c1c1e" : "#ffffff";
    const containerBg = isDark ? "#121212" : "#f8f9fa";
    const textColor = isDark ? "#f8f9fa" : "#212529";
    const labelColor = isDark ? "#adb5bd" : "#6c757d";
    const primary = "#198754";
    const borderColor = isDark ? "#333" : "#dee2e6";
    const gradientBg = isDark
        ? "linear-gradient(135deg, #5a189a, #240046)"
        : "linear-gradient(135deg, #198754, #20c997)";

    const { username = "User" } = userData || {};

    // FAQ Data
    const faqData = [
        {
            question: "How do I complete my first task?",
            answer: "Go to Dashboard → Pick any task → Tap 'Start' → Follow instructions → Submit proof. Earn instantly!",
            category: "tasks",
        },
        {
            question: "What's the minimum withdrawal amount?",
            answer: "Minimum is ₦1,000. Complete KYC first, then withdraw to bank or mobile money.",
            category: "payments",
        },
        {
            question: "How do referrals work?",
            answer: "Share your unique link → Friend signs up & completes 1 task → You earn ₦500 instantly!",
            category: "referrals",
        },
        {
            question: "Why can't I withdraw my earnings?",
            answer: "You need: 1) KYC verified ✅ 2) Minimum ₦1,000 balance. Check Settings → Security.",
            category: "payments",
        },
        {
            question: "How long does withdrawal take?",
            answer: "Bank: 24hrs | Mobile Money: Instant. Check Wallet for status updates.",
            category: "payments",
        },
        {
            question: "My task was rejected, what now?",
            answer: "Review rejection reason → Resubmit better proof → Contact support if unfair.",
            category: "tasks",
        },
    ];

    const filteredFAQ = faqData.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tabs = [
        { id: "faq", icon: "question-circle", title: "FAQ" },
        { id: "tickets", icon: "ticket", title: "Support Tickets" },
        { id: "chat", icon: "chat-dots", title: "Live Chat" },
        { id: "contact", icon: "telephone", title: "Contact" },
    ];

    const submitTicket = async (e) => {
        e.preventDefault();
        if (!ticketSubject || !ticketMessage) {
            toast.error("❌ Please fill subject & message!");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            addNotification({
                title: "Ticket Submitted!",
                message: `Ticket #${Date.now()
                    .toString()
                    .slice(-6)} created successfully`,
                type: "success",
                category: "support",
            });

            toast.success("✅ Ticket submitted! We'll reply in 2hrs.");
            setTicketSubject("");
            setTicketMessage("");
            setLoading(false);
        }, 1500);
    };

    const quickContact = (method) => {
        switch (method) {
            case "whatsapp":
                window.open(
                    "https://wa.me/2348000000000?text=Hi Daily Hustle Team!"
                );
                break;
            case "email":
                window.location.href = `mailto:support@dailyhustle.com?subject=Support Request&body=Hi, I'm ${username}`;
                break;
            case "call":
                toast.info("📞 Call: +234 800 000 0000 (9AM-6PM)");
                break;
            default:
                toast.info("Coming soon!");
        }
    };

    const renderFAQTab = () => (
        <div>
            {/* Search */}
            <div className="mb-4">
                <div
                    className="input-group"
                    style={{
                        backgroundColor: cardBg,
                        borderRadius: "12px",
                        border: `2px solid ${borderColor}`,
                    }}
                >
                    <span
                        className="input-group-text bg-transparent border-0"
                        style={{
                            backgroundColor: "transparent",
                            color: labelColor,
                        }}
                    >
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Search FAQ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            backgroundColor: "transparent",
                            color: textColor,
                        }}
                    />
                </div>
            </div>

            {/* FAQ Items */}
            <div className="row g-4">
                {filteredFAQ.map((faq, i) => (
                    <div className="col-12" key={i}>
                        <div
                            className="p-4 rounded-4 cursor-pointer"
                            style={{
                                backgroundColor: cardBg,
                                border: `1px solid ${borderColor}`,
                                transition: "all 0.3s ease",
                            }}
                            onClick={() => toast.info(faq.answer)}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                    <h6
                                        className="fw-bold mb-1"
                                        style={{ color: textColor }}
                                    >
                                        {faq.question}
                                    </h6>
                                    <small style={{ color: labelColor }}>
                                        {faq.answer.substring(0, 80)}...
                                    </small>
                                </div>
                                <i
                                    className="bi bi-chevron-right fs-4"
                                    style={{ color: labelColor }}
                                ></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderTicketsTab = () => (
        <div className="row g-4">
            <div className="col-12">
                <div
                    className="card rounded-4"
                    style={{ backgroundColor: cardBg }}
                >
                    <div className="card-body p-4">
                        <h6
                            className="fw-bold mb-3"
                            style={{ color: textColor }}
                        >
                            <i className="bi bi-ticket-perforated me-2"></i>
                            New Support Ticket
                        </h6>
                        <form onSubmit={submitTicket}>
                            <div className="mb-3">
                                <label
                                    className="form-label fw-bold"
                                    style={{ color: textColor }}
                                >
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    className="form-control rounded-3 py-2"
                                    value={ticketSubject}
                                    onChange={(e) =>
                                        setTicketSubject(e.target.value)
                                    }
                                    placeholder="e.g. Withdrawal issue"
                                    style={{
                                        backgroundColor: cardBg,
                                        color: textColor,
                                        borderColor: borderColor,
                                    }}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="form-label fw-bold"
                                    style={{ color: textColor }}
                                >
                                    Message
                                </label>
                                <textarea
                                    className="form-control rounded-3 py-2"
                                    value={ticketMessage}
                                    onChange={(e) =>
                                        setTicketMessage(e.target.value)
                                    }
                                    rows="4"
                                    placeholder="Describe your issue..."
                                    style={{
                                        backgroundColor: cardBg,
                                        color: textColor,
                                        borderColor: borderColor,
                                    }}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn w-100 fw-bold py-3 rounded-pill"
                                style={{
                                    background: gradientBg,
                                    color: "#fff",
                                    border: "none",
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-send me-2"></i>
                                        Submit Ticket
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderChatTab = () => (
        <div className="text-center py-5">
            <i
                className="bi bi-chat-dots fs-1 mb-3"
                style={{ color: primary }}
            ></i>
            <h5 className="fw-bold mb-3" style={{ color: textColor }}>
                Live Chat Coming Soon!
            </h5>
            <p style={{ color: labelColor }}>
                Connect with support in real-time
            </p>
            <button
                className="btn fw-bold px-4 rounded-pill"
                style={{ background: gradientBg, color: "#fff" }}
                onClick={() => toast.info("🚀 Live chat launching next week!")}
            >
                Notify Me
            </button>
        </div>
    );

    const renderContactTab = () => (
        <div className="row g-4">
            {[
                {
                    icon: "whatsapp",
                    title: "WhatsApp",
                    desc: "Instant help (24/7)",
                    method: "whatsapp",
                    color: "#25D366",
                },
                {
                    icon: "envelope",
                    title: "Email",
                    desc: "Detailed issues",
                    method: "email",
                    color: primary,
                },
                {
                    icon: "telephone",
                    title: "Call",
                    desc: "9AM-6PM",
                    method: "call",
                    color: "#dc3545",
                },
            ].map((contact, i) => (
                <div className="col-md-4" key={i}>
                    <div
                        className="p-4 rounded-4 text-center h-100 cursor-pointer"
                        style={{
                            backgroundColor: cardBg,
                            border: `2px solid ${contact.color}`,
                            transition: "all 0.3s ease",
                        }}
                        onClick={() => quickContact(contact.method)}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        <i
                            className={`bi bi-${contact.icon} fs-1 mb-3`}
                            style={{ color: contact.color }}
                        ></i>
                        <h6
                            className="fw-bold mb-2"
                            style={{ color: textColor }}
                        >
                            {contact.title}
                        </h6>
                        <small style={{ color: labelColor }}>
                            {contact.desc}
                        </small>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div
            className="p-4"
            style={{
                backgroundColor: containerBg,
                color: textColor,
                minHeight: "100vh",
            }}
        >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold mb-1" style={{ color: primary }}>
                        💬 Support Center
                    </h1>
                    <small style={{ color: labelColor }}>
                        We're here to help you hustle!
                    </small>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-4">
                <div className="d-flex gap-2 justify-content-center flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`btn rounded-pill px-4 py-2 fw-bold ${
                                activeTab === tab.id ? "shadow-lg" : ""
                            }`}
                            style={{
                                backgroundColor:
                                    activeTab === tab.id
                                        ? gradientBg
                                        : "transparent",
                                color:
                                    activeTab === tab.id ? "#fff" : textColor,
                                border: `2px solid ${
                                    activeTab === tab.id ? "#fff" : borderColor
                                }`,
                            }}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <i className={`bi bi-${tab.icon} me-2`}></i>
                            {tab.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div
                className="rounded-4 p-4 shadow-lg"
                style={{ backgroundColor: cardBg }}
            >
                {activeTab === "faq" && renderFAQTab()}
                {activeTab === "tickets" && renderTicketsTab()}
                {activeTab === "chat" && renderChatTab()}
                {activeTab === "contact" && renderContactTab()}
            </div>
        </div>
    );
}
