import { Conversation } from '../types';

interface ContactListItemProps {
  conversation: Conversation;
  onClick: () => void;
  isTyping?: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
}

export const ContactListItem = ({ conversation, onClick, isTyping, lastMessage, lastMessageTime }: ContactListItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 active:bg-gray-200 transition-colors border-b border-gray-200"
      data-testid={`conversation-item-${conversation.id}`}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-xl flex-shrink-0"
        style={{ backgroundColor: conversation.displayColor }}
      >
        {conversation.displayInitials}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 truncate">{conversation.displayName}</h3>
          <span className="text-xs text-gray-500 flex-shrink-0">{lastMessageTime || 'now'}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-gray-600 truncate">
            {isTyping ? (
              <span className="text-[#25D366] font-medium">typing...</span>
            ) : (
              lastMessage || 'Tap to view conversation'
            )}
          </p>
        </div>
      </div>
    </button>
  );
};
