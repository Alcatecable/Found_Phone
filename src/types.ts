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

export interface Conversation {
  id: string;
  participantIds: string[];
  displayName: string;
  displayInitials: string;
  displayColor: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  delay: number;
}

export interface DecisionPoint {
  id: string;
  timestamp: number;
  conversationId: string;
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
  selectedConversationId: string | null;
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

export interface Participant {
  id: string;
  name: string;
  initials: string;
  color: string;
}
