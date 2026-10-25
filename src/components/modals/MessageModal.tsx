import React, { useState } from 'react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  donorName: string;
  contactName: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'donor';
  text: string;
  time: string;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  donorName,
  contactName
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'donor',
      text: `வணக்கம்! I am ${contactName} from ${donorName}. The surplus lunch packets are fresh, hot, and packed in food-grade silver foil boxes ready at our rear kitchen loading gate on Pitchu Pillai Street.`,
      time: '2:45 PM'
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Simulated quick reply from chef
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'donor',
          text: `சரிங்க! Our kitchen supervisor will keep the insulated thermal crates ready by the ramp. Please share the volunteer vehicle registration number on arrival.`,
          time: 'Just now'
        }
      ]);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[520px] border border-surface-container">
        {/* Header */}
        <div className="p-3.5 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM2Q2SPorKwAeUStBSxl8mVkcgze1KbnCNQ0bj_JWEZ7Dgi7dW2k5Ock7A8crIUrQMwF9KBn1bXxF--P_qfnKabsy9HfvEgRocbYfboHjkUxHt74ijgCGxNzOYetcbpcjDu82d9Y5t7P1eKkndaFBCjVEtTUBPykpOqpQmxF_1pI4oC5haarrBl-h3gFcLEJUAnDj7rdCZG3q6Gf9D2452gxufSY4BZx12Kd3V_WRK89iZpImVOdk"
              alt={contactName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <div className="font-title-md text-title-md text-on-surface font-bold flex items-center gap-1">
                <span>{contactName}</span>
                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              <span className="font-label-sm text-on-surface-variant truncate block font-medium">
                {donorName} • Mylapore, Chennai
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-surface">
          <div className="text-center">
            <span className="font-label-sm text-on-surface-variant bg-surface-container-low px-2.5 py-0.5 rounded-full border border-surface-container font-semibold">
              🔒 FSSAI IFSA Tamil Nadu Coordination Chat
            </span>
          </div>

          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-body-sm shadow-xs ${
                    isUser
                      ? 'bg-primary text-on-primary rounded-br-none font-medium'
                      : 'bg-surface-container-lowest text-on-surface rounded-bl-none border border-surface-container'
                  }`}
                >
                  {m.text}
                </div>
                <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5 px-1">{m.time}</span>
              </div>
            );
          })}
        </div>

        {/* Quick Chips */}
        <div className="px-3 py-1.5 bg-surface-container-low flex items-center gap-1.5 overflow-x-auto no-scrollbar border-t border-surface-container">
          <button
            onClick={() => handleSend("Van TN-07-BW-4821 is 10 minutes away on Luz Church Road!")}
            className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high font-semibold"
          >
            🚐 Tata Ace 10m away
          </button>
          <button
            onClick={() => handleSend("Do we need to bring our own insulated stainless steel milk cans?")}
            className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high font-semibold"
          >
            📦 Thermal crates ready?
          </button>
        </div>

        {/* Input */}
        <div className="p-3 bg-surface-container-lowest border-t border-surface-container flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${contactName.split(' ')[0]} Chef...`}
            className="flex-1 h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none focus:bg-surface-container-highest transition-colors border border-surface-container"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center disabled:opacity-50 hover:bg-primary-container active:scale-95 transition-all shadow-sm font-bold"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
