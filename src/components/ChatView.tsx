import { useEffect, useRef } from 'react';
import { Smile, Plus, Mic } from 'lucide-react';
import { conversations } from '../data/storyData';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { WhatsAppHeader } from './WhatsAppHeader';
import { StatusBar } from './StatusBar';

interface ChatViewProps {
  conversationId: string;
  messages: Message[];
  isTyping: boolean;
  onBack: () => void;
  batteryLevel: number;
}

export const ChatView = ({ conversationId, messages, isTyping, onBack, batteryLevel }: ChatViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversation = conversations.find(c => c.id === conversationId);

  const conversationMessages = messages
    .filter(m => m.conversationId === conversationId)
    .sort((a, b) => a.delay - b.delay);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages.length, isTyping]);

  if (!conversation) return null;

  return (
    <div className="h-screen bg-[#ECE5DD] flex flex-col">
      <StatusBar batteryLevel={batteryLevel} />
      <WhatsAppHeader
        title={conversation.displayName}
        subtitle={isTyping ? 'typing...' : 'online'}
        onBack={onBack}
        showActions
        avatar={{
          initials: conversation.displayInitials,
          color: conversation.displayColor,
        }}
      />

      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        data-testid="chat-messages-container"
      >
        {conversationMessages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-t border-gray-300">
        <button className="text-gray-600 hover:text-gray-800 p-2" data-testid="button-emoji">
          <Smile size={24} />
        </button>
        <button className="text-gray-600 hover:text-gray-800 p-2" data-testid="button-attach">
          <Plus size={24} />
        </button>
        <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
          <input
            type="text"
            placeholder="You can't send messages..."
            className="flex-1 outline-none text-sm bg-transparent"
            readOnly
            disabled
            data-testid="input-message"
          />
        </div>
        <button 
          className="bg-[#25D366] text-white p-3 rounded-full hover:bg-[#20BA5A] transition-colors"
          data-testid="button-voice"
        >
          <Mic size={20} />
        </button>
      </div>
    </div>
  );
};
