import { Check, CheckCheck } from 'lucide-react';
import { Message } from '../types';
import { phoneOwnerId } from '../data/storyData';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isOutgoing = message.senderId === phoneOwnerId;

  return (
    <div
      className={`flex items-start gap-2 mb-4 animate-slide-in ${
        isOutgoing ? 'flex-row-reverse' : 'flex-row'
      }`}
      data-testid={`message-bubble-${message.id}`}
    >
      <div
        className={`rounded-lg px-4 py-2 shadow-sm max-w-[75%] ${
          isOutgoing
            ? 'bg-[#DCF8C6] rounded-tr-none'
            : 'bg-white rounded-tl-none'
        }`}
      >
        <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[10px] text-gray-500">{message.timestamp}</span>
          {isOutgoing && (
            <span className="text-gray-500">
              {message.status === 'read' ? (
                <CheckCheck size={14} className="text-blue-500" />
              ) : message.status === 'delivered' ? (
                <CheckCheck size={14} />
              ) : (
                <Check size={14} />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
