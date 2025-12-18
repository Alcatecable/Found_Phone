import { Contact } from '../types';

interface ContactListItemProps {
  contact: Contact;
  onClick: () => void;
  isTyping?: boolean;
  lastMessage?: string;
}

export const ContactListItem = ({ contact, onClick, isTyping, lastMessage }: ContactListItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 active:bg-gray-200 transition-colors border-b border-gray-200"
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-xl flex-shrink-0"
        style={{ backgroundColor: contact.color }}
      >
        {contact.initials}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
          <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 truncate">
            {isTyping ? (
              <span className="text-[#25D366] font-medium">typing...</span>
            ) : (
              lastMessage || contact.lastMessage
            )}
          </p>
          {contact.unreadCount && contact.unreadCount > 0 ? (
            <span className="bg-[#25D366] text-white text-xs rounded-full px-2 py-0.5 ml-2 flex-shrink-0">
              {contact.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
};
