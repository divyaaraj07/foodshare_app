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
      text: `Hi there! I'm ${contactName} from ${donorName}. The batch is refrigerated and boxed in eco-kraft packaging ready at our back loading dock #3.`,
      time: '5:10 PM'
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

    // Simulated quick donor response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'donor',
          text: `Got it! I will have our prep lead have the crates stationed by Dock #3. Safe travels!`,
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
        {/* Header */}
        <div className="p-3.5 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM2Q2SPorKwAeUStBSxl8mVkcgze1KbnCNQ0bj_JWEZ7Dgi7dW2k5Ock7A8crIUrQMwF9KBn1bXxF--P_qfnKabsy9HfvEgRocbYfboHjkUxHt74ijgCGxNzOYetcbpcjDu82d9Y5t7P1eKkndaFBCjVEtTUBPykpOqpQmxF_1pI4oC5haarrBl-h3gFcLEJUAnDj7rdCZG3q6Gf9D2452gxufSY4BZx12Kd3V_WRK89iZpImVOdk"
              alt={contactName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <div className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-1">
                <span>{contactName}</span>
                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <span className="font-label-sm text-on-surface-variant truncate block">{donorName} • Fast Responder</span>
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
            <span className="font-label-sm text-on-surface-variant bg-surface-container-low px-2.5 py-0.5 rounded-full">
              Protected Food Coordination Chat
            </span>
          </div>

          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-body-sm shadow-xs ${
                    isUser
                      ? 'bg-primary text-on-primary rounded-br-none'
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

        {/* Quick Prompt Chips */}
        <div className="px-3 py-1.5 bg-surface-container-low flex items-center gap-1.5 overflow-x-auto no-scrollbar border-t border-surface-container">
          <button
            onClick={() => handleSend("Our driver is 8 minutes away in Van #2!")}
            className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high"
          >
            🚐 Driver arriving in 8m
          </button>
          <button
            onClick={() => handleSend("Do we need any special lift gate for the crates?")}
            className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high"
          >
            📦 Dock details?
          </button>
        </div>

        {/* Send input */}
        <div className="p-3 bg-surface-container-lowest border-t border-surface-container flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${contactName.split(' ')[0]}...`}
            className="flex-1 h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none focus:bg-surface-container-highest transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center disabled:opacity-50 hover:bg-primary-container active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
