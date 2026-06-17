import { useState, useRef, useEffect, useCallback } from "react";
import { postJSON } from "../api";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";

const LEAD_THRESHOLD = 3;

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Welcome to WE ARE DIGITAL. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [leadSent, setLeadSent] = useState(false);
  const bottomRef = useRef(null);
  const userMsgCount = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    userMsgCount.current += 1;
    setLoading(true);

    try {
      const data = await postJSON("/api/chat/", {
        message: msg,
        session_id: sessionId,
      });
      setSessionId(data.session_id);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (!data.lead_captured && userMsgCount.current >= LEAD_THRESHOLD) {
        setShowLead(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    }
    setLoading(false);
  }, [input, loading, sessionId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    try {
      await postJSON("/api/chat/lead/", { ...lead, session_id: sessionId });
      setLeadSent(true);
      setShowLead(false);
    } catch {
      // silently fail
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg shadow-purple-600/40 transition duration-300"
        aria-label="Toggle chat"
      >
        {open ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] flex flex-col bg-[#0f172a] border border-white/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/[0.04]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-purple-600/10">
            <span className="font-semibold text-purple-400">WE ARE DIGITAL</span>
            <span className="text-xs text-white/50">Chat</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-purple-600 text-white rounded-br-md"
                      : "bg-white/10 text-white/90 rounded-bl-md"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md text-sm text-white/60">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {showLead && !leadSent && (
            <form onSubmit={handleLeadSubmit} className="px-4 py-3 border-t border-white/10 bg-purple-600/5 space-y-2">
              <p className="text-xs text-purple-400 font-medium">Leave your details, we'll get back to you!</p>
              <input
                required
                placeholder="Name"
                value={lead.name}
                onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                className="w-full px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={lead.email}
                onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
                className="w-full px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
              <input
                placeholder="Phone (optional)"
                value={lead.phone}
                onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))}
                className="w-full px-3 py-1.5 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="w-full py-1.5 text-sm font-medium bg-purple-600 hover:bg-purple-700 rounded-lg transition"
              >
                Submit
              </button>
            </form>
          )}

          {leadSent && (
            <div className="px-4 py-3 border-t border-white/10 text-center text-xs text-green-400">
              Thanks! We'll be in touch soon.
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50 transition"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
