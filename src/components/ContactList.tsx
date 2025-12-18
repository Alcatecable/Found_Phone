import { Search, MessageCircle } from 'lucide-react';
import { conversations } from '../data/storyData';
import { Message } from '../types';
import { ContactListItem } from './ContactListItem';
import { WhatsAppHeader } from './WhatsAppHeader';
import { StatusBar } from './StatusBar';

interface ContactListProps {
  messages: Message[];
  isTyping: Record<string, boolean>;
  onSelectConversation: (conversationId: string) => void;
  batteryLevel: number;
}

export const ContactList = ({ messages, isTyping, onSelectConversation, batteryLevel }: ContactListProps) => {
  const getLastMessage = (conversationId: string) => {
    const conversationMessages = messages.filter(m => m.conversationId === conversationId);
    if (conversationMessages.length === 0) return undefined;
    return conversationMessages[conversationMessages.length - 1].text;
  };

  const getLastMessageTime = (conversationId: string) => {
    const conversationMessages = messages.filter(m => m.conversationId === conversationId);
    if (conversationMessages.length === 0) return undefined;
    return conversationMessages[conversationMessages.length - 1].timestamp;
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <StatusBar batteryLevel={batteryLevel} />
      <WhatsAppHeader title="WhatsApp" />

      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-300">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="flex-1 outline-none text-sm bg-transparent"
            readOnly
            data-testid="input-search"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map(conversation => (
          <ContactListItem
            key={conversation.id}
            conversation={conversation}
            onClick={() => onSelectConversation(conversation.id)}
            isTyping={isTyping[conversation.id]}
            lastMessage={getLastMessage(conversation.id)}
            lastMessageTime={getLastMessageTime(conversation.id)}
          />
        ))}
      </div>

      <button 
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5A] transition-colors"
        data-testid="button-new-chat"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};
