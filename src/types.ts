export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  color: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  contactId: string;
  text: string;
  timestamp: string;
  isOutgoing: boolean;
  status: 'sent' | 'delivered' | 'read';
  delay: number;
}

export interface DecisionPoint {
  id: string;
  timestamp: number;
  contactId: string;
  question: string;
  options: string[];
}

export interface StoryProgress {
  currentMessageIndex: number;
  decisions: Record<string, string>;
  startTime: number;
  batteryLevel: number;
  isCompleted: boolean;
}

export type Screen = 'lock' | 'contacts' | 'chat' | 'end';

export interface ChatState {
  currentScreen: Screen;
  selectedContactId: string | null;
  messages: Message[];
  deliveredMessages: Set<string>;
  isTyping: Record<string, boolean>;
  batteryLevel: number;
  startTime: number;
  currentTime: number;
  decisions: Record<string, string>;
  audioEnabled: boolean;
  darkMode: boolean;
}
