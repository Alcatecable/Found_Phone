import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatState, Message, Screen } from '../types';
import { messages } from '../data/storyData';
import { saveProgress, loadProgress, getInitialProgress } from '../utils/storage';

export const useStory = () => {
  const [state, setState] = useState<ChatState>(() => {
    const saved = loadProgress();
    return {
      currentScreen: 'lock' as Screen,
      selectedContactId: null,
      messages: [],
      deliveredMessages: new Set<string>(),
      isTyping: {},
      batteryLevel: saved?.batteryLevel || 47,
      startTime: saved?.startTime || Date.now(),
      currentTime: Date.now(),
      decisions: saved?.decisions || {},
      audioEnabled: true,
      darkMode: false,
    };
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

  const playNotificationSound = useCallback(() => {
    if (!state.audioEnabled) return;
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCSM0vPTgjMGHm7A7+OZURE');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, [state.audioEnabled]);

  const deliverMessage = useCallback((message: Message) => {
    setState(prev => {
      if (prev.deliveredMessages.has(message.id)) return prev;

      const newDelivered = new Set(prev.deliveredMessages);
      newDelivered.add(message.id);

      return {
        ...prev,
        messages: [...prev.messages, message],
        deliveredMessages: newDelivered,
      };
    });

    playNotificationSound();
  }, [playNotificationSound]);

  const showTypingIndicator = useCallback((contactId: string, duration: number) => {
    setState(prev => ({
      ...prev,
      isTyping: { ...prev.isTyping, [contactId]: true },
    }));

    if (typingTimeoutRef.current[contactId]) {
      clearTimeout(typingTimeoutRef.current[contactId]);
    }

    typingTimeoutRef.current[contactId] = setTimeout(() => {
      setState(prev => ({
        ...prev,
        isTyping: { ...prev.isTyping, [contactId]: false },
      }));
    }, duration);
  }, []);

  useEffect(() => {
    if (state.currentScreen === 'lock') return;

    const startTime = state.startTime;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setState(prev => ({ ...prev, currentTime: Date.now() }));

      messages.forEach(message => {
        const shouldDeliver = elapsed >= message.delay && !state.deliveredMessages.has(message.id);

        if (shouldDeliver) {
          const typingDelay = elapsed - message.delay;

          if (typingDelay < 2000) {
            showTypingIndicator(message.contactId, 2000);
          }

          if (typingDelay >= 2000) {
            deliverMessage(message);
          }
        }
      });

      const allMessagesDelivered = messages.every(msg =>
        state.deliveredMessages.has(msg.id)
      );

      if (allMessagesDelivered && elapsed > messages[messages.length - 1].delay + 5000) {
        setState(prev => ({ ...prev, currentScreen: 'end' }));
      }
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.currentScreen, state.startTime, state.deliveredMessages, deliverMessage, showTypingIndicator]);

  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setState(prev => {
        const elapsed = Date.now() - prev.startTime;
        const drainRate = 0.0001;
        const newBattery = Math.max(0, 47 - (elapsed * drainRate));

        if (newBattery <= 0) {
          return { ...prev, currentScreen: 'end', batteryLevel: 0 };
        }

        return { ...prev, batteryLevel: Math.floor(newBattery) };
      });
    }, 10000);

    return () => clearInterval(batteryInterval);
  }, [state.startTime]);

  useEffect(() => {
    saveProgress({
      currentMessageIndex: state.messages.length,
      decisions: state.decisions,
      startTime: state.startTime,
      batteryLevel: state.batteryLevel,
      isCompleted: state.currentScreen === 'end',
    });
  }, [state.messages.length, state.decisions, state.startTime, state.batteryLevel, state.currentScreen]);

  const unlock = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScreen: 'contacts',
      startTime: Date.now(),
    }));
  }, []);

  const openChat = useCallback((contactId: string) => {
    setState(prev => ({
      ...prev,
      currentScreen: 'chat',
      selectedContactId: contactId,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScreen: prev.currentScreen === 'chat' ? 'contacts' : prev.currentScreen,
      selectedContactId: null,
    }));
  }, []);

  const makeDecision = useCallback((decisionId: string, choice: string) => {
    setState(prev => ({
      ...prev,
      decisions: { ...prev.decisions, [decisionId]: choice },
    }));
  }, []);

  const toggleAudio = useCallback(() => {
    setState(prev => ({ ...prev, audioEnabled: !prev.audioEnabled }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  }, []);

  const restart = useCallback(() => {
    setState({
      currentScreen: 'lock',
      selectedContactId: null,
      messages: [],
      deliveredMessages: new Set<string>(),
      isTyping: {},
      batteryLevel: 47,
      startTime: Date.now(),
      currentTime: Date.now(),
      decisions: {},
      audioEnabled: state.audioEnabled,
      darkMode: state.darkMode,
    });
  }, [state.audioEnabled, state.darkMode]);

  return {
    state,
    actions: {
      unlock,
      openChat,
      goBack,
      makeDecision,
      toggleAudio,
      toggleDarkMode,
      restart,
    },
  };
};
