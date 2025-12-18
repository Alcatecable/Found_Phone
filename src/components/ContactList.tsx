import { Search, MessageCircle } from 'lucide-react';
import { contacts } from '../data/storyData';
import { Message } from '../types';
import { ContactListItem } from './ContactListItem';
import { WhatsAppHeader } from './WhatsAppHeader';
import { StatusBar } from './StatusBar';

interface ContactListProps {
  messages: Message[];
  isTyping: Record<string, boolean>;
  onSelectContact: (contactId: string) => void;
  batteryLevel: number;
}

export const ContactList = ({ messages, isTyping, onSelectContact, batteryLevel }: ContactListProps) => {
  const getLastMessage = (contactId: string) => {
    const contactMessages = messages.filter(m => m.contactId === contactId);
    if (contactMessages.length === 0) return undefined;
    return contactMessages[contactMessages.length - 1].text;
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
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {contacts.map(contact => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            onClick={() => onSelectContact(contact.id)}
            isTyping={isTyping[contact.id]}
            lastMessage={getLastMessage(contact.id)}
          />
        ))}
      </div>

      <button className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5A] transition-colors">
        <MessageCircle size={28} />
      </button>
    </div>
  );
};
