import React, { useState } from "react";
import "./ChatBot.css";

const faqList = [
  "How to register a complaint?",
  "Who handles my complaint?",
  "How much time it takes to solve the problem?",
  "What if my problem is not resolved?",
  "How to check my complaint status?",
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // Send message from FAQ buttons
  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { sender: "user", text: text };
    const botMsg = getBotReply(text);

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  // Bot replies for each question
  const getBotReply = (question) => {
    const q = question.toLowerCase();

    if (q.includes("register"))
      return {
        sender: "bot",
        text: "To register a complaint, go to the Register  Complaint page and fill the  complaint form.",
      };

    if (q.includes("who handles"))
      return {
        sender: "bot",
        text: "“Your complaint is sent to the lower authorities, and they solve it by passing it to the relevant authorities.”",
      };
    if (q.includes("status"))
      return {
        sender: "bot",
        text: "You can check your complaint status in the Dashboard under 'view Status '. It will show whether your issue is resolved, pending, or marked as unresolved.",
      };
    if (q.includes("how much time"))
      return {
        sender: "bot",
        text: "Normally it takes 24–72 hours to solve the problem depending on priority.",
      };

    if (q.includes("not resolved"))
      return {
        sender: "bot",
        text: "If your problem is not resolved, you can mark your complaint as Unresolved in the feedback section.Your complaint will then be automatically forwarded to the higher authority for further action.",
      };
  };

  return (
    <>
      {/* Floating Icon */}
      <div className="chatbot-icon" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chat-window">
          <div className="chat-header">Ask Question</div>

          {/* FAQ Buttons */}
          <div className="faq-buttons">
            {faqList.map((q, index) => (
              <button
                key={index}
                className="faq-btn"
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
