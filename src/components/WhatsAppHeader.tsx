import { ArrowLeft, MoreVertical, Video, Phone } from 'lucide-react';

interface WhatsAppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showActions?: boolean;
  avatar?: {
    initials: string;
    color: string;
  };
}

export const WhatsAppHeader = ({ title, subtitle, onBack, showActions = false, avatar }: WhatsAppHeaderProps) => {
  return (
    <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        {onBack && (
          <button onClick={onBack} className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
        )}
        {avatar && (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: avatar.color }}
          >
            {avatar.initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-lg truncate">{title}</h1>
          {subtitle && <p className="text-xs opacity-90 truncate">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {showActions && (
          <>
            <button className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <Video size={22} />
            </button>
            <button className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <Phone size={22} />
            </button>
          </>
        )}
        <button className="hover:bg-white/10 p-2 rounded-full transition-colors">
          <MoreVertical size={22} />
        </button>
      </div>
    </div>
  );
};
